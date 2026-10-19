const fs = require('fs');
const url = 'https://topmusiciangear.github.io/guides/best-guitar-home-office_es.html';
fetch(url)
  .then(r => r.text())
  .then(html => {
    // buscar el veredicto
    const v = html.match(/<div class="guide-verdict">[\s\S]*?<\/div>/);
    if (v) {
      const txt = v[0].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      console.log('VEREDICTO EN VIVO (fragmento):');
      console.log(txt.substring(0, 400));
    }
  })
  .catch(e => console.log('ERR', e.message));