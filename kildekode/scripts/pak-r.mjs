// Samler en R, der kan ligge inde i desktop-appen og køre uden at R er installeret på computeren
// (docs/R-native-arkitektur.md, afsnit 11). Resultatet lægges i electron/r/<mål> og kommer ikke med
// i git — det er ca. 150–250 MB.
//
//   node electron/pak-r.mjs mac-x64      Intel-Mac   (CRAN: R-<version>-x86_64.pkg)
//   node electron/pak-r.mjs mac-arm64    Apple Silicon (CRAN: R-<version>-arm64.pkg)
//   node electron/pak-r.mjs win-x64      Windows      (CRAN: R-<version>-win.exe; kræver innoextract)
//
// Mac: CRANs R er installeret under /Library/Frameworks med den sti hårdkodet i R-scriptet og i
// alle dylibs/so-filer. Her omskrives scriptet til at finde sin egen mappe, og alle henvisninger til
// R's egne biblioteker bliver til @rpath (install_name_tool), så hele mappen kan flyttes ind i appen.
// Pakkerne hentes som færdige binære pakker fra CRAN for den rigtige chip, inkl. alle afhængigheder.
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync, lstatSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";

const her = dirname(fileURLToPath(import.meta.url));
const maal = process.argv[2];
if (!["mac-x64", "mac-arm64", "win-x64"].includes(maal)) { console.error("Brug: node electron/pak-r.mjs mac-x64 | mac-arm64 | win-x64"); process.exit(1); }

const R_VERSION = process.env.R_VERSION || "4.6.1";
const R_KORT = R_VERSION.split(".").slice(0, 2).join(".");            // 4.6 — CRANs mappe med binære pakker
const CRAN = "https://cran.r-project.org";
/** Pakkerne appen bruger (afsnit 11.3) — afhængighederne findes automatisk i CRANs indeks */
const PAKKER = ["jsonlite", "svglite", "systemfonts", "ggplot2", "broom", "readr", "readxl", "haven", "ragg"];
/** Følger med R selv (base + recommended) — hentes ikke */
const MED_R = new Set(["R", "base", "compiler", "datasets", "graphics", "grDevices", "grid", "methods", "parallel", "splines", "stats", "stats4", "tcltk", "tools", "utils",
  "MASS", "Matrix", "lattice", "nlme", "mgcv", "survival", "boot", "class", "cluster", "codetools", "foreign", "KernSmooth", "nnet", "rpart", "spatial"]);

const koer = (prog, args, opts = {}) => execFileSync(prog, args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, ...opts });
const log = (...a) => console.log(...a);
const arbejd = join(her, "r", `_hent-${maal}`);
const ud = join(her, "r", maal);
mkdirSync(arbejd, { recursive: true });

function hent(url, fil) {
  if (existsSync(fil) && statSync(fil).size > 0) return;
  log("henter", url);
  koer("curl", ["-sSL", "--fail", "-m", "1800", "-o", fil, url]);
}

/** CRANs PACKAGES-indeks → { navn: { Version, Depends, Imports, LinkingTo, File, License } } */
function laesIndeks(tekst) {
  const pk = {};
  for (const blok of tekst.split(/\n\n+/)) {
    const f = {}; let sidste = null;
    for (const l of blok.split("\n")) {
      const m = /^([A-Za-z]+):\s*(.*)$/.exec(l);
      if (m) { sidste = m[1]; f[m[1]] = m[2]; } else if (sidste && /^\s/.test(l)) f[sidste] += " " + l.trim();
    }
    if (f.Package) pk[f.Package] = f;
  }
  return pk;
}
function pakkeliste(pk) {
  const deps = (p) => ["Depends", "Imports", "LinkingTo"].flatMap((k) => (pk[p]?.[k] || "").split(",").map((s) => s.trim().replace(/\s*\(.*\)$/, "")).filter(Boolean));
  const set = new Set(), koe = [...PAKKER];
  while (koe.length) {
    const p = koe.shift();
    if (MED_R.has(p) || set.has(p)) continue;
    if (!pk[p]) throw new Error(`Pakken ${p} findes ikke i CRANs indeks for ${maal}`);
    set.add(p);
    koe.push(...deps(p));
  }
  return [...set].sort();
}

