const products = [
  // ===== MICROPHONES =====
  {
    id: 1,
    title: "Shure SM7B",
    category: "microphones",
    price: 399,
    rating: 4.8,
    reviews: 18453,
    badge: "legend",
    desc: "The industry-standard dynamic microphone for broadcast, podcasting, and vocal recording. Warm, smooth sound with excellent rejection.",
    img: "https://media.sweetwater.com/m/products/image/6d2c512a92Rov0eryrfK2jdkFSLhFkOUiy3nNCLK.jpg?quality=82&width=1080&height=1080&fit=bounds&canvas=1080%2C1080&ha=6d2c512a928017f5",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/SM7B--shure-sm7b-cardioid-dynamic-vocal-microphone",
      thomann: "https://www.thomann.de/intl/shure_sm7b.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 2,
    title: "Neumann U 87 Ai",
    category: "microphones",
    price: 3599,
    rating: 4.9,
    reviews: 3456,
    badge: "premium",
    desc: "The world's most famous studio condenser microphone. Used on countless hit records. Three polar patterns, 10dB pad, and legendary Neumann sound.",
    img: "https://media.sweetwater.com/m/products/image/f759b6ae09I6HOqlkPqK2z6BNiVZitPMA6qDgFfQ.jpg?quality=82&width=1080&height=1080&fit=bounds&canvas=1080%2C1080&ha=f759b6ae09fda8c7",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/U87Ai--neumann-u-87-ai-large-diaphragm-condenser-microphone-nickel",
      thomann: "https://www.thomann.de/intl/neumann_u_87_ai.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 3,
    title: "Rode NT1-A",
    category: "microphones",
    price: 269,
    rating: 4.6,
    reviews: 21345,
    badge: "bestSeller",
    desc: "The world's quietest studio condenser microphone. Pristine audio quality with a warm, smooth character. Includes shock mount and pop filter.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/235937.jpg",
    stores: {
      thomann: "https://www.thomann.de/intl/rode_nt1_a.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 4,
    title: "AKG C414 XLII",
    category: "microphones",
    price: 1099,
    rating: 4.7,
    reviews: 5678,
    badge: "topQuality",
    desc: "Versatile large-diaphragm condenser with 5 polar patterns. From vocals to piano, the C414 handles it all with breathtaking detail.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/240602.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/C414XLII--akg-c414-xlii-large-diaphragm-condenser-microphone",
      thomann: "https://www.thomann.de/intl/akg_c414_xlii.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 5,
    title: "Shure SM57",
    category: "microphones",
    price: 99,
    rating: 4.7,
    reviews: 45210,
    badge: "legend",
    desc: "The most recorded instrument microphone in history. Indestructible, affordable, and incredible on guitar cabs, snares, and horns.",
    img: "https://media.sweetwater.com/m/products/image/8cc557164ei09SdpOiJJ8j2UgW5tRIRPcRVVipe6.jpg?quality=82&width=1080&height=1080&fit=bounds&canvas=1080%2C1080&ha=8cc557164e165612",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/SM57--shure-sm57-cardioid-dynamic-instrument-microphone",
      thomann: "https://www.thomann.de/intl/shure_sm57.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },

  // ===== GUITARS =====
  {
    id: 6,
    title: "Fender American Professional II Stratocaster",
    category: "guitars",
    price: 1799,
    rating: 4.8,
    reviews: 7890,
    badge: "bestSeller",
    desc: "The iconic Stratocaster, refined. V-Mod II pickups, Deep C neck profile, and a sleek satin finish. From blues to pop, it's the sound of modern music.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/500467.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/StratAP2MMB--fender-american-professional-ii-stratocaster-miami-blue-with-maple-fingerboard",
      thomann: "https://www.thomann.de/intl/fender_american_pro_ii_strat.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 7,
    title: "Gibson Les Paul Standard '60s",
    category: "guitars",
    price: 2699,
    rating: 4.9,
    reviews: 4567,
    badge: "premium",
    desc: "The ultimate rock machine. Burstbucker pickups, mahogany body with maple top, and that unmistakable Les Paul sustain.",
    img: "https://media.sweetwater.com/m/products/image/7f6aefa01649sOZjanoDlBOmYlvvPxgDS7FfbIng.jpg?quality=82&width=1080&height=1080&fit=bounds&canvas=1080%2C1080&ha=7f6aefa01626914a",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/LPS6ITNH--gibson-les-paul-standard-60s-iced-tea",
      thomann: "https://www.thomann.de/intl/gibson_les_paul_standard_60s.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 8,
    title: "Taylor 314ce",
    category: "guitars",
    price: 1899,
    rating: 4.7,
    reviews: 3456,
    badge: "topQuality",
    desc: "A masterpiece of acoustic craftsmanship. Solid Sitka spruce top, Tasmanian blackwood back and sides, and Taylor's legendary playability.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/443306.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/314ceVClNMB--taylor-314ce-v-class-grand-auditorium-acoustic-electric-guitar-natural",
      thomann: "https://www.thomann.de/intl/taylor_314ce.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 9,
    title: "Ibanez RG550 Genesis",
    category: "guitars",
    price: 999,
    rating: 4.6,
    reviews: 6789,
    badge: "recommended",
    desc: "The original shred machine. Super Wizard neck, Edge tremolo, and DiMarzio pickups. Made for speed and precision.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/429087.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/RG550EB--ibanez-genesis-collection-rg550-electric-guitar-electric-blue",
      thomann: "https://www.thomann.de/intl/ibanez_rg550_genesis.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 10,
    title: "PRS McCarty 594",
    category: "guitars",
    price: 4299,
    rating: 4.9,
    reviews: 2345,
    badge: "premium",
    desc: "Paul Reed Smith's tribute to the golden era of electric guitars. 58/15 LT pickups, pattern vintage neck, and impeccable build quality.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/581957.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/MC59410BGWBst--prs-mccarty-594-10-top-electric-guitar-black-gold-wraparound-burst",
      thomann: "https://www.thomann.de/intl/prs_mccarty_594.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },

  // ===== KEYBOARDS =====
  {
    id: 11,
    title: "Nord Stage 4 88",
    category: "keyboards",
    price: 4999,
    rating: 4.9,
    reviews: 1890,
    badge: "premium",
    desc: "The ultimate stage piano. Triple Sensor keybed, seamless transitions, and Nord's legendary piano, organ, and synth engines in one instrument.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/560977.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/Stage4-88--nord-stage-4-88-stage-keyboard",
      thomann: "https://www.thomann.de/intl/nord_stage_4_88.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 12,
    title: "Yamaha Montage M8x",
    category: "keyboards",
    price: 4699,
    rating: 4.8,
    reviews: 1567,
    badge: "premium",
    desc: "Flagship synthesizer with AN-X and FM-X engines. 88-key weighted action, motion control, and seamless DAW integration.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/629663.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/MontageM8X--yamaha-montage-m8x-88-key-synthesizer",
      thomann: "https://www.thomann.de/intl/yamaha_montage_m8x.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 13,
    title: "Arturia KeyLab Essential 61 MkIII",
    category: "keyboards",
    price: 299,
    rating: 4.5,
    reviews: 12345,
    badge: "bestSeller",
    desc: "The ultimate DAW controller. Deep integration with Analog Lab, Ableton Live, and Logic. 61 velocity-sensitive keys with polyphonic aftertouch.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/567153.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/KeyLabEss3-61--arturia-keylab-essential-mk3-61-key-keyboard-controller-white",
      thomann: "https://www.thomann.de/intl/arturia_keylab_essential_61_mk3.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 14,
    title: "Native Instruments Komplete Kontrol S61",
    category: "keyboards",
    price: 599,
    rating: 4.6,
    reviews: 6789,
    badge: "recommended",
    desc: "Smart keyboard controller with NI ecosystem integration. Light guide, NKS browsing, and premium Fatar keybed.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/570926.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/KontS3-61--native-instruments-kontrol-s61-mk3-61-key-smart-keyboard-controller",
      thomann: "https://www.thomann.de/intl/native_instruments_komplete_kontrol_s61.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },

  // ===== INTERFACES =====
  {
    id: 15,
    title: "Focusrite Scarlett 2i2 4th Gen",
    category: "interfaces",
    price: 199,
    rating: 4.7,
    reviews: 34567,
    badge: "bestSeller",
    desc: "The world's best-selling audio interface just got better. 120dB dynamic range, Air mode, and Loopback for streaming. Studio-grade conversion.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/566684.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/Scar2i2G4--focusrite-scarlett-2i2-4th-gen-usb-audio-interface",
      thomann: "https://www.thomann.de/intl/focusrite_scarlett_2i2_4th_generation.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Focusrite-Scarlett-2i2-4th-Gen-Audio-Interface/5O8G"
    }
  },
  {
    id: 16,
    title: "Universal Audio Apollo Twin X",
    category: "interfaces",
    price: 899,
    rating: 4.8,
    reviews: 5678,
    badge: "premium",
    desc: "Professional-grade Thunderbolt interface with UAD DSP processing. Real-time UAD plugins with near-zero latency. Unison preamps.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/571436.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/ApolloTXDHE--universal-audio-apollo-twin-by-duo-heritage-edition-10x6-thunderbolt-audio-interface-with-uad-dsp",
      thomann: "https://www.thomann.de/intl/universal_audio_apollo_twin_x.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 17,
    title: "RME Babyface Pro FS",
    category: "interfaces",
    price: 949,
    rating: 4.9,
    reviews: 3456,
    badge: "topQuality",
    desc: "The gold standard for portable recording. Legendary RME drivers, SteadyClock FS jitter suppression, and pristine AD/DA conversion.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/476426.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/BabyfaceProFS--rme-babyface-pro-fs-24-channel-usb-audio-interface",
      thomann: "https://www.thomann.de/intl/rme_babyface_pro_fs.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 18,
    title: "SSL 2+",
    category: "interfaces",
    price: 299,
    rating: 4.7,
    reviews: 8901,
    badge: "recommended",
    desc: "Solid State Logic in an interface. Legendary SSL 4K preamps, Legacy 4K analogue channel strip, and professional monitoring features.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/601306.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/SSL2Plus--solid-state-logic-ssl2-usb-audio-interface",
      thomann: "https://www.thomann.co.uk/ssl_2_mkii_601306.htm",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/SSL-2and-MKII-2-Channel-USB-Audio-Interface/6OZA"
    }
  },

  // ===== MONITORS =====
  {
    id: 19,
    title: "Yamaha HS8",
    category: "monitors",
    price: 698,
    rating: 4.7,
    reviews: 12345,
    badge: "bestSeller",
    desc: "The industry standard for mixing. 8-inch cone woofer with Kevlar coating, 1-inch dome tweeter, and room control for accurate monitoring.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/315822.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/HS8pr--yamaha-hs8-8-inch-powered-studio-monitor-pair-black",
      thomann: "https://www.thomann.de/intl/yamaha_hs8_pair.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 20,
    title: "KRK Rokit 7 G4",
    category: "monitors",
    price: 498,
    rating: 4.5,
    reviews: 18907,
    badge: "recommended",
    desc: "Professional bi-amped studio monitors with Kevlar drivers, DSP-driven EQ, and a front-firing bass port ideal for smaller studios.",
    img: "https://images.unsplash.com/photo-1589003077984-c0ce2b4ee964?w=400&h=300&fit=crop",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/Rokit7G5Pr--krk-rokit-7-g5-7-inch-powered-studio-monitor-pair-black",
      thomann: "https://www.thomann.de/intl/krk_rokit_7_g4_pair.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 21,
    title: "Adam Audio A7V",
    category: "monitors",
    price: 799,
    rating: 4.8,
    reviews: 4567,
    badge: "premium",
    desc: "Cutting-edge 2-way monitor with S-ART folded ribbon tweeter. Unmatched transient response, deep bass, and 3D imaging.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/540683.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/A7V--adam-audio-a7v-7-inch-powered-studio-monitor",
      thomann: "https://www.thomann.de/intl/adam_audio_a7v.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 22,
    title: "Genelec 8040B",
    category: "monitors",
    price: 1198,
    rating: 4.9,
    reviews: 2345,
    badge: "premium",
    desc: "Finnish precision at its finest. 6.5-inch woofer, metal dome tweeter, and Genelec's renowned Directivity Control waveguide.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/311111.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/8040BPM--genelec-8040b-6.5-inch-powered-studio-monitor",
      thomann: "https://www.thomann.de/intl/genelec_8040b_pair.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },

  // ===== HEADPHONES =====
  {
    id: 23,
    title: "Beyerdynamic DT 770 Pro",
    category: "headphones",
    price: 159,
    rating: 4.7,
    reviews: 32109,
    badge: "legend",
    desc: "The studio standard for closed-back monitoring. 250 Ohm drivers, velour ear pads, and exceptional comfort for marathon sessions.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/109340.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/DT770pro80--beyerdynamic-dt-770-pro-80-ohm-closed-back-studio-mixing-headphones",
      thomann: "https://www.thomann.de/intl/beyerdynamic_dt_770_pro_250.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 24,
    title: "Sennheiser HD 600",
    category: "headphones",
    price: 399,
    rating: 4.8,
    reviews: 18907,
    badge: "legend",
    desc: "Audiophile open-back reference headphones. Natural, neutral sound with incredible detail. The mixing engineer's choice for critical listening.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/471751.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/HD600--sennheiser-hd-600-open-back-audiophile-professional-headphones",
      thomann: "https://www.thomann.de/intl/sennheiser_hd_600.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 25,
    title: "Audio-Technica ATH-M50x",
    category: "headphones",
    price: 169,
    rating: 4.6,
    reviews: 45678,
    badge: "bestSeller",
    desc: "The most popular studio headphones in the world. Critically acclaimed clarity, deep bass, and collapsible design for portability.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/331905.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/ATHM50x--audio-technica-ath-m50x-closed-back-studio-monitoring-headphones",
      thomann: "https://www.thomann.de/intl/audio_technica_ath_m50x.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 26,
    title: "Sony MDR-7506",
    category: "headphones",
    price: 99,
    rating: 4.5,
    reviews: 56789,
    badge: "legend",
    desc: "The broadcast standard since 1991. Closed-back, collapsible, and incredibly reliable. Trusted by professionals worldwide.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/135709.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/MDR7506--sony-mdr-7506-closed-back-professional-headphones",
      thomann: "https://www.thomann.de/intl/sony_mdr_7506.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },

  // ===== PLUGINS =====
  {
    id: 27,
    title: "Xfer Serum 2",
    category: "plugins",
    price: 249,
    rating: 4.9,
    reviews: 23456,
    badge: "bestSeller",
    desc: "The legendary wavetable synthesizer, reborn. Five oscillator types, granular synthesis, spectral resynthesis, and a rebuilt engine. Free lifetime updates.",
    img: "https://images.unsplash.com/photo-1511376777868-611b54f68947?w=400&h=300&fit=crop",
    stores: {
      pluginboutique: "https://www.pluginboutique.com/search?q=serum",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 28,
    title: "Native Instruments Kontakt 7",
    category: "plugins",
    price: 399,
    rating: 4.8,
    reviews: 18907,
    badge: "premium",
    desc: "The world's leading sampler platform. 900+ instruments, revamped factory library from Orchestral Tools, and powerful sound design engine.",
    img: "https://images.unsplash.com/photo-1493219686142-5a8641badc78?w=400&h=300&fit=crop",
    stores: {
      pluginboutique: "https://www.pluginboutique.com/product/1-Instruments/55-Kontakt-Instrument/11439-Kontakt-7-Crossgrade-from-Komplete-Select-10-14",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 29,
    title: "FabFilter Total Bundle",
    category: "plugins",
    price: 1069,
    rating: 4.9,
    reviews: 12345,
    badge: "premium",
    desc: "The ultimate mixing and mastering toolkit. Pro-Q 4, Pro-C 3, Pro-L 2, Pro-R 2, Saturn 2, Timeless 3, Volcano 3, Twin 3, and more.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/340870.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/FFTotalBun--fabfilter-total-plug-in-bundle",
      pluginboutique: "https://www.pluginboutique.com/product/1-Instruments/57-Complete-Collection/16649-FabFilter-Total-Bundle",
      thomann: "https://www.thomann.de/intl/fabfilter_total_bundle.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 30,
    title: "iZotope Ozone 12 Advanced",
    category: "plugins",
    price: 499,
    rating: 4.7,
    reviews: 8901,
    badge: "topQuality",
    desc: "Next-gen AI-powered mastering suite. 20 pro modules including Stem EQ, Clarity, Stabilizer, and improved stem splitting with neural networks.",
    img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/Ozone12Ad--izotope-ozone-12-advanced-mastering-software-suite",
      pluginboutique: "https://www.pluginboutique.com/product/2-Effects/52-Mastering-Suite/15503-Ozone-12-Advanced",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 31,
    title: "ValhallaDSP ValhallaRoom",
    category: "plugins",
    price: 50,
    rating: 4.8,
    reviews: 15678,
    badge: "recommended",
    desc: "World-class algorithmic reverb at an unbeatable price. 12 original algorithms from tight ambiences to vast modulated spaces.",
    img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
    stores: {
      pluginboutique: "https://valhalladsp.com/shop/reverb/valhalla-room/",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 32,
    title: "Soundtoys 5.5 Bundle",
    category: "plugins",
    price: 599,
    rating: 4.8,
    reviews: 6789,
    badge: "topQuality",
    desc: "23 iconic effects including Decapitator, EchoBoy, Little AlterBoy, SuperPlate, SpaceBlender, and Effect Rack. The creative producer's toolbox.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/271867.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/Soundtoys5--soundtoys-5-plug-in-bundle-download",
      pluginboutique: "https://www.pluginboutique.com/product/81-Bundles/89-Complete-Collection/15254-Soundtoys-5-5",
      gear4music: "https://www.gear4music.com/search"
    }
  },

  // ===== PERCUSSION =====
  {
    id: 33,
    title: "Roland TR-8S",
    category: "percussion",
    price: 749,
    rating: 4.7,
    reviews: 4567,
    badge: "topQuality",
    desc: "The ultimate rhythm machine. Authentic 808, 909, and 707 sounds combined with sample import and advanced sequencing.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/434284.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/TR8S--roland-tr-8s-rhythm-performer",
      thomann: "https://www.thomann.de/intl/roland_tr_8s.htm",
      gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Roland-TR-8S-Rhythm-Performer/2D82"
    }
  },
  {
    id: 34,
    title: "Akai MPC One+",
    category: "percussion",
    price: 499,
    rating: 4.6,
    reviews: 5678,
    badge: "bestSeller",
    desc: "Beat-making powerhouse with Wi-Fi and Bluetooth. 7-inch touchscreen, 16 velocity-sensitive pads, and the legendary MPC workflow.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/567619.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/MPCOnePlus--akai-professional-mpc-one-plus-standalone-sampler-and-sequencer",
      thomann: "https://www.thomann.de/intl/akai_mpc_one_plus.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 35,
    title: "Zildjian K Custom Dark Pack",
    category: "percussion",
    price: 1499,
    rating: 4.8,
    reviews: 2345,
    badge: "premium",
    desc: "Hand-hammered Turkish cymbals with warm, complex tones. Includes 14-inch hi-hats, 16-inch + 18-inch crashes, and 20-inch ride.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/374175.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/KCD900--zildjian-k-custom-dark-4-piece-cymbal-pack",
      thomann: "https://www.thomann.de/intl/zildjian_k_custom_dark_pack.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 36,
    title: "Tama Starclassic Walnut/Birch",
    category: "percussion",
    price: 2499,
    rating: 4.9,
    reviews: 1234,
    badge: "premium",
    desc: "Professional-grade drum kit with walnut/birch shells. Incredible depth, attack, and resonance. Perfect for studio and stage.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/361976.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/WBS42SMBR--tama-starclassic-walnut-birch-lacquer-4-piece-shell-pack-molten-brown-burst",
      thomann: "https://www.thomann.de/intl/tama_starclassic_walnut_birch.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },

  // ===== ACCESSORIES =====
  {
    id: 37,
    title: "König & Meyer 210/2 Mic Stand",
    category: "accessories",
    price: 49,
    rating: 4.6,
    reviews: 12345,
    badge: "recommended",
    desc: "German-engineered tripod mic stand with telescopic boom arm. Heavy-duty zinc die-cast base for rock-solid stability.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/104941.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/KM21020BK--k-and-m-210-2-microphone-stand-with-fixed-boom-black",
      thomann: "https://www.thomann.de/intl/k&m_210_2.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 38,
    title: "Mogami Gold Studio XLR Cable (3m)",
    category: "accessories",
    price: 39,
    rating: 4.7,
    reviews: 8901,
    badge: "topQuality",
    desc: "The industry standard for studio cabling. Neglex OFC conductors, REAN connectors, and legendary Mogami reliability.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/117500.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/GoldStu10--mogami-gold-studio-microphone-cable-10-foot-xlr-xlr",
      thomann: "https://www.thomann.de/intl/mogami_gold_studio_xlr.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 39,
    title: "Stedman Proscreen XL Pop Filter",
    category: "accessories",
    price: 49,
    rating: 4.5,
    reviews: 5678,
    badge: null,
    desc: "Professional metal mesh pop filter. Dual-layer screen eliminates plosives without high-frequency loss. Adjustable goose-neck stand.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/561297.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/StedmanXL--stedman-corporation-proscreen-xl-black",
      thomann: "https://www.thomann.de/intl/stedman_proscreen_xl.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 40,
    title: "Auralex Studiofoam Wedges (12pk)",
    category: "accessories",
    price: 199,
    rating: 4.4,
    reviews: 4321,
    badge: null,
    desc: "Professional acoustic treatment. 2-inch wedge foam panels reduce flutter echo and improve room acoustics. Includes adhesive.",
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop",
    stores: {
      thomann: "https://www.thomann.de/intl/auralex_studiofoam_wedges.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 41,
    title: "Gator Cases 61-Key Keyboard Case",
    category: "accessories",
    price: 179,
    rating: 4.6,
    reviews: 3456,
    badge: null,
    desc: "ATA-approved molded case with EPS foam interior. Heavy-duty hardware, recessed latches, and wheels for easy transport.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/409664.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/GK61--gator-gk-61-semi-rigid-keyboard-case",
      thomann: "https://www.thomann.de/intl/gator_cases_61_key.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 42,
    title: "SSL UF8 DAW Controller",
    category: "accessories",
    price: 1199,
    rating: 4.7,
    reviews: 2345,
    badge: "premium",
    desc: "8-channel motorized fader controller with SSL's legendary console workflow. Touch-sensitive faders, MCU/HUI protocol, and premium build.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/508557.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/UF8control--solid-state-logic-uf8-advanced-daw-controller",
      thomann: "https://www.thomann.de/intl/ssl_uf8.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 43,
    title: "Shure A25D Mic Clip",
    category: "accessories",
    price: 12,
    rating: 4.7,
    reviews: 9800,
    badge: null,
    desc: "The go-to clip for SM57 and SM58. Break-resistant shockmount clip that fits all standard mic stands. Essential spare for any gig bag.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/111585.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/A25D--shure-a25d-microphone-clip",
      thomann: "https://www.thomann.de/intl/shure_a25d.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 44,
    title: "Mogami Gold Instrument Cable (3m)",
    category: "accessories",
    price: 45,
    rating: 4.7,
    reviews: 7800,
    badge: "topQuality",
    desc: "Premium Neglex OFC cable with REAN connectors. Ultra-low capacitance for transparent signal with zero hum or handling noise.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/117502.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/GoldInstr10--mogami-gold-instrument-cable-10-foot-straight-straight",
      thomann: "https://www.thomann.de/intl/mogami_gold_instrument.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 45,
    title: "Gator GBE-ELECTRIC Guitar Bag",
    category: "accessories",
    price: 39,
    rating: 4.5,
    reviews: 6500,
    badge: null,
    desc: "Padded gig bag for electric guitars. Rip-resistant nylon with 10mm foam padding, accessory pocket, and backpack straps.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/266736.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/GBEElec--gator-gbe-elec-gig-bag-for-electric-guitar",
      thomann: "https://www.thomann.de/intl/gator_gbe_electric.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 46,
    title: "Gator GBE-BASS Bass Guitar Bag",
    category: "accessories",
    price: 45,
    rating: 4.5,
    reviews: 4500,
    badge: null,
    desc: "Heavy-duty padded gig bag for bass guitars. Extra-long to fit full-scale basses with 15mm foam padding and reinforced headstock area.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/266738.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/GBEBass--gator-gbe-bass-gig-bag-for-bass-guitar",
      thomann: "https://www.thomann.de/intl/gator_gbe_bass.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 47,
    title: "Gator GWE-Acou Hard Shell Acoustic Case",
    category: "accessories",
    price: 129,
    rating: 4.6,
    reviews: 3200,
    badge: "recommended",
    desc: "Deluxe ABS hard shell case for acoustic guitars. TSA-approved latches, plush interior, and storage compartment. ATA-ready for air travel.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/296591.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/GWAcoustic--gator-gwe-acoustic-hardshell-case-for-acoustic-guitar",
      thomann: "https://www.thomann.de/intl/gator_gwe_acou.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  },
  {
    id: 48,
    title: "König & Meyer 26725 Monitor Stand",
    category: "accessories",
    price: 89,
    rating: 4.5,
    reviews: 5400,
    badge: null,
    desc: "Heavy-duty steel monitor stands (pair). Height-adjustable with adjustable spikes for decoupling. Supports up to 35 kg per stand.",
    img: "https://thumbs.static-thomann.de/thumb/thumb600x600/pics/prod/121296.jpg",
    stores: {
      sweetwater: "https://www.sweetwater.com/store/detail/KM26725--konig-and-meyer-26725-monitor-stand-with-floor-spikes-pair",
      thomann: "https://www.thomann.de/intl/km_26725.htm",
      gear4music: "https://www.gear4music.com/search"
    }
  }
];

const categoryInfo = {
  microphones: { name: "Microphones", icon: '<i class="fa-solid fa-microphone"></i>', desc: "Capture every nuance with the best microphones for studio, broadcast, and stage." },
  guitars: { name: "Guitars", icon: '<i class="fa-solid fa-guitar"></i>', desc: "From strats to acoustics, find your perfect axe." },
  strings: { name: "Strings", icon: '<i class="fa-solid fa-guitar"></i>', desc: "Guitars, basses, and everything with strings." },
  keyboards: { name: "Keyboards", icon: '<i class="fa-solid fa-keyboard"></i>', desc: "Pianos, synths, and controllers for every player." },
  interfaces: { name: "Interfaces", icon: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="5" width="22" height="14" rx="2"/><rect x="4" y="9" width="3" height="6" rx="0.8" fill="currentColor" opacity="0.6"/><circle cx="14" cy="12" r="3"/><circle cx="14" cy="12" r="1.2" fill="currentColor"/><rect x="19" y="10" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.6"/></svg>', desc: "Connect your sound with pristine audio conversion." },
  monitors: { name: "Monitors", icon: '<i class="fa-solid fa-volume-high"></i>', desc: "Hear the truth with professional studio monitoring." },
  headphones: { name: "Headphones", icon: '<i class="fa-solid fa-headphones"></i>', desc: "Critical listening and mixing on the go." },
  plugins: { name: "Plugins", icon: '<i class="fa-solid fa-sliders"></i>', desc: "Virtual instruments and effects for your DAW." },
  accessories: { name: "Accessories", icon: '<i class="fa-solid fa-wrench"></i>', desc: "Cables, stands, cases, and studio treatment." }
};

const storeNames = {
  thomann: "Thomann",
  pluginboutique: "Plugin Boutique",
  loopmasters: "Loopmasters",
  gear4music: "Gear4Music",
  sweetwater: "Sweetwater"
};

const storeColors = {
  thomann: "#3b82f6",
  pluginboutique: "#6366f1",
  loopmasters: "#475569",
  gear4music: "#8b5cf6",
  sweetwater: "#6b7280"
};

const storeIcons = {
  thomann: '<img src="img/thomann-icon.png" alt="Thomann" class="store-icon-img">',
  pluginboutique: '<img src="img/pluginboutique-icon.png" alt="Plugin Boutique" class="store-icon-img">',
  loopmasters: '<i class="fa-solid fa-arrows-rotate"></i>',
  gear4music: '<img src="img/gear4music-icon.png" alt="Gear4Music" class="store-icon-img">',
  sweetwater: '<img src="img/sweetwater-icon.png" alt="Sweetwater" class="store-icon-img">'
};
