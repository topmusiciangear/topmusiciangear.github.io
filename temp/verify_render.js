const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const clean = h => String(h).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

// --- Montage: fila de Music Store ---
console.log('=== Yamaha Montage M8x (id 639) ===');
['best-synthesizers','best-stage-keyboards'].forEach(g => {
  const d = fs.readFileSync(BASE + 'guides/' + g + '.html', 'utf8');
  const i = d.indexOf('openReviewModal(639)');
  if (i < 0) { console.log(g + ': no aparece'); return; }
  const card = d.slice(i, i + 7000);
  const filas = [...card.matchAll(/<a data-store="([^"]+)"[\s\S]{0,900}?<\/a>|<div class="shop-na"[^>]*>([\s\S]{0,200}?)<\/div>/g)];
  const ms = card.match(/data-store="musicstore"[\s\S]{0,600}/);
  const naTxt = card.match(/No disponible|Not Available/i);
  console.log('\n' + g + ':');
  console.log('  tiene fila musicstore: ' + (ms ? 'si' : 'no'));
  console.log('  aparece "No disponible": ' + (naTxt ? 'SI' : 'no'));
  if (ms) console.log('  fila: ' + clean(ms[0]).slice(0, 160));
});

// --- Bronco: precios y enlace ---
console.log('\n\n=== Squier Sonic Bronco Bass (id 536) ===');
['beginner-bass-guitars','best-bass-home-office'].forEach(g => {
  const d = fs.readFileSync(BASE + 'guides/' + g + '.html', 'utf8');
  const i = d.indexOf('openReviewModal(536)');
  if (i < 0) { console.log(g + ': no aparece'); return; }
  const card = d.slice(i, i + 7000);
  console.log('\n' + g + ':');
  const img = card.match(/<img src="([^"]+)"/);
  console.log('  foto: ' + (img ? img[1] : '?'));
  ['gear4music','musicstore','andertons','zzounds'].forEach(k => {
    const m = card.match(new RegExp('data-store="' + k + '"[^>]*href="([^"]*)"'));
    const p = card.match(new RegExp('data-store="' + k + '"[\\s\\S]{0,1400}?(- [£$€][0-9,.]+)'));
    console.log('  ' + k.padEnd(11) + ': ' + (m ? m[1].slice(0, 92) : 'sin fila') + (p ? '   ' + p[1] : ''));
  });
});