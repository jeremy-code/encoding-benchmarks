import { chromium } from "playwright";

const getChromiumVersion = async () => {
  await using browser = await chromium.launch({
    channel: "chromium",
    headless: true,
  });
  return browser.version();
};

export { getChromiumVersion };
