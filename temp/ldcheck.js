const fs = require('fs');
const h = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/pro-microphones.html', 'utf8');
// find Product schemas with AggregateOffer
const aggCount = (h.match(/"AggregateOffer"/g) || []).length;
const offerCount = (h.match(/"@type":"Offer"/g) || []).length;
const oosCount = (h.match(/OutOfStock/g) || []).length;
console.log('AggregateOffer:', aggCount, '| Offer:', offerCount, '| OutOfStock:', oosCount);
// show one AggregateOffer sample
const i = h.indexOf('"AggregateOffer"');
console.log(h.slice(Math.max(0, i - 200), i + 400));