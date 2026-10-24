import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { format, type FormatConfig } from "oxfmt";
import * as md from "ts-markdown-builder";
import type { JsonTestResults } from "vitest/node";

import { chunk } from "./utils/chunk.ts";
import { getChromiumVersion } from "./utils/getChromiumVersion.ts";
import { getPackageVersion } from "./utils/getPackageVersion.ts";
import {
  renderBenchmarkRow,
  type BenchmarkRow,
} from "./utils/renderBenchmarkRow.ts";

const getTestOutput = async () => {
  const json = await import("../test-output.json", {
    with: { type: "json" },
  }).then((m) => m.default);

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- This is what the JSON reporter uses for its types
  return json as unknown as JsonTestResults;
};

type Benchmark = Omit<BenchmarkRow, "name"> &
  Record<"library" | "encoding" | "operation", string>;

const getBenchmarks = (jsonTestResults: JsonTestResults) => {
  const [nodeTestResult, chromiumTestResult] = jsonTestResults.testResults
    .map((testResult) =>
      testResult.assertionResults.flatMap((assertionResult) =>
        assertionResult.benchmarks.flatMap((benchmark) => {
          const [encoding, operation] = benchmark.name.split(" > ");
          return benchmark.tasks.flatMap<Benchmark>((task) => {
            const { name, ...benchmarkRow } = renderBenchmarkRow(task);

            return {
              library: name,
              encoding: encoding!,
              operation: operation!,
              ...benchmarkRow,
            };
          });
        }),
      ),
    )
    // Sort in consistent order and bold the faster library
    .map((testResult) =>
      chunk(testResult, 2)
        .map((testResultChunks) => {
          const { "iconv-nano": iconvNano, "iconv-lite": iconvLite } =
            testResultChunks.reduce<Record<string, Benchmark>>(
              (acc, val, index) => {
                acc[val.library] = val;
                if (index === 0) {
                  val.library = `<mark>${md.bold(val.library)}</mark>`;
                }
                return acc;
              },
              {},
            );
          return [iconvNano!, iconvLite!];
        })
        .flat(),
    );
  if (nodeTestResult === undefined || chromiumTestResult === undefined) {
    throw new Error("Expected two JsonTestResult objects in testResults");
  }
  return { node: nodeTestResult, chromium: chromiumTestResult };
};

const benchmarks = getBenchmarks(await getTestOutput());

const README_PATH = fileURLToPath(new URL("../README.md", import.meta.url));

const output = md.joinBlocks([
  md.heading("encoding-benchmarks"),
  md.link(
    `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/workflows/ci.yml`,
    md.image(
      `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/workflows/ci.yml/badge.svg`,
      "GitHub Actions",
    ),
  ),
  md.heading("Benchmarks", { level: 2 }),
  [
    "Benchmarks are ran in GitHub Actions using the default benchmark settings with Vitest and tiny-bench.",
    "It is ran once in both in Node.js and in headless Chromium.",
    `For Chromium, a polyfill for the Node.js Buffer API is provided by the ${md.link("https://www.npmjs.com/package/buffer", md.code("buffer"))} npm library via ${md.link("https://github.com/davidmyersdev/vite-plugin-node-polyfills", "vite-plugin-node-polyfills")} for ${md.code("iconv-lite")}'s use.`,
    `Fixtures are generated from sample data representative of typical text that the encoding would use (see ${md.link("./fixtures/README.md", "./fixtures/README.md")} for more information).`,
    `Expected output data is generated from the output from Python's system encoding library (see ${md.link("./scripts/update-fixtures.py", "./scripts/update-fixtures.py")}).`,
  ].join(" "),
  md.heading("Additional notes", { level: 3 }),
  md.list([
    [
      `The 'ASCII' encoding is actually ${md.link("https://en.wikipedia.org/wiki/Windows-1252", "Windows-1252")} as opposed to 7-bit ASCII. This is because this is what the whatwg/encoding standard should be aliased for ASCII.`,
      "It is also more useful as a benchmark, as 7-bit ASCII is a subset of UTF-8, so Windows-1252 is more representative of what typical single byte encoding performance should be.",
      "The encoding performance for single-byte encodings is essentially identical among encodings (as one would expect), so Windows-1252 is the only representative to avoid skewing the results one way or another.",
    ].join(" "),
    [
      "Input data is provided based on what is expected for the encoding.",
      `For example, iconv-nano can handle characters comprised of multiple code points for single-byte encodings (${md.code("iconv.ascii.encode('😅')")} encodes into '?') while iconv-lite cannot (it encodes into '??').`,
      `See ${md.link("https://github.com/pillarjs/iconv-lite/issues/368", "pillarjs/iconv-lite#368")}.`,
      "This issue will not be represented in the ASCII encoding fixture.",
    ].join(" "),
  ]),
  md.heading("Results", { level: 2 }),
  [
    `Faster library is ${md.bold("bolded")} and <mark>highlighted</mark>.`,
    `Library versions are ${md.link("https://www.npmjs.com/package/iconv-nano", "iconv-nano")}@${await getPackageVersion("iconv-nano")} and ${md.link("https://www.npmjs.com/package/iconv-lite", "iconv-lite")}@${await getPackageVersion("iconv-lite")}.`,
    `Ran on Node.js ${process.version} and Chromium ${await getChromiumVersion()} on ${md.link(`https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`, `GitHub Actions runner ${process.env.ImageOS} version ${process.env.ImageVersion} (${process.env.RUNNER_ARCH})`)}.`,
  ].join(" "),
  md.heading("Node.js", { level: 3 }),
  md.table(
    Object.keys(benchmarks.node[0]!),
    benchmarks.node.map((row) => Object.values(row)),
  ),
  md.heading("Chromium", { level: 3 }),
  md.table(
    Object.keys(benchmarks.chromium[0]!),
    benchmarks.chromium.map((row) => Object.values(row)),
  ),
  md.heading("License", { level: 2 }),
  [
    "This project is licensed under the MIT license.",
    `See the ${md.link("LICENSE", "LICENSE")} file for details.`,
  ].join(" "),
]);

const formattedOutput = (
  await format(
    "README.md",
    output,
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    (await import("../.oxfmtrc.json", {
      with: { type: "json" },
    }).then((m) => m.default)) as FormatConfig,
  )
).code;

await writeFile(README_PATH, formattedOutput);
