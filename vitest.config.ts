import { playwright } from "@vitest/browser-playwright";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { defineConfig } from "vitest/config";

const vitestConfig = defineConfig({
  test: {
    projects: [
      {
        define: { "import.meta.runtime": JSON.stringify("node") },
        test: {
          name: "node",
          environment: "node",
        },
      },
      {
        define: { "import.meta.runtime": JSON.stringify("chromium") },
        plugins: [nodePolyfills({ include: ["buffer"] })],
        optimizeDeps: {
          include: ["iconv-lite-beta/web"],
        },
        test: {
          name: "browser",
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            ui: false,
            instances: [{ browser: "chromium" }],
            screenshotFailures: false,
          },
        },
      },
    ],
  },
});

export default vitestConfig;
