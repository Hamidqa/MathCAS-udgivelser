# Kildekode til tredjepartskomponenterne

MathCAS indeholder Maxima, SBCL og R, som er fri software. Her er kildekoden til **de præcise versioner**, der følger med MathCAS 0.1.0, og de scripts vi bruger til at pakke dem med appen.

## Mac med Intel (mac-x64)

| Komponent | Version | Kildekode |
|---|---|---|
| Maxima | 5.49.0 | [maxima-5.49.0.tar.gz](https://sourceforge.net/projects/maxima/files/Maxima-source/5.49.0-source/maxima-5.49.0.tar.gz/download) |
| SBCL | 2.6.2 | [sbcl-2.6.2-source.tar.bz2](https://sourceforge.net/projects/sbcl/files/sbcl/2.6.2/sbcl-2.6.2-source.tar.bz2/download) |
| R | 4.6.1 | [R-4.6.1.tar.gz](https://cran.r-project.org/src/base/R-4/R-4.6.1.tar.gz) |

## Mac med Apple Silicon (mac-arm64)

| Komponent | Version | Kildekode |
|---|---|---|
| Maxima | 5.50.0 | [maxima-5.50.0.tar.gz](https://sourceforge.net/projects/maxima/files/Maxima-source/5.50.0-source/maxima-5.50.0.tar.gz/download) |
| SBCL | 2.6.9 | [sbcl-2.6.9-source.tar.bz2](https://sourceforge.net/projects/sbcl/files/sbcl/2.6.9/sbcl-2.6.9-source.tar.bz2/download) |

(R følger endnu ikke med Apple Silicon-udgaven.)

## R-pakker (mac-x64)

| Pakke | Version | Kildekode |
|---|---|---|
| backports | 1.5.1 | [CRAN](https://cran.r-project.org/src/contrib/backports_1.5.1.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/backports/backports_1.5.1.tar.gz) |
| base64enc | 0.1-6 | [CRAN](https://cran.r-project.org/src/contrib/base64enc_0.1-6.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/base64enc/base64enc_0.1-6.tar.gz) |
| bit | 4.6.0 | [CRAN](https://cran.r-project.org/src/contrib/bit_4.6.0.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/bit/bit_4.6.0.tar.gz) |
| bit64 | 4.8.6 | [CRAN](https://cran.r-project.org/src/contrib/bit64_4.8.6.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/bit64/bit64_4.8.6.tar.gz) |
| boot | 1.3-32 | [CRAN](https://cran.r-project.org/src/contrib/boot_1.3-32.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/boot/boot_1.3-32.tar.gz) |
| broom | 1.0.13 | [CRAN](https://cran.r-project.org/src/contrib/broom_1.0.13.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/broom/broom_1.0.13.tar.gz) |
| cellranger | 1.1.0 | [CRAN](https://cran.r-project.org/src/contrib/cellranger_1.1.0.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/cellranger/cellranger_1.1.0.tar.gz) |
| class | 7.3-23 | [CRAN](https://cran.r-project.org/src/contrib/class_7.3-23.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/class/class_7.3-23.tar.gz) |
| cli | 3.6.6 | [CRAN](https://cran.r-project.org/src/contrib/cli_3.6.6.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/cli/cli_3.6.6.tar.gz) |
| clipr | 0.8.1 | [CRAN](https://cran.r-project.org/src/contrib/clipr_0.8.1.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/clipr/clipr_0.8.1.tar.gz) |
| cluster | 2.1.8.2 | [CRAN](https://cran.r-project.org/src/contrib/cluster_2.1.8.2.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/cluster/cluster_2.1.8.2.tar.gz) |
| codetools | 0.2-20 | [CRAN](https://cran.r-project.org/src/contrib/codetools_0.2-20.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/codetools/codetools_0.2-20.tar.gz) |
| cpp11 | 0.5.5 | [CRAN](https://cran.r-project.org/src/contrib/cpp11_0.5.5.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/cpp11/cpp11_0.5.5.tar.gz) |
| crayon | 1.5.3 | [CRAN](https://cran.r-project.org/src/contrib/crayon_1.5.3.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/crayon/crayon_1.5.3.tar.gz) |
| dplyr | 1.2.1 | [CRAN](https://cran.r-project.org/src/contrib/dplyr_1.2.1.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/dplyr/dplyr_1.2.1.tar.gz) |
| farver | 2.1.2 | [CRAN](https://cran.r-project.org/src/contrib/farver_2.1.2.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/farver/farver_2.1.2.tar.gz) |
| forcats | 1.0.1 | [CRAN](https://cran.r-project.org/src/contrib/forcats_1.0.1.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/forcats/forcats_1.0.1.tar.gz) |
| foreign | 0.8-91 | [CRAN](https://cran.r-project.org/src/contrib/foreign_0.8-91.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/foreign/foreign_0.8-91.tar.gz) |
| generics | 0.1.4 | [CRAN](https://cran.r-project.org/src/contrib/generics_0.1.4.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/generics/generics_0.1.4.tar.gz) |
| ggplot2 | 4.0.3 | [CRAN](https://cran.r-project.org/src/contrib/ggplot2_4.0.3.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/ggplot2/ggplot2_4.0.3.tar.gz) |
| glue | 1.8.1 | [CRAN](https://cran.r-project.org/src/contrib/glue_1.8.1.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/glue/glue_1.8.1.tar.gz) |
| gtable | 0.3.6 | [CRAN](https://cran.r-project.org/src/contrib/gtable_0.3.6.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/gtable/gtable_0.3.6.tar.gz) |
| haven | 2.5.5 | [CRAN](https://cran.r-project.org/src/contrib/haven_2.5.5.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/haven/haven_2.5.5.tar.gz) |
| hms | 1.1.4 | [CRAN](https://cran.r-project.org/src/contrib/hms_1.1.4.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/hms/hms_1.1.4.tar.gz) |
| isoband | 0.3.0 | [CRAN](https://cran.r-project.org/src/contrib/isoband_0.3.0.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/isoband/isoband_0.3.0.tar.gz) |
| jsonlite | 2.0.0 | [CRAN](https://cran.r-project.org/src/contrib/jsonlite_2.0.0.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/jsonlite/jsonlite_2.0.0.tar.gz) |
| KernSmooth | 2.23-26 | [CRAN](https://cran.r-project.org/src/contrib/KernSmooth_2.23-26.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/KernSmooth/KernSmooth_2.23-26.tar.gz) |
| labeling | 0.4.3 | [CRAN](https://cran.r-project.org/src/contrib/labeling_0.4.3.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/labeling/labeling_0.4.3.tar.gz) |
| lattice | 0.22-9 | [CRAN](https://cran.r-project.org/src/contrib/lattice_0.22-9.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/lattice/lattice_0.22-9.tar.gz) |
| lifecycle | 1.0.5 | [CRAN](https://cran.r-project.org/src/contrib/lifecycle_1.0.5.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/lifecycle/lifecycle_1.0.5.tar.gz) |
| magrittr | 2.0.5 | [CRAN](https://cran.r-project.org/src/contrib/magrittr_2.0.5.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/magrittr/magrittr_2.0.5.tar.gz) |
| MASS | 7.3-65 | [CRAN](https://cran.r-project.org/src/contrib/MASS_7.3-65.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/MASS/MASS_7.3-65.tar.gz) |
| Matrix | 1.7-5 | [CRAN](https://cran.r-project.org/src/contrib/Matrix_1.7-5.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/Matrix/Matrix_1.7-5.tar.gz) |
| mgcv | 1.9-4 | [CRAN](https://cran.r-project.org/src/contrib/mgcv_1.9-4.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/mgcv/mgcv_1.9-4.tar.gz) |
| nlme | 3.1-169 | [CRAN](https://cran.r-project.org/src/contrib/nlme_3.1-169.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/nlme/nlme_3.1-169.tar.gz) |
| nnet | 7.3-20 | [CRAN](https://cran.r-project.org/src/contrib/nnet_7.3-20.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/nnet/nnet_7.3-20.tar.gz) |
| pillar | 1.11.1 | [CRAN](https://cran.r-project.org/src/contrib/pillar_1.11.1.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/pillar/pillar_1.11.1.tar.gz) |
| pkgconfig | 2.0.3 | [CRAN](https://cran.r-project.org/src/contrib/pkgconfig_2.0.3.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/pkgconfig/pkgconfig_2.0.3.tar.gz) |
| prettyunits | 1.2.0 | [CRAN](https://cran.r-project.org/src/contrib/prettyunits_1.2.0.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/prettyunits/prettyunits_1.2.0.tar.gz) |
| progress | 1.2.3 | [CRAN](https://cran.r-project.org/src/contrib/progress_1.2.3.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/progress/progress_1.2.3.tar.gz) |
| purrr | 1.2.2 | [CRAN](https://cran.r-project.org/src/contrib/purrr_1.2.2.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/purrr/purrr_1.2.2.tar.gz) |
| R6 | 2.6.1 | [CRAN](https://cran.r-project.org/src/contrib/R6_2.6.1.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/R6/R6_2.6.1.tar.gz) |
| ragg | 1.5.2 | [CRAN](https://cran.r-project.org/src/contrib/ragg_1.5.2.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/ragg/ragg_1.5.2.tar.gz) |
| RColorBrewer | 1.1-3 | [CRAN](https://cran.r-project.org/src/contrib/RColorBrewer_1.1-3.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/RColorBrewer/RColorBrewer_1.1-3.tar.gz) |
| readr | 2.2.0 | [CRAN](https://cran.r-project.org/src/contrib/readr_2.2.0.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/readr/readr_2.2.0.tar.gz) |
| readxl | 1.5.0.1 | [CRAN](https://cran.r-project.org/src/contrib/readxl_1.5.0.1.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/readxl/readxl_1.5.0.1.tar.gz) |
| rematch | 2.0.0 | [CRAN](https://cran.r-project.org/src/contrib/rematch_2.0.0.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/rematch/rematch_2.0.0.tar.gz) |
| rlang | 1.3.0 | [CRAN](https://cran.r-project.org/src/contrib/rlang_1.3.0.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/rlang/rlang_1.3.0.tar.gz) |
| rpart | 4.1.27 | [CRAN](https://cran.r-project.org/src/contrib/rpart_4.1.27.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/rpart/rpart_4.1.27.tar.gz) |
| S7 | 0.2.2 | [CRAN](https://cran.r-project.org/src/contrib/S7_0.2.2.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/S7/S7_0.2.2.tar.gz) |
| scales | 1.4.0 | [CRAN](https://cran.r-project.org/src/contrib/scales_1.4.0.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/scales/scales_1.4.0.tar.gz) |
| spatial | 7.3-18 | [CRAN](https://cran.r-project.org/src/contrib/spatial_7.3-18.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/spatial/spatial_7.3-18.tar.gz) |
| stringi | 1.8.9 | [CRAN](https://cran.r-project.org/src/contrib/stringi_1.8.9.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/stringi/stringi_1.8.9.tar.gz) |
| stringr | 1.6.0 | [CRAN](https://cran.r-project.org/src/contrib/stringr_1.6.0.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/stringr/stringr_1.6.0.tar.gz) |
| survival | 3.8-6 | [CRAN](https://cran.r-project.org/src/contrib/survival_3.8-6.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/survival/survival_3.8-6.tar.gz) |
| svglite | 2.2.2 | [CRAN](https://cran.r-project.org/src/contrib/svglite_2.2.2.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/svglite/svglite_2.2.2.tar.gz) |
| systemfonts | 1.3.2 | [CRAN](https://cran.r-project.org/src/contrib/systemfonts_1.3.2.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/systemfonts/systemfonts_1.3.2.tar.gz) |
| textshaping | 1.0.5 | [CRAN](https://cran.r-project.org/src/contrib/textshaping_1.0.5.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/textshaping/textshaping_1.0.5.tar.gz) |
| tibble | 3.3.1 | [CRAN](https://cran.r-project.org/src/contrib/tibble_3.3.1.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/tibble/tibble_3.3.1.tar.gz) |
| tidyr | 1.3.2 | [CRAN](https://cran.r-project.org/src/contrib/tidyr_1.3.2.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/tidyr/tidyr_1.3.2.tar.gz) |
| tidyselect | 1.2.1 | [CRAN](https://cran.r-project.org/src/contrib/tidyselect_1.2.1.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/tidyselect/tidyselect_1.2.1.tar.gz) |
| translations | 4.6.1 | [CRAN](https://cran.r-project.org/src/contrib/translations_4.6.1.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/translations/translations_4.6.1.tar.gz) |
| tzdb | 0.5.0 | [CRAN](https://cran.r-project.org/src/contrib/tzdb_0.5.0.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/tzdb/tzdb_0.5.0.tar.gz) |
| utf8 | 1.2.6 | [CRAN](https://cran.r-project.org/src/contrib/utf8_1.2.6.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/utf8/utf8_1.2.6.tar.gz) |
| vctrs | 0.7.3 | [CRAN](https://cran.r-project.org/src/contrib/vctrs_0.7.3.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/vctrs/vctrs_0.7.3.tar.gz) |
| viridisLite | 0.4.3 | [CRAN](https://cran.r-project.org/src/contrib/viridisLite_0.4.3.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/viridisLite/viridisLite_0.4.3.tar.gz) |
| vroom | 1.7.1 | [CRAN](https://cran.r-project.org/src/contrib/vroom_1.7.1.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/vroom/vroom_1.7.1.tar.gz) |
| withr | 3.0.3 | [CRAN](https://cran.r-project.org/src/contrib/withr_3.0.3.tar.gz) · [arkiv](https://cran.r-project.org/src/contrib/Archive/withr/withr_3.0.3.tar.gz) |

## Vores ændringer

Vi ændrer ikke i Maximas, SBCL's eller R's kode. Ved pakningen kopieres de færdige programmer ind i appen, og stierne til de delte biblioteker skrives om (`install_name_tool`), så mappen kan flyttes. Det gøres af scriptene i [`scripts/`](scripts/):

- [`scripts/pak-maxima.mjs`](scripts/pak-maxima.mjs) — samler Maxima og SBCL til appen.
- [`scripts/pak-r.mjs`](scripts/pak-r.mjs) — samler R og R-pakkerne til appen.

Scriptene er udgivet under GNU General Public License, version 2 ([`scripts/LICENSE`](scripts/LICENSE)).

Virker et link ikke, sender vi kildekoden på anmodning: kontakt@mathcas.dk. Tilbuddet gælder i mindst tre år efter, at en version er udgivet.
