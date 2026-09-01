/* Botones nuevos de tiendas (TEST_SHOP_BTN) - compartido por el SPA. Generado desde build-guides.js */

let FLAG_UID = 0;

function flagBadge(inner) {
  const cid = 'flgc' + (++FLAG_UID);
  return '<svg viewBox="0 0 24 16" width="19" height="13" style="display:inline-block;vertical-align:-2px;flex-shrink:0;margin-right:5px">' +
    '<defs><clipPath id="' + cid + '"><rect width="24" height="16" rx="3.2"/></clipPath></defs>' +
    '<g clip-path="url(#' + cid + ')">' + inner + '</g>' +
    '<rect x=".5" y=".5" width="23" height="15" rx="2.7" fill="none" stroke="#ffffff" stroke-opacity=".35"/>' +
    '</svg>';
};

function usaFlag() {
  let s = '<rect width="24" height="16" fill="#fff"/><g fill="#B22234">';
  [0, 2.46, 4.92, 7.38, 9.85, 12.31, 14.77].forEach(function (y) { s += '<rect y="' + y + '" width="24" height="1.23"/>'; });
  s += '</g><rect width="10" height="8.62" fill="#3C3B6E"/><g fill="#fff">';
  [[1.9, 1.8], [4.1, 1.8], [6.3, 1.8], [8.5, 1.8], [3, 3.1], [5.2, 3.1], [7.4, 3.1], [1.9, 4.4], [4.1, 4.4], [6.3, 4.4], [8.5, 4.4], [3, 5.7], [5.2, 5.7], [7.4, 5.7]].forEach(function (p) { s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r=".42"/>'; });
  return flagBadge(s + '</g>');
};

function ukFlag() {
  let s = '<rect width="24" height="16" fill="#012169"/><g stroke="#fff" stroke-width="2">';
  s += '<line x1="0" y1="0" x2="24" y2="16"/><line x1="24" y1="0" x2="0" y2="16"/>';
  s += '</g><g stroke="#C8102E" stroke-width="1.2">';
  s += '<line x1="0" y1="0" x2="24" y2="16"/><line x1="24" y1="0" x2="0" y2="16"/>';
  s += '</g><g fill="#fff"><rect x="10" y="0" width="4" height="16"/><rect x="0" y="6" width="24" height="4"/></g>';
  s += '<g fill="#C8102E"><rect x="11" y="0" width="2" height="16"/><rect x="0" y="7" width="24" height="2"/></g>';
  return flagBadge(s);
};

function euFlag() {
  var scx = 12, scy = 8, sr = 5.5, ssr = 1.35, pts = [];
  for (var i = 0; i < 12; i++) {
    var a = (i * 30 - 90) * Math.PI / 180;
    var cx = scx + sr * Math.cos(a), cy = scy + sr * Math.sin(a);
    var sp = '';
    for (var j = 0; j < 5; j++) {
      var ao = ((j * 72 - 90) * Math.PI / 180), ai = (((j * 72 + 36) - 90) * Math.PI / 180);
      sp += (cx + ssr * Math.cos(ao)).toFixed(2) + ',' + (cy + ssr * Math.sin(ao)).toFixed(2) + ' ';
      sp += (cx + ssr * 0.38 * Math.cos(ai)).toFixed(2) + ',' + (cy + ssr * 0.38 * Math.sin(ai)).toFixed(2) + ' ';
    }
    pts.push(sp.trim());
  }
  var cid = 'flgc' + (++FLAG_UID);
  return '<svg viewBox="0 0 24 16" width="19" height="16" style="display:inline-block;vertical-align:-2px;flex-shrink:0;margin-right:5px">' +
    '<defs><clipPath id="' + cid + '"><rect width="24" height="16" rx="3.2"/></clipPath></defs>' +
    '<g clip-path="url(#' + cid + ')">' +
    '<rect width="24" height="16" fill="#003399"/>' +
    pts.map(function(p) { return '<polygon points="' + p + '" fill="#FFCC00"/>'; }).join('') +
    '</g>' +
    '<rect x=".5" y=".5" width="23" height="15" rx="2.7" fill="none" stroke="#ffffff" stroke-opacity=".35"/>' +
    '</svg>';
}

function globeIcon() {
  return flagBadge('<circle cx="12" cy="8" r="5.5" fill="none" stroke="#fff" stroke-width="1"/>' +
    '<ellipse cx="12" cy="8" rx="2.5" ry="5.5" fill="none" stroke="#fff" stroke-width=".8"/>' +
    '<line x1="6.5" y1="8" x2="17.5" y2="8" stroke="#fff" stroke-width=".7"/>' +
    '<path d="M7.5 5.5h9M7.5 10.5h9" stroke="#fff" stroke-width=".5"/>');
};

const SHOP_LOGO_TEXT = { gear4music: 'Gear4music', andertons: 'Andertons', musicstore: "Music Store", zzounds: 'zZounds', reverb: "Reverb" };;

const SHOP_LOGO_STYLE = {
  gear4music: "font-family:'Quicksand','Segoe UI',sans-serif;font-weight:700;color:#fff;letter-spacing:-.3px;font-size:15px", andertons: "font-family:'Yellowtail',cursive;font-weight:400;color:#fff;font-size:19px", musicstore: "font-family:'Open Sans Condensed','Arial Narrow',Arial,sans-serif;font-weight:700;color:#fff;font-size:18px;letter-spacing:.5px", zzounds: "font-family:'Poppins',Arial,sans-serif;font-weight:800;font-style:italic;color:#fff;letter-spacing:-.5px;font-size:15px", reverb: "font-family:'Kaushan Script',cursive;font-weight:400;color:#fff;font-size:17px"
};

const SHOP_FLAG = { zzounds: usaFlag, reverb: globeIcon, gear4music: globeIcon, musicstore: euFlag, andertons: ukFlag };

const TEST_SHOP_BTN = {
  1: {prices:{amazon:"$439.00",zzounds:"$439.00",gear4music:"£381.50",andertons:"£379.00",musicstore:"€326.89"}},
  2: {prices:{amazon:"$3,750.00",zzounds:"$3,995.00",andertons:"£3,007.00",gear4music:"£2,908.40",musicstore:"€2,520.17"}},
  3: {prices:{amazon:"$212.00",zzounds:"$249.00",gear4music:"£184.75",andertons:"£179.00",musicstore:"€167.23"}},
  4: {prices:{amazon:"$1,225.00",zzounds:"$1,199.00",gear4music:"£893.00",andertons:"£849.00",musicstore:"€648.99"}},
  5: {prices:{amazon:"$109.00",zzounds:"$99.00",gear4music:"£103.75",andertons:"£103.00",musicstore:"€88.24"}},
  6: {prices:{amazon:"$1,839.99",zzounds:"$1,839.99",andertons:"£1,549.00",gear4music:"£1,799.00",musicstore:"€589.92"}},
  7: {prices:{amazon:"$4,234.33",zzounds:"$2,799.00",andertons:"£2,499.00",gear4music:"£2,499.00",musicstore:"€2,044.54"}},
  8: {prices:{amazon:"$2,499.00",gear4music:"£2,111.00",andertons:"£2,299.00",musicstore:"€2,208.40"}},
  9: {prices:{amazon:"$1,199.99",zzounds:"$1,199.99",andertons:"£899.00",gear4music:"£835.00",musicstore:"€1,552.10"}},
  10: {prices:{zzounds:"$3,999.00",andertons:"£4,299.00",gear4music:"£4,499.00",musicstore:"€301.68"}},
  11: {prices:{amazon:"$5,999.00",zzounds:"$5,999.00",andertons:"£3,890.00",gear4music:"£3,890.00",musicstore:"€3,528.57"}},
  12: {prices:{amazon:"$4,499.99",zzounds:"$4,699.99",andertons:"£4,290.00",gear4music:"£4,290.00",musicstore:"€3,973.11"}},
  13: {prices:{amazon:"$299.00",zzounds:"$299.00",andertons:"£215.00",gear4music:"£215.00",musicstore:"€209.24"}},
  14: {prices:{amazon:"$839.95",zzounds:"$849.00",andertons:"£595.00",gear4music:"£595.00",musicstore:"€568.91"}},
  15: {prices:{amazon:"$199.00",zzounds:"$224.99",gear4music:"£193.75",andertons:"£185.00",musicstore:"€144.54"}},
  16: {prices:{amazon:"$999.00",zzounds:"$999.00",gear4music:"£849.00",andertons:"£849.00",musicstore:"€794.12"}},
  17: {prices:{amazon:"$999.00",zzounds:"$999.00",gear4music:"£715.00",andertons:"£715.00",musicstore:"€765.88"}},
  18: {prices:{amazon:"$249.99",zzounds:"$299.99",gear4music:"£227.00",andertons:"£227.00",musicstore:"€247.90"}},
  19: {prices:{amazon:"$398.99",zzounds:"$398.99",gear4music:"£263.00",andertons:"£254.00",musicstore:"€242.86"}},
  20: {prices:{amazon:"$269.00",zzounds:"$269.00",gear4music:"£199.25",musicstore:"€223.53",andertons:"£199.00"}},
  21: {prices:{amazon:"$899.99",zzounds:"$899.99",andertons:"£600.00",gear4music:"£600.00",musicstore:"€528.57"}},
  22: {prices:{amazon:"$1175.00",andertons:"£959.00",gear4music:"£812.00",musicstore:"€738.66"},oos:["zzounds"]},
  23: {prices:{amazon:"$199.99",andertons:"£129.00",gear4music:"£129.00",musicstore:"€125.21",zzounds:"$199.99"}},
  24: {prices:{amazon:"$489.00",zzounds:"$479.00",andertons:"£357.00",gear4music:"£361.00",musicstore:"€348.74"}},
  25: {prices:{amazon:"$169.00",zzounds:"$159.00",gear4music:"£148.00",andertons:"£133.00",musicstore:"€125.21"}},
  26: {prices:{amazon:"$113.00",gear4music:"£99.00",musicstore:"€74.79"},urls:{zzounds:"https://www.zzounds.com/item--SNYMDR7506"},oos:["andertons"]},
  28: {prices:{pluginboutique:"$299.00",andertons:"£126.00",gear4music:"£271.00",musicstore:"€231.09"}},
  29: {prices:{pluginboutique:"$1069.00",andertons:"£639.00",zzounds:"$1,069.00",gear4music:"£769.00",musicstore:"€1,894.96"}},
  30: {prices:{pluginboutique:"$499.00",andertons:"£479.00",gear4music:"£479.00",musicstore:"€642.86"}},
  32: {prices:{pluginboutique:"$599.00",gear4music:"£489.00"},oos:["musicstore"]},
  33: {prices:{amazon:"$749.99",zzounds:"$749.99",andertons:"£659.00",gear4music:"£656.00",musicstore:"€643.70"}},
  34: {oos:["zzounds"]},
  39: {prices:{andertons:"£42.00",gear4music:"£53.50",musicstore:"€124.37"},oos:["zzounds"]},
  42: {prices:{amazon:"$1299.99",zzounds:"$1,299.99",andertons:"£1,052.00",gear4music:"£1,039.00",musicstore:"€106.72"}},
  50: {prices:{amazon:"$99.00",zzounds:"$109.00",gear4music:"£103.50",andertons:"£103.00",musicstore:"€100.00"}},
  51: {prices:{amazon:"$275.00",zzounds:"$319.00",gear4music:"£222.00",andertons:"£231.00",musicstore:"€209.24"}},
  52: {prices:{amazon:"$449.00",zzounds:"$449.00",gear4music:"£575.00",andertons:"£549.00",musicstore:"€452.94"}},
  53: {prices:{amazon:"$294.01",zzounds:"$399.99",gear4music:"£178.75",andertons:"£175.00",musicstore:"€180.08"}},
  54: {prices:{amazon:"$199.95",zzounds:"$199.95",gear4music:"£213.50",andertons:"£210.00",musicstore:"€175.80"}},
  55: {prices:{amazon:"$179.00",zzounds:"$199.00",gear4music:"£142.00",andertons:"£149.00",musicstore:"€112.27"}},
  56: {prices:{amazon:"$169.00",zzounds:"$199.99",andertons:"£149.00",gear4music:"£129.00",musicstore:"€60.50"}},
  57: {prices:{amazon:"$139.80",andertons:"£134.00",gear4music:"£125.00",musicstore:"€121.43"},oos:["zzounds"]},
  58: {prices:{amazon:"$94.99",zzounds:"$108.99",andertons:"£54.00",gear4music:"£54.40",musicstore:"€37.82"}},
  59: {prices:{amazon:"$165.99",andertons:"£77.00",gear4music:"£77.40",musicstore:"€125.21"},oos:["zzounds"]},
  60: {prices:{pluginboutique:"$199.00",andertons:"£95.00",musicstore:"€41.18"}},
  61: {prices:{pluginboutique:"$19.00",gear4music:"£41.99"},oos:["andertons","musicstore"]},
  62: {prices:{pluginboutique:"$199.00",zzounds:"$199.00",gear4music:"£119.00",musicstore:"€74.79",andertons:"£126.00"}},
  63: {prices:{pluginboutique:"$199.00",zzounds:"$199.00",gear4music:"£145.00",musicstore:"€49.58",andertons:"£139.00"}},
  64: {prices:{amazon:"$1,875.65",gear4music:"£1,799.00",musicstore:"€1,623.45"},oos:["zzounds","andertons"]},
  65: {prices:{amazon:"$862.39",zzounds:"$879.99",andertons:"£749.00",gear4music:"£739.00",musicstore:"€592.44"}},
  66: {prices:{amazon:"$849.99",gear4music:"£859.00",musicstore:"€599.50"},oos:["zzounds","andertons"]},
  67: {prices:{amazon:"$849.99",gear4music:"£799.00",musicstore:"€797.23",andertons:"£729.00"},oos:["zzounds"]},
  68: {prices:{amazon:"$204.99",andertons:"£179.00",gear4music:"£172.00",musicstore:"€167.23",zzounds:"$229.99"}},
  71: {prices:{amazon:"$789.99",zzounds:"$789.99",andertons:"£749.00",gear4music:"£749.00",musicstore:"€640.00"}},
  72: {prices:{amazon:"$349.99",zzounds:"$299.99",andertons:"£259.00",gear4music:"£259.00",musicstore:"€231.60"}},
  73: {prices:{amazon:"$1,799.99",zzounds:"$1,799.99",andertons:"£1,629.00",gear4music:"£970.00",musicstore:"€115.97"}},
  74: {prices:{amazon:"$749.99",zzounds:"$749.99",andertons:"£599.00",gear4music:"£599.00",musicstore:"€493.61"}},
  75: {prices:{amazon:"$749.99",zzounds:"$749.99",andertons:"£649.00",gear4music:"£649.00",musicstore:"€242.86"}},
  76: {prices:{amazon:"$749.99",zzounds:"$749.99",andertons:"£749.00",gear4music:"£749.00",musicstore:"€746.22"}},
  91: {prices:{amazon:"$659.00",zzounds:"$659.00",andertons:"£569.00",gear4music:"£589.00",musicstore:"€500.00"}},
  92: {prices:{amazon:"$849.00"},urls:{gear4music:"https://www.gear4music.com/PA-DJ-and-Lighting/Sennheiser-EW-100-G4-Wireless-Microphone-System-with-935-S-E-Band/2BBJ",musicstore:"€567.23"},oos:["zzounds","andertons"]},
  93: {prices:{amazon:"$2499.00",zzounds:"$1,099.00",gear4music:"£845.00",musicstore:"€567.23"},oos:["andertons"]},
  95: {prices:{amazon:"$749.00",zzounds:"$749.00",andertons:"£518.00",gear4music:"£518.00",musicstore:"€67.23"}},
  96: {prices:{amazon:"$99.00",zzounds:"$99.99",andertons:"£109.99",gear4music:"£110.00",musicstore:"€124.37"}},
  97: {prices:{amazon:"$186.20",zzounds:"$197.99",andertons:"£174.99",gear4music:"£166.00",musicstore:"€150.42"}},
  98: {prices:{amazon:"$103.50",zzounds:"$109.99",andertons:"£89.99",gear4music:"£84.20",musicstore:"€91.60"}},
  99: {prices:{amazon:"$99.99",zzounds:"$99.99",andertons:"£99.99",gear4music:"£99.00",musicstore:"€57.98"}},
  100: {prices:{amazon:"$129.00",andertons:"£95.00",gear4music:"£95.00",musicstore:"€125.21"},oos:["zzounds"]},
  101: {prices:{amazon:"$83.50",andertons:"£69.99",gear4music:"£67.90",musicstore:"€74.79"},oos:["zzounds"]},
  102: {prices:{amazon:"$229.00",andertons:"£299.00",gear4music:"£239.00",musicstore:"€251.26"},oos:["zzounds"]},
  103: {prices:{amazon:"$329.99",zzounds:"$359.99",andertons:"£269.00",gear4music:"£180.00",musicstore:"€268.07"}},
  104: {prices:{amazon:"$3,499.99",andertons:"£3,599.00",musicstore:"€2,856.30"},oos:["zzounds"]},
  105: {prices:{amazon:"$549.00",zzounds:"$549.00",andertons:"£436.00",gear4music:"£469.00",musicstore:"€461.34"}},
  106: {prices:{amazon:"$899.99",zzounds:"$899.99",andertons:"£845.00",gear4music:"£862.00",musicstore:"€461.34"}},
  108: {prices:{amazon:"$909.99",zzounds:"$909.99",gear4music:"£659.00",musicstore:"€461.34"},oos:["andertons"]},
  109: {prices:{amazon:"$1,781.01",zzounds:"$1,899.00",andertons:"£1,359.00",gear4music:"£1,428.00",musicstore:"€1,318.49"}},
  110: 
{prices:{amazon:"$749.00",andertons:"£599.00",gear4music:"£529.00",musicstore:"€503.36"}},
  112: {prices:{amazon:"$165.00",zzounds:"$179.00",gear4music:"£192.25",musicstore:"€335.29",andertons:"£85.00"}},
  113: {prices:{gear4music:"£549.00",amazon:"$599.00",andertons:"£549.00",zzounds:"$599.00",musicstore:"€503.36",pluginboutique:"$805"}},
  114: {prices:{gear4music:"£479.00",amazon:"$579.99",andertons:"£479.00",zzounds:"$579.99",musicstore:"€486.55",pluginboutique:"$579.99"}},
  115: {prices:{andertons:"£299.00",gear4music:"£245.00",amazon:"$399.00",pluginboutique:"$299.00"}},
  116: {prices:{amazon:"$129.00",andertons:"£112.00",gear4music:"£115.00",musicstore:"€133.61"},oos:["zzounds"]},
  117: {prices:{amazon:"$249.00",zzounds:"$249.00",andertons:"£169.00",gear4music:"£169.00",musicstore:"€167.23"}},
  118: {prices:{pluginboutique:"$1999.00",gear4music:"£79.00"},oos:["musicstore"]},
  119: {prices:{pluginboutique:"$30.00",gear4music:"£300.50",musicstore:"€83.19"},oos:["zzounds"]},
  120: {prices:{pluginboutique:"$99.00",zzounds:"$249.00",gear4music:"£74.99",amazon:"$119.00",musicstore:"€335.29",andertons:"£535.00"}},
  121: {prices:{pluginboutique:"$999.00",andertons:"£579.00",gear4music:"£899.00",musicstore:"€755.46"}},
  122: {prices:{pluginboutique:"$1399.00",gear4music:"£1,299.00",musicstore:"€1,007.56",andertons:"£1,299.00"}},
  123: {prices:{gear4music:"£1124.00",pluginboutique:"$1249.00",andertons:"£1,124.00",zzounds:"$1,249.00",musicstore:"€1,343.70"}},
  124: {prices:{gear4music:"£729.00",amazon:"$879.99",zzounds:"$879.99",andertons:"£919.00",musicstore:"€599.50"}},
  125: {prices:{amazon:"$719.99",gear4music:"£699.00",musicstore:"€470.34",andertons:"£799.00"},oos:["zzounds"]},
  126: {prices:{gear4music:"£1742.00",amazon:"$1,839.99",zzounds:"$1,839.99",andertons:"£1,599.00",musicstore:"€1,517.56"}},
  127: {prices:{amazon:"$1,099.00",zzounds:"$999.00",andertons:"£765.00",gear4music:"£829.00",musicstore:"€747.06"}},
  128: {prices:{amazon:"$469.99",zzounds:"$469.99",andertons:"£345.00",gear4music:"£345.00",musicstore:"€307.56"}},
  129: {prices:{amazon:"$404.40",zzounds:"$469.99",andertons:"£319.00",gear4music:"£314.00",musicstore:"€279.83"}},
  130: {prices:{gear4music:"£125.00",amazon:"$149.99",zzounds:"$149.99",andertons:"£129.00",musicstore:"€150.42"}},
  131: {prices:{amazon:"$349.00",zzounds:"$349.00",andertons:"£239.00",gear4music:"£238.00",musicstore:"€234.45"}},
  132: {prices:{andertons:"£859.00",gear4music:"£829.00",amazon:"$949.99",musicstore:"€624.29"}},
  133: {prices:{amazon:"$109.99",zzounds:"$109.99",andertons:"£109.99",gear4music:"£99.10",musicstore:"€83.19"}},
  134: {prices:{amazon:"$88.00",zzounds:"$119.99",andertons:"£85.00",gear4music:"£79.00",musicstore:"€133.61"}},
  135: {prices:{amazon:"$679.00",zzounds:"$679.00",andertons:"£519.00",gear4music:"£679.00",musicstore:"€167.23"}},
  136: {prices:{amazon:"$108.57",zzounds:"$115.99",andertons:"£119.99",gear4music:"£111.00",musicstore:"€102.52"}},
  137: {prices:{amazon:"$250.74",zzounds:"$250.74",andertons:"£225.00",gear4music:"£225.50",musicstore:"€250.42"}},
  138: {prices:{amazon:"$1,398.00",andertons:"£991.00",gear4music:"£1,037.00",musicstore:"€923.53"},oos:["zzounds"]},
  139: {prices:{gear4music:"£3050.00",amazon:"$3,999.00",andertons:"£2,599.00",musicstore:"€2,111.43"},oos:["zzounds"]},
  140: {prices:{amazon:"$749.99",zzounds:"$769.99",andertons:"£649.00",gear4music:"£549.00",musicstore:"€420.17"}},
  141: {prices:{amazon:"$649.99",andertons:"£589.00",gear4music:"£584.00",musicstore:"€436.97",zzounds:"$699.99"}},
  142: {prices:{amazon:"$684.39",zzounds:"$699.99",andertons:"£489.00",gear4music:"£489.00",musicstore:"€513.45"}},
  143: {prices:{amazon:"$1,899.00",zzounds:"$1,899.00",andertons:"£1,549.00",gear4music:"£1,634.00",musicstore:"€1,673.95"}},
  144: {prices:{gear4music:"£286.00",amazon:"$299.99",andertons:"£249.00",zzounds:"$299.00",musicstore:"€242.86"}},
  145: {prices:{amazon:"$509.00",andertons:"£315.00",gear4music:"£315.00",musicstore:"€130.25"},oos:["zzounds"]},
  146: {prices:{amazon:"$380.00",zzounds:"$379.99",andertons:"£281.00",gear4music:"£302.50",musicstore:"€261.34"}},
  147: {prices:{amazon:"$1,099.99",zzounds:"$1,199.99",andertons:"£829.00",gear4music:"£835",musicstore:"€656.03"}},
  148: {prices:{gear4music:"£2009.00",amazon:"$2,499.00",andertons:"£1,452.00",musicstore:"€1,482.27"},oos:["zzounds"]},
  149: {prices:{gear4music:"£504.00",amazon:"$675.00",zzounds:"$573.74",andertons:"£599.00",musicstore:"€423.03"}},
  150: {prices:{gear4music:"£188.50",amazon:"$268.00",andertons:"£169.00",musicstore:"€167.23"},oos:["zzounds"]},
  151: {prices:{gear4music:"£407.00",amazon:"$374.99",musicstore:"€335.29"},oos:["zzounds","andertons"]},
  152: {prices:{amazon:"$1,232.49",zzounds:"$1,232.49",andertons:"£975.00",gear4music:"£989.00",musicstore:"€917.31"}},
  153: {prices:{amazon:"$399.00",zzounds:"$399.00",andertons:"£295.00",gear4music:"£322.00",musicstore:"€74.79"}},
  154: {prices:{amazon:"$390.99",andertons:"£394.00",gear4music:"£394.00",musicstore:"€366.47"},oos:["zzounds"]},
  155: {prices:{amazon:"$1,689.99",zzounds:"$1,889.99",andertons:"£1,879.00",gear4music:"£1,879.00",musicstore:"€1,775.63"}},
  156: {prices:{amazon:"$1,739.99",zzounds:"$1,939.99",andertons:"£1,799.00",musicstore:"€1,847.90",gear4music:"£1849.00"}},
  157: {prices:{amazon:"$529.99",andertons:"£399.00",gear4music:"£389.00",musicstore:"€354.12"},oos:["zzounds"]},
  158: {prices:{amazon:"$351.49",andertons:"£249.00",gear4music:"£251.50",musicstore:"€217.65",zzounds:"$369.99"}},
  159: {prices:{amazon:"$419.99",zzounds:"$419.99",andertons:"£399.00",gear4music:"£399.00",musicstore:"€281.51"}},
  160: {prices:{amazon:"$379.99",zzounds:"$379.99",andertons:"£349.00",gear4music:"£296.00",musicstore:"€281.51"}},
  161: {prices:{amazon:"$399.99",zzounds:"$399.99",andertons:"£399.00",gear4music:"£399.00"}},
  162: {prices:{andertons:"£799.00",gear4music:"£599.00"},oos:["zzounds","musicstore"]},
  163: {prices:{zzounds:"$599.00",andertons:"£349.00",gear4music:"£419.00"}},
  164: {prices:{amazon:"$649.00",zzounds:"$649.00",andertons:"£229.00",gear4music:"£599.00"},oos:["musicstore"]},
  165: {prices:{zzounds:"$649.00",gear4music:"£579.00",amazon:"$599.00",musicstore:"€360.50"},oos:["andertons"]},
  166: {prices:{andertons:"£319.00",gear4music:"£349.00",amazon:"$399.00",musicstore:"€293.28"},oos:["zzounds"]},
  167: {prices:{amazon:"$54.95",zzounds:"$65.95",gear4music:"£44.99",musicstore:"€41.68"},oos:["andertons"]},
  170: {urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/G4M-Acoustics-Squarewave-4-Pack/5KYU"},oos:["gear4music"]},
  173: {prices:{gear4music:"£17.99",amazon:"$23.00",musicstore:"€24.37"},oos:["andertons"]},
  174: {prices:{gear4music:"£3499.00",amazon:"$3473.73",zzounds:"$3,499.99",andertons:"£2,899.00",musicstore:"€2,764.71"}},
  175: {prices:{gear4music:"£4337.00",amazon:"$4399.99",zzounds:"$3,499.99",andertons:"£3,899.00",musicstore:"€4,193.28"}},
  176: {prices:{amazon:"$3299.00",zzounds:"$3,499.00",andertons:"£4,999.00",gear4music:"£2,850.00",musicstore:"€2,568.91"}},
  177: {prices:{amazon:"$2,995.00",gear4music:"£2,899.00"},oos:["andertons","musicstore"]},
  178: {prices:{amazon:"$1,199.00",gear4music:"£1,079.00",musicstore:"€987.90"},oos:["andertons"]},
  180: {prices:{amazon:"$3,999.99",gear4music:"£2,954.00",musicstore:"€2,393.19"},oos:["andertons"]},
  181: {prices:{amazon:"$4,199.00",gear4music:"£3,120.00",musicstore:"€2,520.17"},oos:["andertons"]},
  182: {prices:{amazon:"$4999.00",zzounds:"$3,899.00",andertons:"£3,821.00",gear4music:"£3,859.00",musicstore:"€1,867.23"}},
  183: {prices:{amazon:"$3199.00",zzounds:"$3,199.00",andertons:"£2,035.00",gear4music:"£2,213.00",musicstore:"€1,797.48"}},
  184: {prices:{amazon:"$2,299.99",zzounds:"$2,299.99",andertons:"£1,999.00",gear4music:"£2,309.00",musicstore:"€1,931.93"}},
  185: {prices:{amazon:"$2299.99",zzounds:"$2,299.99",andertons:"£2,049.00",gear4music:"£2,079.00",musicstore:"€2,633.61"}},
  186: {prices:{gear4music:"£2599.00",amazon:"$2749.00",zzounds:"$2,549.00",andertons:"£2,599.00",musicstore:"€2,015.97"}},
  187: {prices:{gear4music:"£2599.00",amazon:"$3499.00",zzounds:"$3,499.00",andertons:"£2,566.00",musicstore:"€2,680.67"}},
  188: {prices:{amazon:"$1699.00",zzounds:"$1,699.00",andertons:"£1,399.00",gear4music:"£1,399.00",musicstore:"€1,129.16"}},
  189: {prices:{amazon:"$2,149.99",zzounds:"$2,149.99",andertons:"£1,099.00",gear4music:"£1,649",musicstore:"€1,511.76"}},
  190: {prices:{amazon:"$2749.00",zzounds:"$2,749.00",andertons:"£1,799.00",gear4music:"£1,891",musicstore:"€1,847.90"},oos:["andertons"]},
  191: {prices:{gear4music:"£363.50",amazon:"$479.00",zzounds:"$399.99",andertons:"£339.00",musicstore:"€461.34"}},
  192: {prices:{amazon:"$424.99",zzounds:"$424.99",andertons:"£451.00",gear4music:"£263.00",musicstore:"€432.77"}},
  193: {prices:{gear4music:"£369.00",amazon:"$499.99",zzounds:"$499.99",andertons:"£349.00",musicstore:"€209.24"}},
  194: {prices:{amazon:"$199.00",zzounds:"$199.00",andertons:"£272.00",gear4music:"£273.50",musicstore:"€259.66"}},
  195: {prices:{amazon:"$119.99"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Elgato-WAVE3-Microphone/43BD",musicstore:"€125.21"},oos:["andertons"]},
  196: {prices:{amazon:"$99.00",zzounds:"$99.00",andertons:"£79.00",gear4music:"£80.60",musicstore:"€82.35"}},
  197: {prices:{amazon:"$99.00",zzounds:"$86.00",andertons:"£86.00",gear4music:"£93.00",musicstore:"€68.91"}},
  198: {prices:{gear4music:"£106.50",amazon:"$79.00",zzounds:"$109.00",andertons:"£97.00",musicstore:"€84.03"}},
  199: {prices:{gear4music:"£319.00",amazon:"$399.00",zzounds:"$499.00",andertons:"£299.00",musicstore:"€310.08"}},
  200: {prices:{amazon:"$204.99",zzounds:"$219.99",andertons:"£219.00",gear4music:"£184.75",musicstore:"€155.46"}},
  201: {prices:{amazon:"$83.90",andertons:"£58.00",gear4music:"£70.00",musicstore:"€74.79"},oos:["zzounds"]},
  202: {prices:{amazon:"$599.99",zzounds:"$599.99",andertons:"£479.00",gear4music:"£549.00",musicstore:"€522.69"}},
  203: {prices:{amazon:"$228.50",zzounds:"$229.99",gear4music:"£219.00",musicstore:"€503.36",andertons:"£219.00"}},
  204: {prices:{gear4music:"£284.00",amazon:"$349.99",zzounds:"$384.99",andertons:"£309.00",musicstore:"€377.31"}},
  205: {prices:{gear4music:"£419.00",amazon:"$449.00",zzounds:"$499.00",andertons:"£439.00",musicstore:"€419.33"}},
  206: {prices:{amazon:"$1599.00",zzounds:"$1,599.00",andertons:"£1,399.00",gear4music:"£478.00",musicstore:"€1,626.05"}},
  207: {prices:{amazon:"$1,762.00",andertons:"£1,069.00",gear4music:"£1,099.00",musicstore:"€1,074.79"}},
  208: {prices:{amazon:"$849.00",zzounds:"$899.00",andertons:"£709.00",gear4music:"£709.28",musicstore:"€755.46"}},
  209: {prices:{amazon:"$1,399.00",andertons:"£879.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Austrian-Audio-OC818-Studio-Set-Black/4PIK",musicstore:"€755.46"},oos:["zzounds"]},
  210: {prices:{amazon:"$219.00",zzounds:"$219.00",andertons:"£149.00",gear4music:"£149.50",musicstore:"€127.73"}},
  211: {prices:{gear4music:"£372.00",amazon:"$399.00",zzounds:"$499.99",andertons:"£372.00",musicstore:"€461.34"}},
  212: {prices:{gear4music:"£193.50",amazon:"$219.00",zzounds:"$219.00",andertons:"£193.00",musicstore:"€147.90"}},
  213: {prices:{amazon:"$199.00",zzounds:"$199.00",andertons:"£179.00",gear4music:"£185.50",musicstore:"€318.49"}},
  214: {prices:{gear4music:"£112.75",amazon:"$429.00",zzounds:"$429.00",andertons:"£295.00",musicstore:"€293.28"}},
  215: {prices:{gear4music:"£532.00",amazon:"$660.00",andertons:"£405.00",musicstore:"€461.34"},oos:["zzounds"]},
  216: {prices:{gear4music:"£1,016.00",amazon:"$1,699.00",andertons:"£899.00",musicstore:"€1,091.60"},oos:["zzounds"]},
  217: {prices:{gear4music:"£918.00",amazon:"$949.00",zzounds:"$949.00",andertons:"£787.00",musicstore:"€797.48"}},
  218: {prices:{amazon:"$669.99",zzounds:"$589.99",andertons:"£463.00",gear4music:"£488.00",musicstore:"€478.15"}},
  219: {prices:{gear4music:"£568.00",amazon:"$696.99",zzounds:"$696.99",andertons:"£555.00",musicstore:"€545.38"}},
  220: {prices:{gear4music:"£666.63",zzounds:"$949.00",amazon:"$949.00",musicstore:"€646.22",andertons:"£699.00"}},
  221: {prices:{amazon:"$2,100.00",musicstore:"€1,847.90"},oos:["andertons"]},
  222: {prices:{}},
  223: {prices:{gear4music:"£2,149.99",amazon:"$3,499.00",musicstore:"€2,688.24",andertons:"£2,149.00"}},
  224: {prices:{gear4music:"£1,786.00",amazon:"$2,299.00",zzounds:"$2,299.00",musicstore:"€2,184.03",andertons:"£1,675.00"}},
  225: {prices:{amazon:"$549.00",zzounds:"$549.00",andertons:"£429.00",gear4music:"£452.00",musicstore:"€461.34"}},
  226: {prices:{amazon:"$179.00",zzounds:"$179.00",andertons:"£125.00",musicstore:"€150.42",gear4music:"£161.50"}},
  227: {prices:{gear4music:"£150.00",amazon:"$199.95",zzounds:"$199.95",andertons:"£149.00",musicstore:"€150.42"}},
  228: {prices:{gear4music:"£151.25",amazon:"$214.00",zzounds:"$219.00",andertons:"£149.00",musicstore:"€108.40"}},
  229: {prices:{gear4music:"£249.00",amazon:"$249.00",zzounds:"$249.00",andertons:"£249.00",musicstore:"€222.69"}},
  230: {prices:{gear4music:"£75.00",amazon:"$131.60",zzounds:"$139.00",andertons:"£99.00",musicstore:"€125.21"}},
  231: {prices:{amazon:"$259.00",andertons:"£259.00",gear4music:"£236.50",musicstore:"€335.29"},oos:["zzounds"]},
  232: {prices:{amazon:"$169.00",zzounds:"$169.00",andertons:"£179.00",gear4music:"£136.00",musicstore:"€158.82"}},
  233: {prices:{amazon:"$2,199.99",zzounds:"$2,199.99",andertons:"£1,599.00",gear4music:"£1,770.00",musicstore:"€1,931.93"}},
  234: {prices:{amazon:"$3499.00",zzounds:"$3,849.00",andertons:"£2,549.00",musicstore:"€2,520.17"},oos:["gear4music"]},
  235: {prices:{amazon:"$999.00",zzounds:"$1,099.00",andertons:"£803.00",gear4music:"£896.00",musicstore:"€2,044.54"}},
  236: {prices:{gear4music:"£1,139.00",amazon:"$1,349.00",zzounds:"$1,499.00",andertons:"£1,149.00",musicstore:"€1,511.76"}},
  237: {prices:{gear4music:"£1,452.00",amazon:"$1,739.99",andertons:"£1,452.00",musicstore:"€1,427.73"}},
  238: {prices:{pluginboutique:"$99.00",gear4music:"£39.00",amazon:"$99.00",musicstore:"€83.19"},oos:["andertons"]},
  239: {prices:{amazon:"$499.00",zzounds:"$488.00",andertons:"£390.00",gear4music:"£899",musicstore:"€323.53"}},
  240: {prices:{gear4music:"£358.00",amazon:"$499.99",zzounds:"$459.99",andertons:"£379.00",musicstore:"€251.26"}},
  243: {prices:{amazon:"$159.99",musicstore:"€167.23"},oos:["andertons"]},
  244: {prices:{gear4music:"£239.50",amazon:"$249.00",zzounds:"$229.00",andertons:"£251.00",musicstore:"€293.28"}},
  246: {prices:{amazon:"$169.99"},oos:["andertons"]},
  247: {prices:{gear4music:"£699.00",amazon:"$799.99",zzounds:"$799.99",andertons:"£521.00",musicstore:"€419.33"}},
  248: {prices:{amazon:"$529.00",zzounds:"$595.00",andertons:"£523.00",gear4music:"£523.00",musicstore:"€533.61"}},
  249: {prices:{amazon:"$219.00",musicstore:"€276.47"},oos:["andertons"]},
  250: {prices:{gear4music:"£261.50",amazon:"$260.00",zzounds:"$260.00",andertons:"£258.00",musicstore:"€335.29"}},
  251: {prices:{amazon:"$76.00"},oos:["andertons"]},
  252: {prices:{gear4music:"£177.00",amazon:"$209.00",zzounds:"$193.58",andertons:"£173.00",musicstore:"€200.84"}},
  253: {prices:{amazon:"$109.99"},oos:["andertons","musicstore"]},
  254: {prices:{amazon:"$78.99",musicstore:"€209.24"},oos:["andertons"]},
  255: {prices:{amazon:"$449.99",zzounds:"$519.99",andertons:"£452.00",gear4music:"£549",musicstore:"€419.33"}},
  256: {prices:{amazon:"$799.00",zzounds:"$799.00",andertons:"£719.00",gear4music:"£829",musicstore:"€755.46"}},
  257: {prices:{gear4music:"£339.00",amazon:"$399.00",zzounds:"$399.00",andertons:"£329.00",musicstore:"€461.34"}},
  258: {prices:{gear4music:"£249.99",amazon:"$249.99",zzounds:"$199.99",andertons:"£249.00",musicstore:"€335.29"}},
  259: {prices:{gear4music:"£414.00",amazon:"$499.99",zzounds:"$599.99",andertons:"£399.00",musicstore:"€503.36"}},
  260: {prices:{amazon:"$349.99",gear4music:"£329.99",musicstore:"€293.28"},oos:["zzounds","andertons"]},
  261: {prices:{amazon:"$229.00"},oos:["andertons"]},
  262: {prices:{amazon:"$129.99",zzounds:"$129.99",andertons:"£91.00",gear4music:"£93.10",musicstore:"€167.23"}},
  263: {prices:{amazon:"$299.00",zzounds:"$299.00",andertons:"£225.00",gear4music:"£234.00",musicstore:"€234.45"}},
  264: {prices:{gear4music:"£229.99",amazon:"$229.99"},oos:["andertons"]},
  265: {prices:{amazon:"$149.90"},oos:["andertons"]},
  266: {prices:{gear4music:"£1,135.00",amazon:"$1,749.00",zzounds:"$1,749.00",andertons:"£1,180.00",musicstore:"€1,091.60"}},
  267: {prices:{amazon:"$989.00",zzounds:"$989.00",andertons:"£859.00",gear4music:"£1,399",musicstore:"€231.09"}},
  268: {prices:{amazon:"$1,699.95"},oos:["andertons"]},
  269: {prices:{amazon:"$989.00",zzounds:"$999.00",andertons:"£866.00",gear4music:"£813",musicstore:"€1,867.23"}},
  270: {prices:{amazon:"$219.99"},oos:["andertons","musicstore"]},
  271: {prices:{amazon:"$599.00",andertons:"£449.00",gear4music:"£519",musicstore:"€461.34"},oos:["zzounds"]},
  272: {prices:{amazon:"$879.99",andertons:"£699.00",gear4music:"£700.00",musicstore:"€696.64"}},
  273: {prices:{amazon:"$879.99",andertons:"£699.00",gear4music:"£706.00",musicstore:"€621.01"}},
  274: {prices:{gear4music:"£309.00",amazon:"$239.99",musicstore:"€335.29"},oos:["andertons"]},
  275: {prices:{gear4music:"£349.00",amazon:"$329.99",musicstore:"€335.29"},oos:["zzounds","andertons"]},
  276: {prices:{gear4music:"£95.00",amazon:"$69.99",zzounds:"$99.99",musicstore:"€74.79"},oos:["andertons"]},
  277: {prices:{amazon:"$69.99"},oos:["andertons"]},
  278: {prices:{amazon:"$67.99"},oos:["andertons"]},
  279: {prices:{amazon:"$54.99"},oos:["andertons"]},
  280: {prices:{amazon:"$41.00",zzounds:"$39.99",gear4music:"£36.00",andertons:"£36.00",musicstore:"€32.77"},oos:["andertons"]},
  281: {prices:{amazon:"$45.00",zzounds:"$44.99",gear4music:"£39.00",andertons:"£39.00",musicstore:"€35.29"},oos:["andertons"]},
  284: {prices:{amazon:"$30.00"},oos:["andertons"]},
  286: {prices:{gear4music:"£135.50",amazon:"$159.00",andertons:"£129.00"}},
  287: {prices:{amazon:"$19.99",zzounds:"$19.99",gear4music:"£17.00",andertons:"£17.00",musicstore:"€15.97"},oos:["andertons"]},
  289: {prices:{amazon:"$32.99"},oos:["andertons"]},
  290: {prices:{gear4music:"£99.99",amazon:"$149.00",zzounds:"$109.00"},oos:["andertons"]},
  291: {prices:{gear4music:"£149.00",amazon:"$168.00",zzounds:"$169.00",andertons:"£149.00",musicstore:"€108.40"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Audio-Technica-AT2020USBX-Cardioid-Condenser-Microphone/528M"},oos:["gear4music"]},
  292: {prices:{amazon:"$103.00",zzounds:"$105.00",gear4music:"£89.50",andertons:"£85.00",musicstore:"€74.79"}},
  293: {prices:{gear4music:"£302.50",amazon:"$329.99",zzounds:"$369.99",andertons:"£299.00"}},
  294: {prices:{gear4music:"£279.00",amazon:"$279.00",zzounds:"$349.00",musicstore:"€377.31",andertons:"£269.00"}},
  295: {prices:{amazon:"$295.99"},oos:["andertons"]},
  296: {prices:{amazon:"$699.00",andertons:"£799.00",musicstore:"€1,007.56"}},
  297: {prices:{amazon:"$154.00",zzounds:"$159.00",andertons:"£122.00",gear4music:"£119.99",musicstore:"€140.34"}},
  298: {prices:{amazon:"$159.00",zzounds:"$159.00",andertons:"£159.00",musicstore:"€150.42",gear4music:"£166.50"}},
  299: {prices:{gear4music:"£120.00",amazon:"$198.00",zzounds:"$199.00",andertons:"£159.00",musicstore:"€251.26"}},
  300: {prices:{andertons:"£499.00",amazon:"$599.00",zzounds:"$599.00"}},
  301: {prices:{andertons:"£629.00",gear4music:"£629.00",musicstore:"€587.40",amazon:"$759.00"}},
  302: {prices:{gear4music:"£499.00",amazon:"$599.99",zzounds:"$299.99",andertons:"£249.00",musicstore:"€503.36"}},
  303: {prices:{gear4music:"£293.50",amazon:"$395.00",andertons:"£288.00",musicstore:"€438.66"},oos:["zzounds"]},
  304: {prices:{andertons:"£449.00",gear4music:"£249.99",amazon:"$599.00",musicstore:"€250.42"},oos:["zzounds"]},
  305: {prices:{gear4music:"£504.42",amazon:"$593.75",zzounds:"$599.00",andertons:"£499.00",musicstore:"€331.18"}},
  306: {prices:{gear4music:"£267.50",amazon:"$289.99",zzounds:"$349.99",andertons:"£260.00",musicstore:"€251.26"}},
  307: {prices:{amazon:"$349.00",zzounds:"$349.00",andertons:"£276.99",gear4music:"£295.00",musicstore:"€250.42"}},
  308: {prices:{gear4music:"£650.00",amazon:"$799.99",zzounds:"$799.99",andertons:"£609.00",musicstore:"€317.06"}},
  309: {prices:{amazon:"$139.99"},oos:["andertons"]},
  310: {prices:{amazon:"$319.99",zzounds:"$319.99",gear4music:"£229",musicstore:"€202.52",andertons:"£239.00"}},
  311: {prices:{amazon:"$499.99",zzounds:"$499.99",gear4music:"£379",musicstore:"€377.31",andertons:"£399.00"}},
  312: {prices:{amazon:"$949.00",zzounds:"$949.00",andertons:"£799.00",gear4music:"£829",musicstore:"€626.89"}},
  313: {prices:{gear4music:"£149.00",amazon:"$249.99",zzounds:"$249.99",andertons:"£139.00",musicstore:"€209.24"}},
  314: {prices:{gear4music:"£398.00",amazon:"$419.99",musicstore:"€335.29"},oos:["andertons"]},
  315: {prices:{gear4music:"£295.00",amazon:"$259.99",zzounds:"$259.99",andertons:"£299.00",musicstore:"€293.28"}},
  316: {prices:{amazon:"$449.99",zzounds:"$449.99",andertons:"£449.00",musicstore:"€412.27"}},
  317: {prices:{zzounds:"$1,149.00",andertons:"£1,199.00"},oos:["gear4music"]},
  318: {prices:{gear4music:"£1,690.00",amazon:"$2199.99",zzounds:"$2,199.99",andertons:"£1,699.00",musicstore:"€1,482.27"}},
  319: {prices:{amazon:"$2,275.00",zzounds:"$2,629.00",andertons:"£2,199.00"},urls:{gear4music:"https://www.gear4music.com/Guitar-and-Bass/ESP-E-II-Eclipse-Tobacco-Sunburst/273H",musicstore:"€1,847.90"}},
  320: {prices:{gear4music:"£799.00",amazon:"$649.95",zzounds:"$949.00",andertons:"£799.00",musicstore:"€671.43"}},
  321: {prices:{gear4music:"£508.00",amazon:"$467.00",zzounds:"$549.00",andertons:"£505.00",musicstore:"€438.66"}},
  322: {prices:{gear4music:"£599.00",amazon:"$639.49",zzounds:"$749.00",andertons:"£598.00",musicstore:"€923.53"}},
  323: {prices:{amazon:"$99.00",zzounds:"$99.99",andertons:"£91.00",gear4music:"£91.30",musicstore:"€105.04"},urls:{zzounds:"https://www.zzounds.com/item--AKAMPKMINI3"}},
  324: {prices:{amazon:"$129.99",zzounds:"$129.99",andertons:"£89.00",gear4music:"£102.75",musicstore:"€115.97"}},
  325: {prices:{gear4music:"£380.00",amazon:"$549.00",zzounds:"$549.00",musicstore:"€503.36",andertons:"£379.00"}},
  326: {prices:{zzounds:"$499.00",andertons:"£399.00",gear4music:"$499.00"}},
  327: {prices:{amazon:"$109.97"},oos:["andertons","musicstore"]},
  328: {prices:{gear4music:"£139.99",amazon:"$219.00",zzounds:"$219.00",andertons:"£152.00",musicstore:"€199.16"}},
  329: {prices:{amazon:"$199.00",zzounds:"$229.00",andertons:"£164.00",gear4music:"£167.50"},oos:["musicstore"]},
  330: {prices:{gear4music:"£16.80",amazon:"$20.99",andertons:"£16.00",musicstore:"€15.97"},oos:["zzounds"]},
  331: {prices:{andertons:"£3,579.00",musicstore:"€3,589.92"}},
  332: {prices:{gear4music:"£540.00",amazon:"$599.00",zzounds:"$599.00",andertons:"£399.00",musicstore:"€472.44"}},
  333: {prices:{gear4music:"£246.00",amazon:"$459.99",andertons:"£249.00",musicstore:"€239.50"}},
  334: {prices:{gear4music:"£1,708.00",amazon:"$3,299.99",zzounds:"$3,299.99",andertons:"£1,499.00",musicstore:"€2,100.00"}},
  335: {prices:{amazon:"$999.99",zzounds:"$744.95",andertons:"£649.00"},urls:{gear4music:"https://www.gear4music.com/PA-DJ-and-Lighting/Korg-Soundlink-MW1608-Hybrid-Mixer/38AJ"},oos:["musicstore"]},
  336: {prices:{amazon:"$249.99",zzounds:"$249.99"},urls:{gear4music:"https://www.gear4music.com/PA-DJ-and-Lighting/Mackie-Mobile-Mix-8-Channel-USB-Mixer/651Y",musicstore:"€209.24"},oos:["andertons"]},
  337: {prices:{gear4music:"£1,565.79",amazon:"$1,999.00",zzounds:"$1,999.00",andertons:"£1,565.00",musicstore:"€1,259.66"}},
  338: {prices:{andertons:"£1,019.00",musicstore:"€587.39"},oos:["zzounds","gear4music"]},
  339: {prices:{gear4music:"£739.00",amazon:"$999.00",zzounds:"$999.00",andertons:"£949.00",musicstore:"€839.34"}},
  340: {prices:{amazon:"$485.00",zzounds:"$485.00",andertons:"£449.00",gear4music:"£491.00",musicstore:"€478.15"}},
  341: {prices:{amazon:"$559.00",zzounds:"$641.52",andertons:"£599.00",gear4music:"£564.00",musicstore:"€574.79"}},
  342: {prices:{amazon:"$329.95",zzounds:"$349.00",andertons:"£319.00",gear4music:"£223.50",musicstore:"€221.85"}},
  343: {prices:{amazon:"$269.00",zzounds:"$269.00",musicstore:"€293.28"},oos:["andertons","gear4music"]},
  344: {prices:{amazon:"$399.00"},na:["zzounds","reverb","gear4music","andertons","musicstore"]},
  345: {prices:{gear4music:"£189.00",amazon:"$239.40",zzounds:"$239.40",andertons:"£199.00",musicstore:"€186.55"}},
  346: {prices:{gear4music:"£173.75",amazon:"$187.51",zzounds:"$219.00",musicstore:"€145.38"},oos:["andertons"]},
  347: {prices:{gear4music:"£180.82",zzounds:"$249.99",andertons:"£175.00",amazon:"$199.99",musicstore:"€167.23"}},
  348: {prices:{gear4music:"£482.39",zzounds:"$599.99",andertons:"£433.00",amazon:"$479.99",musicstore:"€419.33"}},
  349: {prices:{zzounds:"$1,249.00",andertons:"£899.00",amazon:"$1,090.00",gear4music:"£881",musicstore:"€797.48"}},
  350: {prices:{zzounds:"$228.99",amazon:"$228.99",andertons:"£189.00"},oos:["musicstore"]},
  352: {prices:{gear4music:"£179.00",amazon:"$189.00",zzounds:"$249.99",andertons:"£149.00"},oos:["musicstore"]},
  353: {prices:{gear4music:"£499.00",amazon:"$529.99",musicstore:"€539.00"},oos:["andertons"]},
  354: {prices:{gear4music:"£499.00",andertons:"£379.00",amazon:"$599.00",musicstore:"€419.33"},oos:["zzounds"]},
  355: {prices:{gear4music:"£339.00",andertons:"£399.00",musicstore:"€335.29"},oos:["zzounds","amazon"]},
  356: {prices:{gear4music:"£189.00",amazon:"$199.99",musicstore:"€219.00"},oos:["andertons"]},
  357: {prices:{gear4music:"£515.00",amazon:"$599.99",andertons:"£499.00"}},
  358: {prices:{amazon:"$189.00",zzounds:"$189.00",musicstore:"€124.37"},oos:["andertons"]},
  359: {prices:{gear4music:"£87.70",amazon:"$94.99",musicstore:"€82.35"},oos:["andertons"]},
  360: {prices:{amazon:"$1499.00",zzounds:"$1,499.00"},oos:["andertons","musicstore"]},
  361: {prices:{gear4music:"£886.00",amazon:"$999.00",zzounds:"$999.99",andertons:"£829.00",musicstore:"€755.46"}},
  362: {prices:{amazon:"$649.00",zzounds:"$649.00",andertons:"£479.00",gear4music:"£419.00",musicstore:"€377.31"}},
  363: {prices:{amazon:"$279.99",zzounds:"$279.99",gear4music:"£222.00",andertons:"£209.00",musicstore:"€219.33"}},
  364: {prices:{amazon:"$499.00",zzounds:"$499.00",andertons:"£549.00",gear4music:"£499.00",musicstore:"€461.34"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/beyerdynamic-M160-Double-Ribbon-Microphone/92T"}},
  365: {prices:{amazon:"$477.73",zzounds:"$519.00",andertons:"£466.00",gear4music:"£466.00",musicstore:"€436.13"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/sE-Electronics-VR2-Voodoo-Active-Ribbon-Mic/DRQ",zzounds:"https://www.zzounds.com/item--SEEVR2"}},
  366: {prices:{amazon:"$99.95",zzounds:"$99.95",musicstore:"€116.81"},oos:["andertons"]},
  370: {prices:{amazon:"$384.99",zzounds:"$384.99",andertons:"£329.00",gear4music:"£329.00",musicstore:"€310.08"},urls:{gear4music:"https://www.gear4music.com/Keyboards-and-Pianos/Roland-GOKEYS-3-Music-Creation-Keyboard-Midnight-Blue/6AB8",zzounds:"https://www.zzounds.com/item--ROLGOKEYS3"}},
  371: {prices:{amazon:"$199.99",zzounds:"$199.99",andertons:"£149.00",gear4music:"£155.00",musicstore:"€167.98"}},
  372: {prices:{amazon:"$795.00",andertons:"£517.00",gear4music:"£540.00",musicstore:"€453.78"},oos:["zzounds"]},
  373: {prices:{pluginboutique:"$199.00"}},
  374: {prices:{pluginboutique:"$99.00"}},
  375: {prices:{gear4music:"£88.00",pluginboutique:"$99.00"}},
  376: {prices:{pluginboutique:"$12.00"}},
  377: {prices:{gear4music:"£99.00",pluginboutique:"$129.00"}},
  378: {prices:{pluginboutique:"$89.00"}},
  379: {prices:{pluginboutique:"$175.00"}},
  380: {prices:{pluginboutique:"$97.00"}},
  381: {prices:{pluginboutique:"$224.00"}},
  382: {prices:{pluginboutique:"$79.00"}},
  383: {prices:{gear4music:"£62.00",pluginboutique:"$129.00"}},
  384: {prices:{musicstore:"€105.04",pluginboutique:"$59.00"}},
  385: {prices:{pluginboutique:"$80.00"}},
  386: {prices:{pluginboutique:"$199.00"}},
  387: {prices:{pluginboutique:"$39.00"}},
  388: {prices:{pluginboutique:"$149.00"}},
  389: {prices:{gear4music:"£126.55",pluginboutique:"$49.00"}},
  390: {prices:{gear4music:"£39.30",pluginboutique:"$199.00"}},
  391: {prices:{pluginboutique:"$49.00"}},
  392: {prices:{pluginboutique:"$99.00",gear4music:"£75.00"}},
  393: {prices:{pluginboutique:"$45.00"}},
  394: {prices:{pluginboutique:"$79.00"}},
  395: {prices:{amazon:"$467.46",zzounds:"$499.99",gear4music:"£428.00",andertons:"£419.00",musicstore:"€422.69"}},
  396: {prices:{amazon:"$419.00",gear4music:"£289.00",andertons:"£266.00",musicstore:"€250.42"},oos:["zzounds"]},
  397: {prices:{amazon:"$699.99",zzounds:"$699.99",gear4music:"£544.00",andertons:"£522.00",musicstore:"€486.55"}},
  398: {prices:{zzounds:"$1,495.00",musicstore:"€1,175.63",amazon:"$1,295"},oos:["andertons"]},
  399: {prices:{musicstore:"€318.49"},oos:["zzounds","amazon"]},
  400: {prices:{amazon:"$1,299.99",zzounds:"$1,399.99",andertons:"£1,260.00",musicstore:"€1,032.77"}},
  401: {prices:{amazon:"$899.00",gear4music:"£777.00",andertons:"£849.00",musicstore:"€713.45",zzounds:"$999.00"}},
  402: {prices:{amazon:"$1,999.00",gear4music:"£1,447.00",andertons:"£1,234.00",musicstore:"€1,306.72"},oos:["zzounds"]},
  403: {prices:{gear4music:"£3,139.00",amazon:"$2,499",andertons:"£2,599.00",musicstore:"€2,501.68"},oos:["zzounds"]},
  406: {prices:{zzounds:"$1,599.99",gear4music:"£1,510.00",amazon:"$1,599.99",andertons:"£1,099.00",musicstore:"€1,503.36"}},
  408: {prices:{zzounds:"$1,399.99",amazon:"$1,399.99",gear4music:"£1,036.00",andertons:"£1,799.00",musicstore:"€1,365.46"}},
  410: {prices:{amazon:"$1,499.00",zzounds:"$1,499.00",gear4music:"£719.00",andertons:"£749.00",musicstore:"€713.45"}},
  411: {prices:{amazon:"$1,699.99",andertons:"£1,399.00"}},
  412: {prices:{amazon:"$2,499.00",andertons:"£1,614.00",musicstore:"€1,678.99"}},
  413: {prices:{amazon:"$1,689.99",musicstore:"€1,427.73"}},
  414: {prices:{amazon:"$5,199.00",gear4music:"£4,499.00",andertons:"£3,249.00",musicstore:"€2,889.92"}},
  415: {prices:{musicstore:"€8,402.52"}},
  416: {prices:{amazon:"$25,490.00",musicstore:"€24,368.91"}},
  417: {prices:{amazon:"$5,999.00",gear4music:"£5,249.00",musicstore:"€5,461.34"}},
  418: {prices:{amazon:"$2,999.00",andertons:"£3,449.00",musicstore:"€3,360.50"}},
  419: {prices:{amazon:"$99.00",gear4music:"£75.00"}},
  420: {prices:{amazon:"$99.00",gear4music:"£51.80"}},
  421: {prices:{amazon:"$249.00",gear4music:"£75.00"}},
  422: {prices:{amazon:"$279.00",gear4music:"£149.00"}},
  423: {prices:{amazon:"$349.00",gear4music:"£255.00"}},
  424: {prices:{amazon:"$599.00",gear4music:"£559.00"}},
  425: {prices:{amazon:"$179.00"}},
  426: {prices:{amazon:"$149.00",gear4music:"£139.00"}},
  427: {prices:{amazon:"$99.00",gear4music:"£87.40"}},
  428: {prices:{amazon:"$37.49",zzounds:"$37.49"}},
  429: {prices:{amazon:"$75.99",zzounds:"$79.99",gear4music:"£69.00",andertons:"£69.00",musicstore:"€63.03"}},
  430: {prices:{amazon:"$39.99",zzounds:"$39.99",gear4music:"£35.00",andertons:"£35.00",musicstore:"€31.93"}},
  431: {prices:{amazon:"$90.88",zzounds:"$105.00",gear4music:"£92.80",andertons:"£75.00",musicstore:"€82.40"}},
  432: {prices:{amazon:"$99.99"}},
  433: {prices:{amazon:"$143.39",zzounds:"$149.99",andertons:"£199.00"}},
  434: {prices:{amazon:"$79.99",gear4music:"£95.00",andertons:"£99.00",musicstore:"€88.24"}},
  435: {prices:{amazon:"$39.90",gear4music:"£26.70",andertons:"£25.00",musicstore:"€38.70"}},
  436: {prices:{amazon:"$49.99"},oos:["zzounds","reverb","gear4music","andertons","musicstore"]},
  437: {prices:{amazon:"$37.99"}},
  438: {prices:{amazon:"$52.13",zzounds:"$79.99",gear4music:"£50.00",andertons:"£62.00",musicstore:"€56.10"}},
  439: {prices:{amazon:"$35.99"}},
  440: {prices:{amazon:"$2,299.99",zzounds:"$2,299.99",gear4music:"£1,899.00",musicstore:"€1,847.90",andertons:"£1,999.00"}},
  441: {prices:{amazon:"$849.99",zzounds:"$849.99",gear4music:"£749.00",musicstore:"€754.62",andertons:"£799.00"}},
  442: {prices:{amazon:"$849.99",zzounds:"$849.99",gear4music:"£779.00",musicstore:"€713.45",andertons:"£779.00"}},
  443: {prices:{amazon:"$83.50",zzounds:"$83.50",gear4music:"£67.90",musicstore:"€74.79",andertons:"£69.99"}},
  444: {prices:{amazon:"$849.99",zzounds:"$849.99",gear4music:"£699.00",musicstore:"€671.43",andertons:"£699.00"}},
  445: {prices:{amazon:"$259.99",zzounds:"$259.99",gear4music:"£219.00",musicstore:"€209.24",andertons:"£229.00"}},
  446: {prices:{amazon:"$399.00",zzounds:"$399.00",gear4music:"£349.00",musicstore:"€326.89"}},
  447: {prices:{amazon:"$269.95",gear4music:"£249.00",musicstore:"€226.05",andertons:"£259.00"}},
  448: {prices:{amazon:"$209.99",zzounds:"$209.99",gear4music:"£189.00",musicstore:"€186.55",andertons:"£198.00"}},
  449: {prices:{amazon:"$149.99",musicstore:"€125.21",andertons:"£139.00"}},
  450: {prices:{amazon:"$79.00",zzounds:"$79.00"}},
  451: {prices:{amazon:"$229.00",zzounds:"$229.00",gear4music:"£199.00",musicstore:"€192.44",andertons:"£199.00"}}
}

function shortTitle(title) {
  const removeWords = ['Desktop','Modeling','Model','Amp','Microphone','Mic','Condenser','Dynamic',
    'Shotgun','Supercardioid','Cardioid','Headphones','Headphone','Over-Ear','On-Ear','In-Ear',
    'Monitor','Speaker','Studio','Active','Passive','Guitar','Bass','Electric','Acoustic',
    'Classical','Nylon','Steel','Pedal','Effects','Multi-Effects','Keyboard','Piano','Digital',
    'Portable','Interface','Audio','USB','Thunderbolt','Short','On-Camera','Helix','Wireless',
    'Bluetooth','Stereo','Mono','Dual','System','Set','Kit','Bundle','Pack','Pair','Combo',
    'Package','Parlor','All-Mahogany','Acoustic-Electric','XLR','Gaming','Streaming','Podcast',
    'Recording','Creator','Vlogger','Filmmaker','Camera','Video','Compact','Large-Diaphragm',
    'UHF','Lavalier','Lapel','Headset','Instrument','Drum','Reference','Nearfield','Closed-Back',
    'Open-Back','Earbuds','Earphones','Analog','Synthesizer','Groovebox','Drum Machine','Sampler',
    'Sequencer','Turntable','DJ','Controller','Mixer','PA','Powered','Subwoofer','Tuning',
    'Tuner','Metronome','Power','Cable','Stand','Arm','Boom','Clamp','Windshield','Pop Filter',
    'Shock Mount','Reflection','Isolation','Acoustic Treatment','Panels','Absorber','Diffuser',
    'Bass Trap','Pad','Pads','Vocal','Podcasting','Broadcast','Pro'];
  let words = title.split(' ');
  let lastNumIdx = -1;
  for (let i = words.length - 1; i >= 0; i--) {
    if (/\d/.test(words[i])) { lastNumIdx = i; break; }
  }
  if (lastNumIdx >= 0) {
    return words.slice(0, lastNumIdx + 1).join(' ');
  }
  let result = [];
  for (let w of words) {
    if (removeWords.includes(w)) break;
    result.push(w);
  }
  return result.length > 0 ? result.join(' ') : words.slice(0, 3).join(' ');
}


function shopButtonsTest(p, lang) {
  const cfg = TEST_SHOP_BTN[p.id] || {};
  const prices = cfg.prices || {};
  const stores = getResolvedStores(p);
  const isDaw = p.category === 'daw';
  const isLogic = isDaw && !!stores.official;
  const dawHasAmazon = isDaw && !isLogic && prices.amazon;
  const t = (es, en) => lang === 'es' ? es : en;
  const cartSvg = '<svg viewBox="0 0 576 512" width="1em" height="1em" fill="#fff" style="flex-shrink:0"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0-5.4 21.7c-1.1 4.5-.6 9.2 1.4 13.3L482.3 320l24 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-88 0c-30.9 0-56-25.1-56-56c0-25.9 17.6-47.6 41.5-53.9L442 128l-305.6 0c-14 26-33.1 60.1-44.4 81.5c-11 20.6-36.6 28.4-57.2 17.4c-20.6-11-28.4-36.6-17.4-57.2C35.7 133 63 82.9 74.5 61.8C83.5 45.1 100.9 34 120.8 34L96 34C82.7 34 72 23.3 72 20L0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>';
  const chevSvg = '<svg viewBox="0 0 512 512" width="1.1em" height="1.1em" fill="currentColor" style="flex-shrink:0;transition:transform .3s ease;margin-top:2px"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>';
  const order = isLogic ? [] : (dawHasAmazon ? ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore'] : isDaw ? ['zzounds', 'reverb', 'andertons', 'musicstore'] : ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore']);
  const naList = cfg.na || [];
  const oosList = cfg.oos || [];
  const avail = order.filter(k => naList.indexOf(k) === -1 && ((cfg.urls && cfg.urls[k]) || k === 'reverb' || stores[k]));
  const revUrl = stores.reverb || ('https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=' + encodeURIComponent('https://reverb.com/marketplace?query=' + encodeURIComponent(p.title)));
  const rowUrl = k => (cfg.urls && cfg.urls[k]) ? cfg.urls[k] : (k === 'reverb' ? revUrl : stores[k]);
  const isPlugins = p.category === 'plugins';
  const pUrl = isLogic ? stores.official : (dawHasAmazon ? stores.amazon : isDaw ? (stores.gear4music || stores.andertons || stores.musicstore || stores.zzounds || stores.pluginboutique) : isPlugins ? (stores.pluginboutique || stores.amazon) : (stores.amazon && (p.excludeStores||[]).indexOf('amazon')===-1) ? stores.amazon : stores[Object.keys(prices)[0]] || stores[avail[0]] || stores.official) || stores[Object.keys(prices)[0]] || stores[avail[0]] || stores.official;
  if (!pUrl) return '';
  const pPrice = prices[isLogic ? 'official' : isPlugins ? 'pluginboutique' : dawHasAmazon ? 'amazon' : isDaw ? 'gear4music' : 'amazon'] || '';
  const hasAmazon = !!(stores.amazon && (p.excludeStores||[]).indexOf('amazon')===-1);
  const primaryStoreKey = isLogic ? 'official' : isPlugins ? 'pluginboutique' : dawHasAmazon ? 'amazon' : isDaw ? 'gear4music' : hasAmazon ? 'amazon' : Object.keys(prices)[0] || avail[0] || 'official';
  const primaryBtn =
    '<a' + (hasAmazon ? ' data-store="amazon"' : '') + ' href="' + pUrl + '" target="_blank" rel="noopener noreferrer sponsored" class="shop-btn-primary" ' +
    'style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:0 16px;height:40px;border-radius:12px;' +
    'background:#3b82f6;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none;border:none;cursor:pointer;' +
    'box-shadow:0 4px 16px rgba(59,130,246,.35);transition:box-shadow .2s ease,filter .2s ease,transform .18s ease" ' +
    'onmouseover="this.style.filter=\'brightness(1.05)\'" onmouseout="this.style.filter=\'\'">' +
    '<span style="display:flex;align-items:center;gap:10px">' + cartSvg + '<span style="display:flex;align-items:center;gap:10px">' + (isLogic ? t('Tienda Oficial', 'Official Store') : t('Comprar en', 'Buy at')) + (isLogic ? '' : dawHasAmazon ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:800\'><span style=\'position:relative;display:inline-block\'>Amaz' + '<svg viewBox=\'86 114 320 72\' preserveAspectRatio=\'none\' style=\'position:absolute;left:17.8%;top:100%;height:7px;width:calc(80% - 1px);margin-top:-5px\'>' + '<path fill=\'#FF9900\' d=\'m 374.00642,142.18404 c -34.99948,25.79739 -85.72909,39.56123 -129.40634,39.56123 -61.24255,0 -116.37656,-22.65135 -158.08757,-60.32496 -3.2771,-2.96252 -0.34083,-6.9999 3.59171,-4.69283 45.01431,26.19064 100.67269,41.94697 158.16623,41.94697 38.774689,0 81.4295,-8.02237 120.6499,-24.67006 5.92501,-2.51683 10.87999,3.88009 5.08607,8.17965\'/>' + '<path fill=\'#FF9900\' d=\'m 388.55678,125.53635 c -4.45688,-5.71527 -29.57261,-2.70033 -40.84585,-1.36327 -3.43442,0.41947 -3.95874,-2.56925 -0.86517,-4.71905 20.00346,-14.07844 52.82696,-10.01483 56.65462,-5.2958 3.82764,4.74526 -0.99624,37.64741 -19.79373,53.35128 -2.88385,2.41195 -5.63662,1.12734 -4.35198,-2.07113 4.2209,-10.53917 13.68519,-34.16054 9.20211,-39.90203\'/>' + '</svg></span>on</span>' : isDaw ? '<span style="' + SHOP_LOGO_STYLE.gear4music + '">' + SHOP_LOGO_TEXT.gear4music + '</span>'     : isPlugins ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:400\'>PLUG<span style=\'color:#000\'>IN</span>BOUTIQUE</span>' : (hasAmazon ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:800\'><span style=\'position:relative;display:inline-block\'>Amaz' + '<svg viewBox=\'86 114 320 72\' preserveAspectRatio=\'none\' style=\'position:absolute;left:17.8%;top:100%;height:7px;width:calc(80% - 1px);margin-top:-5px\'>' + '<path fill=\'#FF9900\' d=\'m 374.00642,142.18404 c -34.99948,25.79739 -85.72909,39.56123 -129.40634,39.56123 -61.24255,0 -116.37656,-22.65135 -158.08757,-60.32496 -3.2771,-2.96252 -0.34083,-6.9999 3.59171,-4.69283 45.01431,26.19064 100.67269,41.94697 158.16623,41.94697 38.774689,0 81.4295,-8.02237 120.6499,-24.67006 5.92501,-2.51683 10.87999,3.88009 5.08607,8.17965\'/>' + '<path fill=\'#FF9900\' d=\'m 388.55678,125.53635 c -4.45688,-5.71527 -29.57261,-2.70033 -40.84585,-1.36327 -3.43442,0.41947 -3.95874,-2.56925 -0.86517,-4.71905 20.00346,-14.07844 52.82696,-10.01483 56.65462,-5.2958 3.82764,4.74526 -0.99624,37.64741 -19.79373,53.35128 -2.88385,2.41195 -5.63662,1.12734 -4.35198,-2.07113 4.2209,-10.53917 13.68519,-34.16054 9.20211,-39.90203\'/>' + '</svg></span>on</span>' : '<span style="' + (SHOP_LOGO_STYLE[primaryStoreKey]||'font-weight:700') + '">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>')) + (pPrice ? '- ' + pPrice : '') + '</span></a>';
  const rows = order.map(k => {
    const nm = SHOP_LOGO_TEXT[k] || storeNames[k] || k;
    const st = SHOP_LOGO_STYLE[k] || 'font-weight:700';
    const storeNotes = { zzounds: ['(Planes de pago f\u00e1ciles)', '(Easy Payment Plans)'], reverb: ['(Mercado nuevo y usado)', '(New & Used Market)'], gear4music: ['(Env\u00edos r\u00e1pidos UK)', '(Fast UK Delivery)'], andertons: ['(Soporte experto)', '(Expert Support)'], musicstore: ['(Garant\u00eda de 3 a\u00f1os)', '(3-Year Warranty)'] };
    const storeNote = storeNotes[k] ? '<span style="color:#a8a8a8;font-size:12px;font-weight:600">' + t(storeNotes[k][0], storeNotes[k][1]) + '</span>' : '';
    const ds = ' data-store="' + k + '"';
    if (naList.indexOf(k) > -1 || (!(cfg.urls && cfg.urls[k]) && k !== 'reverb' && !stores[k])) {
      const searchUrls = {
        zzounds: 'https://www.zzounds.com/a--925521/',
        reverb: 'https://reverb.com/marketplace?query=' + encodeURIComponent(p.title),
        gear4music: 'https://www.gear4music.com/search?q=' + encodeURIComponent(p.title),
        andertons: 'https://www.andertons.co.uk/search.php?search_query=' + encodeURIComponent(p.title) + '&irgwc=1&irpid=7292297',
        musicstore: 'https://www.musicstore.com/en_GB/search?SearchText=' + encodeURIComponent(p.title)
      };
      const naUrl = searchUrls[k] || '#';
      return '<a' + ds + ' href="' + naUrl + '" target="_blank" rel="noopener noreferrer sponsored" style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#262626;color:#a8a8a8;font-size:15px;font-weight:800;text-decoration:none"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span>' + storeNote + '<span style="margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic">' + t('No disponible', 'Not Available') + '</span></a>';
    }
    if (oosList.indexOf(k) > -1 || (k !== 'reverb' && !prices[k] && stores[k])) {
      return '<a' + ds + ' href="' + rowUrl(k) + '" target="_blank" rel="noopener noreferrer sponsored" style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#262626;color:#a8a8a8;font-size:15px;font-weight:800;text-decoration:none"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span>' + storeNote + '<span style="margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic">' + t('Agotado', 'Out of stock') + '</span></a>';
    }
    const pr = prices[k] ? '<span style="margin-left:auto;display:flex;align-items:baseline;gap:6px;white-space:nowrap">' + ((k === 'gear4music') ? '' : (k === 'reverb') ? '<span style="color:#a8a8a8;font-size:12px;font-weight:600">' + t('aprox.', 'approx.') + '</span>' : '') + '<span style="font-weight:700;color:#fff">' + prices[k] + '</span></span>' : '<span style="margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic">' + t('Verificar precio', 'Check price') + '</span>';
    return '<a' + ds + ' href="' + rowUrl(k) + '" target="_blank" rel="noopener noreferrer sponsored" ' +
      'style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#333333;transition:transform .18s ease,background .18s ease,box-shadow .18s ease;' +
      'color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;border:none"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span>' + storeNote + pr + '</a>';
  }).join('');
  const moreBtn =
    '<button type="button" class="shop-btn-more" ' +
    'onclick="var l=this.nextElementSibling;var open=l.style.maxHeight&&l.style.maxHeight!==\'0px\';if(open){l.style.overflow=\'hidden\';l.style.maxHeight=\'0px\';}else{l.style.maxHeight=l.scrollHeight+\'px\';setTimeout(function(){l.style.overflow=\'visible\';},330);}var s=this.querySelectorAll(\'svg\')[1];if(s)s.style.transform=open?\'\':\'rotate(180deg)\';" ' +
    'style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:0 16px;height:40px;border-radius:12px;' +
    'background:#333333;color:#ffffff;font-family:inherit;font-size:15px;font-weight:800;text-decoration:none;border:none;cursor:pointer;transition:background .2s ease,transform .18s ease" ' +
    'onmouseover="this.style.background=\'#3d3d3d\'" onmouseout="this.style.background=\'#333333\'">' +
    '<span style="display:flex;align-items:center;gap:10px">' + cartSvg + '<span style="display:flex;align-items:center;gap:10px">' + t('Comparar en 5 tiendas más', 'Compare 5 more stores') + chevSvg + '</span></span>' + '</button>' +
    '<div class="shop-more-list" style="width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:6px;margin-top:8px;overflow:hidden;max-height:0;transition:max-height .3s ease">' + rows + '</div>';
  return isLogic ? primaryBtn : primaryBtn + moreBtn;
}


window.tmgStoreButtons = function(p) {
  var lang = document.documentElement.lang || 'en';
  var isEs = lang.indexOf('es') === 0;
  var cat = (window.currentGuideCategory || '').toLowerCase();
  if (cat === 'daw') return '';
  try { return shopButtonsTest(p, isEs); } catch(e) { return ''; }
};
