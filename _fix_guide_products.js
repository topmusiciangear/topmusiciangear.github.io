const fs = require('fs');
const path = require('path');

const gPath = 'data/guides.json';
const g = JSON.parse(fs.readFileSync(gPath, 'utf8'));

let totalRemoved = 0;
const log = [];

function removeProduct(guideId, sectionIdx, productId) {
  const hub = g.find(h => h.id === guideId);
  if (!hub) { log.push(`NOT FOUND: ${guideId}`); return; }
  const sec = hub.sections[sectionIdx];
  if (!sec) { log.push(`${guideId}: section ${sectionIdx} not found`); return; }
  const idx = sec.products.indexOf(productId);
  if (idx === -1) { log.push(`${guideId} sec${sectionIdx}: product ${productId} not in array`); return; }
  sec.products.splice(idx, 1);
  totalRemoved++;
  log.push(`REMOVED: ${guideId} sec${sectionIdx} -> product ${productId}`);
}

// 1. midi-keyboards: DAWs and plugins
removeProduct('midi-keyboards', 1, 110); // Ableton Live 12 Suite
removeProduct('midi-keyboards', 2, 110); // Ableton Live 12 Suite
removeProduct('midi-keyboards', 2, 111); // Logic Pro
removeProduct('midi-keyboards', 2, 28);  // NI Kontakt 8
removeProduct('midi-keyboards', 2, 123); // NI Komplete 26 Ultimate

// 2. midi-controllers: DAWs don't belong
removeProduct('midi-controllers', 0, 113); // Avid Pro Tools Studio

// 3. best-plugins: interfaces in plugins
removeProduct('best-plugins', 1, 16);  // Apollo Twin X
removeProduct('best-plugins', 1, 55);  // Volt 2
removeProduct('best-plugins', 1, 182); // Apollo x16
removeProduct('best-plugins', 1, 263); // Volt 276

// 4. channel-strip-plugins: interfaces in plugins
removeProduct('channel-strip-plugins', 3, 16);  // Apollo Twin X
removeProduct('channel-strip-plugins', 3, 55);  // Volt 2
removeProduct('channel-strip-plugins', 3, 182); // Apollo x16
removeProduct('channel-strip-plugins', 3, 263); // Volt 276

// 5. vocal-plugins: DAWs and pedals
removeProduct('vocal-plugins', 2, 113); // Pro Tools Studio
removeProduct('vocal-plugins', 4, 97);  // Boss DD-8

// 6. fx-plugins: pedals
removeProduct('fx-plugins', 1, 97); // Boss DD-8

// 7. best-mic-for-podcasting: interfaces
removeProduct('best-mic-for-podcasting', 1, 239); // Rodecaster Duo

// 8. best-hardware-samplers: keyboards and plugins
removeProduct('best-hardware-samplers', 3, 14);  // NI Kontrol S61 MK3
removeProduct('best-hardware-samplers', 3, 28);  // NI Kontakt 8
removeProduct('best-hardware-samplers', 3, 123); // NI Komplete 26 Ultimate

// 9. best-guitar-home-office: Focusrite interface (not relevant to guitar setup)
removeProduct('best-guitar-home-office', 10, 15); // Focusrite Scarlett 2i2

// 10. best-beginner-electric-guitar: bass guitars
removeProduct('best-beginner-electric-guitar', 0, 66);  // Player Precision Bass
removeProduct('best-beginner-electric-guitar', 0, 67);  // Player Jazz Bass
removeProduct('best-beginner-electric-guitar', 0, 158); // Squier Affinity Precision Bass PJ
removeProduct('best-beginner-electric-guitar', 3, 66);  // Player Precision Bass
removeProduct('best-beginner-electric-guitar', 3, 67);  // Player Jazz Bass

// 11. best-electric-guitars-2026: bass guitars
removeProduct('best-electric-guitars-2026', 6, 155); // Fender American Pro II Precision Bass
removeProduct('best-electric-guitars-2026', 6, 156); // Fender American Pro II Jazz Bass

// 12. best-electric-guitar: bass guitars
removeProduct('best-electric-guitar', 0, 157); // Squier Classic Vibe Jazz Bass
removeProduct('best-electric-guitar', 1, 157); // Squier Classic Vibe Jazz Bass
removeProduct('best-electric-guitar', 2, 155); // Fender American Pro II Precision Bass
removeProduct('best-electric-guitar', 2, 156); // Fender American Pro II Jazz Bass

