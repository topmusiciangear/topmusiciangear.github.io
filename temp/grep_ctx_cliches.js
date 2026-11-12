// grep_ctx_cliches.js — contexto de agujas EN cuyo par ES está marcado
const fs = require('fs');
const raw = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json', 'utf8');

const NEEDLES = [
  'Unmask',
  'hard to beat',
  'Old School Filter',
  'Dynamic mics',
  'industry standards',
  'Live vocal workhorse',
  'Guitarra todoterreno para empezar',
  'Guitarra versátil para empezar',
  'Studios keep a',
  'production workhorse',
  'The RCF is a beast',
  'Secret weapon:',
  'Arma secreta:',
  'definitive all-rounder',
  'session players, and',
  'game-changer',
  'flagship reference',
  'Estándares de la industria',
  'Micr\\u00f3fonos din\\u00e1micos',
];

NEEDLES.forEach(n => {
  let i = -1, count = 0;
  while ((i = raw.indexOf(n, i + 1)) >= 0) {
    count++;
    if (count <= 3) {
      console.log('=== [' + n + '] @' + i + ' ===');
      console.log(raw.slice(Math.max(0, i - 260), i + n.length + 260).replace(/\\n/g, ' '));
      console.log('');
    }
  }
  if (count > 3) console.log('   (' + n + ': ' + count + ' ocurrencias, mostradas 3)\n');
  if (count === 0) console.log('=== [' + n + '] SIN OCURRENCIAS ===\n');
});
