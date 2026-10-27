import { chromium } from "playwright";

const getChromiumVersion = async () => {
  await using browser = await chromium.launch({
    headless: true,
  });
  return browser.version();
};

export { getChromiumVersion };