// 13. best-monitors: acoustic panels
removeProduct('best-monitors', 8, 170); // G4M Acoustics panels

// 14. best-monitors-for-small-rooms: acoustic panels + wrong monitor
removeProduct('best-monitors-for-small-rooms', 0, 170); // G4M panels
removeProduct('best-monitors-for-small-rooms', 0, 331); // Genelec 8351B (too expensive for "small rooms" guide)
removeProduct('best-monitors-for-small-rooms', 7, 170); // G4M panels
removeProduct('best-monitors-for-small-rooms', 4, 180); // ADAM S3H (not compact)

// 15. best-mic-for-guitar-amps: acoustic panels
removeProduct('best-mic-for-guitar-amps', 0, 170); // G4M panels

// 16. rme-vs-motu: acoustic panels
removeProduct('rme-vs-motu', 3, 170); // G4M panels

// 17. jbl-vs-kali: acoustic panels
removeProduct('jbl-vs-kali', 2, 170); // G4M panels

// 18. sm7b-vs-nt1: pop filter and panels (not mics)
removeProduct('sm7b-vs-nt1', 1, 39);  // Aston Shield GN Pop Filter
removeProduct('sm7b-vs-nt1', 2, 170); // G4M panels

// 19. sm57-vs-sm58: pop filter (only keep in sections 0 and 2 where it's discussed)
removeProduct('sm57-vs-sm58', 0, 39);  // Aston Shield GN Pop Filter
removeProduct('sm57-vs-sm58', 3, 39);  // Aston Shield GN Pop Filter

// 20. dt770-vs-dt990: monitor (section 1 comparison)
removeProduct('dt770-vs-dt990', 1, 331); // Genelec 8351B

// 21. m50x-vs-mdr7506: monitor
removeProduct('m50x-vs-mdr7506', 1, 331); // Genelec 8351B

// 22. best-electric-guitars-2026: production category basses
removeProduct('best-electric-guitars-2026', 2, 184); // American Ultra II Strat (production)
removeProduct('best-electric-guitars-2026', 2, 185); // American Ultra II Precision Bass (production)

// 23. best-electric-guitar: production category
removeProduct('best-electric-guitar', 2, 184); // American Ultra II Strat (production)
removeProduct('best-electric-guitar', 2, 185); // American Ultra II Precision Bass (production)

// 24. fender-guide: production category bass
removeProduct('fender-guide', 1, 185); // American Ultra II Precision Bass (production)

// 25. stream-controllers: mics, interfaces, wireless don't belong
removeProduct('stream-controllers', 3, 1);   // Shure SM7B
removeProduct('stream-controllers', 5, 239); // Rodecaster Duo
removeProduct('stream-controllers', 5, 240); // Roland Bridge Cast X
removeProduct('stream-controllers', 5, 327); // Maono Maonocaster

// 26. streaming-interfaces: plugins, production, wireless don't belong
removeProduct('streaming-interfaces', 0, 121); // UAD Ultimate 14 (plugins)
removeProduct('streaming-interfaces', 0, 182); // Apollo x16 (production)
removeProduct('streaming-interfaces', 0, 265); // Razer Stream Controller (streaming, not interface)
removeProduct('streaming-interfaces', 1, 93);  // Sennheiser EW-D (wireless mic)
removeProduct('streaming-interfaces', 1, 250); // Rode Wireless PRO (wireless mic)
removeProduct('streaming-interfaces', 1, 349); // Sennheiser EW IEM G4 (live_sound)
removeProduct('streaming-interfaces', 1, 362); // Sennheiser XSW IEM (live_sound)
removeProduct('streaming-interfaces', 4, 121); // UAD Ultimate 14 (plugins)
removeProduct('streaming-interfaces', 4, 182); // Apollo x16 (production)

// 27. budget-mics: accessories
removeProduct('budget-mics', 2, 39);  // Aston Shield GN Pop Filter
removeProduct('budget-mics', 2, 167); // Mogami Gold XLR Cable
removeProduct('budget-mics', 2, 58);  // K&M 210/2 Mic Stand
removeProduct('budget-mics', 2, 170); // G4M Acoustics panels

// 28. usb-mics: streaming and accessories
removeProduct('usb-mics', 1, 246); // Elgato Wave XLR MK.2 (streaming interface)
removeProduct('usb-mics', 1, 260); // Elgato Wave XLR Pro (streaming interface)
removeProduct('usb-mics', 1, 170); // G4M panels

