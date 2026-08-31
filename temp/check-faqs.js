var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

var shortFaqs = [];
g.forEach(guide => {
  if (!guide.faq) return;
  guide.faq.forEach((faq, i) => {
    if (faq.question && faq.question.length < 20) {
      shortFaqs.push(guide.id + ': Q=' + faq.question + ' A=' + (faq.answer||'').substring(0,40));
    }
    if (faq.answer && faq.answer.length < 40) {
      shortFaqs.push(guide.id + ' (short A): Q=' + (faq.question||'').substring(0,30) + ' A=' + faq.answer);
    }
  });
});
console.log('Short FAQs (' + shortFaqs.length + '):');
shortFaqs.slice(0, 20).forEach(x => console.log('  ' + x));
if (shortFaqs.length > 20) console.log('  ...+' + (shortFaqs.length - 20) + ' more');
