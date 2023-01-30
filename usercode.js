
const puppeteer = require('puppeteer');


module.exports = (data) => {
  return new Promise((resolve) => {
       run(data, resolve);
  });
};

 var browser;

async function run(data, resolve) {

    if(!browser){
       browser = await puppeteer.launch({headless: true});
    }

     // const browser = await puppeteer.launch({headless: true});
      const page = await browser.newPage();

      await page.goto('https://developers.google.com/web/');

      // Type into search box.
      await page.type('.devsite-search-field', 'Headless Chrome');

      // Wait for suggest overlay to appear and click "show all results".
      const allResultsSelector = '.devsite-suggest-all-results';
      await page.waitForSelector(allResultsSelector);
      await page.click(allResultsSelector);

      // Wait for the results page to load and display the results.
      const resultsSelector = '.gsc-results .gs-title';
      await page.waitForSelector(resultsSelector);


      // Extract the results from the page.
      const links = await page.evaluate(resultsSelector => {
        const anchors = Array.from(document.querySelectorAll(resultsSelector));
        return anchors.map(anchor => {
          const title = anchor.textContent.split('|')[0].trim();
          return `${title} - ${anchor.href}`;
        });
      }, resultsSelector);

       data.links = links;
       resolve(data);

      await browser.close();
}