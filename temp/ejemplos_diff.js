// extrae ejemplos reales antes/después del diff de guides.json en cada commit
const cp = require('child_process');
const commits = ['c79e1b9054', 'dec5f42775', '647971bb35'];
commits.forEach(function (c) {
  console.log('========== ' + c + ' ==========');
  let diff = '';
  try {
    diff = cp.execSync('git show ' + c + ' -- data/guides.json', { cwd: 'C:/Users/Daniel/projects/topmusiciangear', maxBuffer: 300 * 1024 * 1024 }).toString('utf8');
  } catch (e) { console.log('(no diff data/guides.json)'); return; }
  // parejas -/+ consecutivas
  const lines = diff.split('\n');
  let minus = null, shown = 0;
  const pairs = [];
  lines.forEach(function (l) {
    if (l.startsWith('-') && !l.startsWith('---')) {
      if (minus === null) minus = l.slice(1).trim();
      else minus = null; // nunca acumular: solo parejas limpias
    } else if (l.startsWith('+') && !l.startsWith('+++')) {
      if (minus !== null) { pairs.push([minus, l.slice(1).trim()]); minus = null; }
    } else if (l.trim() !== '' && !l.startsWith('@@')) {
      minus = null;
    }
  });
  pairs.forEach(function (p) {
    if (shown >= 14) return;
    const a = p[0].replace(/^"|"$/g, '').replace(/",?$/, '');
    const b = p[1].replace(/^"|"$/g, '').replace(/",?$/, '');
    if (a.length > 4 && b.length > 4 && a !== b) {
      console.log('  ANTES: ' + a.slice(0, 150));
      console.log('  AHORA: ' + b.slice(0, 150));
      console.log('');
      shown++;
    }
  });
  if (!shown) console.log('  (sin parejas limpias en guides.json)');
});
