const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const productos = JSON.parse(fs.readFileSync(B + 'temp/pb_urls_to_scrape.json', 'utf8'));

// Filtrar solo los que están en TEST_SHOP_BTN (los 38 principales de plugins)
const idsPrincipales = [29,30,32,60,61,62,63,113,114,115,119,120,121,122,123,238,374,375,376,377,378,379,380,381,381,382,383,384,385,386,386,387,389,390,392,394,472,473,474,527,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020,1021,1022,1022,1023,1025,1027,1028,1030,1032,1034,1035,1036,1038,1039,1040,1041,1025,1027,1028,1030,1032,1034,1035,1036,1038,1039,1040,1041];
// IDs únicos de los que tienen PB en build-guides.js
const idsEnMapa = [29,30,32,60,61,62,63,113,114,115,119,120,121,122,122,123,238,374,375,376,377,378,380,381,382,383,384,385,386,387,389,390,392,394,472,473,474,527,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1012,1013,1014,1015,1016,1017,1018,1019,1020,1021,1022,1023,1025,1027,1028,1030,1032,1034,1035,1036,1038,1039,1040,1041];
const productosFiltrados = require(B + 'temp/pb_urls_to_scrape.json').filter(p => idsEnMapa.includes(p.id));
console.log('Productos a scrapear: ' + productosFiltrados.length);
fs.writeFileSync('C:/Users/Daniel/projects/topmusiciangear/temp/pb_to_scrape.json', JSON.stringify(productosFiltrados, null, 2), 'utf8');