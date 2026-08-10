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

const navLink = (href, en, es) => `<a href="${href}" class="nav-link"><span class="lang-show-en">${en}</span><span class="lang-show-es">${es}</span></a>`;

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
          ${navLink('/deals.html', 'Deals', 'Ofertas')}
          ${navLink('/#mysetup', 'My Setup', 'Mi Equipo')}
          ${navLink('/#about', 'About Me', 'Sobre Mí')}
        </nav>
      </div>
      <div class="audio-mini" id="audioMini">
        <div class="audio-mini-inner">
          <span class="audio-mini-player"><audio controls preload="none"><source src="/audio/solo-tres.mp3" type="audio/mpeg"></audio></span>
          <span class="audio-eq"><i></i><i></i><i></i><i></i></span>
          <span class="audio-mini-label">Cuban Tres, Bass &amp; Guitar - played and recorded with my personal gear</span>
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
          <button class="lang-btn" title="English" onclick="setLang('en')">${flagEn}</button>
          <button class="lang-btn" title="Español" onclick="setLang('es')">${flagEs}</button>
        </div>
        <button class="hamburger" id="hamburger" aria-label="Menu" onclick="document.getElementById('mobileNav').classList.toggle('open')">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <div class="mobile-nav" id="mobileNav">
    <a class="nav-link" href="/#guides"><span class="lang-show-en">Guides</span><span class="lang-show-es">Guías</span></a>
    <a class="nav-link" href="/deals.html"><span class="lang-show-en">Deals</span><span class="lang-show-es">Ofertas</span></a>
    <a class="nav-link" href="/#mysetup"><span class="lang-show-en">My Setup</span><span class="lang-show-es">Mi Equipo</span></a>
    <a class="nav-link" href="/#about"><span class="lang-show-en">About Me</span><span class="lang-show-es">Sobre Mí</span></a>
  </div>
