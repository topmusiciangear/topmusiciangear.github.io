const fs = require('fs');
const file = 'build-guides.js';
let c = fs.readFileSync(file, 'utf8');

// Fix 1: ID 20 (line 330) - duplicate oos + andertons outside prices
c = c.replace(
  /20: \{ prices: \{[^}]+musicstore: "€266\.00"[^}]*\} , oos: \['andertons'\] , oos: \['andertons'\] , andertons: '£199\.00' \}/,
  `20: { prices: { amazon: '$269.00', zzounds: '$269.00', reverb: "$269.00", gear4music: "£199.25", musicstore: "€266.00" }, oos: ['andertons'] }`
);

// Fix 2: ID 22 (line 333) - musicstore outside prices
c = c.replace(
  /22: \{ prices: \{  reverb: "\$1175\.00",amazon: '\$1175\.00',  andertons: '£959\.00'  ,\n\s+gear4music: "£812\.00"\} , oos: \['zzounds'\] , musicstore: "€879\.00" \}/,
  `22: { prices: { reverb: "$1175.00",amazon: '$1175.00', andertons: '£959.00', gear4music: "£812.00", musicstore: "€879.00" }, oos: ['zzounds'] }`
);

// Fix 3: ID 23 (line 335) - musicstore outside prices
c = c.replace(
  /23: \{ prices: \{  reverb: "\$199\.99",amazon: '\$199\.99', andertons: '£129\.00'  ,\n\s+gear4music: "£129\.00"\} , oos: \['zzounds'\] , musicstore: "€149\.00" \}/,
  `23: { prices: { reverb: "$199.99",amazon: '$199.99', andertons: '£129.00', gear4music: "£129.00", musicstore: "€149.00" }, oos: ['zzounds'] }`
);

// Fix 4: ID 39 (line 352) - duplicate gear4music + musicstore outside prices
c = c.replace(
  /39: \{ prices: \{  amazon: 'na'  , andertons: '£42\.00'  ,\n\s+gear4music: "£53\.50",\n\s+gear4music: "£53\.50"\} , oos: \['zzounds'\] , musicstore: "€148\.00" \}/,
  `39: { prices: { amazon: 'na', andertons: '£42.00', gear4music: "£53.50", musicstore: "€148.00" }, oos: ['zzounds'] }`
);

// Fix 5: ID 57 (line 364) - musicstore outside prices
c = c.replace(
  /57: \{ prices: \{  reverb: "\$139\.80",amazon: '\$139\.80',  andertons: '£134\.00'  ,\n\s+gear4music: "£125\.00"\} , oos: \['zzounds'\] , musicstore: "€144\.50" \}/,
  `57: { prices: { reverb: "$139.80",amazon: '$139.80', andertons: '£134.00', gear4music: "£125.00", musicstore: "€144.50" }, oos: ['zzounds'] }`
);

// Fix 6: ID 66 (line 381) - musicstore outside prices
c = c.replace(
  /66: \{ prices: \{  reverb: "\$849\.99", amazon: '\$849\.99'  ,\n\s+gear4music: "£859\.00"\} , oos: \['zzounds', 'andertons'\] , musicstore: '€755\.50'\}/,
  `66: { prices: { reverb: "$849.99", amazon: '$849.99', gear4music: "£859.00", musicstore: '€755.50' }, oos: ['zzounds', 'andertons'] }`
);

// Fix 7: ID 67 (line 383) - musicstore outside prices
c = c.replace(
  /67: \{ prices: \{  reverb: "\$849\.99", amazon: '\$849\.99'  ,\n\s+gear4music: "£799\.00"\} , oos: \['zzounds', 'andertons'\] , musicstore: '€948\.70'\}/,
  `67: { prices: { reverb: "$849.99", amazon: '$849.99', gear4music: "£799.00", musicstore: '€948.70' }, oos: ['zzounds', 'andertons'] }`
);

