import { defineConfig, devices } from '@playwright/test';
const portal = process.env.PLAYWRIGHT_PORTAL === '1';
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: portal ? '**/{hxh,kimetsu}.spec.ts' : '**/*.spec.ts',
  fullyParallel: true,
  workers: 2,
  reporter: [['list']],
  use: {
    baseURL: portal ? 'http://127.0.0.1:4173' : 'http://127.0.0.1:3107',
    trace: 'retain-on-failure',
    timezoneId: 'Asia/Tokyo',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'mobile',
      use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' },
    },
  ],
  webServer: {
    command: portal ? 'node scripts/preview.mjs' : 'npm run dev -- --port 3107',
    url: portal ? 'http://127.0.0.1:4173' : 'http://127.0.0.1:3107',
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
