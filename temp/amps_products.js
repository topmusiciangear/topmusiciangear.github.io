var fs=require('fs');
function awin(mid, clean){ return 'https://www.awin1.com/cread.php?awinmid='+mid+'&awinaffid=2891111&ued='+encodeURIComponent(clean); }
var G=function(u){ return awin('1117', u); };
var M=function(u){ return awin('63816', u); };
var p='data/products.json';
var ps=JSON.parse(fs.readFileSync(p,'utf8'));
function has(id){ return ps.some(function(x){return x.id===id}); }
if(has(634)||has(635)||has(636)){ console.log('IDS TAKEN — abort'); process.exit(1); }

ps.push({
  id: 634,
  title: 'Sennheiser e906',
  title_es: 'Sennheiser e906',
  brand: 'Sennheiser',
  category: 'microphones',
  price: 219,
  badge: 'pro',
  desc: 'A purpose-built dynamic amp mic with a flat body that hangs over the cab by its own cable — no stand needed. The 3-position presence switch (Bright, Moderate, Dark) voices the top end at the mic, and the supercardioid capsule with fast transient response delivers direct, lively amp tone.',
  desc_es: 'Un dinámico hecho para amplis con cuerpo plano que se cuelga de la pantalla con su propio cable, sin soporte. El interruptor de presencia de 3 posiciones (brillante, medio, oscuro) ajusta los agudos en el micro, y la cápsula supercardioide de respuesta rápida entrega el tono del ampli directo y vivo.',
  img: 'https://assets.sennheiser.com/assets/e_906_product_shot_cutout_front_view.png.png/Zz04Njc3ODVlZWU3YWUxMWYwYjJjYTc2OGVlOGU5N2FlYQ==?width=1920&format=webp&quality=80',
  stores: {
    zzounds: 'https://www.zzounds.com/a--925521/item--SENE906',
    amazon: 'https://www.amazon.com/dp/B000AQHJQ2',
    andertons: 'https://www.andertons.co.uk/sennheiser-e906-dynamic-instrument-mic',
    reverb: 'https://reverb.com/p/sennheiser-e906'
  },
  excludeStores: ['gear4music','musicstore']
});

ps.push({
  id: 635,
  title: 'Audix i5',
  title_es: 'Audix i5',
  brand: 'Audix',
  category: 'microphones',
  price: 105,
  badge: 'value',
  desc: 'A USA-made cardioid dynamic built for loud stages and cabs, handling over 140 dB without distortion. Clear, punchy reproduction with no EQ needed, 50 Hz – 16 kHz response and a price around $99 — the working player\u2019s SM57 alternative for heavy guitars.',
  desc_es: 'Un dinámico cardioide hecho en EE. UU. para escenarios y pantallas a todo volumen, soporta más de 140 dB sin distorsionar. Reproducción clara y contundente sin ecualizar, respuesta de 50 Hz a 16 kHz y precio alrededor de $99: la alternativa obrera al SM57 para guitarras pesadas.',
  img: 'https://r2.gear4music.com/media/6/60068/1200/preview.jpg',
  stores: {
    zzounds: 'https://www.zzounds.com/a--925521/item--AUDI5',
    amazon: 'https://www.amazon.com/dp/B0002IHNA0',
    gear4music: G('https://www.gear4music.com/Recording-and-Computers/Audix-I5-All-Purpose-Dynamic-Instrument-Microphone-VLM-Type-B/OIL'),
    andertons: 'https://www.andertons.co.uk/audix-i5-dynamic-mic',
    musicstore: M('https://www.musicstore.com/en_OE/EUR/Audix-i-5/art-PAH0006797-000'),
    reverb: 'https://reverb.com/p/audix-i5'
  }
});

ps.push({
  id: 636,
  title: 'Shure Beta 57A',
  title_es: 'Shure Beta 57A',
  brand: 'Shure',
  category: 'microphones',
  price: 159,
  badge: 'pro',
  desc: 'The hotter, tighter SM57: a neodymium element puts out about 5 dB more signal (-51 vs -56 dBV/Pa), so budget interfaces stay hiss-free. Supercardioid isolation plus tailored warmth and extended highs for cutting amp tones.',
  desc_es: 'El SM57 más caliente y cerrado: el imán de neodimio entrega unos 5 dB más de señal (-51 frente a -56 dBV/Pa) para que las interfaces económicas no siseen. Aislamiento supercardioide más calidez ajustada y agudos extendidos para un tono de ampli que corta en la mezcla.',
  img: 'https://products.shureweb.eu/shure_product_db/product_main_images/files/bc7/a0c/cd-/original/baa9c25871ffdc44febe7232d20091c7.png1',
  stores: {
    zzounds: 'https://www.zzounds.com/a--925521/item--SHUBETA57A',
    amazon: 'https://www.amazon.com/dp/B0002BACAK',
    gear4music: G('https://www.gear4music.com/PA-DJ-and-Lighting/Shure-Beta-57A-Dynamic-Microphone/1UV'),
    andertons: 'https://www.andertons.co.uk/shure-beta-57a-dynamic-instrument-microphone',
    musicstore: M('https://www.musicstore.com/en_OE/EUR/Shure-Beta-57-A-dynamic-Microphone/art-PAH0000168-000'),
    reverb: 'https://reverb.com/p/shure-beta-57a'
  }
});

var m201=ps.find(function(x){return x.id===211});
m201.title='Beyerdynamic M 201 TG';
m201.title_es='Beyerdynamic M 201 TG';

fs.writeFileSync(p,JSON.stringify(ps,null,2));
console.log('PRODUCTS OK: '+ps.length+' total; 211 -> '+m201.title);
