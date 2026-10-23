const fs=require('fs');
const {chromium}=require('playwright');
(async()=>{
  const b64=fs.readFileSync('temp/shape65.jpg').toString('base64');
  const browser=await chromium.launch();
  const page=await browser.newPage();
  await page.setContent(`<canvas id="c"></canvas><img id="i" src="data:image/jpeg;base64,${b64}">`);
  await page.waitForFunction(()=>{const i=document.getElementById('i');return i.complete&&i.naturalWidth>0;});
  const dataUrl=await page.evaluate(()=>{
    const i=document.getElementById('i');
    const max=1200;
    let w=i.naturalWidth,h=i.naturalHeight;
    if(w>max){h=Math.round(h*max/w);w=max;}
    const c=document.getElementById('c'); c.width=w;c.height=h;
    c.getContext('2d').drawImage(i,0,0,w,h);
    return c.toDataURL('image/webp',0.88);
  });
  await browser.close();
  const buf=Buffer.from(dataUrl.split(',')[1],'base64');
  fs.writeFileSync('img/products/567ac4d00a.webp',buf);
  console.log('written',buf.length, buf.slice(0,4).toString('ascii'), buf.slice(8,12).toString('ascii'));
})();