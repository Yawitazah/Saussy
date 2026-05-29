const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 500, deviceScaleFactor: 1 });

  const fs = require('fs');
  const imgBytes = fs.readFileSync(path.resolve(__dirname, 'lot115_hero.jpg'));
  const imgPath = 'data:image/jpeg;base64,' + imgBytes.toString('base64');

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { width:1200px; height:500px; overflow:hidden; font-family:Arial,sans-serif; }
    .wrap { position:relative; width:1200px; height:500px; }
    .photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; }
    .overlay { position:absolute; inset:0; background:linear-gradient(to right, rgba(23,23,150,0.93) 0%, rgba(23,23,150,0.93) 42%, rgba(23,23,150,0.45) 62%, rgba(23,23,150,0) 100%); }
    .content {
      position:absolute; inset:0;
      display:flex; flex-direction:column; justify-content:center;
      padding:0 64px; color:#fff;
    }
    .eyebrow {
      font-size:12px; letter-spacing:3px; text-transform:uppercase;
      color:rgba(200,200,240,0.9); margin-bottom:16px;
    }
    .headline { font-size:48px; font-weight:900; line-height:1.1; }
    .pct { font-size:72px; font-weight:900; display:inline; }
    .sub { font-size:17px; margin-top:14px; color:rgba(220,220,255,0.85); letter-spacing:1px; }
  </style></head><body>
  <div class="wrap">
    <img class="photo" src="${imgPath}">
    <div class="overlay"></div>
    <div class="content">
      <div class="eyebrow">An Exclusive Agent Opportunity</div>
      <div class="headline">Earn a <span class="pct">4%</span><br>Buyer Agency Commission</div>
      <div class="sub">Eastland Yards &nbsp;&bull;&nbsp; Charlotte, NC &nbsp;&bull;&nbsp; Two Move-In Ready Homes</div>
    </div>
  </div>
  </body></html>`;

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'email_hero.png', type: 'png', clip: { x:0, y:0, width:1200, height:400 } });
  await browser.close();
  console.log('Built: email_hero.png');
})();
