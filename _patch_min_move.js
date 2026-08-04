const fs = require('fs');
const p = 'js/app.min.js';
let j = fs.readFileSync(p, 'utf8');

// 1. Remove userReviewsHtml from before conclusion
const pre = '${userReviewsHtml(a)}\\n      ${(()=>{const c=';
if (!j.includes(pre)) throw new Error('reviews-before-conclusion pattern not found');
j = j.replace(pre, '${(()=>{const c=');

// 2. Insert userReviewsHtml after products grid, before related
const post = 'guide-products-cards">${b}</div></div>`:""}\\n      <div class="guide-related';
if (!j.includes(post)) throw new Error('products-before-related pattern not found');
j = j.replace(post, 'guide-products-cards">${b}</div></div>`:""}\\n      ${userReviewsHtml(a)}\\n      <div class="guide-related');

fs.writeFileSync(p, j, 'utf8');
console.log('reviews block moved after products');