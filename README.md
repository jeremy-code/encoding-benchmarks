# encoding-benchmarks

[![GitHub Actions](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml/badge.svg)](https://github.com/jeremy-code/encoding-benchmarks/actions/workflows/ci.yml)

## Benchmarks

Benchmarks are ran in GitHub Actions using the default benchmark settings with Vitest and tiny-bench. It is ran once in both in Node.js and in headless Chromium. For Chromium, a polyfill for the Node.js Buffer API is provided by the [`buffer`](https://www.npmjs.com/package/buffer) npm library via [vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) for `iconv-lite`'s use. Fixtures are generated from sample data representative of typical text that the encoding would use (see [./fixtures/README.md](./fixtures/README.md) for more information). Expected output data is generated from the output from Python's system encoding library (see [./scripts/update-fixtures.py](./scripts/update-fixtures.py)).

### Additional notes

- The 'ASCII' encoding is actually [Windows-1252](https://en.wikipedia.org/wiki/Windows-1252) as opposed to 7-bit ASCII. This is because this is what the whatwg/encoding standard should be aliased for ASCII. It is also more useful as a benchmark, as 7-bit ASCII is a subset of UTF-8, so Windows-1252 is more representative of what typical single byte encoding performance should be. The encoding performance for single-byte encodings is essentially identical among encodings (as one would expect), so Windows-1252 is the only representative to avoid skewing the results one way or another.
- Input data is provided based on what is expected for the encoding. For example, iconv-nano can handle characters comprised of multiple code points for single-byte encodings (`iconv.ascii.encode('😅')` encodes into '?') while iconv-lite cannot (it encodes into '??'). See [pillarjs/iconv-lite#368](https://github.com/pillarjs/iconv-lite/issues/368). This issue will not be represented in the ASCII encoding fixture.

## Results

Faster library is **bolded** and <mark>highlighted</mark>. Library versions are [iconv-nano](https://www.npmjs.com/package/iconv-nano)@0.0.16 and [iconv-lite](https://www.npmjs.com/package/iconv-lite)@0.7.3. Ran on Node.js v26.11.1 and Chromium 156.0.8078.4 on [GitHub Actions runner ubuntu26 version 20261023.163.3 (X64)](https://github.com/jeremy-code/encoding-benchmarks/actions/runs/40057050609).

### Node.js

| library                     | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme     | samples |
| --------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- | ------- |
| iconv-nano                  | ASCII     | encode    | 253,100.76   | 0.0000 | 0.0038 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±2.05%  | 262284  |
| <mark>**iconv-lite**</mark> | ASCII     | encode    | 263,759.02   | 0.0000 | 0.0037 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 273306  |
| <mark>**iconv-nano**</mark> | ASCII     | decode    | 1,281,625.38 | 0.0000 | 0.0008 | 0.0000 | 0.0000 | 0.1000 | 0.1000 | ±1.95%  | 1291544 |
| iconv-lite                  | ASCII     | decode    | 84,077.19    | 0.0000 | 0.0108 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±1.93%  | 92804   |
| iconv-nano                  | Big5      | encode    | 422,240.41   | 0.0000 | 0.0023 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±15.89% | 430388  |
| <mark>**iconv-lite**</mark> | Big5      | encode    | 445,007.75   | 0.0000 | 0.0022 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±4.11%  | 454371  |
| <mark>**iconv-nano**</mark> | Big5      | decode    | 444,792.69   | 0.0000 | 0.0022 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.04%  | 454583  |
| iconv-lite                  | Big5      | decode    | 262,773.94   | 0.0000 | 0.0037 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 272418  |
| iconv-nano                  | GBK       | encode    | 238,901.69   | 0.0000 | 0.0040 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96%  | 248419  |
| <mark>**iconv-lite**</mark> | GBK       | encode    | 281,557.85   | 0.0000 | 0.0034 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 291159  |
| <mark>**iconv-nano**</mark> | GBK       | decode    | 195,290.77   | 0.0000 | 0.0049 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92%  | 204782  |
| iconv-lite                  | GBK       | decode    | 173,822.01   | 0.0000 | 0.0055 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92%  | 183219  |
| <mark>**iconv-nano**</mark> | Shift JIS | encode    | 603,834.60   | 0.0000 | 0.0016 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.04%  | 613633  |
| iconv-lite                  | Shift JIS | encode    | 521,937.09   | 0.0000 | 0.0019 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±11.90% | 531043  |
| iconv-nano                  | Shift JIS | decode    | 205,291.88   | 0.0000 | 0.0047 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92%  | 214818  |
| <mark>**iconv-lite**</mark> | Shift JIS | decode    | 345,831.68   | 0.0000 | 0.0028 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 355562  |
| <mark>**iconv-nano**</mark> | EUC-KR    | encode    | 361,350.58   | 0.0000 | 0.0027 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.51%  | 370892  |
| iconv-lite                  | EUC-KR    | encode    | 254,125.51   | 0.0000 | 0.0038 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96%  | 263689  |
| iconv-nano                  | EUC-KR    | decode    | 88,313.88    | 0.0000 | 0.0103 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96%  | 97205   |
| <mark>**iconv-lite**</mark> | EUC-KR    | decode    | 186,772.05   | 0.0000 | 0.0051 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 196191  |
| <mark>**iconv-nano**</mark> | UTF-8     | encode    | 611,431.61   | 0.0000 | 0.0016 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.20%  | 620658  |
| iconv-lite                  | UTF-8     | encode    | 182,713.13   | 0.0000 | 0.0052 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±3.73%  | 191957  |
| <mark>**iconv-nano**</mark> | UTF-8     | decode    | 617,044.88   | 0.0000 | 0.0016 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.13%  | 626536  |
| iconv-lite                  | UTF-8     | decode    | 346,473.30   | 0.0000 | 0.0028 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 356209  |
| <mark>**iconv-nano**</mark> | UTF-16    | encode    | 541,268.75   | 0.0000 | 0.0018 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.98%  | 551072  |
| iconv-lite                  | UTF-16    | encode    | 166,544.71   | 0.0000 | 0.0057 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97%  | 175860  |
| <mark>**iconv-nano**</mark> | UTF-16    | decode    | 697,046.62   | 0.0000 | 0.0014 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 706969  |
| iconv-lite                  | UTF-16    | decode    | 160,228.32   | 0.0000 | 0.0059 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92%  | 169582  |

### Chromium

| library                     | encoding  | operation | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| --------------------------- | --------- | --------- | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| iconv-nano                  | ASCII     | encode    | 312,789.26   | 0.0029 | 0.0034 | 0.0032 | 0.0072 | 0.0088 | 0.0146 | ±1.96% | 295743  |
| <mark>**iconv-lite**</mark> | ASCII     | encode    | 370,240.37   | 0.0023 | 0.0028 | 0.0027 | 0.0071 | 0.0081 | 0.0131 | ±1.01% | 351390  |
| <mark>**iconv-nano**</mark> | ASCII     | decode    | 1,361,960.46 | 0.0007 | 0.0008 | 0.0007 | 0.0011 | 0.0012 | 0.0029 | ±0.19% | 1323381 |
| iconv-lite                  | ASCII     | decode    | 313,443.43   | 0.0027 | 0.0033 | 0.0032 | 0.0077 | 0.0090 | 0.0128 | ±0.15% | 302525  |
| <mark>**iconv-nano**</mark> | Big5      | encode    | 666,198.15   | 0.0013 | 0.0019 | 0.0014 | 0.0085 | 0.0108 | 0.0180 | ±0.94% | 517618  |
| iconv-lite                  | Big5      | encode    | 556,559.50   | 0.0016 | 0.0020 | 0.0018 | 0.0057 | 0.0066 | 0.0122 | ±1.36% | 510609  |
| <mark>**iconv-nano**</mark> | Big5      | decode    | 620,004.44   | 0.0015 | 0.0017 | 0.0016 | 0.0021 | 0.0024 | 0.0081 | ±1.14% | 604366  |
| iconv-lite                  | Big5      | decode    | 470,412.09   | 0.0019 | 0.0022 | 0.0021 | 0.0057 | 0.0065 | 0.0098 | ±0.11% | 449548  |
| iconv-nano                  | GBK       | encode    | 359,859.27   | 0.0023 | 0.0032 | 0.0028 | 0.0090 | 0.0108 | 0.0163 | ±3.27% | 314267  |
| <mark>**iconv-lite**</mark> | GBK       | encode    | 338,881.24   | 0.0026 | 0.0031 | 0.0029 | 0.0071 | 0.0087 | 0.0126 | ±1.38% | 322279  |
| <mark>**iconv-nano**</mark> | GBK       | decode    | 486,427.29   | 0.0019 | 0.0021 | 0.0021 | 0.0028 | 0.0031 | 0.0088 | ±0.21% | 477598  |
| iconv-lite                  | GBK       | decode    | 320,012.29   | 0.0027 | 0.0032 | 0.0031 | 0.0074 | 0.0086 | 0.0127 | ±0.14% | 310164  |
| <mark>**iconv-nano**</mark> | Shift JIS | encode    | 752,863.59   | 0.0011 | 0.0017 | 0.0012 | 0.0066 | 0.0083 | 0.0127 | ±3.16% | 592666  |
| iconv-lite                  | Shift JIS | encode    | 640,872.85   | 0.0014 | 0.0017 | 0.0015 | 0.0057 | 0.0062 | 0.0107 | ±0.17% | 584100  |
| <mark>**iconv-nano**</mark> | Shift JIS | decode    | 737,907.17   | 0.0013 | 0.0014 | 0.0014 | 0.0017 | 0.0018 | 0.0076 | ±0.15% | 727993  |
| iconv-lite                  | Shift JIS | decode    | 560,595.09   | 0.0016 | 0.0019 | 0.0018 | 0.0054 | 0.0061 | 0.0097 | ±1.08% | 524916  |
| <mark>**iconv-nano**</mark> | EUC-KR    | encode    | 520,238.56   | 0.0017 | 0.0024 | 0.0019 | 0.0079 | 0.0106 | 0.0280 | ±5.17% | 424817  |
| iconv-lite                  | EUC-KR    | encode    | 292,834.40   | 0.0030 | 0.0035 | 0.0034 | 0.0090 | 0.0094 | 0.0127 | ±0.50% | 282523  |
| <mark>**iconv-nano**</mark> | EUC-KR    | decode    | 643,049.29   | 0.0014 | 0.0016 | 0.0016 | 0.0020 | 0.0023 | 0.0082 | ±0.17% | 630765  |
| iconv-lite                  | EUC-KR    | decode    | 337,862.33   | 0.0026 | 0.0031 | 0.0030 | 0.0071 | 0.0081 | 0.0118 | ±0.16% | 326520  |
| iconv-nano                  | UTF-8     | encode    | 2,098,115.66 | 0.0003 | 0.0007 | 0.0006 | 0.0031 | 0.0037 | 0.0077 | ±7.99% | 1434119 |
| <mark>**iconv-lite**</mark> | UTF-8     | encode    | 2,411,111.54 | 0.0004 | 0.0004 | 0.0004 | 0.0009 | 0.0011 | 0.0052 | ±1.32% | 2252811 |
| <mark>**iconv-nano**</mark> | UTF-8     | decode    | 1,129,663.54 | 0.0008 | 0.0009 | 0.0009 | 0.0013 | 0.0014 | 0.0070 | ±2.41% | 1087949 |
| iconv-lite                  | UTF-8     | decode    | 1,089,464.47 | 0.0007 | 0.0012 | 0.0010 | 0.0050 | 0.0055 | 0.0088 | ±0.30% | 854137  |
| iconv-nano                  | UTF-16    | encode    | 727,981.99   | 0.0012 | 0.0016 | 0.0014 | 0.0047 | 0.0057 | 0.0097 | ±4.28% | 622410  |
| <mark>**iconv-lite**</mark> | UTF-16    | encode    | 1,830,108.77 | 0.0005 | 0.0006 | 0.0005 | 0.0012 | 0.0021 | 0.0053 | ±1.02% | 1661662 |
| iconv-nano                  | UTF-16    | decode    | 864,127.00   | 0.0010 | 0.0012 | 0.0012 | 0.0016 | 0.0017 | 0.0084 | ±1.69% | 837079  |
| <mark>**iconv-lite**</mark> | UTF-16    | decode    | 1,110,941.99 | 0.0007 | 0.0011 | 0.0010 | 0.0047 | 0.0053 | 0.0088 | ±1.19% | 912834  |

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for details.
