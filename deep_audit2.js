const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const issues = [];

// Spanish words that should NOT appear in English content
const spanishWords = [
  '¿', '¡', 'ñ', 'á', 'é', 'í', 'ó', 'ú',
  'previos', 'previo', 'mezcladores', 'mezclador', 'interfaz económica',
  'guía completa', 'mejores', 'mejor', 'para voces', 'en casa',
  'grabación', 'grabar', 'monitoreo', 'auriculares', 'altavoces',
  'conversión', 'clásico', 'clásica', 'también', 'además',
  'sin embargo', 'por lo tanto', 'por ejemplo', 'es decir',
  'a través', 'de acuerdo', 'de hecho', 'no obstante',
  'por eso', 'porque', 'entonces', 'mientras', 'aunque',
  'todavía', 'todavia', 'tambien', 'previo de tubo',
  'previo de consola', 'previo clásico', 'previo',
];

// Fields to check (English only)
const englishFields = ['intro', 'conclusion', 'verdict', 'description', 'title', 'titleTag'];

guides.forEach(g => {
  // Check top-level English fields
  englishFields.forEach(field => {
    const text = g[field];
    if (!text || typeof text !== 'string') return;
    spanishWords.forEach(word => {
      if (text.toLowerCase().includes(word.toLowerCase())) {
        issues.push({ guide: g.id, field: field, type: 'SPANISH_IN_ENGLISH', word: word, context: text.substring(Math.max(0, text.toLowerCase().indexOf(word.toLowerCase())-40), text.toLowerCase().indexOf(word.toLowerCase())+word.length+40) });
      }
    });
  });
  
  // Check sections (English only)
  if (g.sections) {
    g.sections.forEach((s, si) => {
      if (s.heading) {
        spanishWords.forEach(word => {
          if (s.heading.toLowerCase().includes(word.toLowerCase())) {
            issues.push({ guide: g.id, field: 'sections[' + si + '].heading', type: 'SPANISH_IN_HEADING', word: word, context: s.heading });
          }
        });
      }
      if (s.content) {
        spanishWords.forEach(word => {
          if (s.content.toLowerCase().includes(word.toLowerCase())) {
            issues.push({ guide: g.id, field: 'sections[' + si + '].content', type: 'SPANISH_IN_CONTENT', word: word, context: s.content.substring(Math.max(0, s.content.toLowerCase().indexOf(word.toLowerCase())-40), s.content.toLowerCase().indexOf(word.toLowerCase())+word.length+40) });
          }
        });
      }
    });
  }
  
  // Check verdictProsCons (English only)
  if (g.verdictProsCons) {
    g.verdictProsCons.forEach((vpc, vi) => {
      ['pros', 'cons'].forEach(field => {
        if (vpc[field]) {
          vpc[field].forEach((item, ii) => {
            spanishWords.forEach(word => {
              if (item.toLowerCase().includes(word.toLowerCase())) {
                issues.push({ guide: g.id, field: 'verdictProsCons[' + vi + '].' + field + '[' + ii + ']', type: 'SPANISH_IN_VPC', word: word, text: item });
              }
            });
          });
        }
      });
    });
  }
  
  // Check productTable (English only)
  if (g.productTable) {
    if (g.productTable.columns) {
      g.productTable.columns.forEach((col, ci) => {
        if (col.title) {
          spanishWords.forEach(word => {
            if (col.title.toLowerCase().includes(word.toLowerCase())) {
              issues.push({ guide: g.id, field: 'productTable.columns[' + ci + '].title', type: 'SPANISH_IN_COLUMN_TITLE', word: word, title: col.title });
            }
          });
        }
      });
    }
    if (g.productTable.rows) {
      g.productTable.rows.forEach((row, ri) => {
        if (row.label) {
          spanishWords.forEach(word => {
            if (row.label.toLowerCase().includes(word.toLowerCase())) {
              issues.push({ guide: g.id, field: 'productTable.rows[' + ri + '].label', type: 'SPANISH_IN_ROW_LABEL', word: word, label: row.label });
            }
          });
        }
        if (row.values) {
          row.values.forEach((v, vi) => {
            if (v.value) {
              spanishWords.forEach(word => {
                if (v.value.toLowerCase().includes(word.toLowerCase())) {
                  issues.push({ guide: g.id, field: 'productTable.rows[' + ri + '].values[' + vi + '].value', type: 'SPANISH_IN_CELL_VALUE', word: word, value: v.value });
                }
              });
            }
          });
        }
      });
    }
  }
  
  // Check related links in sections (already checked separately, but let's do it here too)
  if (g.sections) {
    g.sections.forEach((s, si) => {
      if (!s.content) return;
      const linkRegex = /<a class="guide-link-btn" href="([^"]+)">([^<]+)<\/a>/g;
      const links = [];
      let match;
      while ((match = linkRegex.exec(s.content)) !== null) {
        links.push({ url: match[1], title: match[2] });
      }
      // Check for duplicates
      const urlCounts = {};
      links.forEach(l => { urlCounts[l.url] = (urlCounts[l.url] || 0) + 1; });
      Object.keys(urlCounts).forEach(url => {
        if (urlCounts[url] > 1) {
          issues.push({ guide: g.id, field: 'sections[' + si + '].content', type: 'DUPLICATE_LINK', url: url, count: urlCounts[url] });
        }
      });
      // Check for Spanish titles in English links
      links.forEach(l => {
        if (/[¿¡áéíóúñ]/.test(l.title)) {
          issues.push({ guide: g.id, field: 'sections[' + si + '].content', type: 'SPANISH_TITLE_IN_ENGLISH_LINK', title: l.title, url: l.url });
        }
      });
    });
  }
});

// Deduplicate
const uniqueIssues = [];
const seen = new Set();
issues.forEach(i => {
  const key = i.guide + '|' + i.field + '|' + i.type + '|' + (i.word || i.text || i.title || i.url || '');
  if (!seen.has(key)) {
    seen.add(key);
    uniqueIssues.push(i);
  }
});

console.log('=== DEEP AUDIT RESULTS (English content only) ===');
console.log('Total unique issues:', uniqueIssues.length);
console.log('');

const byType = {};
uniqueIssues.forEach(i => {
  if (!byType[i.type]) byType[i.type] = [];
  byType[i.type].push(i);
});

Object.keys(byType).forEach(type => {
  console.log('--- ' + type + ' (' + byType[type].length + ') ---');
  byType[type].forEach(i => {
    console.log('  Guide: ' + i.guide + ' | Field: ' + i.field + ' | ' + (i.word || i.text || i.title || i.url || ''));
    if (i.context) console.log('    Context: ...' + i.context + '...');
  });
  console.log('');
});

console.log('=== SUMMARY ===');
console.log('Guides audited:', guides.length);
Object.keys(byType).forEach(type => {
  console.log(type + ':', byType[type].length);
});