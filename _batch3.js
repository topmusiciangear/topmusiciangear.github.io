const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

// Get products 21-30
const batch = products.filter(p => p.id >= 21 && p.id <= 30);

batch.forEach(p => {
  const g4mUrl = p.stores.gear4music;
  if (g4mUrl) {
    // Extract URL after ued= parameter
    const match = g4mUrl.match(/ued=([^&]+)/);
    if (match) {
      let url = decodeURIComponent(match[1]);
      // Replace gear4music.com with gear4music.ie
      url = url.replace('gear4music.com', 'gear4music.ie');
      console.log(`ID ${p.id}: ${p.title}`);
      console.log(`  Original: ${g4mUrl}`);
      console.log(`  Clean: ${url}`);
      console.log('');
    }
  }
});