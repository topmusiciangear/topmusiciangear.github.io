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
    desc_es: "El micrÃ³fono dinÃ¡mico estÃ¡ndar de la industria para transmisiÃ³n, podcasting y grabaciÃ³n vocal. Sonido cÃ¡lido y suave con excelente rechazo.",
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
    desc_es: "El micrÃ³fono de condensador de estudio mÃ¡s famoso del mundo. Usado en innumerables Ã©xitos discogrÃ¡ficos. Tres patrones polares, pad de 10dB y legendario sonido Neumann.",
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
    desc_es: "El micrÃ³fono de condensador de estudio mÃ¡s silencioso del mundo. Calidad de audio impecable con un carÃ¡cter cÃ¡lido y suave. Incluye soporte antigolpes y filtro antipop.",
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
    desc_es: "Condensador versÃ¡til de diafragma grande con 5 patrones polares. Desde voces hasta piano, el C414 lo maneja todo con un detalle impresionante.",
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
    desc_es: "El micrÃ³fono de instrumento mÃ¡s grabado de la historia. Indestructible, asequible e increÃ­ble en gabinetes de guitarra, cajas y trompetas. Todo mÃºsico deberÃ­a tener uno.",
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
    desc_es: "El micrÃ³fono vocal mÃ¡s popular del mundo. Usado por presidentes, estrellas pop y cantantes de bar por igual. Construido como un tanque con respuesta de frecuencia adaptada para voces que cortan cualquier mezcla.",
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
    desc_es: "El rey de los toms y leyenda de gabinetes de guitarra. Interruptor de corte de graves de cinco posiciones, maneja SPLs de hasta 160dB. El dinÃ¡mico estÃ¡ndar de la industria para instrumentos desde 1960.",
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
    desc_es: "El estÃ¡ndar de transmisiÃ³n. La tecnologÃ­a Variable-D elimina el efecto de proximidad. La elecciÃ³n definitiva para podcasting, locuciÃ³n y bombos.",
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
    desc_es: "La icÃ³nica Stratocaster, refinada. Pastillas V-Mod II, perfil de mÃ¡stil Deep C y un elegante acabado satinado. Del blues al pop, es el sonido de la mÃºsica moderna.",
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
    desc_es: "La mÃ¡quina de rock definitiva. Pastillas Burstbucker, cuerpo de caoba con tapa de arce y ese inconfundible sustain Les Paul.",
    img: "https://media.sweetwater.com/m/products/image/7f6aefa01649sOZjanoDlBOmYlvvPxgDS7FfbIng.jpg?quality=82&width=1080&height=1080&fit=bounds&canvas=1080%2C1080&ha=7f6aefa01626914a",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/LPS6ITNH--gibson-les-paul-standard-60s-iced-tea",
      thomann: "https://www.thomann.co.uk/gibson_les_paul_standard_60s_bb.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Gibson-Les-Paul-Standard-60s-Double-Trouble-Vintage-Tobacco-Burst-Gloss-219150043/6Y3C",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 8,
    title: "Taylor 314ce",
    title_es: "Taylor 314ce",
    category: "guitars",
    price: 1899,
    rating: 4.7,
    reviews: 3456,
    badge: "topQuality",
    desc: "A masterpiece of acoustic craftsmanship. Solid Sitka spruce top, Tasmanian blackwood back and sides, and Taylor's legendary playability.",
    desc_es: "Una obra maestra de artesanÃ­a acÃºstica. Tapa de abeto Sitka macizo, fondo y aros de palo negro de Tasmania, y la legendaria tocabilidad de Taylor.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/443306.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/314ceVClNMB--taylor-314ce-v-class-grand-auditorium-acoustic-electric-guitar-natural",
      thomann: "https://www.thomann.co.uk/taylor_314ce_next_generation.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Taylor-314ce-Natural/2KX6",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 9,
    title: "Ibanez RG550 Genesis",
    title_es: "Ibanez RG550 Genesis",
    category: "guitars",
    price: 999,
    rating: 4.6,
    reviews: 6789,
    badge: "recommended",
    desc: "The original shred machine. Super Wizard neck, Edge tremolo, and DiMarzio pickups. Made for speed and precision.",
    desc_es: "La mÃ¡quina de shred original. MÃ¡stil Super Wizard, trÃ©molo Edge y pastillas DiMarzio. Hecha para velocidad y precisiÃ³n.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/429087.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/RG550EB--ibanez-genesis-collection-rg550-electric-guitar-electric-blue",
      thomann: "https://www.thomann.co.uk/ibanez_rg550_pn.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Ibanez-RG550-Genesis-Purple-Neon/28PZ",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 10,
    title: "PRS McCarty 594",
    title_es: "PRS McCarty 594",
    category: "guitars",
    price: 4299,
    rating: 4.9,
    reviews: 2345,
    badge: "premium",
    desc: "Paul Reed Smith's tribute to the golden era of electric guitars. 58/15 LT pickups, pattern vintage neck, and impeccable build quality.",
    desc_es: "El tributo de Paul Reed Smith a la era dorada de las guitarras elÃ©ctricas. Pastillas 58/15 LT, mÃ¡stil pattern vintage y calidad de construcciÃ³n impecable.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/581957.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/MC59410BGWBst--prs-mccarty-594-10-top-electric-guitar-black-gold-wraparound-burst",
      thomann: "https://www.thomann.co.uk/prs_mccarty_sc594_yellow_tiger_602869.htm",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },

  // ===== KEYBOARDS =====
  {
    id: 11,
    title: "Nord Stage 4 88",
    title_es: "Nord Stage 4 88",
    category: "keyboards",
    price: 4999,
    rating: 4.9,
    reviews: 1890,
    badge: "premium",
    desc: "The ultimate stage piano. Triple Sensor keybed, seamless transitions, and Nord's legendary piano, organ, and synth engines in one instrument.",
    desc_es: "El piano de escenario definitivo. Teclado Triple Sensor, transiciones perfectas y los legendarios motores de piano, Ã³rgano y sintetizador de Nord en un solo instrumento.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/560977.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/Stage4-88--nord-stage-4-88-stage-keyboard",
      thomann: "https://www.thomann.co.uk/clavia_nord_stage_4_88.htm",
      gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Nord-Stage-4-88-88-Key-Digital-Stage-Piano/5ET3",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 12,
    title: "Yamaha Montage M8x",
    title_es: "Yamaha Montage M8x",
    category: "keyboards",
    price: 4699,
    rating: 4.8,
    reviews: 1567,
    badge: "premium",
    desc: "Flagship synthesizer with AN-X and FM-X engines. 88-key weighted action, motion control, and seamless DAW integration.",
    desc_es: "Sintetizador insignia con motores AN-X y FM-X. 88 teclas de acciÃ³n con peso, control de movimiento e integraciÃ³n perfecta con DAW.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/629663.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/MontageM8X--yamaha-montage-m8x-88-key-synthesizer",
      gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-Montage-M8X-Synthesizer/7H6C",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 13,
    title: "Arturia KeyLab Essential 61 MkIII",
    title_es: "Arturia KeyLab Essential 61 MkIII",
    category: "keyboards",
    price: 299,
    rating: 4.5,
    reviews: 12345,
    badge: "bestSeller",
    desc: "The ultimate DAW controller. Deep integration with Analog Lab, Ableton Live, and Logic. 61 velocity-sensitive keys with polyphonic aftertouch.",
    desc_es: "El controlador DAW definitivo. IntegraciÃ³n profunda con Analog Lab, Ableton Live y Logic. 61 teclas sensibles a la velocidad con aftertouch polifÃ³nico.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/567153.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/KeyLabEss3-61--arturia-keylab-essential-mk3-61-key-keyboard-controller-white",
      thomann: "https://www.thomann.co.uk/arturia_keylab_essential_61_mk3_white.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Arturia-KeyLab-Essential-61-MK3-Aqumarine/7SGI",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 14,
    title: "Native Instruments Komplete Kontrol S61",
    title_es: "Native Instruments Komplete Kontrol S61",
    category: "keyboards",
    price: 599,
    rating: 4.6,
    reviews: 6789,
    badge: "recommended",
    desc: "Smart keyboard controller with NI ecosystem integration. Light guide, NKS browsing, and premium Fatar keybed.",
    desc_es: "Controlador de teclado inteligente con integraciÃ³n al ecosistema NI. GuÃ­a de luz, navegaciÃ³n NKS y teclado Fatar premium.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/570926.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/KontS3-61--native-instruments-kontrol-s61-mk3-61-key-smart-keyboard-controller",
      thomann: "https://www.thomann.co.uk/native_instruments_kontrol_s61_mk3_komplete_15.htm",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },

  // ===== INTERFACES =====
  {
    id: 15,
    title: "Focusrite Scarlett 2i2 4th Gen",
    title_es: "Focusrite Scarlett 2i2 4Âª Gen",
    category: "interfaces",
    price: 199,
    rating: 4.7,
    reviews: 34567,
    badge: "bestSeller",
    desc: "The world's best-selling audio interface just got better. 120dB dynamic range, Air mode, and Loopback for streaming. Studio-grade conversion.",
    desc_es: "La interfaz de audio mÃ¡s vendida del mundo acaba de mejorar. 120dB de rango dinÃ¡mico, modo Air y Loopback para streaming. ConversiÃ³n de grado estudio.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/566684.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/Scar2i2G4--focusrite-scarlett-2i2-4th-gen-usb-audio-interface",
      thomann: "https://www.thomann.co.uk/focusrite_scarlett_2i2_studio_4th_gen.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Focusrite-Scarlett-2i2-4th-Gen-Audio-Interface/5O8G",

      musikproduktiv: "https://www.musik-produktiv.de/focusrite-scarlett-2i2-4th-gen.html",
      baxmusic: "https://www.bax-shop.co.uk/external-audio-interfaces/focusrite-scarlett-2i2-4th-gen-audio-interface"
    }
  },
  {
    id: 16,
    title: "Universal Audio Apollo Twin X",
    title_es: "Universal Audio Apollo Twin X",
    category: "interfaces",
    price: 899,
    rating: 4.8,
    reviews: 5678,
    badge: "premium",
    desc: "Professional-grade Thunderbolt interface with UAD DSP processing. Real-time UAD plugins with near-zero latency. Unison preamps.",
    desc_es: "Interfaz Thunderbolt de grado profesional con procesamiento UAD DSP. Plugins UAD en tiempo real con latencia casi nula. Preamplificadores Unison.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/571436.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/ApolloTXDHE--universal-audio-apollo-twin-by-duo-heritage-edition-10x6-thunderbolt-audio-interface-with-uad-dsp",
      thomann: "https://www.thomann.co.uk/universal_audio_apollo_twin_x_usb_heritage.htm",

      musikproduktiv: "https://www.musik-produktiv.de/search",
      baxmusic: "https://www.bax-shop.co.uk/external-audio-interfaces/universal-audio-apollo-twin-x-quad-gen-2-studio-edition-audio-interface"
    }
  },
  {
    id: 17,
    title: "RME Babyface Pro FS",
    title_es: "RME Babyface Pro FS",
    category: "interfaces",
    price: 949,
    rating: 4.9,
    reviews: 3456,
    badge: "topQuality",
    desc: "The gold standard for portable recording. Legendary RME drivers, SteadyClock FS jitter suppression, and pristine AD/DA conversion.",
    desc_es: "El estÃ¡ndar de oro para grabaciÃ³n portÃ¡til. Legendarios drivers RME, supresiÃ³n de jitter SteadyClock FS y conversiÃ³n AD/DA impecable.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/476426.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/BabyfaceProFS--rme-babyface-pro-fs-24-channel-usb-audio-interface",
      thomann: "https://www.thomann.co.uk/rme_babyface_pro_fs.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/RME-Babyface-Pro-FS/37CM",

      musikproduktiv: "https://www.musik-produktiv.de/search",
      andertons: "https://www.andertons.co.uk/rme-babyface-pro-fs-24-channel-192-khz-bus-powered-pro-usb-20-audio-interface/",
      baxmusic: "https://www.bax-shop.co.uk/external-audio-interface/rme-babyface-pro-fs-audio-interface"
    }
  },
  {
    id: 18,
    title: "SSL 2+",
    title_es: "SSL 2+",
    category: "interfaces",
    price: 299,
    rating: 4.7,
    reviews: 8901,
    badge: "recommended",
    desc: "Solid State Logic in an interface. Legendary SSL 4K preamps, Legacy 4K analogue channel strip, and professional monitoring features.",
    desc_es: "Solid State Logic en una interfaz. Legendarios preamplificadores SSL 4K, channel strip analÃ³gico Legacy 4K y funciones profesionales de monitoreo.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/601306.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/SSL2Plus--solid-state-logic-ssl2-usb-audio-interface",
      thomann: "https://www.thomann.co.uk/ssl_2_mkii_601306.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/SSL-2and-MKII-2-Channel-USB-Audio-Interface/6OZA",

      musikproduktiv: "https://www.musik-produktiv.de/search",
      baxmusic: "https://www.bax-shop.co.uk/external-audio-interfaces/solid-state-logic-ssl-2-mkii-audio-interface"
    }
  },
  {
    id: 53,
    title: "Audient iD14 MkII",
    title_es: "Audient iD14 MkII",
    category: "interfaces",
    price: 299,
    rating: 4.7,
    reviews: 3456,
    badge: "topQuality",
    desc: "Console-grade preamps in a compact interface. The same Class-A mic pres found in Audient's $50,000 ASP8024 console. Dual headphone outputs and JFET DI input for instruments.",
    desc_es: "Preamplificadores de grado consola en una interfaz compacta. Los mismos previos de micrÃ³fono Clase A que se encuentran en la consola ASP8024 de $50,000 de Audient. Salidas de auriculares duales y entrada DI JFET para instrumentos.",
    img: "img/audient-id14.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/iD14mkII--audient-id14-mkii-usb-audio-interface",
      thomann: "https://www.thomann.co.uk/audient_id14_mkii.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Audient-iD14-MKII-USB-Audio-Interface/3L4B",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      baxmusic: "https://www.bax-shop.co.uk/external-audio-interface/audient-id14-mkii-usb-c-audio-interface"
    }
  },
  {
    id: 54,
    title: "MOTU M2",
    title_es: "MOTU M2",
    category: "interfaces",
    price: 199,
    rating: 4.6,
    reviews: 4567,
    badge: "recommended",
    desc: "The best value in its class. Full-color LCD metering, ESS Sabre32 Ultra DAC, and loopback for streaming. The only interface under $200 with real-time level monitoring.",
    desc_es: "El mejor valor en su clase. MediciÃ³n LCD a todo color, DAC ESS Sabre32 Ultra y loopback para streaming. La Ãºnica interfaz por menos de $200 con monitoreo de nivel en tiempo real.",
    img: "img/motu-m2.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/M2--motu-m2-2x2-usb-c-audio-interface",
      thomann: "https://www.thomann.co.uk/motu_m2.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/MOTU-M2-2x2-USB-C-Audio-Interface/3GRT",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      baxmusic: "https://www.bax-shop.co.uk/external-audio-interface/motu-m2-audio-interface"
    }
  },
  {
    id: 55,
    title: "Universal Audio Volt 2",
    title_es: "Universal Audio Volt 2",
    category: "interfaces",
    price: 189,
    rating: 4.5,
    reviews: 2345,
    badge: "bestSeller",
    desc: "UA quality at an entry-level price. Vintage Mic Preamp mode emulates the classic UA 610 tube preamp. MIDI I/O and solid build quality with a retro design that stands out.",
    desc_es: "Calidad UA a precio de entrada. El modo Vintage Mic Preamp emula el clÃ¡sico previo de tubo UA 610. MIDI I/O y construcciÃ³n sÃ³lida con diseÃ±o retro que destaca.",
    img: "img/ua-volt2.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/Volt2--universal-audio-volt-2-usb-audio-interface",
      thomann: "https://www.thomann.co.uk/universal_audio_volt_2.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Universal-Audio-Volt-2-USB-Audio-Interface/5N5B",
      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },

  // ===== MONITORS =====
  {
    id: 19,
    title: "Yamaha HS8",
    title_es: "Yamaha HS8",
    category: "monitors",
    price: 698,
    rating: 4.7,
    reviews: 12345,
    badge: "bestSeller",
    desc: "The industry standard for mixing. 8-inch cone woofer with Kevlar coating, 1-inch dome tweeter, and room control for accurate monitoring.",
    desc_es: "El estÃ¡ndar de la industria para mezcla. Woofer de cono de 8 pulgadas con revestimiento de Kevlar, tweeter de domo de 1 pulgada y control de sala para monitoreo preciso.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/315822.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/HS8pr--yamaha-hs8-8-inch-powered-studio-monitor-pair-black",
      thomann: "https://www.thomann.co.uk/yamaha_hs_8_bundle.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Yamaha-HS8-Active-Studio-Monitor-Pair/6V1J",

      musikproduktiv: "https://www.musik-produktiv.de/yamaha-hs-8.html",
      baxmusic: "https://www.bax-shop.co.uk/studio-monitor/yamaha-hs8-mp-matched-pair-active-studio-monitors-set-of-2-black"
    }
  },
  {
    id: 20,
    title: "KRK Rokit 7 G4",
    title_es: "KRK Rokit 7 G4",
    category: "monitors",
    price: 498,
    rating: 4.5,
    reviews: 18907,
    badge: "recommended",
    desc: "Professional bi-amped studio monitors with Kevlar drivers, DSP-driven EQ, and a front-firing bass port ideal for smaller studios.",
    desc_es: "Monitores de estudio bi-amplificados profesionales con drivers de Kevlar, ecualizador DSP y puerto de graves frontal ideal para estudios pequeÃ±os.",
    img: "img/krk-rokit7.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/Rokit7G5Pr--krk-rokit-7-g5-7-inch-powered-studio-monitor-pair-black",
      thomann: "https://www.thomann.co.uk/krk_rokit_rp7_g5_stand_bundle.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/KRK-ROKIT-RP7-G5-Studio-Monitor-Pair/68YW",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 21,
    title: "Adam Audio A7V",
    title_es: "Adam Audio A7V",
    category: "monitors",
    price: 799,
    rating: 4.8,
    reviews: 4567,
    badge: "premium",
    desc: "Cutting-edge 2-way monitor with S-ART folded ribbon tweeter. Unmatched transient response, deep bass, and 3D imaging.",
    desc_es: "Monitor de 2 vÃ­as de vanguardia con tweeter de cinta plegada S-ART. Respuesta transitoria inigualable, graves profundos e imagen 3D.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/540683.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/A7V--adam-audio-a7v-7-inch-powered-studio-monitor",
      thomann: "https://www.thomann.co.uk/adam_a7v.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/ADAM-Audio-A7V-Active-Studio-Monitor-Single/4QAJ",

      musikproduktiv: "https://www.musik-produktiv.de/search",
      baxmusic: "https://www.bax-shop.co.uk/studio-monitor/adam-a7v-active-studio-monitor-single-unit"
    }
  },
  {
    id: 22,
    title: "Genelec 8040B",
    title_es: "Genelec 8040B",
    category: "monitors",
    price: 1198,
    rating: 4.9,
    reviews: 2345,
    badge: "premium",
    desc: "Finnish precision at its finest. 6.5-inch woofer, metal dome tweeter, and Genelec's renowned Directivity Control waveguide.",
    desc_es: "PrecisiÃ³n finlandesa en su mÃ¡xima expresiÃ³n. Woofer de 6.5 pulgadas, tweeter de domo metÃ¡lico y la reconocida guÃ­a de onda Directivity Control de Genelec.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/311111.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/8040BPM--genelec-8040b-6.5-inch-powered-studio-monitor",
      thomann: "https://www.thomann.co.uk/genelec_8040_bpm.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Genelec-8040B-Bi-Amped-Studio-Monitor-Dark-Grey-Single/V2L",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },

  // ===== HEADPHONES =====
  {
    id: 23,
    title: "Beyerdynamic DT 770 Pro",
    title_es: "Beyerdynamic DT 770 Pro",
    category: "headphones",
    price: 159,
    rating: 4.7,
    reviews: 32109,
    badge: "legend",
    desc: "The studio standard for closed-back monitoring. 250 Ohm drivers, velour ear pads, and exceptional comfort for marathon sessions.",
    desc_es: "El estÃ¡ndar de estudio para monitoreo cerrado. Drivers de 250 Ohm, almohadillas de velour y comodidad excepcional para sesiones maratonianas.",
    img: "img/dt770pro.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/DT770pro80--beyerdynamic-dt-770-pro-80-ohm-closed-back-studio-mixing-headphones",
      thomann: "https://www.thomann.co.uk/beyerdynamic_dt770pro.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/beyerdynamic-DT-770-Pro-Headphones-250-Ohm/8GU",

      musikproduktiv: "https://www.musik-produktiv.de/beyerdynamic-dt-770-pro-250-ohm.html",
      baxmusic: "https://www.bax-shop.co.uk/studio-headphones/beyerdynamic-dt770-pro-80-ohm"
    }
  },
  {
    id: 24,
    title: "Sennheiser HD 600",
    title_es: "Sennheiser HD 600",
    category: "headphones",
    price: 399,
    rating: 4.8,
    reviews: 18907,
    badge: "legend",
    desc: "Audiophile open-back reference headphones. Natural, neutral sound with incredible detail. The mixing engineer's choice for critical listening.",
    desc_es: "Auriculares de referencia abiertos audiÃ³filos. Sonido natural y neutro con detalle increÃ­ble. La elecciÃ³n del ingeniero de mezcla para escucha crÃ­tica.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/471751.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/HD600--sennheiser-hd-600-open-back-audiophile-professional-headphones",
      thomann: "https://www.thomann.co.uk/sennheiser_hd_600_new_version_2019.htm",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 25,
    title: "Audio-Technica ATH-M50x",
    title_es: "Audio-Technica ATH-M50x",
    category: "headphones",
    price: 169,
    rating: 4.6,
    reviews: 45678,
    badge: "bestSeller",
    desc: "The most popular studio headphones in the world. Critically acclaimed clarity, deep bass, and collapsible design for portability.",
    desc_es: "Los auriculares de estudio mÃ¡s populares del mundo. Claridad aclamada por la crÃ­tica, graves profundos y diseÃ±o plegable para portabilidad.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/331905.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/ATHM50x--audio-technica-ath-m50x-closed-back-studio-monitoring-headphones",
      thomann: "https://www.thomann.co.uk/audio_technica_ath_m50_x.htm",
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Audio-Technica-ATH-M50x-Headphones-Black/X9G",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 26,
    title: "Sony MDR-7506",
    title_es: "Sony MDR-7506",
    category: "headphones",
    price: 99,
    rating: 4.5,
    reviews: 56789,
    badge: "legend",
    desc: "The broadcast standard since 1991. Closed-back, collapsible, and incredibly reliable. Trusted by professionals worldwide.",
    desc_es: "El estÃ¡ndar de transmisiÃ³n desde 1991. Cerrados, plegables e increÃ­blemente confiables. Usados por profesionales en todo el mundo.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/135709.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/MDR7506--sony-mdr-7506-closed-back-professional-headphones",
      thomann: "https://www.thomann.co.uk/sony_mdr7506_kopfhoerer.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Sony-MDR-7506-1-Professional-Stereo-Headphones/26Z8",

      musikproduktiv: "https://www.musik-produktiv.de/sony-mdr-7506.html",
      baxmusic: "https://www.bax-shop.co.uk/studio-headphones/sony-mdr-7506-headphones"
    }
  },
  {
    id: 56,
    title: "Beyerdynamic DT 990 Pro",
    title_es: "Beyerdynamic DT 990 Pro",
    category: "headphones",
    price: 169,
    rating: 4.7,
    reviews: 28901,
    badge: "legend",
    desc: "Open-back mixing headphones with legendary bass extension. The spacious soundstage reveals reverb tails and stereo placement with surgical precision. The DT 770's open-back sibling.",
    desc_es: "Auriculares de mezcla abiertos con legendaria extensiÃ³n de graves. El escenario sonoro espacioso revela colas de reverb y colocaciÃ³n estÃ©reo con precisiÃ³n quirÃºrgica. El hermano abierto del DT 770.",
    img: "img/dt990pro.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/DT990Pro--beyerdynamic-dt-990-pro-250-ohm-open-back-studio-headphones",
      thomann: "https://www.thomann.co.uk/beyerdynamic_dt990pro.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/beyerdynamic-DT-990-Pro-Headphones-250-Ohm/8GW",
      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 57,
    title: "AKG K371",
    title_es: "AKG K371",
    category: "headphones",
    price: 155,
    rating: 4.5,
    reviews: 12340,
    badge: "recommended",
    desc: "Harman-target tuned for the most natural closed-back sound under $200. Foldable design, detachable cables, and the flattest frequency response in its class.",
    desc_es: "Sintonizado al objetivo Harman para el sonido cerrado mÃ¡s natural por menos de $200. DiseÃ±o plegable, cables desmontables y la respuesta de frecuencia mÃ¡s plana en su clase.",
    img: "img/akg-k371.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/K371--akg-k371-closed-back-professional-studio-headphones",
      thomann: "https://www.thomann.co.uk/akg_k371.htm",
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/AKG-K371-Closed-Back-Studio-Headphones/4Q7C",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      baxmusic: "https://www.bax-shop.co.uk/studio-headphones/akg-k371-closed-folding-studio-headphones"
    }
  },

  // ===== PLUGINS =====
  {
    id: 28,
    title: "Native Instruments Kontakt 8",
    title_es: "Native Instruments Kontakt 8",
    category: "plugins",
    price: 399,
    rating: 4.8,
    reviews: 18907,
    badge: "premium",
    desc: "The world's leading sampler platform. Kontakt 8 with new browser, wavetable module, MIDI tools, and 900+ instruments. The industry standard for sampled instruments.",
    desc_es: "La plataforma de sampler lÃ­der mundial. Kontakt 8 con nuevo navegador, mÃ³dulo wavetable, herramientas MIDI y mÃ¡s de 900 instrumentos. El estÃ¡ndar de la industria para instrumentos sampleados.",
    img: "img/kontakt8.jpg",
    stores: {
      pluginboutique: "https://www.pluginboutique.com/product/1-Instruments/55-Kontakt-Instrument/13633-Kontakt-8?a_aid=6a01e859cbe1a",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Native-Instruments-Kontakt-8/6NPI",

      musikproduktiv: "https://www.musik-produktiv.de/search",
      baxmusic: "https://www.bax-shop.co.uk/instrument-plugins/native-instruments-kontakt-8-download"
    }
  },
  {
    id: 29,
    title: "FabFilter Total Bundle",
    title_es: "FabFilter Total Bundle",
    category: "plugins",
    price: 1069,
    rating: 4.9,
    reviews: 12345,
    badge: "premium",
    desc: "The ultimate mixing and mastering toolkit. Pro-Q 4, Pro-C 3, Pro-L 2, Pro-R 2, Saturn 2, Timeless 3, Volcano 3, Twin 3, and more.",
    desc_es: "El kit definitivo de mezcla y masterizaciÃ³n. Pro-Q 4, Pro-C 3, Pro-L 2, Pro-R 2, Saturn 2, Timeless 3, Volcano 3, Twin 3 y mÃ¡s.",
    img: "img/fabfilter-total.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/FFTotalBun--fabfilter-total-plug-in-bundle",
      pluginboutique: "https://www.pluginboutique.com/product/1-Instruments/57-Complete-Collection/16649-FabFilter-Total-Bundle?a_aid=6a01e859cbe1a",
      thomann: "https://www.thomann.co.uk/fabfilter_total_bundle.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/FabFilter-Total-Bundle/3NUP",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 30,
    title: "iZotope Ozone 12 Advanced",
    title_es: "iZotope Ozone 12 Advanced",
    category: "plugins",
    price: 499,
    rating: 4.7,
    reviews: 8901,
    badge: "topQuality",
    desc: "Next-gen AI-powered mastering suite. 20 pro modules including Stem EQ, Clarity, Stabilizer, and improved stem splitting with neural networks.",
    desc_es: "Suite de masterizaciÃ³n de nueva generaciÃ³n impulsada por IA. 20 mÃ³dulos profesionales incluyendo Stem EQ, Clarity, Stabilizer y separaciÃ³n de stems mejorada con redes neuronales.",
    img: "img/ozone12.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/Ozone12Ad--izotope-ozone-12-advanced-mastering-software-suite",
      pluginboutique: "https://www.pluginboutique.com/product/2-Effects/52-Mastering-Suite/15503-Ozone-12-Advanced?a_aid=6a01e859cbe1a",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/iZotope-Ozone-12-Advanced/7IC5",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 32,
    title: "Soundtoys 5.5 Bundle",
    title_es: "Soundtoys 5.5 Bundle",
    category: "plugins",
    price: 599,
    rating: 4.8,
    reviews: 6789,
    badge: "topQuality",
    desc: "23 iconic effects including Decapitator, EchoBoy, Little AlterBoy, SuperPlate, SpaceBlender, and Effect Rack. The creative producer's toolbox.",
    desc_es: "23 efectos icÃ³nicos incluyendo Decapitator, EchoBoy, Little AlterBoy, SuperPlate, SpaceBlender y Effect Rack. La caja de herramientas del productor creativo.",
    img: "img/soundtoys5.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/Soundtoys5--soundtoys-5-plug-in-bundle-download",
      pluginboutique: "https://www.pluginboutique.com/product/81-Bundles/89-Complete-Collection/15254-Soundtoys-5-5?a_aid=6a01e859cbe1a",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Soundtoys-55/7F1S",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },

  // ===== PERCUSSION =====
  {
    id: 33,
    title: "Roland TR-8S",
    title_es: "Roland TR-8S",
    category: "percussion",
    price: 749,
    rating: 4.7,
    reviews: 4567,
    badge: "topQuality",
    desc: "The ultimate rhythm machine. Authentic 808, 909, and 707 sounds combined with sample import and advanced sequencing.",
    desc_es: "La mÃ¡quina de ritmo definitiva. Sonidos autÃ©nticos de 808, 909 y 707 combinados con importaciÃ³n de samples y secuenciaciÃ³n avanzada.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/434284.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/TR8S--roland-tr-8s-rhythm-performer",
      thomann: "https://www.thomann.co.uk/roland_tr_8s.htm",
      gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Roland-TR-8S-Rhythm-Performer/2D82",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 34,
    title: "Akai MPC One+",
    title_es: "Akai MPC One+",
    category: "percussion",
    price: 499,
    rating: 4.6,
    reviews: 5678,
    badge: "bestSeller",
    desc: "Beat-making powerhouse with Wi-Fi and Bluetooth. 7-inch touchscreen, 16 velocity-sensitive pads, and the legendary MPC workflow.",
    desc_es: "Potencia de creaciÃ³n de beats con Wi-Fi y Bluetooth. Pantalla tÃ¡ctil de 7 pulgadas, 16 pads sensibles a la velocidad y el legendario flujo de trabajo MPC.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/567619.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/MPCOnePlus--akai-professional-mpc-one-plus-standalone-sampler-and-sequencer",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Akai-Professional-MPC-One-Plus-Standalone-Music-Production-Centre/5MUP",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 35,
    title: "Zildjian K Custom Dark Pack",
    title_es: "Zildjian K Custom Dark Pack",
    category: "percussion",
    price: 1499,
    rating: 4.8,
    reviews: 2345,
    badge: "premium",
    desc: "Hand-hammered Turkish cymbals with warm, complex tones. Includes 14-inch hi-hats, 16-inch + 18-inch crashes, and 20-inch ride.",
    desc_es: "Platillos turcos martillados a mano con tonos cÃ¡lidos y complejos. Incluye hi-hats de 14 pulgadas, crashes de 16 + 18 pulgadas y ride de 20 pulgadas.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/374175.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/KCD900--zildjian-k-custom-dark-4-piece-cymbal-pack",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 36,
    title: "Tama Starclassic Walnut/Birch",
    title_es: "Tama Starclassic Nogal/Abedul",
    category: "percussion",
    price: 2499,
    rating: 4.9,
    reviews: 1234,
    badge: "premium",
    desc: "Professional-grade drum kit with walnut/birch shells. Incredible depth, attack, and resonance. Perfect for studio and stage.",
    desc_es: "BaterÃ­a de grado profesional con cascos de nogal/abedul. Profundidad, ataque y resonancia increÃ­bles. Perfecta para estudio y escenario.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/361976.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/WBS42SMBR--tama-starclassic-walnut-birch-lacquer-4-piece-shell-pack-molten-brown-burst",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },

  // ===== ACCESSORIES =====
  {
    id: 38,
    title: "Mogami Gold Studio XLR Cable (3m)",
    title_es: "Cable XLR Mogami Gold Studio (3m)",
    category: "accessories",
    price: 39,
    rating: 4.7,
    reviews: 8901,
    badge: "topQuality",
    desc: "The industry standard for studio cabling. Neglex OFC conductors, REAN connectors, and legendary Mogami reliability.",
    desc_es: "El estÃ¡ndar de la industria para cableado de estudio. Conductores Neglex OFC, conectores REAN y la legendaria fiabilidad Mogami.",
    img: "img/mogami-xlr.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/GoldStu10--mogami-gold-studio-microphone-cable-10-foot-xlr-xlr",
      gear4music: "https://www.gear4music.com/G4M/Studiospares-Pro-Neutrik-XLR-Mogami-Cable-5m-Black-with-Gold-Plated-Pins/6URJ",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 39,
    title: "Stedman Proscreen XL Pop Filter",
    title_es: "Filtro Antipop Stedman Proscreen XL",
    category: "accessories",
    price: 49,
    rating: 4.5,
    reviews: 5678,
    badge: null,
    desc: "Professional metal mesh pop filter. Dual-layer screen eliminates plosives without high-frequency loss. Adjustable goose-neck stand.",
    desc_es: "Filtro antipop profesional de malla metÃ¡lica. Pantalla de doble capa elimina oclusivas sin pÃ©rdida de altas frecuencias. Soporte de cuello de ganso ajustable.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/561297.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/StedmanXL--stedman-corporation-proscreen-xl-black",
      thomann: "https://www.thomann.co.uk/stedman_proscreen_ps100.htm",
      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 41,
    title: "Gator Cases 61-Key Keyboard Case",
    title_es: "Estuche para Teclado 61 Teclas Gator",
    category: "accessories",
    price: 179,
    rating: 4.6,
    reviews: 3456,
    badge: null,
    desc: "ATA-approved molded case with EPS foam interior. Heavy-duty hardware, recessed latches, and wheels for easy transport.",
    desc_es: "Estuche moldeado aprobado ATA con interior de espuma EPS. Herrajes de alta resistencia, pestillos empotrados y ruedas para fÃ¡cil transporte.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/409664.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/GK61--gator-gk-61-semi-rigid-keyboard-case",

      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 42,
    title: "SSL UF8 DAW Controller",
    title_es: "Controlador DAW SSL UF8",
    category: "accessories",
    price: 1199,
    rating: 4.7,
    reviews: 2345,
    badge: "premium",
    desc: "8-channel motorized fader controller with SSL's legendary console workflow. Touch-sensitive faders, MCU/HUI protocol, and premium build.",
    desc_es: "Controlador de faders motorizados de 8 canales con el legendario flujo de trabajo de consola SSL. Faders sensibles al tacto, protocolo MCU/HUI y construcciÃ³n premium.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/508557.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/UF8control--solid-state-logic-uf8-advanced-daw-controller",
      thomann: "https://www.thomann.co.uk/ssl_uf8.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/SSL-UF8-Advanced-DAW-Controller/3QTK",

      musikproduktiv: "https://www.musik-produktiv.de/search",
      baxmusic: "https://www.bax-shop.co.uk/midi-studio-controllers/solid-state-logic-uf8-daw-controller"
    }
  },
  {
    id: 43,
    title: "Thomann Tres Cubano Deluxe",
    title_es: "Tres Cubano Deluxe Thomann",
    category: "tres",
    price: 469,
    rating: 4.6,
    reviews: 7,
    badge: "recommended",
    desc: "Professional-grade Cuban Tres with solid spruce top for exceptional clarity, sustain, and definition. No cutaway for maximum resonance. Mother of pearl inlays around sound hole, mahogany neck, walnut back and sides. The studio standard for authentic Cuban sound.",
    desc_es: "Tres Cubano de grado profesional con tapa sÃ³lida de abeto para claridad, sustain y definiciÃ³n excepcionales. Sin cutaway para mÃ¡xima resonancia. Incrustaciones de nÃ¡car alrededor de la boca, mÃ¡stil de caoba, fondo y aros de nogal. El estÃ¡ndar de estudio para sonido cubano autÃ©ntico.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/336551.jpg",
    stores: {
      thomann: "https://www.thomann.co.uk/thomann_tres_cubano_deluxe.htm"
    }
  },
  {
    id: 44,
    title: "Thomann Tres Cubano Standard Acacia",
    title_es: "Tres Cubano Standard Acacia Thomann",
    category: "tres",
    price: 279,
    rating: 4.7,
    reviews: 6,
    badge: null,
    desc: "Solid acacia top Cuban Tres. Maple neck, acacia fingerboard and bridge. Includes gig bag. Tuning: G-B-E or G-C-E. Excellent value for students and touring musicians.",
    desc_es: "Tres Cubano con tapa sÃ³lida de acacia. MÃ¡stil de arce, diapasÃ³n y puente de acacia. Incluye funda de transporte. AfinaciÃ³n: G-B-E o G-C-E. Excelente relaciÃ³n calidad-precio para estudiantes y mÃºsicos de gira.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/415715.jpg",
    stores: {
      thomann: "https://www.thomann.co.uk/thomann_tres_cubano_standard_acacia.htm"
    }
  },
  {
    id: 45,
    title: "Thomann Tres Cubano Standard CCW",
    title_es: "Tres Cubano Standard CCW Thomann",
    category: "tres",
    price: 333,
    rating: 4.3,
    reviews: 654,
    badge: null,
    desc: "Cuban Tres with cutaway for upper fret access. Cedar top, sapele back and sides, maple neck with acacia fingerboard. Built-in pickup system. Tuning: G-B-E or G-C-E. Great mid-range option with stage-ready electronics.",
    desc_es: "Tres Cubano con cutaway para acceso a trastes superiores. Tapa de cedro, fondo y aros de sapeli, mÃ¡stil de arce con diapasÃ³n de acacia. Sistema de pastilla incorporado. AfinaciÃ³n: G-B-E o G-C-E. Excelente opciÃ³n de gama media con electrÃ³nica lista para el escenario.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/357834.jpg",
    stores: {
      thomann: "https://www.thomann.co.uk/thomann_tres_cubano_standard_ccw.htm"
    }
  },
  {
    id: 46,
    title: "Thomann Tres Cubano Deluxe CCW",
    title_es: "Tres Cubano Deluxe CCW Thomann",
    category: "tres",
    price: 502,
    rating: 4.0,
    reviews: 25,
    badge: null,
    desc: "Premium Cuban Tres with cutaway. Cedar top, walnut back and sides, maple neck with acacia fingerboard. Built-in pickup system. The top-tier Thomann tres for players who need cutaway access and stage-ready electronics.",
    desc_es: "Tres Cubano premium con cutaway. Tapa de cedro, fondo y aros de nogal, mÃ¡stil de arce con diapasÃ³n de acacia. Sistema de pastilla incorporado. El tres Thomann de mÃ¡s alta gama para mÃºsicos que necesitan acceso al cutaway y electrÃ³nica lista para el escenario.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/357835.jpg",
    stores: {
      thomann: "https://www.thomann.co.uk/thomann_tres_cubano_deluxe_ccw.htm"
    }
  },
  {
    id: 61,
    title: "Fender Player Stratocaster",
    title_es: "Fender Player Stratocaster",
    category: "guitars",
    price: 849,
    rating: 4.6,
    reviews: 6789,
    badge: "bestSeller",
    desc: "The gateway to Fender's iconic sound. Alder body, maple neck with 9.5-inch radius fingerboard, and three Player Series pickups. The Strat that launched a thousand bands â€” from indie rock to Latin pop, this is the most versatile guitar money can buy.",
    desc_es: "La puerta de entrada al sonido icÃ³nico de Fender. Cuerpo de aliso, mÃ¡stil de arce con diapasÃ³n de radio 9.5 pulgadas y tres pastillas Player Series. La Strat que lanzÃ³ mil bandas â€” desde indie rock hasta pop latino, esta es la guitarra mÃ¡s versÃ¡til que el dinero puede comprar.",
    img: "https://www.fender.com/cdn-cgi/image/format=auto,resize=height=auto,width=1500/https://www.fmicassets.com/Damroot/eCommPNG/10001/0144522500_gtr_frt_001_rr.png",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/StratPlayerMNBL--fender-player-stratocaster-maple-black",
      thomann: "https://www.thomann.co.uk/fender_player_stratocaster_mn_blk.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Fender-Player-Stratocaster-Olympic-White/27HN",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      fender: "https://www.fender.com/en-GB/electric-guitars/stratocaster/player-stratocaster/0144502500.html"
    }
  },
  {
    id: 62,
    title: "Fender Player Telecaster",
    title_es: "Fender Player Telecaster",
    category: "guitars",
    price: 849,
    rating: 4.6,
    reviews: 5432,
    badge: "bestSeller",
    desc: "The working musician's guitar. Two Player Series single-coils deliver that unmistakable Tele twang â€” from Nashville to Havana, the Telecaster has defined country, rock, blues, and Latin music for over 70 years. Simple, rugged, and absolutely timeless.",
    desc_es: "La guitarra del mÃºsico trabajador. Dos pastillas single-coil Player Series ofrecen ese inconfundible twang de Telecaster â€” desde Nashville hasta La Habana, la Telecaster ha definido el country, rock, blues y la mÃºsica latina por mÃ¡s de 70 aÃ±os. Simple, robusta y absolutamente atemporal.",
    img: "https://www.fender.com/cdn-cgi/image/format=auto,resize=height=auto,width=1500/https://www.fmicassets.com/Damroot/eCommPNG/10059/0140820592_fen_ins_frt_1_rr.png",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/TelePlayerMNBL--fender-player-telecaster-maple-black",
      thomann: "https://www.thomann.co.uk/fender_player_telecaster_mn_blk.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Fender-Player-Telecaster-Black/27HR",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      fender: "https://www.fender.com/en-GB/electric-guitars/telecaster/player-telecaster/0145212500.html"
    }
  },
  {
    id: 63,
    title: "Fender American Professional II Telecaster",
    title_es: "Fender American Professional II Telecaster",
    category: "guitars",
    price: 1799,
    rating: 4.7,
    reviews: 3456,
    badge: "premium",
    desc: "Professional-grade Telecaster with V-Mod II pickups for enhanced clarity and punch. Deep C neck profile fits your hand like a glove. The Tele that bridges vintage soul with modern performance â€” ideal for session players and touring musicians.",
    desc_es: "Telecaster de grado profesional con pastillas V-Mod II para claridad y potencia mejoradas. Perfil de mÃ¡stil Deep C que se adapta a tu mano como un guante. La Tele que une el alma vintage con el rendimiento moderno â€” ideal para mÃºsicos de sesiÃ³n y giras.",
    img: "https://www.fender.com/cdn-cgi/image/format=auto,resize=height=auto,width=1500/https://www.fmicassets.com/Damroot/eCommPNG/10001/0113942763_fen_ins_frt_1_rr.png",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/TeleAP2BCH--fender-american-professional-ii-telecaster-butterscotch-blonde",
      thomann: "https://www.thomann.co.uk/fender_american_professional_ii_telecaster.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Fender-American-Professional-II-Telecaster-Butterscotch-Blonde/5M4A",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      fender: "https://www.fender.com/en-GB/electric-guitars/telecaster/american-professional-ii-telecaster/0113942700.html"
    }
  },
  {
    id: 64,
    title: "Fender American Ultra Stratocaster",
    title_es: "Fender American Ultra Stratocaster",
    category: "guitars",
    price: 2299,
    rating: 4.8,
    reviews: 2345,
    badge: "premium",
    desc: "Fender's most advanced Stratocaster. Ultra Noiseless pickups, sculpted neck heel for upper fret access, and a compound-radius fingerboard. From delicate jazz chords to screaming Latin rock leads, this is the ultimate Strat for the discerning professional.",
    desc_es: "La Stratocaster mÃ¡s avanzada de Fender. Pastillas Ultra Noiseless, talÃ³n esculpido para acceso a trastes superiores y diapasÃ³n de radio compuesto. Desde delicados acordes de jazz hasta desgarradores leads de rock latino, esta es la Strat definitiva para el profesional exigente.",
    img: "https://www.fender.com/cdn-cgi/image/format=auto,resize=height=auto,width=1500/https://www.fmicassets.com/Damroot/eCommPNG/10019/0118010771_fen_ins_frt_1_rr.png",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/UltraStratCSB--fender-american-ultra-stratocaster-cosmic-sapphire",
      thomann: "https://www.thomann.co.uk/fender_american_ultra_stratocaster_csb.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Fender-American-Ultra-Stratocaster-Cosmic-Sapphire-Rosewood/6XIU",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      fender: "https://www.fender.com/en-GB/electric-guitars/stratocaster/american-ultra-stratocaster/0118010712.html"
    }
  },
  {
    id: 65,
    title: "Fender Player II Jazzmaster",
    title_es: "Fender Player II Jazzmaster",
    category: "guitars",
    price: 949,
    rating: 4.5,
    reviews: 1890,
    badge: "recommended",
    desc: "The offset icon reborn. Player II pickups with the distinctive Jazzmaster tone â€” warm, round, and complex. The floating vibrato adds shimmer and depth. Loved by surf, indie, and alternative players worldwide. A cult classic that became a legend.",
    desc_es: "El icono offset renacido. Pastillas Player II con el distintivo tono Jazzmaster â€” cÃ¡lido, redondo y complejo. El vibrato flotante aÃ±ade brillo y profundidad. Amado por mÃºsicos de surf, indie y alternativa mundialmente. Un clÃ¡sico de culto que se convirtiÃ³ en leyenda.",
    img: "https://www.fender.com/cdn-cgi/image/format=auto,resize=height=auto,width=1500/https://www.fmicassets.com/Damroot/eCommPNG/10071/0140590592_fen_ins_frt_1_rr.png",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/JazzmasterP2MN--fender-player-ii-jazzmaster-maple-3-color-sunburst",
      thomann: "https://www.thomann.co.uk/fender_player_ii_jazzmaster_3cs.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Fender-Player-II-Jazzmaster-3-Color-Sunburst-Maple/65A3",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      fender: "https://www.fender.com/en-GB/electric-guitars/jazzmaster/player-ii-jazzmaster/0140590558.html"
    }
  },
  {
    id: 66,
    title: "Fender Player Precision Bass",
    title_es: "Fender Player Precision Bass",
    category: "guitars",
    price: 899,
    rating: 4.6,
    reviews: 4567,
    badge: "legend",
    desc: "The bass that invented modern music. The P-Bass delivers that punchy, authoritative low-end that drives salsa, funk, rock, and Latin jazz. Split-coil pickup for rich, balanced tone. The foundation of every great rhythm section â€” from James Brown to Buena Vista.",
    desc_es: "El bajo que inventÃ³ la mÃºsica moderna. El P-Bass ofrece ese golpe grave y autoritario que impulsa la salsa, el funk, el rock y el jazz latino. Pastilla split-coil para un tono rico y equilibrado. La base de cada gran secciÃ³n rÃ­tmica â€” desde James Brown hasta Buena Vista.",
    img: "https://www.fender.com/cdn-cgi/image/format=auto,resize=height=auto,width=1500/https://www.fmicassets.com/Damroot/eCommPNG/10043/0140472506_fen_ins_frt_1_rr.png",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/PBassPlayerMNBL--fender-player-precision-bass-maple-black",
      thomann: "https://www.thomann.co.uk/fender_player_precision_bass_mn_blk.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Fender-Player-Precision-Bass-Black/27HL",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      fender: "https://www.fender.com/en-GB/electric-basses/precision-bass/player-precision-bass/0149803515.html"
    }
  },
  {
    id: 67,
    title: "Fender Player Jazz Bass",
    title_es: "Fender Player Jazz Bass",
    category: "guitars",
    price: 899,
    rating: 4.6,
    reviews: 4321,
    badge: "legend",
    desc: "The voice of modern bass. Two single-coil pickups deliver that punchy, articulate tone that cuts through any mix. The slim neck profile makes complex Latin bass lines and jazz walking lines effortless. From Jaco to today, the Jazz Bass defines bass tone.",
    desc_es: "La voz del bajo moderno. Dos pastillas single-coil ofrecen ese tono golpeado y articulado que corta cualquier mezcla. El perfil de mÃ¡stil delgado hace que las lÃ­neas de bajo latino complejas y las lÃ­neas de walking jazz sean sin esfuerzo. Desde Jaco hasta hoy, el Jazz Bass define el tono del bajo.",
    img: "https://www.fender.com/cdn-cgi/image/format=auto,resize=height=auto,width=1500/https://www.fmicassets.com/Damroot/eCommPNG/10002/0149953515_gtr_frt_001_rr.png",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/JBassPlayerMNBL--fender-player-jazz-bass-maple-black",
      thomann: "https://www.thomann.co.uk/fender_player_jazz_bass_mn_blk.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Fender-Player-Jazz-Bass-Black/27HQ",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      fender: "https://www.fender.com/en-GB/electric-basses/jazz-bass/player-jazz-bass/0149903500.html"
    }
  },
  {
    id: 68,
    title: "Fender CD-60S Acoustic",
    title_es: "Fender CD-60S AcÃºstica",
    category: "guitars",
    price: 219,
    rating: 4.4,
    reviews: 18907,
    badge: "bestSeller",
    desc: "The acoustic that started it all for millions of players. Solid spruce top with mahogany back and sides delivers warm, balanced tone. Easy-playing neck profile makes it the ideal first acoustic or reliable campfire companion. Fender quality at an unbeatable price.",
    desc_es: "La acÃºstica que lo empezÃ³ todo para millones de mÃºsicos. Tapa sÃ³lida de abeto con fondo y aros de caoba ofrece un tono cÃ¡lido y equilibrado. El perfil de mÃ¡stil fÃ¡cil de tocar la convierte en la acÃºstica ideal para principiantes o compaÃ±era de fogata. Calidad Fender a un precio imbatible.",
    img: "https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/original/products/22734/78119/322105-120758711__07877.1715230770.jpg?c=1",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/CD60S--fender-cd-60s-dreadnought-acoustic-guitar-natural",
      thomann: "https://www.thomann.co.uk/fender_cd_60s_dreadnought_nat.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Fender-CD-60S-Dreadnought-Acoustic-Natural/17FJ",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      fender: "https://www.fender.com/en-GB/acoustic-guitars/dreadnought/cd-60s-dreadnought/0970110006.html"
    }
  },
  {
    id: 71,
    title: "Fender Blues Junior IV",
    title_es: "Fender Blues Junior IV",
    category: "amps",
    price: 699,
    rating: 4.7,
    reviews: 5678,
    badge: "legend",
    desc: "The quintessential boutique-style combo amp. 15 watts of all-tube power through a single 12-inch Jensen speaker. Three-band EQ, spring reverb, and fat boost make this the most recorded small amp in history. From blues clubs to Latin jazz cafes, the Blues Junior delivers warm, responsive tone that makes every guitarist sound better.",
    desc_es: "El amplificador combo boutique por excelencia. 15 vatios de potencia todo-vÃ¡lvulas a travÃ©s de un altavoz Jensen de 12 pulgadas. EQ de tres bandas, reverb de resorte y fat boost lo convierten en el pequeÃ±o amplificador mÃ¡s grabado de la historia. Desde clubes de blues hasta cafÃ©s de jazz latino, el Blues Junior ofrece un tono cÃ¡lido y responsivo que hace sonar mejor a todo guitarrista.",
    img: "https://www.fender.com/cdn-cgi/image/format=auto,resize=height=auto,width=1500/https://www.fmicassets.com/Damroot/eCommPNG/10036/2231504000_amp_frt_1_nr.png",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/BluesJuniorIV--fender-blues-junior-iv-1x12-15-watt-tube-combo-amp",
      thomann: "https://www.thomann.co.uk/fender_blues_junior_iv.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Fender-Blues-Junior-IV-1x12-15W-Valve-Combo/28KX",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      fender: "https://www.fender.com/en-GB/amplifiers/guitar-amps/blues-junior-iv/2231504000.html"
    }
  },
  {
    id: 72,
    title: "Boss Katana 50 MkII",
    title_es: "Boss Katana 50 MkII",
    category: "amps",
    price: 259,
    rating: 4.6,
    reviews: 12345,
    badge: "bestSeller",
    desc: "The best-selling modeling amp in the world. 50 watts of power with five amp voicings â€” clean, crunch, lead, brown, and acoustic. Built-in effects including delay, reverb, chorus, and more. The Katana 50 is the ultimate practice and small-gig amp for guitarists who want versatility without complexity or cost.",
    desc_es: "El amplificador de modelado mÃ¡s vendido del mundo. 50 vatios de potencia con cinco voces de amplificador â€” clean, crunch, lead, brown y acÃºstico. Efectos incorporados incluyendo delay, reverb, chorus y mÃ¡s. El Katana 50 es el amplificador definitivo para prÃ¡ctica y pequeÃ±os conciertos para guitarristas que quieren versatilidad sin complejidad ni costo.",
    img: "img/boss-katana.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/search?s=boss+katana+50+mkii",
      thomann: "https://www.thomann.co.uk/boss_katana_50_mkii.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Boss-Katana-50-MkII-Guitar-Combo-Amp/5GMG",
      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 73,
    title: "Vox AC30",
    title_es: "Vox AC30",
    category: "amps",
    price: 1099,
    rating: 4.8,
    reviews: 6789,
    badge: "legend",
    desc: "The sound of British rock. 30 watts of all-tube power through two 12-inch Celestion speakers. The iconic chime and jangle that defined The Beatles, Queen, and countless Brit-rock bands. Top Boost channel delivers that unmistakable cutting presence. For guitarists who want the sound of rock history.",
    desc_es: "El sonido del rock britÃ¡nico. 30 vatios de potencia todo-vÃ¡lvulas a travÃ©s de dos altavoces Celestion de 12 pulgadas. El icÃ³nico brillo que definiÃ³ a The Beatles, Queen e innumerables bandas de rock britÃ¡nico. El canal Top Boost ofrece esa presencia cortante inconfundible. Para guitarristas que quieren el sonido de la historia del rock.",
    img: "https://www.voxamps.co.uk/cdn/shop/files/AC30C2-Front-Flat-No-Shadow-White-BG.jpg?v=1692886042&width=800",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/AC30C2X--vox-ac30-custom-30-watt-2x12-tube-combo-amp",
      thomann: "https://www.thomann.co.uk/search.html?sw=vox%20ac30",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Vox-AC30-Custom-2x12-Tube-Combo-Amp/2PO",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      baxmusic: "https://www.bax-shop.co.uk/complete-assortment?keyword=Vox%20AC30"
    }
  },
  {
    id: 74,
    title: "Marshall DSL40CR",
    title_es: "Marshall DSL40CR",
    category: "amps",
    price: 999,
    rating: 4.7,
    reviews: 4321,
    badge: "topQuality",
    desc: "The classic rock amplifier reimagined. 40 watts of all-tube power through a 12-inch Celestion V-type speaker. Two channels with classic gain and ultra gain for everything from clean blues to heavy rock. The DSL40CR is the quintessential Marshall sound â€” punchy mids, crunch, and that unmistakable British roar.",
    desc_es: "El amplificador de rock clÃ¡sico reimaginado. 40 vatios de potencia todo-vÃ¡lvulas a travÃ©s de un altavoz Celestion V-type de 12 pulgadas. Dos canales con ganancia clÃ¡sica y ultraganancia para todo, desde blues limpio hasta rock pesado. El DSL40CR es el sonido Marshall por excelencia â€” medios contundentes, crunch y ese rugido britÃ¡nico inconfundible.",
    img: "img/marshall-dsl40.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/DSL40CR--marshall-dsl40cr-40-watt-1x12-tube-combo-amp",
      thomann: "https://www.thomann.co.uk/search.html?sw=marshall%20dsl40cr",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Marshall-DSL40CR-40-Watt-Combo-Amp/3Y2X",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      baxmusic: "https://www.bax-shop.co.uk/complete-assortment?keyword=Marshall%20DSL40CR"
    }
  },
  {
    id: 75,
    title: "Ampeg PF-500 Portaflex",
    title_es: "Ampeg PF-500 Portaflex",
    category: "amps",
    price: 649,
    rating: 4.6,
    reviews: 2345,
    badge: "legend",
    desc: "The bass amp that defined rock and roll. 500 watts of Class-D power in a lightweight, portable head. Legendary Ampeg tone with 3-band EQ, ultra-mid frequency selector, and built-in compressor. The PF-500 delivers that thundering low-end that drove Motown, rock, and Latin music for decades. Pair it with any cab for instant classic bass tone.",
    desc_es: "El amplificador de bajo que definiÃ³ el rock and roll. 500 vatios de potencia Clase D en un cabezal ligero y portÃ¡til. Legendario tono Ampeg con EQ de 3 bandas, selector de frecuencia ultra-media y compresor incorporado. El PF-500 entrega ese retumbante extremo grave que impulsÃ³ Motown, el rock y la mÃºsica latina durante dÃ©cadas. CombÃ­nalo con cualquier gabinete para obtener un tono de bajo clÃ¡sico instantÃ¡neo.",
    img: "https://muzikercdn.com/uploads/product_gallery/1100/110065/thumb_large_d_gallery_base_7a8a60c3.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/search?s=ampeg+pf-500+portaflex",
      thomann: "https://www.thomann.co.uk/ampeg_pf_500_portaflex.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Ampeg-PF-500-Portaflex-500W-Bass-Amp-Head/4GKK",
      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 76,
    title: "Fender Rumble 500 V3",
    title_es: "Fender Rumble 500 V3",
    category: "amps",
    price: 799,
    rating: 4.7,
    reviews: 3456,
    badge: "bestSeller",
    desc: "The modern bass standard. 500 watts of power through two 10-inch Eminence speakers. Lightweight design at just 28 pounds. Clean, punchy tone with built-in overdrive, 9-band EQ, and XLR direct out. From Latin salsa to rock to jazz, the Rumble 500 delivers professional bass tone in a package you can carry with one hand.",
    desc_es: "El estÃ¡ndar moderno del bajo. 500 vatios de potencia a travÃ©s de dos altavoces Eminence de 10 pulgadas. DiseÃ±o ligero de solo 12.7 kg. Tono limpio y contundente con overdrive incorporado, EQ de 9 bandas y salida directa XLR. Desde salsa latina hasta rock y jazz, el Rumble 500 ofrece un tono de bajo profesional en un paquete que puedes llevar con una mano.",
    img: "https://thumbs.static-thomann.de/thumb/padthumb600x600/pics/bdb/_33/331990/9905921_800.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/Rumble500V3--fender-rumble-500-v3-500-watt-2x10-bass-combo-amp",
      thomann: "https://www.thomann.co.uk/fender_rumble_500.htm",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Fender-Rumble-500-V3-Bass-Amp/4XB3",
      musikproduktiv: "https://www.musik-produktiv.de/search",
      fender: "https://uk.fender.com/search?q=Fender+Rumble+500+V3"
    }
  },
  {
    id: 91,
    title: "Shure BLX288/PG58",
    title_es: "Shure BLX288/PG58",
    category: "microphones",
    price: 599,
    rating: 4.5,
    reviews: 4567,
    badge: "bestSeller",
    desc: "The industry standard for affordable wireless. Dual-channel handheld system with PG58 microphone capsules. Simple setup with one-touch frequency scanning and automatic pairing. Up to 14 hours of battery life. Reliable UHF performance for churches, clubs, and schools.",
    desc_es: "El estÃ¡ndar de la industria para inalÃ¡mbricos asequibles. Sistema de doble canal con cÃ¡psulas PG58. ConfiguraciÃ³n simple con escaneo de frecuencia de un toque. Hasta 14 horas de baterÃ­a. Rendimiento UHF confiable.",
    img: "https://media.sweetwater.com/m/products/image/217e4fcc44g0No4jjGRA9c2Sz3TG7D6Pi30vjKLN.jpg?ha=217e4fcc440eb90bd7395f6c054e18fc0ed14ef2&quality=82&width=750",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/BLX288PG58-H10--shure-blx288-pg58-dual-channel-wireless-handheld-microphone-system-h10-band",
      thomann: "https://www.thomann.co.uk/shure_blx288_pg58_combo_h8e.htm",
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Shure-BLX288-PG58-H8E-Dual-Wireless-Microphone-System/38GC",
      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 92,
    title: "Sennheiser EW 100 G4-935",
    title_es: "Sennheiser EW 100 G4-935",
    category: "microphones",
    price: 849,
    rating: 4.7,
    reviews: 3456,
    badge: "topQuality",
    desc: "Professional wireless trusted by touring acts worldwide. True Diversity reception for dropout-free performance. 42 MHz tuning bandwidth with 1680 frequencies. e935 capsule delivers broadcast-quality vocal clarity. Rugged metal construction, rack-mountable.",
    desc_es: "InalÃ¡mbrico profesional usado por artistas de gira mundialmente. RecepciÃ³n True Diversity para rendimiento sin cortes. 42 MHz de ancho de banda. CÃ¡psula e935 con claridad vocal de calidad broadcast. ConstrucciÃ³n metÃ¡lica robusta.",
    img: "https://www.simplysoundandlighting.co.uk/cdn/shop/files/01850fac-7d3e-4c6d-bff4-48371db65f7f.jpg?v=1688089260",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/EW100G4935S--sennheiser-ew-100-g4-935-s-handheld-wireless-system",
      thomann: "https://www.thomann.co.uk/search.html?sw=sennheiser+ew+100+g4+935",
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Sennheiser-EW-100-G4-935-S-Wireless-Vocal-Microphone-System/62BX",
      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 93,
    title: "Shure ULXD24/SM58",
    title_es: "Shure ULXD24/SM58",
    category: "microphones",
    price: 1359,
    rating: 4.8,
    reviews: 2345,
    badge: "premium",
    desc: "Digital wireless for the professional stage. 20 Hz-20 kHz response with no audio compression. Patented digital transmission eliminates interference. SM58 capsule is legendary for live vocals. Dante networking for Broadway, TV, and major tours.",
    desc_es: "InalÃ¡mbrico digital para el escenario profesional. Respuesta 20 Hz-20 kHz sin compresiÃ³n. TransmisiÃ³n digital patentada. CÃ¡psula SM58 legendaria para voces en vivo. Dante networking para Broadway, TV y giras.",
    img: "https://stagesupply.co.uk/wp-content/uploads/2026/01/SHUULXD2SM58K51_Shure_ULXD2SM58-K51_Image_1.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/ULXD2SM58--shure-ulxd24-sm58-digital-wireless-handheld-system",
      thomann: "https://www.thomann.co.uk/search.html?sw=shure+ulxd24+sm58",
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Shure-ULXD24-SM58-J50-Digital-Wireless-Microphone-System/5E80",
      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 94,
    title: "Sennheiser XSW 2-825",
    title_es: "Sennheiser XSW 2-825",
    category: "microphones",
    price: 549,
    rating: 4.4,
    reviews: 5678,
    badge: "recommended",
    desc: "Entry-level professional wireless from Sennheiser. Automatic frequency management and pairing. e825 capsule with clear vocal sound. 10-hour battery life. Perfect for small venues and houses of worship.",
    desc_es: "InalÃ¡mbrico profesional nivel bÃ¡sico de Sennheiser. GestiÃ³n automÃ¡tica de frecuencia. CÃ¡psula e825 con sonido vocal claro. 10 horas de baterÃ­a. Perfecto para lugares pequeÃ±os e iglesias.",
    img: "https://media.sweetwater.com/m/products/image/3453a6960fGNfgVsy5mCWAU7kgzJhtz3TzXuM7wD.jpg?quality=82&width=750&ha=3453a6960ff656b1",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/XSW2825--sennheiser-xsw-2-825-handheld-wireless-system",
      thomann: "https://www.thomann.co.uk/search.html?sw=sennheiser+xsw+2+825",
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Sennheiser-XSW-2-825-AE-Wireless-Vocal-Microphone-System/6918",
      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 95,
    title: "AKG WMS420 Vocal Set",
    title_es: "AKG WMS420 Set Vocal",
    category: "microphones",
    price: 499,
    rating: 4.4,
    reviews: 3456,
    badge: "bestSeller",
    desc: "Professional multi-channel wireless system from AKG. The WMS420 includes the SR420 receiver, HT420 handheld with D5 capsule, and PT420 bodypack transmitter. Exceptional 8-hour battery life from a single AA battery. Detachable antennas for professional accessories. Up to 8 simultaneous channels.",
    desc_es: "Sistema inalÃ¡mbrico multicanal profesional de AKG. Incluye receptor SR420, transmisor de mano HT420 con cÃ¡psula D5 y transmisor de petaca PT420. Excepcional duraciÃ³n de baterÃ­a de 8 horas con una sola pila AA. Antenas desmontables para accesorios profesionales. Hasta 8 canales simultÃ¡neos.",
    img: "https://media.sweetwater.com/m/products/image/64b630817eqPKV1QEf4AKiQgMavL5q7bL25ba59K.jpg?quality=82&width=750&ha=64b630817ed544dd",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/WMS420V-A--akg-wms420-vocal-set-wireless-handheld-microphone-system-band-a",
      thomann: "https://www.thomann.co.uk/search.html?sw=akg+wms420",
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/AKG-WMS40-Pro2-Vocal-Set/IAX",
      musikproduktiv: "https://www.musik-produktiv.de/search"
    }
  },
  {
    id: 96,
    title: "Ibanez TS9 Tube Screamer",
    title_es: "Ibanez TS9 Tube Screamer",
    category: "pedals",
    price: 149,
    rating: 4.8,
    reviews: 23450,
    badge: "legend",
    desc: "The most famous overdrive pedal ever made. From blues to rock, the Tube Screamer's mid-boosted growl has shaped guitar tone for decades. Used by SRV, John Mayer, and countless others.",
    desc_es: "El pedal de overdrive mÃ¡s famoso jamÃ¡s creado. Del blues al rock, el growl con medios realzados ha moldeado el tono de la guitarra por dÃ©cadas.",
    img: "https://media.sweetwater.com/m/products/image/29a2414665T6pyenFpcASI7sBWwbVbS9ucJiSa6v.jpg?quality=82&height=750&ha=29a2414665765b37",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/TS9--ibanez-ts9-tube-screamer-overdrive-pedal", thomann: "https://www.thomann.co.uk/ibanez_ts9_tube_screamer.htm", gear4music: "https://www.gear4music.com/Guitar-and-Bass/Ibanez-TS9-Tube-Screamer-Overdrive-Pedal/1W2", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 97,
    title: "Boss DD-8 Digital Delay",
    title_es: "Boss DD-8 Digital Delay",
    category: "pedals",
    price: 179,
    rating: 4.7,
    reviews: 12340,
    badge: "bestSeller",
    desc: "The ultimate compact delay pedal. 11 delay modes including analog, tape, reverse, and loop. Up to 40 seconds of looper. Boss durability and pristine sound quality.",
    desc_es: "El pedal de delay compacto definitivo. 11 modos incluyendo analÃ³gico, cinta, reverso y loop. Hasta 40 segundos de looper. Durabilidad Boss y calidad de sonido impecable.",
    img: "https://media.sweetwater.com/m/products/image/592951a349JbXkOCjp3TZl1RZss2Y8NpZ8yFAjIV.jpg?ha=592951a349b8fb95a1a0e942d5a9c935b27cb967&quality=82&width=750",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/DD8--boss-dd-8-digital-delay-pedal", thomann: "https://www.thomann.co.uk/boss_dd_8_digital_delay.htm", gear4music: "https://www.gear4music.com/Guitar-and-Bass/Boss-DD-8-Digital-Delay-Pedal/4VW6", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 98,
    title: "Boss TU-3 Chromatic Tuner",
    title_es: "Sintonizador CromÃ¡tico Boss TU-3",
    category: "pedals",
    price: 99,
    rating: 4.8,
    reviews: 34560,
    badge: "legend",
    desc: "The industry standard pedal tuner. Accurate chromatic tuning with a bright display. True bypass, power output for daisy-chaining, and built to survive the road.",
    desc_es: "El afinador de pedal estÃ¡ndar de la industria. AfinaciÃ³n cromÃ¡tica precisa con pantalla brillante. True bypass, salida de corriente y construido para sobrevivir la carretera.",
    img: "https://media.sweetwater.com/m/products/image/526813dcf1IJEhm77HMlCeYLXyc8ZBocKvg9s2aw.jpg?quality=82&height=750&ha=526813dcf11bd5e8",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/TU3--boss-tu-3-chromatic-tuner-pedal", thomann: "https://www.thomann.co.uk/boss_tu3.htm", gear4music: "https://www.gear4music.com/Guitar-and-Bass/Boss-TU-3-Chromatic-Tuner-Pedal/1G3", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 99,
    title: "Dunlop GCB95 Crybaby Wah",
    title_es: "Dunlop GCB95 Crybaby Wah",
    category: "pedals",
    price: 129,
    rating: 4.6,
    reviews: 28760,
    badge: "legend",
    desc: "The wah pedal that defined rock guitar. Classic Crybaby circuit with legendary sweeping filter tone. From Hendrix to Kirk Hammett, this is the sound of wah.",
    desc_es: "El pedal wah que definiÃ³ la guitarra rock. Circuito Crybaby clÃ¡sico con legendario tono de filtro barrido. De Hendrix a Kirk Hammett, este es el sonido del wah.",
    img: "https://media.sweetwater.com/m/products/image/d6585f7b06ZnJAXFjvmZFIbe9nHCvFIVWhaPe7Zi.jpg?ha=d6585f7b06b6564717903f3022edfc5077428a1d&quality=82&width=750",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/GCB95--dunlop-crybaby-gcb95-wah-pedal", thomann: "https://www.thomann.co.uk/dunlop_cry_baby_gcb95.htm", gear4music: "https://www.gear4music.com/Guitar-and-Bass/Dunlop-Crybaby-GCB95-Wah-Pedal/1X3", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 100,
    title: "TC Electronic Hall of Fame 2",
    title_es: "TC Electronic Hall of Fame 2",
    category: "pedals",
    price: 169,
    rating: 4.6,
    reviews: 12300,
    badge: "bestSeller",
    desc: "The most versatile reverb pedal. 8 reverb algorithms plus TonePrint custom slots. From subtle room to ethereal ambient washes. Studio-quality reverb in a pedal.",
    desc_es: "El pedal de reverb mÃ¡s versÃ¡til. 8 algoritmos mÃ¡s ranuras TonePrint personalizables. De sala sutil a lavados ambientales etÃ©reos. Reverb de calidad de estudio en un pedal.",
    img: "https://m.media-amazon.com/images/I/614VhzaqysL._AC_SX679_.jpg",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/HOF2--tc-electronic-hall-of-fame-2-reverb-pedal", thomann: "https://www.thomann.co.uk/tc_electronic_hall_of_fame_2.htm", gear4music: "https://www.gear4music.com/Guitar-and-Bass/TC-Electronic-Hall-of-Fame-2-Reverb-Pedal/4D33", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 101,
    title: "Electro-Harmonix Small Stone",
    title_es: "Electro-Harmonix Small Stone",
    category: "pedals",
    price: 89,
    rating: 4.5,
    reviews: 16780,
    badge: "legend",
    desc: "The classic phaser pedal. Rich, swirling phase tones from subtle movement to dramatic sweeps. Used on countless records. Simple controls, legendary sound.",
    desc_es: "El pedal phaser clÃ¡sico. Tonos de fase ricos y giratorios desde movimiento sutil hasta barridos dramÃ¡ticos. Usado en innumerables discos.",
    img: "https://media.sweetwater.com/m/products/image/b143a7a866hP6EfKFhyV1kKLtVqsldw8M4Ny9ag6.jpg?quality=82&height=750&ha=b143a7a8662a7a47",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/SmallStone--electro-harmonix-small-stone-phase-shifter-pedal", thomann: "https://www.thomann.co.uk/electro_harmonix_nano_small_stone.htm", gear4music: "https://www.gear4music.com/Guitar-and-Bass/Electro-Harmonix-Small-Stone-Phase-Shifter-Pedal/1SQ", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 102,
    title: "Yamaha FG800 Acoustic",
    title_es: "Yamaha FG800 AcÃºstica",
    category: "guitars",
    price: 229,
    rating: 4.6,
    reviews: 24560,
    badge: "bestSeller",
    desc: "The best value acoustic guitar. Solid spruce top, rosewood back and sides. Rich, full tone that rivals guitars costing twice as much. Perfect for beginners and experienced players alike.",
    desc_es: "La guitarra acÃºstica de mejor valor. Tapa sÃ³lida de abeto, fondo y aros de palo rosa. Tono rico y lleno que rivaliza con guitarras del doble de precio.",
    img: "https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/original/products/38647/181269/GFG800NTII%201__28499.1742922167.jpg?c=1",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/FG800--yamaha-fg800-acoustic-guitar-natural", thomann: "https://www.thomann.co.uk/yamaha_fg800_nt_467748.htm", gear4music: "https://www.gear4music.com/Guitar-and-Bass/Yamaha-FG800-Acoustic-Guitar/27B4", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 103,
    title: "Yamaha Pacifica 112V",
    title_es: "Yamaha Pacifica 112V",
    category: "guitars",
    price: 349,
    rating: 4.5,
    reviews: 18900,
    badge: "bestSeller",
    desc: "The best beginner electric guitar. HSS pickup configuration for versatility. Solid alder body, maple neck. Plays and sounds like guitars twice the price. The standard for budget electrics.",
    desc_es: "La mejor guitarra elÃ©ctrica para principiantes. ConfiguraciÃ³n HSS para versatilidad. Cuerpo sÃ³lido de aliso, mÃ¡stil de arce. Toca y suena como guitarras del doble de precio.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/429087.jpg",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/Pac112V--yamaha-pacifica-112v-electric-guitar", thomann: "https://www.thomann.co.uk/yamaha_pacifica_112v.htm", gear4music: "https://www.gear4music.com/Guitar-and-Bass/Yamaha-PAC-112-JB-1-Electric-Guitar/27A6", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 104,
    title: "Martin D-28 Dreadnought",
    title_es: "Martin D-28 Dreadnought",
    category: "guitars",
    price: 2999,
    rating: 4.9,
    reviews: 5678,
    badge: "legend",
    desc: "The acoustic guitar that defined modern music. Solid Sitka spruce top, East Indian rosewood back and sides. The standard by which all other acoustic guitars are measured.",
    desc_es: "La guitarra acÃºstica que definiÃ³ la mÃºsica moderna. Tapa sÃ³lida de abeto Sitka, fondo y aros de palo rosa de la India. El estÃ¡ndar con el que se miden todas las demÃ¡s guitarras acÃºsticas.",
    img: "https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/original/products/23980/86512/282556-1530186278494__96392.1736787229.jpg?c=1",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/D28--martin-d-28-dreadnought-acoustic-guitar", thomann: "https://www.thomann.co.uk/martin_d28_dreadnought.htm", gear4music: "https://www.gear4music.com/Guitar-and-Bass/Martin-D-28-Standard-Series-Dreadnought-Acoustic-Guitar/39F1", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 105,
    title: "EV ZLX-12P Powered Speaker",
    title_es: "Altavoz Activo EV ZLX-12P",
    category: "live_sound",
    price: 599,
    rating: 4.6,
    reviews: 8900,
    badge: "bestSeller",
    desc: "Professional powered PA speaker. 1000W peak power, 12-inch woofer with titanium tweeter. Lightweight design at just 30 lbs. Built-in DSP with presets for any application.",
    desc_es: "Altavoz PA activo profesional. 1000W de potencia pico, woofer de 12 pulgadas con tweeter de titanio. DiseÃ±o ligero de solo 13.6 kg. DSP incorporado con preajustes.",
    img: "https://media.sweetwater.com/m/products/image/1f3676cd0e8h4xfV5bCjFOUlRmMQYLNUuUuBekaI.wm-dh.jpg?quality=82&height=750&ha=1f3676cd0e0bca53",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/ZLX12P--electro-voice-zlx-12p-powered-speaker", thomann: "https://www.thomann.co.uk/ev_zlx_12p.htm", gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Electro-Voice-ZLX-12P-Powered-Speaker/6ZK", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 106,
    title: "QSC K12.2 Powered Speaker",
    title_es: "Altavoz Activo QSC K12.2",
    category: "live_sound",
    price: 999,
    rating: 4.8,
    reviews: 12340,
    badge: "topQuality",
    desc: "The industry standard for live sound reinforcement. 2000W peak power, 12-inch woofer. Deep bass extension, pristine highs. Rugged build, road-ready design. The choice of professionals worldwide.",
    desc_es: "El estÃ¡ndar de la industria para refuerzo de sonido en vivo. 2000W de potencia pico. ExtensiÃ³n de graves profunda, agudos impecables. ConstrucciÃ³n robusta, lista para la carretera.",
    img: "https://media.sweetwater.com/m/products/image/6c9d9ecdf8KxbYZ66Y2FbzDnGWRM90iaN4Xlc84X.jpg?quality=82&height=750&ha=6c9d9ecdf885f2f5",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/K122--qsc-k12-2-powered-speaker", thomann: "https://www.thomann.co.uk/qsc_k12_2.htm", gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/QSC-K12-2-Powered-Loudspeaker/6DM", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 107,
    title: "Shure SM58 Wireless",
    title_es: "InalÃ¡mbrico Shure SM58",
    category: "live_sound",
    price: 399,
    rating: 4.7,
    reviews: 18900,
    badge: "legend",
    desc: "The wireless version of the most iconic live vocal mic. Legendary SM58 capsule performance without the cable. Perfect for front-of-house vocals, public speaking, and live performance.",
    desc_es: "La versiÃ³n inalÃ¡mbrica del micrÃ³fono vocal en vivo mÃ¡s icÃ³nico. Rendimiento legendario de la cÃ¡psula SM58 sin el cable.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/379902.jpg",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/SM58Wire--shure-sm58-s-wireless-handheld-microphone", thomann: "https://www.thomann.co.uk/shure_sm58s_wireless.htm", gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Shure-SM58-S-Wireless-Handheld-Microphone/36G", musikproduktiv: "https://www.musik-produktiv.de/search" }
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
    desc: "Professional powered speaker with Yamaha's legendary DSP. 1100W of power, 12-inch woofer with 1.75-inch compression driver. Advanced FIR-X tuning for linear phase response. Lightweight at 38 lbs. Ideal for bands and DJs.",
    desc_es: "Altavoz activo profesional con el legendario DSP de Yamaha. 1100W de potencia, woofer de 12 pulgadas. Tuning FIR-X avanzado. Ideal para bandas y DJs.",
    img: "https://media.sweetwater.com/m/products/image/a45452a155ELQGX8WSNhRwd0U70pxuq37jKMKYcF.jpg?ha=a45452a155b72d2cf9be61c3789210a40c22e552&quality=82&width=750",
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
    desc: "The ultimate all-in-one column array PA system. 2000W peak power with 12-inch subwoofer and 7-channel digital mixer. 130dB SPL. Bluetooth streaming. Perfect for bands and DJs.",
    desc_es: "El sistema PA column array todo-en-uno definitivo. 2000W con subwoofer de 12 pulgadas y mezclador digital de 7 canales. 130dB SPL. Perfecto para bandas y DJs.",
    img: "https://media.sweetwater.com/m/products/image/e03ddeb29dyG4r4RIqmH1HQ9anm8MBq85wi4ueTy.jpg?quality=82&height=750&ha=e03ddeb29d9fed72",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/PRXONE--jbl-prx-one-active-column-speaker-system", thomann: "https://www.thomann.co.uk/jbl_prx_one.htm", gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/JBL-PRX-ONE-Column-PA-System/6DM", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 110,
    title: "Ableton Live 12 Suite",
    title_es: "Ableton Live 12 Suite",
    category: "daw",
    price: 799,
    rating: 4.8,
    reviews: 23450,
    badge: "premium",
    desc: "The industry standard for electronic music production and live performance. Warp engine, Max for Live integration, advanced MIDI editing. Unmatched workflow for beat-making, recording, and DJing. Used by pros worldwide from studio to stage.",
    desc_es: "El estándar de la industria para producción de música electrónica y performance en vivo. Motor warp, integración Max for Live. Flujo de trabajo inigualable.",
    img: "https://media.sweetwater.com/m/products/image/6c9d9ecdf8KxbYZ66Y2FbzDnGWRM90iaN4Xlc84X.jpg?quality=82&height=750&ha=6c9d9ecdf885f2f5",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/Live12Suite--ableton-live-12-suite-music-production-software", thomann: "https://www.thomann.co.uk/ableton_live_12_suite.htm", gear4music: "https://www.gear4music.com/Recording-and-Computers/Ableton-Live-12-Suite/6OZA", musikproduktiv: "https://www.musik-produktiv.de/search", andertons: "https://www.andertons.co.uk/ableton-live-12-suite-upg-from-live-111-standard/" }
  },
  {
    id: 111,
    title: "Apple Logic Pro",
    title_es: "Apple Logic Pro",
    category: "daw",
    price: 199,
    rating: 4.7,
    reviews: 34560,
    badge: "topQuality",
    desc: "Apple's professional DAW for Mac. Comprehensive recording, MIDI sequencing, and mixing. Includes Alchemy synth, Drum Kit Designer, and producer packs. Best value pro DAW at $199 with lifetime updates.",
    desc_es: "El DAW profesional de Apple para Mac. Grabación completa, secuenciación MIDI y mezcla. Incluye sintetizador Alchemy y packs de producción.",
    img: "https://rvb-img.reverb.com/i/s--SbW3E7b---/quality=medium-low,height=800,width=800,fit=contain/065c47d5-d731-4929-99d3-050db69a6dae.jpg",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/LogicPro--apple-logic-pro-music-production-software", thomann: "https://www.thomann.co.uk/apple_logic_pro.htm", gear4music: "https://www.gear4music.com/Recording-and-Computers/Apple-Logic-Pro/6OZA", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 112,
    title: "FL Studio Producer Edition",
    title_es: "FL Studio Producer Edition",
    category: "daw",
    price: 199,
    rating: 4.6,
    reviews: 45670,
    badge: "bestSeller",
    desc: "The beat-maker's choice. Pattern-based workflow, intuitive piano roll, and lifetime free updates. Includes synths, samplers, and effects. Used by hip-hop, EDM, and pop producers worldwide.",
    desc_es: "La elección de los creadores de beats. Flujo de trabajo basado en patrones, piano roll intuitivo y actualizaciones gratuitas de por vida.",
    img: "https://rvb-img.reverb.com/i/s--CMEj8Em6--/quality=medium-low,height=800,width=800,fit=contain/l9catbr2tinjd0xh0jel.jpg",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/FLStudioPro--image-line-fl-studio-producer-edition", thomann: "https://www.thomann.co.uk/image_line_fl_studio_producer_edition.htm", gear4music: "https://www.gear4music.com/Recording-and-Computers/FL-Studio-Producer-Edition/6OZA", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 113,
    title: "Avid Pro Tools Studio",
    title_es: "Avid Pro Tools Studio",
    category: "daw",
    price: 599,
    rating: 4.7,
    reviews: 18900,
    badge: "premium",
    desc: "The recording industry standard. Used in professional studios worldwide for tracking, editing, and mixing. Advanced MIDI, surround sound up to 7.1, and collaboration features. Essential for audio post-production.",
    desc_es: "El estándar de la industria de grabación. Usado en estudios profesionales mundialmente para tracking, edición y mezcla. Esencial para post-producción de audio.",
    img: "https://cdn11.bigcommerce.com/s-4hc0jwsnnq/images/stencil/original/products/2437/8698/360442-96514-Prp-Tools-w-Annual-Upgrade-Plan_3D__82902.1772123168.jpg?c=1",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/PTStudio--avid-pro-tools-studio-annual-subscription", thomann: "https://www.thomann.co.uk/avid_pro_tools_studio.htm", gear4music: "https://www.gear4music.com/Recording-and-Computers/Avid-Pro-Tools-Studio/6OZA", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 114,
    title: "Steinberg Cubase Pro 13",
    title_es: "Steinberg Cubase Pro 13",
    category: "daw",
    price: 579,
    rating: 4.6,
    reviews: 12340,
    badge: "topQuality",
    desc: "The complete music production system. Powerful MIDI editing, VariAudio pitch correction, advanced scoring and notation. MixConsole for professional mixing. Trusted by composers and producers.",
    desc_es: "El sistema completo de producción musical. Edición MIDI potente, corrección de tono VariAudio, notación avanzada. Confiado por compositores y productores.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/540683.jpg",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/CubasePro13--steinberg-cubase-pro-13-music-production-software", thomann: "https://www.thomann.co.uk/steinberg_cubase_pro_13.htm", gear4music: "https://www.gear4music.com/Recording-and-Computers/Steinberg-Cubase-Pro-13/6OZA", musikproduktiv: "https://www.musik-produktiv.de/search" }
  },
  {
    id: 115,
    title: "PreSonus Studio One Pro 7",
    title_es: "PreSonus Studio One Pro 7",
    category: "daw",
    price: 399,
    rating: 4.5,
    reviews: 8901,
    badge: "topQuality",
    desc: "The fastest workflow in a DAW. Drag-and-drop everything, intuitive arranging, built-in Melodyne integration, and powerful mixing tools. Smart Templates for quick starts. Growing rapidly in popularity.",
    desc_es: "El flujo de trabajo más rápido en un DAW. Arrastra y suelta todo, integración Melodyne incorporada. Plantillas inteligentes para inicio rápido.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/540683.jpg",
    stores: { sweetwater: "https://www.sweetwater.com/store/detail/StudioOne7Pro--presonus-studio-one-pro-7-music-production-software", thomann: "https://www.thomann.co.uk/presonus_studio_one_pro_7.htm", gear4music: "https://www.gear4music.com/Recording-and-Computers/Studio-One-Pro-7/6OZA", musikproduktiv: "https://www.musik-produktiv.de/search" }
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
  daw: { name: "DAW", icon: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>', desc: "Digital Audio Workstations for music production." },
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
