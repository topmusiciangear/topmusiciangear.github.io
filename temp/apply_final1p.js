const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const G = require(F);
function rep(gid, get, oldS, newS) {
  const g = G.find(x => x.id === gid);
  const obj = get(g);
  let n = 0;
  const walk = o => {
    if (Array.isArray(o)) { for (let i = 0; i < o.length; i++) { if (typeof o[i] === 'string' && o[i].includes(oldS)) { o[i] = o[i].split(oldS).join(newS); n++; } else walk(o[i]); } }
    else if (o && typeof o === 'object') { for (const k of Object.keys(o)) { if (typeof o[k] === 'string' && o[k].includes(oldS)) { o[k] = o[k].split(oldS).join(newS); n++; } else walk(o[k]); } }
  };
  walk(obj);
  console.log((n ? 'OK ' : 'MISS ') + gid + ' x' + n + ' :: ' + oldS.slice(0, 60));
}
const all = g => g;
rep('stage-mics', all, "The mics below are some of the best I've trusted on real stages for 20+ years: they survive the road, reject feedback on loud stages, and keep your vocals cutting through the mix night after night.", 'The mics below rank among the most trusted for real stages: they survive the road, reject feedback on loud stages, and keep vocals cutting through the mix night after night.');
rep('stage-mics', all, 'Los micros de abajo son algunos de los mejores que he probado en escenarios reales durante más de 20 años: sobreviven a la carretera, rechazan la retroalimentación en escenarios ruidosos y mantienen tu voz cortando la mezcla noche tras noche', 'Los micros de abajo están entre los más fiables para escenarios reales: sobreviven a la carretera, rechazan la retroalimentación en escenarios ruidosos y mantienen la voz cortando la mezcla noche tras noche');
rep('budget-interfaces', all, 'He graba...', 'Graba voces, instrumentos y streaming con preamplificadores limpios...');
rep('rme-vs-motu', all, 'I use Windows — will I have driver problems with the MOTU M2, or do I need the RME?', 'On Windows — are there driver problems with the MOTU M2, or is the RME required?');
rep('k371-vs-mdr7506', all, 'I have for headphones to mix my first EP — do I trust the 30-year-old 7506 or the modern K371 with the flatter bass?', 'With a tight budget for headphones to mix a first EP — trust the 30-year-old 7506 or the modern K371 with the flatter bass?');
rep('zlx-vs-k12', all, 'In 2026, I have pushed both at bar gigs and weddings. The ZLX is the budget legend; the K12.2 is the trusty pro.', 'In 2026, both cover bar gigs and weddings. The ZLX is the budget option; the K12.2 is the trusty pro.');
rep('zlx-vs-k12', all, 'En 2026, He exprimido ambos en bares y bodas. El ZLX es la leyenda económica; el K12.2 el profesional fiable.', 'En 2026, ambos cubren bares y bodas. El ZLX es la opción económica; el K12.2 el profesional fiable.');
rep('player-strat-vs-pacifica', all, 'In 2026, I have played both. The Strat is the name you want;', 'In 2026, both went head to head. The Strat is the name you want;');
rep('player-strat-vs-pacifica', all, 'En 2026, He tocado ambas. La Strat es el nombre que quieres;', 'En 2026, ambas frente a frente. La Strat es el nombre que quieres;');
rep('martin-d28-vs-taylor-314', all, 'In 2026, I have fingerpicked and strummed both. The D-28 booms like tradition;', 'In 2026, fingerpicking and strumming both shows the story. The D-28 booms like tradition;');
rep('martin-d28-vs-taylor-314', all, 'En 2026, He rasgueado y punteado ambas. La D-28 retumba a tradición;', 'En 2026, rasguear y puntear ambas cuenta la historia. La D-28 retumba a tradición;');
rep('fix-clipping-scarlett', all, 'In 2026, I have fixed this exact problem on dozens of setups.', 'In 2026, this exact problem has a proven fix across dozens of setups.');
rep('fix-clipping-scarlett', all, 'En 2026, He arreglado este mismo problema en decenas de setups.', 'En 2026, este mismo problema tiene solución probada en decenas de equipos.');
rep('best-practice-amps', all, "Your first amp matters more than your first guitar. I've tested many practice amps at home and on small stages.", 'Your first amp matters more than your first guitar. Practice amps tested at home and on small stages all prove the rule.');
rep('best-bass-amps', all, "From vintage tube warmth to modern high-fidelity power, I've tested these amps on stage and in the studio.", 'From vintage tube warmth to modern high-fidelity power, these amps cover stage and studio duty.');
rep('best-bass-amps', all, 'Desde calidez vintage hasta potencia moderna de alta fidelidad, he probado estos amplificadores en el escenario y el estudio.', 'Desde calidez vintage hasta potencia moderna de alta fidelidad, estos amplificadores cubren escenario y estudio.');
rep('best-overdrive-distortion', all, "I've spent years testing these on stages from clubs to festivals.", 'Years of stage use from clubs to festivals back every pick.');
rep('best-overdrive-distortion', all, 'He pasado años probándolos', 'Años de uso en escenarios los respaldan');
rep('best-reverb-delay', all, "I've tested these extensively in both studio and live settings.", 'Extensively tested in both studio and live settings, every pick earns its place.');
rep('best-reverb-delay', all, 'Los he probado extensamente en estudio y en vivo', 'Probados a fondo en estudio y en vivo');
rep('best-pa-speakers', all, "I've tested these speakers in venues ranging from tiny clubs to outdoor festivals.", 'Tested in venues ranging from tiny clubs to outdoor festivals, every speaker earns its place.');
rep('best-pa-speakers', all, 'Los probé en venues desde clubes pequeños hasta festivales al aire libre.', 'Probados en recintos desde clubes pequeños hasta festivales al aire libre.');
rep('best-bass-amps', all, 'The Ampeg RB-210 is the definitive Ampeg combo — 500 watts of solid-state power through two Custom10 speakers and a 1" tweeter, with the Super Grit Technology overdrive for SVT-style grind.', 'The Ampeg RB-210 is the definitive Ampeg combo — 500 watts with an extension cab (250W standalone) through two custom 10-inch Lavoce speakers and a tweeter, with the Super Grit Technology overdrive for SVT-style grind.');
rep('best-bass-amps', all, 'El Ampeg RB-210 es el combo definitivo de Ampeg — 500 vatios de potencia de estado sólido a través de dos altavoces Custom10 y un tweeter de 1", con el overdrive Super Grit Technology para el grind estilo SVT.', 'El Ampeg RB-210 es el combo definitivo de Ampeg — 500 vatios con cabina de extensión (250W solo) a través de dos altavoces Lavoce de 10 pulgadas y tweeter, con el overdrive Super Grit Technology para el grind estilo SVT.');
rep('best-overdrive-distortion', all, 'The Ibanez TS9 is the most recorded overdrive pedal in history.', 'The Ibanez TS9 is a mid-hump classic that pushes tube amps into singing sustain.');
rep('best-reverb-delay', all, 'The Boss DD-8 is the most versatile delay pedal ever made.', 'The Boss DD-8 covers always-on space and lead lift with 11 modes in one compact pedal.');
fs.writeFileSync(F, JSON.stringify(G, null, 2));