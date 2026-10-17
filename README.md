# encoding-benchmarks

## Benchmarks

Benchmarks are ran in GitHub Actions using the default benchmark settings on Vitest and tiny-bench. It is ran both in Node.js and in headless Chromium. For Chromium, a polyfill for the Node.js Buffer API is provided by the [`buffer`](https://www.npmjs.com/package/buffer) npm library via [vite-plugin-node-polyfills](https://github.com/davidmyersdev/vite-plugin-node-polyfills) for `iconv-lite`'s use. Fixtures are generated from sample data representative of typical text that the encoding would use (see [./fixtures/README.md](./fixtures/README.md) for more information). Expected output data is generated from the output from Python's system encoding library (see [./scripts/update-fixtures.py](./scripts/update-fixtures.py)).

## Results

Faster library is **bolded** and <mark>highlighted</mark>. Library versions are iconv-nano@0.0.14 and iconv-lite@0.7.3. Ran on Node.js v26.11.1 and Chromium 156.0.8078.4 on [GitHub Actions runner ubuntu24 20261012.334.1 (X64)](https://github.com/jeremy-code/encoding-benchmarks/actions/runs/39021049168).

### Node.js

| library                     | encoding  | title  | hz           | min    | mean   | p75    | p99    | p995   | p999   | rme     | samples |
| --------------------------- | --------- | ------ | ------------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- | ------- |
| iconv-nano                  | ASCII     | encode | 208,740.74   | 0.0045 | 0.0051 | 0.0047 | 0.0140 | 0.0146 | 0.0232 | ±2.08%  | 196561  |
| <mark>**iconv-lite**</mark> | ASCII     | encode | 277,437.08   | 0.0032 | 0.0039 | 0.0035 | 0.0136 | 0.0142 | 0.0223 | ±0.72%  | 255825  |
| <mark>**iconv-nano**</mark> | ASCII     | decode | 770,993.54   | 0.0012 | 0.0014 | 0.0013 | 0.0023 | 0.0026 | 0.0124 | ±0.36%  | 738976  |
| iconv-lite                  | ASCII     | decode | 174,798.22   | 0.0052 | 0.0061 | 0.0056 | 0.0147 | 0.0164 | 0.0268 | ±1.54%  | 163278  |
| <mark>**iconv-nano**</mark> | Big5      | encode | 379,970.50   | 0.0023 | 0.0032 | 0.0027 | 0.0062 | 0.0071 | 0.0149 | ±11.19% | 313096  |
| iconv-lite                  | Big5      | encode | 325,159.02   | 0.0028 | 0.0033 | 0.0031 | 0.0071 | 0.0131 | 0.0391 | ±0.69%  | 305266  |
| <mark>**iconv-nano**</mark> | Big5      | decode | 402,273.45   | 0.0023 | 0.0025 | 0.0025 | 0.0032 | 0.0039 | 0.0138 | ±0.28%  | 394263  |
| iconv-lite                  | Big5      | decode | 282,147.81   | 0.0032 | 0.0036 | 0.0036 | 0.0066 | 0.0076 | 0.0154 | ±0.15%  | 274410  |
| iconv-nano                  | GBK       | encode | 82,087.83    | 0.0116 | 0.0127 | 0.0121 | 0.0217 | 0.0224 | 0.0355 | ±3.41%  | 78812   |
| <mark>**iconv-lite**</mark> | GBK       | encode | 182,924.98   | 0.0049 | 0.0058 | 0.0058 | 0.0143 | 0.0156 | 0.0217 | ±4.10%  | 171641  |
| <mark>**iconv-nano**</mark> | GBK       | decode | 316,604.30   | 0.0029 | 0.0032 | 0.0032 | 0.0041 | 0.0056 | 0.0150 | ±0.30%  | 310141  |
| iconv-lite                  | GBK       | decode | 190,106.98   | 0.0047 | 0.0054 | 0.0053 | 0.0097 | 0.0159 | 0.0203 | ±0.20%  | 185442  |
| <mark>**iconv-nano**</mark> | Shift JIS | encode | 400,007.49   | 0.0019 | 0.0028 | 0.0030 | 0.0071 | 0.0082 | 0.0188 | ±0.21%  | 357734  |
| iconv-lite                  | Shift JIS | encode | 365,071.32   | 0.0024 | 0.0031 | 0.0027 | 0.0070 | 0.0132 | 0.0285 | ±3.59%  | 324363  |
| <mark>**iconv-nano**</mark> | Shift JIS | decode | 463,544.16   | 0.0020 | 0.0022 | 0.0022 | 0.0031 | 0.0037 | 0.0166 | ±0.38%  | 445345  |
| iconv-lite                  | Shift JIS | decode | 330,512.84   | 0.0027 | 0.0031 | 0.0031 | 0.0059 | 0.0067 | 0.0153 | ±0.22%  | 319855  |
| <mark>**iconv-nano**</mark> | EUC-KR    | encode | 288,208.56   | 0.0031 | 0.0041 | 0.0035 | 0.0073 | 0.0102 | 0.0216 | ±9.36%  | 246106  |
| iconv-lite                  | EUC-KR    | encode | 149,039.30   | 0.0052 | 0.0069 | 0.0067 | 0.0120 | 0.0162 | 0.0187 | ±1.50%  | 145527  |
| <mark>**iconv-nano**</mark> | EUC-KR    | decode | 398,329.68   | 0.0023 | 0.0026 | 0.0025 | 0.0033 | 0.0044 | 0.0141 | ±0.90%  | 388048  |
| iconv-lite                  | EUC-KR    | decode | 193,248.77   | 0.0046 | 0.0053 | 0.0052 | 0.0097 | 0.0157 | 0.0224 | ±0.22%  | 187696  |
| iconv-nano                  | UTF-8     | encode | 1,168,622.35 | 0.0007 | 0.0011 | 0.0009 | 0.0021 | 0.0034 | 0.0120 | ±7.76%  | 923308  |
| <mark>**iconv-lite**</mark> | UTF-8     | encode | 1,220,593.39 | 0.0007 | 0.0009 | 0.0008 | 0.0017 | 0.0018 | 0.0057 | ±1.54%  | 1175921 |
| iconv-nano                  | UTF-8     | decode | 532,091.61   | 0.0017 | 0.0019 | 0.0019 | 0.0025 | 0.0029 | 0.0132 | ±0.33%  | 519095  |
| <mark>**iconv-lite**</mark> | UTF-8     | decode | 591,691.29   | 0.0014 | 0.0019 | 0.0017 | 0.0055 | 0.0099 | 0.0324 | ±0.42%  | 536423  |
| iconv-nano                  | UTF-16    | encode | 423,337.81   | 0.0020 | 0.0027 | 0.0023 | 0.0085 | 0.0102 | 0.0166 | ±4.04%  | 368228  |
| <mark>**iconv-lite**</mark> | UTF-16    | encode | 1,084,066.11 | 0.0008 | 0.0010 | 0.0009 | 0.0020 | 0.0026 | 0.0123 | ±1.08%  | 977433  |
| iconv-nano                  | UTF-16    | decode | 519,208.30   | 0.0018 | 0.0020 | 0.0019 | 0.0026 | 0.0039 | 0.0134 | ±2.23%  | 495210  |
| <mark>**iconv-lite**</mark> | UTF-16    | decode | 724,766.16   | 0.0011 | 0.0015 | 0.0014 | 0.0028 | 0.0121 | 0.0293 | ±0.39%  | 655453  |

### Chromium

| library                     | encoding  | title  | hz         | min    | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| --------------------------- | --------- | ------ | ---------- | ------ | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| iconv-nano                  | ASCII     | encode | 205,710.45 | 0.0000 | 0.0047 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±3.85% | 214773  |
| <mark>**iconv-lite**</mark> | ASCII     | encode | 226,217.42 | 0.0000 | 0.0042 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.98% | 235560  |
| <mark>**iconv-nano**</mark> | ASCII     | decode | 908,295.65 | 0.0000 | 0.0011 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95% | 918170  |
| iconv-lite                  | ASCII     | decode | 49,227.16  | 0.0000 | 0.0175 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±1.85% | 57284   |
| <mark>**iconv-nano**</mark> | Big5      | encode | 312,523.07 | 0.0000 | 0.0031 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.03% | 322148  |
| iconv-lite                  | Big5      | encode | 280,218.15 | 0.0000 | 0.0035 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.03% | 289807  |
| <mark>**iconv-nano**</mark> | Big5      | decode | 265,637.32 | 0.0000 | 0.0036 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 275293  |
| iconv-lite                  | Big5      | decode | 184,629.22 | 0.0000 | 0.0052 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 194025  |
| iconv-nano                  | GBK       | encode | 87,960.30  | 0.0000 | 0.0103 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±2.00% | 96719   |
| <mark>**iconv-lite**</mark> | GBK       | encode | 166,954.65 | 0.0000 | 0.0057 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95% | 176310  |
| iconv-nano                  | GBK       | decode | 113,248.84 | 0.0000 | 0.0082 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.88% | 122409  |
| <mark>**iconv-lite**</mark> | GBK       | decode | 114,183.25 | 0.0000 | 0.0081 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 123221  |
| <mark>**iconv-nano**</mark> | Shift JIS | encode | 384,181.43 | 0.0000 | 0.0025 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.31% | 393823  |
| iconv-lite                  | Shift JIS | encode | 359,695.83 | 0.0000 | 0.0027 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.03% | 369339  |
| iconv-nano                  | Shift JIS | decode | 143,570.76 | 0.0000 | 0.0065 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.90% | 152923  |
| <mark>**iconv-lite**</mark> | Shift JIS | decode | 244,096.52 | 0.0000 | 0.0039 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 253675  |
| <mark>**iconv-nano**</mark> | EUC-KR    | encode | 232,478.61 | 0.0000 | 0.0041 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.06% | 241934  |
| iconv-lite                  | EUC-KR    | encode | 131,111.95 | 0.0000 | 0.0071 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.92% | 140334  |
| iconv-nano                  | EUC-KR    | decode | 69,471.67  | 0.0000 | 0.0128 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.84% | 78166   |
| <mark>**iconv-lite**</mark> | EUC-KR    | decode | 114,183.87 | 0.0000 | 0.0081 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.91% | 123254  |
| <mark>**iconv-nano**</mark> | UTF-8     | encode | 408,702.58 | 0.0000 | 0.0024 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.60% | 417897  |
| iconv-lite                  | UTF-8     | encode | 122,540.70 | 0.0000 | 0.0076 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±4.56% | 131475  |
| <mark>**iconv-nano**</mark> | UTF-8     | decode | 439,363.14 | 0.0000 | 0.0022 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±2.21% | 448932  |
| iconv-lite                  | UTF-8     | decode | 228,714.81 | 0.0000 | 0.0042 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.93% | 238288  |
| <mark>**iconv-nano**</mark> | UTF-16    | encode | 380,551.19 | 0.0000 | 0.0026 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.98% | 390245  |
| iconv-lite                  | UTF-16    | encode | 123,843.90 | 0.0000 | 0.0075 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.95% | 132923  |
| <mark>**iconv-nano**</mark> | UTF-16    | decode | 451,964.09 | 0.0000 | 0.0022 | 0.0000 | 0.1000 | 0.1000 | 0.1000 | ±1.94% | 461784  |
| iconv-lite                  | UTF-16    | decode | 96,827.76  | 0.0000 | 0.0095 | 0.0000 | 0.1000 | 0.1000 | 0.2000 | ±1.91% | 105733  |
