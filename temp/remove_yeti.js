var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';
var d = JSON.parse(fs.readFileSync(BASE + 'data/guides.json', 'utf8'));
var g = d.find(function (x) { return x.id === 'usb-mics'; });

// Remove section 10 (Blue Yeti) - it was replaced by NT-USB+
g.sections = g.sections.filter(function (s, i) { return i !== 10; });

// Remove VPC entries for Blue Yeti (5) and Blue Yeti X (6) - no longer in table
g.verdictProsCons = g.verdictProsCons.filter(function (v) {
  return v.name !== 'Blue Yeti USB Microphone' && v.name !== 'Blue Yeti X';
});

fs.writeFileSync(BASE + 'data/guides.json', JSON.stringify(d, null, 2));
console.log('Removed Yeti section + VPC. Sections:', g.sections.length, 'VPC:', g.verdictProsCons.length);
