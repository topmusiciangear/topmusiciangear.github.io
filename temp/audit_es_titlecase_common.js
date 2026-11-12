// temp/audit_es_titlecase_common.js — detecta SOLO palabras comunes ES capitalizadas mal (Title Case)
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

const COMUNES_ES = new Set([
  'de','del','la','el','los','las','un','una','unos','unas','y','o','para','en','con','por','sin','sobre','entre','como','más','menos','tras','según','durante','hacia','hasta','desde','ante','bajo','cabe','contra','excepto','incluso','mediante','salvo','versus','vs','e','ni','que','quien','cuyo','cuya','cuyos','cuyas','donde','cuando','cuán','cuál','cuáles','qué','cómo','dónde','cuándo','si','sí','no','ya','se','cada','todo','todos','toda','todas','otro','otros','otra','otras','antes','después','ahora','solo','sólo','también','dentro','fuera','cual','cualquiera','cualesquiera','nadie','alguien','algo','nada','poco','pocos','pocas','mucho','mucha','muchos','muchas','demasiado','demasiada','demasiados','demasiadas','bastante','bastantes','cualquier','cualquiera','cualesquiera','cada','este','esta','estos','estas','ese','esa','esos','esas','aquel','aquella','aquellos','aquellas','mío','mía','míos','mías','tuyo','tuya','tuyos','tuyas','suyo','suya','suyos','suyas','nuestro','nuestra','nuestros','nuestras','vuestro','vuestra','vuestros','vuestras','bien','mal','así','aún','aun','ése','ésa','éste','ésta','aquél','aquella','aquellos','aquellas','este','esta','estos','estas','ese','esa','esos','esas','más','menos','muy','bastante','demasiado','poco','un','una','unos','unas','algo','alguien','nadie','nada','siempre','nunca','casi','solo','sólo','también','tampoco','ya','todavía','aún','entonces','luego','antes','después','antes','después','mientras','cuando','cuándo','donde','dónde','como','cómo','por qué','porque','porqué','aunque','pero','si','sí','no','ni','o','u','y','e'
]);

const MODELO_OK = new Set(['martin','taylor','gibson','fender','yamaha','shure','neumann','rode','akg','sennheiser','audio-technica','electro-voice','qsc','jbl','kali','adam','genelec','k&r','kruk','krk','mackie','behringer','presonus','m-audio','focusrite','steinberg','ableton','fl studio','logic pro','cubase','pro tools','reaper','studio one','reason','bitwig','native instruments','arturia','u-he','fabfilter','izotope','soundtoys','waves','slate digital','universal audio','ua','rme','apogee','antelope','lynx','motu','audient','ssl','neve','api','manley','teletronix','la-2a','la2a','1176','cl1b','dbx','dbx 160','distressor','empirical labs','elysia','weiss','lavry','benchmark','crane song','phil jones','jensen','transformer','neve 1073','1084','1073','dpre','mp-2','mp2','duet','apollo','twin','babyface','fireface','ucx','ufx','octapre','preamp','preamps','unison','adc','dac','ad/da','ada','steadyclock','totalmix','dsp','fpga','latency','roundtrip','loopback','thunderbolt','usb','usb-c','usb-a','lightning','firewire','firewire 400','firewire 800','midi','din','xrlr','xlr','trs','ts','rca','phono','speakon','speakon nl4','nl8','banana','spade','speakerspeaker','woofer','tweeter','midrange','full-range','coaxial','coax','horn','waveguide','bafle','cabinet','combo','head','stack','headroom','clean channel','crunch','overdrive','distortion','fuzz','delay','reverb','reverberation','echo','chorus','flanger','phaser','tremolo','vibrato','compressor','limiter','gate','expander','eq','equalizer','parametric','graphic','semi-parametric','shelf','low shelf','high shelf','low pass','high pass','band pass','band reject','notch','hp filter','lp filter','bp filter','br filter','dynamic eq','de-esser','deesser','exciter','enhancer','harmonic','saturation','tape saturation','tube saturation','transient','shaper','envelope','follower','sidechain','side chain','multiband','single band','stereo','mid/side','m/s','dual mono','linked','unlinked','lookahead','attack','release','hold','knee','ratio','threshold','makeup','make-up','gain','trim','pad','hp','lp','polarity','phase','invert','flip','ground lift','ground-lift','phantom','48v','+48v','48 v','phantom power','battery','batteries','aa','aaa','9v','9 v','rechargeable','nimh','alkaline','carbon','zinc','mah','mah','voltage','volts','v','w','watt','watts','kw','kw','volt','amper','amps','ma','ohm','ohms','kohm','mohm','impedance','impedance matching','damping','sensitivity','spl','db spl','db','dbv','dbm','dbvu','lu','lufs','true peak','true-peak','ispl','k-weighted','k weighting','bs1770','itu-r','bs.1770','ebu r128','r128','aes','aes3','aes-3','aes42','aes-42','madi','adats','adat','tdif','spdif','aes/ebu','aes-ebu','analog','digital','hybrid','solid state','tube','valve','valves','fet','op amp','opamp','discrete','ic','chip','chipset','mosfet','jfet','bjt','mosfet','cmos','ttl','cmos','rtl','dtl','ecl','pecl','lvpecl','lvdt','lvdsi','lvpecl']);

function isAcro(w) {
  const c = w.replace(/^[¿¡"'«*\[\]{}]+/,'').replace(/[.,;:!?]+$/,'');
  return /^[A-Z0-9&+\-]{1,6}(\d+)?$/.test(c) || MODELO_OK.has(c.toLowerCase());
}

function analyze(txt) {
  const plano = String(txt || '').replace(/<[^>]+>/g, ' ');
  const segmentos = plano.split(/(?<=[:?!;])\s+|\.\s+/);
  const malas = [];
  segmentos.forEach(seg => {
    const palabras = seg.split(/[\s\-–—,()«»“”\"'\[\]{}]+/).filter(Boolean);
    palabras.forEach((p, i) => {
      if (i === 0) return;
      const c = p.replace(/^[¿¡"'«*\[\]{}]+/,'').replace(/[.,;:!?]+$/,'');
      if (!c) return;
      if (isAcro(c)) return;
      if (COMUNES_ES.has(c.toLowerCase())) return;
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

console.log('TOTAL CAMPOS ES CON PALABRAS COMUNES EN TITLE CASE: ' + problemas.length);
problemas.forEach(p => {
  console.log('\n--- ' + p.guia + ' :: ' + p.campo);
  console.log('   PALABRAS: ' + p.palabras.join(', '));
  console.log('   TEXTO: ' + p.txt.slice(0, 180).replace(/\s+/g, ' '));
});
fs.writeFileSync(B + 'temp/es_titlecase_common.json', JSON.stringify(problemas, null, 2), 'utf8');
console.log('\nGuardado en temp/es_titlecase_common.json');
