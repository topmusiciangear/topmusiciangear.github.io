const fs = require('fs');
const file = 'build-guides.js';
let c = fs.readFileSync(file, 'utf8');

const insert = `  426: { prices: { amazon: "$149.00", gear4music: "£139.00" } },
  427: { prices: { amazon: "$99.00", gear4music: "£87.40" } },
  428: { prices: { amazon: "$37.49", zzounds: "$37.49", reverb: "$37.49" } },
  170: { prices: {}, oos: ["gear4music"] },
  395: { prices: { amazon: "$467.46", zzounds: "$499.99", reverb: "$467.46", gear4music: "£428.00", andertons: "£419.00", musicstore: "€503.00" } },
  396: { prices: { amazon: "$419.00", gear4music: "£289.00", andertons: "£266.00", musicstore: "€298.00" }, oos: ["zzounds"] },
  397: { prices: { amazon: "$699.99", zzounds: "$699.99", reverb: "$699.99", gear4music: "£544.00", andertons: "£522.00", musicstore: "€579.00" } },
  398: { prices: { zzounds: "$1,495.00", musicstore: "€1,399.00" }, oos: ["andertons", "amazon"] },
  399: { prices: { musicstore: "€379.00" }, oos: ["zzounds", "amazon"] },
  400: { prices: { amazon: "$1,299.99", zzounds: "$1,399.99", andertons: "£1,260.00", musicstore: "€1,229.00" } }`;

const needle = `  426: { prices: { amazon: "$149.00", gear4music: "£139.00" } }`;

if (c.indexOf(needle) === -1) {
  console.error('TARGET NOT FOUND');
  process.exit(1);
}
c = c.replace(needle, insert);
fs.writeFileSync(file, c, 'utf8');
console.log('Inserted 9 TEST_SHOP_BTN entries (170, 395-400, 427, 428)');
