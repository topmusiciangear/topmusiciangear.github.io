const fs = require('fs');
const file = 'build-guides.js';
let c = fs.readFileSync(file, 'utf8');

// ID 20: andertons + oos outside prices
c = c.replace(
  /20: \{ prices: \{ amazon: '\$269\.00', zzounds: '\$269\.00', reverb: "\$269\.00", gear4music: "£199\.25", musicstore: "€266\.00" , oos: \['andertons'\]\}, oos: \['andertons'\] , andertons: '£199\.00' \}/,
  "20: { prices: { amazon: '$269.00', zzounds: '$269.00', reverb: \"$269.00\", gear4music: \"£199.25\", musicstore: \"€266.00\" }, oos: ['andertons'] }"
);

// ID 22: musicstore outside prices  
c = c.replace(
  /22: \{ prices: \{  reverb: "\$1175\.00",amazon: '\$1175\.00',  andertons: '£959\.00'  ,\n\s+gear4music: "£812\.00"\} , oos: \['zzounds'\] , musicstore: "€879\.00" \}/,
  "22: { prices: { reverb: \"$1175.00\",amazon: '$1175.00', andertons: '£959.00', gear4music: \"£812.00\", musicstore: \"€879.00\" }, oos: ['zzounds'] }"
);

// ID 23: musicstore outside prices
c = c.replace(
  /23: \{ prices: \{  reverb: "\$199\.99",amazon: '\$199\.99', andertons: '£129\.00'  ,\n\s+gear4music: "£129\.00"\} , oos: \['zzounds'\] , musicstore: "€149\.00" \}/,
  "23: { prices: { reverb: \"$199.99\",amazon: '$199.99', andertons: '£129.00', gear4music: \"£129.00\", musicstore: \"€149.00\" }, oos: ['zzounds'] }"
);

// ID 39: duplicate gear4music + musicstore outside
c = c.replace(
  /39: \{ prices: \{  amazon: 'na'  , andertons: '£42\.00'  ,\n\s+gear4music: "£53\.50",\n\s+gear4music: "£53\.50"\} , oos: \['zzounds'\] , musicstore: "€148\.00" \}/,
  "39: { prices: { amazon: 'na', andertons: '£42.00', gear4music: \"£53.50\", musicstore: \"€148.00\" }, oos: ['zzounds'] }"
);

// ID 57: musicstore outside prices
c = c.replace(
  /57: \{ prices: \{  reverb: "\$139\.80",amazon: '\$139\.80',  andertons: '£134\.00'  ,\n\s+gear4music: "£125\.00"\} , oos: \['zzounds'\] , musicstore: "€144\.50" \}/,
  "57: { prices: { reverb: \"$139.80\",amazon: '$139.80', andertons: '£134.00', gear4music: \"£125.00\", musicstore: \"€144.50\" }, oos: ['zzounds'] }"
);

// ID 66: musicstore outside prices
c = c.replace(
  /66: \{ prices: \{  reverb: "\$849\.99", amazon: '\$849\.99'  ,\n\s+gear4music: "£859\.00"\} , oos: \['zzounds', 'andertons'\] , musicstore: '€755\.50'\}/,
  "66: { prices: { reverb: \"$849.99\", amazon: '$849.99', gear4music: \"£859.00\", musicstore: '€755.50' }, oos: ['zzounds', 'andertons'] }"
);

// ID 67: musicstore outside prices
c = c.replace(
  /67: \{ prices: \{  reverb: "\$849\.99", amazon: '\$849\.99'  ,\n\s+gear4music: "£799\.00"\} , oos: \['zzounds', 'andertons'\] , musicstore: '€948\.70'\}/,
  "67: { prices: { reverb: \"$849.99\", amazon: '$849.99', gear4music: \"£799.00\", musicstore: '€948.70' }, oos: ['zzounds', 'andertons'] }"
);

// ID 93: musicstore outside prices
c = c.replace(
  /93: \{ prices: \{  reverb: "\$2499\.00",amazon: '\$2499\.00',  zzounds: '\$1,099\.00'  ,\n\s+gear4music: "£845\.00"\} , oos: \['andertons'\] , musicstore: "€675\.00" \}/,
  "93: { prices: { reverb: \"$2499.00\",amazon: '$2499.00', zzounds: '$1,099.00', gear4music: \"£845.00\", musicstore: \"€675.00\" }, oos: ['andertons'] }"
);

