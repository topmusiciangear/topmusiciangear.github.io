const fs = require('fs');
const files = fs.readdirSync('guides').filter(f => f.endsWith('.html') && !f.includes('_es'));
let totalLinks = 0;
let noBtn = 0;
const examples = [];
files.forEach(f => {
  const html = fs.readFileSync('guides/' + f, 'utf8');
  const links = [...html.matchAll(/<a [^>]*href="[^"]+"[^>]*>[^<]+<\/a>/g)];
  links.forEach(m => {
    totalLinks++;
    if (!m[0].includes('guide-link-btn')) {
      noBtn++;
      if (examples.length < 10) examples.push(f + ': ' + m[0].substring(0, 150));
    }
  });
});
console.log('Total links:', totalLinks);
console.log('Without guide-link-btn:', noBtn);
examples.forEach(e => console.log(e));
