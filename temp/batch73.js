const fs = require('fs');

// ---------- helpers ----------
function blockEnd(src, open) {
  let d = 0, q = null;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === '\\') i++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) return i; }
  }
  throw new Error('llaves sin cerrar desde ' + open);
}

// estilo multi-linea del proyecto (2/4/6 espacios, comillas dobles)
function ser(id, cfg) {
  const sections = [];
  if (cfg.prices) {
    const ks = Object.keys(cfg.prices);
    const L = ['    prices: {'];
    ks.forEach((k, n) => L.push('      ' + k + ': "' + cfg.prices[k] + '"' + (n === ks.length - 1 ? '' : ',')));
    L.push('    }');
    sections.push(L);
  }
  if (cfg.urls) {
    const ks = Object.keys(cfg.urls);
    const L = ['    urls: {'];
    ks.forEach((k, n) => L.push('      ' + k + ': "' + cfg.urls[k] + '"' + (n === ks.length - 1 ? '' : ',')));
    L.push('    }');
    sections.push(L);
  }
  if (cfg.oos) sections.push(['    oos: [' + cfg.oos.map(s => '"' + s + '"').join(', ') + ']']);

  const body = sections.map(s => s.join('\n')).join(',\n');
  return '  ' + id + ': {\n' + body + '\n  }';
}

const A = (u) => 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' + encodeURIComponent(u);
const g4m370 = A('https://www.gear4music.com/Keyboards-and-Pianos/Roland-GOKEYS-3-Music-Creation-Keyboard-Midnight-Blue/6AB8');

const CH = {
  14: { prices: { amazon: '$839.95', zzounds: '$849.00', gear4music: '£699.00', musicstore: '€849.00' }, oos: ['andertons'] },
  143: { prices: { amazon: '$1,899.00', zzounds: '$1,899.00', andertons: '£1,469.00', gear4music: '£1,594.00', musicstore: '€1,679.00' } },
  370: { prices: { amazon: '$384.99', zzounds: '$384.99', andertons: '£319.00', gear4music: '£315.00', musicstore: '€349.00' }, urls: { gear4music: g4m370, zzounds: 'https://www.zzounds.com/item--ROLGOKEYS3' } },
  475: { prices: { amazon: '$349.00', zzounds: '$349.00', andertons: '£264.00', musicstore: '€319.00' }, oos: ['gear4music'] },
  476: { prices: { amazon: '$929.00', andertons: '£449.00', musicstore: '€699.00' }, oos: ['gear4music', 'zzounds'] },
  477: { prices: { amazon: '$1,399.00', zzounds: '$1,399.00', gear4music: '£1,099.00', andertons: '£1,058.00', musicstore: '€1,299.00' } },
  478: { prices: { amazon: '$1,399.99', zzounds: '$1,499.00', gear4music: '£1,510.00', andertons: '£1,399.00', musicstore: '€1,459.00' } },
};

const f = 'build-guides.js';
let b = fs.readFileSync(f, 'utf8');

for (const [id, cfg] of Object.entries(CH)) {
  const head = '\n  ' + id + ': {';
  const at = b.indexOf(head);
  if (at < 0) { console.log('  !! id ' + id + ' NO encontrado'); continue; }
  const open = at + 1 + ('  ' + id + ': ').length;
  const close = blockEnd(b, open);
  b = b.slice(0, at + 1) + ser(id, cfg) + b.slice(close + 1);
  console.log('id ' + id + ' OK -> ' + Object.keys(cfg.prices || {}).map(k => k + '=' + cfg.prices[k]).join(' ') + (cfg.oos ? ' | oos=' + cfg.oos.join('+') : ''));
}

fs.writeFileSync(f, b, 'utf8');
console.log('build-guides.js escrito');
