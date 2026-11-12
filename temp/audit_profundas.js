// AUDITORÍA PROFUNDA GUIA POR GUIA - topmusiciangear
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

// Calcos EN->ES detectados
const CALCOS = [
  { en: 'game-changer', es: 'cambio radical / revolucionario', severidad: 'alta' },
  { en: 'seamless', es: 'sin interrupciones / fluido', severidad: 'alta' },
  { en: 'in conclusion', es: 'en conclusión / para resumir', severidad: 'media' },
  { en: "it's worth noting", es: 'vale la pena señalar / cabe destacar', severidad: 'media' },
  { en: 'caballo de batalla', es: 'producto estrella / más vendido', severidad: 'alta' },
  { en: 'caballos de batalla', es: 'productos estrella', severidad: 'alta' },
  { en: 'todo terreno', es: 'versátil / polivalente', severidad: 'alta' },
  { en: 'todo-terreno', es: 'versátil / polivalente', severidad: 'alta' },
  { en: 'todoterreno', es: 'versátil / polivalente', severidad: 'alta' },
  { en: 'grial', es: 'referencia / santo grial', severidad: 'media' },
  { en: 'navaja suiza', es: 'multifunción / polivalente', severidad: 'media' },
  { en: 'trabajo pesado', es: 'uso profesional / pesado', severidad: 'media' },
  { en: 'arma secreta', es: 'as en la manga / recurso', severidad: 'alta' },
  { en: 'gabinete', es: 'caja / cuerpo', severidad: 'alta' },
  { en: 'gabinetes', es: 'cajas / cuerpos', severidad: 'alta' },
  { en: 'punto dulce', es: 'punto ideal', severidad: 'media' },
  { en: 'estándar de oro', es: 'referencia', severidad: 'alta' },
  { en: 'estandar de oro', es: 'referencia', severidad: 'alta' },
  { en: 'techo de graves', es: 'límite de graves', severidad: 'media' },
  { en: 'dios del muestreo', es: 'referencia en muestreo', severidad: 'media' },
  { en: 'grabar a un DAW', es: 'grabar en un DAW', severidad: 'alta' },
  { en: 'via USB', es: 'vía USB', severidad: 'alta' },
  { en: 'atrás', es: 'en el panel trasero', severidad: 'media' },
  { en: 'sweet spot', es: 'punto ideal', severidad: 'media' }
];

const OK_ES_WORDS = new Set([
  'daw','midi','usb','vst','au','aax','clap','dsp','eq','fx','pa','tts','ia','max',
  'for','live','session','view','logic','pro','ableton','fl','studio','ableton live',
  'fl studio','logic pro','studio one','push','home','studio','one','more','two',
  'notes','solid','state','line','6','native','instruments','universal','audio',
  'plugin','boutique','gear4music','music','store','plugin','alliance','pro','tools',
  'cubase','ableton','logic','fl','studio','one','session','view','piano','roll',
  'drum','machine','designer','bass','presentation','series','builders','edition',
  'modern','deluxe','ai','session','players','wavetable','operator','analog',
  'collision','alchemy','retro','synth','sculpture','studio','piano','bass',
  'session','players','plug','and','play','plug-and-play','voice','of','the','world',
  'cq','you','session','players','max','for','live','beatles','ones','chemical',
  'brothers','mastering','the','mix','ai','session','players'
]);

function findCalcos(text) {
  const found = [];
  const t = text.toLowerCase();
  CALCOS.forEach(c => {
    if (t.includes(c.en.toLowerCase())) {
      found.push({ calco: c.en, sugerencia: c.es });
    }
  });
  return found;
}

