const products = [
  // ===== MICROPHONES =====
  {
    id: 1,
    title: "Shure SM7B",
    title_es: "Shure SM7B",
    category: "microphones",
    price: 399,
    rating: 4.8,
    reviews: 18453,
    badge: "legend",
    desc: "The industry-standard dynamic microphone for broadcast, podcasting, and vocal recording. Warm, smooth sound with excellent rejection.",
    desc_es: "El micrófono dinámico estándar de la industria para transmisión, podcasting y grabación vocal. Sonido cálido y suave con excelente rechazo.",
    img: "https://media.sweetwater.com/m/products/image/6d2c512a92Rov0eryrfK2jdkFSLhFkOUiy3nNCLK.jpg?quality=82&width=1080&height=1080&fit=bounds&canvas=1080%2C1080&ha=6d2c512a928017f5",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/SM7B--shure-sm7b-cardioid-dynamic-vocal-microphone",
      thomann: "https://www.thomann.co.uk/shure_sm_7_db.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Shure-SM7B-Dynamic-Studio-Microphone/G6X",

      musikproduktiv: "https://www.musik-produktiv.de/shure-sm7b.html",
      baxmusic: "https://www.bax-shop.co.uk/dynamic-vocal-microphones/shure-sm7b-dynamic-vocal-studio-microphone"
    }
  },
  {
    id: 2,
    title: "Neumann U 87 Ai",
    title_es: "Neumann U 87 Ai",
    category: "microphones",
    price: 3599,
    rating: 4.9,
    reviews: 3456,
    badge: "premium",
    desc: "The world's most famous studio condenser microphone. Used on countless hit records. Three polar patterns, 10dB pad, and legendary Neumann sound.",
    desc_es: "El micrófono de condensador de estudio más famoso del mundo. Usado en innumerables éxitos discográficos. Tres patrones polares, pad de 10dB y legendario sonido Neumann.",
    img: "https://media.sweetwater.com/m/products/image/f759b6ae09I6HOqlkPqK2z6BNiVZitPMA6qDgFfQ.jpg?quality=82&width=1080&height=1080&fit=bounds&canvas=1080%2C1080&ha=f759b6ae09fda8c7",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/U87Ai--neumann-u-87-ai-large-diaphragm-condenser-microphone-nickel",
      thomann: "https://www.thomann.co.uk/neumann_u87_ai.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Neumann-U87-AI-Studio-Microphone-Set-Nickel/6ED",

      musikproduktiv: "https://www.musik-produktiv.de/search",
      baxmusic: "https://www.bax-shop.co.uk/large-diaphragm-condenser-microphones/neumann-u-87-ai-studio-set-large-diaphragm-condenser-microphone"
    }
  },
  {
    id: 3,
    title: "Rode NT1-A",
    title_es: "Rode NT1-A",
    category: "microphones",
    price: 269,
    rating: 4.6,
    reviews: 21345,
    badge: "bestSeller",
    desc: "The world's quietest studio condenser microphone. Pristine audio quality with a warm, smooth character. Includes shock mount and pop filter.",
    desc_es: "El micrófono de condensador de estudio más silencioso del mundo. Calidad de audio impecable con un carácter cálido y suave. Incluye soporte antigolpes y filtro antipop.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/235937.jpg",
    stores: {
      thomann: "https://www.thomann.co.uk/rode_nt1a_complete_vocal_recording.htm",
      gear4music: "https://www.gear4music.com/G4M/Rode-NT1A-Studio-Condenser-Secondhand/7XKK",

      musikproduktiv: "https://www.musik-produktiv.de/search",
      baxmusic: "https://www.bax-shop.co.uk/large-diaphragm-condenser-microphones/rode-nt1-signature-series-black-large-diaphragm-condenser-microphone"
    }
  },
  {
    id: 4,
    title: "AKG C414 XLII",
    title_es: "AKG C414 XLII",
    category: "microphones",
    price: 1099,
    rating: 4.7,
    reviews: 5678,
    badge: "topQuality",
    desc: "Versatile large-diaphragm condenser with 5 polar patterns. From vocals to piano, the C414 handles it all with breathtaking detail.",
    desc_es: "Condensador versátil de diafragma grande con 5 patrones polares. Desde voces hasta piano, el C414 lo maneja todo con un detalle impresionante.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/240602.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/C414XLII--akg-c414-xlii-large-diaphragm-condenser-microphone",
      thomann: "https://www.thomann.co.uk/akg_c414_xlii.htm",
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/AKG-C414XL-II-Condenser-Microphone/1ZV",

      musikproduktiv: "https://www.musik-produktiv.de/search",
      baxmusic: "https://www.bax-shop.co.uk/large-diaphragm-condenser-microphones/akg-c-414-xlii-studio-condenser-microphone"
    }
  },
  {
    id: 5,
    title: "Shure SM57",
    title_es: "Shure SM57",
    category: "microphones",
    price: 99,
    rating: 4.7,
    reviews: 45210,
    badge: "legend",
    desc: "The most recorded instrument microphone in history. Indestructible, affordable, and incredible on guitar cabs, snares, and horns. Every musician should own one.",
    desc_es: "El micrófono de instrumento más grabado de la historia. Indestructible, asequible e increíble en gabinetes de guitarra, cajas y trompetas. Todo músico debería tener uno.",
    img: "https://media.sweetwater.com/m/products/image/8cc557164ei09SdpOiJJ8j2UgW5tRIRPcRVVipe6.jpg?quality=82&width=1080&height=1080&fit=bounds&canvas=1080%2C1080&ha=8cc557164e165612",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/SM57--shure-sm57-cardioid-dynamic-instrument-microphone",
      thomann: "https://www.thomann.co.uk/shure_sm57_lc.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Shure-SM57-Dynamic-Instrument-Microphone/4ZV",

      musikproduktiv: "https://www.musik-produktiv.de/shure-sm57.html",
      baxmusic: "https://www.bax-shop.co.uk/dynamic-instrument-microphones/shure-sm-57-dynamic-instrument-microphone"
    }
  },
  {
    id: 50,
    title: "Shure SM58",
    title_es: "Shure SM58",
    category: "microphones",
    price: 99,
    rating: 4.8,
    reviews: 35678,
    badge: "legend",
    desc: "The world's most popular vocal microphone. Used by presidents, pop stars, and pub singers alike. Built like a tank with a tailored frequency response for vocals that cut through any mix.",
    desc_es: "El micrófono vocal más popular del mundo. Usado por presidentes, estrellas pop y cantantes de bar por igual. Construido como un tanque con respuesta de frecuencia adaptada para voces que cortan cualquier mezcla.",
    img: "img/sm58.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/SM58--shure-sm58-cardioid-dynamic-vocal-microphone",
      thomann: "https://www.thomann.co.uk/shure_sm_58_lce.htm",
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Shure-SM58-Vocal-Microphone/G5D",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      amazon: "https://www.amazon.com/dp/B000CZ0R42",
      baxmusic: "https://www.bax-shop.co.uk/dynamic-vocal-microphones/shure-sm-58-dynamic-vocal-microphone"
    }
  },
  {
    id: 51,
    title: "Sennheiser MD 421",
    title_es: "Sennheiser MD 421",
    category: "microphones",
    price: 399,
    rating: 4.7,
    reviews: 8765,
    badge: "topQuality",
    desc: "The tom-tom king and guitar cab legend. Five-position bass roll-off switch, handles SPLs up to 160dB. The industry standard dynamic for instruments since 1960.",
    desc_es: "El rey de los toms y leyenda de gabinetes de guitarra. Interruptor de corte de graves de cinco posiciones, maneja SPLs de hasta 160dB. El dinámico estándar de la industria para instrumentos desde 1960.",
    img: "img/md421.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/MD421II--sennheiser-md-421-ii-cardioid-dynamic-microphone",
      thomann: "https://www.thomann.co.uk/sennheiser_md_421_ii.htm",
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Sennheiser-MD421-II/1ZX",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      amazon: "https://www.amazon.com/dp/B0002H0RBS"
    }
  },
  {
    id: 52,
    title: "Electro-Voice RE20",
    title_es: "Electro-Voice RE20",
    category: "microphones",
    price: 449,
    rating: 4.8,
    reviews: 6543,
    badge: "legend",
    desc: "The broadcast standard. Variable-D technology eliminates proximity effect. The definitive choice for podcasting, voiceover, and kick drums.",
    desc_es: "El estándar de transmisión. La tecnología Variable-D elimina el efecto de proximidad. La elección definitiva para podcasting, locución y bombos.",
    img: "img/re20.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/RE20--electro-voice-re20-broadcast-microphone",
      thomann: "https://www.thomann.co.uk/electro_voice_re20.htm",
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Electro-Voice-RE20/2KVR",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      amazon: "https://www.amazon.com/dp/B08P7QTZM5"
    }
  },

  // ===== GUITARS =====
  {
    id: 6,
    title: "Fender American Professional II Stratocaster",
    title_es: "Fender American Professional II Stratocaster",
    category: "guitars",
    price: 1799,
    rating: 4.8,
    reviews: 7890,
    badge: "bestSeller",
    desc: "The iconic Stratocaster, refined. V-Mod II pickups, Deep C neck profile, and a sleek satin finish. From blues to pop, it's the sound of modern music.",
    desc_es: "La icónica Stratocaster, refinada. Pastillas V-Mod II, perfil de mástil Deep C y un elegante acabado satinado. Del blues al pop, es el sonido de la música moderna.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/500467.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/StratAP2MMB--fender-american-professional-ii-stratocaster-miami-blue-with-maple-fingerboard",
      thomann: "https://www.thomann.co.uk/fender_american_professional_ii_stratocaster.htm",
      gear4music: "https://www.gear4music.com/G4M/Fender-American-Professional-II-Stratocaster-2021-Mercury-Secondhand/7AQW",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      fender: "https://www.fender.com/en-GB/electric-guitars/stratocaster/american-professional-ii-stratocaster/0113940761.html"
    }
  },
  {
    id: 7,
    title: "Gibson Les Paul Standard '60s",
    title_es: "Gibson Les Paul Standard '60s",
    category: "guitars",
    price: 2699,
    rating: 4.9,
    reviews: 4567,
    badge: "premium",
    desc: "The ultimate rock machine. Burstbucker pickups, mahogany body with maple top, and that unmistakable Les Paul sustain.",
    desc_es: "La máquina de rock definitiva. Pastillas Burstbucker, cuerpo de caoba con tapa de arce y ese inconfundible sustain Les Paul.",
    img: "https://media.sweetwater.com/m/products/image/7f6aefa01649sOZjanoDlBOmYlvvPxgDS7FfbIng.jpg?quality=82&width=1080&height=1080&fit=bounds&canvas=1080%2C1080&ha=7f6aefa01626914a",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/LPS6ITNH--gibson-les-paul-standard-60s-iced-tea",
      thomann: "https://www.thomann.co.uk/gibson_les_paul_standard_60s_bb.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Gibson-Les-Paul-Standard-60s-Double-Trouble-Vintage-Tobacco-Burst-Gloss-219150043/6Y3C",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 108,
    title: "Yamaha DXR12mkII",
    title_es: "Yamaha DXR12mkII",
    category: "live_sound",
    price: 899,
    rating: 4.7,
    reviews: 5678,
    badge: "topQuality",
    desc: "Professional powered speaker with Yamaha's legendary DSP. 1100W of power, 12-inch woofer with 1.75-inch compression driver. Advanced FIR-X tuning for linear phase response. Lightweight design at just 38 lbs. Ideal for bands and DJs.",
    desc_es: "Altavoz activo profesional con el legendario DSP de Yamaha. 1100W de potencia, woofer de 12 pulgadas. Tuning FIR-X avanzado para respuesta de fase lineal. Ideal para bandas y DJs.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/540683.jpg",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/DXR12MKII--yamaha-dxr12mkii-powered-speaker", thomann: "https://www.thomann.co.uk/yamaha_dxr12_mkii.htm", gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Yamaha-DXR12mkII-Powered-Loudspeaker/6DM", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 109,
    title: "JBL PRX ONE",
    title_es: "JBL PRX ONE",
    category: "live_sound",
    price: 1499,
    rating: 4.8,
    reviews: 3456,
    badge: "premium",
    desc: "The ultimate all-in-one column array PA system. 2000W peak power with 12-inch subwoofer and 7-channel digital mixer. 130dB SPL fills medium to large venues. Bluetooth streaming, EQ presets, and professional DSP. Perfect for bands, DJs, and large events.",
    desc_es: "El sistema PA column array todo-en-uno definitivo. 2000W de potencia pico con subwoofer de 12 pulgadas y mezclador digital de 7 canales. 130dB SPL llena lugares medianos y grandes.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/540683.jpg",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/PRXONE--jbl-prx-one-active-column-speaker-system", thomann: "https://www.thomann.co.uk/jbl_prx_one.htm", gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/JBL-PRX-ONE-Column-PA-System/6DM", musikproduktiv: "https://www.musik-produktiv.de/search" }
  }
];