// 29. stage-mics: pop filter and wireless IEM
removeProduct('stage-mics', 0, 39);  // Aston Shield GN Pop Filter
removeProduct('stage-mics', 1, 349); // Sennheiser EW IEM G4 (live_sound)
removeProduct('stage-mics', 1, 362); // Sennheiser XSW IEM (live_sound)

// 30. best-microphone: wireless IEM
removeProduct('best-microphone', 5, 349); // Sennheiser EW IEM G4
removeProduct('best-microphone', 5, 362); // Sennheiser XSW IEM

// 31. mics-for-creators: streaming and accessories
removeProduct('mics-for-creators', 1, 246); // Elgato Wave XLR MK.2
removeProduct('mics-for-creators', 1, 260); // Elgato Wave XLR Pro
removeProduct('mics-for-creators', 1, 39);  // Aston Shield GN Pop Filter
removeProduct('mics-for-creators', 1, 58);  // K&M 210/2 Mic Stand
removeProduct('mics-for-creators', 1, 170); // G4M panels

// 32. guitar-bass-amps: guitars/bass don't belong in amps guide
removeProduct('guitar-bass-amps', 1, 165); // ESP LTD Bass Guitar
removeProduct('guitar-bass-amps', 1, 295); // Enya Nova Go Sonic

// 33. best-guitar-home-office: amps (sections 3 and 4 are dedicated amp sections, keep sec 10 for context)
// Actually, amps DO belong in a guitar home office guide — they're part of the setup

// 34. best-electric-under-500: this IS a bass guide despite the name — keep basses
// (name is misleading but content is correct)

// 35. beginner-bass-guitars: this IS a bass guide — all basses are correct

// 36. budget-bass-like-expensive: this IS a bass guide — all basses are correct

// 37. fender-guide: basses belong (Fender makes basses)
// Keep all Fender basses — they're part of "Best Fender Guitars"

// 38. live-sound-pa: live_sound category speakers belong (speakers for PA)
// Keep all — live_sound products ARE speakers for PA

// 39. best-pa-speakers: live_sound category speakers belong
// Keep all

// 40. best-live-subwoofers: live_sound category subs belong
// Keep all

// 41. stage-wedges: live_sound category wedges belong
// Keep all

// 42. best-live-sound-mixers: live_sound category mixers belong
// Keep all

// 43. best-digital-mixers: live_sound category mixers belong
// Keep all

// 44. best-analog-mixers: live_sound category mixers belong
// Keep all

// 45. best-compact-mixers: live_sound category mixers belong
// Keep all

// 46. yamaha-mg-vs-behringer-xenyx: live_sound category mixers belong
// Keep all

// 47. active-vs-passive-pa: live_sound category speakers belong
// Keep all

// 48. budget-pa-systems: live_sound category speakers belong
// Keep all

// 49. zlx-vs-k12: live_sound category speakers belong
// Keep all

// 50. dxr-vs-prx: live_sound category speakers belong
// Keep all

// 51. nx912-vs-pxm12mp: live_sound category speakers belong
// Keep all

// 52. ew100-vs-ulxd: live_sound category wireless mics belong
// Keep all

// 53. ew-iem-g4-twin-vs-psm300: live_sound category IEMs belong
// Keep all

// 54. precision-vs-jazz: guitars category basses — these ARE basses, category label is wrong
// Keep all — they're all bass guitars

// 55. fender-bass-guide: guitars category basses — these ARE basses
// Keep all — they're all Fender bass guitars

// 56. best-electric-under-500: bass category basses — keep all (bass guide)

// 57. beginner-bass-guitars: bass/guitars category — keep all (bass guide)

// 58. budget-bass-like-expensive: bass/guitars/production category — keep all (bass guide)

// 59. best-hardware-samplers: drum-machine category is correct (samplers = drum machines)
// Keep all drum-machine products

// 60. best-drum-machine: drum-machine category is correct
// Keep all

// 61. best-grooveboxes: drum-machine category is correct (grooveboxes = drum machines)
// Keep all

// 62. digitakt-ii-vs-tr8s: drum-machine category is correct
// Keep all

fs.writeFileSync(gPath, JSON.stringify(g, null, 2));

console.log(`=== REMOVAL LOG (${log.length} entries) ===`);
log.forEach(l => console.log(l));
console.log(`\nTotal products removed: ${totalRemoved}`);
