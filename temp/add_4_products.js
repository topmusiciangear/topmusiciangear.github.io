var fs = require('fs');
var BASE = 'C:/Users/Daniel/projects/topmusiciangear/';

var p = JSON.parse(fs.readFileSync(BASE + 'data/products.json', 'utf8'));

var has666 = p.some(function(x){return x.id===666});
var has667 = p.some(function(x){return x.id===667});
var has668 = p.some(function(x){return x.id===668});
var has669 = p.some(function(x){return x.id===669});

console.log('Already in catalog:', JSON.stringify({666:has666, 667:has667, 668:has668, 669:has669}));

if (!has666) {
  p.push({
    id: 666, title: 'Rode NT-USB+', title_es: 'Rode NT-USB+', brand: 'Rode',
    category: 'microphones', price: 169, rating: 4.5, badge: 'bestSeller',
    desc: 'USB condenser microphone with internal APHEX Revolution preamp and 24-bit/48kHz conversion. Cardioid pattern, zero-latency headphone output, built-in pop filter. Includes desktop tripod ring mount and cables. Compatible with RODE Connect for advanced routing. Ideal upgrade from Yeti-classics for streamers wanting internal hardware processing without software plugins.',
    desc_es: 'Micrófono condensador USB con preamplificador interno Revolution APHEX y conversión 24-bit/48kHz. Patrón cardioide, salida de auriculares sin latencia, filtro antipop integrado. Incluye trípode de escritorio, anillo de montaje y cables. Compatible con RODE Connect para enrutamiento avanzado. Ideal salto desde la serie Yeti para streamers que buscan procesamiento de hardware interno sin plugins de software.',
    img: 'https://edge.rode.com/images/page/2072/modules/6597/rode-nt-usb-plus-three-quater-hero-1080x1080-rgb.png',
    stores: {
      amazon: 'https://www.amazon.com/dp/B09K9VQKQ3',
      gear4music: 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FRode-NT-USBplus%2F58QD',
      andertons: 'https://www.andertons.co.uk/rode-nt-usb-professional-usb-microphone/',
      musicstore: 'https://www.musicstore.com/en_OE/EUR/Rode-NT-USBplus/art-REC0017634-000',
      zzounds: 'https://www.zzounds.com/item--RODNTUSBPL'
    },
    oos: []
  });
}

if (!has667) {
  p.push({
    id: 667, title: 'Shure MV6', title_es: 'Shure MV6', brand: 'Shure',
    category: 'microphones', price: 129, rating: 4.5, badge: 'pro',
    desc: 'USB-C dynamic microphone with Voice Isolation technology, Auto Level Mode, Digital Popper Stopper and Real-time Denoiser. Includes 2m USB-C cable, round-base desktop stand, tap-to-mute button. Designed as the accessible younger brother of the MV7+, aimed at streamers and gamers who want Shure dynamic sound at a lower price point than the MV7+. Cardioid pattern, 16/24-bit, 44.1/48kHz, headphone output with zero-latency monitoring.',
    desc_es: 'Micrófono dinámico USB-C con tecnología Voice Isolation, Auto Level Mode, Digital Popper Stopper y Real-time Denoiser. Incluye cable USB-C de 2m, soporte de escritorio redondo y botón de silencio al toque. Diseñado como el hermano menor accesible del MV7+, orientado a streamers y gamers que buscan sonido dinámico Shure a un precio inferior al MV7+. Patrón cardioide, 16/24-bit, 44.1/48kHz, salida de auriculares con monitorización sin latencia.',
    img: 'https://products.shureweb.eu/shure_product_db/product_main_images/files/6f7/c70/a9-/setcard/f3cad90794410311236c0e50c17ea13e.jpeg',
    stores: {
      amazon: 'https://www.amazon.com/dp/B0DBJ5DBL8',
      zzounds: 'https://www.zzounds.com/item--SHUMV6',
      andertons: 'https://www.andertons.co.uk/shure-motiv-mv6-g2-black-dynamic-usb-c-microphone-for-pc-gamers-streamers/',
      musicstore: 'https://www.musicstore.com/en_OE/EUR/Shure-MV6/art-REC0016781-000',
      gear4music: 'https://www.gear4music.com/PA-DJ-and-Lighting/Shure-MV6-USB-Gaming-Microphone/6OHD'
    },
    oos: ['gear4music']
  });
}

