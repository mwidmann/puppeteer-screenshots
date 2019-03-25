const express = require('express');
const cron = require('node-cron');
const puppetteer = require('puppeteer');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const screenshot = async () => {
  console.log(`screenshotting.....`);
  let browser;
  try {
    browser = await puppetteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1920 });

    await page.goto(`https://www.vn.at`, {
      waitUntil: ['load', 'networkidle0'],
      timeout: 15000,
    });

    try {
      // click away the Cookiebot dialog and wait a second until the animation is over
      await page.click('#CybotCookiebotDialogBodyButtonAccept');
      await sleep(1000);
    } catch (e) {}

    await page.screenshot({
      path: `screenshots/vn.at.png`,
    });
  } catch (e) {
    console.error(`Couldn't take a screenshot. Message "${e.message}".`);
  } finally {
    await browser.close();
  }
};

(async () => {
  try {
    cron.schedule('* * * * *', () => {
      screenshot();
    });
    screenshot();

    const app = express();
    const port = 8080;

    app.get('/screenshot.png', (req, res) =>
      res.sendFile(`${__dirname}/screenshots/vn.at.png`)
    );

    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  } catch (e) {
    console.error(`nothing is awesome ${e.message}`);
    process.exit(1);
  }
})();
