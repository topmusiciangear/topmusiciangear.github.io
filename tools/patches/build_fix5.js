const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const edits = {
  'studio-furniture': {
    'K&M 210/2 Mic Stand': {
      cons: { 3: 'The zinc die-cast base is heavy — stable on stage, but awkward to backpack between sessions' },
      cons_es: { 3: 'La base de zinc fundido es pesada — estable en el escenario, pero incómoda de llevar en mochila entre sesiones' }
    }
  },
  'fender-guide': {
    'Fender Player II Jazzmaster': {
      pros: { 3: 'Rhythm circuit gives dark, mellow tones that suit jazz chord melodies' },
      pros_es: { 3: 'El circuito rhythm da tonos oscuros y suaves que encajan con melodías de acordes de jazz' }
    }
  },
  'guitar-bass-amps': {
    'Ampeg BA-210v2': {
      pros: { 1: '450W of built-in power through two Custom10 speakers and a 1" tweeter' },
      pros_es: { 1: '450W de potencia integrada a través de dos altavoces Custom10 y un tweeter de 1"' }
    }
  },
  'best-headphones-for-mixing': {
    'Sony MDR-7506': {
      cons: { 1: 'Fixed 3 m non-detachable cable that requires soldering to replace' },
      cons_es: { 1: 'Cable fijo de 3 m no desmontable que requiere soldadura para reemplazarlo' }
    }
  },
  'ts9-vs-bd2': {
    'Ibanez TS9 Tube Screamer': {
      cons: { 1: 'Can sound thin into a clean transistor amp where there is no tube low end to push against' },
      cons_es: { 1: 'Puede sonar delgado en un amp limpio de transistores donde no hay grave de válvulas que empujar' }
    }
  }
};

const patch = { guides: {} };
for (const [id, prodEdits] of Object.entries(edits)) {
  const x = g.find(a => a.id === id);
  const vpc = x.verdictProsCons.map(p => {
    const e = prodEdits[p.name];
    if (!e) return p;
    const np = JSON.parse(JSON.stringify(p));
    for (const [field, idxMap] of Object.entries(e)) {
      for (const [idx, txt] of Object.entries(idxMap)) { np[field][Number(idx)] = txt; }
    }
    return np;
  });
  patch.guides[id] = { verdictProsCons: vpc };
}
fs.writeFileSync('tools/patches/patch_fix5.json', JSON.stringify(patch, null, 2));
console.log('written', fs.statSync('tools/patches/patch_fix5.json').size, 'bytes');
