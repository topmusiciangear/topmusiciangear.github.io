const fs = require('fs');
const p = process.argv[2];
const s = fs.readFileSync(p, 'utf8');
const pats = [
  /corePriceDisplayDesktopBuybox[\s\S]{0,300}?class="a-offscreen">([^<]+)/,
  /aok-offscreen">\$([0-9,]+\.\d{2})/g,
  /"priceAmount"[^,]{0,30}/g,
  />(\$[0-9,]+\.\d{2})</g,
  /twisterPlusPriceTextMessage[^<]*<[^<]*<[^>]*>([^<]+)/,
  /"priceToPay"[^,]{0,60}/
];
for (let i = 0; i < pats.length; i++) {
  const re = pats[i];
  let out = [];
  if (re.global) {
    s.replace(re, (mm, g1) => { out.push(g1); return mm; });
  } else {
    const m = s.match(re);
    out = m ? [m[1] || m[0]] : [];
  }
  console.log('PAT', i, '->', out.slice(0, 8).join(' | '));
}