const fs = require('fs');
const m = fs.readFileSync('js/app.min.js', 'utf8');

// Does translatePage call renderGuideGrid or renderGuideCats?
const tpStart = m.indexOf('function translatePage(');
if (tpStart < 0) {
  console.log('translatePage not found as named function');
  // Maybe it's inline
  const tp2 = m.indexOf('translatePage=');
  if (tp2 >= 0) {
    console.log('translatePage= at:', tp2);
    console.log(m.substring(tp2, tp2 + 500));
  }
} else {
  console.log('translatePage at:', tpStart);
  // Find end of function
  let depth = 0;
  for (let j = tpStart; j < m.length; j++) {
    if (m[j] === '{') depth++;
    if (m[j] === '}') depth--;
    if (depth === 0) {
      const body = m.substring(tpStart, j + 1);
      console.log('Length:', body.length);
      console.log('Has renderGuideGrid:', body.indexOf('renderGuideGrid') >= 0);
      console.log('Has renderGuideCats:', body.indexOf('renderGuideCats') >= 0);
      console.log('Has renderGuideDetail:', body.indexOf('renderGuideDetail') >= 0);
      break;
    }
  }
}
