const fs = require('fs');

const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const productMap = new Map(products.map(p => [p.id, p]));

console.log('=== DEEP AUDIT START ===\n');
console.log(`Products: ${products.length}`);
console.log(`Guides: ${guides.length}\n`);

// 1. CHECK PRODUCT CARD DATA QUALITY
console.log('--- 1. PRODUCT CARD DATA ISSUES ---\n');

const issues = [];

products.forEach(p => {
  // Missing critical fields
  if (!p.title || !p.title_es) issues.push({id: p.id, type: 'MISSING_TITLE', field: !p.title ? 'title' : 'title_es'});
  if (!p.desc || !p.desc_es) issues.push({id: p.id, type: 'MISSING_DESC', field: !p.desc ? 'desc' : 'desc_es'});
  if (!p.img) issues.push({id: p.id, type: 'MISSING_IMG'});
  if (!p.stores || Object.keys(p.stores).length === 0) issues.push({id: p.id, type: 'MISSING_STORES'});
  if (!p.price || p.price <= 0) issues.push({id: p.id, type: 'INVALID_PRICE', value: p.price});
  
  // Check for obvious copy-paste errors in desc_es
  if (p.desc_es && p.desc) {
    // English text in Spanish field
    const enWords = ['the', 'and', 'with', 'for', 'from', 'this', 'that', 'your', 'has', 'are', 'you', 'will', 'can', 'but', 'not', 'all', 'any', 'our', 'its', 'have'];
    const esWords = ['el', 'la', 'los', 'las', 'de', 'en', 'con', 'para', 'por', 'que', 'es', 'un', 'una', 'del', 'al', 'y', 'o', 'su', 'sus'];
    const descEsWords = p.desc_es.toLowerCase().split(/\s+/);
    const enCount = descEsWords.filter(w => enWords.includes(w)).length;
    if (enCount > 3) issues.push({id: p.id, type: 'EN_IN_ES_DESC', count: enCount, sample: p.desc_es.slice(0,100)});
    
    // Same text in both fields
    if (p.desc === p.desc_es) issues.push({id: p.id, type: 'IDENTICAL_DESC'});
  }
  
  // Price formatting issues
  if (p.price && p.price > 999) {
    const priceStr = p.price.toString();
    if (!priceStr.includes(',')) issues.push({id: p.id, type: 'NO_THOUSANDS_SEP', price: p.price});
  }
  
  // Store URL patterns
  if (p.stores) {
    Object.entries(p.stores).forEach(([store, url]) => {
      if (!url || typeof url !== 'string') return;
      if (store === 'amazon' && !url.includes('/dp/') && !url.includes('/gp/product/') && !url.includes('/s?k=')) {
        issues.push({id: p.id, type: 'SUSPICIOUS_AMAZON_URL', url: url.slice(0,80)});
      }
      if (store === 'zzounds' && !url.includes('zzounds.com')) {
        issues.push({id: p.id, type: 'SUSPICIOUS_ZZOUNDS_URL', url: url.slice(0,80)});
      }
      if (store === 'andertons' && !url.includes('andertons')) {
        issues.push({id: p.id, type: 'SUSPICIOUS_ANDERTONS_URL', url: url.slice(0,80)});
      }
      if (store === 'musicstore' && !url.includes('musicstore.com')) {
        issues.push({id: p.id, type: 'SUSPICIOUS_MUSICSTORE_URL', url: url.slice(0,80)});
      }
      if (store === 'gear4music' && !url.includes('gear4music.com')) {
        issues.push({id: p.id, type: 'SUSPICIOUS_G4M_URL', url: url.slice(0,80)});
      }
    });
  }
  
  // Check for common Spanish errors
  if (p.desc_es) {
    const errors = [
      {pattern: /\bvia\b/, fix: 'vía'},
      {pattern: /\bgrabacion\b/, fix: 'grabación'},
      {pattern: /\btambien\b/, fix: 'también'},
      {pattern: /\bconexion\b/, fix: 'conexión'},
      {pattern: /\bopcion\b/, fix: 'opción'},
      {pattern: /\binformacion\b/, fix: 'información'},
      {pattern: /\bsolucion\b/, fix: 'solución'},
      {pattern: /\bversion\b(?!\?)/, fix: 'versión'}, // not version number
      {pattern: /\bcondicion\b/, fix: 'condición'},
      {pattern: /\brazon\b/, fix: 'razón'},
      {pattern: /\bfuncion\b/, fix: 'función'},
      {pattern: /\baplicacion\b/, fix: 'aplicación'},
      {pattern: /\bconfiguracion\b/, fix: 'configuración'},
      {pattern: /\bseleccion\b/, fix: 'selección'},
      {pattern: /\bdescripcion\b/, fix: 'descripción'},
      {pattern: /\bcancelacion\b/, fix: 'cancelación'},
      {pattern: /\ba un DAW\b/, fix: 'en un DAW'},
      {pattern: /\ba un Mac\b/, fix: 'en un Mac'},
      {pattern: /\ba un iPad\b/, fix: 'en un iPad'},
      {pattern: /\bes el mejor para\b/, fix: 'es ideal para'},
    ];
    
    errors.forEach(e => {
      if (e.pattern.test(p.desc_es)) {
        issues.push({id: p.id, type: 'ES_TYPO', pattern: e.pattern.toString(), fix: e.fix, context: p.desc_es.slice(0,100)});
      }
    });
  }
});

