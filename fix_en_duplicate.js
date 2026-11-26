const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const guide = guides.find(g => g.id === 'best-interface');

// Remove duplicate "Best audio interfaces under $300" link in English
const content = guide.sections[0].content;
const dupLink = ' <a class="guide-link-btn" href="/guides/budget-interfaces.html">Best audio interfaces under $300</a>';
const firstIdx = content.indexOf(dupLink);
const secondIdx = content.indexOf(dupLink, firstIdx + 1);
if (secondIdx >= 0) {
  guide.sections[0].content = content.substring(0, secondIdx) + content.substring(secondIdx + dupLink.length);
  console.log('Removed duplicate budget-interfaces link in English');
} else {
  console.log('No duplicate found');
}

const idx = guides.findIndex(g => g.id === 'best-interface');
guides[idx] = guide;
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');

const updated = guides.find(g => g.id === 'best-interface');
console.log('EN content:', updated.sections[0].content.substring(updated.sections[0].content.indexOf('For detailed')));