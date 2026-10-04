const fs = require('fs');
const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');

// Add Fender Rumble 200 V3 (id 555)
P.push({
  "id": 555,
  "title": "Fender Rumble 200 V3",
  "title_es": "Fender Rumble 200 V3",
  "brand": "Fender",
  "category": "amps",
  "price": 449,
  "rating": 4.7,
  "reviews": 289,
  "badge": "bestValue",
  "desc": "The Fender Rumble 200 V3 delivers 200 watts through a single 15-inch Eminence speaker and a high-frequency tweeter, making it ideal for 5-string bass players who need low-B clarity. Features 9-band EQ, built-in overdrive, XLR direct out with ground lift, aux in, headphone out, and weighs just 23 lbs — the lightest 15-inch combo in its class.",
  "desc_es": "El Fender Rumble 200 V3 entrega 200 vatios a través de un altavoz Eminence de 15 pulgadas y tweeter de agudos, ideal para bajistas de 5 cuerdas que necesitan claridad en el Si grave. Incluye EQ de 9 bandas, overdrive incorporado, salida DI XLR con ground lift, entrada aux, salida de auriculares y pesa solo 10,4 kg — el combo de 15 pulgadas más ligero de su clase.",
  "img": "https://r2.gear4music.com/media/93/939191/1200/preview.jpg",
  "stores": {
    "gear4music": "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FFender-Rumble-200-V3-1x15-Bass-Combo%2FX0S",
    "musicstore": "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FFender-Rumble-200-V3-Combo%2Fart-BAS0007195-000",
    "amazon": "https://www.amazon.com/dp/B00HWINPLO",
    "andertons": "https://www.andertons.co.uk/fender-rumble-200-v3-bass-amp/",
    "zzounds": "https://www.zzounds.com/a--925521/item--FEN2370500"
  }
});

// Add Ampeg Rocket Bass RB-115 (id 556)
P.push({
  "id": 556,
  "title": "Ampeg Rocket Bass RB-115",
  "title_es": "Ampeg Rocket Bass RB-115",
  "brand": "Ampeg",
  "category": "amps",
  "price": 799,
  "rating": 4.8,
  "reviews": 156,
  "badge": "legend",
  "desc": "The Ampeg Rocket Bass RB-115 brings SVT tone in a single 15-inch combo with 500 watts through a Custom15 speaker and 1\" compression driver. Features the Legacy preamp with 3-band EQ, Super Grit Technology overdrive, Ultra Hi/Ultra Lo switches, XLR DI out, FX loop, aux in, headphone out, and 60° monitor angle — the ultimate 5-string stage combo.",
  "desc_es": "El Ampeg Rocket Bass RB-115 trae el tono SVT en un combo de 15 pulgadas con 500 vatios a través de un altavoz Custom15 y driver de compresión de 1\". Incluye preamplificador Legacy con EQ de 3 bandas, overdrive Super Grit Technology, interruptores Ultra Hi/Ultra Lo, salida DI XLR, loop de FX, entrada aux, salida de auriculares y ángulo de monitor de 60° — el combo definitivo para 5 cuerdas en el escenario.",
  "img": "https://r2.gear4music.com/media/65/656319/1200/preview.jpg",
  "stores": {
    "gear4music": "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FGuitar-and-Bass%2FAmpeg-Rocket-Bass-115%2F3T6V",
    "musicstore": "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FAmpeg-Rocket-Bass-RB-115%2Fart-BAS0011678-000",
    "amazon": "https://www.amazon.com/dp/B08TGDT1TQ",
    "andertons": "https://www.andertons.co.uk/ampeg-rocket-rb-115-500w-bass-combo/",
    "zzounds": "https://www.zzounds.com/a--925521/item--AMPRB115"
  }
});

fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/data/products.json', JSON.stringify(P, null, 2));
console.log('Added Fender Rumble 200 V3 (555) and Ampeg Rocket Bass RB-115 (556)');