// Fix 8: ID 93 (line 400) - musicstore outside prices
c = c.replace(
  /93: \{ prices: \{  reverb: "\$2499\.00",amazon: '\$2499\.00',  zzounds: '\$1,099\.00'  ,\n\s+gear4music: "£845\.00"\} , oos: \['andertons'\] , musicstore: "€675\.00" \}/,
  `93: { prices: { reverb: "$2499.00",amazon: '$2499.00', zzounds: '$1,099.00', gear4music: "£845.00", musicstore: "€675.00" }, oos: ['andertons'] }`
);

// Fix 9: Remove duplicate ID 8 at line 427 (keep the first at line 313 which has musicstore inside prices)
c = c.replace(
  /\n8: \{ prices: \{ reverb: "\$2,499\.00",amazon: '\$2,499\.00' \} , andertons: '£2,299\.00' \},\n/,
  '\n'
);

// Fix 10: ID 195 (line 439) - duplicate oos
c = c.replace(
  /195: \{ prices: \{  reverb: "\$149\.99",amazon: '\$149\.99'  \}, oos: \['gear4music'\] , oos: \['andertons'\] \}/,
  `195: { prices: { reverb: "$149.99",amazon: '$149.99' }, oos: ['gear4music', 'andertons'] }`
);

// Fix 11: ID 141 (line 516) - musicstore outside prices
c = c.replace(
  /141: \{ prices: \{  reverb: "\$649\.99", amazon: '\$649\.99'  , andertons: '£589\.00'  , gear4music: "£584\.00"\} , oos: \['zzounds'\] , musicstore: "€520\.00" \}/,
  `141: { prices: { reverb: "$649.99", amazon: '$649.99', andertons: '£589.00', gear4music: "£584.00", musicstore: "€520.00" }, oos: ['zzounds'] }`
);

// Fix 12: ID 145 (line 521) - musicstore outside prices
c = c.replace(
  /145: \{ prices: \{  reverb: "\$509\.00",amazon: '\$509\.00', andertons: '£315\.00'  ,\n\s+gear4music: "£315\.00"\} , oos: \['zzounds'\] , musicstore: "€155\.00" \}/,
  `145: { prices: { reverb: "$509.00",amazon: '$509.00', andertons: '£315.00', gear4music: "£315.00", musicstore: "€155.00" }, oos: ['zzounds'] }`
);

// Fix 13: ID 146 (line 523) - gear4music outside prices
c = c.replace(
  /146: \{ prices: \{  reverb: "\$380\.00",amazon: '\$380\.00',  zzounds: '\$379\.99', andertons: '£281\.00'  \} ,\n\s+gear4music: '£302\.50'\},/,
  `146: { prices: { reverb: "$380.00",amazon: '$380.00', zzounds: '$379.99', andertons: '£281.00', gear4music: '£302.50' } },`
);

// Fix 14: ID 147 (line 525) - gear4music outside prices
c = c.replace(
  /147: \{ prices: \{  reverb: "\$1,099\.99",amazon: '\$1,099\.99', zzounds: '\$1,199\.99', andertons: '£829\.00'  \} ,\n\s+gear4music: '£835'\},/,
  `147: { prices: { reverb: "$1,099.99",amazon: '$1,099.99', zzounds: '$1,199.99', andertons: '£829.00', gear4music: '£835.00' } },`
);

// Fix 15: ID 189 (line 577) - gear4music outside prices
c = c.replace(
  /189: \{ prices: \{  reverb: "\$2,149\.99", amazon: '\$2,149\.99', zzounds: '\$2,149\.99', andertons: '£1,099\.00'  \} ,\n\s+gear4music: '£1,649'\},/,
  `189: { prices: { reverb: "$2,149.99", amazon: '$2,149.99', zzounds: '$2,149.99', andertons: '£1,099.00', gear4music: '£1,649.00' } },`
);

