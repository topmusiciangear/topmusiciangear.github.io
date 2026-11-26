const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

const issues = [];

guides.forEach(g => {
  ['content', 'content_es'].forEach(field => {
    if (!g.sections) return;
    g.sections.forEach((s, si) => {
      const text = s[field];
      if (!text) return;
      // Find all guide-link-btn links
      const linkRegex = /<a class="guide-link-btn" href="([^"]+)">([^<]+)<\/a>/g;
      let match;
      const links = [];
      while ((match = linkRegex.exec(text)) !== null) {
        links.push({ url: match[1], title: match[2] });
      }
      // Check for duplicates (same URL)
      const urlCounts = {};
      links.forEach(l => {
        urlCounts[l.url] = (urlCounts[l.url] || 0) + 1;
      });
      Object.keys(urlCounts).forEach(url => {
        if (urlCounts[url] > 1) {
          issues.push({ guide: g.id, field: field, section: si, type: 'DUPLICATE_URL', url: url, count: urlCounts[url] });
        }
      });
      // Check for Spanish text in English content
      if (field === 'content') {
        links.forEach(l => {
          if (/[¿¡áéíóúñ]/.test(l.title)) {
            issues.push({ guide: g.id, field: field, section: si, type: 'SPANISH_IN_ENGLISH', title: l.title, url: l.url });
          }
        });
      }
      // Check for English text in Spanish content
      if (field === 'content_es') {
        links.forEach(l => {
          if (l.title.match(/^[A-Z][a-z]+ [a-z]+ [A-Z]/) && !/[¿¡áéíóúñ]/.test(l.title)) {
            // Might be English text in Spanish content
            issues.push({ guide: g.id, field: field, section: si, type: 'POSSIBLE_ENGLISH_IN_SPANISH', title: l.title, url: l.url });
          }
        });
      }
    });
  });
});

console.log('=== AUDIT RESULTS ===');
console.log('Total issues found:', issues.length);
console.log('');

const byType = {};
issues.forEach(i => {
  if (!byType[i.type]) byType[i.type] = [];
  byType[i.type].push(i);
});

Object.keys(byType).forEach(type => {
  console.log('--- ' + type + ' (' + byType[type].length + ') ---');
  byType[type].forEach(i => {
    console.log('  Guide: ' + i.guide + ' | Section: ' + i.section + ' | ' + (i.title || i.url || ''));
  });
  console.log('');
});