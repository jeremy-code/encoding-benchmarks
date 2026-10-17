import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import * as md from "ts-markdown-builder";
import type { TestBenchmarkTask } from "vitest";
import type { JsonTestResults } from "vitest/node";

import { getChromiumVersion } from "./utils/getChromiumVersion.ts";
import { getPackageVersion } from "./utils/getPackageVersion.ts";

const chunk = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size),
  );

// https://github.com/vitest-dev/vitest/blob/d9ea973140d267ca4702deb32aa35c0afb960e52/packages/vitest/src/node/reporters/renderers/benchmark-table.ts#L17
const formatBenchNumber = (number: number): string => {
  const res = number.toFixed(number < 100 ? 4 : 2).split(".");
  return (
    res[0]!.replace(/(?=(?:\d{3})+$)\B/g, ",") + (res[1] ? `.${res[1]}` : "")
  );
};

// https://github.com/vitest-dev/vitest/blob/d9ea973140d267ca4702deb32aa35c0afb960e52/packages/vitest/src/node/reporters/renderers/benchmark-table.ts
const renderBenchmarkRow = (task: TestBenchmarkTask) => {
  return {
    name: task.name,
    hz: formatBenchNumber(task.throughput.mean),
    min: formatBenchNumber(task.latency.min),
    mean: formatBenchNumber(task.latency.mean),
    p75: formatBenchNumber(task.latency.p75 || 0),
    p99: formatBenchNumber(task.latency.p99 || 0),
    p995: formatBenchNumber(task.latency.p995 || 0),
    p999: formatBenchNumber(task.latency.p999 || 0),
    rme: `\u00B1${(task.latency.rme || 0).toFixed(2)}%`,
    samples: task.latency.samplesCount.toString(),
  };
};

const getTestOutput = async () => {
  const json = await import("../test-output.json", {
    with: { type: "json" },
  }).then((m) => m.default);

  // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- This is what the JSON reporter uses for its types
  return json as unknown as JsonTestResults;
};

const getBenchmarks = async () => {
  const [nodeTestResult, chromiumTestResult] = (
    await getTestOutput()
  ).testResults
    .map((testResult) =>
      testResult.assertionResults.flatMap((assertionResult) =>
        assertionResult.benchmarks.flatMap((benchmark) => {
          const [_, encoding, title] = benchmark.name.split(" > ");
          return benchmark.tasks.flatMap((task) => {
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
          const iconvLite = testResultChunks.find(
            (testResultChunk) => testResultChunk.library === "iconv-lite",
          )!;
          const iconvNano = testResultChunks.find(
            (testResultChunk) => testResultChunk.library === "iconv-nano",
          )!;
          const fastestChunk = testResultChunks[0]!;
          fastestChunk.library = md.bold(fastestChunk.library);
          return [iconvNano, iconvLite];
        })
        .flat(),
    );
  if (nodeTestResult === undefined || chromiumTestResult === undefined) {
    throw new Error("Expected two JsonTestResult objects in testResults");
  }
  return {
    node: nodeTestResult,
    chromium: chromiumTestResult,
  };
};

const benchmarks = await getBenchmarks();

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
