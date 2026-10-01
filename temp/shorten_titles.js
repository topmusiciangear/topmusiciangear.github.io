const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const S = {
  'best-keyboard': ['Best Keyboards: Piano, Synth & MIDI Controllers', 'Mejores teclados: piano, synth y MIDI'],
  'best-microphone': [null, 'Mejor micrófono para voces y home studio'],
  'budget-headphones': [null, 'Auriculares de estudio económicos'],
  'midi-keyboards': [null, 'Mejores teclados y controladores MIDI'],
  'sm57-vs-md421': [null, 'SM57 vs MD 421: micro para amplis y batería'],
  'best-beginner-electric-guitar': [null, 'Mejores guitarras eléctricas para principiantes'],
  'mics-for-creators': [null, 'Mejores micros económicos para creadores'],
  'budget-usb-mics': [null, '13 micros USB económicos por menos de $100'],
  'best-acoustic-guitars-for-beginners': [null, 'Mejores guitarras acústicas para principiantes'],
  'studio-subwoofers-setup': [null, 'Cómo calibrar un subwoofer de estudio'],
  'slg200s-vs-gs-mini': [null, 'SLG200S vs GS Mini: guitarra silenciosa home office']
};
Object.entries(S).forEach(([id, [en, es]]) => {
  const g = G.find(x => x.id === id);
  if (en) g.titleTag = en;
  if (es) g.titleTag_es = es;
});
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('ok');
