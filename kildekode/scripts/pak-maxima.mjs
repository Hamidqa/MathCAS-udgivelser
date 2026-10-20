// Samler en Maxima, der kan ligge inde i desktop-appen og køre uden Homebrew
// (fase 2 i ELECTRON_PLAN.md). Resultatet lægges i electron/maxima/<platform> og
// kommer ikke med i git — det er ca. 100 MB.
//
//   node electron/pak-maxima.mjs mac-x64     fra den Maxima der er installeret med Homebrew på denne Mac
//   node electron/pak-maxima.mjs mac-arm64   fra Homebrews færdige pakker til Apple Silicon
//
// Maxima er et Lisp-program: SBCL (et lille program) indlæser maxima.core. Derudover skal
// mappen "share" med, for dér ligger de pakker CAS-motoren indlæser (to_poly_solve, fourier_elim …).
import { execFileSync } from "node:child_process";
import { chmodSync, cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const her = dirname(fileURLToPath(import.meta.url));
const maal = process.argv[2];
if (!["mac-x64", "mac-arm64"].includes(maal)) { console.error("Brug: node electron/pak-maxima.mjs mac-x64 | mac-arm64"); process.exit(1); }

const koer = (prog, args) => execFileSync(prog, args, { encoding: "utf8" }).trim();
const eneste = (mappe) => join(mappe, readdirSync(mappe).filter((n) => !n.startsWith("."))[0]);

/** Hent en af Homebrews færdige pakker til et bestemt system og pak den ud. Giver pakkens mappe (…/navn/version). */
function hentPakke(navn, system) {
  koer("brew", ["fetch", "--force", `--bottle-tag=${system}`, navn]);
  const fil = koer("brew", ["--cache", `--bottle-tag=${system}`, navn]);
  const ud = mkdtempSync(join(tmpdir(), `mathcas-${navn}-`));
  koer("tar", ["-xzf", fil, "-C", ud]);
  return eneste(join(ud, navn));
}

// Hvor delene kommer fra. zstd (som SBCL bruger) hentes altid som færdig pakke til et ældre
// macOS, så appen også kan køre på computere, der ikke har det nyeste system.
const kilde = maal === "mac-x64"
  ? { maxima: koer("brew", ["--prefix", "maxima"]), sbcl: koer("brew", ["--prefix", "sbcl"]), zstd: hentPakke("zstd", "sonoma") }
  : { maxima: hentPakke("maxima", "arm64_sequoia"), sbcl: hentPakke("sbcl", "arm64_sequoia"), zstd: hentPakke("zstd", "arm64_sonoma") };

const version = readdirSync(join(kilde.maxima, "lib", "maxima"))[0];
const kerne = join(kilde.maxima, "lib", "maxima", version, "binary-sbcl", "maxima.core");
if (!existsSync(kerne)) { console.error(`Fandt ikke ${kerne}`); process.exit(1); }

const ud = join(her, "maxima", maal);
rmSync(ud, { recursive: true, force: true });
mkdirSync(join(ud, "bin"), { recursive: true });
mkdirSync(join(ud, "lib", "maxima", version, "binary-sbcl"), { recursive: true });
mkdirSync(join(ud, "share", "maxima", version), { recursive: true });

cpSync(join(kilde.sbcl, "libexec", "bin", "sbcl"), join(ud, "bin", "sbcl"));
// libzstd.1.dylib er en genvej til den rigtige fil — kopiér filen selv
cpSync(realpathSync(join(kilde.zstd, "lib", "libzstd.1.dylib")), join(ud, "bin", "libzstd.1.dylib"));
cpSync(kerne, join(ud, "lib", "maxima", version, "binary-sbcl", "maxima.core"));
cpSync(join(kilde.maxima, "share", "maxima", version, "share"), join(ud, "share", "maxima", version, "share"), { recursive: true });
// Indekset til Maximas hjælp — uden det skriver Maxima en advarsel ved hver start
mkdirSync(join(ud, "info"), { recursive: true });
for (const n of ["maxima-index.lisp", "maxima-index-html.lisp"]) {
  const fil = join(kilde.maxima, "share", "info", n);
  if (existsSync(fil)) cpSync(fil, join(ud, "info", n));
}
chmodSync(join(ud, "bin", "sbcl"), 0o755);
chmodSync(join(ud, "bin", "libzstd.1.dylib"), 0o644);

// SBCL leder efter zstd i Homebrews mappe — peg den på filen ved siden af i stedet
const linjer = koer("otool", ["-L", join(ud, "bin", "sbcl")]).split("\n").map((l) => l.trim().split(" ")[0]);
const gammel = linjer.find((l) => l.includes("libzstd"));
if (gammel) koer("install_name_tool", ["-change", gammel, "@executable_path/libzstd.1.dylib", join(ud, "bin", "sbcl")]);
koer("install_name_tool", ["-id", "@executable_path/libzstd.1.dylib", join(ud, "bin", "libzstd.1.dylib")]);
// Efter ændringen skal filerne signeres igen (kræves på Apple Silicon); "-" = lokal signatur uden certifikat
for (const f of ["libzstd.1.dylib", "sbcl"]) koer("codesign", ["--force", "-s", "-", join(ud, "bin", f)]);

// Starteren finder selv sin mappe, så hele mappen kan flyttes ind i appen
writeFileSync(join(ud, "maxima"), `#!/bin/sh
# MathCAS' egen Maxima ${version} — bygget af electron/pak-maxima.mjs
HER=$(cd "$(dirname "$0")" && pwd)
MAXIMA_PREFIX="$HER"
export MAXIMA_PREFIX
exec "$HER/bin/sbcl" --core "$HER/lib/maxima/${version}/binary-sbcl/maxima.core" --noinform --end-runtime-options --eval '(cl-user::run)' --end-toplevel-options "$@"
`);
chmodSync(join(ud, "maxima"), 0o755);
// Homebrews filer er skrivebeskyttede — appen skal kunne signeres og slettes igen
koer("chmod", ["-R", "u+w", ud]);
writeFileSync(join(ud, "VERSION"), `${version}\n`);

console.log(`Maxima ${version} til ${maal} ligger i ${ud} (${koer("du", ["-sh", ud]).split("\t")[0]})`);
