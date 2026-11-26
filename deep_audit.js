const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const issues = [];

// Spanish words/phrases that should NOT appear in English content
const spanishPatterns = [
  /¿[^?]*\?/g,           // Spanish question marks with question
  /¡[^!]*!/g,            // Spanish exclamation marks
  /\bprevios\b/g,        // Spanish word for preamps
  /\bprevio\b/g,
  /\bmezcladores\b/g,    // Spanish for mixers
  /\binterfaz económica\b/g,
  /\bguía completa\b/g,
  /\bmejores\b/g,        // Spanish for "best"
  /\bmejor\b/g,
  /\bpara voces\b/g,     // Spanish phrase
  /\ben casa\b/g,        // Spanish phrase
  /\bgrabación\b/g,      // Spanish for recording
  /\bgrabar\b/g,
  /\bmonitoreo\b/g,      // Spanish for monitoring
  /\bauriculares\b/g,    // Spanish for headphones
  /\baltavoces\b/g,      // Spanish for speakers
  /\bconversión\b/g,     // Spanish for conversion
  /\bprevio de tubo\b/g,
  /\bprevio de consola\b/g,
  /\bprevio clásico\b/g,
  /\bclásico\b/g,
  /\bclásica\b/g,
  /\bclásico\b/g,
  /\btambién\b/g,
  /\bademás\b/g,
  /\bsin embargo\b/g,
  /\bpor lo tanto\b/g,
  /\bpor ejemplo\b/g,
  /\bes decir\b/g,
  /\ba través\b/g,
  /\bde acuerdo\b/g,
  /\bde hecho\b/g,
  /\bsin embargo\b/g,
  /\bsin embargo\b/g,
  /\bno obstante\b/g,
  /\bpor eso\b/g,
  /\bporque\b/g,
  /\bentonces\b/g,
  /\bmientras\b/g,
  /\baunque\b/g,
  /\btodavía\b/g,
  /\btodavia\b/g,
  /\btambién\b/g,
  /\btambien\b/g,
];

// Also check for accented characters that are Spanish-specific
const spanishAccentPattern = /[áéíóúñÁÉÍÓÚÑ]/g;

