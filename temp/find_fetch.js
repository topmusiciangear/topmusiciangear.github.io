const fs = require('fs');
const app = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.js', 'utf8');
const matches = app.match(/fetch\(['"][^'"]+['"]/g) || [];
console.log('All fetch URLs:');
matches.forEach(m => console.log('  ' + m));

// Find the guide data URL
const guideDataIdx = app.indexOf('guideData');
const guidesJsonIdx = app.indexOf('guides.json');
const guidesDataIdx = app.indexOf('guides-data');
console.log('\nguideData:', guideDataIdx, 'guides.json:', guidesJsonIdx, 'guides-data:', guidesDataIdx);

// Check what file the home fetches for the guide list
const fetchIdx = app.indexOf('fetch(');
while (fetchIdx > -1) {
  const context = app.slice(fetchIdx, fetchIdx + 100);
  if (context.includes('guide') || context.includes('data') || context.includes('json')) {
    console.log('\nFetch context:', context.slice(0, 120));
  }
  break;
}