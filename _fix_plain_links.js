const fs = require('fs');
const g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));

const fixes = {
  'beginner-bass-guitars': {
    0: [
      ['<a href="/guides/precision-vs-jazz.html">P-Bass vs J-Bass guide</a>', '<a class="guide-link-btn" href="/guides/precision-vs-jazz.html">P-Bass vs J-Bass guide</a>']
    ],
    1: [
      ['<a href="/guides/best-electric-under-500.html">best bass guitars under $500</a>', '<a class="guide-link-btn" href="/guides/best-electric-under-500.html">best basses under $500</a>'],
      ['<a href="/guides/budget-bass-like-expensive.html">budget bass guitars that sound premium</a>', '<a class="guide-link-btn" href="/guides/budget-bass-like-expensive.html">budget bass that sounds premium</a>']
    ],
    2: [
      ['<a href="/guides/fender-bass-guide.html">Fender bass guide</a>', '<a class="guide-link-btn" href="/guides/fender-bass-guide.html">Fender bass guide</a>']
    ]
  },
  'portable-interfaces': {
    0: [
      ['<a href="/guides/best-interface.html">best audio interface guide</a>', '<a class="guide-link-btn" href="/guides/best-interface.html">best audio interfaces</a>']
    ],
    1: [
      ['<a href="/guides/scarlett-vs-volt.html">Scarlett 2i2 vs UA Volt 2</a>', '<a class="guide-link-btn" href="/guides/scarlett-vs-volt.html">Scarlett 2i2 vs UA Volt 2</a>'],
      ['<a href="/guides/audient-vs-motu.html">Audient iD14 vs MOTU M2</a>', '<a class="guide-link-btn" href="/guides/audient-vs-motu.html">Audient iD14 vs MOTU M2</a>']
    ]
  },
  'guitar-pedals': {
    0: [
      ['<a href="/guides/best-pedalboards.html">best pedalboard setups</a>', '<a class="guide-link-btn" href="/guides/best-pedalboards.html">best pedalboard setups</a>']
    ],
    1: [
      ['<a href="/guides/best-reverbs.html">best reverb pedals</a>', '<a class="guide-link-btn" href="/guides/best-reverbs.html">best reverb pedals</a>'],
      ['<a href="/guides/best-delays.html">best delay pedals</a>', '<a class="guide-link-btn" href="/guides/best-delays.html">best delay pedals</a>'],
      ['<a href="/guides/best-overdrives.html">best overdrive pedals</a>', '<a class="guide-link-btn" href="/guides/best-overdrives.html">best overdrive pedals</a>']
    ]
  }
};

Object.entries(fixes).forEach(([id, sections]) => {
  const guide = g.find(x => x.id === id);
  Object.entries(sections).forEach(([idx, replacements]) => {
    let content = guide.sections[parseInt(idx)].content;
    replacements.forEach(([old, rep]) => {
      content = content.replace(old, rep);
    });
    guide.sections[parseInt(idx)].content = content;
    console.log('FIXED:', id, 'section', idx);
  });
});

fs.writeFileSync('data/guides.json', JSON.stringify(g,null,2),'utf8');
console.log('Saved');