// Fix 16: ID 190 (line 579) - gear4music outside prices
c = c.replace(
  /190: \{ prices: \{  reverb: "\$2749\.00",amazon: '\$2749\.00', zzounds: '\$2,749\.00', andertons: '£1,799\.00'  \} , oos: \['andertons'\] ,\n\s+gear4music: '£1,891'\},/,
  `190: { prices: { reverb: "$2749.00",amazon: '$2749.00', zzounds: '$2,749.00', andertons: '£1,799.00', gear4music: '£1,891.00' }, oos: ['andertons'] },`
);

// Fix 17: ID 226 (line 620) - gear4music outside prices
c = c.replace(
  /226: \{ prices: \{  reverb: "\$179\.00",amazon: '\$179\.00',  zzounds: '\$179\.00'  , andertons: '£125\.00'  , musicstore: "€179\.00" \} ,\n\s+gear4music: '£161\.50'\},/,
  `226: { prices: { reverb: "$179.00",amazon: '$179.00', zzounds: '$179.00', andertons: '£125.00', gear4music: '£161.50', musicstore: "€179.00" } },`
);

// Fix 18: ID 239 (line 640) - gear4music outside prices
c = c.replace(
  /239: \{ prices: \{  reverb: "\$499\.00",amazon: '\$499\.00', zzounds: '\$488\.00', andertons: '£390\.00'  \} ,\n\s+gear4music: '£899'\},/,
  `239: { prices: { reverb: "$499.00",amazon: '$499.00', zzounds: '$488.00', andertons: '£390.00', gear4music: '£899.00' } },`
);

// Fix 19: ID 255 (line 648) - gear4music outside prices
c = c.replace(
  /255: \{ prices: \{  reverb: "\$449\.99",amazon: '\$449\.99',  zzounds: '\$519\.99', andertons: '£452\.00'  \} ,\n\s+gear4music: '£549'\},/,
  `255: { prices: { reverb: "$449.99",amazon: '$449.99', zzounds: '$519.99', andertons: '£452.00', gear4music: '£549.00' } },`
);

// Fix 20: ID 256 (line 650) - gear4music outside prices
c = c.replace(
  /256: \{ prices: \{  reverb: "\$799\.00",amazon: '\$799\.00',  zzounds: '\$799\.00', andertons: '£719\.00'  \} ,\n\s+gear4music: '£829'\},/,
  `256: { prices: { reverb: "$799.00",amazon: '$799.00', zzounds: '$799.00', andertons: '£719.00', gear4music: '£829.00' } },`
);

// Fix 21: ID 267 (line 658) - gear4music outside prices
c = c.replace(
  /267: \{ prices: \{  reverb: "\$989\.00",amazon: '\$989\.00',  zzounds: '\$989\.00', andertons: '£859\.00'  \} ,\n\s+gear4music: '£1,399'\},/,
  `267: { prices: { reverb: "$989.00",amazon: '$989.00', zzounds: '$989.00', andertons: '£859.00', gear4music: '£1,399.00' } },`
);

// Fix 22: ID 269 (line 660) - gear4music outside prices
c = c.replace(
  /269: \{ prices: \{  reverb: "\$989\.00",amazon: '\$989\.00',  zzounds: '\$999\.00', andertons: '£866\.00'  \} ,\n\s+gear4music: '£813'\},/,
  `269: { prices: { reverb: "$989.00",amazon: '$989.00', zzounds: '$999.00', andertons: '£866.00', gear4music: '£813.00' } },`
);

// Fix 23: ID 271 (line 662) - gear4music outside prices
c = c.replace(
  /271: \{ prices: \{  reverb: "\$599\.00",amazon: '\$599\.00',  andertons: '£449\.00'  \} , oos: \['zzounds'\] ,\n\s+gear4music: '£519'\},/,
  `271: { prices: { reverb: "$599.00",amazon: '$599.00', andertons: '£449.00', gear4music: '£519.00' }, oos: ['zzounds'] },`
);

