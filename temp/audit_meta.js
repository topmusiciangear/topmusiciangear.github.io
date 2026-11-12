const fs = require('fs');
const path = 'C:/Users/Daniel/projects/topmusiciangear/';

// Check meta tags on all pages (guides EN and ES, index, deals)
const files = ['index.html', 'deals.html', 'deals_es.html', 'es/index.html'];
const guideFiles = fs.readdirSync(path + 'guides').filter(f => f.endsWith('.html'));
guideFiles.forEach(f => { files.push('guides/' + f); });

let issues = 0;
const issuesList = [];

files.forEach(f => {
  const html = fs.readFileSync(path + f, 'utf8');
  // Check title
  const title = html.match(/<title>([\s\S]*?)<\/title>/);
  if (!title) { issuesList.push(f + ': NO TITLE'); issues++; return; }
  // Check meta description
  const metaDesc = html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/);
  if (!metaDesc) { issuesList.push(f + ': NO META DESCRIPTION'); issues++; }
  // Check og:title
  const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["']([\s\S]*?)["']/);
  if (!ogTitle) { issuesList.push(f + ': NO OG TITLE'); issues++; }
  // Check og:description
  const ogDesc = html.match(/<meta\s+property=["']og:description["']\s+content=["']([\s\S]*?)["']/);
  if (!ogDesc) { issuesList.push(f + ': NO OG DESCRIPTION'); issues++; }
  // Check twitter:title
  const twTitle = html.match(/<meta\s+name=["']twitter:title["']\s+content=["']([\s\S]*?)["']/);
  if (!twTitle) { issuesList.push(f + ': NO TWITTER TITLE'); issues++; }
  // Check canonical
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([\s\S]*?)["']/);
  if (!canonical) { issuesList.push(f + ': NO CANONICAL'); issues++; }
});

console.log('Total pages checked: ' + files.length);
console.log('Total issues: ' + issues);
if (issues > 0) {
  issuesList.slice(0, 30).forEach(i => console.log('  ' + i));
  if (issuesList.length > 30) console.log('  ... and ' + (issuesList.length - 30) + ' more');
}
fs.writeFileSync(path + 'temp/audit_meta.txt', issuesList.join('\n'), 'utf8');
console.log('Report saved to temp/audit_meta.txt');
