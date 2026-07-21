import fs from 'fs';

let c = fs.readFileSync('js/constants.min.js', 'utf8');

// Remove from storeNames
c = c.replace(/,musikproduktiv:"Musik Produktiv"/, '');

// Remove from storeColors
c = c.replace(/,musikproduktiv:"#78716c"/, '');

// Remove from storeIcons
c = c.replace(
  /,musikproduktiv:'<img src="\/img\/musikproduktiv-icon\.png" alt="Musik Produktiv" class="store-icon-img" style="width:28px">'/,
  ''
);

fs.writeFileSync('js/constants.min.js', c);
console.log('Updated constants.min.js');