guides.forEach(g => {
  ['intro', 'intro_es', 'conclusion', 'conclusion_es', 'verdict', 'verdict_es', 'description', 'description_es', 'featuredSnippet'].forEach(field => {
    const val = g[field];
    if (!val) return;
    const text = typeof val === 'string' ? val : JSON.stringify(val);
    if (field.endsWith('_es')) return; // Skip Spanish fields
    
    // Check for Spanish patterns in English content
    spanishPatterns.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) {
        matches.forEach(m => {
          issues.push({ guide: g.id, field: field, type: 'SPANISH_TEXT_IN_ENGLISH', text: m, context: text.substring(Math.max(0, text.indexOf(m)-30), text.indexOf(m)+m.length+30) });
        });
      }
    });
    
    // Check for Spanish accented characters
    const accentMatches = text.match(spanishAccentPattern);
    if (accentMatches) {
      // Filter out common English words with accents (like "café", "résumé", etc.)
      const uniqueAccents = [...new Set(accentMatches)];
      issues.push({ guide: g.id, field: field, type: 'SPANISH_ACCENT_IN_ENGLISH', accents: uniqueAccents.join(', '), count: accentMatches.length });
    }
  });
  
  // Check sections
  if (g.sections) {
    g.sections.forEach((s, si) => {
      ['content', 'content_es', 'heading', 'heading_es'].forEach(field => {
        const text = s[field];
        if (!text || field.endsWith('_es')) return;
        
        spanishPatterns.forEach(pattern => {
          const matches = text.match(pattern);
          if (matches) {
            matches.forEach(m => {
              issues.push({ guide: g.id, field: 'sections[' + si + '].' + field, type: 'SPANISH_TEXT_IN_ENGLISH', text: m, context: text.substring(Math.max(0, text.indexOf(m)-30), text.indexOf(m)+m.length+30) });
            });
          }
        });
        
        const accentMatches = text.match(spanishAccentPattern);
        if (accentMatches) {
          const uniqueAccents = [...new Set(accentMatches)];
          issues.push({ guide: g.id, field: 'sections[' + si + '].' + field, type: 'SPANISH_ACCENT_IN_ENGLISH', accents: uniqueAccents.join(', '), count: accentMatches.length });
        }
      });
    });
  }
  
  // Check productTable
  if (g.productTable) {
    // Check columns
    if (g.productTable.columns) {
      g.productTable.columns.forEach((col, ci) => {
        if (col.title && /[áéíóúñ¿¡]/.test(col.title)) {
          issues.push({ guide: g.id, field: 'productTable.columns[' + ci + '].title', type: 'SPANISH_IN_COLUMN_TITLE', title: col.title });
        }
      });
    }
    // Check rows
    if (g.productTable.rows) {
      g.productTable.rows.forEach((row, ri) => {
        if (row.label && /[áéíóúñ¿¡]/.test(row.label)) {
          issues.push({ guide: g.id, field: 'productTable.rows[' + ri + '].label', type: 'SPANISH_IN_ROW_LABEL', label: row.label });
        }
        if (row.values) {
          row.values.forEach((v, vi) => {
            if (v.value && /[áéíóúñ¿¡]/.test(v.value)) {
              issues.push({ guide: g.id, field: 'productTable.rows[' + ri + '].values[' + vi + '].value', type: 'SPANISH_IN_CELL_VALUE', value: v.value });
            }
          });
        }
      });
    }
  }
  
  // Check verdictProsCons
  if (g.verdictProsCons) {
    g.verdictProsCons.forEach((vpc, vi) => {
      ['pros', 'cons'].forEach(field => {
        if (vpc[field]) {
          vpc[field].forEach((item, ii) => {
            if (/[áéíóúñ¿¡]/.test(item)) {
              issues.push({ guide: g.id, field: 'verdictProsCons[' + vi + '].' + field + '[' + ii + ']', type: 'SPANISH_IN_VPC', text: item });
            }
          });
        }
      });
    });
  }
  
  // Check relatedGuides links in sections
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
      // Check for Spanish titles in English content
      links.forEach(l => {
        if (/[¿¡áéíóúñ]/.test(l.title)) {
          issues.push({ guide: g.id, field: 'sections[' + si + '].content', type: 'SPANISH_TITLE_IN_ENGLISH_LINK', title: l.title, url: l.url });
        }
      });
    });
  }
});

// Deduplicate issues (same guide + field + type + text)
const uniqueIssues = [];
const seen = new Set();
issues.forEach(i => {
  const key = i.guide + '|' + i.field + '|' + i.type + '|' + (i.text || i.title || i.url || i.accents || '');
  if (!seen.has(key)) {
    seen.add(key);
    uniqueIssues.push(i);
  }
});

console.log('=== DEEP AUDIT RESULTS ===');
console.log('Total issues found (before dedup):', issues.length);
console.log('Total unique issues:', uniqueIssues.length);
console.log('');

// Group by type
const byType = {};
uniqueIssues.forEach(i => {
  if (!byType[i.type]) byType[i.type] = [];
  byType[i.type].push(i);
});

Object.keys(byType).forEach(type => {
  console.log('--- ' + type + ' (' + byType[type].length + ') ---');
  byType[type].forEach(i => {
    console.log('  Guide: ' + i.guide + ' | Field: ' + i.field + ' | ' + (i.text || i.title || i.url || i.accents || i.label || i.value || ''));
    if (i.context) console.log('    Context: ...' + i.context + '...');
  });
  console.log('');
});

// Summary
console.log('=== SUMMARY ===');
console.log('Guides audited:', guides.length);
Object.keys(byType).forEach(type => {
  console.log(type + ':', byType[type].length);
});