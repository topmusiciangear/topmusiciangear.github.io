// AUDITORÍA PROFUNDA v4 - solo issues inequívocos
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// Calcos EN->ES reales
const CALCOS = [
  { en: 'game-changer', es: 'cambio radical / revolucionario' },
  { en: 'seamless', es: 'sin interrupciones / fluido' },
  { en: 'in conclusion', es: 'en conclusión / para resumir' },
  { en: "it's worth noting", es: 'vale la pena señalar / cabe destacar' },
  { en: 'caballo de batalla', es: 'producto estrella / más vendido' },
  { en: 'caballos de batalla', es: 'productos estrella' },
  { en: 'todo terreno', es: 'versátil / polivalente' },
  { en: 'todo-terreno', es: 'versátil / polivalente' },
  { en: 'todoterreno', es: 'versátil / polivalente' },
  { en: 'grial', es: 'referencia / santo grial' },
  { en: 'navaja suiza', es: 'multifunción / polivalente' },
  { en: 'trabajo pesado', es: 'uso profesional / pesado' },
  { en: 'arma secreta', es: 'as en la manga / recurso' },
  { en: 'gabinete', es: 'caja / cuerpo' },
  { en: 'gabinetes', es: 'cajas / cuerpos' },
  { en: 'punto dulce', es: 'punto ideal' },
  { en: 'estándar de oro', es: 'referencia' },
  { en: 'estandar de oro', es: 'referencia' },
  { en: 'techo de graves', es: 'límite de graves' },
  { en: 'dios del muestreo', es: 'referencia en muestreo' },
  { en: 'grabar a un DAW', es: 'grabar en un DAW' },
  { en: 'via USB', es: 'vía USB' },
  { en: 'sweet spot', es: 'punto ideal' }
];

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

function stripHtml(text) {
  return text
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&laquo;/g, '«').replace(/&raquo;/g, '»')
    .replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é').replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó').replace(/&uacute;/g, 'ú').replace(/&ntilde;/g, 'ñ')
    .replace(/\s+/g, ' ').trim();
}

// Title Case real ES: 2+ palabras comunes capitalizadas (no nombres propios de producto, no siglas)
function hasRealTitleCase(esText) {
  const productWords = new Set([
    'ableton','live','studio','logic','pro','fl','midi','usb','daw','mac','windows',
    'martin','taylor','gibson','fender','yamaha','shure','rode','audio','technica',
    'akg','neumann','sennheiser','ev','electro','voice','jbl','kali','adam','genelec',
    'ik','multimedia','native','instruments','izotope','fabfilter','waves','soundtoys',
    'plugin','boutique','universal','apollo','focusrite','scarlett','presonus','mackie',
    'behringer','soundcraft','allen','heath','zoom','tascam','roland','korg','nord',
    'casio','steinberg','cubase','nuendo','tools','ableton','live','logic','studio',
    'one','drum','machine','designer','presentation','series','builders','edition',
    'modern','deluxe','session','view','arrangement','session','players','wavetable',
    'operator','analog','collision','alchemy','retro','synth','sculpture','piano','bass',
    'max','push','producer','edition','dreadnought','om','d-28','914ce','ps14ce','builder',
    'editor','modern','deluxe','taylor','martin','d-28','modern','deluxe','same','guitar',
    'thirty','years','young','electro-voice','ev','zlx','k12','dbr','eon','srt','cbr',
    'elx','sst','atc','scm','mk2','mk ii','mk ii','audient','id14','motu','m2','usb-c',
    'gen','uad','unison','ua','at2020','akg','p120','atc','scm','genelec','8351b','ones',
    'atc','scm','scm25a','pro','mk2','the','ones','mixvault','mastering','mix','neutron',
    'izotope','smart','limit','trash','apollo','twin','babyface','fs','astronaut','strat',
    'les','paul','american','pro','ii','duelo','duel','guitarra','guitarras','condensador',
    'barato','presion','preci','detalle','medios','moment','decidir','estudio'
  ]);
  const words = esText.split(' ');
  const capCommon = words.filter(w => {
    const lw = w.toLowerCase().replace(/[^a-záéíóúüñ0-9]/g, '');
    if (lw.length <= 2) return false;
    if (/^[A-ZÁÉÍÓÚÜÑ]/.test(w) && !productWords.has(lw)) return true;
    return false;
  });
  return capCommon.length >= 2;
}

