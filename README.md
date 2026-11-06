# encoding-benchmarks

[![GitHub Actions](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml)

## Benchmarks

Benchmarks are ran in GitHub Actions using the default benchmark settings with Vitest and tiny-bench. It is ran once in both in Node.js and in headless Chromium. For Chromium, a polyfill for the Node.js Buffer API is provided by the [`buffer`](https://www.npmjs.com/package/buffer) npm library via [vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) for `iconv-lite`'s use. Fixtures are generated from sample data representative of typical text that the encoding would use (see [./fixtures/README.md](./fixtures/README.md) for more information). Expected output data is generated from the output from Python's system encoding library (see [./scripts/update-fixtures.py](./scripts/update-fixtures.py)).

### Additional notes

- The 'ASCII' encoding is actually [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) as opposed to 7-bit ASCII. This is because this is what the whatwg/encoding standard should be aliased for ASCII. It is also more useful as a benchmark, as 7-bit ASCII is a subset of UTF-8, so Windows-1252 is more representative of what typical single byte encoding performance should be. The encoding performance for single-byte encodings is essentially identical among encodings (as one would expect), so Windows-1252 is the only representative to avoid skewing the results one way or another.
- Input data is provided based on what is expected for the encoding. For example, iconv-nano can handle characters comprised of multiple code points for single-byte encodings (`iconv.ascii.encode('😅')` encodes into '?') while iconv-lite cannot (it encodes into '??'). See [pillarjs/iconv-lite#368](https://github.com/pillarjs/iconv-lite/issues/368). This issue will not be represented in the ASCII encoding fixture.

## Results

Faster library is **bolded**, <mark>highlighted</mark>, and denoted with ⚡. Library versions are [iconv-nano](https://www.npmjs.com/package/iconv-nano)@0.0.22 and [iconv-lite](https://www.npmjs.com/package/iconv-lite)@0.7.3. Ran on Node.js v26.13.0 and Chromium 156.0.8078.4 on [GitHub Actions runner ubuntu26 version 20261101.186.1 (X64)](https://github.com/jeremy-code/encoding-benchmarks/actions/runs/42197474519).

### Node.js

| library                       | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| ----------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| iconv-nano                    | ASCII     | encode    | 247,871.81   | 0.0035 | 0.0043 | 0.0042 | 0.0089 | 0.0103 | 0.0164 | ±1.97% | 234320  |
| <mark>**iconv-lite**</mark>⚡ | ASCII     | encode    | 244,099.11   | 0.0033 | 0.0042 | 0.0041 | 0.0094 | 0.0109 | 0.0164 | ±0.78% | 235610  |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | decode    | 3,325,813.99 | 0.0003 | 0.0003 | 0.0003 | 0.0005 | 0.0006 | 0.0013 | ±0.70% | 3149097 |
| iconv-lite                    | ASCII     | decode    | 217,036.63   | 0.0040 | 0.0048 | 0.0046 | 0.0108 | 0.0132 | 0.0190 | ±0.90% | 206844  |
| iconv-nano                    | Big5      | encode    | 406,232.45   | 0.0021 | 0.0029 | 0.0025 | 0.0108 | 0.0135 | 0.0181 | ±4.01% | 349295  |
| <mark>**iconv-lite**</mark>⚡ | Big5      | encode    | 434,164.86   | 0.0020 | 0.0025 | 0.0023 | 0.0088 | 0.0103 | 0.0179 | ±0.36% | 394855  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | decode    | 860,683.99   | 0.0011 | 0.0012 | 0.0012 | 0.0016 | 0.0016 | 0.0067 | ±0.08% | 851983  |
| iconv-lite                    | Big5      | decode    | 369,432.51   | 0.0024 | 0.0029 | 0.0027 | 0.0084 | 0.0111 | 0.0174 | ±0.17% | 340614  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | encode    | 290,419.38   | 0.0030 | 0.0040 | 0.0035 | 0.0120 | 0.0138 | 0.0192 | ±5.68% | 251899  |
| iconv-lite                    | GBK       | encode    | 262,196.89   | 0.0035 | 0.0040 | 0.0039 | 0.0071 | 0.0091 | 0.0135 | ±3.18% | 248132  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | decode    | 601,797.16   | 0.0015 | 0.0017 | 0.0017 | 0.0022 | 0.0033 | 0.0076 | ±0.12% | 592311  |
| iconv-lite                    | GBK       | decode    | 246,775.49   | 0.0035 | 0.0043 | 0.0041 | 0.0103 | 0.0133 | 0.0177 | ±0.18% | 235091  |
| iconv-nano                    | Shift JIS | encode    | 472,058.69   | 0.0016 | 0.0032 | 0.0023 | 0.0142 | 0.0156 | 0.0203 | ±0.35% | 314862  |
| <mark>**iconv-lite**</mark>⚡ | Shift JIS | encode    | 494,926.82   | 0.0018 | 0.0023 | 0.0020 | 0.0108 | 0.0123 | 0.0157 | ±0.77% | 426506  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | decode    | 1,092,775.46 | 0.0009 | 0.0009 | 0.0009 | 0.0012 | 0.0013 | 0.0062 | ±0.14% | 1078273 |
| iconv-lite                    | Shift JIS | decode    | 421,016.34   | 0.0020 | 0.0028 | 0.0023 | 0.0110 | 0.0127 | 0.0169 | ±0.23% | 361573  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | encode    | 370,193.07   | 0.0024 | 0.0032 | 0.0028 | 0.0083 | 0.0098 | 0.0160 | ±7.99% | 312348  |
| iconv-lite                    | EUC-KR    | encode    | 244,389.13   | 0.0037 | 0.0044 | 0.0041 | 0.0085 | 0.0099 | 0.0159 | ±3.51% | 229465  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | decode    | 844,891.65   | 0.0011 | 0.0012 | 0.0013 | 0.0017 | 0.0018 | 0.0071 | ±0.17% | 825381  |
| iconv-lite                    | EUC-KR    | decode    | 249,698.75   | 0.0034 | 0.0043 | 0.0040 | 0.0123 | 0.0141 | 0.0186 | ±0.20% | 234359  |
| iconv-nano                    | UTF-8     | encode    | 1,894,030.56 | 0.0004 | 0.0009 | 0.0007 | 0.0059 | 0.0093 | 0.0121 | ±4.83% | 1171650 |
| <mark>**iconv-lite**</mark>⚡ | UTF-8     | encode    | 2,348,196.69 | 0.0004 | 0.0005 | 0.0004 | 0.0010 | 0.0012 | 0.0032 | ±1.27% | 2198184 |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | decode    | 1,960,664.68 | 0.0004 | 0.0005 | 0.0005 | 0.0009 | 0.0010 | 0.0023 | ±0.21% | 1873534 |
| iconv-lite                    | UTF-8     | decode    | 888,378.19   | 0.0008 | 0.0015 | 0.0012 | 0.0079 | 0.0107 | 0.0141 | ±0.29% | 686224  |
| iconv-nano                    | UTF-16    | encode    | 457,139.00   | 0.0019 | 0.0024 | 0.0022 | 0.0057 | 0.0074 | 0.0124 | ±3.24% | 417309  |
| <mark>**iconv-lite**</mark>⚡ | UTF-16    | encode    | 1,937,854.76 | 0.0004 | 0.0006 | 0.0005 | 0.0014 | 0.0017 | 0.0057 | ±1.19% | 1680535 |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | decode    | 1,000,851.10 | 0.0008 | 0.0010 | 0.0011 | 0.0014 | 0.0016 | 0.0083 | ±2.57% | 953747  |
| iconv-lite                    | UTF-16    | decode    | 959,363.21   | 0.0007 | 0.0015 | 0.0012 | 0.0107 | 0.0117 | 0.0159 | ±0.34% | 672105  |

### Chromium

| library                       | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme     | samples |
| ----------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- | ------- |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | encode    | 212,612.80   | 0.0000 | 0.0045 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±4.08%  | 221926  |
| iconv-lite                    | ASCII     | encode    | 206,483.80   | 0.0000 | 0.0046 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 215963  |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | decode    | 1,793,725.95 | 0.0000 | 0.0006 | 0.0000 | 0.0000 | 0.1000 | 0.1000 | ±1.96%  | 1803836 |
| iconv-lite                    | ASCII     | decode    | 67,661.69    | 0.0000 | 0.0131 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±1.86%  | 76243   |
| iconv-nano                    | Big5      | encode    | 351,359.53   | 0.0000 | 0.0028 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±8.46%  | 360264  |
| <mark>**iconv-lite**</mark>⚡ | Big5      | encode    | 371,922.41   | 0.0000 | 0.0026 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.05%  | 381618  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | decode    | 374,241.81   | 0.0000 | 0.0026 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 384014  |
| iconv-lite                    | Big5      | decode    | 225,371.31   | 0.0000 | 0.0043 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92%  | 234941  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | encode    | 226,890.82   | 0.0000 | 0.0042 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.00%  | 236372  |
| iconv-lite                    | GBK       | encode    | 206,379.07   | 0.0000 | 0.0046 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97%  | 215876  |
| iconv-nano                    | GBK       | decode    | 118,644.64   | 0.0000 | 0.0078 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.88%  | 127851  |
| <mark>**iconv-lite**</mark>⚡ | GBK       | decode    | 152,135.38   | 0.0000 | 0.0062 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.91%  | 161495  |
| iconv-nano                    | Shift JIS | encode    | 396,051.81   | 0.0000 | 0.0025 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±16.46% | 404662  |
| <mark>**iconv-lite**</mark>⚡ | Shift JIS | encode    | 429,289.89   | 0.0000 | 0.0023 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.02%  | 438993  |
| iconv-nano                    | Shift JIS | decode    | 204,497.79   | 0.0000 | 0.0047 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.21%  | 213965  |
| <mark>**iconv-lite**</mark>⚡ | Shift JIS | decode    | 282,609.76   | 0.0000 | 0.0034 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 292274  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | encode    | 285,159.91   | 0.0000 | 0.0034 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.04%  | 294715  |
| iconv-lite                    | EUC-KR    | encode    | 206,707.32   | 0.0000 | 0.0046 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96%  | 216177  |
| iconv-nano                    | EUC-KR    | decode    | 85,962.14    | 0.0000 | 0.0105 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.86%  | 94895   |
| <mark>**iconv-lite**</mark>⚡ | EUC-KR    | decode    | 157,941.99   | 0.0000 | 0.0060 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.91%  | 167320  |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | encode    | 464,283.27   | 0.0000 | 0.0021 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±6.97%  | 472914  |
| iconv-lite                    | UTF-8     | encode    | 185,461.94   | 0.0000 | 0.0051 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.33%  | 194833  |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | decode    | 623,057.27   | 0.0000 | 0.0016 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.18%  | 632580  |
| iconv-lite                    | UTF-8     | decode    | 314,574.15   | 0.0000 | 0.0031 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 324239  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | encode    | 357,937.95   | 0.0000 | 0.0027 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.60%  | 367500  |
| iconv-lite                    | UTF-16    | encode    | 180,300.70   | 0.0000 | 0.0053 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92%  | 189722  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | decode    | 695,560.12   | 0.0000 | 0.0014 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 705484  |
| iconv-lite                    | UTF-16    | decode    | 141,604.45   | 0.0000 | 0.0066 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.90%  | 150903  |

### Statistics

The tables describe the number of times the library was the fastest for the given operation ('encode'/'decode').

#### Node.js

| Library    | encode | decode |
| ---------- | ------ | ------ |
| iconv-nano | 2      | 7      |
| iconv-lite | 5      | 0      |

#### Chromium

| Library    | encode | decode |
| ---------- | ------ | ------ |
| iconv-nano | 5      | 4      |
| iconv-lite | 2      | 3      |

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.
