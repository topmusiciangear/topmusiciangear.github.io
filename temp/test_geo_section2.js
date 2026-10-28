const fs = require('fs');
const vm = require('vm');
const { parseHTML } = require('linkedom');
const html = fs.readFileSync('guides/best-nylon-guitars-for-beginners.html', 'utf8');
const code = fs.readFileSync('temp/geo_inline_extracted.js', 'utf8');

function run(countryIso) {
  const { window, document } = parseHTML(html);
  const ctx = { document, window, Intl, console, setTimeout,
    XMLHttpRequest: function () {
      this.open = (m, url) => { this.url = url; };
      this.send = () => {
        this.responseText = this.url.includes('ipinfo') ? JSON.stringify({ country: countryIso }) : 'loc=' + countryIso;
        if (this.onload) this.onload.call(this);
      };
    } };
  ctx.window.XMLHttpRequest = ctx.XMLHttpRequest;
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  return document;
}

for (const c of ['GB', 'US', 'DE', 'MX', 'CA']) {
  const doc = run(c);
  const sec = [...doc.querySelectorAll('.guide-section-buy')][0];
  const pb = sec.querySelector('.shop-btn-primary');
  const ml = sec.querySelector('.shop-more-list');
  const visible = [...ml.querySelectorAll('[data-store]')].filter(r => r.style.display !== 'none').map(r => r.getAttribute('data-store'));
  console.log(c, '->', pb.textContent.replace(/\s+/g, ' ').trim(), '|| visible rows:', visible.join(', '));
}
