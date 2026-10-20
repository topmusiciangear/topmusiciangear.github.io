const fs = require('fs');
const overridesContent = fs.readFileSync('C:\\Users\\Daniel\\projects\\topmusiciangear\\temp\\score_overrides.js', 'utf8');

const targetIds = [
  "best-stage-keyboards",
  "best-synth-vsts",
  "best-synthesizers",
  "best-wireless-iems",
  "blues-junior-vs-ac30",
  "blx288-vs-ewd",
  "bridge-cast-x-vs-rodecaster-pro2",
  "budget-bass-like-expensive",
  "budget-headphones",
  "budget-interfaces",
  "budget-mics",
  "budget-monitors",
  "budget-pa-systems",
  "budget-usb-mics",
  "c414-vs-u87",
  "channel-strip-plugins",
  "compact-rhythm-devices",
  "daw-guide",
  "di-box",
  "digitakt-ii-vs-tr8s",
  "dt770-vs-dt990"
];

targetIds.forEach(id => {
  const regex = new RegExp(`"${id}"\\s*:\\s*\\{[^}]+\\}`, 's');
  const match = overridesContent.match(regex);
  if (match) {
    console.log('=== ' + id + ' ===');
    console.log(match[0]);
    console.log('');
  } else {
    console.log('=== ' + id + ' ===');
    console.log('NOT FOUND in score_overrides.js');
    console.log('');
  }
});