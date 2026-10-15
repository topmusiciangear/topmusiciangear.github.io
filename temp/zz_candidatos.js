// Probar candidatos de URL para los 4 productos con 404
const { execFile } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const HOME = 'zZounds.com | Musical Instruments Music Store. Shop for Guitars, Drums, Amplifiers and Equipment.';

function test(url) {
  return new Promise(res => {
    execFile('curl.exe', ['-sL', '--max-time', '40', '-A', UA, url], { maxBuffer: 3e7, windowsHide: true }, (e, out) => {
      const h = out || '';
      const t = ((h.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').replace(/\s+/g, ' ').trim();
      let e2 = 'REVISAR';
      if (!h) e2 = 'ERROR';
      else if (t === HOME) e2 = 'CAE-EN-PORTADA';
      else if (/This page does not exist/i.test(t)) e2 = '404';
      else if (/No longer available at zZounds/i.test(h)) e2 = 'DESLISTADO';
      else if (/Add to Cart/i.test(h)) e2 = 'OK';
      res({ estado: e2, title: t.slice(0, 80) });
    });
  });
}

const GRUPOS = {
  '138 Behringer X32 Compact': [
    'https://www.zzounds.com/productreview--BEHX32COMPACT',
    'https://www.zzounds.com/item--BEHX32COMPACT',
    'https://www.zzounds.com/a--925521/item--BEHX32COMPACT',
    'https://www.zzounds.com/prodsearch?form=search&q=Behringer+X32+Compact'
  ],
  '145 Behringer X Air XR18': [
    'https://www.zzounds.com/productreview--BEHXR18',
    'https://www.zzounds.com/item--BEHXR18',
    'https://www.zzounds.com/a--925521/item--BEHXR18',
    'https://www.zzounds.com/prodsearch?form=search&q=Behringer+XR18'
  ],
  '372 Genelec 8030C': [
    'https://www.zzounds.com/item--GEN8030CP',
    'https://www.zzounds.com/item--GEN8030C',
    'https://www.zzounds.com/prodsearch?form=search&q=Genelec+8030C'
  ],
  '670 sE Electronics NEOM USB': [
    'https://www.zzounds.com/item--SENEOMUSB',
    'https://www.zzounds.com/item--SENEOM',
    'https://www.zzounds.com/prodsearch?form=search&q=sE+Electronics+NEOM+USB',
    'https://www.zzounds.com/prodsearch?form=search&q=sE+Electronics+Neom'
  ]
};

(async () => {
  for (const [nombre, urls] of Object.entries(GRUPOS)) {
    console.log('\n=== ' + nombre + ' ===');
    for (const u of urls) {
      const r = await test(u);
      console.log('  ' + r.estado.padEnd(16) + u.replace('https://www.zzounds.com', ''));
      console.log('  ' + ' '.repeat(16) + '-> ' + r.title);
    }
  }
})();
