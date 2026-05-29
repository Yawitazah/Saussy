const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
(async () => {
  const svg = fs.readFileSync(path.resolve(__dirname,'logo-white.svg'),'utf8');
  const b64 = Buffer.from(svg).toString('base64');
  const browser = await puppeteer.launch({ args:['--no-sandbox'] });
  const page = await browser.newPage();
  // 4x scale: 267*4 x 41*4 = 1068 x 164
  await page.setViewport({ width:1068, height:164, deviceScaleFactor:1 });
  const html = `<!DOCTYPE html><html><head><style>*{margin:0;padding:0}html,body{width:1068px;height:164px;background:transparent}img{width:1068px;height:164px;display:block}</style></head><body><img src="data:image/svg+xml;base64,${b64}"></body></html>`;
  await page.setContent(html,{waitUntil:'networkidle0'});
  await page.screenshot({ path:'logo-white.png', type:'png', omitBackground:true, clip:{x:0,y:0,width:1068,height:164} });
  await browser.close();
  console.log('Built logo-white.png (1068x164, transparent)');
})();
