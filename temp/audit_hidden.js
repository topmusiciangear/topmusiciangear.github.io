const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/';
const files = fs.readdirSync(path + 'guides').filter(f => f.endsWith('.html'));
let hiddenCount = 0;
let commentCount = 0;
let noscriptCount = 0;
let templateCount = 0;
files.forEach(f => {
  const html = fs.readFileSync(path + 'guides/' + f, 'utf8');
  const dn = (html.match(/display\s*:\s*none/gi) || []).length;
  const h = (html.match(/\shidden\b/gi) || []).length;
  const ah = (html.match(/aria-hidden\s*=\s*"true"/gi) || []).length;
  hiddenCount += dn + h + ah;
  const comments = (html.match(/<!--[\s\S]*?-->/g) || []).length;
  commentCount += comments;
  const ns = (html.match(/<noscript[\s\S]*?<\/noscript>/gi) || []).length;
  noscriptCount += ns;
  const tpl = (html.match(/<template[\s\S]*?<\/template>/gi) || []).length;
  templateCount += tpl;
});
console.log('Guide pages: ' + files.length);
console.log('Hidden (display:none/hidden/aria-hidden): ' + hiddenCount);
console.log('HTML comments: ' + commentCount);
console.log('noscript tags: ' + noscriptCount);
console.log('template tags: ' + templateCount);
// Also check home page and deals
['index.html', 'deals.html', 'deals_es.html'].forEach(f => {
  const html = fs.readFileSync(path + f, 'utf8');
  const dn = (html.match(/display\s*:\s*none/gi) || []).length;
  const h = (html.match(/\shidden\b/gi) || []).length;
  const ah = (html.match(/aria-hidden\s*=\s*"true"/gi) || []).length;
  const comments = (html.match(/<!--[\s\S]*?-->/g) || []).length;
  console.log(f + ': hidden=' + (dn+h+ah) + ' comments=' + comments);
});
