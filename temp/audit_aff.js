const fs = require('fs');
const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-reverb-delay.html', 'utf8');
const t2 = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-looper-pedals.html', 'utf8');
const t3 = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-multi-effects-pedals.html', 'utf8');
const t4 = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-overdrive-distortion.html', 'utf8');
function aff(url) {
  if (!url || url === '#') return 'NO-LINK';
  if (url.includes('awin1.com/cread.php')) return 'awin-OK';
  if (url.includes('pxf.io')) return 'pxf-OK';
  if (url.includes('anrdoezrs.net')) return 'cj-OK';
  if (url.includes('tag=topmusicg-20')) return 'amz-OK';
  return 'BARE?!';
}
function audit(html, ids) {
  // split by product cards via data-store rows: find each shop button block
  ids.forEach(id => {
    const marker = 'data-pid="' + id + '"';
    let i = html.indexOf(marker);
    if (i < 0) { console.log(id + ': CARD NOT FOUND'); return; }
    const seg = html.slice(i, i + 9000);
    const re = /data-store="([a-z]+)"[^>]*href="([^"]+)"/g;
    let m; const rows = [];
    while ((m = re.exec(seg)) && rows.length < 7) rows.push(m[1] + '=' + aff(m[2]));
    console.log(id + ': ' + rows.join(' | '));
  });
}
console.log('--- reverb-delay (591-599, skip Habit) ---');
audit(t, [591, 592, 593, 594, 595, 596, 597, 598, 599]);
console.log('--- looper (586-588,590,600,601) ---');
audit(t2, [586, 587, 588, 590, 600, 601]);
console.log('--- multiefx (577-580,574-576 n/a) ---');
audit(t3, [577, 578, 579, 580]);
console.log('--- overdrive (581-585) ---');
audit(t4, [581, 582, 583, 584, 585]);
