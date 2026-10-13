var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });

// 9 product IDs from the table (in order)
var tableIds = [194, 195, 286, 299, 3, 666, 253, 252, 291];

// Section 0: MV7+ + Q2U + NT-USB+ (all in table)
g.sections[0].products = [194, 276, 666];  // MV7+, Q2U, NT-USB+

// Section 1: Wave:3 (in table)
g.sections[1].products = [195];

// Section 2: AT2040USB (in table) - remove TC-777 and AT2020USB-XP
g.sections[2].products = [286];

// Section 3: Profile (in table) - remove TC-777 and AT2020USB-XP
g.sections[3].products = [299];

// Section 4: NT1 5th Gen (in table)
g.sections[4].products = [3];

// Section 5: Maono PD200X - NOT in table, remove section entirely
g.sections.splice(5, 1);  // removes Maono PD200X section

// Section 6 (now 5): Q2U (in table)
g.sections[5].products = [276];

// Section 7 (now 6): MV6 - NOT in table, remove section entirely
g.sections.splice(6, 1);  // removes MV6 section

// Section 8 (now 6): TC-777 - NOT in table, remove
g.sections.splice(6, 1);  // removes TC-777 section

// Section 9 (now 6): QuadCast 2 - NOT in table, remove
g.sections.splice(6, 1);  // removes QuadCast 2 section

// Update featuredProducts to match table
g.featuredProducts = tableIds.slice();

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('Sections cleaned. Remaining:', g.sections.length);
g.sections.forEach(function(s, i) { console.log(i, s.heading.slice(0, 50), JSON.stringify(s.products)); });
console.log('Featured:', g.featuredProducts);