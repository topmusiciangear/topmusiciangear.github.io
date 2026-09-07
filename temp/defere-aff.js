// Post-process: defer affiliate redirect links so bots/crawlers see only the clean
// store href, while a REAL user click restores the redirect via js/aff-defer.js
// (commission preserved). Covers the redirect-based affiliate networks on the site:
//   - Impact/pxf Andertons          andertonsmusiccompany.pxf.io ... ?u=<clean>
//   - Awin gear4music/musicstore/reverb  awin1.com/cread.php ... &ued=<clean>
//   - CJ zZounds                    anrdoezrs.net/click-... ... ?url=<clean>
// Tag-based networks (Amazon ?tag=, Plugin Boutique ?a_aid=) do NOT count visits
// as clicks, so they are left untouched. Generators remain untouched.
// Usage:
//   node temp/defere-aff.js            # apply to all site HTML
//   node temp/defere-aff.js --check    # verify only, no writes

const fs = require('fs');

const AFF_RE = /<a\s[^>]*?href="((?:https:\/\/andertonsmusiccompany\.pxf\.io\/|https:\/\/www\.awin1\.com\/cread\.php\?|https:\/\/www\.anrdoezrs\.net\/click-)[^"]*)"[^>]*>/g;

const NETWORKS = [
  {
    re: /^https:\/\/andertonsmusiccompany\.pxf\.io\//,
    param: /[?&]u=([^&"']+)/,
    clean: /^https:\/\/www\.andertons\.co\.uk\//
  },
  {
    re: /^https:\/\/www\.awin1\.com\/cread\.php\?/,
    param: /ued=([^&"']+)/,
    clean: /^https:\/\/(?:www\.)?(?:gear4music\.com|musicstore\.com|reverb\.com)\//
  },
  {
    re: /^https:\/\/www\.anrdoezrs\.net\/click-/,
    param: /url=([^&"']+)/,
    clean: /^https:\/\/www\.zzounds\.com\//
  }
];

function hrefsLeft(html) {
  return (html.match(/href="https:\/\/andertonsmusiccompany\.pxf\.io\/[^"]*"/g) || []).length +
    (html.match(/href="https:\/\/www\.awin1\.com\/cread\.php\?[^"]*"/g) || []).length +
    (html.match(/href="https:\/\/www\.anrdoezrs\.net\/click-[^"]*"/g) || []).length;
}

function hasManyHrefs(html) {
  return hrefsLeft(html) > 0;
}

function dataAffCount(html) {
  return (html.match(/data-aff="https:\/\/andertonsmusiccompany\.pxf\.io\//g) || []).length +
    (html.match(/data-aff="https:\/\/www\.awin1\.com\/cread\.php\?/g) || []).length +
    (html.match(/data-aff="https:\/\/www\.anrdoezrs\.net\/click-/g) || []).length;
}

function cleanFromAff(affUrl) {
  for (const n of NETWORKS) {
    if (!n.re.test(affUrl)) continue;
    const m = affUrl.match(n.param);
    if (!m) return null;
    let clean;
    try { clean = decodeURIComponent(m[1]); } catch (e) { return null; }
    if (!n.clean.test(clean)) return null;
    return clean;
  }
  return null;
}

function transformTag(m) {
  const affMatch = m.match(/href="([^"]+)"/);
  if (!affMatch) return m;
  const affUrl = affMatch[1];
  const clean = cleanFromAff(affUrl);
  if (!clean) return m;
  const cleanAttr = clean.replace(/&/g, '&amp;');
  return m.split(' href="' + affUrl + '"').join(' data-aff="' + affUrl + '" href="' + cleanAttr + '"');
}

function transformHtml(html) {
  return html.replace(AFF_RE, transformTag);
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
  (fs.readdirSync('guides') || []).filter(f => f.endsWith('.html')).forEach(f => pages.push('guides/' + f));
  return pages;
}

const CHECK = process.argv.indexOf('--check') !== -1;
const pages = collectPages();
let totalAff = 0, totalChanged = 0, totalLeaks = 0;

pages.forEach(p => {
  let html;
  try { html = fs.readFileSync(p, 'utf8'); } catch (e) { return; }
  const before = html;
  if (!hasManyHrefs(html) && html.indexOf('js/aff-defer.js') === -1 && dataAffCount(html) === 0) return;

  html = transformHtml(html);
  html = ensureDeferScript(html);
  const after = html;
  const left = hrefsLeft(after);
  const aff = dataAffCount(after);

  if (before !== after) {
    totalChanged++;
    totalAff += aff;
    totalLeaks += left;
    if (!CHECK) fs.writeFileSync(p, after);
    console.log('  ' + p + ': href-left=' + left + ', data-aff=' + aff);
  }
});

console.log('\nSUMMARY' + (CHECK ? ' (CHECK ONLY, no writes)' : ''));
console.log('  pages changed: ' + totalChanged);
console.log('  total data-aff added: ' + totalAff);
console.log('  total redirect hrefs left (should be 0): ' + totalLeaks);
console.log(totalLeaks ? '  !! LEAK: some affiliate redirects remain in href' : '  OK');