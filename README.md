# encoding-benchmarks

[![GitHub Actions](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml)

## Benchmarks

Benchmarks are ran in GitHub Actions using the default benchmark settings with Vitest and tiny-bench. It is ran once in both in Node.js and in headless Chromium. For Chromium, a polyfill for the Node.js Buffer API is provided by the [`buffer`](https://www.npmjs.com/package/buffer) npm library via [vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) for `iconv-lite`'s use. Fixtures are generated from sample data representative of typical text that the encoding would use (see [./fixtures/README.md](./fixtures/README.md) for more information). Expected output data is generated from the output from Python's system encoding library (see [./scripts/update-fixtures.py](./scripts/update-fixtures.py)).

### Additional notes

- The 'ASCII' encoding is actually [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) as opposed to 7-bit ASCII. This is because this is what the whatwg/encoding standard should be aliased for ASCII. It is also more useful as a benchmark, as 7-bit ASCII is a subset of UTF-8, so Windows-1252 is more representative of what typical single byte encoding performance should be. The encoding performance for single-byte encodings is essentially identical among encodings (as one would expect), so Windows-1252 is the only representative to avoid skewing the results one way or another.
- Input data is provided based on what is expected for the encoding. For example, iconv-nano can handle characters comprised of multiple code points for single-byte encodings (`iconv.ascii.encode('😅')` encodes into '?') while iconv-lite cannot (it encodes into '??'). See [pillarjs/iconv-lite#368](https://github.com/pillarjs/iconv-lite/issues/368). This issue will not be represented in the ASCII encoding fixture.

## Results

Faster library is **bolded**, <mark>highlighted</mark>, and denoted with ⚡. Library versions are [iconv-nano](https://www.npmjs.com/package/iconv-nano)@0.0.20 and [iconv-lite](https://www.npmjs.com/package/iconv-lite)@0.7.3. Ran on Node.js v26.11.1 and Chromium 156.0.8078.4 on [GitHub Actions runner ubuntu26 version 20261026.180.1 (X64)](https://github.com/jeremy-code/encoding-benchmarks/actions/runs/41183645065).

### Node.js

| library                       | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| ----------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| iconv-nano                    | ASCII     | encode    | 206,675.26   | 0.0044 | 0.0052 | 0.0047 | 0.0109 | 0.0142 | 0.0238 | ±3.24% | 190655  |
| <mark>**iconv-lite**</mark>⚡ | ASCII     | encode    | 209,257.90   | 0.0044 | 0.0050 | 0.0046 | 0.0144 | 0.0186 | 0.0268 | ±0.19% | 198425  |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | decode    | 1,733,908.19 | 0.0005 | 0.0006 | 0.0006 | 0.0010 | 0.0011 | 0.0020 | ±0.28% | 1652412 |
| iconv-lite                    | ASCII     | decode    | 178,961.84   | 0.0052 | 0.0058 | 0.0055 | 0.0140 | 0.0167 | 0.0259 | ±0.80% | 171968  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | encode    | 384,392.99   | 0.0023 | 0.0030 | 0.0026 | 0.0103 | 0.0131 | 0.0210 | ±1.22% | 337913  |
| iconv-lite                    | Big5      | encode    | 329,143.41   | 0.0028 | 0.0032 | 0.0030 | 0.0094 | 0.0128 | 0.0197 | ±0.19% | 309639  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | decode    | 557,380.99   | 0.0017 | 0.0018 | 0.0018 | 0.0022 | 0.0025 | 0.0118 | ±1.20% | 545854  |
| iconv-lite                    | Big5      | decode    | 285,083.88   | 0.0032 | 0.0037 | 0.0034 | 0.0094 | 0.0140 | 0.0227 | ±0.18% | 269728  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | encode    | 219,676.24   | 0.0042 | 0.0050 | 0.0045 | 0.0112 | 0.0150 | 0.0234 | ±4.70% | 198917  |
| iconv-lite                    | GBK       | encode    | 176,070.52   | 0.0048 | 0.0059 | 0.0057 | 0.0108 | 0.0154 | 0.0207 | ±2.28% | 169645  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | decode    | 406,728.61   | 0.0023 | 0.0025 | 0.0025 | 0.0032 | 0.0039 | 0.0128 | ±0.15% | 400914  |
| iconv-lite                    | GBK       | decode    | 194,064.17   | 0.0047 | 0.0053 | 0.0051 | 0.0135 | 0.0175 | 0.0237 | ±0.19% | 187246  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | encode    | 435,153.82   | 0.0020 | 0.0026 | 0.0023 | 0.0091 | 0.0104 | 0.0158 | ±0.23% | 391010  |
| iconv-lite                    | Shift JIS | encode    | 380,913.68   | 0.0023 | 0.0028 | 0.0026 | 0.0084 | 0.0129 | 0.0197 | ±0.20% | 353449  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | decode    | 714,625.26   | 0.0013 | 0.0014 | 0.0014 | 0.0017 | 0.0021 | 0.0115 | ±0.18% | 702963  |
| iconv-lite                    | Shift JIS | decode    | 342,061.18   | 0.0027 | 0.0031 | 0.0029 | 0.0087 | 0.0131 | 0.0205 | ±0.20% | 322345  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | encode    | 288,765.91   | 0.0031 | 0.0040 | 0.0034 | 0.0134 | 0.0156 | 0.0278 | ±4.35% | 252827  |
| iconv-lite                    | EUC-KR    | encode    | 149,829.04   | 0.0052 | 0.0068 | 0.0067 | 0.0126 | 0.0167 | 0.0248 | ±0.15% | 146269  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | decode    | 561,920.52   | 0.0016 | 0.0018 | 0.0018 | 0.0026 | 0.0032 | 0.0122 | ±0.41% | 550450  |
| iconv-lite                    | EUC-KR    | decode    | 189,934.86   | 0.0046 | 0.0055 | 0.0053 | 0.0159 | 0.0185 | 0.0261 | ±0.21% | 182319  |
| iconv-nano                    | UTF-8     | encode    | 1,230,148.47 | 0.0007 | 0.0010 | 0.0008 | 0.0038 | 0.0049 | 0.0117 | ±7.92% | 980213  |
| <mark>**iconv-lite**</mark>⚡ | UTF-8     | encode    | 1,222,302.79 | 0.0007 | 0.0009 | 0.0008 | 0.0016 | 0.0018 | 0.0056 | ±0.74% | 1174240 |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | decode    | 945,649.63   | 0.0010 | 0.0011 | 0.0011 | 0.0016 | 0.0019 | 0.0120 | ±0.42% | 892347  |
| iconv-lite                    | UTF-8     | decode    | 602,327.06   | 0.0014 | 0.0020 | 0.0016 | 0.0081 | 0.0103 | 0.0147 | ±0.28% | 511970  |
| iconv-nano                    | UTF-16    | encode    | 417,433.10   | 0.0021 | 0.0028 | 0.0023 | 0.0127 | 0.0140 | 0.0237 | ±2.81% | 356728  |
| <mark>**iconv-lite**</mark>⚡ | UTF-16    | encode    | 1,076,285.53 | 0.0008 | 0.0010 | 0.0009 | 0.0019 | 0.0021 | 0.0120 | ±1.08% | 994867  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | decode    | 832,758.44   | 0.0011 | 0.0012 | 0.0012 | 0.0016 | 0.0019 | 0.0121 | ±0.20% | 813172  |
| iconv-lite                    | UTF-16    | decode    | 718,580.20   | 0.0011 | 0.0016 | 0.0014 | 0.0060 | 0.0071 | 0.0131 | ±0.86% | 625717  |

### Chromium

| library                       | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| ----------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| iconv-nano                    | ASCII     | encode    | 177,888.58   | 0.0000 | 0.0053 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±6.52% | 186936  |
| <mark>**iconv-lite**</mark>⚡ | ASCII     | encode    | 232,035.15   | 0.0000 | 0.0041 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.98% | 241424  |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | decode    | 1,507,593.98 | 0.0000 | 0.0007 | 0.0000 | 0.0000 | 0.1000 | 0.1000 | ±1.98% | 1517659 |
| iconv-lite                    | ASCII     | decode    | 51,612.56    | 0.0000 | 0.0167 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±1.87% | 59739   |
| <mark>**iconv-nano**</mark>⚡ | Big5      | encode    | 333,177.48   | 0.0000 | 0.0029 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.08% | 342792  |
| iconv-lite                    | Big5      | encode    | 290,162.16   | 0.0000 | 0.0033 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.99% | 299750  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | decode    | 305,319.32   | 0.0000 | 0.0032 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 314999  |
| iconv-lite                    | Big5      | decode    | 175,773.84   | 0.0000 | 0.0054 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92% | 185174  |
| iconv-nano                    | GBK       | encode    | 134,664.27   | 0.0000 | 0.0070 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±2.04% | 143763  |
| <mark>**iconv-lite**</mark>⚡ | GBK       | encode    | 168,120.63   | 0.0000 | 0.0056 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96% | 177459  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | decode    | 121,354.72   | 0.0000 | 0.0077 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.89% | 130594  |
| iconv-lite                    | GBK       | decode    | 114,955.12   | 0.0000 | 0.0081 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.89% | 124108  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | encode    | 392,240.86   | 0.0000 | 0.0025 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.14% | 401889  |
| iconv-lite                    | Shift JIS | encode    | 359,435.11   | 0.0000 | 0.0027 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.03% | 369114  |
| iconv-nano                    | Shift JIS | decode    | 159,228.31   | 0.0000 | 0.0059 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.90% | 168628  |
| <mark>**iconv-lite**</mark>⚡ | Shift JIS | decode    | 239,947.60   | 0.0000 | 0.0040 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 249536  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | encode    | 230,049.53   | 0.0000 | 0.0042 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.12% | 239477  |
| iconv-lite                    | EUC-KR    | encode    | 144,003.69   | 0.0000 | 0.0065 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 153273  |
| iconv-nano                    | EUC-KR    | decode    | 72,856.23    | 0.0000 | 0.0123 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.84% | 81617   |
| <mark>**iconv-lite**</mark>⚡ | EUC-KR    | decode    | 112,166.33   | 0.0000 | 0.0082 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.89% | 121296  |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | encode    | 386,299.11   | 0.0000 | 0.0025 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±8.53% | 398526  |
| iconv-lite                    | UTF-8     | encode    | 124,123.88   | 0.0000 | 0.0075 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±5.03% | 133007  |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | decode    | 559,452.98   | 0.0000 | 0.0018 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.08% | 569160  |
| iconv-lite                    | UTF-8     | decode    | 225,394.73   | 0.0000 | 0.0043 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.61% | 234824  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | encode    | 370,587.21   | 0.0000 | 0.0026 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.07% | 380209  |
| iconv-lite                    | UTF-16    | encode    | 125,730.98   | 0.0000 | 0.0074 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 134880  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | decode    | 581,657.82   | 0.0000 | 0.0017 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 591544  |
| iconv-lite                    | UTF-16    | decode    | 93,071.62    | 0.0000 | 0.0098 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.88% | 102041  |

### Statistics

The tables describe the number of times the library was the fastest for the given operation ('encode'/'decode').

#### Node.js

| Library    | encode | decode |
| ---------- | ------ | ------ |
| iconv-nano | 4      | 7      |
| iconv-lite | 3      | 0      |

#### Chromium

| Library    | encode | decode |
| ---------- | ------ | ------ |
| iconv-nano | 5      | 5      |
| iconv-lite | 2      | 2      |

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.
