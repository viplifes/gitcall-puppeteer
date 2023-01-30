
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
    var page = await browser.newPage();
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');
    // Extract the results from the page.
    const links = await page.evaluate(resultsSelector => {
      const anchors = Array.from(document.querySelectorAll(resultsSelector));
      return anchors.map(anchor => {
        const title = anchor.textContent.split('|')[0].trim();
        return `${title} - ${anchor.href}`;
      });
    }, 'a');

       data.links = links;
       resolve(data);

}