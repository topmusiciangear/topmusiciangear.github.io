const fs = require('fs');
const guides = {
  'best-reverb-delay.html': ['Twelve Machines, Endless Echoes: TimeLine', 'Design Your Own Delay: Meris LVX', 'Two Delays at Once: TimeFactor', '26 Engines, One App Away: Nemesis', 'Reverb Meets Delay in One Box: Caverns V2', 'Vintage Space, Modern Box: Del-Verb', 'Warm Analog Repeats, Three Knobs: MXR M169 Carbon Copy', 'Golden Springs and German Plates: Golden Reverberator', 'Twelve Verbs, 127 Memories: RV-200'],
  'best-looper-pedals.html': ['Two Tracks, One Mic, Zero Excuses: RC-500', 'Verse and Chorus in Two Loops: Ditto X4', 'Twelve Minutes, Ten Loops, No Fuss: EHX 720', 'Six Hi-Fi Minutes in a Mini Box: MXR M303 Clone Looper', '24 Minutes, 20 Loops, One Box: EHX 1440', 'Six Tracks, Nine Switches, Zero Compromise: RC-600'],
  'best-multi-effects-pedals.html': ['Flagship Floorboard: Who Is the G11 For?', 'GT-1000CORE', 'Quad Cortex: Is the Quad Cortex the Future?', 'Maximum Features per Dollar: The GE300 Case'],
  'best-overdrive-distortion.html': ['MOSFET Clipping, Amp-Like Feel: The OCD Story', 'Klon Magic With a 3-Band EQ: Tumnus Deluxe', 'Always-On Transparency: Morning Glory V4', 'Two Knobs of 70s Crunch: MXR M104 Distortion+', 'Waza Craft Grit: BD-2W Blues Driver']
};
function aff(a, href) {
  if (a && a.length > 10) {
    if (a.includes('awin1.com')) return 'awin-OK';
    if (a.includes('pxf.io')) return 'pxf-OK';
    if (a.includes('anrdoezrs.net')) return 'cj-OK';
    if (a.includes('tag=topmusicg-20')) return 'amz-OK';
    return 'AFF-BARE:' + a.slice(0, 60);
  }
  if (href && href.includes('tag=topmusicg-20')) return 'amz-OK(href)';
  return 'NO-AFF(' + (href || '').slice(0, 60) + ')';
}
for (const [f, heads] of Object.entries(guides)) {
  const t = fs.readFileSync('C:/Users/Daniel/projects/topmusiciangear/guides/' + f, 'utf8');
  console.log('=== ' + f);
  heads.forEach(h => {
    const i = t.indexOf(h);
    if (i < 0) { console.log('  ' + h.slice(0, 32) + ': HEADING MISSING'); return; }
    const seg = t.slice(i, i + 20000);
    const re = /data-store="([a-z]+)"[^>]*?(?:data-aff="([^"]*)")?[^>]*?href="([^"]+)"/g;
    let m; const rows = [];
    while ((m = re.exec(seg)) && rows.length < 7) rows.push(m[1] + '=' + aff(m[2], m[3]));
    console.log('  ' + h.slice(0, 32) + ': ' + rows.join(' | '));
  });
}
