var fs = require('fs');

function g(re, str) { var m = str.match(re); return m ? m[1].trim() : ''; }

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

// Extract FAQ
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

console.log('Sections: EN=' + sections.length + ' ES=' + sectionsEs.length);
sections.forEach(function(s, i) { console.log('EN[' + i + ']: ' + s.heading.substring(0, 60)); });
sectionsEs.forEach(function(s, i) { console.log('ES[' + i + ']: ' + s.heading.substring(0, 60)); });
console.log('FAQs: EN=' + faqs.length + ' ES=' + faqsEs.length);

var guideEntry = {
  id: 'beat-making',
  title: 'Best Desktop Beat-Making Studio: From Idea to Track (2026)',
  title_es: 'Mejor Estudio de Beat-Making: De la Idea a la Pista (2026)',
  category: 'production',
  badge: 'premium',
  image: 'https://r2.gear4music.com/media/34/341901/1200/preview.jpg',
  intro: sections[0] ? sections[0].content : '',
  intro_es: sectionsEs[0] ? sectionsEs[0].content : '',
  sections: [
    {
      heading: sections[1] ? sections[1].heading : '',
      heading_es: sectionsEs[1] ? sectionsEs[1].heading : '',
      content: sections[1] ? sections[1].content : '',
      content_es: sectionsEs[1] ? sectionsEs[1].content : '',
      products: [34]
    },
    {
      heading: sections[2] ? sections[2].heading : '',
      heading_es: sectionsEs[2] ? sectionsEs[2].heading : '',
      content: sections[2] ? sections[2].content : '',
      content_es: sectionsEs[2] ? sectionsEs[2].content : '',
      products: [33]
    },
    {
      heading: sections[3] ? sections[3].heading : '',
      heading_es: sectionsEs[3] ? sectionsEs[3].heading : '',
      content: sections[3] ? sections[3].content : '',
      content_es: sectionsEs[3] ? sectionsEs[3].content : '',
      products: [13]
    },
    {
      heading: sections[4] ? sections[4].heading : '',
      heading_es: sectionsEs[4] ? sectionsEs[4].heading : '',
      content: sections[4] ? sections[4].content : '',
      content_es: sectionsEs[4] ? sectionsEs[4].content : '',
      products: [15, 23]
    },
    {
      heading: sections[5] ? sections[5].heading : '',
      heading_es: sectionsEs[5] ? sectionsEs[5].heading : '',
      content: sections[5] ? sections[5].content : '',
      content_es: sectionsEs[5] ? sectionsEs[5].content : '',
      products: [1]
    },
    {
      heading: sections[6] ? sections[6].heading : '',
      heading_es: sectionsEs[6] ? sectionsEs[6].heading : '',
      content: sections[6] ? sections[6].content : '',
      content_es: sectionsEs[6] ? sectionsEs[6].content : '',
      products: [110]
    }
  ],
  featuredProducts: [34, 33, 13, 15, 23, 1, 110],
  relatedGuides: ['best-drum-machine', 'best-grooveboxes', 'daw-guide', 'midi-controllers', 'ableton-vs-fl-studio', 'best-interface']
};

// Add FAQ fields
for (var i = 0; i < 5; i++) {
  if (faqs[i]) {
    guideEntry['faq_q' + (i+1)] = faqs[i].q;
    guideEntry['faq_a' + (i+1)] = faqs[i].a;
  }
  if (faqsEs[i]) {
    guideEntry['faq_q' + (i+1) + '_es'] = faqsEs[i].q;
    guideEntry['faq_a' + (i+1) + '_es'] = faqsEs[i].a;
  }
}

// Now read guides.json and add this entry
var guides = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
guides.push(guideEntry);
fs.writeFileSync('data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Added beat-making to guides.json. Total guides: ' + guides.length);
