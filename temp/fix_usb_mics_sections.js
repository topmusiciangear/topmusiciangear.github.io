var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });

// Section 2: AT2040USB - remove AM8(279) and PM461(284), keep AT2040USB(286), TC-777(287), AT2020USB-X(291)
g.sections[2].products = [286, 287, 291];

// Section 3: Sennheiser Profile - remove AM8(279) and PM461(284), keep Profile(299), TC-777(287), AT2020USB-X(291)
g.sections[3].products = [299, 287, 291];

// Section 4: NT1 5th Gen - remove AT2020USB-X(291), add AT2020USB-XP(668)
g.sections[4].products = [3, 252, 253, 668, 277, 292, 276];

// Update featuredProducts: replace AT2020USB-X (291) with AT2020USB-XP (668)
g.featuredProducts = g.featuredProducts.map(function (id) { return id === 291 ? 668 : id; });

// Update conclusion: mention AT2020USB-XP instead of AT2020USB+
g.conclusion = g.conclusion.replace('AT2020USB+', 'AT2020USB-XP');
g.conclusion_es = g.conclusion_es.replace('AT2020USB+', 'AT2020USB-XP');

// Update featuredSnippet text
var F = g.featuredSnippet;
F.text_en = F.text_en.replace('AT2020USB+', 'AT2020USB-XP');
F.text_es = F.text_es.replace('AT2020USB+', 'AT2020USB-XP');

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('Fixed sections 2,3,4 and featuredProducts');
console.log('Sec2:', JSON.stringify(g.sections[2].products));
console.log('Sec3:', JSON.stringify(g.sections[3].products));
console.log('Sec4:', JSON.stringify(g.sections[4].products));
console.log('Featured:', JSON.stringify(g.featuredProducts));