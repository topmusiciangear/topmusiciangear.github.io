const fs = require('fs');
const DIR = 'C:/Users/Daniel/projects/topmusiciangear/';
const btn = fs.readFileSync(DIR + 'build-guides.js', 'utf8');
const prod = fs.readFileSync(DIR + 'data/products.json', 'utf8');
const guide = fs.readFileSync(DIR + 'data/guides.json', 'utf8');
const html = fs.readFileSync(DIR + 'guides/best-reverb-delay.html', 'utf8')
  + fs.readFileSync(DIR + 'guides/best-looper-pedals.html', 'utf8')
  + fs.readFileSync(DIR + 'guides/best-multi-effects-pedals.html', 'utf8')
  + fs.readFileSync(DIR + 'guides/best-overdrive-distortion.html', 'utf8');
// [label, snippet, where: P=products, B=buttons, G=guides.json, H=built html]
const checks = [
  ['GTCORE MS url', 'art-GIT0054641-000', 'PH'], ['GTCORE MS price', '€777', 'B'],
  ['GTCORE And url', 'boss-gt-1000core-guitar-effects-processor-pedal', 'PH'], ['GTCORE And price', '£649', 'B'],
  ['GTCORE G4M price', '£635.00', 'B'],
  ['QC MS url', 'art-GIT0060299-000', 'PH'], ['QC MS price', '€1,585', 'B'],
  ['QC And url', 'neural-dsp-quad-cortex-digital-effects-processor-and-amp-modeller', 'PH'], ['QC And price', '£1,449', 'B'],
  ['GE300 MS url', 'art-GIT0050316-000', 'PH'], ['GE300 MS price', '€599', 'B'],
  ['G11 G4M price', '£445.00', 'B'],
  ['M104 name', 'MXR M104 Distortion+', 'PG'],
  ['M104 photo', 'media/27/274347/1200/preview_9.jpg', 'PH'],
  ['BD2W photo', 'media/68/689230/1200/preview.jpg', 'PH'],
  ['TF photo', 'media/42/428493/1200/preview.jpg', 'PH'],
  ['DV photo', 'media/92/925163/1200/preview_1.jpg', 'PH'],
  ['M169 name', 'MXR M169 Carbon Copy', 'PG'],
  ['CC photo', 'media/79/797914/1200/preview.jpg', 'PH'],
  ['CC G4M', 'MXR-M169-Carbon-Copy-Analog-Delay-Pedal/DBH', 'PH'], ['CC G4M price', '£159', 'B'],
  ['GOLD photo', 'media/68/686799/1200/preview.jpg', 'PH'],
  ['GOLD G4M', 'Universal-Audio-UAFX-Golden-Reverberator-Pedal/3QL2', 'PH'], ['GOLD G4M price', '£299', 'B'],
  ['RV photo', 'media/101/1014785/1200/preview.jpg', 'PH'],
  ['RV G4M', 'Boss-RV-200-200-Series-Reverb-Pedal/633P', 'PH'], ['RV G4M price', '£243', 'B'],
  ['RC500 photo', 'media/60/603490/1200/preview.jpg', 'PH'],
  ['RC500 G4M', 'Boss-RC-500-Loop-Station-Dual-Track-Looper-Pedal/3LJV', 'PH'], ['RC500 G4M price', '£273', 'B'],
  ['720 photo', 'media/16/166372/1200/preview.jpg', 'PH'],
  ['720 G4M', 'Electro-Harmonix-720-Stereo-Looper/1GJN', 'PH'], ['720 G4M price', '£149', 'B'],
  ['M303 name', 'MXR M303 Clone Looper', 'PG'],
  ['Clone photo', 'media/50/504603/1200/preview.jpg', 'PH'],
  ['Clone G4M', 'MXR-M303-Clone-Looper/34DU', 'PH'], ['Clone G4M price', '£159', 'B'],
  ['Clone MS', 'art-GIT0051390-000', 'PH'], ['Clone MS price', '€199', 'B'],
  ['Ditto photo', 'media/43/434900/1200/preview.jpg', 'PH'],
  ['RC600 photo', 'media/71/715684/1200/preview.jpg', 'PH'],
  ['RC600 G4M', 'Boss-RC-600-6-Track-Loop-Station/44NJ', 'PH'], ['RC600 G4M price', '£461', 'B'],
  ['RC500 MS', 'art-GIT0054643-000', 'PH'], ['RC500 MS price', '€299', 'B'],
  ['RC500 And', 'boss-rc-500-loop-station-pedal', 'PH'], ['RC500 And price', '£299', 'B'],
  ['X4 MS', 'art-GIT0037748-000', 'PH'], ['X4 MS price', '€239', 'B'],
  ['X4 And', 'tc-electronic-ditto-x4-looper', 'PH'], ['X4 And price', '£150', 'B'],
  ['X4 G4M price', '£150.00', 'B'],
  ['RC5 MS price', '€229.00', 'B'], ['RC5 G4M price', '£196.00', 'B'], ['Ditto G4M price', '£58.00', 'B'],
  ['720 MS', 'art-GIT0037434-000', 'PH'], ['720 MS price', '€158', 'B'],
  ['720 And', 'electro-harmonix-720-stereo-looper-pedal', 'PH'], ['720 And price', '£150', 'B'],
  ['Clone And', 'mxr-m303-clone-looper-pedal', 'PH'], ['Clone And price', '£160', 'B'],
  ['1440 G4M price', '£199.00', 'B'],
  ['RC600 MS', 'art-GIT0057517-000', 'PH'], ['RC600 MS price', '€499', 'B'],
  ['RC600 And', 'boss-rc-600-loop-station', 'PH'], ['RC600 And price', '£499', 'B'],
  ['TL MS', 'art-GIT0022461-000', 'PH'], ['TL MS price', '€469', 'B'],
  ['TL And', 'strymon-timeline-delay-pedal', 'PH'], ['TL And price', '£429', 'B'],
  ['TL G4M', 'Strymon-TimeLine-Delay-Pedal/1LRL', 'PH'], ['TL G4M price', '£429', 'B'],
  ['LVX MS', 'art-GIT0058964-000', 'PH'], ['LVX MS price', '€799', 'B'],
  ['LVX And', 'meris-lvx-modular-delay-system-pedal', 'PH'], ['LVX And price', '£619', 'B'],
  ['LVX G4M price', '£668', 'B'],
  ['TF G4M', 'Eventide-Time-Factor-Twin-Delay-Pedal/FA4', 'PH'], ['TF G4M price', '£384', 'B'],
  ['NEM And', 'source-audio-nemesis-delay-adt-pedal', 'PH'], ['NEM And price', '£319', 'B'],
  ['CAV And', 'keeley-caverns-delay-reverb-v2', 'P'],
  ['DV zz price', '$399.00', 'B'],
  ['DV G4M', 'Universal-Audio-UAFX-Del-Verb-Ambience-Companion/5J58', 'PH'], ['DV G4M price', '£293', 'B'],
  ['DV And', 'universal-audio-uafx-del-verb-ambience-companion-ped', 'PH'], ['DV And price', '£319', 'B'],
  ['DV MS', 'art-GIT0060302-000', 'PH'], ['DV MS price', '€369', 'B'],
  ['CC zz price', '$160.00', 'B'],
  ['CC And', 'mxr-m169-carbon-copy-analog-delay-pedal', 'PH'], ['CC And price', '£160', 'B'],
  ['CC MS', 'art-GIT0012901-000', 'PH'], ['CC MS price', '€199', 'B'],
  ['GOLD And', 'universal-audio-golden-reverberator-pedal', 'PH'], ['GOLD And price', '£379', 'B'],
  ['GOLD MS', 'art-GIT0056042-000', 'PH'], ['GOLD MS price', '€349', 'B'],
  ['RV MS', 'art-GIT0061054-000', 'PH'], ['RV MS price', '€289', 'B'],
  ['RV And', 'boss-rv-200-reverb-pedal', 'PH'], ['RV And price', '£259', 'B'],
  ['TS9 prices', '£105.00', 'B'],
  ['TUM MS', 'art-GIT0051731-000', 'PH'], ['TUM MS price', '€215', 'B'],
  ['TUM And', 'wampler-tumnus-deluxe-guitar-pedal', 'PH'], ['TUM And price', '£189', 'B'],
  ['TUM G4M', 'Wampler-Tumnus-Deluxe-Overdrive-Pedal/270Q', 'PH'], ['TUM G4M price', '£189', 'B'],
  ['MG MS', 'art-GIT0036556-000', 'PH'], ['MG MS price', '€259', 'B'],
  ['MG And', 'jhs-pedals-morning-glory-overdrive-v4', 'PH'], ['MG And price', '£174', 'B'],
  ['MG G4M', 'JHS-Pedals-Morning-Glory-V4-Transparent-Overdrive/1GXS', 'PH'], ['MG G4M price', '£175', 'B'],
  ['M104 MS', 'art-ACC0000415-000', 'PH'], ['M104 MS price', '€109', 'B'],
  ['M104 And', 'mxr-m104-distortion-plus-pedal', 'PH'], ['M104 And price', '£109', 'B'],
  ['M104 G4M', 'MXR-M104-Distortion-Plus-Guitar-Effects-Pedal/3F7', 'PH'], ['M104 G4M price', '£109', 'B'],
  ['BD2W MS', 'art-GIT0032558-000', 'PH'], ['BD2W MS price', '€169', 'B'],
  ['BD2W And', 'boss-bd-2w-blues-driver-guitar-effects-pedal', 'PH'], ['BD2W And price', '£169', 'B'],
  ['BD2W G4M', 'Boss-BD-2W-Waza-Craft-Custom-Blues-Driver-Pedal/12UU', 'PH'], ['BD2W G4M price', '£157', 'B'],
  ['P95 G4M price', '£119.00', 'B'],
  ['OCD And', 'fulltone-usa-ocd-v2-overdrive-pedal', 'PH'], ['OCD And price', '£180', 'B'],
  ['OCD G4M', 'Fulltone-OCD-V2-Overdrive/68VP', 'PH'], ['OCD G4M price', '£159', 'B']
];
let bad = 0;
checks.forEach(function (row) {
  const label = row[0], snip = row[1], where = row[2];
  const ok = where.includes('P') && prod.includes(snip) || where.includes('B') && btn.includes(snip)
    || where.includes('G') && guide.includes(snip) || where.includes('H') && html.includes(snip);
  if (!ok) { bad++; console.log('MISS [' + label + '/' + where + '] :: ' + snip.slice(0, 55)); }
});
console.log(bad === 0 ? 'ALL ' + checks.length + ' CHECKS OK' : bad + ' MISSES');
