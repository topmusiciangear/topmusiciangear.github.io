const fs = require('fs');
const p = 'data/guides.json';
const g = JSON.parse(fs.readFileSync(p, 'utf8'));
const x = g.find(v => v.id === 'budget-mics');
if (!x) throw new Error('budget-mics not found');

function rep(obj, key, from, to) {
  const s = obj[key];
  if (typeof s !== 'string' || !s.includes(from)) throw new Error(`NOT FOUND in ${key}: ${from}`);
  obj[key] = s.split(from).join(to);
}

rep(x, 'verdict', 'AKG P120 Large-Diaphragm Condenser Microphone', 'AKG P120 Medium-Diaphragm Condenser Microphone');
rep(x, 'verdict', 'Affordable large-diaphragm condenser', 'Affordable medium-diaphragm condenser');
rep(x, 'verdict_es', 'Condensador de gran diafragma asequible', 'Condensador de diafragma mediano asequible');
rep(x, 'verdict_es', 'y pad de -20 dB', 'y atenuador (pad) de -20 dB');

const col = x.productTable.columns[3];
if (col.title !== 'AKG P120 Large-Diaphragm') throw new Error('unexpected column title');
col.title = 'AKG P120 Medium-Diaphragm';
col.title_es = 'AKG P120 Diafragma Mediano';

const vpc = x.verdictProsCons[3];
if (vpc.name !== 'AKG P120 Large-Diaphragm') throw new Error('unexpected vpc name');
vpc.name = 'AKG P120 Medium-Diaphragm';
vpc.name_es = 'AKG P120 Diafragma Mediano';

fs.writeFileSync(p, JSON.stringify(g, null, 2));
console.log('OK: budget-mics references updated');
