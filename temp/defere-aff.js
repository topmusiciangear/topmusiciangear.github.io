// Post-process: defer Andertons Impact affiliate links.
// Converts <a href="pxf..."> -> <a href="<clean andertons.co.uk>" data-aff="<pxf>" so bots/crawlers
// don't follow the pxf redirect (reduces ghost clicks in Impact), while a real user click
// restores pxf via js/aff-defer.js (commission preserved). Generators remain untouched.
// Usage:
//   node temp/defere-aff.js            # apply to all site HTML
//   node temp/defere-aff.js --check    # verify only, no writes

const fs = require('fs');
const path = require('path');

const PXF_RE = /href="(https:\/\/andertonsmusiccompany\.pxf\.io\/[^"]*)"[^>]*>/;

function transformTag(m, pxf) {
  let clean = pxf;
  try {
    const uq = pxf.match(/[?&]u=([^&]+)/);
    if (uq && uq[1]) clean = decodeURIComponent(uq[1]);
  } catch (e) {}
  if (!/^https:\/\/www\.andertons\.co\.uk\//.test(clean)) return m;
  const withAff = m.replace('href="' + pxf + '"', 'data-aff="' + pxf + '"');
  return '<a' + withAff.slice(2).replace('>', ' href="' + clean + '">');
}

function transformHtml(html) {
  return html.replace(/<a\s[^>]*?href="(https:\/\/andertonsmusiccompany\.pxf\.io\/[^"]*)"[^>]*>/g, transformTag);
}

function ensureDeferScript(html) {
  const script = '<script defer src="/js/aff-defer.js"></script>';
  if (html.indexOf('js/aff-defer.js') !== -1) return html;
  if (html.indexOf('</body>') !== -1) return html.replace('</body>', script + '\n</body>');
  return html + '\n' + script;
}

function collectPages() {
  const pages = [];
  const rootHtml = ['index.html', 'deals.html', 'deals_es.html', 'about.html', 'contact.html',
    'affiliate-disclosure.html', 'cookie-policy.html', 'privacy-policy.html', 'terms.html',
    'es/index.html', 'es/about.html', 'es/contact.html', 'es/affiliate-disclosure.html',
    'es/cookie-policy.html', 'es/privacy-policy.html', 'es/terms.html'];
  rootHtml.forEach(p => { if (fs.existsSync(p)) pages.push(p); });
  // guides
  (fs.readdirSync('guides') || []).filter(f => f.endsWith('.html')).forEach(f => pages.push('guides/' + f));
  return pages;
}

const CHECK = process.argv.indexOf('--check') !== -1;
const pages = collectPages();
let totalAff = 0, totalHrefsLeft = 0, totalChanged = 0, errors = 0;

pages.forEach(p => {
  let html;
  try { html = fs.readFileSync(p, 'utf8'); } catch (e) { return; }
  const before = html;
  const affBefore = (html.match(/data-aff="https:\/\/andertonsmusiccompany\.pxf\.io\//g) || []).length;
  const hrefBefore = (html.match(/href="https:\/\/andertonsmusiccompany\.pxf\.io\/[^"]*"/g) || []).length;
  if (hrefBefore === 0 && affBefore === 0 && html.indexOf('js/aff-defer.js') === -1) return;

  html = transformHtml(html);
  html = ensureDeferScript(html);
  const after = html;
  const affAfter = (html.match(/data-aff="https:\/\/andertonsmusiccompany\.pxf\.io\//g) || []).length;
  const hrefsLeft = (html.match(/href="https:\/\/andertonsmusiccompany\.pxf\.io\/[^"]*"/g) || []).length;
  if (hrefsLeft > 0) errors++;

  if (before !== after) {
    totalChanged++;
    totalAff += affAfter;
    totalHrefsLeft += hrefsLeft;
    if (!CHECK) fs.writeFileSync(p, after);
    if (CHECK || true) console.log('  ' + p + ': href=' + hrefsLeft + ' left, data-aff=' + affAfter);
  }
});

console.log('\nSUMMARY' + (CHECK ? ' (CHECK ONLY, no writes)' : ''));
console.log('  pages changed: ' + totalChanged);
console.log('  total data-aff added: ' + totalAff);
console.log('  total pxf left in href (should be 0): ' + totalHrefsLeft);
console.log(errors ? '  !! LEAK: some pxf remain in href' : '  OK');