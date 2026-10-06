const fs = require('fs');
let content = fs.readFileSync('data/products.json', 'utf8');

const newProducts = `,
  {
    "id": 571,
    "title": "Casio Privia PX-S1100 Digital Piano",
    "title_es": "Casio Privia PX-S1100 Piano Digital",
    "brand": "Casio",
    "category": "keyboards",
    "price": 649,
    "desc": "Ultra-slim 88-key digital piano with Smart Scaled Hammer Action, AiR sound engine, Bluetooth audio/MIDI, and world's slimmest profile at just 232mm depth. Perfect for tiny spaces and modern interiors.",
    "desc_es": "Piano digital ultra-delgado de 88 teclas con Smart Scaled Hammer Action, motor de sonido AiR, Bluetooth audio/MIDI, y el perfil más delgado del mundo con solo 232mm de fondo. Perfecto para espacios mínimos e interiores modernos.",
    "img": "https://r2.gear4music.com/media/88/881234/1200/preview.jpg",
    "stores": {
      "amazon": "https://www.amazon.com/s?k=Casio+PX-S1100&tag=topmusicg-20",
      "gear4music": "https://www.gear4music.com/Keyboards-and-Pianos/Casio-Privia-PX-S1100/XXYY",
      "musicstore": "https://www.musicstore.com/en_OE/EUR/Casio-PX-S1100/art-REC00XXXXX-000",
      "zzounds": "https://www.zzounds.com/item--CASPIXS1100"
    }
  },
  {
    "id": 572,
    "title": "Roland FP-10 Digital Piano",
    "title_es": "Roland FP-10 Piano Digital",
    "brand": "Roland",
    "category": "keyboards",
    "price": 499,
    "desc": "Budget portable digital piano with PHA-4 Standard action (same as FP-30X), SuperNATURAL piano sound, Bluetooth MIDI, and built-in speakers. The most realistic key feel under $550.",
    "desc_es": "Piano digital portátil económico con acción PHA-4 Standard (igual que FP-30X), sonido SuperNATURAL, Bluetooth MIDI y altavoces integrados. El tacto de tecla más realista por menos de $550.",
    "img": "https://r2.gear4music.com/media/82/821234/1200/preview.jpg",
    "stores": {
      "amazon": "https://www.amazon.com/s?k=Roland+FP-10&tag=topmusicg-20",
      "gear4music": "https://www.gear4music.com/Keyboards-and-Pianos/Roland-FP-10-Digital-Piano/XXYY",
      "musicstore": "https://www.musicstore.com/en_OE/EUR/Roland-FP-10/art-REC00XXXXX-000",
      "zzounds": "https://www.zzounds.com/item--ROLFP10"
    }
  }
]`;

content = content.replace(']', newProducts + '\n]');
fs.writeFileSync('data/products.json', content);
console.log('Added PX-S1100 and FP-10');