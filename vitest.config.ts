import { playwright } from "@vitest/browser-playwright";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { defineConfig } from "vitest/config";

const vitestConfig = defineConfig({
  test: {
    projects: [
      {
        test: {
          name: "node",
          environment: "node",
        },
      },
      {
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
        plugins: [nodePolyfills({ include: ["buffer"] })],
      },
    ],
  },
});

export default vitestConfig;
