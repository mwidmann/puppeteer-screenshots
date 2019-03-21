const express = require('express');
const cron = require('node-cron');
const puppetteer = require('puppeteer');

let browser;
const screenshot = async () => {
  console.log(`screenshotting.....`);
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1920 });

    await page.goto(`https://www.vn.at`, {
      waitUntil: ['load', 'networkidle0'],
      timeout: 15000,
    });

    try {
      // first time the cookie notice shows up... click it away
      await page.click('#CybotCookiebotDialogBodyButtonAccept');
    } catch (e) {}

    await page.screenshot({
      path: `screenshots/vn.at.png`,
    });
  } catch (e) {
    console.error(`Couldn't take a screenshot. Message "${e.message}".`);
  }
};

(async () => {
  try {
    browser = await puppetteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

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