// ── Mac ──────────────────────────────────────────────────────────────────────────────
function pakMac() {
  const chip = maal === "mac-x64" ? "x86_64" : "arm64";
  const cranMappe = `${CRAN}/bin/macosx/big-sur-${chip}`;
  const pkg = join(arbejd, `R-${R_VERSION}-${chip}.pkg`);
  hent(`${cranMappe}/base/R-${R_VERSION}-${chip}.pkg`, pkg);
  const udpakket = join(arbejd, "udpakket");
  if (!existsSync(join(udpakket, "R-fw.pkg"))) { rmSync(udpakket, { recursive: true, force: true }); koer("pkgutil", ["--expand-full", pkg, udpakket]); }
  const fw = join(udpakket, "R-fw.pkg", "Payload", "R.framework", "Versions");
  const version = readdirSync(fw).find((n) => n !== "Current");
  const kilde = join(fw, version, "Resources");
  const gammelHome = `/Library/Frameworks/R.framework/Versions/${version}/Resources`;
  log("R", version, "fra", kilde);

  rmSync(ud, { recursive: true, force: true });
  mkdirSync(ud, { recursive: true });
  for (const n of ["bin", "etc", "lib", "library", "modules", "share", "COPYING", "SVN-REVISION", "Info.plist"]) {
    if (existsSync(join(kilde, n))) cpSync(join(kilde, n), join(ud, n), { recursive: true, verbatimSymlinks: true });
  }
  // Fjern det appen ikke bruger: fejlsøgningssymboler, Tcl/Tk (kræver /opt/R), X11, hjælp, tests og dokumentation
  for (const n of readdirSync(join(ud, "lib"))) if (n.endsWith(".dSYM")) rmSync(join(ud, "lib", n), { recursive: true, force: true });
  for (const n of ["library/tcltk", "modules/R_X11.so", "modules/R_de.so", "library/grDevices/libs/cairo.so", "bin/qpdf"]) rmSync(join(ud, n), { recursive: true, force: true });
  // (Indeksfilen library/tcltk væk → R må ikke tro den findes)

  // R-scriptet finder nu selv sin mappe. (Linje 4–33 i CRANs script sætter R_HOME_DIR fast og advarer, hvis R_HOME er sat.)
  const script = join(ud, "bin", "R");
  let s = readFileSync(script, "utf8");
  s = s.replace(/^R_HOME_DIR="[^"]*"$/m, 'R_HOME_DIR="$(cd "$(dirname "$0")/.." && pwd -P)"');
  s = s.replace(/^if test "\$\{R_HOME_DIR\}" = "\/Library\/Frameworks\/lib\/R"; then[\s\S]*?^fi$/m, "");
  s = s.replace(/^if test -n "\$\{R_HOME\}" && \\\n\s*test "\$\{R_HOME\}" != "\$\{R_HOME_DIR\}"; then\n\s*echo "WARNING: ignoring environment value of R_HOME"\nfi$/m, "");
  writeFileSync(script, s);
  // etc/Renviron: ingen henvisninger til /opt/R eller /Library
  const renv = join(ud, "etc", "Renviron");
  writeFileSync(renv, readFileSync(renv, "utf8").replace(/'\/opt\/R[^']*'/g, "''").replace(/'\/Library\/Frameworks[^']*'/g, "''"));
  // etc/Makeconf bruges kun til at bygge pakker — der skal ikke bygges i appen
  const mk = join(ud, "etc", "Makeconf");
  if (existsSync(mk)) writeFileSync(mk, readFileSync(mk, "utf8").split(gammelHome).join("$(R_HOME)"));

  // Pakker: færdige binære pakker for chippen, inkl. afhængigheder
  const indeksFil = join(arbejd, "PACKAGES");
  hent(`${cranMappe}/contrib/${R_KORT}/PACKAGES`, indeksFil);
  const pk = laesIndeks(readFileSync(indeksFil, "utf8"));
  const liste = pakkeliste(pk);
  log(liste.length, "pakker:", liste.join(" "));
  const pakkeMappe = join(arbejd, "pakker"); mkdirSync(pakkeMappe, { recursive: true });
  const licenser = [`R ${R_VERSION} — GPL-2 | GPL-3 (COPYING)`, ""];
  for (const p of liste) {
    const fil = pk[p].File || `${p}_${pk[p].Version}.tgz`;
    hent(`${cranMappe}/contrib/${R_KORT}/${fil}`, join(pakkeMappe, fil));
    koer("tar", ["-xzf", join(pakkeMappe, fil), "-C", join(ud, "library")]);
    licenser.push(`${p} ${pk[p].Version} — ${pk[p].License || "?"}`);
  }
  writeFileSync(join(ud, "PAKKER-LICENSER.txt"), licenser.join("\n") + "\n");
  // Hjælp, dokumentation og tests fylder — og bruges ikke af appen
  for (const p of readdirSync(join(ud, "library"))) {
    for (const n of ["help", "html", "doc", "tests", "demo", "include", "examples", "extdata/testfiles"]) rmSync(join(ud, "library", p, n), { recursive: true, force: true });
  }
  rmSync(join(ud, "share", "doc"), { recursive: true, force: true });

  // Omskriv stierne: /Library/Frameworks/R.framework/…/lib/X.dylib → @rpath/X.dylib, og giv programmerne en rpath til lib
  const maskiner = [];
  const gaa = (m) => { for (const n of readdirSync(m)) { const f = join(m, n); const st = lstatSync(f); if (st.isSymbolicLink()) continue; if (st.isDirectory()) gaa(f); else if (/\.(dylib|so)$/.test(n) || /\/bin\/(exec\/R|Rscript)$/.test(f)) maskiner.push(f); } };
  gaa(ud);
  let rettet = 0;
  for (const f of maskiner) {
    let linjer;
    try { linjer = koer("otool", ["-L", f]).split("\n").slice(1).map((l) => l.trim().split(" ")[0]).filter(Boolean); } catch { continue; }
    const args = [];
    for (const l of linjer) if (l.startsWith("/Library/Frameworks/R.framework/")) args.push("-change", l, `@rpath/${basename(l)}`);
    if (/\.dylib$/.test(f)) {
      const id = koer("otool", ["-D", f]).split("\n")[1]?.trim();
      if (id && id.startsWith("/Library/Frameworks/R.framework/")) args.push("-id", `@rpath/${basename(f)}`);
    }
    if (args.length) { koer("install_name_tool", [...args, f]); rettet++; }
  }
  // rpath: programmerne ligger i bin/exec og bin; .so-filer i library/<pakke>/libs og modules
  const rpathFor = (f) => { const rel = dirname(f).slice(ud.length + 1).split("/").map(() => "..").join("/"); return `@loader_path/${rel}/lib`; };
  for (const f of maskiner) {
    try { koer("install_name_tool", ["-add_rpath", rpathFor(f), f]); } catch { /* findes allerede */ }
  }
  log("omskrev stier i", rettet, "filer; rpath i", maskiner.length);
  // Signaturen går tabt ved omskrivningen: ad hoc-signatur, så filerne kan køre (ved udgivelse signerer electron-builder dem igen)
  for (const f of maskiner) koer("codesign", ["--force", "-s", "-", f]);
  koer("chmod", ["-R", "u+w", ud]);
  log("R til", maal, "er klar i", ud, "(" + koer("du", ["-sh", ud]).split("\t")[0] + ")");
}

