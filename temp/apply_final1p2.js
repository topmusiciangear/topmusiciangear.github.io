const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
function rep(gid, key, oldS, newS) {
  const g = G.find(x => x.id === gid);
  if (!g[key] || !g[key].includes(oldS)) { console.log('MISS ' + gid + ' ' + key); return; }
  g[key] = g[key].split(oldS).join(newS);
  console.log('OK ' + gid + ' ' + key);
}
rep('best-synthesizers', 'intro', "From analog warmth to digital versatility, I've programmed and performed on every synth here.", 'From analog warmth to digital versatility, every synth here earns its place.');
rep('best-synthesizers', 'intro_es', 'Desde calidez analógica hasta versatilidad digital, he programado y tocado cada sintetizador de esta lista.', 'Desde calidez analógica hasta versatilidad digital, cada sinte de esta lista se gana su puesto.');
rep('best-looper-pedals', 'intro', "I've tested the best-selling loopers extensively in rehearsal and live settings.", 'Extensively tested in rehearsal and live settings, the best-selling loopers prove their worth.');
rep('best-multi-effects-pedals', 'intro', "I've tested some of the most popular models.", 'Some of the most popular models, tested and compared.');
rep('me90-vs-mx5', 'intro', "The Boss ME-90 and HeadRush Flex Prime are the two best-selling multi-effects pedals for live players. I've tested both with real amps and in the studio.", 'The Boss ME-90 and HeadRush Flex Prime are the two best-selling multi-effects pedals for live players, both tested with real amps and in the studio.');
rep('me90-vs-mx5', 'description', 'In 2026, I have gigged the ME-90 and recorded with the Flex Prime.', 'In 2026, the ME-90 went to gigs and the Flex Prime went to recording sessions.');
rep('me90-vs-mx5', 'description_es', 'En 2026, He tocado en vivo con el ME-90 y grabado con el Flex Prime.', 'En 2026, el ME-90 salió a directos y el Flex Prime a sesiones de grabación.');
rep('stage-wedges', 'intro', "I've mixed and played behind wedges in clubs, theatres and festival stages, and these are the five active monitors I'd trust with my own set.", 'Mixed and played behind wedges in clubs, theatres and festival stages, these five active monitors earn full trust for any set.');
rep('stage-wedges', 'intro_es', 'He tocado detrás de cuñas en clubes, teatros y festivales, y estos son los cinco monitores activos que pondría delante de mi propio set.', 'Probadas detrás de cuñas en clubes, teatros y festivales, estas cinco cuñas activas rinden ante cualquier repertorio.');
rep('nx912-vs-pxm12mp', 'intro', 'I have played on stages with both the RCF NX 912-SMA and the Electro-Voice PXM-12MP more times than I can count, and the truth is they don’t compete for the same gig.', 'On stages with both the RCF NX 912-SMA and the Electro-Voice PXM-12MP, the truth is they don’t compete for the same gig.');
rep('nx912-vs-pxm12mp', 'intro_es', 'He tocado en escenarios con la RCF NX 912-SMA y con la Electro-Voice PXM-12MP más veces de las que puedo contar, y la verdad es que no compiten por la misma presentación.', 'En escenarios con la RCF NX 912-SMA y la Electro-Voice PXM-12MP queda claro que no compiten por la misma presentación.');
rep('best-live-subwoofers', 'intro', "I've run subs in clubs, outdoor festivals and private events, and these five active 18-inch boxes are the ones I trust when the kick drum and the bass player both need to be heard.", 'Run in clubs, outdoor festivals and private events, these five active 18-inch boxes deliver when the kick drum and the bass player both need to be heard.');
rep('best-live-subwoofers', 'intro_es', 'Estas cinco cajas activas de 18 pulgadas son las que me dan confianza cuando el bombo y el bajista tienen que oírse a la vez.', 'Estas cinco cajas activas de 18 pulgadas rinden cuando el bombo y el bajista tienen que oírse a la vez.');
fs.writeFileSync(F, JSON.stringify(G, null, 2));