const fs = require('fs');
const guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));

function show(id, pick) {
  const g = guides.find(x => x.id === id);
  console.log('\n===== ' + id + ' =====');
  pick(g);
}

show('studio-furniture', g => {
  console.log('S2 EN:', g.sections[2].content);
  console.log('\nS2 ES:', g.sections[2].content_es);
});

show('pro-monitors', g => {
  console.log('FAQ3 ES:', g.featuredSnippet.faq_q3_es);
  console.log('ANS3 ES:', g.featuredSnippet.faq_a3_es);
});

show('studio-subwoofers-setup', g => {
  console.log('S3 ES:', g.sections[3].content_es);
});

show('monitor-setup', g => {
  console.log('\nS6 ES:', g.sections[6].content_es);
  console.log('\nS7 ES:', g.sections[7].content_es);
  console.log('\nCONCL ES:', g.conclusion_es);
  console.log('\nCONCL EN:', g.conclusion);
});
