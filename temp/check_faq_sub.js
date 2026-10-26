const fs=require('fs');
const g=JSON.parse(fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/data/guides.json','utf8'));
const gu=g.find(x=>x.id==='studio-subwoofers');
const f=gu.featuredSnippet;
console.log('Q5 EN:', f.faq_q5_en);
console.log('A5 EN:', f.faq_a5_en);
console.log('Q5 ES:', f.faq_q5_es);
console.log('A5 ES:', f.faq_a5_es);