console.log(`Total product issues found: ${issues.length}`);
const byType = {};
issues.forEach(i => { byType[i.type] = (byType[i.type] || 0) + 1; });
Object.entries(byType).sort((a,b) => b[1]-a[1]).forEach(([k,v]) => console.log(`  ${k}: ${v}`));

// Show first 20 issues
console.log('\nFirst 20 issues:');
issues.slice(0,20).forEach(i => {
  const p = productMap.get(i.id);
  console.log(`  ID ${i.id} (${p?.title || 'unknown'}): ${i.type} ${i.field ? '('+i.field+')' : ''} ${i.url ? 'URL: '+i.url : ''} ${i.context ? '| '+i.context : ''}`);
});

// 2. CHECK GUIDE TEXTS FOR LITERAL TRANSLATIONS
console.log('\n--- 2. GUIDE SPANISH NATURALNESS ---\n');

const guideIssues = [];
const literalPatterns = [
  {pattern: /\bvia\b/, fix: 'vía', desc: 'literal "via"'},
  {pattern: /\bvia USB\b/, fix: 'vía USB', desc: 'literal "via USB"'},
  {pattern: /\bvia Bluetooth\b/, fix: 'vía Bluetooth', desc: 'literal "via Bluetooth"'},
  {pattern: /\ba un DAW\b/, fix: 'en un DAW', desc: 'literal "to a DAW"'},
  {pattern: /\ba un Mac\b/, fix: 'en un Mac', desc: 'literal "to a Mac"'},
  {pattern: /\ba un iPad\b/, fix: 'en un iPad', desc: 'literal "to an iPad"'},
  {pattern: /\ba un ordenador\b/, fix: 'en un ordenador', desc: 'literal "to a computer"'},
  {pattern: /\bes el mejor para\b/, fix: 'es ideal para', desc: 'literal "is the best for"'},
  {pattern: /\bes la mejor\b/, fix: 'es la mejor opción', desc: 'literal "is the best"'},
  {pattern: /\btiene que\b/, fix: 'debe', desc: 'literal "has to"'},
  {pattern: /\bnecesita\b.*\bpara\b/, fix: 'requiere', desc: 'literal "needs to"'},
  {pattern: /\bgratis\b/, fix: 'gratuito', desc: 'colloquial "gratis"'},
  {pattern: /\bbolo\b/, fix: 'concierto/presentación', desc: 'colloquial "bolo"'},
  {pattern: /\bbolos\b/, fix: 'conciertos/presentaciones', desc: 'colloquial "bolos"'},
  {pattern: /\brig\b/, fix: 'sistema/equipo', desc: 'anglicism "rig"'},
  {pattern: /\brigs\b/, fix: 'sistemas/equipos', desc: 'anglicism "rigs"'},
  {pattern: /\bworkflow\b/, fix: 'flujo de trabajo', desc: 'anglicism "workflow"'},
  {pattern: /\bsetup\b/, fix: 'configuración/montaje', desc: 'anglicism "setup"'},
  {pattern: /\bgear\b/, fix: 'equipo', desc: 'anglicism "gear"'},
  {pattern: /\bplug-and-play\b/, fix: 'conectar y usar', desc: 'anglicism "plug-and-play"'},
  {pattern: /\bbest\s+\w+\s+for\b/, fix: 'mejor para', desc: 'anglicism structure'},
  {pattern: /\bunder\s+\$\d+/i, fix: 'menos de $', desc: 'anglicism "under $X"'},
  {pattern: /\bplug in\b/, fix: 'conectar', desc: 'literal "plug in"'},
  {pattern: /\bhook up\b/, fix: 'conectar', desc: 'literal "hook up"'},
  {pattern: /\bdeal\b/, fix: 'oferta/opción', desc: 'anglicism "deal"'},
  {pattern: /\bgame changer\b/, fix: 'cambio radical', desc: 'anglicism "game changer"'},
  {pattern: /\bstands out\b/, fix: 'destaca', desc: 'literal "stands out"'},
  {pattern: /\bgo for\b/, fix: 'elige', desc: 'literal "go for"'},
  {pattern: /\bcheck out\b/, fix: 'revisa', desc: 'literal "check out"'},
  {pattern: /\bcome with\b/, fix: 'incluye', desc: 'literal "come with"'},
  {pattern: /\bmiss out\b/, fix: 'perderte', desc: 'literal "miss out"'},
];

