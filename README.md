# encoding-benchmarks

[![GitHub Actions](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml)

## Benchmarks

Benchmarks are ran in GitHub Actions using the default benchmark settings with Vitest and tiny-bench. It is ran once in both in Node.js and in headless Chromium. For Chromium, a polyfill for the Node.js Buffer API is provided by the [`buffer`](https://www.npmjs.com/package/buffer) npm library via [vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) for `iconv-lite`'s use. Fixtures are generated from sample data representative of typical text that the encoding would use (see [./fixtures/README.md](./fixtures/README.md) for more information). Expected output data is generated from the output from Python's system encoding library (see [./scripts/update-fixtures.py](./scripts/update-fixtures.py)).

### Additional notes

- The 'ASCII' encoding is actually [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) as opposed to 7-bit ASCII. This is because this is what the whatwg/encoding standard should be aliased for ASCII. It is also more useful as a benchmark, as 7-bit ASCII is a subset of UTF-8, so Windows-1252 is more representative of what typical single byte encoding performance should be. The encoding performance for single-byte encodings is essentially identical among encodings (as one would expect), so Windows-1252 is the only representative to avoid skewing the results one way or another.
- Input data is provided based on what is expected for the encoding. For example, iconv-nano can handle characters comprised of multiple code points for single-byte encodings (`iconv.ascii.encode('😅')` encodes into '?') while iconv-lite cannot (it encodes into '??'). See [pillarjs/iconv-lite#368](https://github.com/pillarjs/iconv-lite/issues/368). This issue will not be represented in the ASCII encoding fixture.

## Results

Faster library is **bolded**, <mark>highlighted</mark>, and denoted with ⚡. Library versions are [iconv-nano](https://www.npmjs.com/package/iconv-nano)@0.0.22 and [iconv-lite](https://www.npmjs.com/package/iconv-lite)@0.7.3. Ran on Node.js v26.13.0 and Chromium 156.0.8078.4 on [GitHub Actions runner ubuntu26 version 20261101.186.1 (X64)](https://github.com/jeremy-code/encoding-benchmarks/actions/runs/42198441755).

### Node.js

| library                       | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| ----------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| iconv-nano                    | ASCII     | encode    | 274,466.77   | 0.0033 | 0.0039 | 0.0036 | 0.0080 | 0.0104 | 0.0166 | ±1.96% | 259624  |
| <mark>**iconv-lite**</mark>⚡ | ASCII     | encode    | 278,541.70   | 0.0032 | 0.0038 | 0.0035 | 0.0083 | 0.0105 | 0.0161 | ±1.32% | 265486  |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | decode    | 2,177,669.48 | 0.0003 | 0.0005 | 0.0005 | 0.0009 | 0.0012 | 0.0052 | ±0.85% | 1986535 |
| iconv-lite                    | ASCII     | decode    | 216,231.57   | 0.0042 | 0.0048 | 0.0046 | 0.0102 | 0.0130 | 0.0189 | ±0.70% | 208600  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | encode    | 510,610.60   | 0.0016 | 0.0025 | 0.0020 | 0.0100 | 0.0115 | 0.0170 | ±4.15% | 408163  |
| iconv-lite                    | Big5      | encode    | 437,121.61   | 0.0020 | 0.0025 | 0.0022 | 0.0076 | 0.0090 | 0.0145 | ±0.20% | 397316  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | decode    | 714,855.52   | 0.0013 | 0.0014 | 0.0014 | 0.0018 | 0.0021 | 0.0087 | ±1.57% | 695048  |
| iconv-lite                    | Big5      | decode    | 361,889.69   | 0.0024 | 0.0029 | 0.0028 | 0.0075 | 0.0088 | 0.0144 | ±0.15% | 344790  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | encode    | 313,889.36   | 0.0028 | 0.0037 | 0.0032 | 0.0116 | 0.0125 | 0.0196 | ±5.65% | 270715  |
| iconv-lite                    | GBK       | encode    | 268,257.73   | 0.0034 | 0.0040 | 0.0037 | 0.0091 | 0.0109 | 0.0185 | ±2.21% | 252731  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | decode    | 525,638.18   | 0.0018 | 0.0019 | 0.0019 | 0.0025 | 0.0029 | 0.0097 | ±0.68% | 516326  |
| iconv-lite                    | GBK       | decode    | 251,513.31   | 0.0035 | 0.0041 | 0.0040 | 0.0092 | 0.0118 | 0.0175 | ±0.21% | 242016  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | encode    | 578,687.09   | 0.0015 | 0.0021 | 0.0018 | 0.0097 | 0.0104 | 0.0132 | ±2.36% | 485419  |
| iconv-lite                    | Shift JIS | encode    | 496,430.56   | 0.0017 | 0.0023 | 0.0020 | 0.0073 | 0.0092 | 0.0182 | ±0.28% | 441663  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | decode    | 918,404.68   | 0.0010 | 0.0011 | 0.0011 | 0.0016 | 0.0018 | 0.0083 | ±0.22% | 899161  |
| iconv-lite                    | Shift JIS | decode    | 427,020.20   | 0.0020 | 0.0025 | 0.0024 | 0.0073 | 0.0087 | 0.0162 | ±0.90% | 393363  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | encode    | 381,927.52   | 0.0023 | 0.0032 | 0.0026 | 0.0108 | 0.0118 | 0.0179 | ±6.79% | 314859  |
| iconv-lite                    | EUC-KR    | encode    | 257,307.66   | 0.0035 | 0.0041 | 0.0038 | 0.0090 | 0.0110 | 0.0167 | ±2.47% | 243380  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | decode    | 721,906.59   | 0.0012 | 0.0014 | 0.0014 | 0.0023 | 0.0028 | 0.0110 | ±0.32% | 694069  |
| iconv-lite                    | EUC-KR    | decode    | 251,680.25   | 0.0035 | 0.0041 | 0.0040 | 0.0090 | 0.0117 | 0.0169 | ±0.20% | 243142  |
| iconv-nano                    | UTF-8     | encode    | 1,960,780.05 | 0.0004 | 0.0009 | 0.0006 | 0.0051 | 0.0058 | 0.0105 | ±6.66% | 1147061 |
| <mark>**iconv-lite**</mark>⚡ | UTF-8     | encode    | 1,924,210.20 | 0.0004 | 0.0006 | 0.0005 | 0.0014 | 0.0017 | 0.0044 | ±0.79% | 1796311 |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | decode    | 1,662,402.41 | 0.0005 | 0.0006 | 0.0007 | 0.0011 | 0.0013 | 0.0086 | ±0.34% | 1557697 |
| iconv-lite                    | UTF-8     | decode    | 916,565.12   | 0.0008 | 0.0014 | 0.0011 | 0.0077 | 0.0086 | 0.0117 | ±0.34% | 735876  |
| iconv-nano                    | UTF-16    | encode    | 459,292.01   | 0.0020 | 0.0024 | 0.0022 | 0.0063 | 0.0075 | 0.0124 | ±4.05% | 414888  |
| <mark>**iconv-lite**</mark>⚡ | UTF-16    | encode    | 1,341,967.86 | 0.0005 | 0.0008 | 0.0008 | 0.0018 | 0.0026 | 0.0093 | ±1.11% | 1206825 |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | decode    | 1,098,716.26 | 0.0007 | 0.0010 | 0.0010 | 0.0014 | 0.0018 | 0.0094 | ±1.82% | 1044328 |
| iconv-lite                    | UTF-16    | decode    | 874,140.15   | 0.0008 | 0.0013 | 0.0012 | 0.0054 | 0.0064 | 0.0109 | ±0.31% | 756899  |

### Chromium

| library                       | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| ----------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| iconv-nano                    | ASCII     | encode    | 202,909.71   | 0.0000 | 0.0047 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±3.63% | 212130  |
| <mark>**iconv-lite**</mark>⚡ | ASCII     | encode    | 208,624.93   | 0.0000 | 0.0046 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 218057  |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | decode    | 1,834,851.66 | 0.0000 | 0.0005 | 0.0000 | 0.0000 | 0.1000 | 0.1000 | ±1.96% | 1844973 |
| iconv-lite                    | ASCII     | decode    | 56,031.21    | 0.0000 | 0.0157 | 0.0000 | 0.1000 | 0.2000 | 0.5000 | ±2.22% | 63762   |
| <mark>**iconv-nano**</mark>⚡ | Big5      | encode    | 399,259.10   | 0.0000 | 0.0024 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.88% | 408804  |
| iconv-lite                    | Big5      | encode    | 378,915.49   | 0.0000 | 0.0026 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.03% | 388568  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | decode    | 408,775.00   | 0.0000 | 0.0024 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 418576  |
| iconv-lite                    | Big5      | decode    | 221,653.79   | 0.0000 | 0.0043 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 231164  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | encode    | 249,207.89   | 0.0000 | 0.0039 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.01% | 258710  |
| iconv-lite                    | GBK       | encode    | 234,293.37   | 0.0000 | 0.0041 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96% | 243845  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | decode    | 175,069.96   | 0.0000 | 0.0054 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.99% | 184496  |
| iconv-lite                    | GBK       | decode    | 146,664.12   | 0.0000 | 0.0064 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.91% | 155954  |
| iconv-nano                    | Shift JIS | encode    | 479,832.46   | 0.0000 | 0.0020 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.29% | 489512  |
| <mark>**iconv-lite**</mark>⚡ | Shift JIS | encode    | 480,456.20   | 0.0000 | 0.0020 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.17% | 490186  |
| iconv-nano                    | Shift JIS | decode    | 180,189.52   | 0.0000 | 0.0053 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.91% | 189672  |
| <mark>**iconv-lite**</mark>⚡ | Shift JIS | decode    | 284,380.69   | 0.0000 | 0.0034 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 294010  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | encode    | 295,074.44   | 0.0000 | 0.0033 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.02% | 304631  |
| iconv-lite                    | EUC-KR    | encode    | 231,070.18   | 0.0000 | 0.0042 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97% | 240572  |
| iconv-nano                    | EUC-KR    | decode    | 96,536.97    | 0.0000 | 0.0095 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.87% | 105570  |
| <mark>**iconv-lite**</mark>⚡ | EUC-KR    | decode    | 147,551.00   | 0.0000 | 0.0064 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92% | 156828  |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | encode    | 490,782.14   | 0.0000 | 0.0020 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±3.61% | 500024  |
| iconv-lite                    | UTF-8     | encode    | 141,673.03   | 0.0000 | 0.0066 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.09% | 150817  |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | decode    | 688,840.41   | 0.0000 | 0.0014 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.13% | 698425  |
| iconv-lite                    | UTF-8     | decode    | 278,637.87   | 0.0000 | 0.0035 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 288233  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | encode    | 372,789.37   | 0.0000 | 0.0026 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±3.37% | 382234  |
| iconv-lite                    | UTF-16    | encode    | 136,368.56   | 0.0000 | 0.0069 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95% | 145590  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | decode    | 722,225.50   | 0.0000 | 0.0014 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95% | 732084  |
| iconv-lite                    | UTF-16    | decode    | 127,825.45   | 0.0000 | 0.0073 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.91% | 137018  |

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
