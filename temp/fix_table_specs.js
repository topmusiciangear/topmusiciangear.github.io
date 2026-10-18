const fs = require('fs');
const B = 'C:/Users/Daniel/projects/topmusiciangear/';
const rg = B + 'data/guides.json';
const guides = JSON.parse(fs.readFileSync(rg, 'utf8'));
const g = guides.find(x => x.id === 'best-home-studio-speakers');

const T = g.productTable;

// ============================================================
// SPECS VERIFICADAS DE FABRICANTE (manual, web oficial, PDF)
// ============================================================
// Mackie CR4.5 (Gen 3): 50W RMS bi-amp (25W LF + 25W HF), puerto TRASERO, SPL 96 dB
// PreSonus Eris 3.5 2nd Gen: 50W bi-amp (25W LF + 25W HF), puerto TRASERO, SPL 98 dB @ 1m
// M-Audio BX4: 2x25W RMS = 50W bi-amp, puerto TRASERO, SPL 100 dB (peak 120W pico no RMS)
// Mackie CR3.5 (Gen 3): 50W RMS bi-amp (25W LF + 25W HF), puerto TRASERO, SPL 94 dB
// Behringer Truth 3.5 BT: 64W RMS (2x32W Clase D), puerto FRONTAL, SPL 101 dB
// Edifier R1280T: 42W RMS (21W+21W Clase D), puerto FRONTAL, SPL ~95 dB (no oficial)

// Insertamos 3 columnas NUEVAS después de "Extensión de graves" (índice 2 actual -> nuevo índice 3,4,5)
const nuevaColumnaPotencia = {
  title: "Power (RMS)",
  title_es: "Potencia RMS",
  type: "text",
  align: "center",
  values: [
    { value: "50 W (2×25 W bi-amp)", value_es: "50 W (2×25 W bi-amp)" },
    { value: "50 W (2×25 W bi-amp)", value_es: "50 W (2×25 W bi-amp)" },
    { value: "50 W (2×25 W bi-amp)", value_es: "50 W (2×25 W bi-amp)" },
    { value: "50 W (2×25 W bi-amp)", value_es: "50 W (2×25 W bi-amp)" },
    { value: "64 W (2×32 W Clase D)", value_es: "64 W (2×32 W Clase D)" },
    { value: "42 W (2×21 W Clase D)", value_es: "42 W (2×21 W Clase D)" }
  ]
};

const nuevaColumnaPuerto = {
  title: "Port Location",
  title_es: "Ubicación del puerto",
  type: "text",
  align: "center",
  values: [
    { value: "Rear", value_es: "Trasero" },
    { value: "Rear", value_es: "Trasero" },
    { value: "Rear", value_es: "Trasero" },
    { value: "Rear", value_es: "Trasero" },
    { value: "Front", value_es: "Frontal" },
    { value: "Front", value_es: "Frontal" }
  ]
};

const nuevaColumnaSPL = {
  title: "Max SPL",
  title_es: "SPL máx. (dB)",
  type: "text",
  align: "center",
  values: [
    { value: "96 dB", value_es: "96 dB" },
    { value: "98 dB @ 1 m", value_es: "98 dB @ 1 m" },
    { value: "100 dB", value_es: "100 dB" },
    { value: "94 dB", value_es: "94 dB" },
    { value: "101 dB", value_es: "101 dB" },
    { value: "~95 dB", value_es: "~95 dB" }
  ]
};

// Insertar en orden: Potencia (3), Puerto (4), SPL (5)
T.columns.splice(3, 0, nuevaColumnaPotencia, nuevaColumnaPuerto, nuevaColumnaSPL);

// Añadir valores a cada fila existente
const pot = nuevaColumnaPotencia.values;
const puer = nuevaColumnaPuerto.values;
const spl = nuevaColumnaSPL.values;

T.rows.forEach((row, i) => {
  row.values.splice(3, 0, pot[i], puer[i], spl[i]);
});

fs.writeFileSync(rg, JSON.stringify(guides, null, 2), 'utf8');

console.log('Columnas ahora:');
T.columns.forEach((c, i) => console.log('  ' + i + ': ' + c.title + ' / ' + c.title_es));
console.log('');
console.log('Primera fila (Mackie CR4.5):');
T.rows[0].values.forEach((v, j) => {
  console.log('  ' + T.columns[j].title_es + ': ' + (v.value_es || v.value));
});