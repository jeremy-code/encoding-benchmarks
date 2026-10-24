# encoding-benchmarks

[![GitHub Actions](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml)

## Benchmarks

Benchmarks are ran in GitHub Actions using the default benchmark settings with Vitest and tiny-bench. It is ran once in both in Node.js and in headless Chromium. For Chromium, a polyfill for the Node.js Buffer API is provided by the [`buffer`](https://www.npmjs.com/package/buffer) npm library via [vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) for `iconv-lite`'s use. Fixtures are generated from sample data representative of typical text that the encoding would use (see [./fixtures/README.md](./fixtures/README.md) for more information). Expected output data is generated from the output from Python's system encoding library (see [./scripts/update-fixtures.py](./scripts/update-fixtures.py)).

## Results

Faster library is **bolded** and <mark>highlighted</mark>. Library versions are [iconv-nano](https://www.npmjs.com/package/iconv-nano)@0.0.16 and [iconv-lite](https://www.npmjs.com/package/iconv-lite)@0.7.3. Ran on Node.js v26.11.1 and Chromium 156.0.8078.4 on [GitHub Actions runner ubuntu26 version 20261012.163.1 (X64)](https://github.com/jeremy-code/encoding-benchmarks/actions/runs/40054745443).

### Node.js

| library                     | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| --------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| iconv-nano                  | ASCII     | encode    | 314,901.39   | 0.0029 | 0.0034 | 0.0032 | 0.0061 | 0.0077 | 0.0129 | ±3.10% | 294187  |
| <mark>**iconv-lite**</mark> | ASCII     | encode    | 371,071.34   | 0.0024 | 0.0029 | 0.0027 | 0.0068 | 0.0083 | 0.0133 | ±2.35% | 345569  |
| <mark>**iconv-nano**</mark> | ASCII     | decode    | 1,390,841.30 | 0.0006 | 0.0008 | 0.0008 | 0.0011 | 0.0012 | 0.0033 | ±1.04% | 1329278 |
| iconv-lite                  | ASCII     | decode    | 313,057.44   | 0.0027 | 0.0035 | 0.0032 | 0.0091 | 0.0118 | 0.0699 | ±0.82% | 283474  |
| <mark>**iconv-nano**</mark> | Big5      | encode    | 710,509.27   | 0.0012 | 0.0018 | 0.0014 | 0.0061 | 0.0077 | 0.0126 | ±7.70% | 567723  |
| iconv-lite                  | Big5      | encode    | 553,104.18   | 0.0015 | 0.0020 | 0.0018 | 0.0066 | 0.0093 | 0.0130 | ±0.21% | 491115  |
| <mark>**iconv-nano**</mark> | Big5      | decode    | 652,924.29   | 0.0015 | 0.0016 | 0.0015 | 0.0019 | 0.0021 | 0.0076 | ±0.83% | 641131  |
| iconv-lite                  | Big5      | decode    | 480,550.91   | 0.0018 | 0.0022 | 0.0021 | 0.0060 | 0.0076 | 0.0115 | ±0.13% | 452427  |
| iconv-nano                  | GBK       | encode    | 373,119.43   | 0.0023 | 0.0031 | 0.0027 | 0.0088 | 0.0107 | 0.0156 | ±3.52% | 323734  |
| <mark>**iconv-lite**</mark> | GBK       | encode    | 356,169.09   | 0.0025 | 0.0030 | 0.0028 | 0.0059 | 0.0083 | 0.0119 | ±3.69% | 328595  |
| <mark>**iconv-nano**</mark> | GBK       | decode    | 493,876.77   | 0.0018 | 0.0021 | 0.0021 | 0.0037 | 0.0041 | 0.0088 | ±0.34% | 478594  |
| iconv-lite                  | GBK       | decode    | 333,204.07   | 0.0026 | 0.0031 | 0.0030 | 0.0077 | 0.0092 | 0.0130 | ±0.19% | 318433  |
| <mark>**iconv-nano**</mark> | Shift JIS | encode    | 780,545.10   | 0.0011 | 0.0016 | 0.0012 | 0.0067 | 0.0086 | 0.0124 | ±2.43% | 611565  |
| iconv-lite                  | Shift JIS | encode    | 669,134.74   | 0.0013 | 0.0017 | 0.0015 | 0.0058 | 0.0078 | 0.0109 | ±0.19% | 591784  |
| <mark>**iconv-nano**</mark> | Shift JIS | decode    | 781,883.69   | 0.0012 | 0.0013 | 0.0013 | 0.0016 | 0.0018 | 0.0074 | ±0.21% | 769103  |
| iconv-lite                  | Shift JIS | decode    | 570,239.86   | 0.0015 | 0.0019 | 0.0018 | 0.0056 | 0.0076 | 0.0109 | ±1.33% | 522326  |
| <mark>**iconv-nano**</mark> | EUC-KR    | encode    | 511,472.69   | 0.0017 | 0.0024 | 0.0020 | 0.0079 | 0.0098 | 0.0146 | ±5.47% | 423110  |
| iconv-lite                  | EUC-KR    | encode    | 300,929.46   | 0.0030 | 0.0035 | 0.0033 | 0.0082 | 0.0095 | 0.0136 | ±2.01% | 284023  |
| <mark>**iconv-nano**</mark> | EUC-KR    | decode    | 675,251.92   | 0.0013 | 0.0015 | 0.0015 | 0.0021 | 0.0023 | 0.0079 | ±0.21% | 661211  |
| iconv-lite                  | EUC-KR    | decode    | 346,032.91   | 0.0026 | 0.0030 | 0.0029 | 0.0076 | 0.0088 | 0.0132 | ±0.19% | 329053  |
| iconv-nano                  | UTF-8     | encode    | 2,114,616.48 | 0.0003 | 0.0007 | 0.0006 | 0.0033 | 0.0044 | 0.0082 | ±8.59% | 1397354 |
| <mark>**iconv-lite**</mark> | UTF-8     | encode    | 2,425,070.37 | 0.0004 | 0.0004 | 0.0004 | 0.0008 | 0.0010 | 0.0015 | ±0.60% | 2362506 |
| <mark>**iconv-nano**</mark> | UTF-8     | decode    | 1,117,563.62 | 0.0008 | 0.0010 | 0.0009 | 0.0014 | 0.0017 | 0.0103 | ±0.43% | 1039307 |
| iconv-lite                  | UTF-8     | decode    | 1,157,239.50 | 0.0006 | 0.0011 | 0.0009 | 0.0050 | 0.0056 | 0.0085 | ±0.30% | 884366  |
| iconv-nano                  | UTF-16    | encode    | 794,705.43   | 0.0011 | 0.0016 | 0.0013 | 0.0043 | 0.0056 | 0.0132 | ±6.85% | 634793  |
| <mark>**iconv-lite**</mark> | UTF-16    | encode    | 1,897,428.98 | 0.0005 | 0.0006 | 0.0005 | 0.0012 | 0.0020 | 0.0053 | ±1.83% | 1699083 |
| iconv-nano                  | UTF-16    | decode    | 890,563.06   | 0.0010 | 0.0012 | 0.0012 | 0.0017 | 0.0018 | 0.0085 | ±0.30% | 860670  |
| <mark>**iconv-lite**</mark> | UTF-16    | decode    | 1,139,416.54 | 0.0007 | 0.0011 | 0.0009 | 0.0047 | 0.0053 | 0.0087 | ±1.22% | 924304  |

### Chromium

| library                     | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| --------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| <mark>**iconv-nano**</mark> | ASCII     | encode    | 270,294.89   | 0.0000 | 0.0036 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.00% | 279671  |
| iconv-lite                  | ASCII     | encode    | 259,186.67   | 0.0000 | 0.0037 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97% | 268610  |
| <mark>**iconv-nano**</mark> | ASCII     | decode    | 1,295,271.30 | 0.0000 | 0.0008 | 0.0000 | 0.0000 | 0.1000 | 0.1000 | ±1.96% | 1305167 |
| iconv-lite                  | ASCII     | decode    | 84,744.17    | 0.0000 | 0.0107 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±2.04% | 93254   |
| <mark>**iconv-nano**</mark> | Big5      | encode    | 556,372.06   | 0.0000 | 0.0018 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.04% | 566158  |
| iconv-lite                  | Big5      | encode    | 485,520.88   | 0.0000 | 0.0020 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97% | 495279  |
| <mark>**iconv-nano**</mark> | Big5      | decode    | 450,296.07   | 0.0000 | 0.0022 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 460116  |
| iconv-lite                  | Big5      | decode    | 266,846.94   | 0.0000 | 0.0036 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 276457  |
| iconv-nano                  | GBK       | encode    | 256,720.97   | 0.0000 | 0.0038 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96% | 266260  |
| <mark>**iconv-lite**</mark> | GBK       | encode    | 297,182.75   | 0.0000 | 0.0033 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.00% | 306779  |
| <mark>**iconv-nano**</mark> | GBK       | decode    | 205,751.80   | 0.0000 | 0.0046 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92% | 215277  |
| iconv-lite                  | GBK       | decode    | 180,471.99   | 0.0000 | 0.0053 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92% | 189908  |
| <mark>**iconv-nano**</mark> | Shift JIS | encode    | 638,421.55   | 0.0000 | 0.0015 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.06% | 648171  |
| iconv-lite                  | Shift JIS | encode    | 596,126.65   | 0.0000 | 0.0017 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.98% | 605895  |
| iconv-nano                  | Shift JIS | decode    | 212,977.50   | 0.0000 | 0.0045 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92% | 222541  |
| <mark>**iconv-lite**</mark> | Shift JIS | decode    | 363,074.03   | 0.0000 | 0.0027 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 372775  |
| <mark>**iconv-nano**</mark> | EUC-KR    | encode    | 354,064.77   | 0.0000 | 0.0028 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.02% | 363622  |
| iconv-lite                  | EUC-KR    | encode    | 257,054.80   | 0.0000 | 0.0038 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96% | 266617  |
| iconv-nano                  | EUC-KR    | decode    | 93,726.05    | 0.0000 | 0.0097 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.98% | 102703  |
| <mark>**iconv-lite**</mark> | EUC-KR    | decode    | 194,498.64   | 0.0000 | 0.0049 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95% | 203901  |
| <mark>**iconv-nano**</mark> | UTF-8     | encode    | 603,746.26   | 0.0000 | 0.0016 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±4.96% | 612507  |
| iconv-lite                  | UTF-8     | encode    | 173,614.76   | 0.0000 | 0.0055 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±3.85% | 182773  |
| <mark>**iconv-nano**</mark> | UTF-8     | decode    | 616,738.18   | 0.0000 | 0.0016 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.16% | 626285  |
| iconv-lite                  | UTF-8     | decode    | 359,148.86   | 0.0000 | 0.0027 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 368848  |
| <mark>**iconv-nano**</mark> | UTF-16    | encode    | 555,055.10   | 0.0000 | 0.0018 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.46% | 564678  |
| iconv-lite                  | UTF-16    | encode    | 170,192.85   | 0.0000 | 0.0056 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.18% | 179509  |
| <mark>**iconv-nano**</mark> | UTF-16    | decode    | 731,193.74   | 0.0000 | 0.0013 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95% | 741048  |
| iconv-lite                  | UTF-16    | decode    | 162,761.75   | 0.0000 | 0.0058 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92% | 172144  |

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.
