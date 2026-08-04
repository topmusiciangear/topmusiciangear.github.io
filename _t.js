const fs = require('fs');
const j = fs.readFileSync('js/app.min.js', 'utf8');
console.log('1. productRatingLine row:', j.includes('guide-product-card-rating-row'));
console.log('2. rating num toFixed:', j.includes('guide-product-card-rating-num'));
console.log('3. bilingual in p:', j.includes('r[isEs?"text_es":"text_en"]'));
console.log('4. write button removed from reviews block:', !j.includes('<button class="guide-review-write-btn" onclick="openReviewModal()">\x27+(isEs'));
console.log('5. star picker paintStars:', j.includes('paintStars'));
console.log('6. star picker mouseover hover:', j.includes('classList.toggle("hover",ci<n)'));
console.log('7. picker mouseleave:', j.includes('picker.addEventListener("mouseleave"'));
// verify the reviews block region is well-formed
const i = j.indexOf('guide-reviews-head');
console.log('--- reviews head region ---');
console.log(JSON.stringify(j.substring(i - 30, i + 240)));
