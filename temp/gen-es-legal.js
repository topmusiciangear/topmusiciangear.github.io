const fs = require('fs');
const root = 'C:/Users/Daniel/projects/topmusiciangear';
const R = '\uFFFD';

// per-file: { src, dst, titleEN, titleES, ogdescEN, ogdescES }
const files = [
  {
    src: 'privacy-policy.html', dst: 'es/privacy-policy.html',
    titleEN: 'Privacy Policy \u2014 TopMusicianGear', titleES: 'Pol\u00edtica de Privacidad \u2014 TopMusicianGear',
    descEN: 'TopMusicianGear privacy policy. How we handle your data, cookies, and affiliate links.',
    descES: 'Pol\u00edtica de privacidad de TopMusicianGear. C\u00f3mo gestionamos tus datos, cookies y enlaces de afiliados.'
  },
  {
    src: 'terms.html', dst: 'es/terms.html',
    titleEN: 'Terms of Service \u2014 TopMusicianGear', titleES: 'T\u00e9rminos de Servicio \u2014 TopMusicianGear',
    descEN: '', descES: ''
  },
  {
    src: 'cookie-policy.html', dst: 'es/cookie-policy.html',
    titleEN: 'Cookie Policy \u2014 TopMusicianGear', titleES: 'Pol\u00edtica de Cookies \u2014 TopMusicianGear',
    descEN: '', descES: ''
  },
  {
    src: 'affiliate-disclosure.html', dst: 'es/affiliate-disclosure.html',
    titleEN: 'Affiliate Disclosure \u2014 TopMusicianGear', titleES: 'Divulgaci\u00f3n de Afiliados \u2014 TopMusicianGear',
    descEN: '', descES: ''
  },
  {
    src: 'contact.html', dst: 'es/contact.html',
    titleEN: 'Contact TopMusicianGear \u2014 Gear Review Inquiries & More', titleES: 'Contacto TopMusicianGear \u2014 Consultas de Rese\u00f1as y M\u00e1s',
    descEN: '', descES: ''
  }
];

function escRE(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

for (const f of files) {
  let t = fs.readFileSync(root + '/' + f.src, 'utf8');

  // 1. html lang
  t = t.replace('<html lang="en">', '<html lang="es">');

  // 2. base + forced-ES style injected (idempotent: only if not already present)
  const inject = '<base href="/">' +
    '<script>document.documentElement.lang="es";document.write(\'<style id="ls">.lang-show-en,.cookie-lang-en{display:none!important}#lang-en{display:none!important}#lang-es{display:block!important}.lang-switcher{display:none!important}</style>\')</script>';
  if (!t.includes('<base href="/"><script>document.documentElement.lang="es"')) {
    t = t.replace('<head>', '<head>\n  ' + inject);
  }

  // 3. title
  t = t.replace('<title>' + escRE(f.titleEN) + '</title>', '<title>' + f.titleES + '</title>');

  // 4. description meta (if we have an ES one)
  if (f.descES) {
    t = t.replace('<meta name="description" content="' + escRE(f.descEN) + '">', '<meta name="description" content="' + f.descES + '">');
    t = t.replace('<meta property="og:description" content="' + escRE(f.descEN) + '">', '<meta property="og:description" content="' + f.descES + '">');
    t = t.replace('<meta name="twitter:description" content="' + escRE(f.descEN) + '">', '<meta name="twitter:description" content="' + f.descES + '">');
  }

  // 5. og:title / twitter:title -> ES
  t = t.replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="' + f.titleES + '">');
  t = t.replace(/<meta name="twitter:title" content="[^"]*">/, '<meta name="twitter:title" content="' + f.titleES + '">');

  // 6. canonical + hreflang + og:url: point all topmusiciangear.com/NAME.html -> /es/NAME.html
  const baseUrl = 'https://topmusiciangear.com/' + f.src;
  const esUrl = 'https://topmusiciangear.com/es/' + f.src;
  t = t.split(baseUrl).join(esUrl);
  // og:url now points to /es/.. which is fine; also fix image/other absolute https refs not under /es (leave images)

  // 7. Logo href
  t = t.replace('href="/" class="logo"', 'href="/es/" class="logo"');

  // 8. Nav Guides
  t = t.replace('href="/#guides"', 'href="/es/#guides"');

  // 9. Back buttons (remove history.back, href / -> /es/)
  t = t.replace(/onclick="history\.back\(\);return false" href="\/"/g, 'href="/es/"');

  // 10. Footer store/contact links
  t = t.replace('href="/deals.html"', 'href="/es/deals_es.html"');
  t = t.replace('href="/contact.html"', 'href="/es/contact.html"');
  // relabel footer text (plain EN labels on legal pages)
  t = t.replace('>Today\'s Deals</a>', '>Ofertas de Hoy</a>');
  t = t.replace('>Contact</a>', '>Contacto</a>');

  // 11. setLang buttons: remove language switcher entirely isn't needed (hidden via CSS).
  // Ensure no stray FFFD
  t = t.split('\uFFFD').join('\uFFFD'); // noop safeguard

  fs.writeFileSync(root + '/' + f.dst, t);
  const fffd = (t.match(/\uFFFD/g) || []).length;
  console.log('wrote', f.dst, '| FFFD remaining:', fffd);
}