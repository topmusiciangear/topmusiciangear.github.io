const fs = require('fs');
const p = 'js/app.min.js';
let j = fs.readFileSync(p, 'utf8');

// 1. productRatingLine: always show rating (left) + small write button (right)
const oldPRL = j.match(/function productRatingLine\(p\)\{[\s\S]*?\nfunction fmtReviewDate/)[0];
const newPRL = `function productRatingLine(p){const st=reviewStats(p.id);const isEs=currentLang==="es";const word=st?(isEs?(st.reviewCount===1?"rese\u00f1a":"rese\u00f1as"):(st.reviewCount===1?"review":"reviews")):"";const ratingHtml=st?'<span class="guide-product-card-rating">'+reviewStars(st.ratingValue)+' <strong class="guide-product-card-rating-num">'+st.ratingValue.toFixed(1)+'</strong> <span class="guide-product-card-rating-count">('+st.reviewCount+' '+word+')</span></span>':'<span class="guide-product-card-rating"></span>';const btnLabel=isEs?"Escribe una rese\u00f1a":"Write a review";return '<div class="guide-product-card-rating-row">'+ratingHtml+'<button class="guide-review-write-btn" onclick="openReviewModal('+p.id+')">'+btnLabel+'</button></div>'}function fmtReviewDate`;
j = j.replace(oldPRL, newPRL);

// 2. userReviewsHtml: bilingual text in <p>
const oldP = "'+r.text+'</p>";
if (!j.includes(oldP)) throw new Error('review-text p pattern not found');
j = j.replace(oldP, "'+(r[isEs?\"text_es\":\"text_en\"]||r.text)+'</p>");

// 3. userReviewsHtml: remove write button from published reviews block
const btnInReviews = "<button class=\"guide-review-write-btn\" onclick=\"openReviewModal()\">'+(isEs?\"Escribe una reseña\":\"Write a review\")+'</button>";
if (!j.includes(btnInReviews)) {
  console.log('review-block button literal NOT found, searching...');
  const i = j.indexOf('guide-reviews-head');
  console.log(JSON.stringify(j.substring(i, i + 300)));
  throw new Error('review-block button not found');
}
j = j.replace(btnInReviews, '');

// 4. star picker: hover preview + click fix
const spStart = 'rmRating=0;const picker=document.getElementById("rmStars");';
const spEnd = 'document.getElementById("rmSubmit").addEventListener("click",submitReview)}';
const si = j.indexOf(spStart);
const ei = j.indexOf(spEnd, si);
if (si < 0 || ei < 0) throw new Error('star picker pattern not found');
const oldSP = j.substring(si, ei + spEnd.length);
const newSP = `rmRating=0;const picker=document.getElementById("rmStars");function paintStars(n){Array.prototype.forEach.call(picker.children,function(c,ci){c.classList.toggle("active",ci<n);c.classList.remove("hover")})}for(let i=1;i<=5;i++)(function(n){const s=document.createElement("span");s.textContent="\u2605";s.addEventListener("mouseover",function(){Array.prototype.forEach.call(picker.children,function(c,ci){c.classList.toggle("hover",ci<n);c.classList.remove("active")})});s.addEventListener("mouseout",function(){paintStars(rmRating)});s.addEventListener("click",function(){rmRating=n;paintStars(n);document.getElementById("rmSubmit").disabled=false});picker.appendChild(s)})(i);picker.addEventListener("mouseleave",function(){paintStars(rmRating)});document.getElementById("rmSubmit").addEventListener("click",submitReview);}`;
j = j.replace(oldSP, newSP);

fs.writeFileSync(p, j, 'utf8');
console.log('app.min.js updated OK');
