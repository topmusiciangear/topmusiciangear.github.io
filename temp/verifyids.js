const P = require('C:/Users/Daniel/projects/topmusiciangear/data/products.json');
const byId = {};
P.forEach(p => { byId[p.id] = p.title; });
const checks = [
  [26, 'MDR-7506?'], [128, 'TR-6S?'], [315, 'FS800?'], [124, 'PlayerStrat?'],
  [363, 'Launchkey49?'], [273, 'SLG200N?'], [489, 'SparkMINI?'], [200, 'RC5?'],
  [402, 'X32?'], [414, 'SQ6+?'], [418, 'TF3?'], [413, '32SC?'],
  [528, 'EHB1000?'], [538, 'GSR205B?'], [542, 'Stiletto5?'], [546, 'AmProIIJV?'],
  [547, 'UltraIIJV?'], [549, 'Dingwall?'], [155, 'AmProIIP?'], [156, 'AmProIIJ?'],
  [165, 'B204SM?'], [204, 'ME-90?'], [154, 'DBR12?'], [95, 'EWD835?'], [93, 'EWDual?'], [107, '?']
];
checks.forEach(([id, q]) => console.log(id, '=', byId[id] || 'MISSING', q));