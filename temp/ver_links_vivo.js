const { execFileSync } = require('child_process');
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

// coger los data-aff reales de la pagina generada (lo que clica el usuario)
const d = fs.readFileSync(B + 'guides/best-monitors-for-small-rooms_es.html', 'utf8');
function affDe(id, store) {
  const m = d.indexOf('openReviewModal(' + id + ')');
  if (m < 0) return null;
  const seg = d.slice(m, m + 25000);
  const rows = [...seg.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>/g)];
  for (const r of rows) {
    if (r[1] !== store) continue;
    const tag = r[0];
    const aff = (tag.match(/data-aff="([^"]+)"/) || [])[1];
    const href = (tag.match(/href="([^"]+)"/) || [])[1];
    return { aff: aff ? aff.replace(/&amp;/g, '&') : null, href: href.replace(/&amp;/g, '&') };
  }
  return null;
}

const MUESTRA = [[684, 'amazon'], [684, 'zzounds'], [684, 'gear4music'], [684, 'andertons'], [684, 'musicstore'], [684, 'reverb'], [19, 'zzounds'], [19, 'musicstore'], [20, 'amazon'], [20, 'gear4music']];
MUESTRA.forEach(([id, store]) => {
  const r = affDe(id, store);
  console.log('\n=== ' + id + ' [' + store + '] ===');
  if (!r) { console.log('  no encontrado en la pagina'); return; }
  const url = r.aff || r.href;
  console.log('  clic: ' + url.slice(0, 110));
  try {
    const out = execFileSync('curl.exe', ['-s', '-L', '--max-time', '50', '-A', UA,
      '-w', '\n__FINAL__%{url_effective}\n__CODE__%{http_code}', url],
      { windowsHide: true, maxBuffer: 1 << 27 }).toString();
    const fin = (out.match(/__FINAL__(.*)/) || [])[1] || '';
    const code = (out.match(/__CODE__(\d+)/) || [])[1] || '';
    const tit = ((out.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '').replace(/\s+/g, ' ').trim().slice(0, 80);
    console.log('  final: ' + code + '  ' + fin.slice(0, 100));
    console.log('  titulo: ' + (tit || '(sin titulo / reto anti-bot)'));
    const home = /^\s*https?:\/\/(www\.)?(zzounds\.com|gear4music\.com|andertons\.co\.uk|musicstore\.com|amazon\.com)\/?(\?.*)?\s*$/.test(fin);
    console.log('  ¿cae en la HOME? ' + (home ? 'SI (MAL)' : 'no (bien)'));
  } catch (e) { console.log('  error curl: ' + e.message.slice(0, 80)); }
});
