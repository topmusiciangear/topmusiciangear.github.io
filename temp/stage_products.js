var fs=require('fs');
function awin(mid, clean){ return 'https://www.awin1.com/cread.php?awinmid='+mid+'&awinaffid=2891111&ued='+encodeURIComponent(clean); }
var G=function(u){ return awin('1117', u); };
var M=function(u){ return awin('63816', u); };
var p='data/products.json';
var ps=JSON.parse(fs.readFileSync(p,'utf8'));
[637,638,639,640,641,642,643,644].forEach(function(id){
  if(ps.some(function(x){return x.id===id})){ console.log('ID TAKEN '+id); process.exit(1); }
});

ps.push({
  id: 637, title: 'Roland RD-2000 EX', title_es: 'Roland RD-2000 EX', brand: 'Roland', category: 'keyboards',
  price: 2899, badge: 'premium',
  desc: 'Roland\u2019s flagship stage piano with a PHA-50 hybrid wood-and-plastic hammer action, independent V-Piano and SuperNATURAL engines, 8 assignable zones for laptop rigs and balanced XLR outs — built for pianists who want acoustic realism at full stage volume.',
  desc_es: 'El piano de escenario insignia de Roland con acción de martillo híbrida madera-plástico PHA-50, motores independientes V-Piano y SuperNATURAL, 8 zonas asignables para rigs con portátil y salidas XLR balanceadas; para pianistas que quieren realismo acústico a volumen de directo.',
  img: 'https://static.roland.com/products/rd-2000_ex/images/rd-2000_ex_hero.jpg',
  stores: {
    zzounds: 'https://www.zzounds.com/a--925521/item--ROLRD2000EX',
    gear4music: G('https://www.gear4music.com/Keyboards-and-Pianos/Roland-RD-2000-EX-Digital-Stage-Piano/6KU9'),
    musicstore: M('https://www.musicstore.com/en_OE/EUR/Roland-RD-2000-EX/art-KEY0006021-000'),
    reverb: 'https://reverb.com/p/roland-rd-2000ex-88-key-digital-stage-piano'
  },
  excludeStores: ['amazon','andertons']
});

ps.push({
  id: 638, title: 'Yamaha YC88', title_es: 'Yamaha YC88', brand: 'Yamaha', category: 'keyboards',
  price: 3199, badge: 'premium',
  desc: 'Yamaha\u2019s organ-focused stage piano: 88 natural-wood graded hammer keys, 9 physical drawbars with LED indicators, VCM organ plus CFX concert grand, and balanced XLR outs in an 18.6 kg road-ready cabinet.',
  desc_es: 'El piano de escenario de Yamaha centrado en el órgano: 88 teclas de madera graduadas, 9 drawbars físicos con LED, órgano VCM más gran cola CFX y salidas XLR balanceadas en un mueble de 18,6 kg listo para la carretera.',
  img: 'https://shop.usa.yamaha.com/media/catalog/product/cache/6517c62f5899ad6aa0ba23ceb3eeff97/y/c/yc88_detail_w001_e4a8dd9aefaa65ff9be6d1445a40af32.jpg',
  stores: {
    zzounds: 'https://www.zzounds.com/a--925521/item--YAMYC88',
    amazon: 'https://www.amazon.com/dp/B08RNKDLMN',
    andertons: 'https://www.andertons.co.uk/yamaha-yc88-88-key-drawbar-organ-stage-keyboard',
    musicstore: M('https://www.musicstore.com/en_OE/EUR/Yamaha-YC88/art-KEY0005386-000')
  },
  excludeStores: ['gear4music']
});

