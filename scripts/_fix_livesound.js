var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var guide = data.find(function(x) { return x.id === 'live-sound-pa'; });

// Section 1 ES content (942 chars) vs EN (276 chars) - EN is truncated
var sec1_es = guide.sections[1].content_es;
var sec1_en = guide.sections[1].content;

console.log('Section 1 EN length: ' + sec1_en.length);
console.log('Section 1 ES length: ' + sec1_es.length);
console.log('');
console.log('Section 1 ES content:');
console.log(sec1_es);
console.log('');
console.log('Section 1 EN content:');
console.log(sec1_en);

// Also check section 2
var sec2_es = guide.sections[2].content_es;
var sec2_en = guide.sections[2].content;
console.log('');
console.log('Section 2 EN length: ' + sec2_en.length);
console.log('Section 2 ES length: ' + sec2_es.length);