// ID 141: musicstore outside prices
c = c.replace(
  /141: \{ prices: \{  reverb: "\$649\.99", amazon: '\$649\.99'  , andertons: '£589\.00'  , gear4music: "£584\.00"\} , oos: \['zzounds'\] , musicstore: "€520\.00" \}/,
  "141: { prices: { reverb: \"$649.99\", amazon: '$649.99', andertons: '£589.00', gear4music: \"£584.00\", musicstore: \"€520.00\" }, oos: ['zzounds'] }"
);

// ID 145: musicstore outside prices
c = c.replace(
  /145: \{ prices: \{  reverb: "\$509\.00",amazon: '\$509\.00', andertons: '£315\.00'  ,\n\s+gear4music: "£315\.00"\} , oos: \['zzounds'\] , musicstore: "€155\.00" \}/,
  "145: { prices: { reverb: \"$509.00\",amazon: '$509.00', andertons: '£315.00', gear4music: \"£315.00\", musicstore: \"€155.00\" }, oos: ['zzounds'] }"
);

// ID 146: gear4music outside prices
c = c.replace(
  /146: \{ prices: \{  reverb: "\$380\.00",amazon: '\$380\.00',  zzounds: '\$379\.99', andertons: '£281\.00'  \} ,\n\s+gear4music: '£302\.50'\},/,
  "146: { prices: { reverb: \"$380.00\",amazon: '$380.00', zzounds: '$379.99', andertons: '£281.00', gear4music: '£302.50' } },"
);

// ID 147: gear4music outside prices
c = c.replace(
  /147: \{ prices: \{  reverb: "\$1,099\.99",amazon: '\$1,099\.99', zzounds: '\$1,199\.99', andertons: '£829\.00'  \} ,\n\s+gear4music: '£835'\},/,
  "147: { prices: { reverb: \"$1,099.99\",amazon: '$1,099.99', zzounds: '$1,199.99', andertons: '£829.00', gear4music: '£835.00' } },"
);

// ID 189: gear4music outside prices
c = c.replace(
  /189: \{ prices: \{  reverb: "\$2,149\.99", amazon: '\$2,149\.99', zzounds: '\$2,149\.99', andertons: '£1,099\.00'  \} ,\n\s+gear4music: '£1,649'\},/,
  "189: { prices: { reverb: \"$2,149.99\", amazon: '$2,149.99', zzounds: '$2,149.99', andertons: '£1,099.00', gear4music: '£1,649.00' } },"
);

// ID 190: gear4music outside prices
c = c.replace(
  /190: \{ prices: \{  reverb: "\$2749\.00",amazon: '\$2749\.00', zzounds: '\$2,749\.00', andertons: '£1,799\.00'  \} , oos: \['andertons'\] ,\n\s+gear4music: '£1,891'\},/,
  "190: { prices: { reverb: \"$2749.00\",amazon: '$2749.00', zzounds: '$2,749.00', andertons: '£1,799.00', gear4music: '£1,891.00' }, oos: ['andertons'] },"
);

// ID 226: gear4music outside prices
c = c.replace(
  /226: \{ prices: \{  reverb: "\$179\.00",amazon: '\$179\.00',  zzounds: '\$179\.00'  , andertons: '£125\.00'  , musicstore: "€179\.00" \} ,\n\s+gear4music: '£161\.50'\},/,
  "226: { prices: { reverb: \"$179.00\",amazon: '$179.00', zzounds: '$179.00', andertons: '£125.00', gear4music: '£161.50', musicstore: \"€179.00\" } },"
);

// ID 239: gear4music outside prices
c = c.replace(
  /239: \{ prices: \{  reverb: "\$499\.00",amazon: '\$499\.00', zzounds: '\$488\.00', andertons: '£390\.00'  \} ,\n\s+gear4music: '£899'\},/,
  "239: { prices: { reverb: \"$499.00\",amazon: '$499.00', zzounds: '$488.00', andertons: '£390.00', gear4music: '£899.00' } },"
);

// ID 255: gear4music outside prices
c = c.replace(
  /255: \{ prices: \{  reverb: "\$449\.99",amazon: '\$449\.99',  zzounds: '\$519\.99', andertons: '£452\.00'  \} ,\n\s+gear4music: '£549'\},/,
  "255: { prices: { reverb: \"$449.99\",amazon: '$449.99', zzounds: '$519.99', andertons: '£452.00', gear4music: '£549.00' } },"
);

