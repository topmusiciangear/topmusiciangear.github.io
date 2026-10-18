const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
const claves = ['305P MkII the best budget', 'guide-faq', 'faqBase', 'budget-monitors'];
claves.forEach(k => console.log(k + ' -> ' + s.indexOf(k)));

const i = s.indexOf('305P MkII the best budget');
console.log('\n--- contexto del FAQ ---');
const ini = s.lastIndexOf('var ', i);
const ini2 = s.lastIndexOf('const ', i);
const ini3 = s.lastIndexOf('let ', i);
console.log('declaracion empieza en: ' + Math.max(ini, ini2, ini3));
console.log(s.slice(Math.max(ini, ini2, ini3) - 60, Math.max(ini, ini2, ini3) + 400));
