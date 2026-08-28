var fs = require('fs');
var g = JSON.parse(fs.readFileSync('data/guides.json','utf8'));
var idx = g.findIndex(function(x){return x.id==='best-32-channel-digital-mixers'});
var guide = g[idx];
var pt = guide.productTable;

// Fix Row 0: Local I/O
pt.rows[0].values[6] = {value:'16 XLR', value_es:'16 XLR'};
pt.rows[0].values[8] = {value:'16 XLR', value_es:'16 XLR'};
pt.rows[0].values[5] = {value:'32 combo XLR/TRS', value_es:'32 combo XLR/TRS'};

// Fix Row 1: Processing Capacity - M32R LIVE
pt.rows[1].values[6] = {value:'40 channels (32 mic + 8 aux)', value_es:'40 canales (32 mic + 8 aux)'};

// Fix Row 4: Multitrack Recording
pt.rows[4].values[3] = {value:'USB 32-track + USB 22-track direct', value_es:'USB 32 pistas + USB 22 pistas directo'};
pt.rows[4].values[7] = {value:'USB 32-track', value_es:'USB 32 pistas'};

// Fix column name
pt.columns[7].title = 'Mackie DL32S';
pt.columns[7].title_es = 'Mackie DL32S';

// Add Row 5: Physical Faders
pt.rows.splice(5, 0, {
  label: 'Physical Faders',
  label_es: 'Faders Fisicos',
  values: [
    {value:'25 motorized', value_es:'25 motorizados'},
    {value:'25 motorized', value_es:'25 motorizados'},
    {value:'25 motorized', value_es:'25 motorizados'},
    {value:'0 (app only)', value_es:'0 (solo app)'},
    {value:'25 motorized', value_es:'25 motorizados'},
    {value:'0 (app only)', value_es:'0 (solo app)'},
    {value:'17 motorized', value_es:'17 motorizados'},
    {value:'0 (app only)', value_es:'0 (solo app)'},
    {value:'17 motorized', value_es:'17 motorizados'}
  ]
});

// Add Row 6: Form Factor
pt.rows.splice(6, 0, {
  label: 'Form Factor',
  label_es: 'Formato',
  values: [
    {value:'Desktop console', value_es:'Consola de escritorio'},
    {value:'Desktop console', value_es:'Consola de escritorio'},
    {value:'Desktop console', value_es:'Consola de escritorio'},
    {value:'2U Rackmount', value_es:'Rack 2U'},
    {value:'Desktop console', value_es:'Consola de escritorio'},
    {value:'2U Rackmount', value_es:'Rack 2U'},
    {value:'2U Rackmount', value_es:'Rack 2U'},
    {value:'3U Rackmount', value_es:'Rack 3U'},
    {value:'Compact rackmount', value_es:'Rack compacto'}
  ]
});

// Add Row 7: Local Outputs
pt.rows.splice(7, 0, {
  label: 'Local Outputs',
  label_es: 'Salidas Locales',
  values: [
    {value:'16 XLR + 6 TRS', value_es:'16 XLR + 6 TRS'},
    {value:'16 XLR + 6 TRS', value_es:'16 XLR + 6 TRS'},
    {value:'12 XLR + 4 TRS', value_es:'12 XLR + 4 TRS'},
    {value:'8 XLR + 2 XLR main', value_es:'8 XLR + 2 XLR principal'},
    {value:'16 XLR', value_es:'16 XLR'},
    {value:'2 XLR main + 16 TRS', value_es:'2 XLR principal + 16 TRS'},
    {value:'8 XLR + 6 TRS', value_es:'8 XLR + 6 TRS'},
    {value:'10 XLR', value_es:'10 XLR'},
    {value:'3 XLR main + 10 TRS', value_es:'3 XLR principal + 10 TRS'}
  ]
});

// Add Row 8: Screen
pt.rows.splice(8, 0, {
  label: 'Built-in Screen',
  label_es: 'Pantalla Integrada',
  values: [
    {value:'7" TFT', value_es:'7" TFT'},
    {value:'7" TFT', value_es:'7" TFT'},
    {value:'7" touchscreen', value_es:'7" tactil'},
    {value:'None (browser control)', value_es:'Ninguna (control via navegador)'},
    {value:'7" touchscreen', value_es:'7" tactil'},
    {value:'None (app control)', value_es:'Ninguna (control via app)'},
    {value:'5" TFT', value_es:'5" TFT'},
    {value:'None (app control)', value_es:'Ninguna (control via app)'},
    {value:'Built-in display', value_es:'Pantalla integrada'}
  ]
});

fs.writeFileSync('data/guides.json', JSON.stringify(g, null, 2), 'utf8');
console.log('Table updated with corrections and 4 new columns');
console.log('Rows:', pt.rows.length);
