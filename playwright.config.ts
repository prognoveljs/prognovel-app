// // playwright.config.ts
// import { PlaywrightTestConfig, devices } from "@playwright/test";

// const config: PlaywrightTestConfig = {
//   forbidOnly: !!process.env.CI,
//   retries: process.env.CI ? 2 : 0,
//   use: {
//     trace: "on-first-retry",
//   },
//   projects: [
//     {
//       name: "chromium",
//       use: { ...devices["Desktop Chrome"] },
//     },
//     {
//       name: "firefox",
//       use: { ...devices["Desktop Firefox"] },
//     },
//     {
//       name: "webkit",
//       use: { ...devices["Desktop Safari"] },
//     },
//   ],
// };
// export default config;

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: "npm run build && npm run preview",
    port: 3000,
  },
};

export default config;
