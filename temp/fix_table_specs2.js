const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');
const T = g.productTable;

// 1) ELIMINAR las 3 columnas que metí mal (Power, Port, SPL estaban en índices 3,4,5)
T.columns.splice(3, 3);
// 2) ELIMINAR los 3 valores de cada fila (mismo índice)
T.rows.forEach(row => row.values.splice(3, 3));

console.log('Tras limpiar: cols=' + T.columns.length + ' rows=' + T.rows.length);

// 3) AÑADIR 3 NUEVAS FILAS (specs)
const filaPotencia = {
  label: "Power (RMS)",
  label_es: "Potencia RMS",
  values: [
    { value: "50 W (2×25 W bi-amp)", value_es: "50 W (2×25 W bi-amp)" },
    { value: "50 W (2×25 W bi-amp)", value_es: "50 W (2×25 W bi-amp)" },
    { value: "50 W (2×25 W bi-amp)", value_es: "50 W (2×25 W bi-amp)" },
    { value: "50 W (2×25 W bi-amp)", value_es: "50 W (2×25 W bi-amp)" },
    { value: "64 W (2×32 W Clase D)", value_es: "64 W (2×32 W Clase D)" },
    { value: "42 W (2×21 W Clase D)", value_es: "42 W (2×21 W Clase D)" }
  ]
};

const filaPuerto = {
  label: "Port Location",
  label_es: "Ubicación del puerto",
  values: [
    { value: "Rear", value_es: "Trasero" },
    { value: "Rear", value_es: "Trasero" },
    { value: "Rear", value_es: "Trasero" },
    { value: "Rear", value_es: "Trasero" },
    { value: "Front", value_es: "Frontal" },
    { value: "Front", value_es: "Frontal" }
  ]
};

const filaSPL = {
  label: "Max SPL",
  label_es: "SPL máx. (dB)",
  values: [
    { value: "96 dB", value_es: "96 dB" },
    { value: "98 dB @ 1 m", value_es: "98 dB @ 1 m" },
    { value: "100 dB", value_es: "100 dB" },
    { value: "94 dB", value_es: "94 dB" },
    { value: "101 dB", value_es: "101 dB" },
    { value: "~95 dB", value_es: "~95 dB" }
  ]
};

// Insertar después de "Extensión de graves" (fila 2) -> índices 3,4,5
T.rows.splice(3, 0, filaPotencia, filaPuerto, filaSPL);

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');

console.log('Final: cols=' + T.columns.length + ' rows=' + T.rows.length);
T.rows.forEach((r, i) => console.log('  row ' + i + ': ' + r.label_es));
console.log('');
console.log('Mackie CR4.5 (col 0):');
T.rows.forEach(r => console.log('  ' + r.label_es + ': ' + r.values[0].value_es));