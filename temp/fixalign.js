const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
// 1. starter-studio: drop 3 trailing pseudo-columns
let g = G.find(x => x.id === 'starter-studio');
g.productTable.columns = g.productTable.columns.filter(c => !/^(Price|Connectivity|Key Specs)$/.test(c.title));
// 2. best-samplers: drop values[3] (Digitakt mkI ghost) from every row
g = G.find(x => x.id === 'best-samplers-drum-computers');
g.productTable.rows.forEach(r => { r.values.splice(3, 1); });
// 3. best-grooveboxes Type: fill 4 missing (cols 5-8: Model:Samples, Circuit Rhythm, Polyend Play, OP-Z)
g = G.find(x => x.id === 'best-grooveboxes');
const grooveTypes = [
  { value: '6-track sample-based groovebox', value_es: 'Groovebox de samples de 6 pistas' },
  { value: 'Sample-based groovebox with synth engines', value_es: 'Groovebox de samples con motores de sinte' },
  { value: 'Sample and MIDI groovebox workstation', value_es: 'Groovebox workstation de samples y MIDI' },
  { value: 'Portable multimedia synthesizer sequencer', value_es: 'Secuenciador sintetizador multimedia portátil' }
];
g.productTable.rows.find(r => r.label === 'Type').values.push(...grooveTypes);
// 4. best-digital-pianos Type: fill 5 missing (cols 4-8: FP-90X, ES120, MP11SE, CP88, Grand 2)
g = G.find(x => x.id === 'best-digital-pianos');
const pianoTypes = [
  { value: 'Digital piano', value_es: 'Piano digital' },
  { value: 'Digital piano', value_es: 'Piano digital' },
  { value: 'Stage piano', value_es: 'Piano de escenario' },
  { value: 'Stage piano', value_es: 'Piano de escenario' },
  { value: 'Stage grand piano', value_es: 'Gran piano de escenario' }
];
g.productTable.rows.find(r => r.label === 'Type').values.push(...pianoTypes);
fs.writeFileSync(F, JSON.stringify(G, null, 2));
console.log('done');