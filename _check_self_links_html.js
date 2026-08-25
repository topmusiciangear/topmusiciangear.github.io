const fs = require('fs');
const path = require('path');

const dir = 'guides';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && !f.endsWith('_es.html'));

let count = 0;
files.forEach(file => {
  const hubId = file.replace('.html', '');
  const html = fs.readFileSync(path.join(dir, file), 'utf8');
  
  // Find all guide-link-btn hrefs
  const re = /guide-link-btn[^>]*href="([^"]*)"/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const href = m[1];
    if (href.includes('/' + hubId + '.html') || href === hubId + '.html') {
      console.log(`${hubId}: ${m[0].substring(0, 80)}`);
      count++;
    }
  }
  
  // Also check href before guide-link-btn
  const re2 = /href="([^"]*)"[^>]*guide-link-btn/gi;
  while ((m = re2.exec(html)) !== null) {
    const href = m[1];
    if (href.includes('/' + hubId + '.html') || href === hubId + '.html') {
      console.log(`${hubId}: href=${href} has guide-link-btn`);
      count++;
    }
  }
});
console.log(`\nTotal self-link buttons in HTML: ${count}`);
