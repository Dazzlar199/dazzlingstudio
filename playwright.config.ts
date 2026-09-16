import { defineConfig, devices } from "@playwright/test";

const previewBaseUrl = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: "./e2e",
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: previewBaseUrl ?? "http://127.0.0.1:3000",
    storageState: process.env.PLAYWRIGHT_STORAGE_STATE,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "pixel-7", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } },
    { name: "ipad-pro", use: { ...devices["iPad Pro 11"], viewport: { width: 1024, height: 1366 } } },
  ],
  webServer: previewBaseUrl ? undefined : { command: "npm run dev", url: "http://127.0.0.1:3000", reuseExistingServer: !process.env.CI, timeout: 120_000 },
});
