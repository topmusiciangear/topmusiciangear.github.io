const fs = require('fs');
const F = 'C:/Users/Daniel/projects/topmusiciangear/data/guides.json';
const g = JSON.parse(fs.readFileSync(F, 'utf8'));

// 1. starter-studio: "our" in intro
let s = g.find(x => x.id === 'starter-studio');
let intro = s.intro;
console.log('starter-studio intro:', intro);
