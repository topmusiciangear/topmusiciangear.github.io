const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/best-5-string-basses.html', 'utf8');
const card = h.slice(467532, 476000);
console.log(card.slice(0, 1500));
console.log('=== has shop-more-list:', card.includes('shop-more-list'));
console.log('=== has musicstore:', card.includes('musicstore'));
