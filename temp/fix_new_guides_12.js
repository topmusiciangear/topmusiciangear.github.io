const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const guides = JSON.parse(fs.readFileSync(B + 'data/guides.json', 'utf8'));
const products = JSON.parse(fs.readFileSync(B + 'data/products.json', 'utf8'));

const ids = ['best-synth-vsts','best-midi-theory-plugins','best-piano-keyboard-vsts','best-guitar-plugins','best-audio-repair-plugins','autotune-vs-melodyne','ozone-vs-fabfilter','vocalign-vs-revoice-pro'];

// ---- PART 1: sections products[] by index (sections written in featuredProducts order) ----
ids.forEach(id => {
  const gd = guides.find(g => g.id === id);
  const feat = gd.featuredProducts || [];
  if (gd.sections.length !== feat.length) {
    console.log(id + ': SECTIONS(' + gd.sections.length + ') != FEATURED(' + feat.length + ') — manual review needed');
    return;
  }
  gd.sections.forEach((s, i) => {
    s.products = [feat[i]];
    const p = products.find(x => x.id === feat[i]);
    console.log(id + ' [' + i + ']: "' + (s.heading || '').substring(0, 45) + '" -> ' + feat[i] + ' ' + (p ? p.brand + ' ' + p.title : 'NOT FOUND'));
  });
});

// ---- PART 2: verdict names by index ----
const verdictNames = {
  'best-synth-vsts': [['Pigments 7','Pigments 7'],['u-he Diva','u-he Diva'],['Phase Plant','Phase Plant'],['VPS Avenger 2','VPS Avenger 2'],['Xfer Serum','Xfer Serum'],['Massive X','Massive X']],
  'best-midi-theory-plugins': [['Scaler 3','Scaler 3'],['Captain Plugins Epic','Captain Plugins Epic'],['Loop Engine 3','Loop Engine 3'],['Playbeat 4','Playbeat 4'],['Orb Producer Suite 3','Orb Producer Suite 3'],['Zynaptiq PitchMap','Zynaptiq PitchMap']],
  'best-piano-keyboard-vsts': [['Spectrasonics Keyscape','Spectrasonics Keyscape'],['Kontakt 8','Kontakt 8'],['V Collection 11 Pro','V Collection 11 Pro'],['Addictive Keys','Addictive Keys'],['Pianoteq 9 Pro','Pianoteq 9 Pro'],['Augmented Piano','Augmented Piano']],
  'best-guitar-plugins': [['AmpliTube 5','AmpliTube 5'],['BIAS FX 2','BIAS FX 2'],['UAD Sound City Studios','UAD Sound City Studios'],['TH-U Premium','TH-U Premium'],['Amp Room','Amp Room'],['bx_rockrack V3','bx_rockrack V3']],
  'best-audio-repair-plugins': [['RX 12 Standard','RX 12 Standard'],['Soothe3','Soothe3'],['smart:deess','smart:deess'],['Restoration Suite 2','Restoration Suite 2'],['Chameleon','Chameleon'],['UNVEIL','UNVEIL']],
  'autotune-vs-melodyne': [['AutoTune 2026','AutoTune 2026'],['Melodyne 5 Essential','Melodyne 5 Essential']],
  'ozone-vs-fabfilter': [['Ozone 12 Advanced','Ozone 12 Advanced'],['FabFilter Mastering Bundle','FabFilter Mastering Bundle']],
  'vocalign-vs-revoice-pro': [['VocAlign 7 Pro','VocAlign 7 Pro'],['Revoice Pro','Revoice Pro']]
};
ids.forEach(id => {
  const gd = guides.find(g => g.id === id);
  const names = verdictNames[id];
  if (gd.verdictProsCons.length !== names.length) {
    console.log(id + ': VERDICTS(' + gd.verdictProsCons.length + ') != NAMES(' + names.length + ') — manual review');
    return;
  }
  gd.verdictProsCons.forEach((v, i) => { v.name = names[i][0]; v.name_es = names[i][1]; });
  console.log(id + ': named ' + names.length + ' verdicts');
});

guides.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(B + 'data/guides.json', JSON.stringify(guides, null, 2), 'utf8');
console.log('Parts 1+2 done');
