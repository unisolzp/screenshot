const puppeteer = require('puppeteer');

let browser;
let page;

/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.screenshot = async (req, res) => {
    const url = req.query.url;
    if (!url) {
      return res.send('Please provide URL as GET parameter, for example: <a href="?url=https://example.com">?url=https://example.com</a>');
    }
  
    if(!browser) {
        browser = await puppeteer.launch({
            args: ['--no-sandbox']
        });
    }
    if(!page) {
        page = await browser.newPage();
    }

     await page.goto(url, {waitUntil: 'domcontentloaded'});
   const html = await page.content(); // serialized HTML of page DOM.
  res.set('Content-Type', 'html/text');
  res.send(html);
  };
  
