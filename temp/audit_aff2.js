const fs = require('fs');
const files = {
  'best-reverb-delay.html': ['Twelve Machines, Endless Echoes', 'Design Your Own Delay', 'Two Delays at Once', '26 Engines, One App Away', 'Reverb Meets Delay in One Box', 'Vintage Space, Modern Box', 'Warm Analog Repeats, Three Knobs', 'Golden Springs and German Plates', 'Twelve Verbs, 127 Memories'],
  'best-looper-pedals.html': ['Two Tracks, One Mic, Zero Excuses', 'Verse and Chorus in Two Loops', 'Twelve Minutes, Ten Loops, No Fuss', 'Six Hi-Fi Minutes in a Mini Box', '24 Minutes, 20 Loops, One Box', 'Six Tracks, Nine Switches, Zero Compromise'],
  'best-multi-effects-pedals.html': ['Flagship Floorboard', 'GT-1000CORE', 'Quad Cortex', 'GE300 Case'],
  'best-overdrive-distortion.html': ['MOSFET Clipping', 'Klon Magic', 'Always-On Transparency', 'Two Knobs of 70s Crunch', 'Waza Craft Grit']
};
function aff(url) {
  if (!url) return 'NO-LINK';
  if (url.includes('awin1.com/cread.php')) return 'awin-OK';
  if (url.includes('pxf.io')) return 'pxf-OK';
  if (url.includes('anrdoezrs.net')) return 'cj-OK';
  if (url.includes('tag=topmusicg-20')) return 'amz-OK';
  return 'BARE:' + url.slice(0, 80);
}
for (const [f, heads] of Object.entries(files)) {
  const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/' + f, 'utf8');
  console.log('=== ' + f);
  heads.forEach(h => {
    const i = t.indexOf(h);
    if (i < 0) { console.log('  ' + h + ': HEADING MISSING'); return; }
    const seg = t.slice(i, i + 16000);
    const re = /data-store="([a-z]+)"[^>]*href="([^"]+)"/g;
    let m; const rows = [];
    while ((m = re.exec(seg)) && rows.length < 7) rows.push(m[1] + '=' + aff(m[2]));
    console.log('  ' + h.slice(0, 30) + ': ' + rows.join(' | '));
  });
}
