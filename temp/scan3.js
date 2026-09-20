const fs = require('fs');
const path = 'guides';
const files = fs.readdirSync(path).filter(f => f.endsWith('.html'));
const faqUnder = [];
const consUnder = [];
let totalFaqItems = 0, totalConsLists = 0;
files.forEach(f => {
  const h = fs.readFileSync(path + '/' + f, 'utf8');
  const faqItems = (h.match(/guide-faq-item/g) || []).length;
  const consLists = (h.match(/verdict-cons-list/g) || []).length;
  totalFaqItems += faqItems;
  totalConsLists += consLists;
  if (faqItems <= 3) faqUnder.push(f + ' faq=' + faqItems);
  if (consLists > 0) {
    const blocks = h.split(/guide-cons-list/g).length - 1;
    // per verdict col count of <li> inside each verdict-col before verdict-list-group cons
  }
});
console.log('pages:', files.length, ' total faq-items rendered:', totalFaqItems, ' total cons-lists:', totalConsLists);
console.log('PAGES with FAQ <= 3:');
faqUnder.forEach(x => console.log('  ' + x));

// For cons: count <li> within verdict-cons-list per block
const consUnderList = [];
files.forEach(f => {
  const h = fs.readFileSync(path + '/' + f, 'utf8');
  const re = /<ul class="verdict-cons-list">([\s\S]*?)<\/ul>/g;
  let m, idx = 0;
  while ((m = re.exec(h)) !== null) {
    const n = (m[1].match(/<li>/g) || []).length;
    if (n < 4) consUnderList.push(f + ' verdictCol#' + idx + ' cons=' + n + ' :: ' + m[1].replace(/<[^>]+>/g, '').trim().slice(0, 70));
    idx++;
  }
});
console.log('VERDICT COLUMNS with cons < 4:');
consUnderList.forEach(x => console.log('  ' + x));