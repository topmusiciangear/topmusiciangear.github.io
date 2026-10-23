const fs = require('fs');
const path = require('path');

const GUIDES_DIR = 'C:/Users/Daniel/projects/topmusiciangear/guides';
const DATA_DIR = 'C:/Users/Daniel/projects/topmusiciangear/data';

function loadGuides() {
  const guidesPath = path.join(DATA_DIR, 'guides.json');
  const content = fs.readFileSync(guidesPath, 'utf8');
  return JSON.parse(content);
}

function loadProducts() {
  const productsPath = path.join(DATA_DIR, 'products.json');
  const content = fs.readFileSync(productsPath, 'utf8');
  return JSON.parse(content);
}

const guides = loadGuides();
const products = loadProducts();

console.log('Total guías:', guides.length);
console.log('Total productos:', products.length);

// ============================================
// AUDIT 1: DETECTAR PLANTILLAS DE TÍTULOS
// ============================================
function auditTitleTemplates() {
  console.log('\n=== AUDIT 1: PLANTILLAS DE TÍTULOS ===');
  const patterns = {};
  
  guides.forEach(g => {
    if (g.sections) {
      g.sections.forEach(s => {
        if (s.heading_es) {
          // Detectar patrones comunes
          const normalized = s.heading_es
            .replace(/[A-Z][a-z]+ [A-Z][a-z]+/g, '[PRODUCTO]')
            .replace(/\d+/g, '[NUM]');
          patterns[normalized] = (patterns[normalized] || 0) + 1;
        }
      });
    }
  });
  
  const sorted = Object.entries(patterns)
    .filter(([,count]) => count > 1)
    .sort((a,b) => b[1] - a[1])
    .slice(0, 20);
  
  console.log('Patrones de título repetidos (>1 ocurrencia):');
  sorted.forEach(([pattern, count]) => {
    console.log(`  ${count}x: ${pattern}`);
  });
}

// ============================================
// AUDIT 2: FRASES HECHAS / CLICHÉS EN ESPAÑOL
// ============================================
const SPANISH_CLICHES = [
  'sin pensarlo dos veces',
  'cabe en cualquier sitio',
  'nada más sacarlo de la caja',
  'de salida',
  'a la altura del oído',
  'va sobre tu escritorio',
  'monitoreo serio',
  'usando en su lugar',
  'según la colocación',
  'nearfield',
  'se vuelven retumbantes', // ya corregido
  'bajos bajos', // ya corregido
  'game changer',
  'next level',
  'state of the art',
  'cutting edge',
  'best in class',
  'top tier',
  'game-changing',
  'revolutionary',
  'unprecedented',
  'seamless',
  'effortless',
  'unmatched',
  'unparalleled',
  'industry-leading',
  'world-class',
  'premium quality',
  'exceptional performance',
  'superior sound',
  'crystal clear',
  'rich and detailed',
  'punchy bass',
  'crisp highs',
  'warm mids',
  'tight bass',
  'wide soundstage',
  'pinpoint imaging',
  'transparent sound',
  'musical and engaging',
  'fatigue-free listening',
  'professional grade',
  'studio quality',
  'audiophile grade',
  'reference level',
  'best bang for your buck',
  'bang for the buck',
  'value for money',
  'no-brainer',
  'hands down',
  'hands-down',
  'stands out',
  'truly exceptional',
  'simply put',
  'at the end of the day',
  'when it comes to',
  'in terms of',
  'as far as',
  'so to speak',
  'per se',
  'so-called',
  'if you will',
  'so to say',
  'kind of',
  'sort of',
  'more or less',
  'basically',
  'essentially',
  'fundamentally',
  'ultimately',
  'in essence',
  'in short',
  'long story short',
  'bottom line',
  'the bottom line is',
  'the fact of the matter is',
  'needless to say',
  'it goes without saying',
  'as a matter of fact',
  'as it turns out',
  'as it happens',
  'as luck would have it',
  'believe it or not',
  'surprisingly',
  'remarkably',
  'notably',
  'importantly',
  'significantly',
  'substantially',
  'considerably',
  'dramatically',
  'exponentially',
  'massively',
  'tremendously',
  'immensely',
  'vastly',
  'profoundly',
  'deeply',
  'thoroughly',
  'completely',
  'entirely',
  'totally',
  'absolutely',
  'perfectly',
  'ideally',
  'optimally',
  'seamlessly',
  'effortlessly',
  'flawlessly',
  'perfectly',
  'ideally'
];

