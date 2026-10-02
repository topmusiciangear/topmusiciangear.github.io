const fs = require('fs');
let t = fs.readFileSync('data/guides.json', 'utf8');

// Update Squier Classic Vibe '70s Jazz V section - English
t = t.replace(
  '$479.99 street at zzounds and £439 at G4M',
  '$479.99 street at zzounds, £439 at Andertons and G4M'
);
// Spanish
t = t.replace(
  '$479,99 de calle en zzounds y £439 en G4M',
  '$479,99 de calle en zzounds, £439 en Andertons y G4M'
);

fs.writeFileSync('data/guides.json', t);
console.log('done');