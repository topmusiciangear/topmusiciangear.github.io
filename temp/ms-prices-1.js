// Confirmed Music Store prices (EUR, with German IVA)
// Format: id: "€XXX.XX"
var prices = {
  // Batch 1 - Microphones
  2: "€2,999.00",   // Neumann U 87 Ai (en_OT €2,520.20 × 1.19)
  33: "€199.00",    // Rode NT1 5th Gen (de_LU)
  4: "€98.00",      // Audio-Technica AT2020 (en_OT €82.40 × 1.19)
  3: "€179.00",     // Audio-Technica AT2035 (fr_FR)
  50: "€105.00",    // Shure SM57 (en_OT €88.24 × 1.19)
  95: "€80.00",     // Sennheiser e 835 (de_AT)
  297: "€398.00",   // AKG C214 (en_OT €334.62 × 1.19)
  339: "€569.00",   // Rode NTG5 (de_LU)

  // Batch 2 - Ribbon/Pro mics
  102: "€3,190.00", // Lewitt LCT 1040 (it_IT)
  364: "€798.00",   // Beyerdynamic M 160 (de_AT)
  365: "€539.00",   // sE Electronics Voodoo VR2 (de_LU)
  366: "€137.00",   // MXL R144 (fr_FR)
  206: "€1,935.00", // Royer R-121 (en_OT €1,625.90 × 1.19)
  207: "€1,279.00", // Coles 4038 (fr_FR)
  51: "€395.00",    // Sennheiser MD 421 Kompakt (de_AT)
  1: "€389.00",     // Shure SM7B (de_LU)
  52: "€522.00",    // Electro-Voice RE20 (en_OT €438.70 × 1.19)

  // Batch 3 - USB/Wireless/Headphones
  291: "€309.00",   // Shure MV7+ (en_OT €259.70 × 1.19)
  303: "€522.00",   // Shure SM7dB (en_OT €438.70 × 1.19)
  292: "€239.00",   // Rode PodMic USB (en_BG €200.70 × 1.19)
  91: "€595.00",    // Shure BLX288/PG58 (en_OT €499.70 × 1.19)
  93: "€675.00",    // Sennheiser EW-D 835-S (en_OT €567.20 × 1.19)
  26: "€89.00",     // Sony MDR-7506 (en_OT €74.80 × 1.19)

  // Batch 4 - Headphones
  10: "€149.00",    // Beyerdynamic DT 770 Pro (en_OT €125.21 × 1.19)
  11: "€333.00",    // Sennheiser HD 490 Pro (de_LU)
  12: "€359.00",    // Sennheiser HD 600 (de_AT €301.50 × 1.19)
};
console.log(JSON.stringify(prices));
