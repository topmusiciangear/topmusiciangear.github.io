// AUDITORÍA PROFUNDA - v2: enfoque preciso para detectar calcos e idiomas colados
const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';

const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));

// Calcos EN->ES detectados (frases que suenan a traducción literal)
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
  { en: 'atrás', es: 'en el panel trasero' },
  { en: 'sweet spot', es: 'punto ideal' }
];

// Palabras EN inequívocas que NO deberían aparecer en texto ES (sin HTML, sin jerga musical)
const EN_STRICT = [
  'the','and','with','for','your','you','are','is','was','were','has','have','had',
  'this','that','these','those','from','into','over','when','while','because','but',
  'can','will','would','should','could','than','then','there','here','what','which',
  'how','why','our','ours','we','its','it','dont','doesnt','didnt','wont','cant','isnt','arent',
  'youre','youll','youve','were','weve','they','them','their','theirs','about','after',
  'before','between','through','without','within','both','each','every','more','most',
  'best','better','worse','worth','buying','guide','guides','review','reviews','use',
  'using','used','need','needs','want','wants','get','gets','make','makes','made',
  'take','takes','come','comes','give','gives','also','just','only','very','much',
  'many','few','less','least','own','same','other','others','another','such','still',
  'yet','again','once','since','until','unless','whether','either','neither','nor',
  'off','out','up','down','if','not','do','does','did','doing','done','being','been',
  'am','who','whom','whose','where','lets','hes','shes','his','her','him',
  'click','click here','read more','learn more','buy now','check out','visit us',
  'contact us','about us','home page','blog post','news letter','sign up','log in',
  'log out','sign out','subscribe','unsubscribe','privacy policy','terms of service',
  'cookie policy','all rights reserved','copyright','trademark','registered',
  'patent','pending','licensed','authorized','official','genuine','original',
  'brand new','used','refurbished','open box','clearance','sale','discount',
  'coupon','promo code','free shipping','fast delivery','customer service',
  'support','help','faq','contact','address','phone','email','website',
  'monday','tuesday','wednesday','thursday','friday','saturday','sunday',
  'january','february','march','april','may','june','july','august','september',
  'october','november','december','jan','feb','mar','apr','jun','jul','aug','sep',
  'oct','nov','dec','am','pm','est','pst','gmt','utc','bst','cet','eet',
  'click','tap','swipe','scroll','drag','drop','hover','clickable','tappable',
  'desktop','mobile','tablet','laptop','computer','mac','windows','android',
  'ios','iphone','ipad','macbook','imac','macbook pro','macbook air',
  'chrome','safari','firefox','edge','opera','browser','internet explorer',
  'app','application','software','hardware','firmware','driver','update',
  'upgrade','download','upload','install','uninstall','setup','configure',
  'settings','preferences','options','menu','toolbar','sidebar','header',
  'footer','navbar','breadcrumb','modal','popup','dialog','alert','notification',
  'badge','label','tag','button','link','anchor','href','src','target',
  'blank','self','parent','top','reload','refresh','back','forward','home',
  'search','filter','sort','pagination','page','next','prev','previous',
  'first','last','all','none','some','any','many','much','few','several',
  'both','either','neither','each','every','all','any','some','no','not',
  'yes','maybe','probably','possibly','certainly','definitely','absolutely',
  'really','quite','rather','pretty','fairly','extremely','incredibly',
  'amazing','awesome','fantastic','wonderful','terrible','horrible','awful',
  'good','bad','great','excellent','perfect','ideal','best','worst',
  'big','small','large','tiny','huge','enormous','massive','giant',
  'long','short','tall','wide','narrow','thick','thin','heavy','light',
  'fast','slow','quick','rapid','swift','speedy','immediate','instant',
  'easy','hard','difficult','simple','complex','complicated','straightforward',
  'clear','unclear','obvious','evident','apparent','visible','invisible',
  'new','old','young','ancient','modern','recent','current','latest',
  'first','second','third','fourth','fifth','last','final','ultimate',
  'primary','secondary','tertiary','main','major','minor','key','crucial',
  'vital','essential','necessary','required','optional','mandatory',
  'important','significant','relevant','irrelevant','useful','useless',
  'valuable','worthless','priceless','expensive','cheap','affordable',
  'costly','free','paid','premium','basic','standard','advanced',
  'beginner','intermediate','expert','professional','amateur','novice',
  'rookie','veteran','master','guru','specialist','generalist',
  'leader','follower','winner','loser','success','failure','victory',
  'defeat','triumph','disaster','crisis','problem','solution','answer',
  'question','issue','topic','subject','theme','concept','idea','thought',
  'opinion','view','perspective','angle','approach','method','technique',
  'strategy','tactic','plan','scheme','system','process','procedure',
  'step','stage','phase','level','degree','extent','scope','range',
  'variety','diversity','difference','similarity','resemblance',
  'comparison','contrast','comparison','comparison','relation','relationship',
  'connection','association','link','bond','tie','attachment',
  'detachment','separation','division','split','break','crack',
  'hole','gap','space','room','area','zone','region','territory',
  'domain','sphere','field','sector','district','neighborhood',
  'community','society','civilization','culture','tradition','custom',
  'habit','routine','practice','ceremony','ritual','celebration',
  'festival','holiday','vacation','trip','journey','voyage','travel',
  'tour','excursion','adventure','experience','event','occasion',
  'ceremony','party','celebration','gathering','meeting','conference',
  'seminar','workshop','class','course','lesson','lecture','tutorial',
  'training','education','school','university','college','academy',
  'institute','center','office','agency','company','business',
  'corporation','firm','enterprise','organization','institution',
  'establishment','foundation','fund','association','union',
  'league','alliance','partnership','coalition','federation',
  'confederation','network','web','grid','mesh','net',
  'array','list','series','sequence','chain','string','thread',
  'line','row','column','file','record','document','file',
  'folder','directory','database','spreadsheet','chart','graph',
  'table','diagram','map','plan','blueprint','design','pattern',
  'model','template','format','style','manner','way','mode',
  'form','shape','size','color','colour','texture','material',
  'substance','element','component','part','piece','bit','segment',
  'section','portion','fraction','percentage','ratio','rate',
  'proportion','scale','measure','metric','standard','norm',
  'rule','law','regulation','policy','guideline','principle',
  'theory','hypothesis','assumption','presumption','belief',
  'faith','trust','confidence','certainty','doubt','uncertainty',
  'question','inquiry','query','investigation','research',
  'study','analysis','evaluation','assessment','appraisal',
  'review','critique','commentary','observation','remark',
  'statement','declaration','announcement','proclamation',
  'notification','message','communication','correspondence',
  'letter','email','note','memo','report','record','account',
  'description','explanation','interpretation','definition',
  'meaning','sense','significance','importance','value',
  'merit','quality','character','nature','essence','spirit',
  'soul','heart','mind','brain','thought','idea','concept',
  'notion','belief','opinion','view','perspective','standpoint',
  'position','stance','attitude','approach','outlook','mindset',
  'mentality','psychology','mentality','personality','temperament',
  'disposition','character','nature','trait','feature','aspect',
  'element','factor','ingredient','detail','particular','point',
  'item','article','object','thing','stuff','matter','subject',
  'topic','theme','issue','matter','case','instance','example',
  'sample','specimen','model','pattern','template','example',
  'illustration','demonstration','display','exhibition','show',
  'presentation','performance','production','creation','work',
  'piece','composition','writing','text','document','paper',
  'article','essay','story','tale','narrative','account',
  'report','record','chronicle','history','biography','memoir',
  'autobiography','diary','journal','log','register','list',
  'catalog','directory','index','guide','manual','handbook',
  'textbook','primer','tutorial','lesson','chapter','section',
  'part','division','segment','portion','fraction','piece',
  'bit','fragment','slice','section','segment','part',
  'component','element','factor','aspect','feature','characteristic',
  'quality','attribute','property','trait','mark','sign',
  'symbol','token','emblem','badge','insignia','logo',
  'brand','name','title','label','heading','caption',
  'subtitle','heading','header','title','heading','heading'
];