// ID 256: gear4music outside prices
c = c.replace(
  /256: \{ prices: \{  reverb: "\$799\.00",amazon: '\$799\.00',  zzounds: '\$799\.00', andertons: '£719\.00'  \} ,\n\s+gear4music: '£829'\},/,
  "256: { prices: { reverb: \"$799.00\",amazon: '$799.00', zzounds: '$799.00', andertons: '£719.00', gear4music: '£829.00' } },"
);

// ID 267: gear4music outside prices
c = c.replace(
  /267: \{ prices: \{  reverb: "\$989\.00",amazon: '\$989\.00',  zzounds: '\$989\.00', andertons: '£859\.00'  \} ,\n\s+gear4music: '£1,399'\},/,
  "267: { prices: { reverb: \"$989.00\",amazon: '$989.00', zzounds: '$989.00', andertons: '£859.00', gear4music: '£1,399.00' } },"
);

// ID 269: gear4music outside prices
c = c.replace(
  /269: \{ prices: \{  reverb: "\$989\.00",amazon: '\$989\.00',  zzounds: '\$999\.00', andertons: '£866\.00'  \} ,\n\s+gear4music: '£813'\},/,
  "269: { prices: { reverb: \"$989.00\",amazon: '$989.00', zzounds: '$999.00', andertons: '£866.00', gear4music: '£813.00' } },"
);

// ID 271: gear4music outside prices
c = c.replace(
  /271: \{ prices: \{  reverb: "\$599\.00",amazon: '\$599\.00',  andertons: '£449\.00'  \} , oos: \['zzounds'\] ,\n\s+gear4music: '£519'\},/,
  "271: { prices: { reverb: \"$599.00\",amazon: '$599.00', andertons: '£449.00', gear4music: '£519.00' }, oos: ['zzounds'] },"
);

// ID 303: musicstore outside prices
c = c.replace(
  /303: \{ prices: \{  reverb: "\$395\.00",amazon: '\$395\.00',  andertons: '£288\.00'  \} , oos: \['zzounds'\] , musicstore: "€522\.00" \}/,
  "303: { prices: { reverb: \"$395.00\",amazon: '$395.00', andertons: '£288.00', musicstore: \"€522.00\" }, oos: ['zzounds'] }"
);

// ID 304: musicstore outside prices
c = c.replace(
  /304: \{ prices: \{  reverb: "\$109\.99", andertons: '£449\.00'  ,\n\s+gear4music: "£249\.99", amazon: '\$599\.00'\} , oos: \['zzounds'\] , musicstore: '€298'\},/,
  "304: { prices: { reverb: \"$109.99\", andertons: '£449.00', gear4music: \"£249.99\", amazon: '$599.00', musicstore: '€298.00' }, oos: ['zzounds'] },"
);

// ID 310: gear4music outside prices
c = c.replace(
  /310: \{ prices: \{  reverb: "\$319\.99",amazon: '\$319\.99',  zzounds: '\$319\.99'  \} , oos: \['andertons'\] ,\n\s+gear4music: '£229'\},/,
  "310: { prices: { reverb: \"$319.99\",amazon: '$319.99', zzounds: '$319.99', gear4music: '£229.00' }, oos: ['andertons'] },"
);

// ID 311: gear4music outside prices
c = c.replace(
  /311: \{ prices: \{  reverb: "\$499\.99",amazon: '\$499\.99',  zzounds: '\$499\.99'  \} , oos: \['andertons'\] ,\n\s+gear4music: '£379'\},/,
  "311: { prices: { reverb: \"$499.99\",amazon: '$499.99', zzounds: '$499.99', gear4music: '£379.00' }, oos: ['andertons'] },"
);

// ID 312: gear4music outside prices
c = c.replace(
  /312: \{ prices: \{  reverb: "\$949\.00",amazon: '\$949\.00',  zzounds: '\$949\.00', andertons: '£799\.00'  \} ,\n\s+gear4music: '£829'\},/,
  "312: { prices: { reverb: \"$949.00\",amazon: '$949.00', zzounds: '$949.00', andertons: '£799.00', gear4music: '£829.00' } },"
);

// ID 349: gear4music outside prices
c = c.replace(
  /349: \{ prices: \{  zzounds: '\$1,249\.00', andertons: '£899\.00'  , amazon: '\$1,090\.00'\} ,\n\s+gear4music: '£881'\},/,
  "349: { prices: { zzounds: '$1,249.00', andertons: '£899.00', amazon: '$1,090.00', gear4music: '£881.00' } },"
);

fs.writeFileSync(file, c, 'utf8');
console.log('Applied all fixes');
