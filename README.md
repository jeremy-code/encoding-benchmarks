# encoding-benchmarks

[![GitHub Actions](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml)

## Benchmarks

Benchmarks are ran in GitHub Actions using the default benchmark settings with Vitest and tiny-bench. It is ran once in both in Node.js and in headless Chromium. For Chromium, a polyfill for the Node.js Buffer API is provided by the [`buffer`](https://www.npmjs.com/package/buffer) npm library via [vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) for `iconv-lite`'s use. Fixtures are generated from sample data representative of typical text that the encoding would use (see [./fixtures/README.md](./fixtures/README.md) for more information). Expected output data is generated from the output from Python's system encoding library (see [./scripts/update-fixtures.py](./scripts/update-fixtures.py)).

### Additional notes

- The 'ASCII' encoding is actually [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) as opposed to 7-bit ASCII. This is because this is what the whatwg/encoding standard should be aliased for ASCII. It is also more useful as a benchmark, as 7-bit ASCII is a subset of UTF-8, so Windows-1252 is more representative of what typical single byte encoding performance should be. The encoding performance for single-byte encodings is essentially identical among encodings (as one would expect), so Windows-1252 is the only representative to avoid skewing the results one way or another.
- Input data is provided based on what is expected for the encoding. For example, iconv-nano can handle characters comprised of multiple code points for single-byte encodings (`iconv.ascii.encode('😅')` encodes into '?') while iconv-lite cannot (it encodes into '??'). See [pillarjs/iconv-lite#368](https://github.com/pillarjs/iconv-lite/issues/368). This issue will not be represented in the ASCII encoding fixture.

## Results

Faster library is **bolded**, <mark>highlighted</mark>, and denoted with ⚡. Library versions are [iconv-nano](https://www.npmjs.com/package/iconv-nano)@0.0.17 and [iconv-lite](https://www.npmjs.com/package/iconv-lite)@0.7.3. Ran on Node.js v26.11.1 and Chromium 156.0.8078.4 on [GitHub Actions runner ubuntu26 version 20261023.163.3 (X64)](https://github.com/jeremy-code/encoding-benchmarks/actions/runs/40463902531).

### Node.js

| library                       | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| ----------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | encode    | 254,052.16   | 0.0035 | 0.0042 | 0.0039 | 0.0087 | 0.0107 | 0.0178 | ±2.25% | 237913  |
| iconv-lite                    | ASCII     | encode    | 241,696.00   | 0.0033 | 0.0043 | 0.0041 | 0.0090 | 0.0112 | 0.0178 | ±0.37% | 231742  |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | decode    | 1,272,667.92 | 0.0007 | 0.0008 | 0.0008 | 0.0014 | 0.0015 | 0.0101 | ±0.29% | 1219516 |
| iconv-lite                    | ASCII     | decode    | 215,865.52   | 0.0041 | 0.0048 | 0.0046 | 0.0100 | 0.0110 | 0.0188 | ±1.01% | 206191  |
| iconv-nano                    | Big5      | encode    | 397,024.09   | 0.0021 | 0.0031 | 0.0025 | 0.0159 | 0.0182 | 0.0240 | ±1.68% | 320562  |
| <mark>**iconv-lite**</mark>⚡ | Big5      | encode    | 431,537.95   | 0.0020 | 0.0025 | 0.0023 | 0.0063 | 0.0075 | 0.0123 | ±0.17% | 407090  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | decode    | 585,525.90   | 0.0016 | 0.0017 | 0.0017 | 0.0021 | 0.0025 | 0.0077 | ±1.31% | 571484  |
| iconv-lite                    | Big5      | decode    | 375,389.79   | 0.0024 | 0.0029 | 0.0026 | 0.0084 | 0.0123 | 0.0169 | ±0.17% | 345631  |
| iconv-nano                    | GBK       | encode    | 262,785.98   | 0.0033 | 0.0043 | 0.0038 | 0.0100 | 0.0125 | 0.0186 | ±5.23% | 232236  |
| <mark>**iconv-lite**</mark>⚡ | GBK       | encode    | 257,363.05   | 0.0035 | 0.0041 | 0.0039 | 0.0082 | 0.0092 | 0.0162 | ±2.67% | 242955  |
| <mark>**iconv-nano**</mark>⚡ | GBK       | decode    | 445,967.15   | 0.0020 | 0.0023 | 0.0023 | 0.0028 | 0.0032 | 0.0083 | ±0.17% | 439085  |
| iconv-lite                    | GBK       | decode    | 253,049.82   | 0.0035 | 0.0042 | 0.0039 | 0.0096 | 0.0129 | 0.0182 | ±0.18% | 240910  |
| iconv-nano                    | Shift JIS | encode    | 493,479.98   | 0.0016 | 0.0028 | 0.0020 | 0.0142 | 0.0158 | 0.0206 | ±0.34% | 360848  |
| <mark>**iconv-lite**</mark>⚡ | Shift JIS | encode    | 480,587.58   | 0.0018 | 0.0025 | 0.0020 | 0.0122 | 0.0138 | 0.0175 | ±0.25% | 395698  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | decode    | 666,832.26   | 0.0014 | 0.0016 | 0.0015 | 0.0019 | 0.0025 | 0.0075 | ±2.25% | 644295  |
| iconv-lite                    | Shift JIS | decode    | 431,935.59   | 0.0020 | 0.0026 | 0.0022 | 0.0091 | 0.0130 | 0.0175 | ±0.23% | 380014  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | encode    | 375,206.51   | 0.0024 | 0.0032 | 0.0027 | 0.0087 | 0.0111 | 0.0177 | ±7.29% | 314882  |
| iconv-lite                    | EUC-KR    | encode    | 245,165.61   | 0.0037 | 0.0043 | 0.0041 | 0.0089 | 0.0096 | 0.0166 | ±2.00% | 234372  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | decode    | 539,190.49   | 0.0016 | 0.0019 | 0.0019 | 0.0026 | 0.0032 | 0.0086 | ±0.19% | 527122  |
| iconv-lite                    | EUC-KR    | decode    | 249,073.03   | 0.0034 | 0.0043 | 0.0040 | 0.0117 | 0.0165 | 0.0292 | ±0.56% | 231517  |
| iconv-nano                    | UTF-8     | encode    | 1,948,856.66 | 0.0004 | 0.0008 | 0.0006 | 0.0058 | 0.0102 | 0.0141 | ±6.23% | 1205475 |
| <mark>**iconv-lite**</mark>⚡ | UTF-8     | encode    | 2,323,908.37 | 0.0004 | 0.0004 | 0.0004 | 0.0010 | 0.0012 | 0.0025 | ±0.51% | 2237881 |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | decode    | 957,016.25   | 0.0009 | 0.0011 | 0.0011 | 0.0015 | 0.0018 | 0.0090 | ±2.98% | 906120  |
| iconv-lite                    | UTF-8     | decode    | 917,638.10   | 0.0008 | 0.0015 | 0.0011 | 0.0096 | 0.0119 | 0.0155 | ±1.00% | 684940  |
| iconv-nano                    | UTF-16    | encode    | 555,606.85   | 0.0015 | 0.0021 | 0.0018 | 0.0058 | 0.0075 | 0.0144 | ±3.82% | 487561  |
| <mark>**iconv-lite**</mark>⚡ | UTF-16    | encode    | 1,829,192.86 | 0.0005 | 0.0006 | 0.0005 | 0.0015 | 0.0017 | 0.0056 | ±1.04% | 1638674 |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | decode    | 680,096.63   | 0.0013 | 0.0015 | 0.0015 | 0.0020 | 0.0022 | 0.0094 | ±1.70% | 657272  |
| iconv-lite                    | UTF-16    | decode    | 927,401.29   | 0.0007 | 0.0017 | 0.0012 | 0.0124 | 0.0149 | 0.0197 | ±0.88% | 585692  |

### Chromium

| library                       | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme     | samples |
| ----------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- | ------- |
| iconv-nano                    | ASCII     | encode    | 213,428.40   | 0.0000 | 0.0045 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97%  | 222823  |
| <mark>**iconv-lite**</mark>⚡ | ASCII     | encode    | 284,485.09   | 0.0000 | 0.0034 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 294067  |
| <mark>**iconv-nano**</mark>⚡ | ASCII     | decode    | 1,096,550.24 | 0.0000 | 0.0009 | 0.0000 | 0.0000 | 0.1000 | 0.1000 | ±1.95%  | 1106450 |
| iconv-lite                    | ASCII     | decode    | 69,146.19    | 0.0000 | 0.0129 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±1.85%  | 77790   |
| <mark>**iconv-nano**</mark>⚡ | Big5      | encode    | 402,806.73   | 0.0000 | 0.0024 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±3.04%  | 412341  |
| iconv-lite                    | Big5      | encode    | 366,523.39   | 0.0000 | 0.0027 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.07%  | 376206  |
| <mark>**iconv-nano**</mark>⚡ | Big5      | decode    | 333,536.93   | 0.0000 | 0.0029 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 343236  |
| iconv-lite                    | Big5      | decode    | 231,177.27   | 0.0000 | 0.0042 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 240729  |
| iconv-nano                    | GBK       | encode    | 180,849.18   | 0.0000 | 0.0053 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97%  | 190185  |
| <mark>**iconv-lite**</mark>⚡ | GBK       | encode    | 217,217.16   | 0.0000 | 0.0044 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97%  | 226695  |
| iconv-nano                    | GBK       | decode    | 113,719.97   | 0.0000 | 0.0081 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.88%  | 122893  |
| <mark>**iconv-lite**</mark>⚡ | GBK       | decode    | 155,558.37   | 0.0000 | 0.0061 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.91%  | 164922  |
| <mark>**iconv-nano**</mark>⚡ | Shift JIS | encode    | 429,744.54   | 0.0000 | 0.0023 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±16.02% | 438646  |
| iconv-lite                    | Shift JIS | encode    | 428,347.00   | 0.0000 | 0.0023 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.05%  | 438072  |
| iconv-nano                    | Shift JIS | decode    | 193,570.94   | 0.0000 | 0.0049 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.20%  | 203021  |
| <mark>**iconv-lite**</mark>⚡ | Shift JIS | decode    | 300,524.48   | 0.0000 | 0.0032 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 310184  |
| <mark>**iconv-nano**</mark>⚡ | EUC-KR    | encode    | 288,940.08   | 0.0000 | 0.0034 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.02%  | 298517  |
| iconv-lite                    | EUC-KR    | encode    | 211,358.29   | 0.0000 | 0.0045 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 220849  |
| iconv-nano                    | EUC-KR    | decode    | 85,180.56    | 0.0000 | 0.0106 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.86%  | 94107   |
| <mark>**iconv-lite**</mark>⚡ | EUC-KR    | decode    | 164,008.70   | 0.0000 | 0.0058 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.91%  | 173410  |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | encode    | 492,880.89   | 0.0000 | 0.0020 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±6.09%  | 501618  |
| iconv-lite                    | UTF-8     | encode    | 186,892.18   | 0.0000 | 0.0051 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.77%  | 196215  |
| <mark>**iconv-nano**</mark>⚡ | UTF-8     | decode    | 494,695.79   | 0.0000 | 0.0020 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±10.79% | 503682  |
| iconv-lite                    | UTF-8     | decode    | 316,134.07   | 0.0000 | 0.0031 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 325833  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | encode    | 440,516.08   | 0.0000 | 0.0022 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.07%  | 450227  |
| iconv-lite                    | UTF-16    | encode    | 182,654.37   | 0.0000 | 0.0052 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.14%  | 192042  |
| <mark>**iconv-nano**</mark>⚡ | UTF-16    | decode    | 553,674.96   | 0.0000 | 0.0018 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 563548  |
| iconv-lite                    | UTF-16    | decode    | 132,900.61   | 0.0000 | 0.0070 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.90%  | 142147  |

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.
