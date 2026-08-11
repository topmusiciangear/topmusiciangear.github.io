const fs = require('fs');
const { icon } = require('./js/icons.js');

const deals = JSON.parse(fs.readFileSync('data/deals.json', 'utf8'));

const social = (name) => {
  const links = {
    youtube: ['https://www.youtube.com/@Cuban3Beats', icon('youtube', 'fa-brands')],
    spotify: ['https://open.spotify.com/artist/3HMtcts1AYCzkI4pBQKRzX', icon('spotify', 'fa-brands')],
    tiktok: ['https://www.tiktok.com/@cuban3beats', icon('tiktok', 'fa-brands')],
    facebook: ['https://www.facebook.com/Cuban3Beats/', icon('facebook-f', 'fa-brands')],
    instagram: ['https://www.instagram.com/cuban3beats', icon('instagram', 'fa-brands')],
    x: ['https://x.com/Cuban3Beats', icon('x-twitter', 'fa-brands')],
    telegram: ['https://t.me/topmusiciangear', icon('telegram', 'fa-brands')]
  };
  if (!links[name]) return '';
  return `<a href="${links[name][0]}" target="_blank" rel="noopener noreferrer" class="header-social-link" title="${name[0].toUpperCase() + name.slice(1)}">${links[name][1]}</a>`;
};

const flagEn = '<img class="lang-flag" src="img/flag-en.svg" alt="EN" width="20" height="15">';
const flagEs = '<img class="lang-flag" src="img/flag-es.svg" alt="ES" width="20" height="15">';

