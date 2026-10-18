# encoding-benchmarks

## Benchmarks

Benchmarks are ran in GitHub Actions using the default benchmark settings on Vitest and tiny-bench. It is ran both in Node.js and in headless Chromium. For Chromium, a polyfill for the Node.js Buffer API is provided by the [`buffer`](https://www.npmjs.com/package/buffer) npm library via [vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) for `iconv-lite`'s use. Fixtures are generated from sample data representative of typical text that the encoding would use (see [./fixtures/README.md](./fixtures/README.md) for more information). Expected output data is generated from the output from Python's system encoding library (see [./scripts/update-fixtures.py](./scripts/update-fixtures.py)).

## Results

Faster library is **bolded** and <mark>highlighted</mark>. Library versions are iconv-nano@0.0.15 and iconv-lite@0.7.3. Ran on Node.js v26.11.1 and Chromium 156.0.8078.4 on [GitHub Actions runner ubuntu24 20261012.334.1 (X64)](https://github.com/jeremy-code/encoding-benchmarks/actions/runs/39083346659).

### Node.js

| library                     | encoding  | title  | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme     | samples |
| --------------------------- | --------- | ------ | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- | ------- |
| <mark>**iconv-nano**</mark> | ASCII     | encode | 344,523.37   | 0.0025 | 0.0032 | 0.0029 | 0.0074 | 0.0084 | 0.0159 | ±3.53%  | 312365  |
| iconv-lite                  | ASCII     | encode | 291,727.29   | 0.0027 | 0.0038 | 0.0036 | 0.0116 | 0.0163 | 0.0319 | ±1.99%  | 265533  |
| <mark>**iconv-nano**</mark> | ASCII     | decode | 1,648,926.73 | 0.0005 | 0.0006 | 0.0006 | 0.0009 | 0.0010 | 0.0064 | ±0.40%  | 1551777 |
| iconv-lite                  | ASCII     | decode | 252,525.15   | 0.0033 | 0.0042 | 0.0040 | 0.0125 | 0.0165 | 0.0295 | ±0.67%  | 235781  |
| iconv-nano                  | Big5      | encode | 557,882.24   | 0.0015 | 0.0023 | 0.0019 | 0.0053 | 0.0077 | 0.0156 | ±13.65% | 427736  |
| <mark>**iconv-lite**</mark> | Big5      | encode | 495,122.21   | 0.0017 | 0.0022 | 0.0021 | 0.0060 | 0.0095 | 0.0263 | ±1.37%  | 448026  |
| <mark>**iconv-nano**</mark> | Big5      | decode | 599,085.78   | 0.0014 | 0.0017 | 0.0018 | 0.0027 | 0.0043 | 0.0104 | ±0.20%  | 578162  |
| iconv-lite                  | Big5      | decode | 455,859.16   | 0.0019 | 0.0023 | 0.0023 | 0.0045 | 0.0061 | 0.0113 | ±0.12%  | 439494  |
| iconv-nano                  | GBK       | encode | 146,902.83   | 0.0061 | 0.0076 | 0.0068 | 0.0152 | 0.0180 | 0.0286 | ±6.48%  | 131781  |
| <mark>**iconv-lite**</mark> | GBK       | encode | 305,620.73   | 0.0029 | 0.0036 | 0.0033 | 0.0065 | 0.0081 | 0.0126 | ±6.54%  | 274155  |
| <mark>**iconv-nano**</mark> | GBK       | decode | 474,161.23   | 0.0018 | 0.0022 | 0.0023 | 0.0036 | 0.0059 | 0.0110 | ±0.22%  | 457946  |
| iconv-lite                  | GBK       | decode | 281,402.92   | 0.0029 | 0.0039 | 0.0038 | 0.0129 | 0.0176 | 0.0323 | ±0.26%  | 256414  |
| iconv-nano                  | Shift JIS | encode | 632,616.41   | 0.0011 | 0.0021 | 0.0019 | 0.0106 | 0.0125 | 0.0155 | ±7.54%  | 483755  |
| <mark>**iconv-lite**</mark> | Shift JIS | encode | 574,947.68   | 0.0014 | 0.0021 | 0.0019 | 0.0088 | 0.0133 | 0.0262 | ±1.24%  | 487444  |
| <mark>**iconv-nano**</mark> | Shift JIS | decode | 776,405.97   | 0.0011 | 0.0013 | 0.0013 | 0.0019 | 0.0026 | 0.0095 | ±1.06%  | 747461  |
| iconv-lite                  | Shift JIS | decode | 529,224.99   | 0.0016 | 0.0020 | 0.0020 | 0.0047 | 0.0059 | 0.0124 | ±0.20%  | 501194  |
| <mark>**iconv-nano**</mark> | EUC-KR    | encode | 390,474.22   | 0.0020 | 0.0032 | 0.0027 | 0.0079 | 0.0118 | 0.0191 | ±8.82%  | 316586  |
| iconv-lite                  | EUC-KR    | encode | 282,244.76   | 0.0030 | 0.0039 | 0.0036 | 0.0093 | 0.0117 | 0.0179 | ±3.20%  | 258220  |
| <mark>**iconv-nano**</mark> | EUC-KR    | decode | 670,364.64   | 0.0012 | 0.0015 | 0.0016 | 0.0021 | 0.0028 | 0.0116 | ±0.33%  | 646191  |
| iconv-lite                  | EUC-KR    | decode | 305,628.81   | 0.0029 | 0.0036 | 0.0033 | 0.0117 | 0.0157 | 0.0315 | ±0.25%  | 280594  |
| iconv-nano                  | UTF-8     | encode | 2,319,267.49 | 0.0003 | 0.0007 | 0.0005 | 0.0038 | 0.0047 | 0.0113 | ±9.38%  | 1375732 |
| <mark>**iconv-lite**</mark> | UTF-8     | encode | 3,061,184.67 | 0.0003 | 0.0004 | 0.0003 | 0.0009 | 0.0011 | 0.0034 | ±0.61%  | 2830439 |
| <mark>**iconv-nano**</mark> | UTF-8     | decode | 1,277,826.78 | 0.0007 | 0.0008 | 0.0008 | 0.0013 | 0.0015 | 0.0109 | ±0.78%  | 1210726 |
| iconv-lite                  | UTF-8     | decode | 1,391,713.27 | 0.0005 | 0.0010 | 0.0008 | 0.0066 | 0.0170 | 0.0471 | ±0.62%  | 1020816 |
| iconv-nano                  | UTF-16    | encode | 510,427.90   | 0.0014 | 0.0023 | 0.0020 | 0.0060 | 0.0078 | 0.0151 | ±5.56%  | 431991  |
| <mark>**iconv-lite**</mark> | UTF-16    | encode | 2,501,223.01 | 0.0003 | 0.0005 | 0.0004 | 0.0016 | 0.0023 | 0.0067 | ±1.29%  | 2099469 |
| iconv-nano                  | UTF-16    | decode | 985,401.62   | 0.0009 | 0.0011 | 0.0011 | 0.0016 | 0.0021 | 0.0169 | ±0.38%  | 923137  |
| <mark>**iconv-lite**</mark> | UTF-16    | decode | 1,553,460.98 | 0.0005 | 0.0008 | 0.0007 | 0.0036 | 0.0137 | 0.0307 | ±0.49%  | 1219433 |

### Chromium

| library                     | encoding  | title  | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme     | samples |
| --------------------------- | --------- | ------ | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- | ------- |
| iconv-nano                  | ASCII     | encode | 250,821.68   | 0.0000 | 0.0038 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±5.36%  | 260127  |
| <mark>**iconv-lite**</mark> | ASCII     | encode | 333,188.55   | 0.0000 | 0.0029 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96%  | 342802  |
| <mark>**iconv-nano**</mark> | ASCII     | decode | 1,270,918.87 | 0.0000 | 0.0008 | 0.0000 | 0.0000 | 0.1000 | 0.1000 | ±1.99%  | 1280818 |
| iconv-lite                  | ASCII     | decode | 72,471.29    | 0.0000 | 0.0123 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±1.88%  | 81094   |
| <mark>**iconv-nano**</mark> | Big5      | encode | 433,691.67   | 0.0000 | 0.0023 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.19%  | 443373  |
| iconv-lite                  | Big5      | encode | 401,208.72   | 0.0000 | 0.0024 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.07%  | 410873  |
| <mark>**iconv-nano**</mark> | Big5      | decode | 411,540.30   | 0.0000 | 0.0024 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 421301  |
| iconv-lite                  | Big5      | decode | 269,708.74   | 0.0000 | 0.0036 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93%  | 279309  |
| iconv-nano                  | GBK       | encode | 158,841.60   | 0.0000 | 0.0059 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.97%  | 168152  |
| <mark>**iconv-lite**</mark> | GBK       | encode | 232,593.52   | 0.0000 | 0.0041 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.98%  | 242098  |
| iconv-nano                  | GBK       | decode | 140,286.21   | 0.0000 | 0.0067 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.90%  | 149621  |
| <mark>**iconv-lite**</mark> | GBK       | decode | 166,446.67   | 0.0000 | 0.0057 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92%  | 175821  |
| iconv-nano                  | Shift JIS | encode | 414,929.05   | 0.0000 | 0.0024 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±28.39% | 426452  |
| <mark>**iconv-lite**</mark> | Shift JIS | encode | 466,847.04   | 0.0000 | 0.0021 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.08%  | 476527  |
| iconv-nano                  | Shift JIS | decode | 230,893.72   | 0.0000 | 0.0042 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.12%  | 240430  |
| <mark>**iconv-lite**</mark> | Shift JIS | decode | 350,915.77   | 0.0000 | 0.0028 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 360640  |
| <mark>**iconv-nano**</mark> | EUC-KR    | encode | 331,504.56   | 0.0000 | 0.0029 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.01%  | 341113  |
| iconv-lite                  | EUC-KR    | encode | 230,175.08   | 0.0000 | 0.0042 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.96%  | 239725  |
| iconv-nano                  | EUC-KR    | decode | 101,844.15   | 0.0000 | 0.0090 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.00%  | 110907  |
| <mark>**iconv-lite**</mark> | EUC-KR    | decode | 178,467.01   | 0.0000 | 0.0053 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92%  | 187898  |
| <mark>**iconv-nano**</mark> | UTF-8     | encode | 549,323.27   | 0.0000 | 0.0018 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±4.94%  | 558194  |
| iconv-lite                  | UTF-8     | encode | 192,721.90   | 0.0000 | 0.0050 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±7.45%  | 201743  |
| <mark>**iconv-nano**</mark> | UTF-8     | decode | 628,696.95   | 0.0000 | 0.0016 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.32%  | 638277  |
| iconv-lite                  | UTF-8     | decode | 315,212.81   | 0.0000 | 0.0031 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.29%  | 324843  |
| <mark>**iconv-nano**</mark> | UTF-16    | encode | 480,421.21   | 0.0000 | 0.0020 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.97%  | 489966  |
| iconv-lite                  | UTF-16    | encode | 187,593.41   | 0.0000 | 0.0051 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94%  | 197003  |
| <mark>**iconv-nano**</mark> | UTF-16    | decode | 659,252.26   | 0.0000 | 0.0015 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95%  | 669094  |
| iconv-lite                  | UTF-16    | decode | 140,752.18   | 0.0000 | 0.0067 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.90%  | 150047  |
