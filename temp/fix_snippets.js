const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const byId = {};
G.forEach(g => { byId[g.id] = g; });
const SET = (id, tt, ttes, d, des) => {
  const g = byId[id];
  if (tt) g.titleTag = tt;
  if (ttes) g.titleTag_es = ttes;
  if (d) g.description = d;
  if (des) g.description_es = des;
};
SET('best-guitar-home-office',
  '9 Quiet Guitars for Remote Workers Compared',
  '9 guitarras silenciosas para teletrabajar comparadas',
  '9 quiet guitars for working from home compared: Donner HUSH-I EVO2 wins silent practice at $219.99. Specs, prices and verdict.',
  '9 guitarras silenciosas para home office comparadas: la HUSH-I EVO2 gana por $219.99. Specs, precios y veredicto.');
SET('studio-subwoofers',
  null, null,
  '5 studio subwoofers tested for accurate low end from $479: KRK S10.4 vs Yamaha HS8S vs Adam T10S. Specs and verdict.',
  '5 subwoofers probados para graves precisos desde $479: KRK S10.4 vs HS8S vs T10S. Specs y veredicto.');
SET('apollo-vs-babyface',
  'UAD Apollo Twin X vs RME Babyface Pro FS Compared',
  'UAD Apollo Twin X vs RME Babyface Pro FS comparadas',
  'UAD Apollo Twin X vs RME Babyface Pro FS tested side by side: plugins, drivers, latency. Read the verdict.',
  'UAD Apollo Twin X vs RME Babyface Pro FS probadas lado a lado: plugins, drivers, latencia. Lee el veredicto.');
SET('scarlett-vs-motu',
  null, null,
  'Same $199 price, different interface: Scarlett 2i2 vs MOTU M2 tested — DAC, MIDI, meters, Air mode. See who wins.',
  'Mismo precio $199, distinta interfaz: Scarlett 2i2 vs MOTU M2 probadas — DAC, MIDI, Air. Mira quién gana.');
fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
const G2 = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
['best-guitar-home-office', 'studio-subwoofers', 'apollo-vs-babyface', 'scarlett-vs-motu'].forEach(id => {
  const g = G2.find(x => x.id === id);
  console.log(id + ': TT=' + (g.titleTag || '?').length + ' D=' + g.description.length + ' D_ES=' + g.description_es.length);
});
