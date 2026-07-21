var fs = require('fs');

function g(re, str) { var m = str.match(re); return m ? m[1].trim() : ''; }

var data = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
data = data.filter(function(g) { return g.id !== 'beat-making'; });

var html = fs.readFileSync('guides/beat-making.html', 'utf8');
var htmlEs = fs.readFileSync('guides/beat-making_es.html', 'utf8');

function extractSections(h) {
  var result = [];
  var blocks = h.split('<div class="guide-section">');
  blocks.shift();
  blocks.forEach(function(b) {
    var heading = g(/<h2 class="guide-section-heading">([^<]+)<\/h2>/, b);
    var content = g(/<div class="guide-section-content">([\s\S]*?)<\/div>\s*<\/div>/, b);
    if (heading && content) result.push({ heading: heading, content: content });
  });
  return result;
}

var sections = extractSections(html);
var sectionsEs = extractSections(htmlEs);

function extractFAQ(h) {
  var faqs = [];
  var items = h.split('<div class="guide-faq-item">');
  items.shift();
  items.forEach(function(item) {
    var q = g(/<button class="guide-faq-question"[^>]*>([^<]+)</, item);
    var a = g(/<div class="guide-faq-answer-inner">([\s\S]*?)<\/div>/, item);
    if (q) faqs.push({ q: q.replace(/<[^>]+>/g, '').trim(), a: a.replace(/<[^>]+>/g, '').trim() });
  });
  return faqs;
}

var faqs = extractFAQ(html);
var faqsEs = extractFAQ(htmlEs);

var introContent = g(/<div class="guide-detail-intro">([\s\S]*?)<\/div>/, html);
var introContentEs = g(/<div class="guide-detail-intro">([\s\S]*?)<\/div>/, htmlEs);

console.log('Sections: ' + sections.length + ' EN');
sections.forEach(function(s, i) { console.log('  [' + i + '] ' + s.heading.substring(0, 60)); });
console.log('Sections ES: ' + sectionsEs.length);
console.log('FAQs: ' + faqs.length + ' EN, ' + faqsEs.length + ' ES');
console.log('Intro: ' + introContent.substring(0, 80));

var newEntry = {
  id: 'beat-making',
  title: 'Best Desktop Beat-Making Studio: From Idea to Track (2026)',
  title_es: 'Mejor Estudio de Beat-Making: De la Idea a la Pista (2026)',
  category: 'production',
  badge: 'premium',
  image: 'https://r2.gear4music.com/media/34/341901/1200/preview.jpg',
  intro: introContent,
  intro_es: introContentEs,
  sections: [
    {
      heading: sections[1].heading,
      heading_es: sectionsEs[1].heading,
      content: sections[1].content,
      content_es: sectionsEs[1].content,
      products: [34]
    },
    {
      heading: sections[2].heading,
      heading_es: sectionsEs[2].heading,
      content: sections[2].content,
      content_es: sectionsEs[2].content,
      products: [33]
    },
    {
      heading: sections[3].heading,
      heading_es: sectionsEs[3].heading,
      content: sections[3].content,
      content_es: sectionsEs[3].content,
      products: [13]
    },
    {
      heading: sections[4].heading,
      heading_es: sectionsEs[4].heading,
      content: sections[4].content,
      content_es: sectionsEs[4].content,
      products: [15, 23]
    },
    {
      heading: sections[5].heading,
      heading_es: sectionsEs[5].heading,
      content: sections[5].content,
      content_es: sectionsEs[5].content,
      products: [1]
    },
    {
      heading: sections[6].heading,
      heading_es: sectionsEs[6].heading,
      content: sections[6].content,
      content_es: sectionsEs[6].content,
      products: [110]
    }
  ],
  featuredProducts: [34, 33, 13, 15, 23, 1, 110],
  relatedGuides: ['best-drum-machine', 'best-grooveboxes', 'daw-guide', 'midi-controllers', 'ableton-vs-fl-studio', 'best-interface']
};

for (var i = 0; i < 5; i++) {
  if (faqs[i]) {
    newEntry['faq_q' + (i+1)] = faqs[i].q;
    newEntry['faq_a' + (i+1)] = faqs[i].a;
  }
  if (faqsEs[i]) {
    newEntry['faq_q' + (i+1) + '_es'] = faqsEs[i].q;
    newEntry['faq_a' + (i+1) + '_es'] = faqsEs[i].a;
  }
}

data.push(newEntry);
fs.writeFileSync('data/guides.json', JSON.stringify(data, null, 2), 'utf8');
console.log('Added beat-making. Total guides: ' + data.length);

var check = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
var bg = check.find(function(x) { return x.id === 'beat-making'; });
console.log('Verified: intro="' + bg.intro.substring(0, 60) + '..."');
console.log('Verified: sections[0].heading="' + bg.sections[0].heading.substring(0, 60) + '..."');
console.log('Verified: faq_q1="' + (bg.faq_q1 || '').substring(0, 60) + '..."');