guides.forEach(g => {
  const checkText = (text, field) => {
    if (!text) return;
    literalPatterns.forEach(lp => {
      const matches = text.match(lp.pattern);
      if (matches) {
        guideIssues.push({
          guide: g.id,
          field,
          pattern: lp.desc,
          match: matches[0],
          context: text.slice(Math.max(0, text.indexOf(matches[0])-50), text.indexOf(matches[0])+80)
        });
      }
    });
  };
  
  checkText(g.intro_es, 'intro_es');
  checkText(g.conclusion_es, 'conclusion_es');
  checkText(g.verdict_es, 'verdict_es');
  
  (g.sections || []).forEach((s, i) => {
    checkText(s.content_es, `section[${i}].content_es`);
    checkText(s.heading_es, `section[${i}].heading_es`);
  });
  
  // FAQ
  if (g.featuredSnippet) {
    for (let i = 1; i <= 8; i++) {
      checkText(g.featuredSnippet[`faq_a${i}_es`], `faq_a${i}_es`);
    }
  }
  if (g.faq) {
    g.faq.forEach((f, i) => {
      checkText(f.a_es, `faq[${i}].a_es`);
      checkText(f.q_es, `faq[${i}].q_es`);
    });
  }
});

console.log(`Guide Spanish issues: ${guideIssues.length}`);
const giByPattern = {};
guideIssues.forEach(i => { giByPattern[i.pattern] = (giByPattern[i.pattern] || 0) + 1; });
Object.entries(giByPattern).sort((a,b) => b[1]-a[1]).slice(0,30).forEach(([k,v]) => console.log(`  ${k}: ${v}`));

// 3. READING TIME AUDIT
console.log('\n--- 3. READING TIME CHECK ---\n');

function calcReadingTime(texts) {
  const html = texts.join(' ');
  const text = html.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/g, ' ').replace(/[0-9.,$%]+/g, 'X');
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  return Math.max(1, Math.round(words / 180));
}

