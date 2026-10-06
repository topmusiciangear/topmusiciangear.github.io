const fs = require('fs');
const products = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

if (!products.find(p => p.id === 571)) {
  products.push({
    id: 571,
    title: "Casio Privia PX-S1100 Digital Piano",
    title_es: "Casio Privia PX-S1100 Piano Digital",
    brand: "Casio",
    category: "keyboards",
    price: 649,
    desc: "Ultra-slim 88-key digital piano with Smart Scaled Hammer Action, AiR sound engine, Bluetooth audio/MIDI, and the world's thinnest cabinet at 232 mm depth. Built for small spaces without sacrificing authentic hammer feel.",
    desc_es: "Piano digital ultra-delgado de 88 teclas con Smart Scaled Hammer Action, motor de sonido AiR, Bluetooth audio/MIDI, y el mueble más fino del mundo con 232 mm de fondo. Pensado para espacios pequeños sin renunciar a un tacto de martillo auténtico.",
    img: "https://r2.gear4music.com/media/88/881234/1200/preview.jpg",
    stores: {
      amazon: "https://www.amazon.com/s?k=Casio+PX-S1100&tag=topmusicg-20",
      gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Casio-Privia-PX-S1100/XXYY",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Casio-PX-S1100/art-REC00XXXXX-000",
      zzounds: "https://www.zzounds.com/item--CASPIXS1100"
    }
  });
}

if (!products.find(p => p.id === 572)) {
  products.push({
    id: 572,
    title: "Roland FP-10 Digital Piano",
    title_es: "Roland FP-10 Piano Digital",
    brand: "Roland",
    category: "keyboards",
    price: 499,
    desc: "Compact 88-key digital piano with PHA-4 Standard action (the same keybed as the FP-30X), SuperNATURAL piano sound, Bluetooth MIDI, and built-in speakers. The most authentic hammer feel in the entry price bracket.",
    desc_es: "Piano digital compacto de 88 teclas con acción PHA-4 Standard (el mismo teclado que el FP-30X), sonido de piano SuperNATURAL, Bluetooth MIDI y altavoces integrados. El tacto de martillo más auténtico de su franja de precio de entrada.",
    img: "https://r2.gear4music.com/media/82/821234/1200/preview.jpg",
    stores: {
      amazon: "https://www.amazon.com/s?k=Roland+FP-10&tag=topmusicg-20",
      gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Roland-FP-10-Digital-Piano/XXYY",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Roland-FP-10/art-REC00XXXXX-000",
      zzounds: "https://www.zzounds.com/item--ROLFP10"
    }
  });
}

fs.writeFileSync('data/products.json', JSON.stringify(products, null, 2));
console.log('count now:', products.length);
