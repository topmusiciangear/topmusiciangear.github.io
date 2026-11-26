const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const p55 = products.find(p => p.id === 55);

if (p55) {
  // Update image URL
  const newImageUrl = 'https://r2.gear4music.com/media/143/1433044/1200/preview.jpg';
  p55.img = newImageUrl;
  
  // Update store links
  p55.stores = {
    "gear4music": "https://www.gear4music.com/Recording-and-Computers/Universal-Audio-Volt-2-Gen-2-Audio-Interface/8F8X",
    "musicstore": "https://www.musicstore.com/en_OE/EUR/Universal-Audio-Volt-2-Gen-2/art-PCM0019051-000",
    "andertons": "https://www.andertons.co.uk/universal-audio-volt-2-gen-2-audio-interface/?search_query=Universal%20Audio%20Volt%202%20Gen%202",
    "amazon": "https://www.amazon.com/dp/B0HJDDFDH7?plpRedirect=mhFallback&ref=clp_hp_h_pc&th=1"
  };
  p55.oos = ["zzounds"];
  
  fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2), 'utf8');
  console.log('Updated product 55 (Volt 2 Gen 2):');
  console.log('  Image:', p55.img);
  console.log('  Stores:', JSON.stringify(p55.stores, null, 2));
} else {
  console.log('Product 55 not found');
}