# puppeteer-screenshots

Due to the suckyness of the kiosk software in use in-house which renders pages in IE11, a quick solution was required.
Thanks to Konrad Cerny's work on the web scraper using puppeteer this small express server has been created.

It takes a screenshot of https://www.vn.at every minute and makes it available through the URL http://localhost:8080/screenshot.png

The cookieconsent overlay is visible in the first screen until the cookie is stored to the chrome engine. Goes away a minute after.