if (!has668) {
  p.push({
    id: 668, title: 'Audio-Technica AT2020USB-XP', title_es: 'Audio-Technica AT2020USB-XP',
    brand: 'Audio-Technica', category: 'microphones', price: 219, rating: 4.4,
    badge: 'bestSeller',
    desc: 'USB-C cardioid condenser with 24-bit/192kHz conversion, integrated DSP with 3-level noise reduction and automatic gain control. Includes desk stand, pop filter, 3/8"-16 to 5/8"-27 adapter, USB-C to USB-A cable. Unlike the standard AT2020USB+, the XP model adds hardware noise reduction and AGC limiter to prevent clipping during excited shouting or streaming. 142mm long, 52mm diameter, 375g.',
    desc_es: 'Condensador cardioide USB-C con conversión 24-bit/192kHz, DSP integrado con 3 niveles de reducción de ruido y control automático de ganancia. Incluye soporte de escritorio, filtro antipop, adaptador 3/8"-16 a 5/8"-27, cable USB-C a USB-A. A diferencia del AT2020USB+, el modelo XP añade reducción de ruido de hardware y limitador AGC para evitar recortes al gritar o emocionarse durante un streaming. 142mm de largo, 52mm de diámetro, 375g.',
    img: 'https://cf1.zzounds.com/media/productmedia/fit,600by600/quality,85/AT2020USB-XP_02-1-_871302-2dd9db3c1c85ba322270302a5b943766.jpg',
    stores: {
      amazon: 'https://www.amazon.com/dp/B0C61VGXWM',
      zzounds: 'https://www.zzounds.com/item--AUDAT2020USBXP',
      andertons: 'https://www.andertons.co.uk/audio-technica-at2020usb-xp-cardioid-condenser-usb-microphone/',
      musicstore: 'https://www.musicstore.com/en_US/USD/Audio-Technica-AT2020USB-XP-USB-Condenser-Mic-with-Stand-Pop-Filter-Black-/art-REC0016402-000',
      gear4music: 'https://www.gear4music.com/us/en/PA-DJ-and-Lighting/Audio-Technica-AT2020USB-XP-Cardioid-Condenser-USB-Microphone/5PYF'
    },
    oos: ['andertons']
  });
}

if (!has669) {
  p.push({
    id: 669, title: 'AKG Lyra', title_es: 'AKG Lyra', brand: 'AKG',
    category: 'microphones', price: 149, rating: null, badge: 'discontinued',
    desc: 'Ultra-HD multimode USB condenser with 4-capsule array (Cardioid, Front & Back, Tight Stereo, Wide Stereo). 24-bit/192kHz conversion. Discontinued by manufacturer; zZounds no longer carries it, AKG USA site marks it discontinued, Andertons has no product page. Was the premium multi-pattern alternative to HyperX QuadCast S. Available on secondary markets only.',
    desc_es: 'Condensador multimodal USB Ultra-HD con matriz de 4 cápsulas (Cardioide, Frente y Atrás, Estéreo estrecho, Estéreo ancho). 24-bit/192kHz. Descontinuado por el fabricante; zZounds ya no lo ofrece, AKG USA lo marca como discontinuado, y Andertons no tiene página del producto. Era la alternativa premium multi-patrón al HyperX QuadCast S. Solo disponible en mercados secundarios.',
    img: 'https://uk.akg.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw539cc4ca/AKG_Lyra_ProductPhoto_TECWinner_1605x1605.png?sw=680&sh=680',
    stores: {
      amazon: 'https://www.amazon.com/dp/B07Y2PFM1W',
      zzounds: 'https://www.zzounds.com/item--AKGC44USB',
      andertons: 'not-found',
      musicstore: 'https://www.musicstore.com/en_US/USD/AKG-Lyra/art-REC0014609-000',
      gear4music: 'https://www.gear4music.com/Recording-and-Computers/AKG-Lyra-USB-Microphone/35V1'
    },
    oos: ['gear4music', 'andertons']
  });
}

p.sort(function(a, b) { return a.id - b.id; });
fs.writeFileSync(BASE + 'data/products.json', JSON.stringify(p, null, 2));
console.log('Products added. Total count:', p.length);
console.log('New IDs present:', p.some(function(x){return x.id===666}), p.some(function(x){return x.id===667}), p.some(function(x){return x.id===668}), p.some(function(x){return x.id===669}));
