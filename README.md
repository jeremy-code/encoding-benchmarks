# encoding-benchmarks

[![GitHub Actions](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml)

## Benchmarks

Benchmarks are ran in GitHub Actions using the default benchmark settings with Vitest and tiny-bench. It is ran once in both in Node.js and in headless Chromium. For Chromium, a polyfill for the Node.js Buffer API is provided by the [`buffer`](https://www.npmjs.com/package/buffer) npm library via [vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) for `iconv-lite`'s use. Fixtures are generated from sample data representative of typical text that the encoding would use (see [./fixtures/README.md](./fixtures/README.md) for more information). Expected output data is generated from the output from Python's system encoding library (see [./scripts/update-fixtures.py](./scripts/update-fixtures.py)).

### Additional notes

- The 'ASCII' encoding is actually [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) as opposed to 7-bit ASCII. This is because this is what the whatwg/encoding standard should be aliased for ASCII. It is also more useful as a benchmark, as 7-bit ASCII is a subset of UTF-8, so Windows-1252 is more representative of what typical single byte encoding performance should be. The encoding performance for single-byte encodings is essentially identical among encodings (as one would expect), so Windows-1252 is the only representative to avoid skewing the results one way or another.
- Input data is provided based on what is expected for the encoding. For example, iconv-nano can handle characters comprised of multiple code points for single-byte encodings (`iconv.ascii.encode('😅')` encodes into '?') while iconv-lite cannot (it encodes into '??'). See [pillarjs/iconv-lite#368](https://github.com/pillarjs/iconv-lite/issues/368). This issue will not be represented in the ASCII encoding fixture.

## Results

Faster library is **bolded**, <mark>highlighted</mark>, and denoted with ⚡. Library versions are [iconv-nano](https://www.npmjs.com/package/iconv-nano)@0.0.22, [iconv-lite](https://www.npmjs.com/package/iconv-lite)@0.7.3, and [iconv-lite (beta)](https://www.npmjs.com/package/iconv-lite)@1.0.0-beta.1. Ran on Node.js v26.13.1 and Chromium 159.0.8154.6 on [GitHub Actions runner ubuntu26 version 20261116.202.1 (X64)](https://github.com/jeremy-code/encoding-benchmarks/actions/runs/45515040893).

### Node.js

| library                       | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| ----------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| iconv-nano                    | ASCII     | encode    | 171,717.13   | 0.0044 | 0.0068 | 0.0090 | 0.0139 | 0.0212 | 0.0267 | ±2.55% | 147772  |
| <mark>**iconv-lite**</mark>⚡ | ASCII     | encode    | 273,122.78   | 0.0033 | 0.0039 | 0.0035 | 0.0099 | 0.0128 | 0.0226 | ±0.87% | 256562  |
| iconv-lite (beta)             | ASCII     | encode    | 123,310.06   | 0.0071 | 0.0089 | 0.0076 | 0.0180 | 0.0260 | 0.0312 | ±1.13% | 112827  |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | decode    | 1,721,550.10 | 0.0004 | 0.0006 | 0.0006 | 0.0010 | 0.0012 | 0.0022 | ±0.29% | 1635649 |
| iconv-lite                    | ASCII     | decode    | 179,291.15   | 0.0051 | 0.0058 | 0.0055 | 0.0145 | 0.0177 | 0.0242 | ±0.79% | 171398  |
| iconv-lite (beta)             | ASCII     | decode    | 258,090.26   | 0.0035 | 0.0041 | 0.0038 | 0.0102 | 0.0138 | 0.0200 | ±0.16% | 246289  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | encode    | 388,308.00   | 0.0023 | 0.0030 | 0.0025 | 0.0116 | 0.0144 | 0.0228 | ±3.41% | 333754  |
| iconv-lite                    | Big5      | encode    | 324,700.84   | 0.0028 | 0.0033 | 0.0030 | 0.0085 | 0.0119 | 0.0218 | ±0.27% | 304868  |
| iconv-lite (beta)             | Big5      | encode    | 303,501.09   | 0.0030 | 0.0034 | 0.0032 | 0.0083 | 0.0114 | 0.0188 | ±0.17% | 290368  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | decode    | 560,809.66   | 0.0017 | 0.0018 | 0.0018 | 0.0025 | 0.0028 | 0.0105 | ±0.17% | 551618  |
| iconv-lite                    | Big5      | decode    | 284,442.31   | 0.0032 | 0.0037 | 0.0035 | 0.0089 | 0.0129 | 0.0199 | ±0.20% | 272676  |
| iconv-lite (beta)             | Big5      | decode    | 282,238.87   | 0.0033 | 0.0037 | 0.0035 | 0.0102 | 0.0147 | 0.0212 | ±0.21% | 268419  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | encode    | 245,246.10   | 0.0038 | 0.0046 | 0.0040 | 0.0130 | 0.0147 | 0.0243 | ±5.21% | 218821  |
| iconv-lite                    | GBK       | encode    | 186,143.54   | 0.0049 | 0.0056 | 0.0054 | 0.0107 | 0.0137 | 0.0222 | ±2.07% | 178887  |
| iconv-lite (beta)             | GBK       | encode    | 195,668.12   | 0.0048 | 0.0053 | 0.0050 | 0.0106 | 0.0136 | 0.0236 | ±1.48% | 187867  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | decode    | 408,357.42   | 0.0022 | 0.0025 | 0.0025 | 0.0031 | 0.0038 | 0.0113 | ±0.17% | 402734  |
| iconv-lite                    | GBK       | decode    | 189,381.35   | 0.0047 | 0.0055 | 0.0052 | 0.0130 | 0.0152 | 0.0217 | ±0.18% | 183316  |
| iconv-lite (beta)             | GBK       | decode    | 195,458.79   | 0.0046 | 0.0053 | 0.0051 | 0.0134 | 0.0152 | 0.0222 | ±0.19% | 188737  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | encode    | 433,853.84   | 0.0020 | 0.0026 | 0.0023 | 0.0097 | 0.0118 | 0.0189 | ±1.38% | 380640  |
| iconv-lite                    | Shift JIS | encode    | 371,714.06   | 0.0024 | 0.0029 | 0.0026 | 0.0101 | 0.0143 | 0.0203 | ±0.24% | 339727  |
| iconv-lite (beta)             | Shift JIS | encode    | 369,202.36   | 0.0025 | 0.0029 | 0.0026 | 0.0081 | 0.0118 | 0.0208 | ±0.22% | 342879  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | decode    | 715,848.95   | 0.0013 | 0.0014 | 0.0014 | 0.0020 | 0.0022 | 0.0101 | ±0.19% | 703985  |
| iconv-lite                    | Shift JIS | decode    | 335,553.43   | 0.0027 | 0.0032 | 0.0029 | 0.0126 | 0.0154 | 0.0220 | ±0.25% | 307993  |
| iconv-lite (beta)             | Shift JIS | decode    | 342,303.39   | 0.0026 | 0.0032 | 0.0029 | 0.0087 | 0.0128 | 0.0213 | ±0.23% | 317430  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | encode    | 297,055.24   | 0.0031 | 0.0038 | 0.0034 | 0.0066 | 0.0100 | 0.0154 | ±7.61% | 260145  |
| iconv-lite                    | EUC-KR    | encode    | 171,793.42   | 0.0052 | 0.0062 | 0.0059 | 0.0110 | 0.0143 | 0.0203 | ±3.73% | 161805  |
| iconv-lite (beta)             | EUC-KR    | encode    | 169,549.14   | 0.0051 | 0.0062 | 0.0059 | 0.0112 | 0.0145 | 0.0221 | ±2.87% | 160377  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | decode    | 549,978.68   | 0.0017 | 0.0018 | 0.0018 | 0.0028 | 0.0031 | 0.0110 | ±0.17% | 540572  |
| iconv-lite                    | EUC-KR    | decode    | 186,000.68   | 0.0046 | 0.0056 | 0.0053 | 0.0136 | 0.0151 | 0.0248 | ±0.20% | 179189  |
| iconv-lite (beta)             | EUC-KR    | decode    | 192,183.74   | 0.0047 | 0.0054 | 0.0051 | 0.0131 | 0.0155 | 0.0257 | ±0.20% | 184656  |
| iconv-nano                    | UTF-8     | encode    | 1,118,907.92 | 0.0007 | 0.0013 | 0.0009 | 0.0062 | 0.0097 | 0.0181 | ±0.95% | 798971  |
| <mark>**iconv-lite**</mark>⚡ | UTF-8     | encode    | 1,196,437.29 | 0.0008 | 0.0009 | 0.0008 | 0.0016 | 0.0018 | 0.0059 | ±0.15% | 1165961 |
| iconv-lite (beta)             | UTF-8     | encode    | 1,047,051.59 | 0.0009 | 0.0010 | 0.0010 | 0.0018 | 0.0020 | 0.0102 | ±0.11% | 1023087 |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | decode    | 903,517.77   | 0.0010 | 0.0011 | 0.0011 | 0.0015 | 0.0018 | 0.0102 | ±0.21% | 885115  |
| iconv-lite                    | UTF-8     | decode    | 604,152.00   | 0.0014 | 0.0019 | 0.0016 | 0.0077 | 0.0094 | 0.0142 | ±0.28% | 517479  |
| iconv-lite (beta)             | UTF-8     | decode    | 638,106.11   | 0.0014 | 0.0016 | 0.0016 | 0.0021 | 0.0028 | 0.0111 | ±0.22% | 624942  |
| iconv-nano                    | UTF-16    | encode    | 375,715.22   | 0.0025 | 0.0029 | 0.0027 | 0.0050 | 0.0061 | 0.0122 | ±3.84% | 347568  |
| <mark>**iconv-lite**</mark>⚡ | UTF-16    | encode    | 1,074,747.78 | 0.0008 | 0.0010 | 0.0009 | 0.0020 | 0.0024 | 0.0106 | ±0.96% | 980737  |
| iconv-lite (beta)             | UTF-16    | encode    | 326,086.94   | 0.0029 | 0.0033 | 0.0031 | 0.0062 | 0.0074 | 0.0129 | ±3.80% | 301408  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | decode    | 830,068.60   | 0.0011 | 0.0012 | 0.0012 | 0.0017 | 0.0022 | 0.0107 | ±0.23% | 810514  |
| iconv-lite                    | UTF-16    | decode    | 723,818.84   | 0.0010 | 0.0016 | 0.0014 | 0.0059 | 0.0069 | 0.0119 | ±0.47% | 634976  |
| iconv-lite (beta)             | UTF-16    | decode    | 431,454.99   | 0.0021 | 0.0025 | 0.0024 | 0.0038 | 0.0045 | 0.0125 | ±1.58% | 406281  |

### Chromium

| library                              | encoding  | operation | hz         | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| ------------------------------------ | --------- | --------- | ---------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| iconv-nano                           | ASCII     | encode    | 171,960.77 | 0.0000 | 0.0055 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 181293  |
| iconv-lite                           | ASCII     | encode    | 151,910.60 | 0.0000 | 0.0062 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±2.20% | 160626  |
| <mark>**iconv-lite (beta)**</mark>⚡ | ASCII     | encode    | 197,831.44 | 0.0000 | 0.0048 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96% | 207185  |
| <mark>**iconv-nano**</mark>⚡        | ASCII     | decode    | 773,698.90 | 0.0000 | 0.0013 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97% | 783626  |
| iconv-lite                           | ASCII     | decode    | 47,879.77  | 0.0000 | 0.0181 | 0.0000 | 0.1000 | 0.2000 | 0.6000 | ±2.32% | 55376   |
| iconv-lite (beta)                    | ASCII     | decode    | 90,122.59  | 0.0000 | 0.0102 | 0.0000 | 0.1000 | 0.1000 | 0.5000 | ±2.60% | 98028   |
| <mark>**iconv-nano**</mark>⚡        | Big5      | encode    | 333,085.81 | 0.0000 | 0.0029 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.30% | 342639  |
| iconv-lite                           | Big5      | encode    | 270,512.42 | 0.0000 | 0.0036 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97% | 280102  |
| iconv-lite (beta)                    | Big5      | encode    | 304,631.13 | 0.0000 | 0.0032 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96% | 314264  |
| <mark>**iconv-nano**</mark>⚡        | Big5      | decode    | 300,859.74 | 0.0000 | 0.0032 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 310532  |
| iconv-lite                           | Big5      | decode    | 180,779.39 | 0.0000 | 0.0053 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92% | 190208  |
| iconv-lite (beta)                    | Big5      | decode    | 264,834.24 | 0.0000 | 0.0036 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95% | 274426  |
| <mark>**iconv-nano**</mark>⚡        | GBK       | encode    | 190,983.47 | 0.0000 | 0.0050 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.24% | 200328  |
| iconv-lite                           | GBK       | encode    | 169,316.35 | 0.0000 | 0.0056 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.23% | 178665  |
| iconv-lite (beta)                    | GBK       | encode    | 189,997.75 | 0.0000 | 0.0050 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 199431  |
| iconv-nano                           | GBK       | decode    | 125,383.65 | 0.0000 | 0.0074 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.89% | 134632  |
| iconv-lite                           | GBK       | decode    | 112,228.78 | 0.0000 | 0.0083 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.99% | 121195  |
| <mark>**iconv-lite (beta)**</mark>⚡ | GBK       | decode    | 187,807.59 | 0.0000 | 0.0051 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 197252  |
| iconv-nano                           | Shift JIS | encode    | 374,368.04 | 0.0000 | 0.0026 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.12% | 384020  |
| iconv-lite                           | Shift JIS | encode    | 358,145.35 | 0.0000 | 0.0027 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.99% | 367802  |
| <mark>**iconv-lite (beta)**</mark>⚡ | Shift JIS | encode    | 414,889.12 | 0.0000 | 0.0024 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.22% | 424556  |
| iconv-nano                           | Shift JIS | decode    | 162,162.73 | 0.0000 | 0.0058 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.90% | 171587  |
| iconv-lite                           | Shift JIS | decode    | 240,813.26 | 0.0000 | 0.0040 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 250361  |
| <mark>**iconv-lite (beta)**</mark>⚡ | Shift JIS | decode    | 371,109.10 | 0.0000 | 0.0026 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.99% | 380812  |
| <mark>**iconv-nano**</mark>⚡        | EUC-KR    | encode    | 236,272.64 | 0.0000 | 0.0041 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.11% | 245743  |
| iconv-lite                           | EUC-KR    | encode    | 138,749.22 | 0.0000 | 0.0068 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 148018  |
| iconv-lite (beta)                    | EUC-KR    | encode    | 165,176.98 | 0.0000 | 0.0057 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 174557  |
| iconv-nano                           | EUC-KR    | decode    | 74,441.45  | 0.0000 | 0.0120 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.85% | 83206   |
| iconv-lite                           | EUC-KR    | decode    | 112,418.78 | 0.0000 | 0.0082 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95% | 121425  |
| <mark>**iconv-lite (beta)**</mark>⚡ | EUC-KR    | decode    | 193,468.14 | 0.0000 | 0.0049 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 202933  |
| <mark>**iconv-nano**</mark>⚡        | UTF-8     | encode    | 396,232.58 | 0.0000 | 0.0025 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.22% | 405643  |
| iconv-lite                           | UTF-8     | encode    | 122,677.55 | 0.0000 | 0.0076 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±3.71% | 131642  |
| iconv-lite (beta)                    | UTF-8     | encode    | 380,770.18 | 0.0000 | 0.0026 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±3.44% | 390094  |
| <mark>**iconv-nano**</mark>⚡        | UTF-8     | decode    | 521,479.38 | 0.0000 | 0.0019 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97% | 531276  |
| iconv-lite                           | UTF-8     | decode    | 235,962.24 | 0.0000 | 0.0041 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 245540  |
| iconv-lite (beta)                    | UTF-8     | decode    | 407,048.67 | 0.0000 | 0.0024 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.46% | 416671  |
| iconv-nano                           | UTF-16    | encode    | 302,035.10 | 0.0000 | 0.0032 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.08% | 311596  |
| iconv-lite                           | UTF-16    | encode    | 121,788.23 | 0.0000 | 0.0076 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 130925  |
| <mark>**iconv-lite (beta)**</mark>⚡ | UTF-16    | encode    | 329,527.80 | 0.0000 | 0.0029 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.21% | 339125  |
| <mark>**iconv-nano**</mark>⚡        | UTF-16    | decode    | 603,008.79 | 0.0000 | 0.0016 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95% | 612828  |
| iconv-lite                           | UTF-16    | decode    | 94,182.41  | 0.0000 | 0.0097 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.88% | 103166  |
| iconv-lite (beta)                    | UTF-16    | decode    | 432,485.08 | 0.0000 | 0.0023 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97% | 442244  |

### Statistics

The tables describe the number of times the library was the fastest for the given operation ('encode'/'decode').

#### Node.js

| Library           | encode | decode |
| ----------------- | ------ | ------ |
| iconv-nano        | 4      | 7      |
| iconv-lite        | 3      | 0      |
| iconv-lite (beta) | 0      | 0      |

#### Chromium

| Library           | encode | decode |
| ----------------- | ------ | ------ |
| iconv-nano        | 4      | 4      |
| iconv-lite        | 0      | 0      |
| iconv-lite (beta) | 3      | 3      |

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.
