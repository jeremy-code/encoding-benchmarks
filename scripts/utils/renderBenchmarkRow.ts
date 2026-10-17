import type { TestBenchmarkTask } from "vitest";

// https://github.com/vitest-dev/vitest/blob/d9ea973140d267ca4702deb32aa35c0afb960e52/packages/vitest/src/node/reporters/renderers/benchmark-table.ts#L17
const formatBenchNumber = (number: number): string => {
  const res = number.toFixed(number < 100 ? 4 : 2).split(".");
  return (
    res[0]!.replace(/(?=(?:\d{3})+$)\B/g, ",") + (res[1] ? `.${res[1]}` : "")
  );
};

type BenchmarkRow = Record<
  | "name"
  | "hz"
  | "min"
  | "mean"
  | `p${75 | 99 | 995 | 999}`
  | "rme"
  | "samples",
  string
>;

// https://github.com/vitest-dev/vitest/blob/d9ea973140d267ca4702deb32aa35c0afb960e52/packages/vitest/src/node/reporters/renderers/benchmark-table.ts
const renderBenchmarkRow = (task: TestBenchmarkTask): BenchmarkRow => {
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

export { renderBenchmarkRow, type BenchmarkRow };
