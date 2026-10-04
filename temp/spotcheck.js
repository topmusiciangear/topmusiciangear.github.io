const fs = require('fs');
// 1. Price range row in a table guide (EN)
let h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/budget-headphones.html', 'utf8');
let i = h.indexOf('>Price<');
console.log('1. budget-headphones Price row:', JSON.stringify(h.slice(i - 60, i + 400).replace(/<[^>]*>/g, '|').slice(0, 300)));
// 2. comparison Price row
h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/hs8-vs-rokit-7.html', 'utf8');
i = h.indexOf('>Price<');
console.log('2. hs8-vs-rokit Price row:', JSON.stringify(h.slice(i - 60, i + 300).replace(/<[^>]*>/g, '|').slice(0, 220)));
// 3. new verdict con present?
h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-microphone.html', 'utf8');
console.log('3. SM7B new con:', h.includes('windscreen removal to reach') ? 'OK' : 'MISSING');
// 4. ES fix present?
h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-monitors_es.html', 'utf8');
console.log('4. ES fix (marca una diferencia):', h.includes('marca una diferencia real') ? 'OK' : 'MISSING');
// 5. conclusion links in previous linkless guide
h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/budget-headphones.html', 'utf8');
console.log('5. concl links:', h.includes('/guides/k371-vs-mdr7506.html" class="guide-link-btn"') ? 'OK' : 'MISSING');