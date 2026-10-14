const { execSync } = require('child_process');
const d = execSync('git diff -- guides/ableton-vs-fl-studio.html', { cwd: 'C:/Users/Daniel/projects/topmusiciangear', encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
const norm = (s) => s.replace(/glg\d+/g, 'GLG').replace(/glc\d+/g, 'GLC').replace(/flgc\d+/g, 'FLGC');
const lines = d.split('\n').filter(l => (l.startsWith('+') || l.startsWith('-')) && !l.startsWith('+++') && !l.startsWith('---'));
// Agrupar por bloques y mostrar resumen (primeros 200 chars)
let cur = [];
lines.forEach(l => {
  const txt = norm(l.slice(1));
  // extraer texto visible (sin tags) para comparar rapido
  const vis = txt.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160);
  console.log(l[0] + ' :: ' + vis.slice(0, 160));
});