ps.push({
  id: 639, title: 'Yamaha Montage M8x', title_es: 'Yamaha Montage M8x', brand: 'Yamaha', category: 'keyboards',
  price: 4699, badge: 'flagship',
  desc: 'Yamaha\u2019s flagship workstation for massive live orchestrations: 88 GEX weighted keys with polyphonic aftertouch, triple AN-X/AWM2/FM-X engine, Super Knob macro control and balanced outputs in a 28 kg stage beast.',
  desc_es: 'La workstation insignia de Yamaha para orquestaciones enormes en directo: 88 teclas GEX contrapesadas con aftertouch polifónico, triple motor AN-X/AWM2/FM-X, control macro Super Knob y salidas balanceadas en una bestia de 28 kg.',
  img: 'https://r2.gear4music.com/media/130/1302301/600/preview.jpg',
  stores: {
    zzounds: 'https://www.zzounds.com/a--925521/item--YAMMONTAGEM8X',
    amazon: 'https://www.amazon.com/dp/B0CFBC7MNY',
    gear4music: G('https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-Montage-M8X-Synthesizer/7H6C'),
    andertons: 'https://www.andertons.co.uk/yamaha-montage-m8x-synthesizer/',
    musicstore: M('https://www.musicstore.com/en_OE/EUR/Yamaha-Montage-M8x/art-SYN0008831-000'),
    reverb: 'https://reverb.com/p/yamaha-montage-m8x-88-key-synthesizer'
  }
});

ps.push({
  id: 640, title: 'Roland Fantom 8 EX', title_es: 'Roland Fantom 8 EX', brand: 'Roland', category: 'keyboards',
  price: 4629, badge: 'flagship',
  desc: 'Roland\u2019s most fluid live workstation: 88 PHA-50 hybrid keys, 7-inch touchscreen, ZEN-Core plus V-Piano and SuperNATURAL engines, 16 RGB pads with clip launching and TR-REC sequencing, and XLR mains for the house console.',
  desc_es: 'La workstation más fluida de Roland para directo: 88 teclas híbridas PHA-50, pantalla táctil de 7 pulgadas, motores ZEN-Core más V-Piano y SuperNATURAL, 16 pads RGB con lanzamiento de clips y secuenciador TR-REC, y salidas XLR para la mesa de sala.',
  img: 'https://r2.gear4music.com/media/107/1073811/600/preview.jpg',
  stores: {
    zzounds: 'https://www.zzounds.com/a--925521/item--ROLFANTOM8EX',
    gear4music: G('https://www.gear4music.com/Keyboards-and-Pianos/Roland-Fantom-8-EX-88-Key-Synthesizer-Keyboard/6DQZ'),
    andertons: 'https://www.andertons.co.uk/roland-fantom-8-ex-88-key-flagship-synthesizer/',
    musicstore: M('https://www.musicstore.com/en_OE/EUR/Roland-FANTOM-8-EX/art-SYN0008964-000'),
    reverb: 'https://reverb.com/p/roland-fantom-8-ex-88-key-workstation-keyboard'
  },
  excludeStores: ['amazon']
});

ps.push({
  id: 641, title: 'Nord Electro 7 61', title_es: 'Nord Electro 7 61', brand: 'Nord', category: 'keyboards',
  price: 3299, badge: 'premium',
  desc: 'The new-generation Nord for funk, blues and rock stages: 8.3 kg with 61 semi-weighted waterfall keys, physical LED drawbars, Organ 3 engine plus piano and a brand-new analog/FM synth section with seamless transitions.',
  desc_es: 'El Nord de nueva generación para escenarios de funk, blues y rock: 8,3 kg con 61 teclas waterfall semipesadas, drawbars físicos con LED, motor Organ 3 más piano y una sección de sinte analógico/FM nueva con transiciones sin cortes.',
  img: 'https://r2.gear4music.com/media/132/1327188/1200/preview.jpg',
  stores: {
    zzounds: 'https://www.zzounds.com/a--925521/item--NORELECTRO7D61',
    gear4music: G('https://www.gear4music.com/Keyboards-and-Pianos/Nord-Electro-7-61-Key-Semi-Weighted-Keyboard/7T19'),
    andertons: 'https://www.andertons.co.uk/nord-electro-7-61-stage-piano/',
    musicstore: M('https://www.musicstore.com/en_OE/EUR/Clavia-Nord-Electro-7-61/art-KEY0006274-000')
  },
  excludeStores: ['amazon']
});

