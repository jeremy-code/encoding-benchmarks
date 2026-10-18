# encoding-benchmarks

[![GitHub Actions](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml)

## Benchmarks

Benchmarks are ran in GitHub Actions using the default benchmark settings with Vitest and tiny-bench. It is ran once in both in Node.js and in headless Chromium. For Chromium, a polyfill for the Node.js Buffer API is provided by the [`buffer`](https://www.npmjs.com/package/buffer) npm library via [vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) for `iconv-lite`'s use. Fixtures are generated from sample data representative of typical text that the encoding would use (see [./fixtures/README.md](./fixtures/README.md) for more information). Expected output data is generated from the output from Python's system encoding library (see [./scripts/update-fixtures.py](./scripts/update-fixtures.py)).

## Results

Faster library is **bolded** and <mark>highlighted</mark>. Library versions are [iconv-nano](https://www.npmjs.com/package/iconv-nano)@0.0.15 and [iconv-lite](https://www.npmjs.com/package/iconv-lite)@0.7.3. Ran on Node.js v26.11.1 and Chromium 156.0.8078.4 on [GitHub Actions runner ubuntu24 version 20261012.334.1 (X64)](https://github.com/jeremy-code/encoding-benchmarks/actions/runs/39094727466).

### Node.js

| library                     | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme     | samples |
| --------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- | ------- |
| <mark>**iconv-nano**</mark> | ASCII     | encode    | 270,941.75   | 0.0033 | 0.0040 | 0.0036 | 0.0097 | 0.0108 | 0.0184 | ±2.48%  | 251769  |
| iconv-lite                  | ASCII     | encode    | 265,902.64   | 0.0032 | 0.0041 | 0.0036 | 0.0113 | 0.0119 | 0.0187 | ±0.51%  | 245576  |
| <mark>**iconv-nano**</mark> | ASCII     | decode    | 942,352.49   | 0.0008 | 0.0011 | 0.0011 | 0.0017 | 0.0019 | 0.0095 | ±0.42%  | 898245  |
| iconv-lite                  | ASCII     | decode    | 211,584.46   | 0.0042 | 0.0049 | 0.0047 | 0.0121 | 0.0130 | 0.0195 | ±0.23%  | 204326  |
| iconv-nano                  | Big5      | encode    | 531,828.65   | 0.0016 | 0.0028 | 0.0020 | 0.0038 | 0.0044 | 0.0108 | ±30.30% | 351433  |
| <mark>**iconv-lite**</mark> | Big5      | encode    | 443,487.55   | 0.0019 | 0.0024 | 0.0023 | 0.0045 | 0.0054 | 0.0119 | ±2.89%  | 416992  |
| <mark>**iconv-nano**</mark> | Big5      | decode    | 510,510.24   | 0.0018 | 0.0020 | 0.0020 | 0.0028 | 0.0030 | 0.0107 | ±0.98%  | 496063  |
| iconv-lite                  | Big5      | decode    | 350,047.10   | 0.0024 | 0.0030 | 0.0030 | 0.0052 | 0.0059 | 0.0120 | ±0.46%  | 338977  |
| iconv-nano                  | GBK       | encode    | 112,896.62   | 0.0083 | 0.0093 | 0.0088 | 0.0170 | 0.0195 | 0.0367 | ±3.30%  | 107104  |
| <mark>**iconv-lite**</mark> | GBK       | encode    | 266,327.42   | 0.0034 | 0.0041 | 0.0037 | 0.0071 | 0.0093 | 0.0160 | ±5.93%  | 242842  |
| <mark>**iconv-nano**</mark> | GBK       | decode    | 406,105.97   | 0.0022 | 0.0025 | 0.0025 | 0.0033 | 0.0036 | 0.0113 | ±0.61%  | 396817  |
| iconv-lite                  | GBK       | decode    | 245,164.99   | 0.0035 | 0.0043 | 0.0041 | 0.0108 | 0.0118 | 0.0162 | ±0.23%  | 234365  |
| iconv-nano                  | Shift JIS | encode    | 478,997.15   | 0.0014 | 0.0024 | 0.0028 | 0.0052 | 0.0059 | 0.0116 | ±0.21%  | 420265  |
| <mark>**iconv-lite**</mark> | Shift JIS | encode    | 488,795.78   | 0.0017 | 0.0022 | 0.0021 | 0.0055 | 0.0097 | 0.0264 | ±0.62%  | 445798  |
| <mark>**iconv-nano**</mark> | Shift JIS | decode    | 592,825.15   | 0.0015 | 0.0017 | 0.0017 | 0.0024 | 0.0027 | 0.0102 | ±0.38%  | 577740  |
| iconv-lite                  | Shift JIS | decode    | 402,581.20   | 0.0020 | 0.0026 | 0.0026 | 0.0048 | 0.0055 | 0.0118 | ±0.31%  | 383813  |
| <mark>**iconv-nano**</mark> | EUC-KR    | encode    | 369,149.28   | 0.0023 | 0.0038 | 0.0028 | 0.0058 | 0.0068 | 0.0134 | ±15.42% | 267661  |
| iconv-lite                  | EUC-KR    | encode    | 254,063.83   | 0.0036 | 0.0043 | 0.0039 | 0.0108 | 0.0120 | 0.0188 | ±4.92%  | 230852  |
| <mark>**iconv-nano**</mark> | EUC-KR    | decode    | 511,212.20   | 0.0017 | 0.0020 | 0.0020 | 0.0030 | 0.0032 | 0.0108 | ±0.38%  | 497364  |
| iconv-lite                  | EUC-KR    | decode    | 242,556.98   | 0.0035 | 0.0043 | 0.0041 | 0.0112 | 0.0120 | 0.0178 | ±0.23%  | 231924  |
| iconv-nano                  | UTF-8     | encode    | 1,915,823.26 | 0.0004 | 0.0009 | 0.0007 | 0.0021 | 0.0030 | 0.0053 | ±14.20% | 1156157 |
| <mark>**iconv-lite**</mark> | UTF-8     | encode    | 1,860,268.76 | 0.0004 | 0.0006 | 0.0006 | 0.0013 | 0.0016 | 0.0041 | ±2.54%  | 1731266 |
| iconv-nano                  | UTF-8     | decode    | 852,095.74   | 0.0010 | 0.0012 | 0.0012 | 0.0019 | 0.0021 | 0.0095 | ±2.88%  | 804180  |
| <mark>**iconv-lite**</mark> | UTF-8     | decode    | 905,219.27   | 0.0008 | 0.0012 | 0.0012 | 0.0040 | 0.0069 | 0.0193 | ±0.39%  | 805719  |
| iconv-nano                  | UTF-16    | encode    | 521,437.41   | 0.0016 | 0.0022 | 0.0019 | 0.0053 | 0.0060 | 0.0117 | ±5.01%  | 453782  |
| <mark>**iconv-lite**</mark> | UTF-16    | encode    | 1,327,585.03 | 0.0005 | 0.0008 | 0.0008 | 0.0017 | 0.0021 | 0.0087 | ±1.07%  | 1199110 |
| iconv-nano                  | UTF-16    | decode    | 633,663.04   | 0.0013 | 0.0017 | 0.0016 | 0.0026 | 0.0028 | 0.0109 | ±2.13%  | 600765  |
| <mark>**iconv-lite**</mark> | UTF-16    | decode    | 874,079.53   | 0.0008 | 0.0013 | 0.0013 | 0.0028 | 0.0098 | 0.0190 | ±0.92%  | 773460  |

### Chromium

| library                     | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme     | samples |
| --------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- | ------- |
| <mark>**iconv-nano**</mark> | ASCII     | encode    | 206,561.74   | 0.0000 | 0.0046 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±5.81%  | 215758  |
| iconv-lite                  | ASCII     | encode    | 195,797.67   | 0.0000 | 0.0049 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97%  | 205111  |
| <mark>**iconv-nano**</mark> | ASCII     | decode    | 1,129,634.51 | 0.0000 | 0.0009 | 0.0000 | 0.0000 | 0.1000 | 0.1000 | ±1.96%  | 1139637 |
| iconv-lite                  | ASCII     | decode    | 60,457.20    | 0.0000 | 0.0145 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±1.86%  | 68852   |
| <mark>**iconv-nano**</mark> | Big5      | encode    | 387,693.26   | 0.0000 | 0.0025 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.33%  | 397285  |
| iconv-lite                  | Big5      | encode    | 369,911.08   | 0.0000 | 0.0026 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.04%  | 379607  |
| <mark>**iconv-nano**</mark> | Big5      | decode    | 346,652.91   | 0.0000 | 0.0028 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.08%  | 356317  |
| iconv-lite                  | Big5      | decode    | 202,336.47   | 0.0000 | 0.0047 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 211773  |
| iconv-nano                  | GBK       | encode    | 131,488.15   | 0.0000 | 0.0071 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 140691  |
| <mark>**iconv-lite**</mark> | GBK       | encode    | 237,313.97   | 0.0000 | 0.0041 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96%  | 246870  |
| <mark>**iconv-nano**</mark> | GBK       | decode    | 164,023.83   | 0.0000 | 0.0058 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.91%  | 173428  |
| iconv-lite                  | GBK       | decode    | 146,965.49   | 0.0000 | 0.0064 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92%  | 156230  |
| iconv-nano                  | Shift JIS | encode    | 453,024.93   | 0.0000 | 0.0022 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±16.07% | 461978  |
| <mark>**iconv-lite**</mark> | Shift JIS | encode    | 467,390.48   | 0.0000 | 0.0021 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.02%  | 477134  |
| iconv-nano                  | Shift JIS | decode    | 173,704.61   | 0.0000 | 0.0055 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.91%  | 183142  |
| <mark>**iconv-lite**</mark> | Shift JIS | decode    | 257,591.70   | 0.0000 | 0.0037 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96%  | 267096  |
| <mark>**iconv-nano**</mark> | EUC-KR    | encode    | 298,230.70   | 0.0000 | 0.0032 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.71%  | 307736  |
| iconv-lite                  | EUC-KR    | encode    | 235,904.96   | 0.0000 | 0.0041 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96%  | 245416  |
| iconv-nano                  | EUC-KR    | decode    | 92,136.10    | 0.0000 | 0.0099 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.87%  | 101130  |
| <mark>**iconv-lite**</mark> | EUC-KR    | decode    | 149,680.24   | 0.0000 | 0.0063 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92%  | 158988  |
| <mark>**iconv-nano**</mark> | UTF-8     | encode    | 489,435.98   | 0.0000 | 0.0020 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±4.87%  | 498493  |
| iconv-lite                  | UTF-8     | encode    | 147,357.85   | 0.0000 | 0.0064 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.23%  | 156548  |
| <mark>**iconv-nano**</mark> | UTF-8     | decode    | 549,059.78   | 0.0000 | 0.0018 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.24%  | 558634  |
| iconv-lite                  | UTF-8     | decode    | 274,295.29   | 0.0000 | 0.0035 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 283846  |
| <mark>**iconv-nano**</mark> | UTF-16    | encode    | 422,886.33   | 0.0000 | 0.0023 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±3.68%  | 432369  |
| iconv-lite                  | UTF-16    | encode    | 136,606.02   | 0.0000 | 0.0069 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.02%  | 145803  |
| <mark>**iconv-nano**</mark> | UTF-16    | decode    | 562,510.20   | 0.0000 | 0.0017 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 572381  |
| iconv-lite                  | UTF-16    | decode    | 128,852.29   | 0.0000 | 0.0072 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92%  | 138022  |

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.
