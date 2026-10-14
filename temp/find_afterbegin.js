const fs = require('fs');
const src = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/shop-buttons.js', 'utf8');
// Find the doSwap function and look for the afterbegin pattern
const doSwapIdx = src.indexOf('function doSwap');
const afterBeginIdx = src.indexOf('afterbegin', doSwapIdx);
console.log('doSwap at:', doSwapIdx);
console.log('afterbegin at:', afterBeginIdx);
if (afterBeginIdx > -1) {
  console.log('Context:', src.slice(afterBeginIdx - 200, afterBeginIdx + 100));
}