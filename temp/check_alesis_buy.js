const fs = require('fs');
function inspect(f) {
  const h = fs.readFileSync(f, 'utf8');
  console.log('=== ' + f + ' ===');
  // section buy block
  const i = h.indexOf('id="sec-9"');
  const seg = h.slice(i, i + 6000);
  const buy = seg.slice(seg.indexOf('guide-section-buy'), seg.indexOf('guide-section-buy') + 2500);
  const prices = buy.match(/(\$|£|€)\s?[\d,.]+/g) || [];
  const rows = (buy.match(/data-store="([a-z0-9]+)"/g) || []);
  console.log('BUY row stores:', rows.join(', '));
  console.log('BUY prices:', prices.join(' | '));
  console.log('has "Compare 5 more stores":', /Comparar 5 tiendas|Compare 5/.test(buy));
  // table
  const t = h.slice(h.indexOf('guide-comp-title'));
  const tbl = t.slice(0, 60000);
  console.log('table has "Not published"/"No publicada":', /Not published|No publicada/.test(tbl));
  console.log('table has 68 Hz:', /68 Hz/.test(tbl));
  console.log('table undefined cells:', (tbl.match(/>undefined</g) || []).length);
  // verdict grid
  console.log('verdict grid has Alesis:', /verdict-product-name">Alesis ELEVATE 4/.test(h));
  console.log('pros mention subwoofer output:', /subwoofer output|salida de subwoofer/i.test(h));
  console.log('');
}
inspect('guides/best-home-studio-speakers_es.html');
inspect('guides/best-home-studio-speakers.html');
