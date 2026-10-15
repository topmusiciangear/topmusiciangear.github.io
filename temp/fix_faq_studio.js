// FAQs propias de starter-studio: quitar el SM57 (esta dentro de featuredSnippet)
const fs = require('fs');
const BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
const F = BASE + 'data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));
const faq = g.find(x => x.id === 'starter-studio').featuredSnippet;

const VIEJOS = [
  'Start with the SM57',
  'Empieza con el SM57',
  'a solid dynamic mic for vocals',
  'un buen micrófono dinámico para voz'
];

// textos completos actuales
const ACT = {
  faq_a2_en: faq.faq_a2_en,
  faq_a2_es: faq.faq_a2_es,
  faq_a5_en: faq.faq_a5_en,
  faq_a5_es: faq.faq_a5_es
};
console.log('=== ANTES ===\n');
Object.keys(ACT).forEach(k => console.log(k + ':\n  ' + ACT[k] + '\n'));

faq.faq_a2_en = 'Start with the NT1 Signature. It is the cheapest large-diaphragm condenser that ships with a shock mount, a pop filter and an XLR cable, so nothing else has to be bought before the first take. Pair it with the four acoustic panels before anything else — an untreated room records the room, not the voice. As you grow, step up to the NT1 5th Generation, which is quieter at 4 dBA and adds native USB.';
faq.faq_a2_es = 'Empieza con el NT1 Signature. Es el condensador de diafragma grande más barato que ya incluye soporte, filtro antipop y cable XLR, así que no hay que comprar nada más antes de la primera toma. Pairéalo con los cuatro paneles acústicos antes que con cualquier otra cosa: una sala sin tratar graba la sala, no la voz. A medida que crezcas, sube al NT1 5th Generation, que es más silencioso (4 dBA) y añade USB nativo.';

faq.faq_a5_en = 'Yes — that is exactly what this guide is designed for. Focus your budget in this order: a capable audio interface first, a large-diaphragm condenser, a pair of monitors or headphones you know well, acoustic panels, and then everything else. You do not need an expensive microphone or a large analogue mixer to make recordings that translate well. A well-spread budget beats a badly spread one every time.';
faq.faq_a5_es = 'Sí — exactamente para eso está diseñada esta guía. Enfoca tu presupuesto en este orden: primero una interfaz de audio capaz, un condensador de diafragma grande, un par de monitores o auriculares que conozcas bien, paneles acústicos y luego todo lo demás. No necesitas un micrófono caro ni una mezcladora analógica grande para hacer grabaciones que se traduzcan bien. Un presupuesto bien repartido supera a uno mal repartido cada vez.';

// el titulo de la q5 EN estaba roto: "Can I build a starter studio for ?"
faq.faq_q5_en = 'Can I build a starter studio on a budget?';

fs.writeFileSync(F, JSON.stringify(g, null, 2) + '\n', 'utf8');

console.log('=== DESPUES ===\n');
['faq_a2_en', 'faq_a2_es', 'faq_a5_en', 'faq_a5_es'].forEach(k => console.log(k + ':\n  ' + faq[k] + '\n'));

// comprobar que no queda SM57 ni "dynamic mic" en las FAQs
const todo = JSON.stringify(faq);
console.log('SM57 en las FAQs:            ' + (todo.match(/SM57/g) || []).length);
console.log('"dynamic mic"/"microfono dinamico": ' + (todo.match(/dynamic mic|microfono dinámico|microfono dinamico/gi) || []).length);
console.log('pregunta q5 EN: ' + faq.faq_q5_en);

// SM57 en toda la guia
const g2 = JSON.parse(fs.readFileSync(F, 'utf8'));
const s2 = g2.find(x => x.id === 'starter-studio');
const json = JSON.stringify(s2);
console.log('\nSM57 en starter-studio:      ' + (json.match(/SM57/g) || []).length);
console.log('$485 en starter-studio:      ' + (json.match(/\$485/g) || []).length);
console.log('mojibake:                    ' + (fs.readFileSync(F, 'utf8').match(/â‚¬|Â£|Â°/g) || []).length);
