import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

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
  Record<"library" | "encoding" | "title", string>;

const getBenchmarks = (jsonTestResults: JsonTestResults) => {
  const [nodeTestResult, chromiumTestResult] = jsonTestResults.testResults
    .map((testResult) =>
      testResult.assertionResults.flatMap((assertionResult) =>
        assertionResult.benchmarks.flatMap((benchmark) => {
          const [_, encoding, title] = benchmark.name.split(" > ");
          return benchmark.tasks.flatMap<Benchmark>((task) => {
            const { name, ...benchmarkRow } = renderBenchmarkRow(task);

            return {
              library: name,
              encoding: encoding!,
              title: title!,
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
                  val.library = md.bold(val.library);
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
  `Faster library is ${md.bold("bolded")}. Library versions are iconv-nano@${await getPackageVersion("iconv-nano")} and iconv-lite@${await getPackageVersion("iconv-lite")}. Ran on Node.js ${process.version} and Chromium ${await getChromiumVersion()} on ${md.link(`https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`, `GitHub Actions runner ${process.env.ImageOS} ${process.env.ImageVersion} (${process.env.RUNNER_ARCH})`)}.`,
  md.heading("Node.js", { level: 2 }),
  md.table(
    Object.keys(benchmarks.node[0]!),
    benchmarks.node.map((row) => Object.values(row)),
  ),
  md.heading("Chromium", { level: 2 }),
  md.table(
    Object.keys(benchmarks.chromium[0]!),
    benchmarks.chromium.map((row) => Object.values(row)),
  ),
]);

await writeFile(README_PATH, output);