// Fix 24: ID 276 (line 666) - duplicate oos + musicstore outside prices
c = c.replace(
  /276: \{ prices: \{  reverb: "\$69\.99",amazon: '\$69\.99', zzounds: '\$99\.99'  \}, oos: \['gear4music'\] , oos: \['andertons'\] , musicstore: "€89\.00" \}/,
  `276: { prices: { reverb: "$69.99",amazon: '$69.99', zzounds: '$99.99', musicstore: "€89.00" }, oos: ['gear4music', 'andertons'] }`
);

// Fix 25: ID 303 (line 679) - musicstore outside prices
c = c.replace(
  /303: \{ prices: \{  reverb: "\$395\.00",amazon: '\$395\.00',  andertons: '£288\.00'  \} , oos: \['zzounds'\] , musicstore: "€522\.00" \}/,
  `303: { prices: { reverb: "$395.00",amazon: '$395.00', andertons: '£288.00', musicstore: "€522.00" }, oos: ['zzounds'] }`
);

// Fix 26: ID 304 (line 681) - musicstore outside prices
c = c.replace(
  /304: \{ prices: \{  reverb: "\$109\.99", andertons: '£449\.00'  ,\n\s+gear4music: "£249\.99", amazon: '\$599\.00'\} , oos: \['zzounds'\] , musicstore: '€298'\},/,
  `304: { prices: { reverb: "$109.99", andertons: '£449.00', gear4music: "£249.99", amazon: '$599.00', musicstore: '€298.00' }, oos: ['zzounds'] },`
);

// Fix 27: ID 310 (line 688) - gear4music outside prices
c = c.replace(
  /310: \{ prices: \{  reverb: "\$319\.99",amazon: '\$319\.99',  zzounds: '\$319\.99'  \} , oos: \['andertons'\] ,\n\s+gear4music: '£229'\},/,
  `310: { prices: { reverb: "$319.99",amazon: '$319.99', zzounds: '$319.99', gear4music: '£229.00' }, oos: ['andertons'] },`
);

// Fix 28: ID 311 (line 690) - gear4music outside prices
c = c.replace(
  /311: \{ prices: \{  reverb: "\$499\.99",amazon: '\$499\.99',  zzounds: '\$499\.99'  \} , oos: \['andertons'\] ,\n\s+gear4music: '£379'\},/,
  `311: { prices: { reverb: "$499.99",amazon: '$499.99', zzounds: '$499.99', gear4music: '£379.00' }, oos: ['andertons'] },`
);

// Fix 29: ID 312 (line 692) - gear4music outside prices
c = c.replace(
  /312: \{ prices: \{  reverb: "\$949\.00",amazon: '\$949\.00',  zzounds: '\$949\.00', andertons: '£799\.00'  \} ,\n\s+gear4music: '£829'\},/,
  `312: { prices: { reverb: "$949.00",amazon: '$949.00', zzounds: '$949.00', andertons: '£799.00', gear4music: '£829.00' } },`
);

// Fix 30: ID 330 (line 710) - duplicate oos
c = c.replace(
  /330: \{ prices: \{  reverb: "\$20\.99",amazon: '\$20\.99', andertons: '£16\.00'  \}, oos: \['gear4music'\] , oos: \['zzounds'\] \}/,
  `330: { prices: { reverb: "$20.99",amazon: '$20.99', andertons: '£16.00' }, oos: ['gear4music', 'zzounds'] }`
);

// Fix 31: ID 349 (line 733) - gear4music outside prices
c = c.replace(
  /349: \{ prices: \{  zzounds: '\$1,249\.00', andertons: '£899\.00'  , amazon: '\$1,090\.00'\} ,\n\s+gear4music: '£881'\},/,
  `349: { prices: { zzounds: '$1,249.00', andertons: '£899.00', amazon: '$1,090.00', gear4music: '£881.00' } },`
);

// Remove orphan ID 34
c = c.replace(/\n\s+34: \{ oos: \['zzounds'\] \},\n/g, '\n');

fs.writeFileSync(file, c, 'utf8');
console.log('Fixed all 31 issues');
