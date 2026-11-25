# encoding-benchmarks

[![GitHub Actions](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml)

## Benchmarks

Benchmarks are ran in GitHub Actions using the default benchmark settings with Vitest and tiny-bench. It is ran once in both in Node.js and in headless Chromium. For Chromium, a polyfill for the Node.js Buffer API is provided by the [`buffer`](https://www.npmjs.com/package/buffer) npm library via [vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) for `iconv-lite`'s use. Fixtures are generated from sample data representative of typical text that the encoding would use (see [./fixtures/README.md](./fixtures/README.md) for more information). Expected output data is generated from the output from Python's system encoding library (see [./scripts/update-fixtures.py](./scripts/update-fixtures.py)).

### Additional notes

- The 'ASCII' encoding is actually [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) as opposed to 7-bit ASCII. This is because this is what the whatwg/encoding standard should be aliased for ASCII. It is also more useful as a benchmark, as 7-bit ASCII is a subset of UTF-8, so Windows-1252 is more representative of what typical single byte encoding performance should be. The encoding performance for single-byte encodings is essentially identical among encodings (as one would expect), so Windows-1252 is the only representative to avoid skewing the results one way or another.
- Input data is provided based on what is expected for the encoding. For example, iconv-nano can handle characters comprised of multiple code points for single-byte encodings (`iconv.ascii.encode('😅')` encodes into '?') while iconv-lite cannot (it encodes into '??'). See [pillarjs/iconv-lite#368](https://github.com/pillarjs/iconv-lite/issues/368). This issue will not be represented in the ASCII encoding fixture.

## Results

Faster library is **bolded**, <mark>highlighted</mark>, and denoted with ⚡. Library versions are [iconv-nano](https://www.npmjs.com/package/iconv-nano)@0.0.22, [iconv-lite](https://www.npmjs.com/package/iconv-lite)@0.7.3, and [iconv-lite (beta)](https://www.npmjs.com/package/iconv-lite)@1.0.0-beta.1. Ran on Node.js v26.13.1 and Chromium 159.0.8154.6 on [GitHub Actions runner ubuntu26 version 20261116.88.1 (X64)](https://github.com/jeremy-code/encoding-benchmarks/actions/runs/45516274484).

### Node.js

| library                       | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| ----------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | encode    | 343,110.72   | 0.0027 | 0.0031 | 0.0029 | 0.0058 | 0.0081 | 0.0133 | ±2.61% | 320696  |
| iconv-lite                    | ASCII     | encode    | 292,239.18   | 0.0030 | 0.0036 | 0.0034 | 0.0080 | 0.0112 | 0.0159 | ±1.16% | 277975  |
| iconv-lite (beta)             | ASCII     | encode    | 196,292.19   | 0.0046 | 0.0052 | 0.0050 | 0.0105 | 0.0131 | 0.0170 | ±0.16% | 191930  |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | decode    | 3,761,706.65 | 0.0002 | 0.0003 | 0.0003 | 0.0005 | 0.0006 | 0.0018 | ±0.39% | 3484290 |
| iconv-lite                    | ASCII     | decode    | 243,410.89   | 0.0035 | 0.0044 | 0.0040 | 0.0111 | 0.0141 | 0.0177 | ±0.76% | 229707  |
| iconv-lite (beta)             | ASCII     | decode    | 333,471.92   | 0.0024 | 0.0032 | 0.0031 | 0.0074 | 0.0101 | 0.0180 | ±0.28% | 313005  |
| iconv-nano                    | Big5      | encode    | 423,103.69   | 0.0018 | 0.0028 | 0.0024 | 0.0115 | 0.0135 | 0.0183 | ±3.17% | 360569  |
| <mark>**iconv-lite**</mark>⚡ | Big5      | encode    | 488,617.63   | 0.0018 | 0.0023 | 0.0020 | 0.0079 | 0.0098 | 0.0137 | ±0.23% | 441337  |
| iconv-lite (beta)             | Big5      | encode    | 448,140.30   | 0.0019 | 0.0025 | 0.0022 | 0.0088 | 0.0104 | 0.0142 | ±0.23% | 407077  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | decode    | 824,411.74   | 0.0011 | 0.0012 | 0.0012 | 0.0013 | 0.0019 | 0.0091 | ±0.23% | 810906  |
| iconv-lite                    | Big5      | decode    | 438,760.58   | 0.0020 | 0.0025 | 0.0022 | 0.0089 | 0.0106 | 0.0148 | ±0.26% | 397664  |
| iconv-lite (beta)             | Big5      | decode    | 427,900.93   | 0.0021 | 0.0025 | 0.0023 | 0.0074 | 0.0101 | 0.0143 | ±0.97% | 393086  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | encode    | 343,950.82   | 0.0027 | 0.0034 | 0.0029 | 0.0066 | 0.0099 | 0.0140 | ±8.05% | 296556  |
| iconv-lite                    | GBK       | encode    | 292,016.95   | 0.0031 | 0.0037 | 0.0034 | 0.0085 | 0.0113 | 0.0156 | ±2.97% | 271740  |
| iconv-lite (beta)             | GBK       | encode    | 311,263.23   | 0.0029 | 0.0034 | 0.0033 | 0.0064 | 0.0082 | 0.0126 | ±3.30% | 290856  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | decode    | 612,549.76   | 0.0015 | 0.0017 | 0.0016 | 0.0022 | 0.0025 | 0.0100 | ±0.25% | 601358  |
| iconv-lite                    | GBK       | decode    | 281,259.54   | 0.0031 | 0.0037 | 0.0037 | 0.0089 | 0.0121 | 0.0159 | ±0.22% | 269131  |
| iconv-lite (beta)             | GBK       | decode    | 296,164.67   | 0.0030 | 0.0035 | 0.0034 | 0.0084 | 0.0119 | 0.0165 | ±0.24% | 282512  |
| iconv-nano                    | Shift JIS | encode    | 570,601.95   | 0.0014 | 0.0023 | 0.0018 | 0.0117 | 0.0135 | 0.0189 | ±0.30% | 432844  |
| <mark>**iconv-lite**</mark>⚡ | Shift JIS | encode    | 581,296.17   | 0.0015 | 0.0020 | 0.0016 | 0.0085 | 0.0099 | 0.0142 | ±0.21% | 505153  |
| iconv-lite (beta)             | Shift JIS | encode    | 557,902.52   | 0.0015 | 0.0021 | 0.0018 | 0.0086 | 0.0100 | 0.0142 | ±0.25% | 485424  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | decode    | 1,081,243.50 | 0.0008 | 0.0009 | 0.0009 | 0.0011 | 0.0015 | 0.0085 | ±0.26% | 1061252 |
| iconv-lite                    | Shift JIS | decode    | 521,709.82   | 0.0017 | 0.0022 | 0.0018 | 0.0083 | 0.0100 | 0.0144 | ±0.27% | 463583  |
| iconv-lite (beta)             | Shift JIS | decode    | 519,888.69   | 0.0017 | 0.0022 | 0.0018 | 0.0083 | 0.0100 | 0.0146 | ±0.27% | 457975  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | encode    | 402,575.21   | 0.0021 | 0.0031 | 0.0025 | 0.0114 | 0.0134 | 0.0189 | ±7.70% | 322021  |
| iconv-lite                    | EUC-KR    | encode    | 281,061.61   | 0.0032 | 0.0037 | 0.0035 | 0.0093 | 0.0116 | 0.0156 | ±2.13% | 267366  |
| iconv-lite (beta)             | EUC-KR    | encode    | 274,852.27   | 0.0031 | 0.0038 | 0.0037 | 0.0088 | 0.0118 | 0.0163 | ±0.20% | 264032  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | decode    | 1,089,201.45 | 0.0009 | 0.0009 | 0.0009 | 0.0012 | 0.0016 | 0.0091 | ±0.21% | 1066842 |
| iconv-lite                    | EUC-KR    | decode    | 301,809.71   | 0.0030 | 0.0035 | 0.0033 | 0.0080 | 0.0116 | 0.0153 | ±0.23% | 288515  |
| iconv-lite (beta)             | EUC-KR    | decode    | 299,732.68   | 0.0030 | 0.0035 | 0.0033 | 0.0088 | 0.0120 | 0.0169 | ±0.24% | 284942  |
| iconv-nano                    | UTF-8     | encode    | 2,284,772.84 | 0.0003 | 0.0008 | 0.0005 | 0.0065 | 0.0079 | 0.0130 | ±2.48% | 1316566 |
| <mark>**iconv-lite**</mark>⚡ | UTF-8     | encode    | 2,850,014.22 | 0.0003 | 0.0004 | 0.0003 | 0.0009 | 0.0011 | 0.0038 | ±0.76% | 2682672 |
| iconv-lite (beta)             | UTF-8     | encode    | 2,414,152.82 | 0.0004 | 0.0004 | 0.0004 | 0.0009 | 0.0012 | 0.0044 | ±0.25% | 2314111 |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | decode    | 2,283,439.29 | 0.0004 | 0.0005 | 0.0004 | 0.0007 | 0.0008 | 0.0025 | ±0.37% | 2185078 |
| iconv-lite                    | UTF-8     | decode    | 1,289,662.47 | 0.0006 | 0.0010 | 0.0008 | 0.0048 | 0.0067 | 0.0163 | ±0.32% | 980276  |
| iconv-lite (beta)             | UTF-8     | decode    | 1,483,913.46 | 0.0006 | 0.0007 | 0.0007 | 0.0010 | 0.0013 | 0.0054 | ±0.96% | 1428414 |
| iconv-nano                    | UTF-16    | encode    | 527,145.00   | 0.0017 | 0.0021 | 0.0019 | 0.0039 | 0.0049 | 0.0109 | ±4.25% | 473753  |
| <mark>**iconv-lite**</mark>⚡ | UTF-16    | encode    | 2,278,181.03 | 0.0004 | 0.0005 | 0.0004 | 0.0014 | 0.0017 | 0.0056 | ±1.15% | 1976220 |
| iconv-lite (beta)             | UTF-16    | encode    | 488,430.56   | 0.0018 | 0.0023 | 0.0021 | 0.0054 | 0.0080 | 0.0122 | ±3.04% | 442719  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | decode    | 1,491,475.16 | 0.0006 | 0.0007 | 0.0007 | 0.0011 | 0.0013 | 0.0048 | ±0.94% | 1411958 |
| iconv-lite                    | UTF-16    | decode    | 1,354,241.05 | 0.0005 | 0.0010 | 0.0008 | 0.0049 | 0.0071 | 0.0177 | ±0.73% | 1000439 |
| iconv-lite (beta)             | UTF-16    | decode    | 824,300.06   | 0.0011 | 0.0013 | 0.0012 | 0.0018 | 0.0024 | 0.0156 | ±2.10% | 743520  |
| <mark>**iconv-nano**</mark>⚡ | UTF-32    | encode    | 381,951.57   | 0.0021 | 0.0030 | 0.0026 | 0.0054 | 0.0085 | 0.0146 | ±3.37% | 338776  |
| iconv-lite                    | UTF-32    | encode    | 126,471.44   | 0.0072 | 0.0083 | 0.0079 | 0.0159 | 0.0170 | 0.0287 | ±1.82% | 120380  |
| iconv-lite (beta)             | UTF-32    | encode    | 228,831.72   | 0.0038 | 0.0047 | 0.0044 | 0.0092 | 0.0129 | 0.0267 | ±2.18% | 211687  |
| iconv-nano                    | UTF-32    | decode    | 188,216.97   | 0.0038 | 0.0056 | 0.0057 | 0.0099 | 0.0275 | 0.1111 | ±0.38% | 177435  |
| <mark>**iconv-lite**</mark>⚡ | UTF-32    | decode    | 261,664.08   | 0.0033 | 0.0040 | 0.0038 | 0.0088 | 0.0131 | 0.0177 | ±1.14% | 248054  |
| iconv-lite (beta)             | UTF-32    | decode    | 241,989.69   | 0.0035 | 0.0045 | 0.0041 | 0.0126 | 0.0145 | 0.0213 | ±0.27% | 224343  |

### Chromium

| library                              | encoding  | operation | hz         | min    | mean   | p75    | p99    | p995   | p999   | rme     | samples |
| ------------------------------------ | --------- | --------- | ---------- | ------ | ------ | ------ | ------ | ------ | ------ | ------- | ------- |
| iconv-nano                           | ASCII     | encode    | 263,054.58 | 0.0000 | 0.0037 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97%  | 272583  |
| iconv-lite                           | ASCII     | encode    | 250,710.61 | 0.0000 | 0.0038 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 260297  |
| <mark>**iconv-lite (beta)**</mark>⚡ | ASCII     | encode    | 308,434.62 | 0.0000 | 0.0031 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.04%  | 318003  |
| <mark>**iconv-nano**</mark>⚡        | ASCII     | decode    | 994,375.02 | 0.0000 | 0.0010 | 0.0000 | 0.0000 | 0.1000 | 0.1000 | ±1.95%  | 1004367 |
| iconv-lite                           | ASCII     | decode    | 72,955.41  | 0.0000 | 0.0123 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±1.87%  | 81624   |
| iconv-lite (beta)                    | ASCII     | decode    | 147,212.84 | 0.0000 | 0.0064 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.07%  | 156416  |
| iconv-nano                           | Big5      | encode    | 448,789.67 | 0.0000 | 0.0022 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.11%  | 458479  |
| iconv-lite                           | Big5      | encode    | 401,238.94 | 0.0000 | 0.0024 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.02%  | 410958  |
| <mark>**iconv-lite (beta)**</mark>⚡ | Big5      | encode    | 450,412.09 | 0.0000 | 0.0022 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.00%  | 460113  |
| <mark>**iconv-nano**</mark>⚡        | Big5      | decode    | 453,387.59 | 0.0000 | 0.0022 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 463162  |
| iconv-lite                           | Big5      | decode    | 234,155.67 | 0.0000 | 0.0041 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 243704  |
| iconv-lite (beta)                    | Big5      | decode    | 375,396.54 | 0.0000 | 0.0026 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.37%  | 385053  |
| <mark>**iconv-nano**</mark>⚡        | GBK       | encode    | 284,694.49 | 0.0000 | 0.0034 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.01%  | 294252  |
| iconv-lite                           | GBK       | encode    | 232,332.20 | 0.0000 | 0.0041 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 241877  |
| iconv-lite (beta)                    | GBK       | encode    | 272,879.81 | 0.0000 | 0.0035 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97%  | 282487  |
| iconv-nano                           | GBK       | decode    | 142,335.73 | 0.0000 | 0.0066 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.90%  | 151671  |
| iconv-lite                           | GBK       | decode    | 145,016.19 | 0.0000 | 0.0065 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.91%  | 154322  |
| <mark>**iconv-lite (beta)**</mark>⚡ | GBK       | decode    | 250,219.00 | 0.0000 | 0.0039 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.12%  | 259725  |
| iconv-nano                           | Shift JIS | encode    | 535,812.06 | 0.0000 | 0.0018 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.18%  | 545554  |
| iconv-lite                           | Shift JIS | encode    | 483,036.29 | 0.0000 | 0.0020 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.02%  | 492730  |
| <mark>**iconv-lite (beta)**</mark>⚡ | Shift JIS | encode    | 582,771.79 | 0.0000 | 0.0017 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.03%  | 592506  |
| iconv-nano                           | Shift JIS | decode    | 241,806.27 | 0.0000 | 0.0040 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92%  | 251428  |
| iconv-lite                           | Shift JIS | decode    | 312,356.22 | 0.0000 | 0.0031 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 322033  |
| <mark>**iconv-lite (beta)**</mark>⚡ | Shift JIS | decode    | 501,849.83 | 0.0000 | 0.0020 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.99%  | 511588  |
| <mark>**iconv-nano**</mark>⚡        | EUC-KR    | encode    | 337,267.40 | 0.0000 | 0.0029 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.06%  | 346890  |
| iconv-lite                           | EUC-KR    | encode    | 231,137.32 | 0.0000 | 0.0042 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96%  | 240688  |
| iconv-lite (beta)                    | EUC-KR    | encode    | 262,312.29 | 0.0000 | 0.0037 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96%  | 271891  |
| iconv-nano                           | EUC-KR    | decode    | 100,799.88 | 0.0000 | 0.0091 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.88%  | 109878  |
| iconv-lite                           | EUC-KR    | decode    | 149,442.77 | 0.0000 | 0.0063 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.91%  | 158751  |
| <mark>**iconv-lite (beta)**</mark>⚡ | EUC-KR    | decode    | 256,499.11 | 0.0000 | 0.0038 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96%  | 266088  |
| iconv-nano                           | UTF-8     | encode    | 514,863.39 | 0.0000 | 0.0019 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.31%  | 523870  |
| iconv-lite                           | UTF-8     | encode    | 158,800.93 | 0.0000 | 0.0060 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±11.48% | 167432  |
| <mark>**iconv-lite (beta)**</mark>⚡ | UTF-8     | encode    | 521,555.61 | 0.0000 | 0.0019 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.45%  | 530703  |
| <mark>**iconv-nano**</mark>⚡        | UTF-8     | decode    | 700,165.51 | 0.0000 | 0.0014 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 710079  |
| iconv-lite                           | UTF-8     | decode    | 343,191.08 | 0.0000 | 0.0028 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 352873  |
| iconv-lite (beta)                    | UTF-8     | decode    | 559,233.70 | 0.0000 | 0.0018 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.42%  | 568901  |
| iconv-nano                           | UTF-16    | encode    | 454,611.16 | 0.0000 | 0.0022 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.01%  | 464337  |
| iconv-lite                           | UTF-16    | encode    | 176,988.60 | 0.0000 | 0.0054 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92%  | 186394  |
| <mark>**iconv-lite (beta)**</mark>⚡ | UTF-16    | encode    | 489,128.82 | 0.0000 | 0.0020 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.01%  | 498823  |
| <mark>**iconv-nano**</mark>⚡        | UTF-16    | decode    | 836,895.02 | 0.0000 | 0.0012 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 846839  |
| iconv-lite                           | UTF-16    | decode    | 110,172.31 | 0.0000 | 0.0084 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.89%  | 119287  |
| iconv-lite (beta)                    | UTF-16    | decode    | 604,521.43 | 0.0000 | 0.0016 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.69%  | 614115  |
| <mark>**iconv-nano**</mark>⚡        | UTF-32    | encode    | 316,735.98 | 0.0000 | 0.0031 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.98%  | 326320  |
| iconv-lite                           | UTF-32    | encode    | 75,512.61  | 0.0000 | 0.0119 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±1.87%  | 84226   |
| iconv-lite (beta)                    | UTF-32    | encode    | 214,924.63 | 0.0000 | 0.0045 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96%  | 224393  |
| iconv-nano                           | UTF-32    | decode    | 167,644.96 | 0.0000 | 0.0057 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.22%  | 176984  |
| iconv-lite                           | UTF-32    | decode    | 69,457.06  | 0.0000 | 0.0128 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±1.86%  | 78088   |
| <mark>**iconv-lite (beta)**</mark>⚡ | UTF-32    | decode    | 174,377.70 | 0.0000 | 0.0054 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 183787  |

### Statistics

The tables describe the number of times the library was the fastest for the given operation ('encode'/'decode').

#### Node.js

| Library           | encode | decode |
| ----------------- | ------ | ------ |
| iconv-nano        | 4      | 7      |
| iconv-lite        | 4      | 1      |
| iconv-lite (beta) | 0      | 0      |

#### Chromium

| Library           | encode | decode |
| ----------------- | ------ | ------ |
| iconv-nano        | 3      | 4      |
| iconv-lite        | 0      | 0      |
| iconv-lite (beta) | 5      | 4      |

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.
