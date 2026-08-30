const fs=require("fs");
const p=JSON.parse(fs.readFileSync("data/products.json","utf8"));

const newProducts = [
  {
    id: 431, asin: "B01MCVTGVL",
    title: "sE Electronics V7 Dynamic Microphone",
    title_es: "Micrófono Dinámico sE Electronics V7",
    brand: "sE Electronics",
    category: "microphones",
    desc: "Supercardioid dynamic vocal microphone with patented internal shockmount, all-metal construction, and gold-plated XLR connector.",
    desc_es: "Micrófono dinámico supercardioid para vocales con shockmount interno patentado, construcción toda metálica y conector XLR bañado en oro.",
    img: "https://www.gear4music.com/media/o_1pww/1200/preview.jpg",
    price: 64,
    stores: {
      amazon: "https://www.amazon.com/dp/B01MCVTGVL",
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/sE-Electronics-V7-Dynamic-Microphone-Black/44V0",
      reverb: "https://www.reverb.com/marketplace?query=sE+Electronics+V7"
    }
  },
  {
    id: 432, asin: "B0B8GRCXB6",
    title: "Elgato Wave DX Dynamic XLR Microphone",
    title_es: "Micrófono Dinámico XLR Elgato Wave DX",
    brand: "Elgato",
    category: "microphones",
    desc: "Dynamic XLR microphone engineered by Lewitt Audio with cardioid pattern, optimized for speech, no signal booster required.",
    desc_es: "Micrófono dinámico XLR diseñado por Lewitt Audio con patrón cardioide, optimizado para voz, no requiere booster de señal.",
    img: "https://m.media-amazon.com/images/I/41dOVEDGbYL._AC_SL1500_.jpg",
    price: 100,
    stores: {
      amazon: "https://www.amazon.com/dp/B0B8GRCXB6"
    }
  },
  {
    id: 433, asin: "B0848D6TBR",
    title: "Samson Q9U XLR/USB Dynamic Broadcast Microphone",
    title_es: "Micrófono Dinámico XLR/USB de Broadcast Samson Q9U",
    brand: "Samson",
    category: "microphones",
    desc: "Professional broadcast dynamic microphone with XLR and USB-C outputs, low-cut and mid-presence controls, and built-in shockmount.",
    desc_es: "Micrófono dinámico de broadcast profesional con salidas XLR y USB-C, controles de corte grave y presencia media, y shockmount integrado.",
    img: "https://m.media-amazon.com/images/I/61Vx7TcYc8L._AC_SL1500_.jpg",
    price: 130,
    stores: {
      amazon: "https://www.amazon.com/dp/B0848D6TBR",
      zzounds: "https://www.zzounds.com/item--SAMQ9U"
    }
  },
  {
    id: 434, asin: "B00M9CUOKI",
    title: "AKG P120 Large-Diaphragm Condenser Microphone",
    title_es: "Micrófono Condensador de Gran Diafragma AKG P120",
    brand: "AKG",
    category: "microphones",
    desc: "Affordable large-diaphragm condenser with switchable bass-cut filter and -20 dB pad, ideal for vocals, instruments, and project studios.",
    desc_es: "Condensador de gran diafragma asequible con filtro de corte de graves conmutable y pad de -20 dB, ideal para vocales, instrumentos y estudios de proyecto.",
    img: "https://m.media-amazon.com/images/I/51dJ7cPiJFL._AC_SL1500_.jpg",
    price: 80,
    stores: {
      amazon: "https://www.amazon.com/dp/B00M9CUOKI",
      reverb: "https://www.reverb.com/marketplace?query=AKG+P120"
    }
  },
  {
    id: 435, asin: "B001RPP3GQ",
    title: "Behringer B 906 Dynamic Microphone",
    title_es: "Micrófono Dinámico Behringer B 906",
    brand: "Behringer",
    category: "microphones",
    desc: "Dynamic instrument microphone with switchable low-cut, flat, and HF boost settings — excels on guitar amps, drums, and brass.",
    desc_es: "Micrófono dinámico de instrumento con ajustes de corte grave, plano y realce de agudos conmutable — excelente para amplificadores de guitarra, batería y metales.",
    img: "https://m.media-amazon.com/images/I/51C8s8V6OzL._AC_SL1000_.jpg",
    price: 40,
    stores: {
      amazon: "https://www.amazon.com/dp/B001RPP3GQ",
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Behringer-B906-Dynamic-Microphone/20EN"
    }
  },
  {
    id: 436, asin: "B0BC3XB26X",
    title: "MAONO PD100 XLR Dynamic Podcast Microphone",
    title_es: "Micrófono Dinámico XLR para Podcast MAONO PD100",
    brand: "MAONO",
    category: "microphones",
    desc: "Cardioid dynamic XLR microphone with built-in pop filter, metal body, and desktop stand — broadcast-quality sound for podcasting and streaming.",
    desc_es: "Micrófono dinámico cardiode XLR con filtro pop integrado, cuerpo metálico y soporte de escritorio — sonido de calidad broadcast para podcasting y streaming.",
    img: "https://m.media-amazon.com/images/I/61sH5J7bikL._AC_SL1500_.jpg",
    price: 46,
    stores: {
      amazon: "https://www.amazon.com/dp/B0BC3XB26X"
    }
  },
  {
    id: 437, asin: "B0BZP61K18",
    title: "FIFINE K669D XLR Dynamic Microphone",
    title_es: "Micrófono Dinámico XLR FIFINE K669D",
    brand: "FIFINE",
    category: "microphones",
    desc: "Budget XLR dynamic microphone with cardioid pattern, metal body, and tripod stand — ideal for podcasting, streaming, and voice-over.",
    desc_es: "Micrófono dinámico XLR económico con patrón cardioide, cuerpo metálico y soporte de trípode — ideal para podcasting, streaming y locución.",
    img: "https://m.media-amazon.com/images/I/61Vx7TcYc8L._AC_SL1500_.jpg",
    price: 37,
    stores: {
      amazon: "https://www.amazon.com/dp/B0BZP61K18"
    }
  },
  {
    id: 438, asin: "B0002KRBUY",
    title: "Samson C01 Studio Condenser Microphone",
    title_es: "Micrófono Condensador de Estudio Samson C01",
    brand: "Samson",
    category: "microphones",
    desc: "Large-diaphragm condenser with 19mm capsule, cardioid pattern, and gold-plated XLR connector — studio quality at a budget price.",
    desc_es: "Condensador de gran diafragma con cápsula de 19 mm, patrón cardioide y conector XLR bañado en oro — calidad de estudio a precio económico.",
    img: "https://m.media-amazon.com/images/I/71YPnVJjSLL._AC_SL1500_.jpg",
    price: 80,
    stores: {
      amazon: "https://www.amazon.com/dp/B0002KRBUY",
      reverb: "https://www.reverb.com/marketplace?query=Samson+C01",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Samson-C01-Condenser-Microphone/1PLS"
    }
  }
];

newProducts.forEach(np => {
  if (!p.find(x => x.id === np.id)) {
    p.push(np);
    console.log(`Added: ${np.id} - ${np.title}`);
  } else {
    console.log(`Already exists: ${np.id}`);
  }
});

fs.writeFileSync("data/products.json", JSON.stringify(p, null, 2), "utf8");
console.log("Total products:", p.length);
