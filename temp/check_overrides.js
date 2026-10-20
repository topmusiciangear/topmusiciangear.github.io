const fs = require('fs');
const overrides = require('C:\\Users\\Daniel\\projects\\topmusiciangear\\temp\\score_overrides.js');

const targetGuideIds = [
  'stage-wireless',
  'starter-studio',
  'stream-controllers',
  'stream-deck-plus-xl-vs-razer',
  'streaming-interfaces',
  'studio-furniture',
  'studio-subwoofers',
  'studio-subwoofers-setup',
  'tracking-headphones',
  'ts9-vs-bd2',
  'usb-mics',
  'vocal-plugins',
  'vocalign-vs-revoice-pro',
  'wireless-intercom-systems',
  'wireless-lapel-mics',
  'xr18-vs-cq18t',
  'xr18-vs-m32r',
  'yamaha-mg-vs-behringer-xenyx',
  'zlx-vs-k12',
  'best-home-studio-speakers'
];

targetGuideIds.forEach(id => {
  if (overrides[id]) {
    console.log(`\n=== ${id} ===`);
    console.log(JSON.stringify(overrides[id], null, 2));
  } else {
    console.log(`\n=== ${id} === NO OVERRIDES`);
  }
});