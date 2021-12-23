const scraperObject = {
  url: "https://www.youtube.com/",
  async scraper(browser) {
    const data = ["autologinusertest1@gmail.com", "autologin123!"];

    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    await page.waitForSelector("#masthead");
    await page.click(".style-scope.ytd-masthead.style-suggestive.size-small");
    await page.waitForNavigation({ waitUntil: "load" });

    for (loginData of data) {
      await page.type("#identifierId", loginData);
      const button = await page.$(
        'div[data-is-touch-wrapper="true"] > button[type="button"]'
      );
      await button.evaluate((e) => e.click());
      await page.waitForTimeout(2000);
    }

    await page.waitForSelector("#contents");

    try {
      const ads = await page.$eval(
        "#contents .ytd-rich-grid-renderer:first-child #root #badge span.ytd-badge-supported-renderer",
        (text) => text.textContent
      );
      if (ads) {
        await page.click(
          "#contents > .ytd-rich-grid-renderer:not(:first-child)"
        );
      }
    } catch (e) {
      await page.click("#contents > .ytd-rich-grid-renderer:first-child");
    }
    await page.waitForTimeout(3000);

    const likeButton = await page.$("#menu-container a:first-child");
    await likeButton.evaluate((e) => e.click());
  },
};
module.exports = scraperObject;
