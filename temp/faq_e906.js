var fs=require('fs');
var p='data/guides.json';
var d=JSON.parse(fs.readFileSync(p,'utf8'));
var g=d.find(function(x){return x.id==='best-mic-for-guitar-amps'});
var f=g.featuredSnippet||{};
var fails=[];
function assert(c,m){ if(!c) fails.push(m); }
assert(f.faq_q2_en==='SM57 vs Sennheiser e609 - which is better for guitar?','q2_en unexpected: '+f.faq_q2_en);
assert((f.faq_a2_en||'').indexOf('The e609 has a slightly darker tone')===0,'a2_en unexpected');
f.faq_q2_en='SM57 vs Sennheiser e906 - which is better for guitar?';
f.faq_a2_en='Both hang over the amp grille with no stand, but they voice differently. The e906 adds a 3-position presence switch (Bright, Moderate, Dark) to shape treble at the mic, with a supercardioid pattern and a wider 40 Hz – 18 kHz response. The SM57 has the classic midrange punch, costs about half and needs a stand. Pick the e906 for placement freedom and voicing options; pick the SM57 for the timeless reference tone on a budget.';
assert(f.faq_q2_es==='SM57 vs Sennheiser e609 - ¿cuál es mejor para guitarra?','q2_es unexpected: '+f.faq_q2_es);
f.faq_q2_es='SM57 vs Sennheiser e906: ¿cuál es mejor para guitarra?';
f.faq_a2_es='Ambos se cuelgan de la rejilla sin soporte, pero suenan distinto. El e906 suma un interruptor de presencia de 3 posiciones (brillante, medio, oscuro) para dar forma a los agudos en el micro, con patrón supercardioide y respuesta más amplia de 40 Hz a 18 kHz. El SM57 tiene el golpe clásico de medios, cuesta la mitad y necesita soporte. Elige el e906 por libertad de colocación y opciones de voz; el SM57 por el tono de referencia de siempre con poco presupuesto.';
if(fails.length){ console.log('FAIL:\n'+fails.join('\n')); process.exit(1); }
fs.writeFileSync(p,JSON.stringify(d,null,2));
console.log('FAQ Q2 UPDATED OK');
