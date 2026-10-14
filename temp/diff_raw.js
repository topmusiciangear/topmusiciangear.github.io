const { execSync } = require('child_process');
const d = execSync('git diff -- guides/ableton-vs-fl-studio.html', { cwd: 'C:/Users/Daniel/projects/topmusiciangear', encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
const lines = d.split('\n').filter(l => (l.startsWith('+') || l.startsWith('-')) && !l.startsWith('+++') && !l.startsWith('---'));
// Emparejar - con + por bloques y mostrar primera diferencia de caracteres
for (let i = 0; i < lines.length; i += 2) {
  const a = lines[i].slice(1), b = (lines[i + 1] || '').slice(1);
  let j = 0;
  while (j < Math.min(a.length, b.length) && a[j] === b[j]) j++;
  console.log('--- par ' + (i / 2) + ' (prefijo comun ' + j + ' chars) ---');
  console.log('A: ...' + a.slice(Math.max(0, j - 40), j + 80));
  console.log('B: ...' + b.slice(Math.max(0, j - 40), j + 80));
}