function auditSpanishCliches() {
  console.log('\n=== AUDIT 2: CLICHÉS EN ESPAÑOL ===');
  let totalIssues = 0;
  
  guides.forEach(g => {
    if (g.sections) {
      g.sections.forEach(s => {
        if (s.content_es) {
          SPANISH_CLICHES.forEach(cliche => {
            const regex = new RegExp(cliche.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            const matches = s.content_es.match(regex);
            if (matches) {
              totalIssues += matches.length;
              console.log(`  "${cliche}" (${matches.length}x) en guía ${g.id} - sección: ${s.heading_es}`);
            }
          });
        }
      });
    }
    // FAQs
    if (g.faq) {
      g.faq.forEach(f => {
        if (f.a_es) {
          SPANISH_CLICHES.forEach(cliche => {
            const regex = new RegExp(cliche.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            const matches = f.a_es.match(regex);
            if (matches) {
              totalIssues += matches.length;
              console.log(`  "${cliche}" (${matches.length}x) en FAQ de ${g.id}: ${f.q_es?.substring(0,50)}`);
            }
          });
        }
      });
    }
    // Conclusion
    if (g.conclusion_es) {
      SPANISH_CLICHES.forEach(cliche => {
        const regex = new RegExp(cliche.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        const matches = g.conclusion_es.match(regex);
        if (matches) {
          totalIssues += matches.length;
          console.log(`  "${cliche}" (${matches.length}x) en conclusion de ${g.id}`);
        }
      });
    }
    // Verdict
    if (g.verdict_es) {
      SPANISH_CLICHES.forEach(cliche => {
        const regex = new RegExp(cliche.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        const matches = g.verdict_es.match(regex);
        if (matches) {
          totalIssues += matches.length;
          console.log(`  "${cliche}" (${matches.length}x) en verdict de ${g.id}`);
        }
      });
    }
  });
  
  console.log(`Total clichés encontrados: ${totalIssues}`);
}

// ============================================
// AUDIT 3: PALABRAS DUPLICADAS CONSECUTIVAS
// ============================================
function auditDuplicateWords() {
  console.log('\n=== AUDIT 3: PALABRAS DUPLICADAS CONSECUTIVAS ===');
  let totalIssues = 0;
  
  guides.forEach(g => {
    const checkText = (text, context) => {
      if (!text) return;
      const words = text.toLowerCase().match(/\b\w+\b/g);
      if (!words) return;
      for (let i = 1; i < words.length; i++) {
        if (words[i] === words[i-1] && words[i].length > 2) {
          totalIssues++;
          console.log(`  "${words[i]} ${words[i]}" en ${context}`);
        }
      }
    };
    
    if (g.sections) {
      g.sections.forEach(s => {
        if (s.content_es) checkText(s.content_es, `guía ${g.id} sección ${s.heading_es}`);
        if (s.content) checkText(s.content, `guía ${g.id} sección ${s.heading} (EN)`);
      });
    }
    if (g.conclusion_es) checkText(g.conclusion_es, `conclusion ${g.id} (ES)`);
    if (g.conclusion) checkText(g.conclusion, `conclusion ${g.id} (EN)`);
    if (g.verdict_es) checkText(g.verdict_es, `verdict ${g.id} (ES)`);
    if (g.verdict) checkText(g.verdict, `verdict ${g.id} (EN)`);
    if (g.faq) {
      g.faq.forEach(f => {
        if (f.a_es) checkText(f.a_es, `FAQ ${g.id} ${f.q_es?.substring(0,30)} (ES)`);
        if (f.a) checkText(f.a, `FAQ ${g.id} ${f.q?.substring(0,30)} (EN)`);
      });
    }
  });
  console.log(`Total palabras duplicadas: ${totalIssues}`);
}

// ============================================
// AUDIT 4: TÍTULOS DE SECCIÓN IDÉNTICOS
// ============================================
function auditIdenticalSectionTitles() {
  console.log('\n=== AUDIT 4: TÍTULOS DE SECCIÓN IDÉNTICOS/PLANTILLA ===');
  
  guides.forEach(g => {
    if (g.sections && g.sections.length > 3) {
      const titlesEs = g.sections.map(s => s.heading_es).filter(Boolean);
      const titlesEn = g.sections.map(s => s.heading).filter(Boolean);
      
      // Verificar si todos siguen el mismo patrón
      const uniqueEs = [...new Set(titlesEs)];
      const uniqueEn = [...new Set(titlesEn)];
      
      if (titlesEs.length > 5 && uniqueEs.length <= 2) {
        console.log(`  ⚠️ Guía ${g.id}: Solo ${uniqueEs.length} títulos únicos de ${titlesEs.length} secciones (ES)`);
        console.log(`    Títulos: ${uniqueEs.join(' | ')}`);
      }
      if (titlesEn.length > 5 && uniqueEn.length <= 2) {
        console.log(`  ⚠️ Guía ${g.id}: Solo ${uniqueEn.length} títulos únicos de ${titlesEn.length} secciones (EN)`);
        console.log(`    Títulos: ${uniqueEn.join(' | ')}`);
      }
      
      // Detectar patrón "¿Es el X el mejor...?"
      const patternCountEs = titlesEs.filter(t => t && t.match(/^¿Es el .* el mejor/)).length;
      const patternCountEn = titlesEn.filter(t => t && t.match(/^Is the .* the best/)).length;
      
      if (patternCountEs > 2) {
        console.log(`  ⚠️ Guía ${g.id}: ${patternCountEs} secciones con patrón "¿Es el X el mejor...?" (ES)`);
      }
      if (patternCountEn > 2) {
        console.log(`  ⚠️ Guía ${g.id}: ${patternCountEn} secciones con patrón "Is the X the best...?" (EN)`);
      }
    }
  });
}

// ============================================
// AUDIT 5: PRECISIÓN FACTUAL - VERIFICAR PRODUCTOS
// ============================================
function auditProductAccuracy() {
  console.log('\n=== AUDIT 5: PRECISIÓN FACTUAL DE PRODUCTOS ===');
  
  const productsById = {};
  products.forEach(p => { productsById[p.id] = p; });
  
  guides.forEach(g => {
    if (g.featuredProducts) {
      g.featuredProducts.forEach(pid => {
        const product = productsById[pid];
        if (!product) {
          console.log(`  ⚠️ Guía ${g.id}: Producto ID ${pid} no existe en products.json`);
        } else {
          // Verificar que el nombre coincide en sections/verdict
          if (g.verdictProsCons) {
            const vc = g.verdictProsCons.find(v => v.name === product.title || v.name_es === product.title_es);
            if (!vc) {
              console.log(`  ⚠️ Guía ${g.id}: Producto ${product.title} (id ${pid}) no está en verdictProsCons`);
            }
          }
        }
      });
    }
  });
}

// ============================================
// AUDIT 6: INGLÉS - CLICHÉS Y CALIDAD
// ============================================
const ENGLISH_CLICHES = [
  'game changer', 'next level', 'state of the art', 'cutting edge',
  'best in class', 'top tier', 'game-changing', 'revolutionary',
  'unprecedented', 'seamless', 'effortless', 'unmatched', 'unparalleled',
  'industry-leading', 'world-class', 'premium quality', 'exceptional performance',
  'superior sound', 'crystal clear', 'rich and detailed', 'punchy bass',
  'crisp highs', 'warm mids', 'tight bass', 'wide soundstage',
  'pinpoint imaging', 'transparent sound', 'musical and engaging',
  'fatigue-free listening', 'professional grade', 'studio quality',
  'audiophile grade', 'reference level', 'bang for your buck',
  'value for money', 'no-brainer', 'hands down', 'stands out',
  'truly exceptional', 'simply put', 'at the end of the day',
  'when it comes to', 'in terms of', 'needless to say',
  'it goes without saying', 'as a matter of fact', 'believe it or not',
  'surprisingly', 'remarkably', 'notably', 'importantly',
  'significantly', 'substantially', 'considerably', 'dramatically',
  'exponentially', 'massively', 'tremendously', 'immensely',
  'vastly', 'profoundly', 'deeply', 'thoroughly', 'completely',
  'entirely', 'totally', 'absolutely', 'perfectly', 'ideally',
  'optimally', 'seamlessly', 'effortlessly', 'flawlessly'
];

function auditEnglishCliches() {
  console.log('\n=== AUDIT 6: CLICHÉS EN INGLÉS ===');
  let totalIssues = 0;
  
  guides.forEach(g => {
    if (g.sections) {
      g.sections.forEach(s => {
        if (s.content) {
          ENGLISH_CLICHES.forEach(cliche => {
            const regex = new RegExp(cliche.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            const matches = s.content.match(regex);
            if (matches) {
              totalIssues += matches.length;
              console.log(`  "${cliche}" (${matches.length}x) en guía ${g.id} - sección: ${s.heading}`);
            }
          });
        }
      });
    }
    if (g.faq) {
      g.faq.forEach(f => {
        if (f.a) {
          ENGLISH_CLICHES.forEach(cliche => {
            const regex = new RegExp(cliche.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            const matches = f.a.match(regex);
            if (matches) {
              totalIssues += matches.length;
              console.log(`  "${cliche}" (${matches.length}x) en FAQ de ${g.id}: ${f.q?.substring(0,50)}`);
            }
          });
        }
      });
    }
    if (g.conclusion) {
      ENGLISH_CLICHES.forEach(cliche => {
        const regex = new RegExp(cliche.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        const matches = g.conclusion.match(regex);
        if (matches) {
          totalIssues += matches.length;
          console.log(`  "${cliche}" (${matches.length}x) en conclusion de ${g.id}`);
        }
      });
    }
    if (g.verdict) {
      ENGLISH_CLICHES.forEach(cliche => {
        const regex = new RegExp(cliche.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        const matches = g.verdict.match(regex);
        if (matches) {
          totalIssues += matches.length;
          console.log(`  "${cliche}" (${matches.length}x) en verdict de ${g.id}`);
        }
      });
    }
  });
  
  console.log(`Total clichés EN encontrados: ${totalIssues}`);
}

// ============================================
// AUDIT 7: ESTRUCTURA DE FAQs REPETITIVA
// ============================================
function auditFAQPatterns() {
  console.log('\n=== AUDIT 7: PATRONES DE FAQ REPETITIVOS ===');
  
  const questionPatterns = {};
  
  guides.forEach(g => {
    if (g.faq) {
      g.faq.forEach(f => {
        if (f.q_es) {
          // Normalizar pregunta
          const normalized = f.q_es
            .toLowerCase()
            .replace(/[áéíóúüñ]/g, c => ({'á':'a','é':'e','í':'i','ó':'o','ú':'u','ü':'u','ñ':'n'}[c]))
            .replace(/[¿?]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
          const pattern = normalized
            .replace(/[a-z]+ [a-z]+/g, '[PRODUCTO]')
            .replace(/\d+/g, '[NUM]')
            .substring(0, 60);
          questionPatterns[pattern] = (questionPatterns[pattern] || 0) + 1;
        }
      });
    }
  });
  
  const sorted = Object.entries(questionPatterns)
    .filter(([,count]) => count > 2)
    .sort((a,b) => b[1] - a[1])
    .slice(0, 15);
  
  console.log('Patrones de pregunta FAQ repetidos (>2):');
  sorted.forEach(([pattern, count]) => {
    console.log(`  ${count}x: ${pattern}...`);
  });
}

// ============================================
// AUDIT 8: VERIFICAR ESPECIFICACIONES TÉCNICAS
// ============================================
function auditTechnicalSpecs() {
  console.log('\n=== AUDIT 8: ESPECIFICACIONES TÉCNICAS EN TABLAS ===');
  
  guides.forEach(g => {
    if (g.productTable && g.productTable.rows) {
      g.productTable.rows.forEach((row, rowIdx) => {
        if (row.values) {
          row.values.forEach((val, colIdx) => {
            if (val.value_es) {
              // Buscar inconsistencias comunes
              const text = val.value_es;
              
              // Detectar "N/D" o "N/A" en español
              if (text === 'N/D' || text === 'N/A') {
                console.log(`  ⚠️ Guía ${g.id} fila ${rowIdx} col: "${text}" - usar "No especificado" en ES`);
              }
              
              // Detectar unidades en inglés en ES
              if (text.match(/\d+\s*(inch|inches|feet|ft|lb|lbs|oz|Watt|Watts|Hz|kHz|MHz|GHz|dB|dB)/i)) {
                console.log(`  ⚠️ Guía ${g.id} fila ${rowIdx} col: unidades en inglés: "${text}"`);
              }
              
              // Detectar "Class A/B" en ES (debe ser "Clase AB")
              if (text.match(/Class\s+[A-Z]/i)) {
                console.log(`  ⚠️ Guía ${g.id} fila ${rowIdx} col: "Class" en inglés: "${text}"`);
              }
            }
          });
        }
      });
    }
  });
}

// ============================================
// EJECUTAR TODOS LOS AUDITS
// ============================================
console.log('═══════════════════════════════════════════');
console.log('AUDITORÍA PROFUNDA COMPLETA - 334 GUÍAS');
console.log('═══════════════════════════════════════════');

auditTitleTemplates();
auditSpanishCliches();
auditDuplicateWords();
auditIdenticalSectionTitles();
auditProductAccuracy();
auditEnglishCliches();
auditFAQPatterns();
auditTechnicalSpecs();

console.log('\n═══════════════════════════════════════════');
console.log('AUDITORÍA COMPLETADA');
console.log('═══════════════════════════════════════════');