function findEnWords(text) {
  const found = [];
  const words = text.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g) || [];
  words.forEach(w => {
    const lw = w.toLowerCase();
    if (!OK_ES_WORDS.has(lw) && lw.length > 2) {
      // verificar si es palabra española común
      const esCommon = new Set(['el','la','los','las','un','una','unos','unas','y','o','de','del','al','para','con','que','es','son','su','tus','tu','más','por','en','a','como','pero','muy','ya','lo','se','le','te','que','qué','cómo','cuál','cuáles','cuán','cuántos','cuántas','donde','dónde','cuando','cuándo','mi','mis','me','nos','os','les','me','te','se','ha','han','he','hemos','han','está','están','estoy','estás','estamos','estáis','fue','fueron','era','eran','ser','estar','tener','tiene','tienen','tengo','tenemos','tenéis','puede','pueden','puedo','podemos','querer','quiere','quieren','quiero','queremos','saber','sabe','saben','sé','sabemos','decir','dice','dicen','digo','decimos','hacer','hace','hacen','hago','hacemos','ver','ve','ven','veo','vemos','dar','da','dan','doy','damos','ir','va','van','voy','vamos','venir','viene','vienen','vengo','venimos','salir','sale','salen','salgo','salimos','llegar','llegan','llegó','llegamos','pasar','pasa','pasan','paso','pasamos','quedar','quedó','quedamos','quedan','quedarse','pensar','piensa','piensan','pienso','pensamos','creer','cree','creen','creo','creemos','saber','sabe','saben','sé','sabemos','conocer','conoce','conocen','conozco','conocemos']);
      if (!esCommon.has(lw)) {
        found.push(w);
      }
    }
  });
  return found;
}

