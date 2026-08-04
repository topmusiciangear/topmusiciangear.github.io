const fs = require('fs');
const p = 'js/app.min.js';
let j = fs.readFileSync(p, 'utf8');

const start = 'const items=rv.map(r=>';
const endAnchor = ">'+items+'</div></div>'}";
const si = j.indexOf(start);
const ei = j.indexOf(endAnchor, si);
if (si < 0 || ei < 0) throw new Error('userReviewsHtml items block not found');
const before = j.substring(0, si);
const after = j.substring(ei + endAnchor.length);

const newBlock =
  'const limit=3;const hiddenExtra=rv.length>limit?rv.slice(limit):[];' +
  'const itemOf=r=>\'<div class="guide-review-item"><div class="guide-review-item-head"><span class="guide-review-author">\'+r.author+\'</span><span class="guide-review-product">\'+r.productName+\'</span><span class="guide-review-date">\'+fmtReviewDate(r.date)+\'</span></div><div class="guide-review-stars">\'+reviewStars(r.rating)+\'</div><p class="guide-review-text">\'+(r[isEs?"text_es":"text_en"]||r.text)+\'</p></div>\';' +
  'const items=rv.slice(0,limit).map(itemOf).join("");' +
  'const hiddenItems=hiddenExtra.map(r=>\'<div class="guide-review-item" style="display:none" data-extra>\'+r.author.split("").length>0?itemOf(r).replace(\'<div class="guide-review-item">\',\'<div class="guide-review-item" style="display:none" data-extra>\'):itemOf(r)).join("");' +
  'const moreBtn=hiddenExtra.length?\'<button type="button" class="guide-reviews-more" onclick="var l=this.parentElement.querySelectorAll(\\\'.guide-review-item[data-extra]\\\');l.forEach(function(e){e.style.display=\\\'block\\\'});this.style.display=\\\'none\\\'">\'+(isEs?(\'Ver \'+hiddenExtra.length+\' más reseñas\'):(\'See \'+hiddenExtra.length+\' more reviews\'))+\'</button>\':\'\';' +
  'return \'<div class="guide-reviews" id="reviews"><div class="guide-reviews-head"><div class="guide-reviews-summary"><span class="stars">\'+reviewStars(avg)+\'</span><span><strong>\'+avg.toFixed(1)+\'</strong> · \'+rv.length+\" \"+w+\'</span></div></div><div class="guide-reviews-list">\'+items+hiddenItems+moreBtn+\'</div></div>\'';

j = before + newBlock + after;
fs.writeFileSync(p, j, 'utf8');
console.log('more reviews button patched into min');