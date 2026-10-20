const fs = require('fs');
const path = require('path');
const consolidated = JSON.parse(fs.readFileSync(path.join(__dirname, 'consolidated_scores.json'), 'utf8'));
const guideId = 'best-beginner-electric-guitar';

const c = consolidated[guideId];
console.log('consolidated[guideId] exists:', !!c);
console.log('Keys:', Object.keys(c || {}));

const title = 'Yamaha Pacifica 112V';
console.log('Has title:', title in c);
console.log('Score:', c[title]);