function auditGuide(g) {
  const issues = [];

  // TITLE_ES - Title Case check
  if (g.title_es) {
    const words = g.title_es.split(' ');
    const capWords = words.filter(w => w.length > 2 && /^[A-ZÁÉÍÓÚÜÑ]/.test(w) && !OK_ES_WORDS.has(w.toLowerCase()));
    if (capWords.length > 1) {
      issues.push({ tipo: 'TITLE_CASE_ES', campo: 'title_es', valor: g.title_es, detalle: 'Mayúsculas: ' + capWords.join(', ') });
    }
    if (g.title_es.endsWith('.')) {
      issues.push({ tipo: 'TITLE_PUNTO', campo: 'title_es', valor: g.title_es });
    }
  }

  // META DESC
  if (g.metaDesc_es && g.metaDesc_es.length > 155) {
    issues.push({ tipo: 'META_DESC_LARGA', campo: 'metaDesc_es', valor: g.metaDesc_es, detalle: g.metaDesc_es.length + ' chars' });
  }

  // SECTIONS
  if (g.sections) {
    g.sections.forEach((s, si) => {
      if (s.heading_es) {
        const words = s.heading_es.split(' ');
        const capWords = words.filter(w => w.length > 2 && /^[A-ZÁÉÍÓÚÜÑ]/.test(w) && !OK_ES_WORDS.has(w.toLowerCase()));
        if (capWords.length > 1) {
          issues.push({ tipo: 'HEADING_TITLE_CASE', campo: 'sections[' + si + '].heading_es', valor: s.heading_es, detalle: 'Mayúsculas: ' + capWords.join(', ') });
        }
        const calcos = findCalcos(s.heading_es);
        calcos.forEach(c => issues.push({ tipo: 'CALCO_HEADING', campo: 'sections[' + si + '].heading_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
      }
      if (s.content_es) {
        const enWords = findEnWords(s.content_es);
        enWords.forEach(w => issues.push({ tipo: 'EN_COLADO', campo: 'sections[' + si + '].content_es', valor: w, detalle: 'en: ' + slice(s.content_es, w) }));
        const calcos = findCalcos(s.content_es);
        calcos.forEach(c => issues.push({ tipo: 'CALCO_CONTENT', campo: 'sections[' + si + '].content_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
      }
    });
  }

  // FAQ
  if (g.faq) {
    g.faq.forEach((f, fi) => {
      if (f.q_es) {
        const calcos = findCalcos(f.q_es);
        calcos.forEach(c => issues.push({ tipo: 'CALCO_FAQ_Q', campo: 'faq[' + fi + '].q_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
      }
      if (f.a_es) {
        const calcos = findCalcos(f.a_es);
        calcos.forEach(c => issues.push({ tipo: 'CALCO_FAQ_A', campo: 'faq[' + fi + '].a_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
      }
    });
  }

  // CONCLUSION
  if (g.conclusion_es) {
    const calcos = findCalcos(g.conclusion_es);
    calcos.forEach(c => issues.push({ tipo: 'CALCO_CONCLUSION', campo: 'conclusion_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
  }

  // VERDICT
  if (g.verdict_es) {
    const calcos = findCalcos(g.verdict_es);
    calcos.forEach(c => issues.push({ tipo: 'CALCO_VERDICT', campo: 'verdict_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
  }

  // VERDICT PROS CONS
  if (g.verdictProsCons) {
    g.verdictProsCons.forEach((vp, vi) => {
      if (vp.pros_es && vp.pros_es.length < 4) {
        issues.push({ tipo: 'PROS_POCO', campo: 'verdictProsCons[' + vi + '].pros_es', valor: vp.product || '?', detalle: vp.pros_es.length + ' pros (mínimo 4)' });
      }
      if (vp.cons_es && vp.cons_es.length < 4) {
        issues.push({ tipo: 'CONTRAS_POCO', campo: 'verdictProsCons[' + vi + '].cons_es', valor: vp.product || '?', detalle: vp.cons_es.length + ' contras (mínimo 4)' });
      }
      [...(vp.pros_es || []), ...(vp.cons_es || [])].forEach(item => {
        const calcos = findCalcos(item);
        calcos.forEach(c => issues.push({ tipo: 'CALCO_PRO_CON', campo: 'verdictProsCons[' + vi + ']', valor: item, detalle: c.calco + ' → ' + c.sugerencia }));
      });
    });
  }

  // FEATURED SNIPPET
  if (g.featuredSnippet) {
    const fs_es = g.featuredSnippet;
    if (fs_es.text_es) {
      const calcos = findCalcos(fs_es.text_es);
      calcos.forEach(c => issues.push({ tipo: 'CALCO_FEATURED', campo: 'featuredSnippet.text_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
    }
    ['key1_es','key2_es','key3_es','key4_es','faq_a1_es','faq_a2_es','faq_a3_es','faq_a4_es','faq_a5_es'].forEach(k => {
      if (fs_es[k]) {
        const calcos = findCalcos(fs_es[k]);
        calcos.forEach(c => issues.push({ tipo: 'CALCO_FEATURED_' + k.toUpperCase(), campo: 'featuredSnippet.' + k, valor: c.calco, detalle: '→ ' + c.sugerencia }));
      }
    });
  }

  // PRODUCT TABLE
  if (g.productTable && g.productTable.rows) {
    g.productTable.rows.forEach((row, ri) => {
      if (row.values) {
        row.values.forEach((v, vi) => {
          if (v.value_es) {
            const calcos = findCalcos(v.value_es);
            calcos.forEach(c => issues.push({ tipo: 'CALCO_TABLE', campo: 'productTable.rows[' + ri + '].values[' + vi + '].value_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
          }
        });
      }
    });
  }

  return issues;
}

function slice(text, word) {
  const i = text.toLowerCase().indexOf(word.toLowerCase());
  if (i < 0) return '';
  const a = Math.max(0, i - 40);
  const b = Math.min(text.length, i + word.length + 40);
  return text.slice(a, b).replace(/\s+/g, ' ');
}

// ============ EJECUTAR ============
console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║  AUDITORÍA PROFUNDA - topmusiciangear                        ║');
console.log('║  ' + guides.length + ' guías ES                                                ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

const allIssues = [];
guides.forEach(g => {
  const issues = auditGuide(g);
  if (issues.length > 0) {
    allIssues.push({ id: g.id, title: g.title, title_es: g.title_es, issues });
  }
});

console.log('═════════════════════════════════════════════════════════════════');
console.log('RESUMEN: ' + allIssues.length + ' de ' + guides.length + ' guías con issues');
console.log('═════════════════════════════════════════════════════════════════\n');

const tipoCount = {};
allIssues.forEach(g => g.issues.forEach(i => { tipoCount[i.tipo] = (tipoCount[i.tipo] || 0) + 1; }));
console.log('Por tipo:');
Object.entries(tipoCount).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => console.log('  ' + k + ': ' + v));

const lines = [];
lines.push('AUDITORÍA PROFUNDA - ' + new Date().toISOString());
lines.push('Total guías: ' + guides.length + ' | Con issues: ' + allIssues.length + '\n');
allIssues.forEach(g => {
  lines.push('═════════════════════════════════════════════════════════════════');
  lines.push('GUIA: ' + g.id + ' — ' + g.title);
  if (g.title_es) lines.push('  ES: ' + g.title_es);
  g.issues.forEach(i => {
    lines.push('  [' + i.tipo + '] ' + i.campo + ': ' + i.valor + (i.detalle ? ' — ' + i.detalle : ''));
  });
  lines.push('');
});
fs.writeFileSync(B + 'temp/audit_profundo_guia.txt', lines.join('\n'), 'utf8');
console.log('\nReporte detallado: temp/audit_profundo_guia.txt');
