const fs = require('fs');
const path = require('path');

var parts = [
  '*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}',
  ':root{--accent:#3b82f6;--accent-dark:#2563eb;--accent-light:#dbeafe;--accent-glow:rgba(59,130,246,0.2);--accent-glow-strong:rgba(59,130,246,0.35);--bg:#0d0d0d;--bg-secondary:#141414;--bg-card:#1a1a1a;--bg-card-hover:#222;--surface:#1e1e1e;--surface-light:#2a2a2a;--border:#2a2a2a;--border-light:#333;--text:#f0f0f0;--text-secondary:#a0a0a0;--text-muted:#909090;--white:#fff;--shadow-sm:0 1px 3px rgba(0,0,0,.3);--shadow:0 4px 12px rgba(0,0,0,.4);--shadow-md:0 8px 24px rgba(0,0,0,.5);--shadow-lg:0 16px 40px rgba(0,0,0,.5);--shadow-xl:0 24px 60px rgba(0,0,0,.6);--radius-sm:6px;--radius:10px;--radius-lg:14px;--radius-xl:18px;--transition:opacity .25s cubic-bezier(.4,0,.2,1),transform .25s cubic-bezier(.4,0,.2,1),filter .25s cubic-bezier(.4,0,.2,1)}',
  'html{scroll-behavior:smooth;background:#0d0d0d;margin:0!important;padding:0!important}',
  'body{margin:0!important;padding:0!important;font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--text);background:var(--bg);line-height:1.6;-webkit-font-smoothing:antialiased}',
  'a{text-decoration:none;color:inherit}',
  'img{max-width:100%;display:block}',
  '.skip-link{position:absolute;left:-9999px;top:0;z-index:9999;padding:8px 16px;background:var(--accent);color:#fff;font-size:14px;text-decoration:none;border-radius:0 0 6px 0}',
  '.skip-link:focus{left:0}',
  'header{background:#0d0d0d;border-bottom:1px solid var(--border);z-index:100;position:-webkit-sticky;position:sticky;top:0!important;margin:0!important;padding:0!important}',
  '.header-inner{max-width:100%;margin:0;padding:0 12px;display:flex;align-items:center;justify-content:space-between;height:64px;gap:16px}',
  '.header-left{display:flex;align-items:center;gap:24px;flex-shrink:0}',
  '.header-right{display:flex;align-items:center;gap:12px;flex-shrink:0}',
  '.header-social{display:flex;align-items:center;gap:4px}',
  '.logo{font-size:20px;font-weight:900;color:var(--white);text-decoration:none;display:flex;align-items:center;gap:10px;letter-spacing:-.5px;white-space:nowrap}',
  '.logo-text{display:flex;flex-direction:column;line-height:1.2}',
  '.logo-icon{width:36px;height:36px;background:#fff;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}',
  '.header-tagline-bar{text-align:center;font-size:17px;font-weight:500;color:var(--text-muted);letter-spacing:.3px;padding:6px 16px}',
  '.logo span{color:var(--accent)}',
  'nav{display:flex;gap:4px;flex:1}',
  '.lang-switcher{display:flex;gap:3px;flex-shrink:0;margin-left:8px}',
  '.header-social-link{display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;color:var(--text-muted);font-size:15px;text-decoration:none}',
  '.lang-btn{padding:5px 9px;border-radius:5px;border:1px solid var(--border);background:transparent;color:var(--text-muted);font-size:11px;font-weight:700;font-family:inherit;cursor:pointer;letter-spacing:.3px;text-transform:uppercase}',
  '.lang-btn.active{background:rgba(255,255,255,.1);border-color:var(--white);color:var(--white)}',
  '.nav-link{padding:8px 14px;border-radius:6px;color:var(--text-secondary);font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;background:transparent;border:none;font-family:inherit;letter-spacing:.3px}',
  '.nav-link.active{color:var(--accent);background:rgba(59,130,246,.1)}',
  'body>*:not(header):not(.bg-hero):not(#cookie-banner):not(#toast){position:relative;z-index:2}',
  '.bg-hero{position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;background-image:url("img/me-600.webp");background-size:cover;background-position:center;opacity:.12}',
  '.hero{position:relative;z-index:2;overflow:hidden;padding:0 32px 80px;min-height:80vh;box-shadow:inset 0 0 120px 60px rgba(0,0,0,.45)}',
  '.hero-inner{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;max-width:900px;margin:0 auto;position:relative;z-index:1;text-align:center}',
  '.hero-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.25);color:var(--accent);padding:6px 16px;border-radius:50px;font-size:12px;font-weight:700;margin-bottom:16px;letter-spacing:.5px;text-transform:uppercase}',
  '.hero h1{font-size:clamp(34px,6vw,64px);font-weight:900;line-height:1.05;color:var(--white);margin-bottom:20px;letter-spacing:-1.5px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}',
  '.hero h1 span{background:linear-gradient(135deg,var(--accent),#60a5fa,#93c5fd);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}',
  '.hero p{font-size:clamp(16px,2vw,19px);color:var(--text-secondary);max-width:600px;margin:0 auto 32px;line-height:1.7;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}',
  '.hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}',
  '.btn-primary{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,var(--accent),#60a5fa);color:#fff;padding:14px 32px;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none}',
  '.btn-secondary{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.06);color:var(--white);padding:14px 32px;border-radius:50px;font-weight:600;font-size:15px;text-decoration:none;border:1px solid rgba(255,255,255,.1)}',
  '.hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;padding:8px;cursor:pointer;position:relative;z-index:102}',
  '.hamburger span{width:22px;height:2px;background:var(--text-secondary);border-radius:2px}',
  '.mobile-nav{display:flex;flex-direction:column;gap:4px;position:fixed;top:0;right:16px;padding-top:16px;z-index:101;opacity:0;pointer-events:none}',
  '.mobile-nav.open{opacity:1;pointer-events:auto}',
  '@media(max-width:768px){.header-social{display:none}.header-tagline-bar{font-size:13px;padding:2px 12px}.hamburger{display:flex}}',
  '#cookie-banner.cookie-visible{transform:translateY(0)}',
];

var critical = parts.join('');

var fp = path.join(__dirname, '..', 'index.html');
var html = fs.readFileSync(fp, 'utf8');
html = html.replace('{%INLINE_CRITICAL_CSS%}', critical);
fs.writeFileSync(fp, html);
console.log('Injected ' + (critical.length/1024).toFixed(1) + 'KB critical CSS');
