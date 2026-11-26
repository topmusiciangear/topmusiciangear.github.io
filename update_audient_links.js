const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const p53 = products.find(p => p.id === 53);
if (p53) {
  p53.stores = {
    "andertons": "https://www.andertons.co.uk/audient-id2-10in6out-high-performance-usb-audio-interface/?search_query=Audient%20iD2",
    "gear4music": "https://www.gear4music.com/Recording-and-Computers/Audient-iD2-MK3-10-in-6-out-USB-Audio-Interface/8LHA",
    "zzounds": "https://www.zzounds.com/item--ADIID2?siid=399388",
    "musicstore": "https://www.musicstore.com/en_OE/EUR/Audient-iD2/art-PCM0019062-000"
  };
  // Remove amazon since user didn't provide it
  delete p53.stores.amazon;
  p53.oos = ["zzounds"];
  fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf8');
  console.log('Updated Audient iD2 stores');
  console.log(JSON.stringify(p53.stores, null, 2));
} else {
  console.log('Product 53 not found');
}