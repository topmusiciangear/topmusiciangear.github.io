// temp/audit_es_titlecase_deep.js — detector profundo de Title Case en ES
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const COMUNES_ES = new Set([
  'de','del','la','el','los','las','un','una','unos','unas','y','o','para','en','con','por','sin','sobre','entre','como','más','menos','sin','sobre','tras','según','durante','hacia','hasta','desde','ante','bajo','cabe','contra','excepto','incluso','hacia','mediante','salvo','versus','vs','y','e','ni','que','quien','cuyo','cuya','cuyos','cuyas','donde','cuando','como','cuán','cuál','cuáles','qué','cómo','dónde','cuándo','si','sí','no','ya','se','cada','todo','todos','toda','todas','otro','otros','otra','otras','antes','después','ahora','solo','sólo','también','dentro','fuera','desde','hasta','cuando','porque','aunque','pero','nunca','siempre','casi','algo','uno','mejor','peor','grande','nuevo','viejo','fácil','difícil','rápido','lento','bueno','perfecto','natural','rápida','único','única','correcta','real','cuatro','tres','cinco','do','re','mi','fa','sol','si','ti','mí','él','ella','ello','ello','lo','su','sus','le','les','me','te','nos','os','a','al','porque','por qué','más','menos','bien','mal','así','aún','aun','aún','ése','ésa','éste','ésta','aquél','aquella','este','esta','estos','estas','ese','esa','esos','esas','mío','mía','míos','mías','tuyo','tuya','tuyos','tuyas','suyo','suya','suyos','suyas','nuestro','nuestra','nuestros','nuestras','vuestro','vuestra','vuestros','vuestras','cual','cualquiera','cualesquiera','nadie','alguien','algo','nada','poco','poco','pocos','pocas','mucho','mucha','muchos','muchas','demasiado','demasiada','demasiados','demasiadas','bastante','bastantes','demasiado','otro','otra','otros','otras','cualquier','cualquiera','cualesquiera','several','cada','cualquier','cualquiera','cualesquiera'
]);

const ACRO = /^[A-Z0-9&+\-]{1,6}(\d+)?$/; // siglas, modelos
const EN_WORDS = new Set(['the','a','an','and','or','of','in','on','at','to','for','with','by','from','vs','vs.','dj','mc','xl','ii','iii','iv','v','se','pro','air','usb','xlr','dsp','eq','fx','midi','daw','vst','au','aax','rta','led','lcd','oled','hd','uhd','4k','8k','mp3','wav','flac','aac','aptx','ldac','bluetooth','wifi','lan','nas','ssd','hdd','cpu','gpu','ram','usb-c','usb-a','thunderbolt','firewire','sd','cf','cfexpress','xqdf','midi','cv','gate','lfo','env','adsr','vco','vcf','vca','dca','osc','filter','mix','master','bus','aux','send','return','insert','direct','monitor','headphone','headphones','speaker','speakers','mic','mics','microphone','microphones','cable','cables','adapter','adapters','interface','interfaces','mixer','mixers','console','consoles','amp','amps','amplifier','amplifiers','preamp','preamps','power','powered','passive','active','line','instrument','mic level','line level','stereo','mono','surround','dolby','dts','thx','rms','peak','db','db spl','dbv','dbm','dbvu','lu','lufs','true peak','true-peak','ispl','k-weighted','k weighting','bs1770','itu-r','bs.1770','ebu r128','r128','aes','aes3','aes-3','aes42','aes-42','madi','adats','adat','tdif','spdif','aes/ebu','aes-ebu','analog','digital','hybrid','solid state','tube','valve','valves','fet','fet','op amp','opamp','discrete','discreto','ic','chip','chipset','mosfet','jfet','bjt','mosfet','cmos','ttl','cmos','rtl','dtl','ecl','pecl','lvpecl','lvdt','lvdsi','lvpecl','lvpecl','lvpecl']);

function isAcro(w) { return ACRO.test(w) || EN_WORDS.has(w.toLowerCase()); }

function analyze(txt) {
  const plano = String(txt || '').replace(/<[^>]+>/g, ' ');
  const segmentos = plano.split(/(?<=[:?!;])\s+|\.\s+/);
  const malas = [];
  segmentos.forEach(seg => {
    const palabras = seg.split(/[\s\-–—,()«»“”\"'\[\]{}]+/).filter(Boolean);
    palabras.forEach((p, i) => {
      if (i === 0) return; // primera palabra del segmento puede ir mayúscula
      const c = p.replace(/^[¿¡"'«*\[\]{}]+/, '').replace(/[.,;:!?]+$/, '');
      if (!c) return;
      if (isAcro(c)) return;
      if (COMUNES_ES.has(c.toLowerCase())) return;
      // si empieza con mayúscula y no es común -> Title Case sospechoso
      if (/^[A-ZÁÉÍÓÚÑ]/.test(c)) malas.push(c);
    });
  });
  return malas;
}

const problemas = [];
const push = (guia, campo, txt) => {
  const m = analyze(txt);
  if (m.length >= 1) problemas.push({ guia, campo, txt: String(txt), palabras: m });
};

guides.forEach(g => {
  push(g.id, 'title_es', g.title_es);
  push(g.id, 'metaDesc_es', g.metaDesc_es);
  push(g.id, 'intro_es', g.intro_es);
  push(g.id, 'conclusion_es', g.conclusion_es);
  push(g.id, 'verdict_es', g.verdict_es);
  (g.sections || []).forEach((s, i) => {
    push(g.id, `sections[${i}].heading_es`, s.heading_es);
    push(g.id, `sections[${i}].content_es`, s.content_es);
  });
  (g.verdictProsCons || []).forEach((v, i) => {
    (v.pros_es || []).forEach((p, j) => push(g.id, `verdictProsCons[${i}].pros_es[${j}]`, p));
    (v.cons_es || []).forEach((c, j) => push(g.id, `verdictProsCons[${i}].cons_es[${j}]`, c));
  });
  (g.faq || []).forEach((f, i) => {
    push(g.id, `faq[${i}].q_es`, f.q_es);
    push(g.id, `faq[${i}].a_es`, f.a_es);
  });
  if (g.productTable) {
    push(g.id, 'productTable.title_es', g.productTable.title_es);
    (g.productTable.rows || []).forEach((r, i) => {
      (r.values || []).forEach((val, k) => {
        if (val.value_es) push(g.id, `productTable.rows[${i}].values[${k}].value_es`, val.value_es);
      });
    });
  }
});

console.log('TOTAL CAMPOS ES CON TITLE CASE SOSPECHOSO: ' + problemas.length);
problemas.forEach(p => {
  console.log('\n--- ' + p.guia + ' :: ' + p.campo);
  console.log('   PALABRAS: ' + p.palabras.join(', '));
  console.log('   TEXTO: ' + p.txt.slice(0, 200).replace(/\s+/g, ' '));
});
fs.writeFileSync(B + 'temp/es_titlecase_deep.json', JSON.stringify(problemas, null, 2), 'utf8');
console.log('\nGuardado en temp/es_titlecase_deep.json');