const categoryInfo = {
  microphones: { name: "Microphones", icon: '<i class="fa-solid fa-microphone"></i>', desc: "Capture every nuance with the best microphones for studio, broadcast, and stage." },
  guitars: { name: "Guitars & Basses", icon: '<i class="fa-solid fa-guitar"></i>', desc: "From strats to acoustics, find your perfect axe." },
  amps: { name: "Amps", icon: '<i class="fa-solid fa-volume-high"></i>', desc: "Guitar and bass amplifiers for stage and studio." },
  pedals: { name: "Pedals", icon: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="12" rx="3"/><circle cx="8" cy="13" r="1.2" fill="currentColor"/><circle cx="12" cy="13" r="1.2" fill="currentColor"/><circle cx="16" cy="13" r="1.2" fill="currentColor"/><path d="M6 7V4h12v3"/></svg>', desc: "Guitar effects pedals for every style and budget." },
  live_sound: { name: "Live Sound", icon: '<i class="fa-solid fa-bullhorn"></i>', desc: "PA systems, mixers, and live audio gear for stages." },
  strings: { name: "Strings", icon: '<i class="fa-solid fa-guitar"></i>', desc: "Guitars, basses, and everything with strings." },
  keyboards: { name: "Keyboards", icon: '<i class="fa-solid fa-keyboard"></i>', desc: "Pianos, synths, and controllers for every player." },
  interfaces: { name: "Interfaces", icon: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="5" width="22" height="14" rx="2"/><rect x="4" y="9" width="3" height="6" rx="0.8" fill="currentColor" opacity="0.6"/><circle cx="14" cy="12" r="3"/><circle cx="14" cy="12" r="1.2" fill="currentColor"/><rect x="19" y="10" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.6"/></svg>', desc: "Connect your sound with pristine audio conversion." },
  monitors: { name: "Monitors", icon: '<i class="fa-solid fa-volume-high"></i>', desc: "Hear the truth with professional studio monitoring." },
  headphones: { name: "Headphones", icon: '<i class="fa-solid fa-headphones"></i>', desc: "Critical listening and mixing on the go." },
  plugins: { name: "Plugins", icon: '<i class="fa-solid fa-sliders"></i>', desc: "Virtual instruments and effects for your DAW." },
  percussion: { name: "Percussion", icon: '<i class="fa-solid fa-drum"></i>', desc: "Drum machines, electronic percussion, and acoustic drums." },
  tres: { name: "Cuban Tres", icon: '<i class="fa-solid fa-guitar"></i>', desc: "The heartbeat of Cuban music. Authentic tres guitars for studio and stage." },
  accessories: { name: "Accessories", icon: '<i class="fa-solid fa-wrench"></i>', desc: "Cables, stands, cases, and studio treatment." }
};

const storeNames = {
  thomann: "Thomann",
  pluginboutique: "Plugin Boutique",
  gear4music: "Gear4Music",
  sweetwater: "Sweetwater",
  musikproduktiv: "Musik Produktiv",
  amazon: "Amazon",
  reverb: "Reverb",
  andertons: "Andertons",
  baxmusic: "Bax Music",
  musicstore: "Music Store",
  fender: "Fender"
};

const storeColors = {
  thomann: "#3b82f6",
  pluginboutique: "#6366f1",
  gear4music: "#8b5cf6",
  sweetwater: "#6b7280",
  musikproduktiv: "#78716c",
  amazon: "#ff9900",
  reverb: "#d6562b",
  andertons: "#000000",
  baxmusic: "#c30067",
  musicstore: "#1a3a5c",
  fender: "#000000"
};

const storeIcons = {
  thomann: '<img src="img/thomann-icon.png" alt="Thomann" class="store-icon-img">',
  pluginboutique: '<img src="img/pluginboutique-icon.png" alt="Plugin Boutique" class="store-icon-img">',
  gear4music: '<img src="img/gear4music-icon.png" alt="Gear4Music" class="store-icon-img">',
  sweetwater: '<img src="img/sweetwater-icon.png" alt="Sweetwater" class="store-icon-img">',
  musikproduktiv: '<img src="img/musikproduktiv-icon.png" alt="Musik Produktiv" class="store-icon-img" style="width:28px">',
  amazon: '<i class="fa-brands fa-amazon" style="font-size:15px;"></i>',
  reverb: "<span style='font-weight:900;font-size:14px;line-height:1;display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;background:#d6562b;color:#fff;border-radius:2px;vertical-align:middle;'>R</span>",
  andertons: "<span style='font-weight:900;font-size:14px;line-height:1;display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;background:#000;color:#fff;border-radius:2px;vertical-align:middle;'>A</span>",
  baxmusic: '<img src="img/baxmusic-icon.svg" alt="Bax Music" class="store-icon-img">',
  musicstore: '<img src="img/musicstore-icon.png" alt="Music Store" class="store-icon-img">',
  fender: '<img src="img/fender-icon.svg" alt="Fender" class="store-icon-img" style="width:32px;height:32px">'
};