// buildPage(lang, canonical, newUrl) -> full HTML for one language version
// lang: 'en' | 'es'
// Both pages keep <html lang="en/es">, own canonical and hreflang alternates,
// matching the site convention: /deals.html (en) + /deals_es.html (es).
const buildPage = (lang) => {
  const isEs = lang === 'es';
  const dealsHref = isEs ? '/deals_es.html' : '/deals.html';
  const altUrl = isEs ? '/deals.html' : '/deals_es.html';
  const t = (en, es) => (isEs ? es : en);
  const langOpts = isEs ? 'es' : 'en';
  const canonical = 'https://topmusiciangear.com' + dealsHref;
  const urlBase = 'https://topmusiciangear.com';

  const title = t(
    "Today's Music Gear Deals — TopMusicianGear",
    'Ofertas de Hoy en Equipo Musical — TopMusicianGear'
  );
  const metaDesc = t(
    'Daily music gear deals and discounts on guitars, microphones, interfaces, headphones, monitors and plugins — hand-picked by a pro musician.',
    'Ofertas diarias y descuentos de equipos musicales en guitarras, micrófonos, interfaces, audífonos, monitores y plugins — seleccionados por un músico profesional.'
  );
  const ogDesc = t(
    'Daily music gear deals and discounts on guitars, microphones, interfaces, headphones, monitors and plugins.',
    'Ofertas diarias y descuentos de equipos musicales en guitarras, micrófonos, interfaces, audífonos, monitores y plugins.'
  );
  const twDesc = t('Daily music gear deals and discounts.', 'Ofertas diarias y descuentos en equipos musicales.');

  const navLink = (href, en, es, active) => `<a href="${href}" class="nav-link${active ? ' active' : ''}">${isEs ? es : en}</a>`;

  const header = `
  <a href="#mainContent" class="skip-link">Skip to main content</a>
  <div class="bg-hero"></div>

  <header style="margin-top:0;padding-top:0;">
    <div class="header-inner">
      <div class="header-left">
        <a href="/" class="logo">
          <span class="logo-icon"><img src="img/favicon.png?v=2" alt="TMG" style="width:36px;height:36px;border-radius:8px"></span>
          <div class="logo-text">
            <span>Top</span>MusicianGear
          </div>
        </a>
        <nav aria-label="Main navigation">
          ${navLink('/#guides', 'Guides', 'Guías')}
          ${navLink(dealsHref, 'Deals', 'Ofertas', true)}
          ${navLink('/#mysetup', 'My Setup', 'Mi Equipo')}
          ${navLink('/#about', 'About Me', 'Sobre Mí')}
        </nav>
      </div>
      <div class="audio-mini" id="audioMini">
        <div class="audio-mini-inner">
          <span class="audio-mini-player"><audio controls preload="none"><source src="/audio/solo-tres.mp3" type="audio/mpeg"></audio></span>
          <span class="audio-eq"><i></i><i></i><i></i><i></i></span>
          <span class="audio-mini-label">${t('Cuban Tres, Bass & Guitar - played and recorded with my personal gear', 'Tres Cubano, Bajo y Guitarra - tocados y grabados con mi equipo personal')}</span>
        </div>
      </div>
      <div class="header-right">
        <div style="display:flex;flex-direction:column;align-items:center;gap:2px">
        <div class="header-social">
          ${social('youtube')}
          ${social('spotify')}
          ${social('tiktok')}
          ${social('facebook')}
          ${social('instagram')}
          ${social('x')}
          <a href="https://soundbetter.com/profiles/721440-daniel-carnago" target="_blank" rel="noopener noreferrer" class="header-social-link" title="SoundBetter"><img src="https://d2p6ecj15pyavq.cloudfront.net/assets/SoundBetterBadge-c84cb3e75c4267f5bee41f7f617a81d9.svg" alt="SoundBetter" class="sb-icon"></a>
          ${social('telegram')}
          <a href="https://www.fiverr.com/s/yvzbmLz" target="_blank" rel="noopener noreferrer" class="header-social-link" title="Fiverr"><img src="img/fiverr-icon.svg?v=3" alt="Fiverr" class="fiverr-icon"></a>
        </div>
        <a href="https://open.spotify.com/artist/3HMtcts1AYCzkI4pBQKRzX?si=hD1MDwuuQiKwP0fSCiD07w" target="_blank" rel="noopener" style="color:var(--text-muted);font-size:11px;font-weight:600;margin-top:2px;text-decoration:none;font-family:inherit;padding:0"><span style="color:var(--accent)">@</span>Cuban<span style="color:var(--white)">3</span>Beats</a>
        </div>
        <div class="lang-switcher">
          <button class="lang-btn ${isEs ? '' : 'active'}" title="English" onclick="location.href='${isEs ? '/deals.html' : '#'}'">${flagEn}</button>
          <button class="lang-btn ${isEs ? 'active' : ''}" title="Español" onclick="location.href='${isEs ? '#' : '/deals_es.html'}'">${flagEs}</button>
        </div>
        <button class="hamburger" id="hamburger" aria-label="Menu" onclick="document.getElementById('mobileNav').classList.toggle('open')">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <div class="mobile-nav" id="mobileNav">
    ${navLink('/#guides', 'Guides', 'Guías')}
    ${navLink(dealsHref, 'Deals', 'Ofertas', true)}
    ${navLink('/#mysetup', 'My Setup', 'Mi Equipo')}
    ${navLink('/#about', 'About Me', 'Sobre Mí')}
  </div>
`;

  // Store icon: match home page patterns
  const storeMeta = {
    'Plugin Boutique': { color: '#6366f1', mark: '<img src="img/pluginboutique-icon.png" alt="Plugin Boutique" width="20" height="20">' },
    'Gear4Music': { color: '#8b5cf6', mark: '<img src="img/gear4music-icon.png" alt="Gear4Music" width="20" height="20">' },
    'Amazon': { color: '#ff9900', mark: '<svg class="icon fa-brands" style="font-size:20px;color:#ff9900;" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor"><path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"/></svg>' },
    'Reverb': { color: '#d6562b', mark: '<span style="font-weight:900;font-size:14px;width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;background:#d6562b;color:#fff;border-radius:3px;flex-shrink:0;">R</span>' },
    'Andertons': { color: '#000000', mark: '<span style="font-weight:900;font-size:14px;width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;background:#000;color:#fff;border-radius:3px;flex-shrink:0;">A</span>' },
    'Music Store': { color: '#1a3a5c', mark: '<img src="img/musicstore-icon.png" alt="Music Store" style="width:auto;height:10px">' }
  };
  const slugToName = {
    andertons: 'Andertons',
    pluginboutique: 'Plugin Boutique',
    gear4music: 'Gear4Music',
    amazon: 'Amazon',
    reverb: 'Reverb',
    musicstore: 'Music Store'
  };

  const storeLogo = (s) => {
    const c = storeMeta[s.name] || { color: 'var(--accent)', mark: '' };
    return `<a href="${s.url}" target="_blank" rel="noopener noreferrer sponsored" class="deals-store" style="--store-color:${c.color}">${c.mark}<span>${s.name}</span></a>`;
  };

  const dealCard = (d) => {
    const badge = isEs ? (d.badge_es || '') : (d.badge_en || '');
    const desc = isEs ? (d.desc_es || d.desc) : d.desc;
    const cur = d.currency || '$';
    const old = d.old_price ? `<span class="deal-old-price">${cur}${d.old_price}</span>` : '';
    const price = `${cur}${d.price}`;
    const pct = d.old_price && d.price ? Math.round((1 - d.price / d.old_price) * 100) : 0;
    const pctLabel = pct > 0 ? ` <span class="deal-percent">${pct}% ${t('off', 'dto.')}</span>` : '';
    const storeName = slugToName[d.store] || d.store;
    const sc = storeMeta[storeName] || { color: 'var(--accent)', mark: '' };
    const storeLink = `<a href="${d.store_url}" target="_blank" rel="noopener noreferrer sponsored" class="deal-store-tag" style="--store-color:${sc.color}">${sc.mark}<span>${storeName}</span></a>`;
    return `
  <div class="deals-card deal-card">
    <div class="deal-store-row">${storeLink}</div>
    <div class="deal-card-top">
      <a class="deal-img" href="${d.store_url}" target="_blank" rel="noopener noreferrer sponsored"><img src="${d.img}" alt="${d.title}" loading="lazy"></a>
      <div class="deal-body">
        <h2>${isEs ? (d.title_es || d.title) : d.title}</h2>
        <p>${desc}</p>
        <div class="deal-price-row"><span class="deal-price">${price}</span>${badge ? ` <span class="deal-badge">${badge}</span>` : ''}</div>
        <div class="deal-save-row">${old}${pctLabel}</div>
        <a href="${d.store_url}" target="_blank" rel="noopener noreferrer sponsored" class="deals-store-btn">★ ${t('View Deal', 'Ver Oferta')}</a>
      </div>
    </div>
  </div>`;
  };

  const stores = [
    { name: 'Plugin Boutique', url: 'https://www.pluginboutique.com/deals?a_aid=6a01e859cbe1a' },
    { name: 'Gear4Music', url: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' + encodeURIComponent('https://www.gear4music.com/us/en/Top-Deals') },
    { name: 'Amazon', url: 'https://www.amazon.com/deals?discounts-widget=%2522%257B%255C%2522state%255C%2522%253A%257B%255C%2522refinementFilters%255C%2522%253A%257B%255C%2522departments%255C%2522%253A%255B%255C%252211965861%255C%2522%255D%257D%257D%252C%255C%2522version%255C%2522%253A1%257D%2522&tag=topmusicg-20' },
    { name: 'Reverb', url: 'https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=' + encodeURIComponent('https://reverb.com/outlet') },
    { name: 'Andertons', url: 'https://www.andertons.co.uk/browse/offers/?irgwc=1&irpid=7292297' },
    { name: 'Music Store', url: 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=' + encodeURIComponent('https://www.musicstore.com/en_GB/GBP/Bargains/cat-Retouren') }
  ];

  return `<!DOCTYPE html>
<html lang="${langOpts}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${metaDesc}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="x-default" href="${urlBase}/deals.html">
  <link rel="alternate" hreflang="en" href="${urlBase}/deals.html">
  <link rel="alternate" hreflang="es" href="${urlBase}/deals_es.html">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${ogDesc}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${urlBase}/img/favicon.png">
  <meta property="og:site_name" content="TopMusicianGear">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${twDesc}">
  <meta name="twitter:site" content="@Cuban3Beats">
  <link rel="icon" type="image/png" href="img/favicon.png?v=2">
  <link rel="stylesheet" href="css/style.css?v=28">
  <style>
    body { background: var(--bg); }
    .deals-page { max-width: 1100px; margin: 0 auto; padding: 12px 32px 64px; }
    .deals-page h1 { font-size: clamp(28px, 4vw, 42px); font-weight: 900; color: var(--white); margin-bottom: 8px; letter-spacing: -.5px; }
    .deals-page .updated { color: var(--text-muted); font-size: 14px; margin-bottom: 24px; }
    .back-row { margin: 4px 0 8px; }
    .deals-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; margin-top: 24px; }
    .deal-card { padding: 20px; }
    .deal-card-top { display: flex; gap: 16px; align-items: flex-start; }
    .deal-img { flex-shrink: 0; width: 140px; height: 140px; border-radius: var(--radius); overflow: hidden; background: var(--bg-card); }
    .deal-img img { width: 100%; height: 100%; object-fit: cover; }
    .deal-body h2 { font-size: 16px; font-weight: 700; color: var(--white); margin: 0 0 8px; }
    .deal-body h2 .deal-badge { vertical-align: middle; margin-left: 6px; }
    .deal-body p { color: var(--text-secondary); font-size: 13px; margin: 0 0 12px; line-height: 1.6; }
    .deal-store-row { margin-bottom: 10px; }
    .deal-store-tag { display: inline-flex; align-items: center; gap: 8px; padding: 4px 12px; border-radius: 14px; background: var(--bg-card); border: 1px solid var(--border); color: var(--text-secondary); font-size: 12px; font-weight: 700; text-decoration: none; transition: var(--transition); }
    .deal-store-tag:hover { border-color: var(--store-color, var(--accent)); color: var(--white); }
    .deal-store-tag img { width: 20px; height: 20px; flex-shrink: 0; }
    .deal-store-tag svg { flex-shrink: 0; }
    .deal-badge { display: inline-block; padding: 1px 7px; border-radius: 10px; background: rgba(34,197,94,.15); border: 1px solid rgba(34,197,94,.4); color: #22c55e; font-size: 10px; font-weight: 700; white-space: nowrap; }
    .deal-price-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; }
    .deal-save-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px; }
    .deal-old-price { color: var(--text-muted); font-size: 13px; text-decoration: line-through; }
    .deal-percent { color: #22c55e; font-size: 13px; font-weight: 700; }
    .deal-price { color: var(--accent); font-size: 22px; font-weight: 900; }
    .deals-store-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 20px; background: var(--accent); color: #fff; font-size: 13px; font-weight: 600; text-decoration: none; transition: background .2s; }
    .deals-store-btn:hover { background: #2563eb; color: #fff; }
    .deals-stores { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
    .deals-store { display: flex; align-items: center; gap: 10px; padding: 14px 18px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-secondary); font-size: 14px; font-weight: 700; text-decoration: none; transition: var(--transition); }
    .deals-store:hover { border-color: var(--store-color, var(--accent)); color: var(--white); transform: translateY(-2px); }
    .deals-store img { width: 20px; height: 20px; flex-shrink: 0; }
    .deals-store svg { flex-shrink: 0; }
    .deals-telegram { display: inline-flex; align-items: center; gap: 10px; padding: 14px 28px; background: rgba(0,136,204,0.1); border: 1px solid rgba(0,136,204,0.25); color: #0088cc; border-radius: 50px; font-weight: 700; font-size: 15px; text-decoration: none; transition: var(--transition); }
    .deals-telegram:hover { background: rgba(0,136,204,0.2); border-color: rgba(0,136,204,0.4); text-decoration: none; }
    @media (max-width: 600px) { .deals-page { padding: 8px 16px 40px; } .deals-grid { grid-template-columns: 1fr; } .deal-card-top { flex-direction: column; } .deal-img { width: 100%; height: auto; } .deals-stores { grid-template-columns: 1fr; } }
  </style>
</head>
<body style="margin:0;padding:0;">${header}

  <main id="mainContent">
    <div class="deals-page">
      <div class="back-row">
        <a href="/" class="guide-back-btn">${t('Back', 'Volver Atrás')}</a>
      </div>

      <h1>${t("Today's Music Gear Deals", 'Ofertas de Hoy en Equipo Musical')}</h1>
      <p class="updated">${t('Hand-picked daily discounts on the gear real musicians use.', 'Descuentos diarios seleccionados en el equipo que usan los músicos de verdad.')}</p>

      <div class="deals-card">
        <h2 style="margin-bottom:12px;">${t('Get Daily Deals on Telegram', 'Ofertas Diarias en Telegram')}</h2>
        <p style="margin-bottom:16px;">${t('We post new gear deals every 12 hours on our free Telegram channel. Deals, price drops and coupon codes — no spam, ever.', 'Publicamos ofertas nuevas cada 12 horas en nuestro canal gratuito de Telegram. Ofertas, bajadas de precio y códigos de descuento — sin spam, nunca.')}</p>
        <a class="deals-telegram" href="https://t.me/topmusiciangear" target="_blank" rel="noopener noreferrer">
          ${icon('telegram', 'fa-brands')}
          ${t('Join the Telegram channel', 'Únete al canal de Telegram')}
        </a>
      </div>

      <div class="deals-grid">
        ${deals.map(dealCard).join('')}
      </div>

      <div class="deals-card" style="margin-top:32px;">
        <h2 style="margin-bottom:12px;">${t('Shop These Trusted Stores', 'Compra en Estas Tiendas de Confianza')}</h2>
        <p style="margin-bottom:16px;">${t('We compare prices across the most trusted music gear retailers. When you buy through our links, we may earn a commission at no extra cost to you.', 'Comparamos precios en las tiendas de equipo musical más confiables. Si compras a través de nuestros enlaces, podemos ganar una comisión sin coste extra para ti.')}</p>
        <div class="deals-stores">
          ${stores.map(storeLogo).join('')}
        </div>
      </div>
    </div>
  </main>

  <footer style="padding: 32px; text-align: center; border-top: 1px solid var(--border);">
    <div style="display:flex;justify-content:center;gap:20px;margin-bottom:12px;flex-wrap:wrap">
      <a href="/about.html" style="color:var(--text-muted);font-size:12px;text-decoration:none">${t('About Me', 'Sobre Mí')}</a>
      <a href="/contact.html" style="color:var(--text-muted);font-size:12px;text-decoration:none">${t('Contact', 'Contacto')}</a>
      <a href="/privacy-policy.html" style="color:var(--text-muted);font-size:12px;text-decoration:none">${t('Privacy Policy', 'Política de Privacidad')}</a>
      <a href="/affiliate-disclosure.html" style="color:var(--text-muted);font-size:12px;text-decoration:none">${t('Affiliate Disclosure', 'Divulgación de Afiliados')}</a>
    </div>
    <p style="color: var(--text-muted); font-size: 12px;">&copy; 2026 TopMusicianGear. All rights reserved.</p>
  </footer>
</body>
</html>
`;
};

const enHtml = buildPage('en');
fs.writeFileSync('deals.html', enHtml);
fs.writeFileSync('deals_es.html', buildPage('es'));
console.log('deals.html (en) and deals_es.html (es) generated with', deals.length, 'deals');