guides.forEach(g => {
  // EN
  const enTexts = [g.intro].filter(Boolean);
  g.sections?.forEach(s => enTexts.push(s.content));
  enTexts.push(g.conclusion, g.verdict);
  g.productTable?.rows?.forEach(r => r.values?.forEach(v => enTexts.push(v.value)));
  g.verdictProsCons?.forEach(v => { enTexts.push(...v.pros, ...v.cons); });
  const enTime = calcReadingTime(enTexts);
  
  // ES
  const esTexts = [g.intro_es].filter(Boolean);
  g.sections?.forEach(s => esTexts.push(s.content_es));
  esTexts.push(g.conclusion_es, g.verdict_es);
  g.productTable?.rows?.forEach(r => r.values?.forEach(v => esTexts.push(v.value_es)));
  g.verdictProsCons?.forEach(v => { esTexts.push(...v.pros_es, ...v.cons_es); });
  const esTime = calcReadingTime(esTexts);
  
  if (enTime < 3 || esTime < 3) {
    console.log(`  LOW READ TIME: ${g.id} EN=${enTime}min ES=${esTime}min`);
  }
  if (enTime > 45 || esTime > 45) {
    console.log(`  HIGH READ TIME: ${g.id} EN=${enTime}min ES=${esTime}min`);
  }
});

// 4. PRODUCT IN GUIDE VALIDATION
console.log('\n--- 4. PRODUCT REFERENCE VALIDATION ---\n');

let refIssues = 0;
guides.forEach(g => {
  const allRefs = [
    ...(g.products || []),
    ...(g.sections || []).flatMap(s => s.products || []),
    ...(g.featuredProducts || []),
    ...(g.productTable?.columns?.map(c => c.id) || []),
    ...(g.verdictProsCons?.map(v => v.id) || []),
  ];
  
  allRefs.forEach(id => {
    if (!productMap.has(id)) {
      console.log(`  MISSING PRODUCT: Guide ${g.id} references product ${id}`);
      refIssues++;
    }
  });
  
  // Check verdictProsCons names match products
  (g.verdictProsCons || []).forEach(v => {
    const pid = v.id;
    if (pid && productMap.has(pid)) {
      const prod = productMap.get(pid);
      const nameMatch = (v.name && v.name.toLowerCase() === prod.title.toLowerCase()) || 
                        (v.name_es && v.name_es.toLowerCase() === prod.title_es.toLowerCase());
      if (!nameMatch) {
        console.log(`  NAME MISMATCH: Guide ${g.id} verdict "${v.name}" vs product "${prod.title}"`);
        refIssues++;
      }
    }
  });
});

console.log(`Total reference issues: ${refIssues}`);

// 5. TABLE CONSISTENCY CHECK
console.log('\n--- 5. PRODUCT TABLE CONSISTENCY ---\n');

guides.forEach(g => {
  if (!g.productTable) return;
  const cols = g.productTable.columns.length;
  g.productTable.rows.forEach((row, ri) => {
    row.values.forEach((v, ci) => {
      if (ci >= cols) {
        console.log(`  EXTRA COLUMN: Guide ${g.id} row ${ri} has ${row.values.length} values but only ${cols} columns`);
      }
    });
    if (row.values.length !== cols) {
      console.log(`  COLUMN MISMATCH: Guide ${g.id} row ${ri} has ${row.values.length} values vs ${cols} columns`);
    }
  });
});

// 6. DUPLICATE PRODUCTS IN GUIDE
console.log('\n--- 6. DUPLICATE PRODUCTS IN GUIDES ---\n');

guides.forEach(g => {
  const allRefs = [
    ...(g.products || []),
    ...(g.sections || []).flatMap(s => s.products || []),
    ...(g.featuredProducts || []),
  ];
  const seen = new Set();
  allRefs.forEach(id => {
    if (seen.has(id)) {
      console.log(`  DUPLICATE: Guide ${g.id} has product ${id} multiple times`);
    }
    seen.add(id);
  });
});

console.log('\n=== AUDIT COMPLETE ===');