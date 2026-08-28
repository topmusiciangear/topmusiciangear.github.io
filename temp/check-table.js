const fs = require('fs');
const html = fs.readFileSync('guides/best-32-channel-digital-mixers.html','utf8');

// Extract table section
const tableMatch = html.match(/guide-table[\s\S]*?<\/table>/);
if (tableMatch) {
  const rows = tableMatch[0].match(/<tr>/g);
  console.log('Table rows:', rows ? rows.length : 0);
  const ths = tableMatch[0].match(/<th>[^<]+<\/th>/g);
  console.log('Headers:', ths ? ths.map(t => t.replace(/<\/?th>/g,'')).join(' | ') : 'none');
} else {
  console.log('No table found');
}

// Extract FAQ section
const faqSection = html.split('guide-faq-item');
if (faqSection.length > 1) {
  const faqH3s = html.match(/<h3>[^<]+<\/h3>/g);
  console.log('FAQ questions:', faqH3s ? faqH3s.length : 0);
  if (faqH3s) faqH3s.forEach((h,i) => console.log('  Q' + (i+1) + ':', h.replace(/<\/?h3>/g,'')));
} else {
  console.log('No FAQ found');
}
