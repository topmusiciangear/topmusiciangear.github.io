var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });

// Replace AT2020USB-X (291) with AT2020USB-XP (668) in sections 2 and 3
g.sections[2].products = [286, 287, 668];  // AT2040USB, TC-777, AT2020USB-XP
g.sections[3].products = [299, 287, 668];  // Profile, TC-777, AT2020USB-XP

// Update featuredProducts: already has 668, remove 291 if present
g.featuredProducts = g.featuredProducts.filter(function (id) { return id !== 291; });
if (g.featuredProducts.indexOf(668) === -1) g.featuredProducts.push(668);

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('Updated sections 2,3 with AT2020USB-XP');
console.log('Sec2:', JSON.stringify(g.sections[2].products));
console.log('Sec3:', JSON.stringify(g.sections[3].products));
console.log('Featured:', JSON.stringify(g.featuredProducts));