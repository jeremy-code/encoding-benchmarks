# encoding-benchmarks

[![GitHub Actions](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml)

## Benchmarks

Benchmarks are ran in GitHub Actions using the default benchmark settings with Vitest and tiny-bench. It is ran once in both in Node.js and in headless Chromium. For Chromium, a polyfill for the Node.js Buffer API is provided by the [`buffer`](https://www.npmjs.com/package/buffer) npm library via [vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) for `iconv-lite`'s use. Fixtures are generated from sample data representative of typical text that the encoding would use (see [./fixtures/README.md](./fixtures/README.md) for more information). Expected output data is generated from the output from Python's system encoding library (see [./scripts/update-fixtures.py](./scripts/update-fixtures.py)).

### Additional notes

- The 'ASCII' encoding is actually [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) as opposed to 7-bit ASCII. This is because this is what the whatwg/encoding standard should be aliased for ASCII. It is also more useful as a benchmark, as 7-bit ASCII is a subset of UTF-8, so Windows-1252 is more representative of what typical single byte encoding performance should be. The encoding performance for single-byte encodings is essentially identical among encodings (as one would expect), so Windows-1252 is the only representative to avoid skewing the results one way or another.
- Input data is provided based on what is expected for the encoding. For example, iconv-nano can handle characters comprised of multiple code points for single-byte encodings (`iconv.ascii.encode('😅')` encodes into '?') while iconv-lite cannot (it encodes into '??'). See [pillarjs/iconv-lite#368](https://github.com/pillarjs/iconv-lite/issues/368). This issue will not be represented in the ASCII encoding fixture.

## Results

Faster library is **bolded**, <mark>highlighted</mark>, and denoted with ⚡. Library versions are [iconv-nano](https://www.npmjs.com/package/iconv-nano)@0.0.18 and [iconv-lite](https://www.npmjs.com/package/iconv-lite)@0.7.3. Ran on Node.js v26.11.1 and Chromium 156.0.8078.4 on [GitHub Actions runner ubuntu26 version 20261026.180.1 (X64)](https://github.com/jeremy-code/encoding-benchmarks/actions/runs/40808663187).

### Node.js

| library                       | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| ----------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| iconv-nano                    | ASCII     | encode    | 209,742.74   | 0.0044 | 0.0050 | 0.0047 | 0.0093 | 0.0144 | 0.0189 | ±2.44% | 198278  |
| <mark>**iconv-lite**</mark>⚡ | ASCII     | encode    | 210,968.41   | 0.0043 | 0.0049 | 0.0046 | 0.0108 | 0.0154 | 0.0254 | ±0.41% | 202866  |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | decode    | 785,537.99   | 0.0011 | 0.0013 | 0.0013 | 0.0019 | 0.0022 | 0.0129 | ±0.36% | 755575  |
| iconv-lite                    | ASCII     | decode    | 176,566.98   | 0.0052 | 0.0059 | 0.0056 | 0.0134 | 0.0169 | 0.0270 | ±0.24% | 170472  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | encode    | 381,079.62   | 0.0023 | 0.0030 | 0.0026 | 0.0110 | 0.0139 | 0.0233 | ±0.28% | 330106  |
| iconv-lite                    | Big5      | encode    | 322,759.88   | 0.0028 | 0.0033 | 0.0030 | 0.0089 | 0.0122 | 0.0207 | ±0.20% | 303322  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | decode    | 406,689.45   | 0.0023 | 0.0025 | 0.0025 | 0.0038 | 0.0045 | 0.0194 | ±0.30% | 396305  |
| iconv-lite                    | Big5      | decode    | 281,696.24   | 0.0032 | 0.0038 | 0.0035 | 0.0106 | 0.0153 | 0.0262 | ±0.22% | 263334  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | encode    | 217,786.83   | 0.0042 | 0.0052 | 0.0046 | 0.0152 | 0.0166 | 0.0291 | ±4.88% | 192983  |
| iconv-lite                    | GBK       | encode    | 173,771.77   | 0.0048 | 0.0062 | 0.0057 | 0.0107 | 0.0156 | 0.0269 | ±3.86% | 161603  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | decode    | 317,831.53   | 0.0029 | 0.0032 | 0.0032 | 0.0043 | 0.0057 | 0.0158 | ±0.76% | 309801  |
| iconv-lite                    | GBK       | decode    | 190,757.55   | 0.0047 | 0.0055 | 0.0052 | 0.0123 | 0.0164 | 0.0268 | ±0.22% | 183346  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | encode    | 436,602.34   | 0.0020 | 0.0026 | 0.0023 | 0.0094 | 0.0107 | 0.0190 | ±0.25% | 384256  |
| iconv-lite                    | Shift JIS | encode    | 374,658.35   | 0.0024 | 0.0029 | 0.0026 | 0.0080 | 0.0116 | 0.0205 | ±0.21% | 345942  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | decode    | 470,866.95   | 0.0020 | 0.0022 | 0.0021 | 0.0031 | 0.0036 | 0.0139 | ±0.30% | 459399  |
| iconv-lite                    | Shift JIS | decode    | 340,362.43   | 0.0026 | 0.0031 | 0.0029 | 0.0084 | 0.0127 | 0.0209 | ±0.22% | 319572  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | encode    | 289,634.87   | 0.0031 | 0.0040 | 0.0034 | 0.0131 | 0.0156 | 0.0290 | ±5.73% | 249728  |
| iconv-lite                    | EUC-KR    | encode    | 153,097.79   | 0.0052 | 0.0068 | 0.0067 | 0.0112 | 0.0167 | 0.0226 | ±3.21% | 146293  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | decode    | 398,009.02   | 0.0023 | 0.0026 | 0.0025 | 0.0035 | 0.0043 | 0.0148 | ±0.85% | 386920  |
| iconv-lite                    | EUC-KR    | decode    | 180,305.92   | 0.0047 | 0.0057 | 0.0055 | 0.0132 | 0.0168 | 0.0251 | ±0.22% | 174085  |
| iconv-nano                    | UTF-8     | encode    | 1,196,220.80 | 0.0007 | 0.0011 | 0.0008 | 0.0046 | 0.0055 | 0.0122 | ±6.75% | 920681  |
| <mark>**iconv-lite**</mark>⚡ | UTF-8     | encode    | 1,202,757.38 | 0.0007 | 0.0009 | 0.0008 | 0.0018 | 0.0020 | 0.0081 | ±1.01% | 1128757 |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | decode    | 555,955.06   | 0.0016 | 0.0019 | 0.0018 | 0.0026 | 0.0029 | 0.0137 | ±0.36% | 540475  |
| iconv-lite                    | UTF-8     | decode    | 597,489.93   | 0.0014 | 0.0020 | 0.0016 | 0.0081 | 0.0096 | 0.0156 | ±0.35% | 500644  |
| iconv-nano                    | UTF-16    | encode    | 426,734.82   | 0.0021 | 0.0027 | 0.0023 | 0.0076 | 0.0105 | 0.0201 | ±3.50% | 374763  |
| <mark>**iconv-lite**</mark>⚡ | UTF-16    | encode    | 1,080,303.46 | 0.0008 | 0.0010 | 0.0009 | 0.0021 | 0.0040 | 0.0124 | ±1.23% | 972505  |
| iconv-nano                    | UTF-16    | decode    | 526,387.16   | 0.0017 | 0.0020 | 0.0019 | 0.0036 | 0.0043 | 0.0140 | ±0.36% | 507873  |
| <mark>**iconv-lite**</mark>⚡ | UTF-16    | decode    | 705,181.98   | 0.0011 | 0.0017 | 0.0015 | 0.0064 | 0.0074 | 0.0147 | ±0.99% | 604084  |

### Chromium

| library                       | encoding  | operation | hz         | min    | mean   | p75    | p99    | p995   | p999   | rme     | samples |
| ----------------------------- | --------- | --------- | ---------- | ------ | ------ | ------ | ------ | ------ | ------ | ------- | ------- |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | encode    | 177,541.21 | 0.0000 | 0.0054 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97%  | 186860  |
| iconv-lite                    | ASCII     | encode    | 173,941.29 | 0.0000 | 0.0055 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97%  | 183193  |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | decode    | 876,178.89 | 0.0000 | 0.0011 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 886132  |
| iconv-lite                    | ASCII     | decode    | 51,284.06  | 0.0000 | 0.0169 | 0.0000 | 0.1000 | 0.2000 | 0.4000 | ±1.99%  | 59138   |
| <mark>**iconv-nano**</mark>⚡ | Big5      | encode    | 321,642.23 | 0.0000 | 0.0030 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.87%  | 331138  |
| iconv-lite                    | Big5      | encode    | 294,689.91 | 0.0000 | 0.0033 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.01%  | 304334  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | decode    | 261,707.07 | 0.0000 | 0.0037 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 271359  |
| iconv-lite                    | Big5      | decode    | 172,395.47 | 0.0000 | 0.0055 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 181785  |
| iconv-nano                    | GBK       | encode    | 128,714.75 | 0.0000 | 0.0073 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±1.97%  | 137823  |
| <mark>**iconv-lite**</mark>⚡ | GBK       | encode    | 163,200.17 | 0.0000 | 0.0058 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.99%  | 172454  |
| iconv-nano                    | GBK       | decode    | 112,960.83 | 0.0000 | 0.0082 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96%  | 122101  |
| <mark>**iconv-lite**</mark>⚡ | GBK       | decode    | 113,870.46 | 0.0000 | 0.0081 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.90%  | 122976  |
| iconv-nano                    | Shift JIS | encode    | 345,276.50 | 0.0000 | 0.0028 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±11.85% | 354235  |
| <mark>**iconv-lite**</mark>⚡ | Shift JIS | encode    | 354,563.32 | 0.0000 | 0.0027 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.03%  | 364244  |
| iconv-nano                    | Shift JIS | decode    | 141,643.56 | 0.0000 | 0.0066 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.07%  | 150946  |
| <mark>**iconv-lite**</mark>⚡ | Shift JIS | decode    | 235,503.66 | 0.0000 | 0.0041 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 245040  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | encode    | 227,303.16 | 0.0000 | 0.0042 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.03%  | 236782  |
| iconv-lite                    | EUC-KR    | encode    | 131,034.13 | 0.0000 | 0.0071 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 140229  |
| iconv-nano                    | EUC-KR    | decode    | 69,669.28  | 0.0000 | 0.0128 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.84%  | 78371   |
| <mark>**iconv-lite**</mark>⚡ | EUC-KR    | decode    | 114,329.50 | 0.0000 | 0.0081 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.90%  | 123430  |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | encode    | 398,433.60 | 0.0000 | 0.0025 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.20%  | 407614  |
| iconv-lite                    | UTF-8     | encode    | 119,536.39 | 0.0000 | 0.0078 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.12%  | 128631  |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | decode    | 437,526.72 | 0.0000 | 0.0022 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.23%  | 447076  |
| iconv-lite                    | UTF-8     | decode    | 217,595.28 | 0.0000 | 0.0044 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 227111  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | encode    | 379,465.17 | 0.0000 | 0.0026 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.13%  | 389122  |
| iconv-lite                    | UTF-16    | encode    | 117,279.99 | 0.0000 | 0.0079 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 126336  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | decode    | 451,626.37 | 0.0000 | 0.0022 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 461398  |
| iconv-lite                    | UTF-16    | decode    | 92,165.09  | 0.0000 | 0.0099 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.90%  | 101073  |

### Statistics

The tables describe the number of times the library was the fastest for the given operation ('encode'/'decode').

#### Node.js

| Library    | encode | decode |
| ---------- | ------ | ------ |
| iconv-nano | 4      | 6      |
| iconv-lite | 3      | 1      |

#### Chromium

| Library    | encode | decode |
| ---------- | ------ | ------ |
| iconv-nano | 5      | 4      |
| iconv-lite | 2      | 3      |

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.
