const fs = require('fs');
const app = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.js', 'utf8');
const appMin = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/js/app.min.js', 'utf8');

// Check if filterCategory exists in both
console.log('filterCategory en app.js:', app.indexOf('function filterCategory') > -1);
console.log('filterCategory en min:', appMin.indexOf('function filterCategory') > -1);

// Check where I inserted the 5 functions - are they in the right scope?
const firstFnIdx = appMin.indexOf('function ');
console.log('\nPrimera funcion en min:', appMin.slice(firstFnIdx, firstFnIdx + 50));

// Check if pushGuide is before or after its dependencies
const pushGuideIdx = appMin.indexOf('function pushGuide');
const seenIdx = appMin.indexOf('var seen');
console.log('pushGuide en:', pushGuideIdx);
console.log('var seen en:', seenIdx);
console.log('pushGuide antes de seen:', pushGuideIdx < seenIdx);

// Check if paintStars dependencies exist
const paintStarsIdx = appMin.indexOf('function paintStars');
console.log('\npaintStars en:', paintStarsIdx);

// Check if onPageLoaded is called and where
const onPageLoadedCall = appMin.indexOf('onPageLoaded(');
console.log('onPageLoaded( en min:', onPageLoadedCall);

// Check the actual init sequence in min
const domReadyIdx = appMin.indexOf('DOMContentLoaded');
if (domReadyIdx > -1) {
  console.log('\nDOMContentLoaded context (min):', appMin.slice(domReadyIdx, domReadyIdx + 300));
}

// Check if there's a syntax error by trying to parse with a stricter check
try {
  new Function(appMin);
  console.log('\nStrict parse: OK');
} catch (e) {
  console.log('\nStrict parse ERROR:', e.message);
}

// Check if the functions I added reference variables that don't exist
const pushGuideCode = appMin.slice(pushGuideIdx, pushGuideIdx + 500);
console.log('\npushGuide code start:', pushGuideCode.slice(0, 300));