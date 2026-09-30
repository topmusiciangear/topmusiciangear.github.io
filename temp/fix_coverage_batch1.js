// Coverage batch 1: renames (table/verdict -> catalog title) + stale removals.
const fs = require('fs');
const G = JSON.parse(fs.readFileSync('data/guides.json', 'utf8'));
const byId = {};
G.forEach(g => { byId[g.id] = g; });
let nRen = 0, nRem = 0;
const warn = [];

function ren(guideId, oldN, newN) {
  const g = byId[guideId];
  if (!g) { warn.push('noguide ' + guideId); return; }
  let hit = false;
  (g.productTable && g.productTable.columns || []).forEach(c => {
    if (c.title === oldN) { c.title = newN; hit = true; }
    if (c.title_es === oldN) { c.title_es = newN; hit = true; }
  });
  (g.verdictProsCons || []).forEach(v => {
    if (v.name === oldN) { v.name = newN; hit = true; }
    if (v.name_es === oldN) { v.name_es = newN; hit = true; }
  });
  if (hit) nRen++; else warn.push('nohit ren ' + guideId + ' :: ' + oldN);
}
function rem(guideId, name) {
  const g = byId[guideId];
  if (!g) { warn.push('noguide ' + guideId); return; }
  const cols = g.productTable && g.productTable.columns ? g.productTable.columns : [];
  const idx = cols.findIndex(c => c.title === name || c.title_es === name);
  if (idx >= 0) {
    cols.splice(idx, 1);
    (g.productTable.rows || []).forEach(r => { if (r.values && r.values.length > idx) r.values.splice(idx, 1); });
    nRem++;
  } else warn.push('nocol rem ' + guideId + ' :: ' + name);
  const vi = (g.verdictProsCons || []).findIndex(v => v.name === name || v.name_es === name);
  if (vi >= 0) { g.verdictProsCons.splice(vi, 1); nRem++; }
  else warn.push('noverdict rem ' + guideId + ' :: ' + name);
}

ren('stage-mics', 'EV ND86', 'Electro-Voice ND86');
ren('fender-guide', 'Fender Player Telecaster', 'Fender Player II Telecaster');
ren('guitar-bass-amps', 'Ampeg RB-210', 'Ampeg Rocket Bass RB-210');
ren('stage-wireless', 'Shure SM58 Wireless', 'Shure BLX24R/SM58 Wireless');
ren('guitar-pedals', 'Electro-Harmonix Small Stone', 'Electro-Harmonix Nano Small Stone');
ren('acoustic-guitars-guide', 'Gibson 1942 Banner J-45', 'Gibson Custom Shop 1942 Banner J-45');
ren('best-monitors-for-small-rooms', 'Kali LP-6 V2', 'Kali Audio LP-6 V2');
ren('best-monitors-for-small-rooms', 'ADAM D3V', 'ADAM Audio D3V');
ren('best-monitors-for-small-rooms', 'Kali LP-UNF', 'Kali Audio LP-UNF');
ren('best-monitors-for-small-rooms', 'ADAM T5V', 'ADAM Audio T5V');
ren('best-beginner-electric-guitar', 'Squier Affinity Strat', 'Squier Affinity Series Stratocaster');
ren('best-beginner-electric-guitar', 'Squier Sonic Strat HT', 'Squier Sonic Stratocaster HT');
ren('best-beginner-electric-guitar', 'Epiphone LP Special-II E1', 'Epiphone Les Paul Special-II E1');
ren('best-beginner-electric-guitar', 'Yamaha Revstar RSE20', 'Yamaha Revstar Element RSE20');
ren('best-beginner-electric-guitar', 'Squier Debut Strat', 'Squier Debut Series Stratocaster');
ren('best-beginner-electric-guitar', 'Squier Affinity Stratocaster', 'Squier Affinity Series Stratocaster');
ren('best-bass-under-700', 'Sterling StingRay Ray4', 'Sterling by Music Man StingRay Ray4');
ren('stage-wedges', 'Turbosound TFX122M-AN', 'Turbosound Flashline TFX122M-AN Stage Monitor');
ren('nx912-vs-pxm12mp', 'EV PXM-12MP', 'Electro-Voice PXM-12MP');
ren('best-live-subwoofers', 'EV ELX200-18SP', 'Electro-Voice ELX200-18SP');
ren('best-ribbon-mics', 'sE Voodoo VR2', 'sE Electronics Voodoo VR2');
ren('best-parlor-guitars', 'Highway Parlor', 'Fender Highway Series Parlor All-Mahogany Acoustic-Electric');
ren('best-amp-modelers', 'Line 6 HX Stomp', 'Line 6 Helix HX Stomp');
ren('best-amp-modelers', 'IK TONEX ONE+', 'IK Multimedia TONEX ONE+');
ren('premium-interfaces', 'Apogee Symphony I/O Mk II 16×16 SE', 'Apogee Symphony I/O Mk II 16x16 SE');
ren('j48-vs-rndi', 'Rupert Neve RNDI', 'Rupert Neve Designs RNDI Active Direct Interface');
ren('precision-vs-jazz', 'Fender Player Precision Bass', 'Fender Player II Precision Bass');
ren('precision-vs-jazz', 'Fender Player Jazz Bass', 'Fender Player II Jazz Bass');
ren('fender-bass-guide', 'Fender Player Precision Bass', 'Fender Player II Precision Bass');
ren('fender-bass-guide', 'Fender Player Jazz Bass', 'Fender Player II Jazz Bass');
ren('best-guitar-home-office', 'Traveler Ultra-Light Steel', 'Traveler Guitar Ultra-Light Steel');
ren('best-guitar-home-office', 'Enya Nova Go Sonic', 'Enya Nova Go Sonic Smart Electric Guitar');
ren('best-guitar-home-office', 'Lava ME 4', 'Lava Music Lava ME 4 Smart Guitar');
ren('best-live-sound-mixers', 'Korg MW-1608', 'Korg SoundLink MW-1608');
ren('budget-mics', 'MAONO PD100 XLR', 'MAONO PD100 Gen2 USB/XLR Dynamic Microphone');
ren('beginner-guitar', 'Squier Affinity Stratocaster', 'Squier Affinity Series Stratocaster');
ren('best-bass-amps', 'Ampeg RB-210', 'Ampeg Rocket Bass RB-210');
ren('wireless-lapel-mics', 'LARK MAX 2 (2-Person)', 'Hollyland LARK MAX 2 Combo (2-Person)');

rem('usb-mics', 'Shure SM7B');
rem('usb-mics', 'Electro-Voice RE20');
rem('best-microphone', 'Rode PodMic');
rem('best-microphone', 'Rode Procaster');
rem('best-microphone', 'Elgato Wave:3');
rem('best-compact-mixers', 'Mackie MobileMix');
rem('best-compact-mixers', 'Yamaha MG10XU');
rem('best-compact-mixers', 'Allen & Heath ZEDi-10FX');
rem('best-reverb-delay', 'Boss RC-5 Loop Station');
rem('best-guitar-home-office', 'Yamaha Pacifica 112V');

fs.writeFileSync('data/guides.json', JSON.stringify(G, null, 2));
console.log('renames aplicados: ' + nRen + ' | eliminaciones: ' + nRem);
console.log('avisos: ' + (warn.length ? '\n' + warn.join('\n') : 'ninguno'));
