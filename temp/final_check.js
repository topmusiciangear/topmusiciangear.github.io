const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/guides/';
function filas(guia, id) {
  const d = fs.readFileSync(BASE + guia, 'utf8');
  const i = d.indexOf('openReviewModal(' + id + ')');
  const card = d.slice(i, i + 20000);
  const stores = card.slice(card.indexOf('guide-product-card-stores'));
  const partes = stores.split(/(?=<a |<div class="shop-na"|<div class="shop-more)/);
  return partes.filter(p => /data-store="([a-z]+)"/.test(p)).map(p => {
    const st = p.match(/data-store="([a-z]+)"/)[1];
    const dp = (p.match(/data-price='([^']*)'/) || [])[1] || '';
    const href = (p.match(/href="([^"]*)"/) || [])[1] || '';
    const naBg = p.indexOf('#262626') > -1;
    const txt = p.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return { st, dp, clicable: !!href, naBg, cola: txt.slice(-40) };
  });
}
console.log('=== Montage M8x (639) ===');
filas('best-synthesizers.html', 639).forEach(f =>
  console.log('  ' + f.st.padEnd(11) + ' precio ' + (f.dp || '-').padEnd(9) + ' clicable: ' + (f.clicable ? 'si' : 'NO ') + ' | grisNA: ' + (f.naBg ? 'si' : 'no') + ' | "' + f.cola + '"'));
console.log('\n=== Bronco (536) ===');
filas('beginner-bass-guitars.html', 536).forEach(f =>
  console.log('  ' + f.st.padEnd(11) + ' precio ' + (f.dp || '-').padEnd(9) + ' clicable: ' + (f.clicable ? 'si' : 'NO ') + ' | grisNA: ' + (f.naBg ? 'si' : 'no') + ' | "' + f.cola + '"'));