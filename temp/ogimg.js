const fs = require('fs');
[['IBANEZ', 'temp/off1.html'], ['SIRE', 'temp/off2.html'], ['TRAVELER', 'temp/off3.html']].forEach(([tag, f]) => {
  try {
    const h = fs.readFileSync(f, 'utf8');
    const m = h.match(/og:image[^>]*content=(["'])(.*?)\1/);
    console.log(tag + ': ' + (m ? m[2].slice(0, 250) : 'SIN OG (' + h.length + ' bytes)'));
  } catch (e) { console.log(tag + ': ERROR ' + e.message); }
});