`;

// Store icon: match home page patterns
const storeLogo = (s) => {
  const map = {
    'Plugin Boutique': { color: '#6366f1', mark: '<img src="img/pluginboutique-icon.png" alt="Plugin Boutique" width="20" height="20">' },
    'Gear4Music': { color: '#8b5cf6', mark: '<img src="img/gear4music-icon.png" alt="Gear4Music" width="20" height="20">' },
    'Amazon': { color: '#ff9900', mark: '<svg class="icon fa-brands" style="font-size:20px;color:#ff9900;" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor"><path d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"/></svg>' },
    'Reverb': { color: '#d6562b', mark: '<span style="font-weight:900;font-size:14px;width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;background:#d6562b;color:#fff;border-radius:3px;flex-shrink:0;">R</span>' },
    'Andertons': { color: '#000000', mark: '<span style="font-weight:900;font-size:14px;width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;background:#000;color:#fff;border-radius:3px;flex-shrink:0;">A</span>' },
    'Music Store': { color: '#1a3a5c', mark: '<img src="img/musicstore-icon.png" alt="Music Store" style="width:auto;height:10px">' }
  };
  const c = map[s.name] || { color: 'var(--accent)', mark: '' };
  return `<a href="${s.url}" target="_blank" rel="noopener noreferrer sponsored" class="deals-store" style="--store-color:${c.color}">${c.mark}<span>${s.name}</span></a>`;
};

const dealCard = (d, i) => {
  const en = d.badge_en ? `<span class="deal-badge">${d.badge_en}</span>` : '';
  const es = d.badge_es ? `<span class="deal-badge">${d.badge_es}</span>` : '';
  const old = d.old_price ? `<span class="deal-old-price">$${d.old_price}</span>` : '';
  const price = `$${d.price}`;
  return `
  <div class="deals-card deal-card">
    ${en || es ? `<div class="deal-badge-row"><span class="lang-show-en">${en}</span><span class="lang-show-es">${es}</span></div>` : ''}
    <div class="deal-card-top">
      <a class="deal-img" href="${d.store_url}" target="_blank" rel="noopener noreferrer sponsored"><img src="${d.img}" alt="${d.title}" loading="lazy"></a>
      <div class="deal-body">
        <h2>${d.title}</h2>
        <p class="lang-show-en">${d.desc}</p>
        <p class="lang-show-es">${d.desc_es || d.desc}</p>
        <div class="deal-price-row">${old}<span class="deal-price">${price}</span></div>
        <a href="${d.store_url}" target="_blank" rel="noopener noreferrer sponsored" class="deals-store-btn">★ <span class="lang-show-en">View Deal</span><span class="lang-show-es">Ver Oferta</span></a>
      </div>
    </div>
  </div>`;
};

const stores = [
  { name: 'Plugin Boutique', url: 'https://www.pluginboutique.com/?a_aid=6a01e859cbe1a' },
  { name: 'Gear4Music', url: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111' },
  { name: 'Amazon', url: 'https://www.amazon.com/?tag=topmusicg-20' },
  { name: 'Reverb', url: 'https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111' },
  { name: 'Andertons', url: 'https://www.andertons.co.uk/?irgwc=1&irpid=7292297' },
  { name: 'Music Store', url: 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111' }
];

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Today's Music Gear Deals — TopMusicianGear</title>
  <meta name="description" content="Daily music gear deals and discounts on guitars, microphones, interfaces, headphones, monitors and plugins — hand-picked by a pro musician.">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="https://topmusiciangear.com/deals.html">
  <link rel="alternate" hreflang="x-default" href="https://topmusiciangear.com/deals.html">
  <link rel="alternate" hreflang="en" href="https://topmusiciangear.com/deals.html">
  <link rel="alternate" hreflang="es" href="https://topmusiciangear.com/deals.html">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Today's Music Gear Deals — TopMusicianGear">
  <meta property="og:description" content="Daily music gear deals and discounts on guitars, microphones, interfaces, headphones, monitors and plugins.">
  <meta property="og:url" content="https://topmusiciangear.com/deals.html">
  <meta property="og:image" content="https://topmusiciangear.com/img/favicon.png">
  <meta property="og:site_name" content="TopMusicianGear">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Today's Music Gear Deals — TopMusicianGear">
  <meta name="twitter:description" content="Daily music gear deals and discounts.">
  <meta name="twitter:site" content="@Cuban3Beats">
  <link rel="icon" type="image/png" href="img/favicon.png?v=2">
  <link rel="stylesheet" href="css/style.css?v=28">
  <style>
    .lang-show-es { display: none; }
    html[lang="es"] .lang-show-es { display: block; }
    html[lang="es"] .lang-show-en { display: none; }
    body { background: var(--bg); }
    .deals-page { max-width: 1100px; margin: 0 auto; padding: 40px 32px 64px; }
    .deals-page h1 { font-size: clamp(28px, 4vw, 42px); font-weight: 900; color: var(--white); margin-bottom: 8px; letter-spacing: -.5px; }
    .deals-page .updated { color: var(--text-muted); font-size: 14px; margin-bottom: 24px; }
    .back-row { margin: 16px 0 8px; }
    .deals-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; margin-top: 24px; }
    .deal-card { padding: 20px; }
    .deal-card-top { display: flex; gap: 16px; align-items: flex-start; }
    .deal-img { flex-shrink: 0; width: 140px; height: 140px; border-radius: var(--radius); overflow: hidden; background: var(--bg-card); }
    .deal-img img { width: 100%; height: 100%; object-fit: cover; }
    .deal-body h2 { font-size: 16px; font-weight: 700; color: var(--white); margin: 0 0 8px; }
    .deal-body p { color: var(--text-secondary); font-size: 13px; margin: 0 0 12px; line-height: 1.6; }
    .deal-badge-row { margin-bottom: 8px; }
    .deal-badge { display: inline-block; padding: 3px 10px; border-radius: 12px; background: rgba(59,130,246,.15); border: 1px solid rgba(59,130,246,.4); color: var(--accent); font-size: 11px; font-weight: 700; }
    .deal-price-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 12px; }
    .deal-old-price { color: var(--text-muted); font-size: 13px; text-decoration: line-through; }
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
    @media (max-width: 600px) { .deals-page { padding: 32px 16px 40px; } .deals-grid { grid-template-columns: 1fr; } .deal-card-top { flex-direction: column; } .deal-img { width: 100%; height: auto; } .deals-stores { grid-template-columns: 1fr; } }
  </style>
</head>
<body style="margin:0;padding:0;">${header}

  <main id="mainContent">
    <div class="deals-page">
      <div class="back-row">
        <a href="/" class="guide-back-btn">${icon('arrow-left', 'fa-solid')} <span class="lang-show-en">Back</span><span class="lang-show-es">Volver Atrás</span></a>
      </div>

      <h1 class="lang-show-en">Today's Music Gear Deals 🎯</h1>
      <h1 class="lang-show-es">Ofertas de Hoy en Equipo Musical 🎯</h1>
      <p class="updated lang-show-en">Hand-picked daily discounts on the gear real musicians use.</p>
      <p class="updated lang-show-es">Descuentos diarios seleccionados en el equipo que usan los músicos de verdad.</p>

      <div class="deals-card">
        <h2 class="lang-show-en" style="margin-bottom:12px;">Get Daily Deals on Telegram</h2>
        <h2 class="lang-show-es" style="margin-bottom:12px;">Ofertas Diarias en Telegram</h2>
        <p class="lang-show-en" style="margin-bottom:16px;">We post new gear deals every 12 hours on our free Telegram channel. Deals, price drops and coupon codes — no spam, ever.</p>
        <p class="lang-show-es" style="margin-bottom:16px;">Publicamos ofertas nuevas cada 12 horas en nuestro canal gratuito de Telegram. Ofertas, bajadas de precio y códigos de descuento — sin spam, nunca.</p>
        <a class="deals-telegram" href="https://t.me/topmusiciangear" target="_blank" rel="noopener noreferrer">
          ${icon('telegram', 'fa-brands')}
          <span class="lang-show-en">Join the Telegram channel</span><span class="lang-show-es">Únete al canal de Telegram</span>
        </a>
      </div>

      <div class="deals-grid">
        ${deals.map(dealCard).join('')}
      </div>

      <div class="deals-card" style="margin-top:32px;">
        <h2 class="lang-show-en" style="margin-bottom:12px;">Shop These Trusted Stores</h2>
        <h2 class="lang-show-es" style="margin-bottom:12px;">Compra en Estas Tiendas de Confianza</h2>
        <p class="lang-show-en" style="margin-bottom:16px;">We compare prices across the most trusted music gear retailers. When you buy through our links, we may earn a commission at no extra cost to you.</p>
        <p class="lang-show-es" style="margin-bottom:16px;">Comparamos precios en las tiendas de equipo musical más confiables. Si compras a través de nuestros enlaces, podemos ganar una comisión sin coste extra para ti.</p>
        <div class="deals-stores">
          ${stores.map(storeLogo).join('')}
        </div>
      </div>
    </div>
  </main>

  <footer style="padding: 32px; text-align: center; border-top: 1px solid var(--border);">
    <div style="display:flex;justify-content:center;gap:20px;margin-bottom:12px;flex-wrap:wrap">
      <a href="/about.html" style="color:var(--text-muted);font-size:12px;text-decoration:none">About Me</a>
      <a href="/contact.html" style="color:var(--text-muted);font-size:12px;text-decoration:none">Contact</a>
      <a href="/privacy-policy.html" style="color:var(--text-muted);font-size:12px;text-decoration:none">Privacy Policy</a>
      <a href="/affiliate-disclosure.html" style="color:var(--text-muted);font-size:12px;text-decoration:none">Affiliate Disclosure</a>
    </div>
    <p style="color: var(--text-muted); font-size: 12px;">&copy; 2026 TopMusicianGear. All rights reserved.</p>
  </footer>

  <script>
    var lang = localStorage.getItem("lang") || "en";
    document.documentElement.lang = lang;
    function setLang(l) {
      localStorage.setItem("lang", l);
      document.documentElement.lang = l;
      document.querySelectorAll(".lang-btn").forEach(function(b) {
        b.classList.remove("active");
        if (b.getAttribute("title").toLowerCase().indexOf((l === "es" ? "espa" : "english")) > -1) b.classList.add("active");
      });
    }
    setLang(lang);
  </script>
  <script src="js/app.min.js?v=4baafe1d1613e" defer></script>
</body>
</html>
`;

fs.writeFileSync('deals.html', html);
console.log('deals.html generated with', deals.length, 'deals');