// ── Windows ──────────────────────────────────────────────────────────────────────────
function pakWin() {
  const exe = join(arbejd, `R-${R_VERSION}-win.exe`);
  hent(`${CRAN}/bin/windows/base/R-${R_VERSION}-win.exe`, exe);
  const udpakket = join(arbejd, "udpakket");
  if (!existsSync(join(udpakket, "app"))) {
    rmSync(udpakket, { recursive: true, force: true });
    // innoextract (brew install innoextract / apt install innoextract) pakker Inno Setup-installere ud uden at installere
    koer("innoextract", ["-s", "-d", udpakket, exe]);
  }
  rmSync(ud, { recursive: true, force: true });
  cpSync(join(udpakket, "app"), ud, { recursive: true });
  for (const n of ["doc", "tests", "Tcl", "library/tcltk"]) rmSync(join(ud, n), { recursive: true, force: true });
  const indeksFil = join(arbejd, "PACKAGES");
  hent(`${CRAN}/bin/windows/contrib/${R_KORT}/PACKAGES`, indeksFil);
  const pk = laesIndeks(readFileSync(indeksFil, "utf8"));
  const liste = pakkeliste(pk);
  log(liste.length, "pakker:", liste.join(" "));
  const pakkeMappe = join(arbejd, "pakker"); mkdirSync(pakkeMappe, { recursive: true });
  const licenser = [`R ${R_VERSION} — GPL-2 | GPL-3 (COPYING)`, ""];
  for (const p of liste) {
    const fil = pk[p].File || `${p}_${pk[p].Version}.zip`;
    hent(`${CRAN}/bin/windows/contrib/${R_KORT}/${fil}`, join(pakkeMappe, fil));
    koer("unzip", ["-oq", join(pakkeMappe, fil), "-d", join(ud, "library")]);
    licenser.push(`${p} ${pk[p].Version} — ${pk[p].License || "?"}`);
  }
  writeFileSync(join(ud, "PAKKER-LICENSER.txt"), licenser.join("\n") + "\n");
  for (const p of readdirSync(join(ud, "library"))) {
    for (const n of ["help", "html", "doc", "tests", "demo", "include", "examples"]) rmSync(join(ud, "library", p, n), { recursive: true, force: true });
  }
  log("R til", maal, "er klar i", ud);
}

if (maal.startsWith("mac")) pakMac(); else pakWin();
