const fs = require('fs');
const s = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/build-guides.js', 'utf8');
console.log('--- bloque guide-faq en 15267 ---');
console.log(s.slice(15100, 15600));
console.log('\n--- faqBase en 202637 ---');
console.log(s.slice(202500, 204200));
