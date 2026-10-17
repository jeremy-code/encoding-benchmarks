import { chromium } from "playwright";

const getChromiumVersion = async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    return browser.version();
  } finally {
    await browser.close();
  }
};

export { getChromiumVersion };
