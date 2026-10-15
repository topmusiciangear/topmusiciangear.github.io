const { execFileSync } = require('child_process');
const old = execFileSync('git', ['show', 'HEAD:guides/starter-studio_es.html'], { windowsHide: true, maxBuffer: 1 << 28 }).toString();
console.log('HEAD data-aff: ' + (old.match(/data-aff=/g) || []).length);
const i = old.indexOf('openReviewModal(684)');
if (i > -1) {
  const seg = old.slice(i, i + 25000);
  const rows = [...seg.matchAll(/<a [^>]*data-store="([^"]+)"[^>]*>/g)].slice(0, 7);
  rows.forEach(r => console.log('[' + r[1] + '] ' + r[0].slice(0, 200)));
} else console.log('sin 684 en HEAD');
