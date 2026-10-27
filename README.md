# encoding-benchmarks

[![GitHub Actions](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml)

## Benchmarks

Benchmarks are ran in GitHub Actions using the default benchmark settings with Vitest and tiny-bench. It is ran once in both in Node.js and in headless Chromium. For Chromium, a polyfill for the Node.js Buffer API is provided by the [`buffer`](https://www.npmjs.com/package/buffer) npm library via [vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) for `iconv-lite`'s use. Fixtures are generated from sample data representative of typical text that the encoding would use (see [./fixtures/README.md](./fixtures/README.md) for more information). Expected output data is generated from the output from Python's system encoding library (see [./scripts/update-fixtures.py](./scripts/update-fixtures.py)).

### Additional notes

- The 'ASCII' encoding is actually [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) as opposed to 7-bit ASCII. This is because this is what the whatwg/encoding standard should be aliased for ASCII. It is also more useful as a benchmark, as 7-bit ASCII is a subset of UTF-8, so Windows-1252 is more representative of what typical single byte encoding performance should be. The encoding performance for single-byte encodings is essentially identical among encodings (as one would expect), so Windows-1252 is the only representative to avoid skewing the results one way or another.
- Input data is provided based on what is expected for the encoding. For example, iconv-nano can handle characters comprised of multiple code points for single-byte encodings (`iconv.ascii.encode('😅')` encodes into '?') while iconv-lite cannot (it encodes into '??'). See [pillarjs/iconv-lite#368](https://github.com/pillarjs/iconv-lite/issues/368). This issue will not be represented in the ASCII encoding fixture.

## Results

Faster library is **bolded**, <mark>highlighted</mark>, and denoted with ⚡. Library versions are [iconv-nano](https://www.npmjs.com/package/iconv-nano)@0.0.17 and [iconv-lite](https://www.npmjs.com/package/iconv-lite)@0.7.3. Ran on Node.js v26.11.1 and Chromium 156.0.8078.4 on [GitHub Actions runner ubuntu26 version 20261023.163.3 (X64)](https://github.com/jeremy-code/encoding-benchmarks/actions/runs/40466736019).

### Node.js

| library                       | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| ----------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| iconv-nano                    | ASCII     | encode    | 210,644.72   | 0.0044 | 0.0050 | 0.0047 | 0.0095 | 0.0141 | 0.0181 | ±2.47% | 199008  |
| <mark>**iconv-lite**</mark>⚡ | ASCII     | encode    | 211,229.48   | 0.0044 | 0.0049 | 0.0046 | 0.0113 | 0.0151 | 0.0255 | ±0.39% | 202979  |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | decode    | 794,412.53   | 0.0011 | 0.0013 | 0.0013 | 0.0022 | 0.0026 | 0.0123 | ±1.07% | 760939  |
| iconv-lite                    | ASCII     | decode    | 177,681.23   | 0.0052 | 0.0059 | 0.0055 | 0.0141 | 0.0173 | 0.0265 | ±0.20% | 170827  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | encode    | 405,427.37   | 0.0022 | 0.0027 | 0.0025 | 0.0046 | 0.0055 | 0.0137 | ±6.77% | 365049  |
| iconv-lite                    | Big5      | encode    | 328,601.85   | 0.0028 | 0.0033 | 0.0030 | 0.0107 | 0.0137 | 0.0215 | ±0.23% | 301794  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | decode    | 406,863.04   | 0.0023 | 0.0025 | 0.0025 | 0.0040 | 0.0046 | 0.0139 | ±0.19% | 398382  |
| iconv-lite                    | Big5      | decode    | 290,033.03   | 0.0032 | 0.0036 | 0.0034 | 0.0079 | 0.0096 | 0.0172 | ±0.13% | 280585  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | encode    | 219,647.79   | 0.0042 | 0.0051 | 0.0045 | 0.0134 | 0.0155 | 0.0259 | ±4.34% | 197658  |
| iconv-lite                    | GBK       | encode    | 182,257.66   | 0.0048 | 0.0058 | 0.0057 | 0.0098 | 0.0154 | 0.0177 | ±3.27% | 172989  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | decode    | 317,376.68   | 0.0029 | 0.0032 | 0.0032 | 0.0047 | 0.0058 | 0.0147 | ±0.88% | 310412  |
| iconv-lite                    | GBK       | decode    | 192,541.23   | 0.0047 | 0.0054 | 0.0052 | 0.0158 | 0.0180 | 0.0244 | ±0.19% | 185685  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | encode    | 440,617.75   | 0.0020 | 0.0026 | 0.0022 | 0.0094 | 0.0120 | 0.0185 | ±1.94% | 386846  |
| iconv-lite                    | Shift JIS | encode    | 378,954.31   | 0.0024 | 0.0028 | 0.0026 | 0.0079 | 0.0129 | 0.0194 | ±0.19% | 354799  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | decode    | 475,690.32   | 0.0020 | 0.0021 | 0.0021 | 0.0027 | 0.0033 | 0.0132 | ±0.25% | 466140  |
| iconv-lite                    | Shift JIS | decode    | 343,047.75   | 0.0027 | 0.0031 | 0.0029 | 0.0083 | 0.0110 | 0.0204 | ±0.19% | 323953  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | encode    | 294,525.64   | 0.0031 | 0.0039 | 0.0034 | 0.0102 | 0.0140 | 0.0227 | ±6.98% | 256323  |
| iconv-lite                    | EUC-KR    | encode    | 165,350.34   | 0.0051 | 0.0063 | 0.0066 | 0.0147 | 0.0165 | 0.0253 | ±0.17% | 159401  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | decode    | 408,937.85   | 0.0023 | 0.0025 | 0.0025 | 0.0031 | 0.0041 | 0.0140 | ±0.67% | 399789  |
| iconv-lite                    | EUC-KR    | decode    | 195,696.58   | 0.0046 | 0.0053 | 0.0051 | 0.0149 | 0.0177 | 0.0244 | ±0.21% | 188268  |
| iconv-nano                    | UTF-8     | encode    | 1,236,778.63 | 0.0007 | 0.0010 | 0.0008 | 0.0031 | 0.0042 | 0.0116 | ±9.25% | 983263  |
| <mark>**iconv-lite**</mark>⚡ | UTF-8     | encode    | 1,191,391.32 | 0.0007 | 0.0009 | 0.0008 | 0.0016 | 0.0018 | 0.0064 | ±1.93% | 1144793 |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | decode    | 566,102.46   | 0.0016 | 0.0018 | 0.0018 | 0.0024 | 0.0034 | 0.0130 | ±1.73% | 547322  |
| iconv-lite                    | UTF-8     | decode    | 597,584.54   | 0.0014 | 0.0020 | 0.0016 | 0.0077 | 0.0091 | 0.0151 | ±0.30% | 509328  |
| iconv-nano                    | UTF-16    | encode    | 430,448.22   | 0.0020 | 0.0026 | 0.0023 | 0.0072 | 0.0088 | 0.0181 | ±3.62% | 382847  |
| <mark>**iconv-lite**</mark>⚡ | UTF-16    | encode    | 1,054,214.19 | 0.0008 | 0.0010 | 0.0010 | 0.0019 | 0.0022 | 0.0119 | ±0.88% | 974860  |
| iconv-nano                    | UTF-16    | decode    | 527,701.41   | 0.0017 | 0.0020 | 0.0019 | 0.0025 | 0.0030 | 0.0134 | ±3.33% | 505523  |
| <mark>**iconv-lite**</mark>⚡ | UTF-16    | decode    | 714,285.46   | 0.0011 | 0.0016 | 0.0014 | 0.0077 | 0.0115 | 0.0143 | ±0.30% | 606592  |

### Chromium

| library                       | encoding  | operation | hz         | min    | mean   | p75    | p99    | p995   | p999   | rme     | samples |
| ----------------------------- | --------- | --------- | ---------- | ------ | ------ | ------ | ------ | ------ | ------ | ------- | ------- |
| iconv-nano                    | ASCII     | encode    | 169,137.28 | 0.0000 | 0.0056 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±2.57%  | 178119  |
| <mark>**iconv-lite**</mark>⚡ | ASCII     | encode    | 178,924.54 | 0.0000 | 0.0053 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.98%  | 188183  |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | decode    | 893,452.36 | 0.0000 | 0.0011 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 903320  |
| iconv-lite                    | ASCII     | decode    | 48,081.45  | 0.0000 | 0.0180 | 0.0000 | 0.1000 | 0.2000 | 0.5000 | ±2.20%  | 55679   |
| <mark>**iconv-nano**</mark>⚡ | Big5      | encode    | 298,437.91 | 0.0000 | 0.0032 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.08%  | 308043  |
| iconv-lite                    | Big5      | encode    | 268,520.15 | 0.0000 | 0.0036 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.03%  | 278109  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | decode    | 265,464.52 | 0.0000 | 0.0036 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.11%  | 275051  |
| iconv-lite                    | Big5      | decode    | 185,555.63 | 0.0000 | 0.0051 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92%  | 194990  |
| iconv-nano                    | GBK       | encode    | 139,250.73 | 0.0000 | 0.0067 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.99%  | 148386  |
| <mark>**iconv-lite**</mark>⚡ | GBK       | encode    | 176,756.41 | 0.0000 | 0.0054 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 186143  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | decode    | 114,019.63 | 0.0000 | 0.0081 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.88%  | 123207  |
| iconv-lite                    | GBK       | decode    | 114,082.62 | 0.0000 | 0.0081 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.90%  | 123187  |
| iconv-nano                    | Shift JIS | encode    | 333,908.31 | 0.0000 | 0.0029 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±16.17% | 352753  |
| <mark>**iconv-lite**</mark>⚡ | Shift JIS | encode    | 356,958.53 | 0.0000 | 0.0027 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.03%  | 366589  |
| iconv-nano                    | Shift JIS | decode    | 145,963.73 | 0.0000 | 0.0064 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.90%  | 155319  |
| <mark>**iconv-lite**</mark>⚡ | Shift JIS | decode    | 239,284.01 | 0.0000 | 0.0040 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 248859  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | encode    | 230,896.64 | 0.0000 | 0.0042 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.01%  | 240405  |
| iconv-lite                    | EUC-KR    | encode    | 134,290.81 | 0.0000 | 0.0070 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.98%  | 143528  |
| iconv-nano                    | EUC-KR    | decode    | 69,551.05  | 0.0000 | 0.0128 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.84%  | 78248   |
| <mark>**iconv-lite**</mark>⚡ | EUC-KR    | decode    | 113,903.60 | 0.0000 | 0.0081 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.90%  | 123028  |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | encode    | 404,649.20 | 0.0000 | 0.0024 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.18%  | 413894  |
| iconv-lite                    | UTF-8     | encode    | 123,951.64 | 0.0000 | 0.0075 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.01%  | 133091  |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | decode    | 451,053.40 | 0.0000 | 0.0022 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.03%  | 460709  |
| iconv-lite                    | UTF-8     | decode    | 211,122.82 | 0.0000 | 0.0045 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 220612  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | encode    | 384,478.50 | 0.0000 | 0.0025 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.98%  | 394181  |
| iconv-lite                    | UTF-16    | encode    | 122,980.19 | 0.0000 | 0.0076 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97%  | 132060  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | decode    | 457,189.90 | 0.0000 | 0.0021 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 466968  |
| iconv-lite                    | UTF-16    | decode    | 95,219.72  | 0.0000 | 0.0096 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.88%  | 104220  |

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
| iconv-nano | 4      | 5      |
| iconv-lite | 3      | 2      |

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.
