const fs = require('fs');
const file = 'build-guides.js';
let c = fs.readFileSync(file, 'utf8');

// Music Store price corrections (verified via websearch)
// Rule: multiply en_OT price × 1.19 for incl. VAT (German price)

// ID 65: Fender Player II Jazzmaster - was €2,399, real €709
c = c.replace(/65: \{ prices: \{  reverb: "\$862\.39",amazon: '\$862\.39', zzounds: '\$879\.99', andertons: '£749\.00'  , gear4music: "£739\.00", musicstore: "€2,399\.00" \}/,
  '65: { prices: { reverb: "$862.39",amazon: \'$862.39\', zzounds: \'$879.99\', andertons: \'£749.00\', gear4music: "£739.00", musicstore: "€709.00" } }');

// ID 105: EV ZLX-12P-G2 - was €1,621, real €549
c = c.replace(/105: \{ prices: \{  reverb: "\$549\.00",amazon: '\$549\.00', zzounds: '\$549\.00', andertons: '£436\.00'  , gear4music: "£469\.00", musicstore: "€1,621\.00" \}/,
  '105: { prices: { reverb: "$549.00",amazon: \'$549.00\', zzounds: \'$549.00\', andertons: \'£436.00\', gear4music: "£469.00", musicstore: "€549.00" } }');

// ID 110: Ableton Live 12 Suite - was €3,212, real €503
c = c.replace(/110: \{ prices: \{  reverb: "\$749\.00",amazon: '\$749\.00', andertons: '£599\.00'  , gear4music: "£529\.00", musicstore: "€3,212\.00" \}/,
  '110: { prices: { reverb: "$749.00",amazon: \'$749.00\', andertons: \'£599.00\', gear4music: "£529.00", musicstore: "€503.00" } }');

// ID 136: MXR Phase 95 - was €249, real €125
c = c.replace(/136: \{ prices: \{  reverb: "\$108\.57",amazon: '\$108\.57', zzounds: '\$115\.99', andertons: '£119\.99'  , gear4music: "£111\.00", musicstore: "€249\.00" \}/,
  '136: { prices: { reverb: "$108.57",amazon: \'$108.57\', zzounds: \'$115.99\', andertons: \'£119.99\', gear4music: "£111.00", musicstore: "€125.00" } }');

// ID 210: Sennheiser e906 - was €399, real €152
c = c.replace(/210: \{ prices: \{  reverb: "\$219\.00", amazon: '\$219\.00', zzounds: '\$219\.00', andertons: '£149\.00'  , gear4music: "£149\.50", musicstore: "€399\.00" \}/,
  '210: { prices: { reverb: "$219.00", amazon: \'$219.00\', zzounds: \'$219.00\', andertons: \'£149.00\', gear4music: "£149.50", musicstore: "€152.00" } }');

// ID 212: Shure Beta 52A - was €379, real €176
c = c.replace(/212: \{ prices: \{  reverb: "\$219\.00", amazon: '\$219\.00', zzounds: '\$219\.00', andertons: '£193\.00'  , musicstore: "€379\.00" \}/,
  '212: { prices: { reverb: "$219.00", amazon: \'$219.00\', zzounds: \'$219.00\', andertons: \'£193.00\', musicstore: "€176.00" } }');

// ID 213: Audix D6 - was €379, real €184
c = c.replace(/213: \{ prices: \{  reverb: "\$199\.00", amazon: '\$199\.00', zzounds: '\$199\.00', andertons: '£179\.00'  , gear4music: "£185\.50", musicstore: "€379\.00" \}/,
  '213: { prices: { reverb: "$199.00", amazon: \'$199.00\', zzounds: \'$199.00\', andertons: \'£179.00\', gear4music: "£185.50", musicstore: "€184.00" } }');

// ID 228: Sennheiser e945 - was €399, real €129
c = c.replace(/228: \{ prices: \{  reverb: "\$214\.00",amazon: '\$214\.00',  zzounds: '\$219\.00'  , musicstore: "€399\.00" \}/,
  '228: { prices: { reverb: "$214.00",amazon: \'$214.00\', zzounds: \'$219.00\', musicstore: "€129.00" } }');

// ID 229: Telefunken M80 - was €899, real €265
c = c.replace(/229: \{ prices: \{  reverb: "\$249\.00",amazon: '\$249\.00', zzounds: '\$249\.00'  , andertons: '£249\.00'  , musicstore: "€899\.00" \}/,
  '229: { prices: { reverb: "$249.00",amazon: \'$249.00\', zzounds: \'$249.00\', andertons: \'£249.00\', musicstore: "€265.00" } }');

// ID 232: EV ND86 - was €399, real €159
c = c.replace(/232: \{ prices: \{  reverb: "\$169\.00",amazon: '\$169\.00',  zzounds: '\$169\.00'  , andertons: '£179\.00'  , gear4music: "£136\.00", musicstore: "€399\.00" \}/,
  '232: { prices: { reverb: "$169.00",amazon: \'$169.00\', zzounds: \'$169.00\', andertons: \'£179.00\', gear4music: "£136.00", musicstore: "€159.00" } }');

// ID 297: Rode NT1 Signature - was €392, real €167
c = c.replace(/297: \{ prices: \{ reverb: "\$159\.00", amazon: '\$159\.00', zzounds: '\$146\.00', andertons: '£122\.00', gear4music: "£139\.25", musicstore: "€392\.00" \}/,
  '297: { prices: { reverb: "$159.00", amazon: \'$159.00\', zzounds: \'$146.00\', andertons: \'£122.00\', gear4music: "£139.25", musicstore: "€167.00" } }');

// ID 345: Rode VideoMic NTG - was €449, real €222
c = c.replace(/345: \{ prices: \{  reverb: "\$239\.40",amazon: '\$239\.40',  zzounds: '\$239\.40'  , andertons: '£199\.00'  , musicstore: "€449\.00" \}/,
  '345: { prices: { reverb: "$239.40",amazon: \'$239.40\', zzounds: \'$239.40\', andertons: \'£199.00\', musicstore: "€222.00" } }');

// ID 323 & 324: musicstore prices in USD instead of EUR - fix to EUR
c = c.replace(/323: \{ prices: \{  reverb: "\$99\.00",amazon: '\$99\.00',  zzounds: '\$99\.99', andertons: '£91\.00', gear4music: "£91\.30", musicstore: "\$105\.00"  \}/,
  '323: { prices: { reverb: "$99.00",amazon: \'$99.00\', zzounds: \'$99.99\', andertons: \'£91.00\', gear4music: "£91.30", musicstore: "€125.00" } }');

c = c.replace(/324: \{ prices: \{  reverb: "\$129\.99",amazon: '\$129\.99',  zzounds: '\$129\.99', andertons: '£89\.00', gear4music: "£102\.75", musicstore: "\$116\.00"  \}/,
  '324: { prices: { reverb: "$129.99",amazon: \'$129.99\', zzounds: \'$129.99\', andertons: \'£89.00\', gear4music: "£102.75", musicstore: "€138.00" } }');

fs.writeFileSync(file, c, 'utf8');
console.log('Fixed 14 Music Store prices');