// Palabras en español que se escriben igual o similar en inglés (no son calcos)
const ES_COGNATES = new Set([
  'música','música','electrónica','electronic','vivo','vivas','vivas',
  'produces','produce','producción','produccion','necesitas','necesitan',
  'herramientas','herramienta','potentes','potente','vista','sesión','sesion',
  'parece','parecen','ningún','otro','otra','permite','permiten',
  'lanzar','lanzan','clips','clips','tiempo','real','hacer','hacen',
  'loops','arreglos','arreglo','marcha','motor','warping','siendo','mejor',
  'industria','audio','convierte','daW','patio','juegos','infinito',
  'posibilidades','diseño','sonoro','innovadora','interpretación','interpretacion',
  'jam','sessions','estudio','generación','generacion','rápida','rapida',
  'ideas','ofrece','oferta','grabación','grabacion','tradicional','línea',
  'linea','cuando','necesitas','compra','suite','producer','edition',
  'haces','beats','hip','hop','quieres','actualizaciones','gratuitas',
  'vida','pian','roll','cualquier','proceso','basado','patrones',
  'revolucionó','revoluciono','creación','creacion','ampliamente',
  'considerado','ofreciendo','experiencia','fluida','programar',
  'baterías','baterias','melodías','melodias','política','politica',
  'actualizaciones','gratuitas','por','vida','con','el','mejor','de',
  'cualquier','daw','piano','roll','beat','beats','hip','hop','suites',
  'produccion','producciones','estudios','estudio','sesiones','sesion',
  'vistas','vista','arreglos','arreglo','patrones','patron','revoluciono',
  'revolucionó','ampliamente','considerado','ofreciendo','experiencia',
  'fluida','programar','baterias','melodias','politica','actualizaciones',
  'gratuitas','vida','cualquier','daw','piano','roll','beat','beats'
]);

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

