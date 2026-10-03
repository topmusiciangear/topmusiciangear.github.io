const fs = require('fs');
const P = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));
const maxId = Math.max(...P.map(p => p.id));
console.log('maxId before:', maxId);

P.push({
  id: 550,
  title: 'Behringer U-Phoria UMC1820',
  title_es: 'Behringer U-Phoria UMC1820',
  brand: 'Behringer',
  category: 'interfaces',
  price: 229,
  rating: 4.9,
  reviews: 47,
  desc: '18x20 USB 2.0 interface with 8 MIDAS-designed mic preamps (+48V phantom), 24-bit/96kHz converters, ADAT + S/PDIF + S/MUX digital I/O and MIDI I/O. 8 XLR/TRS combo inputs, dual phones outs, zero-latency direct monitoring. ADAT input pairs with an ADA8200 for 16 MIDAS preamps total. 1U rack chassis.',
  desc_es: 'Interfaz USB 2.0 18x20 con 8 previos de micro diseñados por MIDAS (+48V phantom), conversores 24-bit/96kHz, E/S digital ADAT + S/PDIF + S/MUX y MIDI I/O. 8 entradas combo XLR/TRS, doble salida de auriculares, monitoreo directo sin latencia. La entrada ADAT se empareja con un ADA8200 para 16 previos MIDAS en total. Chasis rack 1U.',
  img: 'https://r2.gear4music.com/media/72/725075/1200/preview.jpg',
  stores: {
    gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FBehringer-U-Phoria-UMC1820-USB-MIDI-Interface%2FXP6',
    andertons: 'https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2Fbehringer-umc1820-usb-audio-interface%2F',
    musicstore: 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FBehringer-UMC1820-U-PHORIA%2Fart-PCM0014077-000',
    amazon: 'https://www.amazon.com/dp/B01ET9GCGS?tag=topmusicg-20'
  }
});

P.push({
  id: 551,
  title: 'Arturia MiniFuse 2, Black',
  title_es: 'Arturia MiniFuse 2, Negro',
  brand: 'Arturia',
  category: 'interfaces',
  price: 149,
  desc: 'Bus-powered 2-in/2-out USB-C interface (USB 2.0 compatible) with 2 combo preamps, 110dB dynamic range and up to 24-bit/192kHz. Rear USB-A hub port (250mA) for MIDI controllers, 5-pin DIN MIDI I/O, stereo loopback channel. Bundle: Ableton Live Lite, Analog Lab Intro, 4 Arturia FX (Plate-140, Pre 1973, Tape-201, Jun-6), Auto-Tune 3-mo, Guitar Rig 6 LE, Splice 3-mo.',
  desc_es: 'Interfaz USB-C 2 entradas/2 salidas alimentada por bus (compatible USB 2.0) con 2 previos combo, 110dB de rango dinámico y hasta 24-bit/192kHz. Hub USB-A trasero (250mA) para controladores MIDI, MIDI DIN 5 pines, canal loopback estéreo. Suite: Ableton Live Lite, Analog Lab Intro, 4 FX de Arturia (Plate-140, Pre 1973, Tape-201, Jun-6), Auto-Tune 3 meses, Guitar Rig 6 LE, Splice 3 meses.',
  img: 'https://r2.gear4music.com/media/71/710788/1200/preview.jpg',
  stores: {
    gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FArturia-MiniFuse-2-USB-Audio-Interface-Black%2F43TS',
    zzounds: 'https://www.zzounds.com/item--AUAMINIFUSE2',
    andertons: 'https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2Farturia-minifuse-2-black-audio-interface%2F',
    musicstore: 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FArturia-MiniFuse-2-Black%2Fart-PCM0017077-000',
    amazon: 'https://www.amazon.com/dp/B09HL4GZF9?tag=topmusicg-20'
  }
});

fs.writeFileSync('data/products.json', JSON.stringify(P, null, 2));
console.log('added 550 + 551, new max:', Math.max(...P.map(p => p.id)));