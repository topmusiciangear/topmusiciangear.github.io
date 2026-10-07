const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const G = JSON.parse(fs.readFileSync(DIR + 'data/guides.json', 'utf8'));
const g = G.find(v => v.id === 'best-multi-effects-pedals');
const F = g.featuredSnippet;
const fq = (k, to) => {
  if (!(k in F)) throw new Error('no key ' + k);
  F[k] = to;
};
fq('faq_a2_en', 'The Boss GX-1 packs 146 effects, AIRD amp modeling, a built-in expression pedal and a 38-second looper into an ultra-portable box that runs on batteries, USB or adapter.');
fq('faq_a2_es', 'El Boss GX-1 mete 146 efectos, modelado AIRD, pedal de expresión integrado y looper de 38 segundos en una caja ultraportátil que funciona con pilas, USB o adaptador.');
fq('faq_a3_en', 'Yes — a modern multi-effects replaces overdrive, distortion, modulation, delay, reverb and even the amp when going direct. The ME-90 gives you physical knobs for instant tweaks, while the HX Stomp adds a deep pro modeling and routing ecosystem in a fraction of the space.');
fq('faq_a3_es', 'Sí — un multiefectos moderno reemplaza overdrive, distorsión, modulación, delay, reverb e incluso el ampli en directo a mesa. El ME-90 te da perillas físicas para ajustar al instante, mientras el HX Stomp añade un ecosistema pro de modelado y ruteo en una fracción del espacio.');
fq('faq_a5_en', 'Control style and depth. The ME-90 skips complex screens and uses independent physical stompbox-style knobs to shape tone instantly on stage. The HX Stomp offers deeper modeling of gain stages, mics and routing, trading physical immediacy for digital editing on a smaller screen.');
fq('faq_a5_es', 'Estilo de control y profundidad. El ME-90 prescinde de pantallas complejas y usa perillas físicas independientes estilo stompbox para moldear el tono al instante en el escenario. El HX Stomp ofrece un modelado más profundo de etapas, micros y ruteo, a cambio de edición digital en pantalla más pequeña.');
fq('faq_a6_en', 'Yes — the GX-1 is the perfect entry point. It packs a massive range of effects and amps under an intuitive color screen. It is ultra-portable and runs on 4 AA batteries, USB or adapter, ideal for headphone practice on the couch or tossing in a gig bag.');
fq('faq_a6_es', 'Sí — el GX-1 es la puerta de entrada perfecta. Mete un abanico enorme de efectos y amplis bajo una intuitiva pantalla a color. Es ultraportátil y funciona con 4 pilas AA, USB o adaptador, ideal para practicar con auriculares en el sofá o llevarlo en la mochila.');
console.log('FAQ rewritten');
const rep1 = (txt, from, to) => {
  const c = txt.split(from).length - 1;
  if (c !== 1) throw new Error('found ' + c + 'x: ' + from.slice(0, 60));
  return txt.split(from).join(to);
};
let t = JSON.stringify(g);
t = rep1(t, 'The HX Stomp is the professional-grade multi-effects for serious players who want Helix tone. The ME-90 and Flex Prime are the two best-selling hands-on multi-effects for live players. The GX-1 is the best-selling budget option.',
  'The HX Stomp is the pro multi-effects for players who demand flagship Helix tone in a compact box. The ME-90 and Flex Prime lead as the best direct-workflow live options: one with traditional physical knobs, the other betting on touchscreen comfort. At the base, the GX-1 rules as the most efficient budget portable.');
t = rep1(t, 'El HX Stomp es el multiefectos profesional para músicos serios que quieren tono Helix. El ME-90 y el Flex Prime son los dos multiefectos manuales más vendidos para directo. El GX-1 es la opción económica más vendida.',
  'El HX Stomp es el multiefectos pro para quienes exigen el tono insignia de Helix en formato compacto. El ME-90 y el Flex Prime lideran como mejores opciones de flujo directo para el directo: uno con perillas físicas tradicionales, el otro con la comodidad táctil. En la base, el GX-1 manda como portátil económico más eficiente.');
G[G.findIndex(v => v.id === 'best-multi-effects-pedals')] = JSON.parse(t);
fs.writeFileSync(DIR + 'data/guides.json', JSON.stringify(G, null, 2) + '\n');
console.log('conclusion rewritten');