ps.push({
  id: 642, title: 'Korg Grandstage X', title_es: 'Korg Grandstage X', brand: 'Korg', category: 'keyboards',
  price: 1999, badge: 'premium',
  desc: 'Korg\u2019s seven-engine stage buffet on a Japanese-crafted RH3 hammer action: SGX-2 pianos, EP-1, CX-3 and VOX organs, 100 favorites, 3-part splits and balanced XLR outs for a clean feed to front of house.',
  desc_es: 'El bufé de siete motores de Korg sobre acción de martillo RH3 de factura japonesa: pianos SGX-2, EP-1, órganos CX-3 y VOX, 100 favoritos, divisiones en 3 partes y salidas XLR balanceadas para señal limpia a la mesa.',
  img: 'https://r2.gear4music.com/media/103/1037030/1200/preview.jpg',
  stores: {
    zzounds: 'https://www.zzounds.com/a--925521/item--KORGRANDSTAGEX',
    amazon: 'https://www.amazon.com/dp/B0DKN7FL2J',
    gear4music: G('https://www.gear4music.com/Keyboards-and-Pianos/Korg-Grandstage-X/6707'),
    andertons: 'https://www.andertons.co.uk/Korg-Grandstage-X-Stage-Piano',
    reverb: 'https://reverb.com/p/korg-grandstage-x-88-key-digital-piano'
  },
  excludeStores: ['musicstore']
});

ps.push({
  id: 643, title: 'Arturia AstroLab 61', title_es: 'Arturia AstroLab 61', brand: 'Arturia', category: 'keyboards',
  price: 1599, badge: 'pro',
  desc: 'The bridge from laptop to stage: 61 semi-weighted keys with aftertouch playing 40+ built-in engines and 1,800+ presets from Analog Lab, with playlists, splits, USB-C and no computer required at the gig.',
  desc_es: 'El puente del portátil al escenario: 61 teclas semipesadas con aftertouch con más de 40 motores internos y más de 1.800 presets de Analog Lab, con listas, divisiones, USB-C y sin ordenador en el bolo.',
  img: 'https://r2.gear4music.com/media/105/1056629/1200/preview.jpg',
  stores: {
    zzounds: 'https://www.zzounds.com/a--925521/item--ARAASTROLAB',
    amazon: 'https://www.amazon.com/dp/B0CVBHTGVR',
    gear4music: G('https://www.gear4music.com/Keyboards-and-Pianos/Arturia-Astrolab-61-Note-Stage-Keyboard/6AMY'),
    andertons: 'https://www.andertons.co.uk/arturia-astrolab-61-key-synth',
    musicstore: M('https://www.musicstore.com/en_OE/EUR/Arturia-AstroLab-61/art-SYN0008965-000')
  }
});

ps.push({
  id: 644, title: 'Yamaha CK88', title_es: 'Yamaha CK88', brand: 'Yamaha', category: 'keyboards',
  price: 1499, badge: 'value',
  desc: 'The mid-budget gig bargain: 88 graded-hammer GHS keys, CP grand pianos plus a 9-drawbar organ section, 3-zone splits, Live Sets, built-in speakers and AA-battery power for rehearsals anywhere.',
  desc_es: 'La ganga para bolos de presupuesto medio: 88 teclas GHS graduadas, pianos de cola CP más sección de órgano de 9 drawbars, divisiones en 3 zonas, Live Sets, altavoces integrados y pilas AA para ensayar donde sea.',
  img: 'https://r2.gear4music.com/media/91/917265/1200/preview.jpg',
  stores: {
    zzounds: 'https://www.zzounds.com/a--925521/item--YAMCK88',
    amazon: 'https://www.amazon.com/dp/B0BTQ3HXRS',
    gear4music: G('https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-CK88-Stage-Keyboard/5HLE'),
    andertons: 'https://www.andertons.co.uk/yamaha-ck88-88-key-ghs-graded-hammer-standard-keyboard/',
    musicstore: M('https://www.musicstore.com/en_OE/EUR/Yamaha-CK88/art-KEY0005768-000')
  }
});

fs.writeFileSync(p,JSON.stringify(ps,null,2));
console.log('STAGE PRODUCTS OK: '+ps.length);