function findEnStrict(text) {
  const found = [];
  const clean = stripHtml(text);
  const words = clean.match(/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+/g) || [];
  words.forEach(w => {
    const lw = w.toLowerCase();
    if (EN_STRICT.includes(lw) && !ES_COGNATES.has(lw)) {
      found.push(w);
    }
  });
  return found;
}

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

function auditGuide(g) {
  const issues = [];

  // TITLE_ES - Title Case
  if (g.title_es) {
    const words = g.title_es.split(' ');
    const capWords = words.filter(w => w.length > 2 && /^[A-ZÁÉÍÓÚÜÑ]/.test(w));
    if (capWords.length > 1) {
      issues.push({ tipo: 'TITLE_CASE_ES', campo: 'title_es', valor: g.title_es, detalle: 'Mayúsculas: ' + capWords.join(', ') });
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
        const capWords = s.heading_es.split(' ').filter(w => w.length > 2 && /^[A-ZÁÉÍÓÚÜÑ]/.test(w));
        if (capWords.length > 1) {
          issues.push({ tipo: 'HEADING_TITLE_CASE', campo: 'sections[' + si + '].heading_es', valor: s.heading_es, detalle: 'Mayúsculas: ' + capWords.join(', ') });
        }
        const calcos = findCalcos(s.heading_es);
        calcos.forEach(c => issues.push({ tipo: 'CALCO_HEADING', campo: 'sections[' + si + '].heading_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
      }
      if (s.content_es) {
        const enWords = findEnStrict(s.content_es);
        enWords.forEach(w => issues.push({ tipo: 'EN_COLADO', campo: 'sections[' + si + '].content_es', valor: w, detalle: stripHtml(s.content_es).slice(0, 80) }));
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

  if (g.conclusion_es) {
    const calcos = findCalcos(g.conclusion_es);
    calcos.forEach(c => issues.push({ tipo: 'CALCO_CONCLUSION', campo: 'conclusion_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
  }
  if (g.verdict_es) {
    const calcos = findCalcos(g.verdict_es);
    calcos.forEach(c => issues.push({ tipo: 'CALCO_VERDICT', campo: 'verdict_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
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
        const calcos = findCalcos(item);
        calcos.forEach(c => issues.push({ tipo: 'CALCO_PRO_CON', campo: 'verdictProsCons[' + vi + ']', valor: item, detalle: c.calco + ' → ' + c.sugerencia }));
      });
    });
  }

  if (g.featuredSnippet) {
    const fs_es = g.featuredSnippet;
    if (fs_es.text_es) {
      const calcos = findCalcos(fs_es.text_es);
      calcos.forEach(c => issues.push({ tipo: 'CALCO_FEATURED', campo: 'featuredSnippet.text_es', valor: c.calco, detalle: '→ ' + c.sugerencia }));
    }
    ['key1_es','key2_es','key3_es','key4_es','faq_a1_es','faq_a2_es','faq_a3_es','faq_a4_es','faq_a5_es'].forEach(k => {
      if (fs_es[k]) {
        const calcos = findCalcos(fs_es[k]);
        calcos.forEach(c => issues.push({ tipo: 'CALCO_FEATURED_' + k, campo: 'featuredSnippet.' + k, valor: c.calco, detalle: '→ ' + c.sugerencia }));
      }
    });
  }

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

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║  AUDITORÍA PROFUNDA v2 - topmusiciangear                      ║');
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
lines.push('AUDITORÍA PROFUNDA v2 - ' + new Date().toISOString());
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
fs.writeFileSync(B + 'temp/audit_profundo_v2.txt', lines.join('\n'), 'utf8');
console.log('\nReporte detallado: temp/audit_profundo_v2.txt');
