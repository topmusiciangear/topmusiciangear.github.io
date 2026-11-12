// AUDITORÍA PROFUNDA v5 - detectar Title Case real en ES (palabras comunes capitalizadas)
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

// Palabras comunes del español que NO deberían ir capitalizadas en medio de un título ES
const ES_COMMON = new Set([
  'el','la','los','las','un','una','unos','unas','y','o','de','del','al','para','con',
  'que','es','son','su','tus','tu','más','por','en','a','como','pero','muy','ya','lo',
  'se','le','te','qué','cómo','cuál','cuáles','cuán','cuántos','cuántas','donde','dónde',
  'cuando','cuándo','mi','mis','me','nos','os','les','ha','han','he','hemos','está','están',
  'estoy','estás','estamos','estáis','fue','fueron','era','eran','ser','estar','tener',
  'tiene','tienen','tengo','tenemos','tenéis','puede','pueden','puedo','podemos','querer',
  'quiere','quieren','quiero','queremos','saber','sabe','saben','sé','sabemos','decir',
  'dice','dicen','digo','decimos','hacer','hace','hacen','hago','hacemos','ver','ve','ven',
  'veo','vemos','dar','da','dan','doy','damos','ir','va','van','voy','vamos','venir','viene',
  'vienen','vengo','venimos','salir','sale','salen','salgo','salimos','llegar','llegan',
  'llegó','llegamos','pasar','pasa','pasan','paso','pasamos','quedar','quedó','quedamos',
  'quedan','quedarse','pensar','piensa','piensan','pienso','pensamos','creer','cree','creen',
  'creo','creemos','conocer','conoce','conocen','conozco','conocemos','mejor','peor',
  'mejores','peores','mejor','peor','para','por','con','sin','sobre','entre','tras','desde',
  'hasta','durante','mediante','según','versus','vs','contra','bajo','sobre','ante','bajo',
  'cabe','cerca','de','desde','en','entre','hacia','hasta','para','por','según','sin','so',
  'sobre','tras','versus','via','y','e','o','u','ni','que','sea','sean','sea','sean',
  'fuese','fuesen','fuera','fueran','si','como','cuando','donde','mientras','aunque',
  'porque','pues','yaque','ya','que','aunque','si','mientras','hasta','desde','despues',
  'antes','luego','entonces','ahora','siempre','nunca','jamas','tampoco','tambien',
  'aun','aunque','aunque','así','asi','aqui','aquí','alli','allí','aca','acá','cerca',
  'lejos','abajo','arriba','dentro','fuera','adentro','afuera','bien','mal','regular',
  'normal','comun','común','usual','habitual','ordinario','comun','común','sencillo',
  'simple','facil','fácil','dificil','difícil','duro','difícil','fácil','rápido','rapido',
  'lento','lento','nuevo','nuevo','viejo','viejo','antiguo','antiguo','moderno','moderno',
  'actual','actual','reciente','reciente','primero','primero','segundo','segundo',
  'tercero','tercero','ultimo','último','ultimo','último','primero','primero','segundo',
  'bueno','bueno','buena','buenas','buenos','malo','mala','malas','malos','grande',
  'grande','grandes','pequeno','pequeño','pequeña','pequeñas','pequeños','alto','alta',
  'altas','altos','bajo','baja','bajas','bajos','largo','larga','largas','largos','corto',
  'corta','cortas','cortos','ancho','ancha','anchas','anchos','estrecho','estrecha',
  'estrechas','estrechos','gordo','gorda','gordas','gordos','delgado','delgada',
  'delgadas','delgados','rico','rica','ricas','ricos','pobre','pobre','pobres','pobres',
  'feliz','feliz','felices','felices','triste','triste','tristes','tristes','bueno',
  'bueno','buena','buenas','buenos','malo','mala','malas','malos'
]);

function hasRealTitleCase(esText) {
  const words = esText.split(' ');
  const capCommon = words.filter(w => {
    const clean = w.replace(/[^a-záéíóúüñ0-9]/gi, '');
    if (clean.length <= 2) return false;
    const lw = clean.toLowerCase();
    // Si está en ES_COMMON y va capitalizada, es Title Case inglés aplicado a español
    if (ES_COMMON.has(lw) && /^[A-ZÁÉÍÓÚÜÑ]/.test(w)) return true;
    return false;
  });
  return capCommon.length >= 2;
}

function auditGuide(g) {
  const issues = [];

  if (g.title_es && hasRealTitleCase(g.title_es)) {
    const words = g.title_es.split(' ').filter(w => {
      const clean = w.replace(/[^a-záéíóúüñ0-9]/gi, '');
      return clean.length > 2 && ES_COMMON.has(clean.toLowerCase()) && /^[A-ZÁÉÍÓÚÜÑ]/.test(w);
    });
    issues.push({ tipo: 'TITLE_CASE_ES', campo: 'title_es', valor: g.title_es, detalle: 'Comunes capitalizadas: ' + words.join(', ') });
  }

  if (g.metaDesc_es && g.metaDesc_es.length > 155) {
    issues.push({ tipo: 'META_DESC_LARGA', campo: 'metaDesc_es', valor: g.metaDesc_es, detalle: g.metaDesc_es.length + ' chars' });
  }

  if (g.sections) {
    g.sections.forEach((s, si) => {
      if (s.heading_es && hasRealTitleCase(s.heading_es)) {
        const words = s.heading_es.split(' ').filter(w => {
          const clean = w.replace(/[^a-záéíóúüñ0-9]/gi, '');
          return clean.length > 2 && ES_COMMON.has(clean.toLowerCase()) && /^[A-ZÁÉÍÓÚÜÑ]/.test(w);
        });
        issues.push({ tipo: 'HEADING_TITLE_CASE', campo: 'sections[' + si + '].heading_es', valor: s.heading_es, detalle: 'Comunes capitalizadas: ' + words.join(', ') });
      }
      if (s.content_es) {
        findCalcos(s.content_es).forEach(c => issues.push({ tipo: 'CALCO_CONTENT', campo: 'sections[' + si + '].content_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
      }
    });
  }

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
console.log('║  AUDITORÍA PROFUNDA v5 - topmusiciangear                      ║');
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
lines.push('AUDITORÍA PROFUNDA v5 - ' + new Date().toISOString());
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
fs.writeFileSync(B + 'temp/audit_profundo_v5.txt', lines.join('\n'), 'utf8');
console.log('\nReporte detallado: temp/audit_profundo_v5.txt');
