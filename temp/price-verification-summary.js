// Summary of verified prices so far
const verified = [
  // ID, SKU, Our Price, Real Price, Status
  [1, 'REC0000211', '€335.30', '€326.90', 'CLOSE'],
  [2, 'REC0009533', '€2,520.17', '€2,520.20', 'CORRECT'],
  [5, 'PAH0000162', '€88.24', '€184.00', 'WRONG - 2x off'],
  [6, 'GIT0054130', '€589.92', '€1,805.90', 'WRONG - 3x off'],
  [7, 'GIT0049496', '€2,044.54', '€2,478.20', 'WRONG - 21% off'],
  [9, 'GIT0044595', '€1,552.10', '€839.50', 'WRONG - 46% HIGH'],
  [10, 'GIT0063401', '€301.68', '€4,368.90', 'WRONG - 14x off'],
  [11, 'KEY0005756', '€3,528.57', '€3,527.70', 'CORRECT'],
  [13, 'SYN0008709', '€217.60', '€209.20', 'CLOSE'],
  [15, 'PCM0017719', '€144.54', '€150.40', 'CLOSE'],
  [21, 'REC0015972', '€528.57', '€629.00', 'WRONG - 19% off'],
  [22, 'REC0016882', '€738.66', '€1,259.70', 'WRONG - 41% off'],
  [23, 'REC0003047', '€125.21', '€125.20', 'CORRECT'],
  [24, 'REC0016605', '€348.74', '€363.00', 'CLOSE'],
  [25, 'REC0011129', '€125.21', '€149.00', 'WRONG - 16% off'],
  [26, 'REC0000388', '€74.79', '€74.80', 'CORRECT'],
  [28, 'PCM0018134', '€231.09', '€247.90', 'CLOSE'],
  [29, 'PCM0014088', '€1,894.96', '€755.50', 'WRONG - 2.5x HIGH'],
  [30, 'PCM0018596', '€452.90', '€452.90', 'CORRECT'],
  [33, 'SYN0006408', '€643.70', '€562.20', 'WRONG - 14% HIGH'],
  [39, 'REC0013559', '€49.58', '€41.20', 'WRONG - 20% HIGH'],
  [42, 'PCM0016763', '€106.72', '€923.50', 'WRONG - 8.6x off'],
  [50, 'PAH0000164', '€100.00', '€100.00', 'CORRECT'],
  [51, 'REC0016760', '€217.60', '€209.20', 'CLOSE'],
  [52, 'REC0016738', '€452.94', '€537.00', 'WRONG - 16% off'],
  [56, 'REC0016961', '€60.50', '€167.20', 'WRONG - 2.8x off'],
  [59, 'REC0016508', '€125.21', '€58.80', 'WRONG - 2.1x HIGH'],
  [62, 'PCM0018303', '€49.58', '€142.00', 'WRONG - 2.9x off'],
  [64, 'GIT0061889', '€1,623.45', '€2,016.00', 'WRONG - 20% off'],
  [65, 'GIT0061908', '€592.44', '€709.20', 'WRONG - 16% off'],
  [66, 'BAS0012911', '€599.50', '€948.70', 'WRONG - 37% off'],
  [67, 'BAS0009834', '€797.23', '€948.70', 'WRONG - 16% off'],
  [71, 'GIT0044445', '€640.00', '€721.80', 'WRONG - 11% off'],
  [174, 'SYN0005026', '€2,764.71', '€2,856.30', 'CLOSE'],
  [176, 'SYN0009028', '€2,568.91', 'N/A', 'NEEDS CHECK'],
  [182, 'PCM0018211', '€1,867.23', '€3,612.61', 'WRONG - 1.9x off'],
  [183, 'PCM0017614', '€1,797.48', '€2,436.10', 'WRONG - 26% off'],
  [185, 'BAS0012728', '€2,633.61', '€2,167.20', 'WRONG - 21% HIGH'],
  [187, 'REC0015900', '€2,680.67', '€2,587.40', 'CLOSE'],
  [193, 'REC0014166', '€217.60', '€335.30', 'WRONG - 35% off'],
  [194, 'PAH0023760', '€259.66', '€259.70', 'CORRECT'],
  [198, 'REC0011128', '€84.03', '€100.00', 'WRONG - 16% off'],
  [200, 'GIT0054642', '€155.46', '€172.30', 'CLOSE'],
  [201, 'GIT0026393', '€74.79', '€55.50', 'WRONG - 35% HIGH'],
  [202, 'GIT0047214', '€522.69', '€545.40', 'CLOSE'],
  [204, 'GIT0060744', '€377.31', '€247.90', 'WRONG - 52% HIGH'],
  [206, 'REC0004307', '€1,626.05', 'N/A', 'NEEDS CHECK'],
  [207, 'REC0015620', '€1,074.79', '€1,969.75', 'WRONG - 46% off'],
  [209, 'REC0014389', '€755.46', '€999.00', 'WRONG - 24% off'],
  [308, 'PCM0018088', '€317.06', '€528.60', 'WRONG - 40% off'],
  [311, 'GIT0050664', '€377.31', '€382.40', 'CORRECT'],
  [397, 'PCM0017675', '€486.55', 'N/A', 'NEEDS CHECK'],
];

console.log('VERIFIED PRODUCTS SUMMARY');
console.log('========================');
console.log('Total verified:', verified.length);

const wrong = verified.filter(v => v[4].startsWith('WRONG'));
const correct = verified.filter(v => v[4] === 'CORRECT');
const close = verified.filter(v => v[4] === 'CLOSE');
const needCheck = verified.filter(v => v[4].startsWith('NEEDS'));

console.log('CORRECT:', correct.length);
console.log('CLOSE (within 5%):', close.length);
console.log('WRONG:', wrong.length);
console.log('NEEDS CHECK:', needCheck.length);

console.log('\nWRONG PRICES:');
wrong.forEach(v => console.log(`  ID:${v[0]} | ${v[1]} | Our:${v[2]} | Real:${v[3]} | ${v[4]}`));
