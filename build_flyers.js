const puppeteer = require('puppeteer');
const path = require('path');

async function buildFlyer(htmlFile, pdfFile) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const url = 'file:///' + path.resolve(__dirname, htmlFile).replace(/\\/g, '/');
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
  await page.pdf({
    path: pdfFile,
    width: '8.5in',
    height: '11in',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  await browser.close();
  console.log('Built: ' + pdfFile);
}

(async () => {
  await buildFlyer('flyer_lot115.html', 'Eastland_Yards_Lot115_Agent_Flyer_NEW.pdf');
  await buildFlyer('flyer_lot116.html', 'Eastland_Yards_Lot116_Agent_Flyer_NEW.pdf');
  console.log('Done.');
})();
