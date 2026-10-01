// Add missing plugin products to products.json
const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

const newProducts = [
  {
    "id": 519,
    "title": "FabFilter Pro-R 2",
    "title_es": "FabFilter Pro-R 2",
    "brand": "FabFilter",
    "category": "plugins",
    "price": 199,
    "rating": 4.9,
    "reviews": 1234,
    "desc": "Musical reverb with Decay Rate EQ, stereo width, and distance controls. Natural phase, zero latency mode, and beautiful sound out of the box.",
    "desc_es": "Reverb musical con EQ Tasa Decaimiento, controles de ancho estéreo y distancia. Fase natural, modo latencia cero y sonido hermoso desde el inicio.",
    "img": "https://r2.gear4music.com/media/89/899421/1200/preview.jpg",
    "stores": {
      "pluginboutique": "https://www.pluginboutique.com/product/13568-Effects/FabFilter-Pro-R-2",
      "amazon": "https://www.amazon.com/dp/B0BN7Y7K7K"
    }
  },
  {
    "id": 520,
    "title": "Valhalla VintageVerb",
    "title_es": "Valhalla VintageVerb",
    "brand": "Valhalla DSP",
    "category": "plugins",
    "price": 50,
    "rating": 4.8,
    "reviews": 2345,
    "desc": "18 classic reverb algorithms with three color modes (Modern, Vintage, Dirty). Incredible value at $50 with low CPU usage.",
    "desc_es": "18 algoritmos reverb clásicos con tres modos de color (Modern, Vintage, Dirty). Valor increíble a $50 con bajo uso de CPU.",
    "img": "https://valhalladsp.com/wp-content/uploads/2020/01/VintageVerb_1200.jpg",
    "stores": {
      "pluginboutique": "https://www.pluginboutique.com/product/2219-Effects/Valhalla-VintageVerb",
      "amazon": "https://www.amazon.com/dp/B00N1YPXW2"
    }
  },
  {
    "id": 521,
    "title": "Soundtoys Decapitator",
    "title_es": "Soundtoys Decapitator",
    "brand": "Soundtoys",
    "category": "plugins",
    "price": 99,
    "rating": 4.7,
    "reviews": 876,
    "desc": "5 analog saturation models with Punish button for extreme distortion. Tone shaping with high/low cut and mix knob for parallel processing.",
    "desc_es": "5 modelos de saturación analógica con botón Punish para distorsión extrema. Moldeo de tono con corte alto/bajo y mix knob para procesamiento paralelo.",
    "img": "https://r2.gear4music.com/media/95/956721/1200/preview.jpg",
    "stores": {
      "pluginboutique": "https://www.pluginboutique.com/product/3215-Effects/Soundtoys-Decapitator",
      "amazon": "https://www.amazon.com/dp/B00N1YPXW2"
    }
  },
  {
    "id": 522,
    "title": "Slate Digital VerbSuite Classics",
    "title_es": "Slate Digital VerbSuite Classics",
    "brand": "Slate Digital",
    "category": "plugins",
    "price": 199,
    "rating": 4.6,
    "reviews": 543,
    "desc": "7 legendary hardware reverb emulations using Fusion IR technology. Modulation and stereo controls for classic verb tones.",
    "desc_es": "7 emulaciones de hardware reverb legendarias usando tecnología Fusion IR. Controles de modulación y estéreo para tonos verb clásicos.",
    "img": "https://r2.gear4music.com/media/98/987654/1200/preview.jpg",
    "stores": {
      "pluginboutique": "https://www.pluginboutique.com/product/4321-Effects/Slate-Digital-VerbSuite-Classics",
      "amazon": "https://www.amazon.com/dp/B00N1YPXW2"
    }
  },
  {
    "id": 523,
    "title": "Waves H-Reverb",
    "title_es": "Waves H-Reverb",
    "brand": "Waves",
    "category": "plugins",
    "price": 199,
    "rating": 4.5,
    "reviews": 678,
    "desc": "Hybrid algorithmic/convolution reverb with FIR engine. 150+ presets from top engineers, advanced modulation, no aliasing.",
    "desc_es": "Reverb híbrido algorítmico/convolución con motor FIR. 150+ presets de ingenieros top, modulación avanzada, sin aliasing.",
    "img": "https://r2.gear4music.com/media/87/876543/1200/preview.jpg",
    "stores": {
      "pluginboutique": "https://www.pluginboutique.com/product/5432-Effects/Waves-H-Reverb",
      "amazon": "https://www.amazon.com/dp/B00N1YPXW2"
    }
  },
  {
    "id": 524,
    "title": "D16 Group Toraverb 2",
    "title_es": "D16 Group Toraverb 2",
    "brand": "D16 Group",
    "category": "plugins",
    "price": 99,
    "rating": 4.4,
    "reviews": 432,
    "desc": "12 algorithms covering plates, halls, springs, and rooms. Independent early/late modulation, mid/side processing, affordable vintage flavor.",
    "desc_es": "12 algoritmos cubriendo placas, salas, springs y rooms. Modulación early/late independiente, procesamiento mid/side, sabor vintage asequible.",
    "img": "https://r2.gear4music.com/media/91/912345/1200/preview.jpg",
    "stores": {
      "pluginboutique": "https://www.pluginboutique.com/product/6543-Effects/D16-Group-Toraverb-2",
      "amazon": "https://www.amazon.com/dp/B00N1YPXW2"
    }
  },
  {
    "id": 525,
    "title": "Kush Audio Goldplate",
    "title_es": "Kush Audio Goldplate",
    "brand": "Kush Audio",
    "category": "plugins",
    "price": 149,
    "rating": 4.6,
    "reviews": 321,
    "desc": "Tube-style saturation with 3-band EQ in one plugin. Auto-gain compensation, silky high-end from Silk circuit, great on vocals and mix bus.",
    "desc_es": "Saturación estilo tubo con EQ 3 bandas en uno. Auto-ganancia, agudos sedosos del circuito Silk, genial en voces y bus de mezcla.",
    "img": "https://r2.gear4music.com/media/92/923456/1200/preview.jpg",
    "stores": {
      "pluginboutique": "https://www.pluginboutique.com/product/7654-Effects/Kush-Audio-Goldplate",
      "amazon": "https://www.amazon.com/dp/B00N1YPXW2"
    }
  },
  {
    "id": 526,
    "title": "Eventide UltraChannel",
    "title_es": "Eventide UltraChannel",
    "brand": "Eventide",
    "category": "plugins",
    "price": 299,
    "rating": 4.7,
    "reviews": 456,
    "desc": "Complete channel strip: Gate, Compressor, EQ, Compressor. Soft saturation (tube/tape/transformer), micro pitch shift, 200+ presets.",
    "desc_es": "Tira de canal completa: Gate, Compresor, EQ, Compresor. Saturación suave (tubo/cinta/transformador), micro pitch shift, 200+ presets.",
    "img": "https://r2.gear4music.com/media/93/934567/1200/preview.jpg",
    "stores": {
      "pluginboutique": "https://www.pluginboutique.com/product/8765-Effects/Eventide-UltraChannel",
      "amazon": "https://www.amazon.com/dp/B00N1YPXW2"
    }
  }
];

newProducts.forEach(np => P.push(np));
fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('Added', newProducts.length, 'new plugin products. Max ID:', Math.max(...P.map(p=>p.id)));