function auditGuide(g) {
  const issues = [];

  // TITLE_ES - Title Case real
  if (g.title_es && hasRealTitleCase(g.title_es)) {
    issues.push({ tipo: 'TITLE_CASE_ES', campo: 'title_es', valor: g.title_es });
  }

  // META DESC > 155
  if (g.metaDesc_es && g.metaDesc_es.length > 155) {
    issues.push({ tipo: 'META_DESC_LARGA', campo: 'metaDesc_es', valor: g.metaDesc_es, detalle: g.metaDesc_es.length + ' chars' });
  }

  // SECTIONS
  if (g.sections) {
    g.sections.forEach((s, si) => {
      if (s.heading_es && hasRealTitleCase(s.heading_es)) {
        issues.push({ tipo: 'HEADING_TITLE_CASE', campo: 'sections[' + si + '].heading_es', valor: s.heading_es });
      }
      if (s.content_es) {
        const calcos = findCalcos(s.content_es);
        calcos.forEach(c => issues.push({ tipo: 'CALCO_CONTENT', campo: 'sections[' + si + '].content_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
      }
    });
  }

  // FAQ
  if (g.faq) {
    g.faq.forEach((f, fi) => {
      if (f.q_es) {
        findCalcos(f.q_es).forEach(c => issues.push({ tipo: 'CALCO_FAQ_Q', campo: 'faq[' + fi + '].q_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
      }
      if (f.a_es) {
        findCalcos(f.a_es).forEach(c => issues.push({ tipo: 'CALCO_FAQ_A', campo: 'faq[' + fi + '].a_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
      }
    });
  }

  if (g.conclusion_es) {
    findCalcos(g.conclusion_es).forEach(c => issues.push({ tipo: 'CALCO_CONCLUSION', campo: 'conclusion_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
  }
  if (g.verdict_es) {
    findCalcos(g.verdict_es).forEach(c => issues.push({ tipo: 'CALCO_VERDICT', campo: 'verdict_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
  }

  if (g.verdictProsCons) {
    g.verdictProsCons.forEach((vp, vi) => {
      if (vp.pros_es && vp.pros_es.length < 4) {
        issues.push({ tipo: 'PROS_POCO', campo: 'verdictProsCons[' + vi + ']', valor: vp.product || '?', detalle: vp.pros_es.length + ' pros' });
      }
      if (vp.cons_es && vp.cons_es.length < 4) {
        issues.push({ tipo: 'CONTRAS_POCO', campo: 'verdictProsCons[' + vi + ']', valor: vp.product || '?', detalle: vp.cons_es.length + ' contras' });
      }
      [...(vp.pros_es || []), ...(vp.cons_es || [])].forEach(item => {
        findCalcos(item).forEach(c => issues.push({ tipo: 'CALCO_PRO_CON', campo: 'verdictProsCons[' + vi + ']', valor: item, detalle: c.calco + ' → ' + c.sugerencia }));
      });
    });
  }

  if (g.featuredSnippet) {
    const fs_es = g.featuredSnippet;
    if (fs_es.text_es) {
      findCalcos(fs_es.text_es).forEach(c => issues.push({ tipo: 'CALCO_FEATURED', campo: 'featuredSnippet.text_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
    }
    ['key1_es','key2_es','key3_es','key4_es','faq_a1_es','faq_a2_es','faq_a3_es','faq_a4_es','faq_a5_es'].forEach(k => {
      if (fs_es[k]) {
        findCalcos(fs_es[k]).forEach(c => issues.push({ tipo: 'CALCO_FEATURED_' + k, campo: 'featuredSnippet.' + k, valor: c.calco, detalle: '→ ' + c.sugerencia }));
      }
    });
  }

  if (g.productTable && g.productTable.rows) {
    g.productTable.rows.forEach((row, ri) => {
      if (row.values) {
        row.values.forEach((v, vi) => {
          if (v.value_es) {
            findCalcos(v.value_es).forEach(c => issues.push({ tipo: 'CALCO_TABLE', campo: 'productTable.rows[' + ri + '].values[' + vi + '].value_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
          }
        });
      }
    });
  }

  return issues;
}

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║  AUDITORÍA PROFUNDA v4 - topmusiciangear                      ║');
console.log('║  ' + guides.length + ' guías ES                                                  ║');
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
lines.push('AUDITORÍA PROFUNDA v4 - ' + new Date().toISOString());
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
fs.writeFileSync(B + 'temp/audit_profundo_v4.txt', lines.join('\n'), 'utf8');
console.log('\nReporte detallado: temp/audit_profundo_v4.txt');
