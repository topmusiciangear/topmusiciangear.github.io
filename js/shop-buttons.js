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
  const gid = 'gln' + (++FLAG_UID);
  const gcid = 'glo' + (++FLAG_UID);
  return '<svg viewBox="0 0 20 20" width="19" height="19" style="display:inline-block;vertical-align:-5px;flex-shrink:0;margin-right:5px">' +
    '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#67c6f8"/><stop offset="1" stop-color="#2563eb"/></linearGradient>' +
    '<clipPath id="' + gcid + '"><circle cx="10" cy="10" r="8.75"/></clipPath></defs>' +
    '<circle cx="10" cy="10" r="8.75" fill="url(#' + gid + ')"/>' +
    '<g clip-path="url(#' + gcid + ')">' +
    '<path d="M2.6,6.4 Q4.4,4.2 6.6,5 Q8.5,5.7 8.2,7.5 Q7.8,9.4 5.7,9.4 Q2.9,9.3 2.6,6.4 Z" fill="#34d399"/>' +
    '<path d="M11.6,3.2 Q13.8,2.6 14.9,4.4 Q15.8,6 13.9,6.9 Q12,7.7 11.2,5.9 Q10.5,4.3 11.6,3.2 Z" fill="#34d399"/>' +
    '<path d="M11.9,11.7 Q14,10.9 15.2,12.5 Q16.3,14.2 14.6,15.5 Q12.8,16.8 11.4,15.1 Q10.2,13.5 11.9,11.7 Z" fill="#22c55e"/>' +
    '<path d="M4.2,12.3 Q5.8,11.7 6.6,13 Q7.3,14.3 6,15.3 Q4.5,16.3 3.5,15 Q2.6,13.5 4.2,12.3 Z" fill="#22c55e"/>' +
    '<ellipse cx="10" cy="10" rx="4.4" ry="8.75" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".7"/>' +
    '<path d="M1.25,10 H18.75" stroke="#fff" stroke-opacity=".35" stroke-width=".7"/>' +
    '</g><circle cx="10" cy="10" r="8.75" fill="none" stroke="#fff" stroke-opacity=".4"/></svg>';
};

const SHOP_LOGO_TEXT = { gear4music: 'Gear4music', andertons: 'Andertons', musicstore: "Music Store", zzounds: 'zZounds', reverb: "Reverb", amazon: "Amazon" };;

const SHOP_LOGO_STYLE = {
  gear4music: "font-family:'Quicksand','Segoe UI',sans-serif;font-weight:700;color:#fff;letter-spacing:-.3px;font-size:15px", andertons: "font-family:'Yellowtail',cursive;font-weight:400;color:#fff;font-size:19px", musicstore: "font-family:'Open Sans Condensed','Arial Narrow',Arial,sans-serif;font-weight:700;color:#fff;font-size:18px;letter-spacing:.5px", zzounds: "font-family:'Poppins',Arial,sans-serif;font-weight:800;font-style:italic;color:#fff;letter-spacing:-.5px;font-size:15px", reverb: "font-family:'Kaushan Script',cursive;font-weight:400;color:#fff;font-size:17px"
};

const SHOP_FLAG = { zzounds: usaFlag, reverb: globeIcon, gear4music: ukFlag, musicstore: euFlag, andertons: ukFlag, amazon: globeIcon };

const TEST_SHOP_BTN = {
  1: {prices:{amazon:"$439.00",zzounds:"$439.00",gear4music:"£381.50",andertons:"£379.00",musicstore:"€398.00"}},
  2: {prices:{amazon:"$3,750.00",zzounds:"$3,995.00",andertons:"£3,007.00",gear4music:"£2,908.40",musicstore:"€2,999.00"}},
  3: {prices:{amazon:"$212.00",zzounds:"$249.00",gear4music:"£184.75",andertons:"£179.00",musicstore:"€167.23"}},
  4: {prices:{amazon:"$1,225.00",zzounds:"$1,199.00",gear4music:"£893.00",andertons:"£849.00",musicstore:"€990.00"}},
  5: {prices:{amazon:"$109.00",zzounds:"$99.00",gear4music:"£103.75",andertons:"£103.00",musicstore:"€105.00"}},
  6: {prices:{amazon:"$1,839.99",zzounds:"$1,839.99",andertons:"£1,549.00",gear4music:"£1,799.00",musicstore:"€1,799.00"}},
  7: {prices:{amazon:"$4,234.33",zzounds:"$2,799.00",andertons:"£2,499.00",gear4music:"£2,499.00",musicstore:"€2,949.00"}},
  8: {prices:{amazon:"$2,499.00",gear4music:"£2,111.00",andertons:"£2,299.00",musicstore:"€3,212.00"}},
  9: {prices:{amazon:"$1,199.99",zzounds:"$1,199.99",andertons:"£899.00",gear4music:"£835.00",musicstore:"€999.00"}},
  10: {prices:{zzounds:"$3,999.00",andertons:"£4,299.00",gear4music:"£4,499.00",musicstore:"€4,899.00"}},
  11: {prices:{amazon:"$5,999.00",zzounds:"$5,999.00",andertons:"£3,890.00",gear4music:"£3,890.00",musicstore:"€4,275.00"}},
  12: {prices:{amazon:"$4,499.99",zzounds:"$4,699.99",andertons:"£4,290.00",gear4music:"£4,290.00",musicstore:"€3,599.00"}},
  13: {prices:{amazon:"$299.00",zzounds:"$299.00",andertons:"£215.00",gear4music:"£215.00",musicstore:"€249.00"}},
  14: {prices:{amazon:"$839.95",zzounds:"$849.00",andertons:"£595.00",gear4music:"£595.00",musicstore:"€849.00"}},
  15: {prices:{amazon:"$199.00",zzounds:"$224.99",gear4music:"£193.75",andertons:"£185.00",musicstore:"€172.00"}},
  16: {prices:{amazon:"$999.00",zzounds:"$999.00",gear4music:"£849.00",andertons:"£849.00",musicstore:"€945.00"}},
  17: {prices:{amazon:"$999.00",zzounds:"$999.00",gear4music:"£715.00",andertons:"£715.00",musicstore:"€889.00"}},
  18: {prices:{amazon:"$249.99",zzounds:"$299.99",gear4music:"£227.00",andertons:"£227.00",musicstore:"€295.00"}},
  19: {prices:{amazon:"$398.99",zzounds:"$398.99",gear4music:"£263.00",andertons:"£254.00",musicstore:"€289.00"}},
  20: {prices:{amazon:"$269.00",zzounds:"$269.00",gear4music:"£199.25",musicstore:"€266.00",andertons:"£199.00"}},
  21: {prices:{amazon:"$899.99",zzounds:"$899.99",andertons:"£600.00",gear4music:"£600.00",musicstore:"€649.00"}},
  22: {prices:{amazon:"$1,175.00",andertons:"£959.00",gear4music:"£812.00",musicstore:"€949.00"},oos:["zzounds"]},
  23: {prices:{amazon:"$199.99",andertons:"£129.00",gear4music:"£129.00",musicstore:"€149.00",zzounds:"$199.99"}},
  24: {prices:{amazon:"$489.00",zzounds:"$479.00",andertons:"£357.00",gear4music:"£361.00",musicstore:"€432.00"}},
  25: {prices:{amazon:"$169.00",zzounds:"$159.00",gear4music:"£148.00",andertons:"£133.00",musicstore:"€125.21"}},
  26: {prices:{amazon:"$113.00",gear4music:"£99.00",musicstore:"€89.00"},urls:{zzounds:"https://www.zzounds.com/item--SNYMDR7506"},oos:["andertons","zzounds"]},
  28: {prices:{pluginboutique:"$299.00",andertons:"£126.00",gear4music:"£271.00",musicstore:"€899.00"}},
  29: {prices:{pluginboutique:"$1,069.00",andertons:"£639.00",zzounds:"$1,069.00",gear4music:"£639.00",musicstore:"€899.00"}},
  30: {prices:{pluginboutique:"$499.00",andertons:"£479.00",gear4music:"£479.00",musicstore:"€452.90"}},
   32: {prices:{pluginboutique:"$599.00",amazon:"$599.00",gear4music:"£489.00",andertons:"£489.00",musicstore:"€599.00"},oos:["zzounds"]},
  33: {prices:{amazon:"$749.99",zzounds:"$749.99",andertons:"£659.00",gear4music:"£656.00",musicstore:"€669.00"}},

  39: {prices:{amazon:"$49.00",andertons:"£42.00",gear4music:"£53.50",musicstore:"€168.00"},oos:["zzounds"]},
  42: {prices:{amazon:"$1,299.99",zzounds:"$1,299.99",andertons:"£1,052.00",gear4music:"£1,039.00",musicstore:"€1,099.00"}},
  50: {prices:{amazon:"$99.00",zzounds:"$109.00",gear4music:"£103.50",andertons:"£103.00",musicstore:"€119.00"}},
  51: {prices:{amazon:"$275.00",zzounds:"$319.00",gear4music:"£222.00",andertons:"£231.00",musicstore:"€249.00"}},
  52: {prices:{amazon:"$449.00",zzounds:"$449.00",gear4music:"£575.00",andertons:"£549.00",musicstore:"€639.00"}},
  53: {prices:{amazon:"$294.01",zzounds:"$399.99",gear4music:"£178.75",andertons:"£175.00",musicstore:"€255.01"}},
  54: {prices:{amazon:"$199.95",zzounds:"$199.95",gear4music:"£213.50",andertons:"£210.00",musicstore:"€235.00"}},
  55: {prices:{amazon:"$179.00",zzounds:"$199.00",gear4music:"£142.00",andertons:"£149.00",musicstore:"€168.00"}},
  56: {prices:{amazon:"$169.00",zzounds:"$199.99",andertons:"£149.00",gear4music:"£129.00",musicstore:"€199.00"}},
  57: {prices:{amazon:"$139.80",andertons:"£134.00",gear4music:"£125.00",musicstore:"€121.43"},oos:["zzounds"]},
  58: {prices:{amazon:"$659.00",zzounds:"$659.00",andertons:"£569.00",gear4music:"£589.00",musicstore:"€539.00"}},
  59: {prices:{amazon:"$165.99",andertons:"£77.00",gear4music:"£77.40",musicstore:"€539.00"},oos:["zzounds"]},
  60: {prices:{pluginboutique:"$199.00",andertons:"£95.00",musicstore:"€41.18"}},
  61: {prices:{pluginboutique:"$50.00",gear4music:"£41.99"},oos:["andertons","musicstore"]},
  62: {prices:{pluginboutique:"$199.00",zzounds:"$199.00",gear4music:"£119.00",musicstore:"€169.00",andertons:"£119.00"}},
  63: {prices:{pluginboutique:"$199.00",zzounds:"$199.00",gear4music:"£145.00",musicstore:"€169.00",andertons:"£139.00"}},
  64: {prices:{amazon:"$1,875.65",gear4music:"£1,799.00",musicstore:"€2,229.00"},oos:["andertons","zzounds"]},
  65: {prices:{amazon:"$862.39",zzounds:"$879.99",andertons:"£749.00",gear4music:"£739.00",musicstore:"€844.00"}},
  66: {prices:{amazon:"$849.99",gear4music:"£859.00",musicstore:"€1,090.00"},oos:["andertons","zzounds"]},
  67: {prices:{amazon:"$849.99",gear4music:"£799.00",musicstore:"€110.00",andertons:"£729.00"},oos:["zzounds"]},
  68: {prices:{amazon:"$204.99",andertons:"£179.00",gear4music:"£172.00",musicstore:"€66.00",zzounds:"$229.99"}},
  71: {prices:{amazon:"$789.99",zzounds:"$789.99",andertons:"£749.00",gear4music:"£749.00",musicstore:"€859.00"}},
  72: {prices:{amazon:"$349.99",zzounds:"$299.99",andertons:"£259.00",gear4music:"£259.00",musicstore:"€328.00"}},
  73: {prices:{amazon:"$1,799.99",zzounds:"$1,799.99",andertons:"£1,629.00",gear4music:"£970.00",musicstore:"€1,149.00"}},
  74: {prices:{amazon:"$749.99",zzounds:"$749.99",andertons:"£599.00",gear4music:"£599.00",musicstore:"€699.00"}},
  75: {prices:{amazon:"$749.99",zzounds:"$749.99",andertons:"£649.00",gear4music:"£649.00",musicstore:"€1,699.00"}},
  76: {prices:{amazon:"$749.99",zzounds:"$749.99",andertons:"£749.00",gear4music:"£749.00",musicstore:"€888.00"}},
  91: {prices:{amazon:"$1,839.99",zzounds:"$1,839.99",andertons:"£1,499.00",gear4music:"£1,549.00",musicstore:"€1,699.00"}},
  92: {prices:{amazon:"$849.00"},urls:{gear4music:"https://www.gear4music.com/PA-DJ-and-Lighting/Sennheiser-EW-100-G4-Wireless-Microphone-System-with-935-S-E-Band/2BBJ"},oos:["andertons","zzounds"]},
  93: {prices:{zzounds:"$999.00",gear4music:"£845.00",musicstore:"€868.00"},oos:["andertons"]},
  95: {prices:{amazon:"$749.00",zzounds:"$749.00",andertons:"£518.00",gear4music:"£518.00",musicstore:"€675.00"}},
  96: {prices:{amazon:"$99.00",zzounds:"$99.99",andertons:"£109.99",gear4music:"£110.00",musicstore:"€148.00"}},
  97: {prices:{amazon:"$186.20",zzounds:"$197.99",andertons:"£174.99",gear4music:"£166.00",musicstore:"€179.00"}},
  98: {prices:{amazon:"$103.50",zzounds:"$109.99",andertons:"£89.99",gear4music:"£84.20",musicstore:"€99.00"}},
  99: {prices:{amazon:"$99.99",zzounds:"$99.99",andertons:"£99.99",gear4music:"£99.00",musicstore:"€169.00"}},
  100: {prices:{amazon:"$129.00",andertons:"£95.00",gear4music:"£95.00",musicstore:"€110.00"},oos:["zzounds"]},
  101: {prices:{amazon:"$83.50",andertons:"£69.99",gear4music:"£67.90",musicstore:"€66.00"},oos:["zzounds"]},
  102: {prices:{amazon:"$229.00",andertons:"£299.00",gear4music:"£239.00",musicstore:"€139.00"},oos:["zzounds"]},
  103: {prices:{amazon:"$329.99",zzounds:"$359.99",andertons:"£269.00",musicstore:"€329.00"},oos:["gear4music"]},
  104: {prices:{amazon:"$3,499.99",andertons:"£3,599.00",musicstore:"€3,499.00"},oos:["zzounds"]},
  105: {prices:{amazon:"$549.00",zzounds:"$549.00",andertons:"£436.00",gear4music:"£469.00",musicstore:"€599.00"}},
  106: {prices:{amazon:"$899.99",zzounds:"$899.99",andertons:"£845.00",gear4music:"£862.00",musicstore:"€999.00"}},
  107: {prices:{amazon:"$469.00",zzounds:"$469.00",andertons:"£398.00",gear4music:"£419.00",musicstore:"€444.00"},oos:["gear4music","zzounds"]},
  108: {prices:{amazon:"$909.99",zzounds:"$909.99",gear4music:"£659.00",musicstore:"€611.00"},oos:["andertons"]},
  109: {prices:{amazon:"$1,781.01",zzounds:"$1,899.00",andertons:"£1,359.00",gear4music:"£1,428.00",musicstore:"€1,699.00"}},
  110: 
{prices:{amazon:"$749.00",andertons:"£599.00",gear4music:"£529.00",musicstore:"€503.36"}},
  112: {prices:{amazon:"$165.00",zzounds:"$179.00",gear4music:"£192.25",musicstore:"€299.00",andertons:"£85.00"}},
  113: {prices:{gear4music:"£549.00",amazon:"$599.00",andertons:"£549.00",zzounds:"$599.00",musicstore:"€929.00",pluginboutique:"$805"}},
  114: {prices:{gear4music:"£479.00",amazon:"$579.99",andertons:"£479.00",zzounds:"$579.99",musicstore:"€549.00",pluginboutique:"$579.99"}},
  115: {prices:{andertons:"£299.00",gear4music:"£245.00",amazon:"$399.00",pluginboutique:"$299.00"}},
  116: {prices:{amazon:"$129.00",andertons:"£112.00",gear4music:"£115.00",musicstore:"€155.00"},oos:["zzounds"]},
  117: {prices:{amazon:"$249.00",zzounds:"$249.00",andertons:"£169.00",gear4music:"£169.00",musicstore:"€199.00"}},
  118: {prices:{pluginboutique:"$1,999.00",gear4music:"£79.00"},oos:["musicstore"]},
  119: {prices:{pluginboutique:"$30.00",gear4music:"£300.50",musicstore:"€83.19"},oos:["zzounds"]},
  120: {prices:{pluginboutique:"$99.00",zzounds:"$99.00",gear4music:"£74.99",amazon:"$119.00",musicstore:"€83.20",andertons:"£79.00"}},
  121: {prices:{pluginboutique:"$999.00",andertons:"£869.00",zzounds:"$999.00",gear4music:"£899.00"},oos:["musicstore"]},
  122: {prices:{pluginboutique:"$1,399.00",gear4music:"£1,299.00",musicstore:"€1,007.56",andertons:"£1,299.00"}},
   123: {prices:{gear4music:"£1,124.00",pluginboutique:"$1,249.00",andertons:"£1,124.00",zzounds:"$1,249.00",musicstore:"€1,249.00"}},
  124: {prices:{gear4music:"£729.00",amazon:"$879.99",zzounds:"$879.99",andertons:"£919.00",musicstore:"€859.00"}},
  125: {prices:{amazon:"$719.99",gear4music:"£699.00",musicstore:"€777.00",andertons:"£799.00"},oos:["zzounds"]},
  126: {prices:{gear4music:"£1,742.00",amazon:"$1,839.99",zzounds:"$1,839.99",andertons:"£1,599.00",musicstore:"€1,517.56"}},
  127: {prices:{amazon:"$1,099.00",zzounds:"$999.00",andertons:"£765.00",gear4music:"£829.00",musicstore:"€868.00"}},
  128: {prices:{amazon:"$469.99",zzounds:"$469.99",andertons:"£345.00",gear4music:"£345.00",musicstore:"€399.00"}},
  129: {prices:{amazon:"$404.40",zzounds:"$469.99",andertons:"£319.00",gear4music:"£314.00",musicstore:"€349.00"}},
  130: {prices:{gear4music:"£125.00",amazon:"$149.99",zzounds:"$149.99",andertons:"£129.00",musicstore:"€150.42"}},
  131: {prices:{amazon:"$349.00",zzounds:"$349.00",andertons:"£239.00",gear4music:"£238.00",musicstore:"€284.00"}},
  132: {prices:{andertons:"£859.00",gear4music:"£829.00",amazon:"$949.99",musicstore:"€884.00"}},
  133: {prices:{amazon:"$109.99",zzounds:"$109.99",andertons:"£109.99",gear4music:"£99.10",musicstore:"€104.00"}},
  134: {prices:{amazon:"$88.00",zzounds:"$119.99",andertons:"£85.00",gear4music:"£79.00",musicstore:"€95.00"}},
  135: {prices:{amazon:"$679.00",zzounds:"$679.00",andertons:"£519.00",gear4music:"£679.00",musicstore:"€699.00"}},
  136: {prices:{amazon:"$108.57",zzounds:"$115.99",andertons:"£119.99",gear4music:"£111.00",musicstore:"€139.00"}},
  137: {prices:{amazon:"$250.74",zzounds:"$250.74",andertons:"£225.00",gear4music:"£225.50",musicstore:"€279.00"}},
  138: {prices:{amazon:"$1,398.00",andertons:"£991.00",gear4music:"£1,037.00",musicstore:"€1,298.00"},oos:["zzounds"]},
  139: {prices:{gear4music:"£3,050.00",amazon:"$3,999.00",andertons:"£2,599.00",musicstore:"€2,990.00"},oos:["zzounds"]},
  140: {prices:{amazon:"$749.99",zzounds:"$769.99",andertons:"£496.00",gear4music:"£495.00",musicstore:"€599.00"}},
  141: {prices:{amazon:"$649.99",andertons:"£584.00",gear4music:"£584.00",musicstore:"€619.00",zzounds:"$699.99"}},
  142: {prices:{amazon:"$684.39",zzounds:"$699.99",andertons:"£489.00",gear4music:"£489.00",musicstore:"€611.00"}},
  143: {prices:{amazon:"$1,899.00",zzounds:"$1,899.00",andertons:"£1,549.00",gear4music:"£1,634.00",musicstore:"€1,999.00"}},
  144: {prices:{gear4music:"£286.00",amazon:"$299.99",andertons:"£249.00",zzounds:"$299.00",musicstore:"€299.00"}},
  145: {prices:{amazon:"$509.00",andertons:"£315.00",gear4music:"£315.00",musicstore:"€369.00"},oos:["zzounds"]},
  146: {prices:{amazon:"$380.00",zzounds:"$379.99",andertons:"£281.00",gear4music:"£302.50",musicstore:"€261.34"}},
  147: {prices:{amazon:"$1,099.99",zzounds:"$1,199.99",andertons:"£829.00",gear4music:"£835",musicstore:"€929.00"}},
  148: {prices:{gear4music:"£2,009.00",amazon:"$2,499.00",andertons:"£1,452.00",musicstore:"€2,099.00"},oos:["zzounds"]},
  149: {prices:{gear4music:"£504.00",amazon:"$675.00",zzounds:"$573.74",andertons:"£599.00",musicstore:"€599.00"}},
  150: {prices:{gear4music:"£188.50",amazon:"$268.00",andertons:"£169.00",musicstore:"€195.00"},oos:["zzounds"]},
  151: {prices:{gear4music:"£407.00",amazon:"$374.99",musicstore:"€335.29"},oos:["andertons","zzounds"]},
  152: {prices:{amazon:"$1,232.49",zzounds:"$1,232.49",andertons:"£975.00",gear4music:"£989.00",musicstore:"€917.31"}},
  153: {prices:{amazon:"$399.00",zzounds:"$399.00",andertons:"£295.00",gear4music:"£322.00",musicstore:"€74.79"}},
  154: {prices:{amazon:"$390.99",andertons:"£394.00",gear4music:"£394.00",musicstore:"€366.47"},oos:["zzounds"]},
  155: {prices:{amazon:"$1,689.99",zzounds:"$1,889.99",andertons:"£1,879.00",gear4music:"£1,879.00",musicstore:"€1,775.63"}},
  156: {prices:{amazon:"$1,739.99",zzounds:"$1,939.99",andertons:"£1,799.00",musicstore:"€1,847.90",gear4music:"£1,849.00"}},
  157: {prices:{amazon:"$529.99",andertons:"£399.00",gear4music:"£389.00",musicstore:"€354.12"},oos:["zzounds"]},
  158: {prices:{amazon:"$351.49",andertons:"£249.00",gear4music:"£251.50",musicstore:"€217.65",zzounds:"$369.99"}},
  159: {prices:{amazon:"$419.99",zzounds:"$419.99",andertons:"£399.00",gear4music:"£399.00",musicstore:"€119.00"}},
  160: {prices:{amazon:"$379.99",zzounds:"$379.99",andertons:"£349.00",gear4music:"£296.00",musicstore:"€389.00"}},
  161: {prices:{amazon:"$399.99",zzounds:"$399.99",andertons:"£399.00",gear4music:"£399.00"}},
  162: {prices:{amazon:"$350.00",andertons:"£799.00",gear4music:"£599.00"},oos:["musicstore","zzounds"]},
  163: {prices:{amazon:"$599.00",zzounds:"$599.00",andertons:"£349.00",gear4music:"£419.00"}},
  164: {prices:{amazon:"$649.00",zzounds:"$649.00",andertons:"£229.00",gear4music:"£599.00"},oos:["musicstore"]},
  165: {prices:{zzounds:"$649.00",gear4music:"£579.00",amazon:"$599.00",musicstore:"€295.00"},oos:["andertons"]},
  166: {prices:{andertons:"£319.00",gear4music:"£349.00",amazon:"$399.00",musicstore:"€293.28"},oos:["zzounds"]},
  167: {prices:{amazon:"$1,099.00",zzounds:"$1,099.00",gear4music:"£899.00",musicstore:"€999.00"},oos:["andertons"]},
  170: {urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/G4M-Acoustics-Squarewave-4-Pack/5KYU"},oos:["gear4music","zzounds"]},
  173: {prices:{gear4music:"£17.99",amazon:"$23.00",musicstore:"€209.00"},oos:["andertons"]},
  174: {prices:{gear4music:"£349.00",amazon:"$399.00",zzounds:"$399.00",andertons:"£329.00",musicstore:"€369.00"}},
  175: {prices:{gear4music:"£599.00",amazon:"$699.00",zzounds:"$699.00",andertons:"£599.00",musicstore:"€649.00"}},
  176: {prices:{amazon:"$3,299.00",zzounds:"$3,499.00",andertons:"£4,999.00",gear4music:"£2,850.00",musicstore:"€3,149.00"}},
  177: {prices:{amazon:"$2,995.00",gear4music:"£2,899.00"},oos:["andertons","musicstore"]},
  178: {prices:{amazon:"$1,199.00",gear4music:"£1,079.00",musicstore:"€987.90"},oos:["andertons"]},
  180: {prices:{amazon:"$3,999.99",gear4music:"£2,954.00",musicstore:"€2,393.19"},oos:["andertons"]},
  181: {prices:{amazon:"$4,199.00",gear4music:"£3,120.00",musicstore:"€2,520.17"},oos:["andertons"]},
  182: {prices:{amazon:"$4,999.00",zzounds:"$3,899.00",andertons:"£3,821.00",gear4music:"£3,859.00",musicstore:"€1,867.23"}},
  183: {prices:{amazon:"$3,199.00",zzounds:"$3,199.00",andertons:"£2,035.00",gear4music:"£2,213.00",musicstore:"€1,797.48"}},
  184: {prices:{amazon:"$2,299.99",zzounds:"$2,299.99",andertons:"£1,999.00",gear4music:"£2,309.00",musicstore:"€2,629.00"}},
  185: {prices:{amazon:"$2,299.99",zzounds:"$2,299.99",andertons:"£2,049.00",gear4music:"£2,079.00",musicstore:"€1,998.00"}},
  186: {prices:{gear4music:"£2,599.00",amazon:"$2,749.00",zzounds:"$2,549.00",andertons:"£2,599.00",musicstore:"€2,015.97"}},
  187: {prices:{gear4music:"£2,599.00",amazon:"$3,499.00",zzounds:"$3,499.00",andertons:"£2,566.00",musicstore:"€2,680.67"}},
  188: {prices:{amazon:"$1,699.00",zzounds:"$1,699.00",andertons:"£1,399.00",gear4music:"£1,399.00",musicstore:"€1,129.16"}},
  189: {prices:{amazon:"$2,149.99",zzounds:"$2,149.99",andertons:"£1,099.00",gear4music:"£1,649",musicstore:"€1,511.76"}},
  190: {prices:{amazon:"$2,749.00",zzounds:"$2,749.00",andertons:"£1,799.00",gear4music:"£1,891",musicstore:"€1,847.90"},oos:["andertons"]},
  191: {prices:{gear4music:"£363.50",amazon:"$479.00",zzounds:"$399.99",andertons:"£339.00",musicstore:"€461.34"}},
  192: {prices:{amazon:"$424.99",zzounds:"$424.99",andertons:"£451.00",gear4music:"£263.00",musicstore:"€432.77"}},
  193: {prices:{gear4music:"£369.00",amazon:"$499.99",zzounds:"$499.99",andertons:"£349.00",musicstore:"€217.60"}},
  194: {prices:{amazon:"$199.00",zzounds:"$199.00",andertons:"£272.00",gear4music:"£273.50",musicstore:"€259.66"}},
  195: {prices:{amazon:"$119.99"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Elgato-WAVE3-Microphone/43BD"},oos:["andertons"]},
  196: {prices:{amazon:"$99.00",zzounds:"$99.00",andertons:"£79.00",gear4music:"£80.60",musicstore:"€82.35"}},
  197: {prices:{amazon:"$99.00",zzounds:"$86.00",andertons:"£86.00",gear4music:"£93.00",musicstore:"€68.91"}},
  198: {prices:{gear4music:"£106.50",amazon:"$79.00",zzounds:"$109.00",andertons:"£97.00",musicstore:"€119.00"}},
  199: {prices:{gear4music:"£319.00",amazon:"$399.00",zzounds:"$499.00",andertons:"£299.00",musicstore:"€389.00"}},
  200: {prices:{amazon:"$204.99",zzounds:"$219.99",andertons:"£219.00",gear4music:"£184.75",musicstore:"€205.00"}},
  201: {prices:{amazon:"$83.90",andertons:"£58.00",gear4music:"£70.00",musicstore:"€66.00"},oos:["zzounds"]},
  202: {prices:{amazon:"$599.99",zzounds:"$599.99",andertons:"£479.00",gear4music:"£549.00",musicstore:"€649.00"}},
  203: {prices:{amazon:"$228.50",zzounds:"$229.99",gear4music:"£219.00",musicstore:"€259.00",andertons:"£219.00"}},
  204: {prices:{gear4music:"£284.00",amazon:"$349.99",zzounds:"$384.99",andertons:"£309.00",musicstore:"€295.00"}},
  205: {prices:{gear4music:"£419.00",amazon:"$449.00",zzounds:"$499.00",andertons:"£439.00",musicstore:"€419.33"}},
  206: {prices:{amazon:"$1,599.00",zzounds:"$1,599.00",andertons:"£1,399.00",gear4music:"£478.00",musicstore:"€1,799.00"}},
  207: {prices:{amazon:"$1,762.00",andertons:"£1,069.00",gear4music:"£1,099.00",musicstore:"€1,279.00"}},
  208: {prices:{amazon:"$849.00",zzounds:"$899.00",andertons:"£709.00",gear4music:"£709.28",musicstore:"€729.00"}},
  209: {prices:{amazon:"$1,399.00",andertons:"£879.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Austrian-Audio-OC818-Studio-Set-Black/4PIK"},oos:["zzounds"]},
  210: {prices:{amazon:"$219.00",zzounds:"$219.00",andertons:"£149.00",gear4music:"£149.50",musicstore:"€149.00"}},
  211: {prices:{gear4music:"£372.00",amazon:"$399.00",zzounds:"$499.99",andertons:"£372.00",musicstore:"€349.00"}},
  212: {prices:{gear4music:"£193.50",amazon:"$219.00",zzounds:"$219.00",andertons:"£193.00",musicstore:"€209.00"}},
  213: {prices:{amazon:"$199.00",zzounds:"$199.00",andertons:"£179.00",gear4music:"£185.50",musicstore:"€219.00"}},
  214: {prices:{gear4music:"£112.75",amazon:"$429.00",zzounds:"$429.00",andertons:"£295.00",musicstore:"€369.00"}},
  215: {prices:{gear4music:"£532.00",amazon:"$660.00",andertons:"£405.00",musicstore:"€461.34"},oos:["zzounds"]},
  216: {prices:{gear4music:"£1,016.00",amazon:"$1,699.00",andertons:"£899.00",musicstore:"€1,091.60"},oos:["zzounds"]},
  217: {prices:{gear4music:"£918.00",amazon:"$949.00",zzounds:"$949.00",andertons:"£787.00",musicstore:"€797.48"}},
  218: {prices:{amazon:"$669.99",zzounds:"$589.99",andertons:"£463.00",gear4music:"£488.00",musicstore:"€478.15"}},
  219: {prices:{gear4music:"£568.00",amazon:"$696.99",zzounds:"$696.99",andertons:"£555.00",musicstore:"€545.38"}},
  220: {prices:{gear4music:"£666.63",zzounds:"$949.00",amazon:"$949.00",musicstore:"€646.22",andertons:"£699.00"}},
  221: {prices:{amazon:"$2,100.00",musicstore:"€1,847.90"},oos:["andertons"]},
  222: {prices:{}},
  223: {prices:{gear4music:"£2,149.99",amazon:"$3,499.00",musicstore:"€2,629.00",andertons:"£2,149.00"}},
  224: {prices:{gear4music:"£1,786.00",amazon:"$2,299.00",zzounds:"$2,299.00",musicstore:"€1,998.00",andertons:"£1,675.00"}},
  225: {prices:{amazon:"$549.00",zzounds:"$549.00",andertons:"£429.00",gear4music:"£452.00",musicstore:"€461.34"}},
  226: {prices:{amazon:"$179.00",zzounds:"$179.00",andertons:"£125.00",musicstore:"€150.42",gear4music:"£161.50"}},
  227: {prices:{gear4music:"£150.00",amazon:"$199.95",zzounds:"$199.95",andertons:"£149.00",musicstore:"€150.42"}},
  228: {prices:{gear4music:"£151.25",amazon:"$214.00",zzounds:"$219.00",andertons:"£149.00",musicstore:"€108.40"}},
  229: {prices:{gear4music:"£249.00",amazon:"$249.00",zzounds:"$249.00",andertons:"£249.00",musicstore:"€222.69"}},
  230: {prices:{gear4music:"£75.00",amazon:"$131.60",zzounds:"$139.00",andertons:"£99.00",musicstore:"€125.21"}},
  231: {prices:{amazon:"$259.00",andertons:"£259.00",gear4music:"£236.50",musicstore:"€335.29"},oos:["zzounds"]},
  232: {prices:{amazon:"$169.00",zzounds:"$169.00",andertons:"£179.00",gear4music:"£136.00",musicstore:"€158.82"}},
  233: {prices:{amazon:"$2,199.99",zzounds:"$2,199.99",andertons:"£1,599.00",gear4music:"£1,770.00",musicstore:"€1,931.93"}},
  234: {prices:{amazon:"$73.00",zzounds:"$73.00",andertons:"£59.00",musicstore:"€69.00"},oos:["gear4music"]},
  235: {prices:{amazon:"$69.00",zzounds:"$69.00",andertons:"£55.00",gear4music:"£59.00",musicstore:"€65.00"}},
  236: {prices:{gear4music:"£1,139.00",amazon:"$1,349.00",zzounds:"$1,499.00",andertons:"£1,149.00",musicstore:"€1,511.76"}},
  237: {prices:{gear4music:"£1,452.00",amazon:"$1,739.99",andertons:"£1,452.00",musicstore:"€1,427.73"}},
  238: {prices:{pluginboutique:"$99.00",gear4music:"£39.00",amazon:"$99.00",musicstore:"€83.19"},oos:["andertons"]},
  239: {prices:{amazon:"$50.00",zzounds:"$50.00",andertons:"£39.00",gear4music:"£45.00",musicstore:"€49.00"}},
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
  254: {prices:{amazon:"$78.99",musicstore:"€217.60"},oos:["andertons"]},
  255: {prices:{amazon:"$449.99",zzounds:"$519.99",andertons:"£452.00",gear4music:"£549",musicstore:"€419.33"}},
  256: {prices:{amazon:"$799.00",zzounds:"$799.00",andertons:"£719.00",gear4music:"£829",musicstore:"€289.00"}},
  257: {prices:{gear4music:"£339.00",amazon:"$399.00",zzounds:"$399.00",andertons:"£329.00",musicstore:"€461.34"}},
  258: {prices:{gear4music:"£249.99",amazon:"$249.99",zzounds:"$199.99",andertons:"£249.00",musicstore:"€335.29"}},
  259: {prices:{gear4music:"£414.00",amazon:"$499.99",zzounds:"$599.99",andertons:"£399.00",musicstore:"€503.36"}},
  260: {prices:{amazon:"$349.99",gear4music:"£329.99",musicstore:"€293.28"},oos:["andertons"]},
  261: {prices:{amazon:"$229.00"},oos:["andertons"]},
  262: {prices:{amazon:"$129.99",zzounds:"$129.99",andertons:"£91.00",gear4music:"£93.10",musicstore:"€167.23"}},
  263: {prices:{amazon:"$299.00",zzounds:"$299.00",andertons:"£225.00",gear4music:"£234.00",musicstore:"€234.45"}},
  264: {prices:{gear4music:"£229.99",amazon:"$229.99"},oos:["andertons"]},
  265: {prices:{amazon:"$149.90"},oos:["andertons"]},
  266: {prices:{gear4music:"£1,135.00",amazon:"$1,749.00",zzounds:"$1,749.00",andertons:"£1,180.00",musicstore:"€699.00"}},
  267: {prices:{amazon:"$419.99",zzounds:"$419.99",andertons:"£349.00",gear4music:"£379.00",musicstore:"€399.00"}},
  268: {prices:{amazon:"$1,699.95"},oos:["andertons"]},
  269: {prices:{amazon:"$989.00",zzounds:"$999.00",andertons:"£866.00",gear4music:"£813",musicstore:"€1,867.23"}},
  270: {prices:{amazon:"$219.99"},oos:["andertons","musicstore"]},
  271: {prices:{amazon:"$599.00",andertons:"£449.00",gear4music:"£519",musicstore:"€461.34"},oos:["zzounds"]},
  272: {prices:{amazon:"$879.99",andertons:"£699.00",gear4music:"£700.00",musicstore:"€696.64"}},
  273: {prices:{amazon:"$879.99",andertons:"£699.00",gear4music:"£706.00",musicstore:"€621.01"}},
  274: {prices:{gear4music:"£309.00",amazon:"$239.99",musicstore:"€335.29"},oos:["andertons"]},
  275: {prices:{gear4music:"£349.00",amazon:"$329.99",musicstore:"€335.29"},oos:["andertons","zzounds"]},
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
  293: {prices:{gear4music:"£302.50",amazon:"$329.99",zzounds:"$369.99",andertons:"£299.00",musicstore:"€333.00"}},
  294: {prices:{gear4music:"£279.00",amazon:"$279.00",zzounds:"$349.00",musicstore:"€377.31",andertons:"£269.00"}},
  295: {prices:{amazon:"$295.99"},oos:["andertons"]},
  296: {prices:{amazon:"$699.00",andertons:"£799.00",musicstore:"€1,007.56"}},
  297: {prices:{amazon:"$154.00",zzounds:"$159.00",andertons:"£122.00",gear4music:"£119.99",musicstore:"€140.34"}},
  298: {prices:{amazon:"$159.00",zzounds:"$159.00",andertons:"£159.00",musicstore:"€150.42",gear4music:"£166.50"}},
  299: {prices:{gear4music:"£120.00",amazon:"$198.00",zzounds:"$199.00",andertons:"£159.00",musicstore:"€251.26"}},
  300: {prices:{andertons:"£499.00",amazon:"$599.00",zzounds:"$599.00",musicstore:"€503.40"}},
  301: {prices:{zzounds:"$599.99",andertons:"£629.00",gear4music:"£629.00",musicstore:"€587.40",amazon:"$759.00"}},
  302: {prices:{gear4music:"£499.00",amazon:"$599.99",zzounds:"$299.99",andertons:"£249.00",musicstore:"€289.00"}},
  303: {prices:{gear4music:"£293.50",amazon:"$395.00",andertons:"£288.00",musicstore:"€438.66"},oos:["zzounds"]},
  304: {prices:{andertons:"£449.00",gear4music:"£249.99",amazon:"$599.00",musicstore:"€250.42"},oos:["zzounds"]},
  305: {prices:{gear4music:"£504.42",amazon:"$593.75",zzounds:"$599.00",andertons:"£499.00",musicstore:"€331.18"}},
  306: {prices:{gear4music:"£267.50",amazon:"$289.99",zzounds:"$349.99",andertons:"£260.00",musicstore:"€251.26"}},
  307: {prices:{amazon:"$349.00",zzounds:"$349.00",andertons:"£276.99",gear4music:"£295.00",musicstore:"€250.42"}},
  308: {prices:{gear4music:"£650.00",amazon:"$799.99",zzounds:"$799.99",andertons:"£609.00",musicstore:"€317.06"}},
  309: {prices:{amazon:"$139.99",musicstore:"€189.00"},oos:["andertons"]},
  310: {prices:{amazon:"$319.99",zzounds:"$319.99",gear4music:"£229.00",musicstore:"€202.52",andertons:"£239.00"}},
  311: {prices:{amazon:"$499.99",zzounds:"$499.99",gear4music:"£379",musicstore:"€377.31",andertons:"£399.00"}},
  312: {prices:{amazon:"$949.00",zzounds:"$949.00",andertons:"£799.00",gear4music:"£829",musicstore:"€699.00"}},
  313: {prices:{gear4music:"£139.00",amazon:"$249.99",zzounds:"$249.99",andertons:"£139.00",musicstore:"€159.00"}},
  314: {prices:{gear4music:"£398.00",amazon:"$419.99",musicstore:"€335.29"},oos:["andertons"]},
  315: {prices:{gear4music:"£295.00",amazon:"$259.99",zzounds:"$259.99",andertons:"£299.00",musicstore:"€293.28"}},
  316: {prices:{amazon:"$449.99",zzounds:"$449.99",andertons:"£449.00",musicstore:"€412.27",gear4music:"£419.00"}},
  317: {prices:{zzounds:"$1,149.00",andertons:"£1,199.00"},oos:["gear4music"]},
  318: {prices:{gear4music:"£1,690.00",amazon:"$2,199.99",zzounds:"$2,199.99",andertons:"£1,699.00",musicstore:"€1,482.27"}},
  319: {prices:{amazon:"$2,275.00",zzounds:"$2,629.00",andertons:"£2,199.00"},urls:{gear4music:"https://www.gear4music.com/Guitar-and-Bass/ESP-E-II-Eclipse-Tobacco-Sunburst/273H"}},
  320: {prices:{gear4music:"£799.00",amazon:"$649.95",zzounds:"$949.00",andertons:"£799.00",musicstore:"€671.43"}},
  321: {prices:{gear4music:"£508.00",amazon:"$467.00",zzounds:"$549.00",andertons:"£505.00",musicstore:"€438.66"}},
  322: {prices:{gear4music:"£599.00",amazon:"$639.49",zzounds:"$749.00",andertons:"£598.00",musicstore:"€923.53"}},
  323: {prices:{amazon:"$99.00",zzounds:"$99.99",andertons:"£91.00",gear4music:"£91.30",musicstore:"€105.04"},urls:{zzounds:"https://www.zzounds.com/item--AKAMPKMINI3"}},
  324: {prices:{amazon:"$129.99",zzounds:"$129.99",andertons:"£89.00",gear4music:"£115.00",musicstore:"€111.00"}},
  325: {prices:{gear4music:"£380.00",amazon:"$549.00",zzounds:"$549.00",musicstore:"€503.36",andertons:"£379.00"}},
  326: {prices:{gear4music:"£399.00",andertons:"£399.00",zzounds:"$599.00"}},
  327: {prices:{amazon:"$109.97"},oos:["andertons","musicstore"]},
  328: {prices:{gear4music:"£139.99",amazon:"$219.00",zzounds:"$219.00",andertons:"£152.00",musicstore:"€199.16"}},
  329: {prices:{amazon:"$199.00",zzounds:"$229.00",andertons:"£164.00",gear4music:"£167.50"},oos:["musicstore"]},
  330: {prices:{gear4music:"£16.80",amazon:"$20.99",andertons:"£16.00",musicstore:"€15.97"},oos:["zzounds"]},
  331: {prices:{andertons:"£3,579.00",musicstore:"€3,669.00"}},
  332: {prices:{gear4music:"£540.00",amazon:"$599.00",zzounds:"$599.00",andertons:"£399.00",musicstore:"€472.44"}},
  333: {prices:{gear4music:"£246.00",amazon:"$459.99",andertons:"£249.00",musicstore:"€239.50"}},
  334: {prices:{gear4music:"£1,708.00",amazon:"$3,299.99",zzounds:"$3,299.99",andertons:"£1,499.00",musicstore:"€2,100.00"}},
  335: {prices:{amazon:"$999.99",zzounds:"$744.95",andertons:"£649.00"},urls:{gear4music:"https://www.gear4music.com/PA-DJ-and-Lighting/Korg-Soundlink-MW1608-Hybrid-Mixer/38AJ"},oos:["musicstore"]},
  336: {prices:{amazon:"$249.99",zzounds:"$249.99"},urls:{gear4music:"https://www.gear4music.com/PA-DJ-and-Lighting/Mackie-Mobile-Mix-8-Channel-USB-Mixer/651Y"},oos:["andertons"]},
  337: {prices:{gear4music:"£1,565.79",amazon:"$1,999.00",zzounds:"$1,999.00",andertons:"£1,565.00",musicstore:"€1,259.66"}},
  338: {prices:{andertons:"£1,019.00",musicstore:"€587.39"},oos:["gear4music","zzounds"]},
  339: {prices:{gear4music:"£739.00",amazon:"$999.00",zzounds:"$999.00",andertons:"£949.00",musicstore:"€839.34"}},
  340: {prices:{amazon:"$485.00",zzounds:"$485.00",andertons:"£449.00",gear4music:"£491.00",musicstore:"€478.15"}},
  341: {prices:{amazon:"$559.00",zzounds:"$641.52",andertons:"£599.00",gear4music:"£564.00",musicstore:"€574.79"}},
  342: {prices:{amazon:"$329.95",zzounds:"$349.00",andertons:"£319.00",gear4music:"£223.50",musicstore:"€221.85"}},
  343: {prices:{amazon:"$269.00",zzounds:"$269.00",musicstore:"€293.28"},oos:["andertons","gear4music"]},
  344: {prices:{amazon:"$399.00"},na:["zzounds","reverb","gear4music","andertons","musicstore"]},
  345: {prices:{gear4music:"£189.00",amazon:"$239.40",zzounds:"$239.40",andertons:"£199.00",musicstore:"€529.00"}},
  346: {prices:{gear4music:"£173.75",amazon:"$187.51",zzounds:"$219.00",musicstore:"€298.00"},oos:["andertons"]},
  347: {prices:{gear4music:"£180.82",zzounds:"$249.99",andertons:"£175.00",amazon:"$199.99",musicstore:"€639.00"}},
  348: {prices:{gear4music:"£482.39",zzounds:"$599.99",andertons:"£433.00",amazon:"$479.99",musicstore:"€1,349.00"}},
  349: {prices:{zzounds:"$1,249.00",andertons:"£899.00",amazon:"$1,090.00",gear4music:"£881",musicstore:"€599.00"}},
  350: {prices:{zzounds:"$228.99",amazon:"$228.99",andertons:"£189.00"},oos:["musicstore"]},
  352: {prices:{gear4music:"£179.00",amazon:"$189.00",zzounds:"$249.99",andertons:"£149.00",musicstore:"€158.80"},oos:[]},
  353: {prices:{gear4music:"£499.00",amazon:"$529.99",musicstore:"€539.00"},oos:["andertons"]},
  354: {prices:{gear4music:"£499.00",andertons:"£379.00",amazon:"$599.00",musicstore:"€419.33"},oos:["zzounds"]},
  355: {prices:{gear4music:"£339.00",andertons:"£399.00",musicstore:"€335.29"},oos:["amazon","zzounds"]},
  356: {prices:{gear4music:"£189.00",amazon:"$199.99",musicstore:"€219.00"},oos:["andertons"]},
  357: {prices:{gear4music:"£515.00",amazon:"$599.99",andertons:"£499.00",musicstore:"€604.20"}},
  358: {prices:{amazon:"$189.00",zzounds:"$189.00",musicstore:"€124.37"},oos:["andertons"]},
  359: {prices:{gear4music:"£87.70",amazon:"$94.99",musicstore:"€82.35"},oos:["andertons"]},
  360: {prices:{amazon:"$1,499.00",zzounds:"$1,499.00",musicstore:"€1,368.90"},oos:["andertons"]},
  361: {prices:{gear4music:"£886.00",amazon:"$999.00",zzounds:"$999.99",andertons:"£829.00",musicstore:"€755.46"}},
  362: {prices:{amazon:"$649.00",zzounds:"$649.00",andertons:"£479.00",gear4music:"£419.00",musicstore:"€377.31"}},
  363: {prices:{amazon:"$279.99",zzounds:"$279.99",gear4music:"£222.00",andertons:"£209.00",musicstore:"€269.00"}},
  364: {prices:{amazon:"$499.00",zzounds:"$499.00",andertons:"£549.00",gear4music:"£499.00",musicstore:"€461.34"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/beyerdynamic-M160-Double-Ribbon-Microphone/92T"}},
  365: {prices:{amazon:"$477.73",zzounds:"$519.00",andertons:"£466.00",gear4music:"£466.00",musicstore:"€436.13"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/sE-Electronics-VR2-Voodoo-Active-Ribbon-Mic/DRQ",zzounds:"https://www.zzounds.com/item--SEEVR2"}},
  366: {prices:{amazon:"$99.95",zzounds:"$99.95",musicstore:"€116.81"},oos:["andertons"]},
  370: {prices:{amazon:"$384.99",zzounds:"$384.99",andertons:"£305.00",gear4music:"£310.00",musicstore:"€339.00"},urls:{gear4music:"https://www.gear4music.com/Keyboards-and-Pianos/Roland-GOKEYS-3-Music-Creation-Keyboard-Midnight-Blue/6AB8",zzounds:"https://www.zzounds.com/item--ROLGOKEYS3"}},
  371: {prices:{amazon:"$199.99",zzounds:"$199.99",andertons:"£149.00",gear4music:"£155.00",musicstore:"€167.98"}},
  372: {prices:{amazon:"$795.00",andertons:"£517.00",gear4music:"£540.00",musicstore:"€453.78"},oos:["zzounds"]},
  373: {prices:{pluginboutique:"$199.00"}},
  374: {na:["andertons","gear4music","musicstore"],prices:{pluginboutique:"$99.00",amazon:"$99.00"},urls:{pluginboutique:"https://www.pluginboutique.com/product/2-Effects/6-Action/10606-ShaperBox-3",amazon:"https://www.amazon.com/dp/B0CM2Q8N1H"}},
  375: {prices:{pluginboutique:"$99.00",gear4music:"£29.99",musicstore:"€49.00",amazon:"$99.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/XLN-Audio-RC-20-Retro-Color/3NGQ",pluginboutique:"https://www.pluginboutique.com/product/2-Effects/6-Action/6842-RC-20-Retro-Color",musicstore:"https://www.musicstore.com/en_OE/EUR/XLN-Audio-RC-20-Retro-Color/art-PCM0018798-000",amazon:"https://www.amazon.com/XLN-Audio-RC-20-Retro-Color/dp/B08JSYBDY1"}},
  376: {na:["andertons","gear4music","musicstore"],prices:{pluginboutique:"$12.00",amazon:"$12.00"},urls:{pluginboutique:"https://www.pluginboutique.com/product/2-Effects/6-Action/6524-HalfTime",amazon:"https://www.amazon.com/Cableguys-HalfTime-Plugin/dp/B07QK2GMPM"}},
  377: {prices:{pluginboutique:"$129.00",gear4music:"£99.00",andertons:"£109",musicstore:"€108.40",amazon:"$129.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Baby-Audio-Transit-2/6RY2",andertons:"https://www.andertons.co.uk/baby-audio-transit-2-motion-effects-plugin/",pluginboutique:"https://www.pluginboutique.com/product/2-Effects/6-Action/10358-Transit-2",musicstore:"https://www.musicstore.com/en_OE/EUR/Baby-Audio-Transit-2-License-Code/art-PCM0018531-000",amazon:"https://www.amazon.com/Baby-Audio-Transit-2-Plugin/dp/B0DCJ5LPZL"}},
  378: {prices:{pluginboutique:"$89.00"}},
  379: {prices:{pluginboutique:"$175.00"}},
  380: {na:["andertons","gear4music","musicstore"],prices:{pluginboutique:"$129.99",amazon:"$129.99"},urls:{pluginboutique:"https://www.pluginboutique.com/product/2-Effects/6-Action/11148-Infiltrator-2",amazon:"https://www.amazon.com/Devious-Machines-Infiltrator-2-Effects/dp/B0DPD778SC"}},
  381: {na:[],prices:{pluginboutique:"$299.00",gear4music:"£231.00",andertons:"£252",musicstore:"€242.90",amazon:"$299"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/iZotope-Neutron-5-Advanced/6U5K",andertons:"https://www.andertons.co.uk/izotope-neutron-5-standard--esd/",pluginboutique:"https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/13502-Neutron-5",musicstore:"https://www.musicstore.com/en_OE/EUR/iZotope-Neutron-5-License-Code/art-PCM0018250-000",amazon:"https://www.amazon.com/iZotope-Neutron-5-Advanced/dp/B0DF83BWHX"}},
  382: {na:["andertons","gear4music","musicstore"],prices:{pluginboutique:"$99.00",amazon:"$99.00"},urls:{pluginboutique:"https://www.pluginboutique.com/product/4-Synth/11533-Scaler-3",amazon:"https://www.amazon.com/Plugin-Boutique-Scaler-3-Software/dp/B0FKK2H83D"}},
  383: {na:["andertons"],prices:{pluginboutique:"$129.00",gear4music:"£62.00",musicstore:"€105.00",amazon:"$129.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Sonible-SmartEQ-4/65LT",pluginboutique:"https://www.pluginboutique.com/product/2-Effects/16-EQ/11784-smart-EQ-4",musicstore:"https://www.musicstore.com/en_OE/EUR/Sonible-smart-EQ-4-License-Code/art-PCM0017947-000",amazon:"https://www.amazon.com/Sonible-smartEQ-4/dp/B0CVHRCRW2"}},
  384: {na:["andertons"],prices:{pluginboutique:"$129.00",gear4music:"£62.00",musicstore:"€105.00",amazon:"$129.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/Sonible-SmartLimit/4M4S",pluginboutique:"https://www.pluginboutique.com/product/2-Effects/6-Action/9008-smartlimit",musicstore:"https://www.musicstore.com/en_OE/EUR/Sonible-Smart-limit-License-Code/art-PCM0017210-000",amazon:"https://www.amazon.com/Sonible-smartlimit-Plugin/dp/B0C8J4WJF1"}},
  386: {prices:{pluginboutique:"$99.00",gear4music:"£62.55",andertons:"£95",musicstore:"€83.20",amazon:"$99.00"},urls:{gear4music:"https://www.gear4music.com/Recording-and-Computers/iZotope-Trash/6AAU",andertons:"https://www.andertons.co.uk/izotope-trash-creative-distortion-plugin/",pluginboutique:"https://www.pluginboutique.com/product/2-Effects/6-Action/12095-Trash",musicstore:"https://www.musicstore.com/en_OE/EUR/iZotope-Trash-License-Code/art-PCM0018334-000",amazon:"https://www.amazon.com/iZotope-Trash-Distortion-Plugin/dp/B0DF84C84J"}},
  387: {na:["andertons","gear4music","musicstore"],prices:{pluginboutique:"$79.00",amazon:"$79.00"},urls:{pluginboutique:"https://www.pluginboutique.com/product/2-Effects/6-Action/11521-Lifeline-Expanse",amazon:"https://www.amazon.com/Excite-Audio-Lifeline-Expanse-Plugin/dp/B0DKF74MVH"}},
  388: {prices:{pluginboutique:"$149.00"}},
  389: {prices:{gear4music:"£126.55",pluginboutique:"$199.00"}},
  390: {prices:{gear4music:"£39.30",pluginboutique:"$99.00"}},
  391: {prices:{pluginboutique:"$49.00"}},
  392: {prices:{pluginboutique:"$99.00",gear4music:"£75.00"}},
  393: {prices:{pluginboutique:"$45.00"}},
  394: {prices:{pluginboutique:"$79.00"}},
  395: {prices:{amazon:"$467.46",zzounds:"$499.99",gear4music:"£428.00",andertons:"£419.00",musicstore:"€529.00"}},
  396: {prices:{amazon:"$419.00",gear4music:"£289.00",andertons:"£266.00",musicstore:"€298.00"},oos:["zzounds"]},
  397: {prices:{amazon:"$699.99",zzounds:"$699.99",gear4music:"£544.00",andertons:"£522.00",musicstore:"€639.00"}},
  398: {prices:{zzounds:"$1,495.00",musicstore:"€1,349.00",amazon:"$1,295"},oos:["andertons"]},
  399: {prices:{musicstore:"€318.49"},oos:["amazon","zzounds"]},
  400: {prices:{amazon:"$1,299.99",zzounds:"$1,399.99",andertons:"£1,260.00",musicstore:"€1,032.77"}},
  401: {prices:{amazon:"$899.00",gear4music:"£777.00",andertons:"£849.00",musicstore:"€713.45",zzounds:"$999.00"}},
  402: {prices:{amazon:"$1,999.00",gear4music:"£1,447.00",andertons:"£1,234.00",musicstore:"€1,306.72"},oos:["zzounds"]},
  403: {prices:{gear4music:"£3,139.00",amazon:"$2,499",andertons:"£2,599.00",musicstore:"€2,501.68"},oos:["zzounds"]},
  406: {prices:{zzounds:"$1,599.99",gear4music:"£1,510.00",amazon:"$1,599.99",andertons:"£1,099.00",musicstore:"€1,503.36"}},
  408: {prices:{zzounds:"$1,399.99",amazon:"$1,399.99",gear4music:"£1,036.00",andertons:"£1,799.00",musicstore:"€1,365.46"}},
  410: {prices:{amazon:"$1,499.00",zzounds:"$1,499.00",gear4music:"£719.00",andertons:"£749.00",musicstore:"€713.45"}},
  411: {prices:{amazon:"$1,699.99",andertons:"£1,399.00",musicstore:"€1,427.70"}},
  412: {prices:{amazon:"$2,499.00",andertons:"£1,614.00",musicstore:"€1,678.99"}},
  413: {prices:{amazon:"$1,689.99",musicstore:"€1,427.73"}},
  414: {prices:{amazon:"$5,199.00",gear4music:"£4,499.00",andertons:"£3,249.00",musicstore:"€2,889.92"}},
  415: {prices:{musicstore:"€8,402.52"}},
  416: {prices:{amazon:"$25,490.00",musicstore:"€24,368.91"}},
  417: {prices:{amazon:"$5,999.00",gear4music:"£5,249.00",musicstore:"€5,461.34"}},
  418: {prices:{amazon:"$2,999.00",andertons:"£3,449.00",musicstore:"€3,360.50"}},
  419: {prices:{amazon:"$99.00",gear4music:"£75.00",musicstore:"€74.80"}},
  420: {prices:{amazon:"$99.00",gear4music:"£51.80",musicstore:"€98.00"}},
  421: {prices:{amazon:"$249.00",gear4music:"£75.00",musicstore:"€180.70"}},
  422: {prices:{amazon:"$279.00",gear4music:"£149.00",musicstore:"€304.00"}},
  423: {prices:{zzounds:"$379.00",amazon:"$379.00",andertons:"£279.00",gear4music:"£323.00",musicstore:"€349.00"}},
  424: {prices:{zzounds:"$699.00",amazon:"$599.00",gear4music:"£559.00",musicstore:"€458.00"}},
  425: {prices:{amazon:"$179.00",musicstore:"€335.29"},oos:["zzounds"]},
  426: {prices:{amazon:"$149.00",gear4music:"£139.00"},oos:["zzounds"]},
  427: {prices:{amazon:"$99.00",gear4music:"£87.40",musicstore:"€83.20"}},
  428: {prices:{amazon:"$37.49",zzounds:"$37.49"}},
  429: {prices:{amazon:"$75.99",zzounds:"$79.99",gear4music:"£69.00",andertons:"£69.00",musicstore:"€63.03"}},
  430: {prices:{amazon:"$39.99",zzounds:"$39.99",gear4music:"£35.00",andertons:"£35.00",musicstore:"€31.93"}},
  431: {prices:{amazon:"$90.88",zzounds:"$105.00",gear4music:"£92.80",andertons:"£75.00",musicstore:"€82.40"}},
  432: {prices:{amazon:"$99.99"}},
  433: {prices:{amazon:"$143.39",zzounds:"$149.99",andertons:"£199.00"}},
  434: {prices:{amazon:"$79.99",gear4music:"£95.00",andertons:"£99.00",musicstore:"€88.24"}},
  435: {prices:{amazon:"$39.90",gear4music:"£26.70",andertons:"£25.00",musicstore:"€38.70"}},
  436: {prices:{amazon:"$49.99"},oos:["reverb","gear4music","andertons","musicstore"]},
  437: {prices:{amazon:"$37.99"}},
  438: {prices:{amazon:"$52.13",zzounds:"$79.99",gear4music:"£50.00",andertons:"£62.00",musicstore:"€56.10"}},
  439: {prices:{amazon:"$35.99"}},
  440: {prices:{amazon:"$2,299.99",zzounds:"$2,299.99",gear4music:"£1,899.00",musicstore:"€1,847.90",andertons:"£1,999.00"}},
  441: {prices:{amazon:"$849.99",zzounds:"$849.99",gear4music:"£749.00",musicstore:"€754.62",andertons:"£799.00"}},
  442: {prices:{amazon:"$849.99",zzounds:"$849.99",gear4music:"£779.00",musicstore:"€713.45",andertons:"£779.00"}},
  443: {prices:{amazon:"$83.50",zzounds:"$83.50",gear4music:"£67.90",musicstore:"€74.79",andertons:"£69.99"}},
  444: {prices:{amazon:"$849.99",zzounds:"$849.99",gear4music:"£699.00",musicstore:"€671.43",andertons:"£699.00"}},
  445: {prices:{amazon:"$259.99",zzounds:"$259.99",gear4music:"£256.00",musicstore:"€217.60",andertons:"£229.00"}},
  446: {prices:{amazon:"$399.00",zzounds:"$399.00",gear4music:"£349.00",musicstore:"€335.30"}},
  447: {prices:{amazon:"$269.95",gear4music:"£252.50",musicstore:"€251.30",andertons:"£259.00"}},
  448: {prices:{amazon:"$209.99",zzounds:"$209.99",gear4music:"£206.00",musicstore:"€166.40",andertons:"£198.00"}},
  449: {prices:{amazon:"$149.99",musicstore:"€133.60",andertons:"£139.00"}},
  450: {prices:{amazon:"$79.00",zzounds:"$79.00"}},
  451: {prices:{amazon:"$229.00",gear4music:"£199.00",musicstore:"€209.20",andertons:"£199.00"},oos:["zzounds"]},
  452: {prices:{zzounds:"$4,599.99",amazon:"$4,399.00",gear4music:"£4,749.00",andertons:"£4,599.00"},oos:["gear4music"]},
  453: {prices:{andertons:"£6,799.00"},oos:["amazon"]},
  454: {prices:{zzounds:"$5,999.00",gear4music:"£4,499.00"},oos:["amazon","gear4music"]},
  455: {prices:{zzounds:"$8,999.00",gear4music:"£7,499.00"},oos:["amazon"]},
  456: {prices:{zzounds:"$4,999.00",gear4music:"£4,599.00",andertons:"£4,199.00",musicstore:"€3,734.50"},oos:["amazon","gear4music"]},
   457: {prices:{zzounds:"$5,699.00",gear4music:"£4,499.00",andertons:"£5,699.00",musicstore:"€4,031.90"},oos:["amazon"]},
   458: {prices:{amazon:"$199.99"},oos:["gear4music"]},
    459: {prices:{zzounds:"$199.99",amazon:"$149.99",gear4music:"£125.50"}},
    460: {prices:{zzounds:"$229.99",gear4music:"£219.00"},oos:["amazon"]},
      461: {prices:{amazon:"$169.00",gear4music:"£155.00"},oos:["zzounds"]},
  462: {prices:{gear4music:"£159.00",amazon:"$249.99",zzounds:"$249.99",andertons:"£159.00"}},
  463: {prices:{gear4music:"£199.00",andertons:"£209.00",musicstore:"€211.00",zzounds:"$269.99"}},
  464: {prices:{gear4music:"£412.00",andertons:"£399.00",zzounds:"$599.99",amazon:"$539.99"}},
   465: {prices:{gear4music:"£119.00",amazon:"$219.00"}},
   466: {prices:{gear4music:"£179.00"}}
  };function shopButtonsTest(p, lang) {
  const cfg = TEST_SHOP_BTN[p.id] || {};
  const prices = cfg.prices || {};
  const stores = getResolvedStores(p);
  const isDaw = p.category === 'daw';
  const isLogic = isDaw && !!stores.official;
  const dawHasAmazon = isDaw && !isLogic && prices.amazon;
  const t = (es, en) => lang === 'es' ? es : en;
  const cartSvg = '<svg viewBox="0 0 576 512" width="1em" height="1em" fill="#fff" style="flex-shrink:0"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0-5.4 21.7c-1.1 4.5-.6 9.2 1.4 13.3L482.3 320l24 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-88 0c-30.9 0-56-25.1-56-56c0-25.9 17.6-47.6 41.5-53.9L442 128l-305.6 0c-14 26-33.1 60.1-44.4 81.5c-11 20.6-36.6 28.4-57.2 17.4c-20.6-11-28.4-36.6-17.4-57.2C35.7 133 63 82.9 74.5 61.8C83.5 45.1 100.9 34 120.8 34L96 34C82.7 34 72 23.3 72 20L0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>';
  const chevSvg = '<svg viewBox="0 0 512 512" width="1.1em" height="1.1em" fill="currentColor" style="flex-shrink:0;transition:transform .3s ease;margin-top:2px"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>';
  const order = isLogic ? [] : (dawHasAmazon ? ['zzounds', 'amazon', 'reverb', 'gear4music', 'andertons', 'musicstore'] : isDaw ? ['zzounds', 'reverb', 'andertons', 'musicstore'] : ['zzounds', 'amazon', 'reverb', 'gear4music', 'andertons', 'musicstore']);
  const naList = cfg.na || [];
  const oosList = cfg.oos || [];
  const avail = order.filter(k => naList.indexOf(k) === -1 && ((cfg.urls && cfg.urls[k]) || k === 'reverb' || stores[k]));
  const revUrl = stores.reverb || ('https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=' + encodeURIComponent('https://reverb.com/marketplace?query=' + encodeURIComponent(p.title)));
  const storeSearch = {
    zzounds: () => 'https://www.zzounds.com/item--' + encodeURIComponent(p.title || '').replace(/%20/g, '+') + '?tag=topmusicg-20',
    amazon: () => 'https://www.amazon.com/s?k=' + encodeURIComponent(p.title || '').replace(/%20/g, '+') + '&tag=topmusicg-20',
    reverb: () => revUrl,
    gear4music: () => 'https://www.gear4music.com/search?q=' + encodeURIComponent(p.title || ''),
    andertons: () => 'https://www.andertons.co.uk/search.php?search_query=' + encodeURIComponent(p.title || '') + '&irgwc=1&irpid=7292297',
    musicstore: () => 'https://www.musicstore.com/en_OE/EUR/search?SearchText=' + encodeURIComponent(p.title || '')
  };
  const rowUrl = k => { var u = (cfg.urls && cfg.urls[k]) ? cfg.urls[k] : (k === 'reverb' ? revUrl : stores[k]); if (!u && storeSearch[k]) u = storeSearch[k](); return wrapAffiliate(k, u); };
  const isPlugins = p.category === 'plugins';
  var isUsa = false;
  try { var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; isUsa = tz.indexOf('America/') === 0 && (tz.indexOf('New_York') > -1 || tz.indexOf('Chicago') > -1 || tz.indexOf('Denver') > -1 || tz.indexOf('Los_Angeles') > -1 || tz.indexOf('Anchorage') > -1 || tz.indexOf('Honolulu') > -1 || tz.indexOf('Phoenix') > -1 || tz.indexOf('Detroit') > -1 || tz.indexOf('Indiana') > -1); } catch(e) {}
  const hasAmazon = !isLogic && !isPlugins;
  const primaryStoreKey = isLogic ? 'official' : isPlugins ? 'pluginboutique' : isUsa ? 'zzounds' : 'amazon';
  const pPrice = (cfg.prices && cfg.prices[primaryStoreKey]) || prices[isLogic ? 'official' : isPlugins ? 'pluginboutique' : dawHasAmazon ? 'amazon' : isDaw ? 'gear4music' : primaryStoreKey] || '';
  const zzoundsSearchUrl = 'https://www.zzounds.com/item--' + encodeURIComponent(p.title || p.name || '').replace(/%20/g, '+') + '?tag=topmusicg-20';
  const amazonSearchUrl = 'https://www.amazon.com/s?k=' + encodeURIComponent(p.title || p.name || '').replace(/%20/g, '+') + '&tag=topmusicg-20';
  var pUrlRaw = isLogic ? stores.official : isPlugins ? (stores.pluginboutique || stores.amazon || 'https://www.pluginboutique.com/search?q=' + encodeURIComponent(p.title || '') + '&a_aid=6a01e859cbe1a') : isUsa ? (stores.zzounds || zzoundsSearchUrl) : (stores.amazon || amazonSearchUrl);
  var pUrl = wrapAffiliate(primaryStoreKey, pUrlRaw);
  if (!pUrl) return '';
  const primaryBtn =
    '<a data-store="' + (primaryStoreKey) + '" href="' + pUrl + '" target="_blank" rel="noopener noreferrer sponsored" class="shop-btn-primary" ' +
    'style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:0 16px;height:40px;border-radius:12px;' +
    'background:#3b82f6;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none;border:none;cursor:pointer;' +
    'box-shadow:0 4px 16px rgba(59,130,246,.35);transition:box-shadow .2s ease,filter .2s ease,transform .18s ease" ' +
    'onmouseover="this.style.filter=\'brightness(1.05)\'" onmouseout="this.style.filter=\'\'">' +
    '<span style="display:flex;align-items:center;gap:10px">' + cartSvg + '<span style="display:flex;align-items:center;gap:10px">' + (isLogic ? t('Tienda Oficial', 'Official Store') : t('Comprar en', 'Buy at')) + (isLogic ? '' : dawHasAmazon ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:800\'><span style=\'position:relative;display:inline-block\'>Amaz' + '<svg viewBox=\'86 114 320 72\' preserveAspectRatio=\'none\' style=\'position:absolute;left:17.8%;top:100%;height:7px;width:calc(80% - 1px);margin-top:-5px\'>' + '<path fill=\'#FF9900\' d=\'m 374.00642,142.18404 c -34.99948,25.79739 -85.72909,39.56123 -129.40634,39.56123 -61.24255,0 -116.37656,-22.65135 -158.08757,-60.32496 -3.2771,-2.96252 -0.34083,-6.9999 3.59171,-4.69283 45.01431,26.19064 100.67269,41.94697 158.16623,41.94697 38.774689,0 81.4295,-8.02237 120.6499,-24.67006 5.92501,-2.51683 10.87999,3.88009 5.08607,8.17965\'/>' + '<path fill=\'#FF9900\' d=\'m 388.55678,125.53635 c -4.45688,-5.71527 -29.57261,-2.70033 -40.84585,-1.36327 -3.43442,0.41947 -3.95874,-2.56925 -0.86517,-4.71905 20.00346,-14.07844 52.82696,-10.01483 56.65462,-5.2958 3.82764,4.74526 -0.99624,37.64741 -19.79373,53.35128 -2.88385,2.41195 -5.63662,1.12734 -4.35198,-2.07113 4.2209,-10.53917 13.68519,-34.16054 9.20211,-39.90203\'/>' + '</svg></span>on</span>' : isDaw ? '<span style="' + SHOP_LOGO_STYLE.gear4music + '">' + SHOP_LOGO_TEXT.gear4music + '</span>'     : isPlugins ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:400\'>PLUG<span style=\'color:#000\'>IN</span>BOUTIQUE</span>' : (hasAmazon ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:800\'><span style=\'position:relative;display:inline-block\'>Amaz' + '<svg viewBox=\'86 114 320 72\' preserveAspectRatio=\'none\' style=\'position:absolute;left:17.8%;top:100%;height:7px;width:calc(80% - 1px);margin-top:-5px\'>' + '<path fill=\'#FF9900\' d=\'m 374.00642,142.18404 c -34.99948,25.79739 -85.72909,39.56123 -129.40634,39.56123 -61.24255,0 -116.37656,-22.65135 -158.08757,-60.32496 -3.2771,-2.96252 -0.34083,-6.9999 3.59171,-4.69283 45.01431,26.19064 100.67269,41.94697 158.16623,41.94697 38.774689,0 81.4295,-8.02237 120.6499,-24.67006 5.92501,-2.51683 10.87999,3.88009 5.08607,8.17965\'/>' + '<path fill=\'#FF9900\' d=\'m 388.55678,125.53635 c -4.45688,-5.71527 -29.57261,-2.70033 -40.84585,-1.36327 -3.43442,0.41947 -3.95874,-2.56925 -0.86517,-4.71905 20.00346,-14.07844 52.82696,-10.01483 56.65462,-5.2958 3.82764,4.74526 -0.99624,37.64741 -19.79373,53.35128 -2.88385,2.41195 -5.63662,1.12734 -4.35198,-2.07113 4.2209,-10.53917 13.68519,-34.16054 9.20211,-39.90203\'/>' + '</svg></span>on</span>' : '<span style="' + (SHOP_LOGO_STYLE[primaryStoreKey]||'font-weight:700') + '">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>')) + (pPrice ? '- ' + pPrice : '') + '</span></a>';
  const rows = order.filter(k => k !== primaryStoreKey).map(k => {
    const nm = SHOP_LOGO_TEXT[k] || storeNames[k] || k;
    const st = SHOP_LOGO_STYLE[k] || 'font-weight:700';
    const storeNotes = { zzounds: ['(Planes de pago f\u00e1ciles)', '(Easy Payment Plans)'], reverb: ['(Mercado nuevo y usado)', '(New & Used Market)'], gear4music: ['(Env\u00edos r\u00e1pidos UK)', '(Fast UK Delivery)'], andertons: ['(Soporte experto)', '(Expert Support)'], musicstore: ['(Garant\u00eda de 3 a\u00f1os)', '(3-Year Warranty)'], amazon: ['(Env\u00edo Prime)', '(Prime Delivery)'] };
    const storeNote = storeNotes[k] ? '<span style="color:#a8a8a8;font-size:12px;font-weight:600">' + t(storeNotes[k][0], storeNotes[k][1]) + '</span>' : '';
    const ds = ' data-store="' + k + '"';
    if (naList.indexOf(k) > -1 || (!(cfg.urls && cfg.urls[k]) && k !== 'reverb' && !stores[k])) {
      const naUrl = rowUrl(k);
      return '<a' + ds + ' href="' + naUrl + '" target="_blank" rel="noopener noreferrer sponsored" style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#262626;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span>' + storeNote + '</a>';
    }
    if (oosList.indexOf(k) > -1 || (k !== 'reverb' && !prices[k] && stores[k])) {
      const oosPrice = (cfg.prices && cfg.prices[k]) ? '<span style="margin-left:auto;display:flex;align-items:baseline;gap:6px;white-space:nowrap"><span style="font-weight:700;color:#a8a8a8">' + cfg.prices[k] + '</span></span>' : '';
      return '<a' + ds + ' href="' + rowUrl(k) + '" target="_blank" rel="noopener noreferrer sponsored" style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#262626;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span>' + storeNote + oosPrice + '</a>';
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

function productCard(p, lang) {
  const unitLabel = p.unit === 'each' ? (lang === 'es' ? ' (cada uno)' : ' (each)') : p.unit === 'pair' ? (lang === 'es' ? ' (par)' : ' (pair)') : '';
  const title = (lang === 'es' && p.title_es ? p.title_es : p.title) + unitLabel;
  const desc = lang === 'es' && p.desc_es ? p.desc_es : p.desc;
  const stores = storeChips(p, lang);
  return `<div class="guide-product-card">
    <div class="guide-product-card-img"><img src="${p.img.startsWith('http') ? p.img : '../' + p.img}" alt="${title}" loading="lazy" class="lb-img" style="cursor:zoom-in"><button type="button" class="guide-product-card-share" aria-label="Share" title="Share" onclick="event.stopPropagation();shareProduct(this)"><svg data-fa="share-nodes" class="icon fa-solid fa-share-nodes" viewBox="0 0 448 512" width="1em" height="1em" fill="currentColor"><path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/></svg></button></div>
    <div class="guide-product-card-body">
      ${productRatingLine(p, lang)}
      <h3 class="guide-product-card-title">${title}</h3>
            <div class="guide-product-card-desc-wrap"><div class="guide-product-card-desc">${desc}</div><button class="guide-product-card-desc-toggle" onclick="var w=this.parentElement;var d=w.querySelector('.guide-product-card-desc');d.classList.toggle('expanded');this.textContent=d.classList.contains('expanded')?'\u2212':'+'">+</button></div>
      <div class="guide-product-card-stores">${stores}</div>
    </div>
  </div>`;
}

function jsonLdScript(data) {
  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n</script>`;
}

function guideDates(guide, idx) {
  var pub = guide.datePublished;
  if (!pub) {
    var base = new Date('2026-01-15');
    base.setDate(base.getDate() + idx * 3);
    pub = base.toISOString().split('T')[0];
  }
  if (pub > today) pub = today;
  var mod = guide.dateModified || today;
  if (mod > today) mod = today;
  return { published: pub, modified: mod };
}

function stripHtml(s) {
  return s ? s.replace(/<[^>]*>/g, '') : '';
}
function guideDesc(guide, introFallback, isEs) {
  var d = isEs ? (guide.description_es || trunc(stripHtml(introFallback), 155)) : (guide.description || trunc(stripHtml(introFallback), 155));
  return Y(d);
}

function esText(esVal, enVal) {
  return esVal && esVal.length > enVal.length * 0.1 ? esVal : enVal;
}

var faqBase = {
  microphones: [
    { q: "What is the best microphone for recording vocals?", q_es: "¿Cuál es el mejor micrófono para grabar voces?", a: "The Shure SM7B is the industry standard for professional vocal recording, used on countless hit records. For home studios on a budget, the Rode NT1-A delivers studio-quality condenser sound at $269, while the Shure SM57 at $99 is the best starting point for any home recordist.", a_es: "El Shure SM7B es el estándar de la industria para grabación vocal profesional. Para estudios caseros con presupuesto limitado, el Rode NT1-A ofrece sonido de calidad de estudio por $269, mientras que el Shure SM57 a $99 es el mejor punto de partida." },
    { q: "What microphone is best for home recording?", q_es: "¿Qué micrófono es mejor para grabación casera?", a: "For home recording, start with the Shure SM57 ($99) for instruments and the Audio-Technica AT2020 ($99) for vocals. The Focusrite Scarlett 2i2 bundle with the Rode NT1-A is an excellent all-in-one starter package that covers both microphone and audio interface needs.", a_es: "Para grabación casera, comienza con el Shure SM57 ($99) para instrumentos y el Audio-Technica AT2020 ($99) para voces. El pack Focusrite Scarlett 2i2 con Rode NT1-A es un excelente paquete completo." },
    { q: "Do I need a condenser or dynamic microphone?", q_es: "¿Necesito un micrófono de condensador o dinámico?", a: "Condenser mics like the Rode NT1-A capture more detail and high frequencies, making them ideal for studio vocals and acoustic instruments. Dynamic mics like the Shure SM7B and SM57 are more rugged, reject background noise better, and work great for loud sources like guitar amps and live vocals.", a_es: "Los micrófonos de condensador como el Rode NT1-A capturan más detalle y son ideales para voces de estudio. Los dinámicos como el Shure SM7B son más resistentes y funcionan mejor para fuentes ruidosas como amplificadores de guitarra." },
    { q: "How much should I spend on a good microphone?", q_es: "¿Cuánto debería gastar en un buen micrófono?", a: "A good starter microphone costs $99-$200. The sweet spot for home studio quality is $200-$400, where you find options like the Rode NT1-A ($269) and Shure SM7B ($399). Professional mics like the Neumann U 87 Ai cost upwards of $3,000 but are rarely necessary for home recording.", a_es: "Un buen micrófono inicial cuesta entre $99 y $200. El punto óptimo para calidad de estudio casero es $200-$400, donde encuentras opciones como el Rode NT1-A ($269) y Shure SM7B ($399)." },
    { q: "What is the best microphone under $200?", q_es: "¿Cuál es el mejor micrófono por menos de $200?", a: "The Shure SM57 ($99) is the best under-$200 microphone for its versatility, durability, and legendary status. The Audio-Technica AT2020 ($99) is the best budget condenser for vocals. The Rode NT-USB ($169) is the top choice for USB plug-and-play simplicity.", a_es: "El Shure SM57 ($99) es el mejor micrófono por menos de $200 por su versatilidad y durabilidad legendaria. El Audio-Technica AT2020 ($99) es el mejor condensador económico para voces." }
  ],
  interfaces: [
    { q: "What is the best audio interface for home recording?", q_es: "¿Cuál es la mejor interfaz de audio para grabación casera?", a: "The Focusrite Scarlett 2i2 4th Gen ($199) is the best all-around audio interface for home recording, offering pro-grade preamps, low latency, and easy setup. The Universal Audio Volt 2 ($189) is excellent if you want vintage tube preamp emulation. Both are reliable choices for beginners and experienced producers alike.", a_es: "La Focusrite Scarlett 2i2 4ta Gen ($199) es la mejor interfaz de audio para grabación casera, con prevas de grado profesional y baja latencia. La Universal Audio Volt 2 ($189) es excelente si buscas emulación de previo vintage." },
    { q: "How many inputs do I need on an audio interface?", q_es: "¿Cuántas entradas necesito en una interfaz de audio?", a: "For a solo musician recording one instrument at a time, 2 inputs is sufficient. If you record vocals and guitar simultaneously, or want to record in stereo, 2-4 inputs work well. Bands recording live should look for 8+ inputs. The Focusrite Scarlett 2i2 covers most home studio needs.", a_es: "Para un músico grabando un instrumento a la vez, 2 entradas son suficientes. Si grabas voz y guitarra simultáneamente, 2-4 entradas funcionan bien. Bandas grabando en vivo necesitan 8+ entradas." },
    { q: "Is USB or Thunderbolt better for audio interfaces?", q_es: "¿Es mejor USB o Thunderbolt para interfaces de audio?", a: "Thunderbolt offers lower latency and higher bandwidth, making it ideal for professional studios with large sessions. USB (especially USB-C) is perfectly adequate for home studios, with latency low enough for real-time monitoring. The RME Babyface Pro FS uses USB and rivals Thunderbolt performance.", a_es: "Thunderbolt ofrece menor latencia y mayor ancho de banda, ideal para estudios profesionales. USB (especialmente USB-C) es perfectamente adecuado para estudios caseros. El RME Babyface Pro FS usa USB con rendimiento comparable a Thunderbolt." },
    { q: "What is the best budget audio interface?", q_es: "¿Cuál es la mejor interfaz de audio económica?", a: "The Focusrite Scarlett Solo ($139) and Universal Audio Volt 1 ($169) are the best budget audio interfaces. Both offer excellent preamp quality, reliable drivers, and come with useful software bundles including DAWs and plugins. The Scarlett series is the most popular choice worldwide.", a_es: "La Focusrite Scarlett Solo ($139) y Universal Audio Volt 1 ($169) son las mejores interfaces económicas. Ambas ofrecen excelente calidad de previo y vienen con paquetes de software útiles." },
    { q: "Do I need a high-end audio interface as a beginner?", q_es: "¿Necesito una interfaz de audio de alta gama como principiante?", a: "No. A Focusrite Scarlett 2i2 ($199) or Universal Audio Volt 2 ($189) provides more than enough quality for beginners. High-end interfaces like the RME Babyface Pro FS or Antelope Audio interfaces are designed for professional environments where every dB of dynamic range matters.", a_es: "No. Una Focusrite Scarlett 2i2 ($199) o Universal Audio Volt 2 ($189) ofrecen más que suficiente calidad para principiantes. Las interfaces de alta gama son para entornos profesionales." }
  ],
  monitors: [
    { q: "What are the best studio monitors for home recording?", q_es: "¿Cuáles son los mejores monitores de estudio para grabación casera?", a: "The Yamaha HS8 ($698/pair) are the industry standard for mixing — brutally honest and revealing. The KRK Rokit 7 G5 ($498/pair) offers great value with built-in DSP room correction. For smaller rooms, the Yamaha HS5 or KRK Rokit 5 G5 are excellent choices that won't overwhelm your space.", a_es: "Los Yamaha HS8 ($698/par) son el estándar de la industria para mezcla — brutalmente honestos y reveladores. Los KRK Rokit 7 G5 ($498/par) ofrecen gran valor con corrección de sala DSP incorporada. Para habitaciones pequeñas, los Yamaha HS5 o KRK Rokit 5 G5 son excelentes opciones que no abrumarán tu espacio." },
    { q: "Do I need a subwoofer for studio monitors?", q_es: "¿Necesito un subwoofer para monitores de estudio?", a: "A subwoofer is not essential for most home studios. It becomes important when mixing genres that rely on sub-bass frequencies like EDM, hip-hop, or film scoring. The Yamaha HS8S subwoofer pairs well with HS series monitors. In small rooms, a sub can create more problems than it solves due to room modes.", a_es: "Un subwoofer no es esencial para la mayoría de estudios caseros. Se vuelve importante para géneros que dependen de frecuencias sub-graves como EDM o hip-hop. En habitaciones pequeñas puede crear más problemas de los que resuelve." },
    { q: "What size studio monitors should I get?", q_es: "¿De qué tamaño deberían ser mis monitores de estudio?", a: "For small rooms under 150 sq ft, 5-inch monitors like the Yamaha HS5 are ideal. Medium rooms up to 250 sq ft work well with 6.5-7 inch monitors like the KRK Rokit 7 G5. Larger rooms benefit from 8-inch monitors like the Yamaha HS8. The key is matching monitor size to room size.", a_es: "Para habitaciones pequeñas, monitores de 5 pulgadas como los Yamaha HS5 son ideales. Habitaciones medianas funcionan bien con 6.5-7 pulgadas. Habitaciones grandes se benefician de monitores de 8 pulgadas." },
    { q: "How should I position my studio monitors?", q_es: "¿Cómo debería posicionar mis monitores de estudio?", a: "Position monitors at ear level forming an equilateral triangle with your listening position. Keep them at least 8 inches from walls to reduce bass buildup. Angle them toward your ears (toe-in). Use monitor isolation pads to decouple them from your desk. The tweeters should be at ear height when seated.", a_es: "Coloca los monitores a la altura del oído formando un triángulo equilátero con tu posición de escucha. Mantenlos al menos a 20 cm de las paredes. Usa pads de aislamiento para desacoplarlos del escritorio." },
    { q: "Are expensive studio monitors worth it?", q_es: "¿Valen la pena los monitores de estudio caros?", a: "Expensive monitors like the Genelec 8040B or Adam A7V offer more accurate frequency response, better stereo imaging, and higher SPL before distortion. For critical mixing and mastering work, they're worth the investment. For home studio enthusiasts, quality monitors in the $300-$700 range like Yamaha HS or KRK Rokit series provide excellent value.", a_es: "Los monitores caros ofrecen una respuesta de frecuencia más precisa y mejor imagen estéreo. Para mezcla crítica, valen la inversión. Para entusiastas, monitores de $300-$700 como Yamaha HS o KRK Rokit ofrecen excelente valor." }
  ],
  headphones: [
    { q: "What are the best studio headphones for mixing?", q_es: "¿Cuáles son los mejores auriculares de estudio para mezclar?", a: "The beyerdynamic DT 900 Pro X are the best open-back headphones for mixing, offering excellent soundstage and natural frequency response. The Sennheiser HD 490 Pro Plus is another top choice. For closed-back options, the beyerdynamic DT 770 Pro is the industry standard for tracking and mixing.", a_es: "Los beyerdynamic DT 900 Pro X son los mejores auriculares abiertos para mezclar. Los Sennheiser HD 490 Pro Plus son otra excelente opción. Para auriculares cerrados, los DT 770 Pro son el estándar de la industria." },
    { q: "Open-back vs closed-back headphones for studio?", q_es: "¿Auriculares abiertos vs cerrados para estudio?", a: "Open-back headphones like the beyerdynamic DT 900 Pro X provide a wider soundstage and more natural sound, making them better for critical mixing. Closed-back headphones like the DT 770 Pro isolate sound, making them ideal for tracking vocals and instruments to prevent bleed into the microphone.", a_es: "Los auriculares abiertos como los DT 900 Pro X ofrecen un escenario sonoro más amplio, ideales para mezcla. Los cerrados como los DT 770 Pro aíslan el sonido, perfectos para grabación." },
    { q: "Can I mix with headphones instead of monitors?", q_es: "¿Puedo mezclar con auriculares en vez de monitores?", a: "Yes, but with caveats. Headphones can cause ear fatigue faster and don't translate bass frequencies as accurately as monitors. However, with open-back headphones and reference tracks, you can achieve professional results. The beyerdynamic DT 900 Pro X is excellent for headphone mixing.", a_es: "Sí, pero con precaución. Los auriculares causan fatiga auditiva más rápido y no traducen los graves con tanta precisión. Con auriculares abiertos y pistas de referencia, puedes lograr resultados profesionales." },
    { q: "What is the best budget headphones for music production?", q_es: "¿Cuáles son los mejores auriculares económicos para producción musical?", a: "The Audio-Technica ATH-M50X ($169) is the best budget headphone for music production, offering a balanced frequency response and good detail. The Sony MDR-7506 ($99) is another excellent budget option that's been an industry standard for decades.", a_es: "Los Audio-Technica ATH-M50X ($169) son los mejores auriculares económicos para producción musical. Los Sony MDR-7506 ($99) son otra excelente opción que ha sido estándar de la industria por décadas." },
    { q: "Do I need a headphone amplifier for studio headphones?", q_es: "¿Necesito un amplificador de auriculares para auriculares de estudio?", a: "High-impedance headphones like the beyerdynamic DT 770 Pro 250 Ohm benefit significantly from a dedicated headphone amplifier. Lower impedance models like the DT 770 Pro 80 Ohm or Audio-Technica ATH-M50X work well directly from most audio interfaces. If your headphones sound quiet or weak, a headphone amp will help.", a_es: "Los auriculares de alta impedancia como los DT 770 Pro 250 Ohm se benefician de un amplificador dedicado. Los modelos de menor impedancia funcionan bien directamente desde la mayoría de interfaces de audio." }
  ],
  plugins: [
    { q: "What are the essential mixing plugins for beginners?", q_es: "¿Cuáles son los plugins de mezcla esenciales para principiantes?", a: "Start with an EQ (FabFilter Pro-Q 3), a compressor (FabFilter Pro-C 2), a reverb (Valhalla Room), a limiter (FabFilter Pro-L 2), and a pitch correction tool (Celemony Melodyne 5). These five plugins cover 90% of mixing needs. The FabFilter Total Bundle is worth the investment if you can afford it.", a_es: "Comienza con un EQ (FabFilter Pro-Q 3), un compresor (FabFilter Pro-C 2), una reverberación (Valhalla Room), un limitador (FabFilter Pro-L 2) y afinación (Celemony Melodyne 5). Estos cinco plugins cubren el 90% de las necesidades de mezcla. El FabFilter Total Bundle vale la inversión si puedes permitírtelo." },
    { q: "Are expensive plugins better than free ones?", q_es: "¿Son los plugins caros mejores que los gratuitos?", a: "Not necessarily. Many free plugins like those from ValhallaDSP, TDR, and Analog Obsession are excellent. However, paid plugins like FabFilter offer better workflow, more intuitive interfaces, and premium sound quality. The best approach is to start with free plugins and upgrade only when you hit their limitations.", a_es: "No necesariamente. Muchos plugins gratuitos de ValhallaDSP, TDR y Analog Obsession son excelentes. Los plugins de pago como FabFilter ofrecen mejor flujo de trabajo. Empieza con gratuitos y actualiza solo cuando llegues a sus limitaciones." },
    { q: "What is the best EQ plugin for mixing?", q_es: "¿Cuál es el mejor plugin de EQ para mezclar?", a: "FabFilter Pro-Q 3 is widely considered the best EQ plugin for mixing. Its dynamic EQ mode, intuitive interface, and natural sound make it indispensable. Other excellent options include the iZotope Ozone EQ for mastering, and SSL Native Channel Strip for that classic analog console sound.", a_es: "FabFilter Pro-Q 3 es considerado el mejor plugin de EQ para mezclar. Su modo EQ dinámico, interfaz intuitiva y sonido natural lo hacen indispensable. Otras opciones excelentes incluyen iZotope Ozone EQ y SSL Native Channel Strip." },
    { q: "Do I need analog modeling plugins?", q_es: "¿Necesito plugins de modelado analógico?", a: "Analog modeling plugins add warmth, character, and color that can make digital mixes sound more musical. While not essential, plugins like the Universal Audio UAD series, SSL Native, and Waves CLA series can help achieve a more polished, professional sound. They're especially useful for adding harmonics and saturation.", a_es: "Los plugins de modelado analógico añaden calidez y carácter a las mezclas digitales. Aunque no son esenciales, plugins como Universal Audio UAD y SSL Native pueden ayudar a lograr un sonido más profesional." },
    { q: "What plugins do professional mixers use?", q_es: "¿Qué plugins usan los mezcladores profesionales?", a: "Professional mixers commonly use FabFilter Total Bundle (EQ, compression, limiting), iZotope Ozone and RX suites (mastering, repair), Celemony Melodyne (pitch correction), ValhallaDSP (reverb), Soundtoys (effects), and Universal Audio UAD (analog modeling). Many also rely on Waves and Plugin Alliance for specific tools.", a_es: "Los mezcladores profesionales usan FabFilter Total Bundle, iZotope Ozone y RX, Celemony Melodyne, ValhallaDSP, Soundtoys y Universal Audio UAD. Muchos también confían en Waves y Plugin Alliance." }
  ],
  accessories: [
    { q: "What studio accessories do I actually need?", q_es: "¿Qué accesorios de estudio realmente necesito?", a: "Essential studio accessories include a quality microphone stand (K&M), XLR cables (Mogami or Monster), pop filter, monitor isolation pads, and a sturdy desk or stand for your gear. A MIDI controller like the Arturia KeyLab Essential also helps enormously with music production workflow.", a_es: "Los accesorios esenciales incluyen un soporte de micrófono de calidad, cables XLR, filtro antipop, pads de aislamiento para monitores y un controlador MIDI como el Arturia KeyLab Essential." },
    { q: "Are expensive XLR cables worth it?", q_es: "¿Valen la pena los cables XLR caros?", a: "For most home studios, mid-range XLR cables from companies like Mogami, Monster, or Pro Co provide excellent value. Spending $20-30 per cable ensures reliable performance and noise rejection. Ultra-expensive cables offer diminishing returns — the difference between a $30 cable and a $100 cable is negligible for most applications.", a_es: "Para la mayoría de estudios caseros, cables de gama media de Mogami o Monster ofrecen excelente valor. Gastar $20-30 por cable asegura rendimiento confiable. Los cables ultra caros ofrecen rendimientos decrecientes." },
    { q: "What is the best mic stand for studio recording?", q_es: "¿Cuál es el mejor soporte de micrófono para grabación?", a: "K&M microphone stands are widely considered the best for studio recording due to their German engineering, durability, and stability. The K&M 210/9 boom stand is a classic choice. For budget options, On-Stage Stands offers decent quality at half the price.", a_es: "Los soportes K&M son considerados los mejores para grabación por su durabilidad y estabilidad. El K&M 210/9 es un clásico. Para opciones económicas, On-Stage Stands ofrece calidad decente a mitad de precio." },
    { q: "Do I need monitor stands for my studio?", q_es: "¿Necesito soportes de monitor para mi estudio?", a: "Monitor stands significantly improve sound quality by decoupling speakers from surfaces and positioning them at the correct height and angle. If your monitors sit on your desk, isolation pads are a budget-friendly alternative. For the best results, dedicated floor stands with sand-filled columns are ideal.", a_es: "Los soportes de monitor mejoran significativamente la calidad del sonido al desacoplar los altavoces. Si tus monitores están en el escritorio, los pads de aislamiento son una alternativa económica." },
    { q: "What is the best MIDI controller for beginners?", q_es: "¿Cuál es el mejor controlador MIDI para principiantes?", a: "The Arturia KeyLab Essential 49 Mk3 is the best MIDI controller for beginners, offering great keybed feel, excellent software integration, and useful controls. The Akai MPK Mini MK3 is a compact, affordable choice for smaller spaces. Both come with software bundles that include DAWs and virtual instruments.", a_es: "El Arturia KeyLab Essential 49 Mk3 es el mejor controlador MIDI para principiantes. El Akai MPK Mini MK3 es una opción compacta y económica. Ambos incluyen paquetes de software con DAWs e instrumentos virtuales." }
  ],
  basses: [
    { q: "What is the best budget bass that sounds expensive?", q_es: "¿Cuál es el mejor bajo barato que suena a caro?", a: "The Squier Classic Vibe '60s Jazz Bass ($450) is widely considered the best budget bass that sounds like a much more expensive instrument. It delivers 90% of the tone of a vintage Fender Jazz Bass at a fraction of the cost. The Sire Marcus Miller V3 ($350) is another top contender with its active EQ and premium build quality.", a_es: "El Squier Classic Vibe '60s Jazz Bass ($450) es ampliamente considerado el mejor bajo barato que suena como uno mucho más caro. Ofrece el 90% del tono de un Fender Jazz Bass vintage a una fracción del costo." },
    { q: "Which bass guitar is best for rock music on a budget?", q_es: "¿Qué bajo es mejor para rock con presupuesto ajustado?", a: "The Epiphone Thunderbird '60s Bass ($350) is the best budget bass for rock, featuring a neck-through-body construction typically found on $1,500+ basses. The Squier Affinity PJ Bass ($280) is also excellent for rock with its punchy split-coil pickup.", a_es: "El Epiphone Thunderbird '60s Bass ($350) es el mejor bajo económico para rock, con construcción neck-through-body típica de bajos de $1,500+. El Squier Affinity PJ Bass ($280) también es excelente para rock." },
    { q: "How much should I spend on a first bass guitar?", q_es: "¿Cuánto debería gastar en mi primer bajo?", a: "A budget of $250-$450 is the sweet spot for a quality beginner bass. The Squier Affinity PJ ($280) and Ibanez SR300E ($350) are excellent starters. Avoid basses under $200 as they often have playability issues. The Sterling Ray4 ($350) offers the best value for players interested in funk and slap styles.", a_es: "Un presupuesto de $250-$450 es el punto óptimo para un bajo de principiante de calidad. El Squier Affinity PJ ($280) y el Ibanez SR300E ($350) son excelentes para empezar. Evita bajos de menos de $200." },
    { q: "Should I get a 4-string or 5-string bass as a beginner?", q_es: "¿Debería comprar un bajo de 4 o 5 cuerdas como principiante?", a: "Start with a 4-string bass. It's easier to learn on, strings are cheaper, and most music is written for 4-string bass. The Squier Classic Vibe '60s Jazz Bass ($450) is an excellent 4-string choice. Upgrade to a 5-string like the Sterling Ray5 once you need that low B string for modern genres.", a_es: "Empieza con un bajo de 4 cuerdas. Es más fácil aprender, las cuerdas son más baratas y la mayoría de la música está escrita para 4 cuerdas. El Squier Classic Vibe '60s Jazz Bass ($450) es una excelente opción." },
    { q: "What is the difference between active and passive bass pickups?", q_es: "¿Cuál es la diferencia entre pastillas activas y pasivas?", a: "Active pickups use a battery-powered preamp for higher output and more tonal control via EQ. They're great for modern styles like metal and slap. Passive pickups have a warmer, more natural tone and don't need batteries. The Yamaha TRBX304 has an active EQ while the Squier Classic Vibe uses vintage-style passive pickups.", a_es: "Las pastillas activas usan un previo alimentado por batería para mayor salida y control de tono. Son ideales para estilos modernos. Las pasivas tienen un tono más cálido y natural. El Yamaha TRBX304 tiene EQ activo mientras el Squier Classic Vibe usa pastillas pasivas estilo vintage." }
  ],
  guitars: [
    { q: "What is the best electric guitar for home recording?", q_es: "¿Cuál es la mejor guitarra eléctrica para grabación casera?", a: "The Fender American Professional II Stratocaster is the most versatile studio guitar, offering pristine cleans, punchy mids, and a comfortable neck. For budget-conscious players, the Squire Classic Vibe series delivers exceptional value. The Les Paul Standard is unmatched for thick, sustained rock tones.", a_es: "La Fender American Professional II Stratocaster es la guitarra de estudio más versátil, ofreciendo limpias prístinas y medios potentes. Para presupuestos ajustados, la serie Squier Classic Vibe ofrece valor excepcional. La Les Paul Standard es insuperable para tonos rock gruesos y sostenidos." },
    { q: "Acoustic vs electric guitar for beginners?", q_es: "¿Guitarra acústica vs eléctrica para principiantes?", a: "Electric guitars are easier on the fingers, have thinner strings and lower action, making them more comfortable for beginners. Acoustic guitars build finger strength faster but can be uncomfortable at first. For home recording, an electric guitar with an audio interface offers the most versatility.", a_es: "Las guitarras eléctricas son más cómodas para los dedos, tienen cuerdas más finas y una acción más baja. Las acústicas desarrollan la fuerza de los dedos más rápido pero pueden ser incómodas al principio. Para grabación casera, una guitarra eléctrica con interfaz de audio ofrece la mayor versatilidad." },
    { q: "How much should I spend on a first guitar?", q_es: "¿Cuánto debería gastar en mi primera guitarra?", a: "A budget of $200-$500 is the sweet spot for a quality beginner guitar. The Yamaha Pacifica 112V ($349) and Squier Affinity Stratocaster ($299) are excellent starters that won't hold you back. Avoid guitars under $150 as they often have playability issues that frustrate beginners.", a_es: "Un presupuesto de $200-$500 es el punto óptimo para una guitarra de principiante de calidad. La Yamaha Pacifica 112V ($349) y Squier Affinity Stratocaster ($299) son excelentes opciones que no te limitarán. Evita guitarras de menos de $150, ya que suelen tener problemas de tocabilidad." },
    { q: "What guitar amp should a beginner buy?", q_es: "¿Qué amplificador de guitarra debería comprar un principiante?", a: "A modeling amp like the Boss Katana 50 ($259) is the best choice for beginners, offering dozens of effects and amp models in one affordable package. For practice, the Fender Mustang LT25 ($149) is excellent. Tube amps like the Marshall DSL40CR ($999) are for intermediate to advanced players.", a_es: "Un amplificador de modelado como el Boss Katana 50 ($259) es la mejor opción para principiantes, ofreciendo docenas de efectos y modelos de amplificador en un paquete asequible. Para práctica, el Fender Mustang LT25 ($149) es excelente." },
    { q: "What is the best guitar for recording and live performance?", q_es: "¿Cuál es la mejor guitarra para grabación y directo?", a: "The Fender American Professional II Stratocaster excels in both studio and stage. Its versatile pickups cover everything from clean funk to overdriven rock. The HSS configuration provides humbucking power for high-gain tones while retaining single-coil clarity for cleans.", a_es: "La Fender American Professional II Stratocaster destaca tanto en estudio como en escenario. Sus pastillas versátiles cubren desde funk limpio hasta rock saturado. La configuración HSS proporciona potencia humbucking para tonos de alta ganancia manteniendo la claridad single-coil para limpios." }
  ],
  live_sound: [
    { q: "What is the best powered PA speaker for live performances?", q_es: "¿Cuál es el mejor altavoz PA activo para presentaciones en vivo?", a: "The QSC K12.2 is the industry standard for live sound, offering 2000W of Class D power, a 12-inch woofer, and a 1.4-inch compression driver. The Electro-Voice ZLX-12P is an excellent budget-friendly alternative at half the price.", a_es: "El QSC K12.2 es el estándar de la industria para sonido en vivo, ofreciendo 2000W de potencia Clase D, un woofer de 12 pulgadas y un driver de compresión de 1.4 pulgadas. El Electro-Voice ZLX-12P es una excelente alternativa económica a la mitad del precio." },
    { q: "How many watts do I need for a PA speaker?", q_es: "¿Cuántos vatios necesito para un altavoz PA?", a: "For small to medium venues (up to 300 people), 1000-2000W peak powered speakers like the QSC K12.2 or EV ZLX-12P are sufficient. For larger venues, look for 2000W+ systems with subwoofers. SPL rating matters more than wattage.", a_es: "Para lugares pequeños y medianos (hasta 300 personas), los altavoces activos de 1000-2000W pico como el QSC K12.2 o EV ZLX-12P son suficientes. Para lugares más grandes, busca sistemas de 2000W+ con subwoofers. La clasificación SPL importa más que el vataje." },
    { q: "Do I need a subwoofer with my PA speakers?", q_es: "¿Necesito un subwoofer con mis altavoces PA?", a: "For live music with bass guitars and kick drums, a subwoofer is essential for full-range sound. For spoken word events, 12-inch or 15-inch tops alone may suffice. The QSC KS112 or EV ELX200-12S pair well with the K12.2 and ZLX-12P respectively.", a_es: "Para música en vivo con bajos y bombos, un subwoofer es esencial para sonido de rango completo. Para eventos de voz, los tops de 12 o 15 pulgadas pueden ser suficientes. El QSC KS112 o EV ELX200-12S combinan bien con el K12.2 y ZLX-12P respectivamente." },
    { q: "What is the difference between active and passive PA speakers?", q_es: "¿Cuál es la diferencia entre altavoces PA activos y pasivos?", a: "Active speakers like the QSC K12.2 have built-in amplifiers and DSP, making them easier to set up — just plug in a microphone or mixer. Passive speakers require an external amplifier and crossover but offer more customization and easier serviceability.", a_es: "Los altavoces activos como el QSC K12.2 tienen amplificadores y DSP incorporados, facilitando la configuración — solo conecta un micrófono o mezclador. Los pasivos requieren un amplificador externo y crossover pero ofrecen más personalización." },
    { q: "How do I choose between a 12-inch and 15-inch PA speaker?", q_es: "¿Cómo elijo entre un altavoz PA de 12 y 15 pulgadas?", a: "12-inch speakers like the QSC K12.2 offer a good balance of portability and low-end response, ideal for most venues. 15-inch speakers provide more bass but are heavier. For full-range sound without a sub, 15-inch is better. With a subwoofer, 12-inch tops are preferred.", a_es: "Los altavoces de 12 pulgadas como el QSC K12.2 ofrecen buen equilibrio entre portabilidad y respuesta de graves, ideales para la mayoría de lugares. Los de 15 pulgadas proporcionan más graves pero pesan más. Para sonido de rango completo sin sub, 15 pulgadas es mejor. Con subwoofer, los tops de 12 pulgadas son preferidos." }
  ],
  production: [
    { q: "What equipment do I need for making beats?", q_es: "¿Qué equipo necesito para hacer beats?", a: "Start with a DAW (Ableton Live, FL Studio), a MIDI controller like the Akai MPC or Arturia KeyLab, studio headphones like the beyerdynamic DT 770 Pro, and a good audio interface like the Focusrite Scarlett 2i2.", a_es: "Comienza con un DAW (Ableton Live, FL Studio), un controlador MIDI como Akai MPC o Arturia KeyLab, auriculares de estudio como los beyerdynamic DT 770 Pro, y una buena interfaz de audio como la Focusrite Scarlett 2i2." },
    { q: "What is the best DAW for beat-making?", q_es: "¿Cuál es el mejor DAW para hacer beats?", a: "Ableton Live is the most popular choice for beat-making due to its intuitive workflow, powerful MIDI editing, and session view. FL Studio is another top choice with its step sequencer and pattern-based approach. Both are excellent for electronic music production.", a_es: "Ableton Live es la opción más popular para hacer beats por su flujo de trabajo intuitivo, potente edición MIDI y vista de sesión. FL Studio es otra excelente opción con su secuenciador de pasos y enfoque basado en patrones. Ambos son excelentes para producción de música electrónica." },
    { q: "Do I need a drum machine or can I use software?", q_es: "¿Necesito una caja de ritmos o puedo usar software?", a: "Software drum machines and samplers in your DAW can produce professional results. However, hardware drum machines like the Roland TR-8S or Akai MPC One offer tactile control and can inspire creativity. Many producers use both.", a_es: "Las cajas de ritmos y samplers de software en tu DAW pueden producir resultados profesionales. Sin embargo, las cajas de ritmos hardware como Roland TR-8S o Akai MPC One ofrecen control táctil y pueden inspirar creatividad. Muchos productores usan ambos." }
  ],
  amps: [
    { q: "What is the best guitar amp for beginners?", q_es: "¿Cuál es el mejor amplificador de guitarra para principiantes?", a: "The Boss Katana 50 ($259) is the best modeling amp for beginners, offering dozens of effects and amp models in one affordable package. The Fender Mustang LT25 ($149) is excellent for practice. Tube amps like the Marshall DSL40CR ($999) are for intermediate to advanced players.", a_es: "El Boss Katana 50 ($259) es el mejor amplificador de modelado para principiantes. El Fender Mustang LT25 ($149) es excelente para práctica. Los amplificadores a válvulas como el Marshall DSL40CR ($999) son para niveles intermedios y avanzados." },
    { q: "Modeling vs tube amp — which is better?", q_es: "¿Amplificador de modelado vs válvulas — cuál es mejor?", a: "Modeling amps like the Boss Katana offer versatility with many amp models and effects built-in, perfect for home practice and recording. Tube amps like the Marshall DSL40CR provide dynamic response and natural compression that many guitarists prefer for live performance and studio recording.", a_es: "Los amplificadores de modelado como el Boss Katana ofrecen versatilidad con muchos modelos de amplificador y efectos incorporados. Los amplificadores a válvulas como el Marshall DSL40CR ofrecen respuesta dinámica que muchos guitarristas prefieren para directo." },
    { q: "How many watts do I need for a guitar amp?", q_es: "¿Cuántos vatios necesito para un amplificador de guitarra?", a: "For home practice, 5-20 watts is sufficient. For rehearsals with a band, 20-50 watts. For live performances without PA support, 50-100 watts. Modeling amps like the Katana have power attenuation, letting you get great tone at any volume level.", a_es: "Para práctica en casa, 5-20 vatios son suficientes. Para ensayos con banda, 20-50 vatios. Para presentaciones en vivo sin apoyo de PA, 50-100 vatios. Los amplificadores de modelado como el Katana tienen atenuación de potencia." }
  ],
  pedals: [
    { q: "What guitar pedals should every guitarist have?", q_es: "¿Qué pedales de guitarra debería tener todo guitarrista?", a: "Essential guitar pedals include a tuner, overdrive/distortion (like the Ibanez Tube Screamer), delay (like the Boss DD-8), reverb, and a volume or wah pedal. A multi-effects pedal like the Line 6 HX Stomp can replace many individual pedals.", a_es: "Los pedales esenciales incluyen afinador, overdrive/distorsión (como Ibanez Tube Screamer), delay (como Boss DD-8), reverb y un pedal de volumen o wah. Un pedal multiefectos como el Line 6 HX Stomp puede reemplazar muchos pedales individuales." },
    { q: "Are expensive guitar pedals worth it?", q_es: "¿Valen la pena los pedales de guitarra caros?", a: "Expensive pedals from brands like Strymon, Chase Bliss, and Eventide offer superior build quality, more features, and better sound quality. However, budget pedals from brands like Boss, MXR, and TC Electronic offer excellent value and are used by many professionals.", a_es: "Los pedales caros de marcas como Strymon, Chase Bliss y Eventide ofrecen calidad de construcción superior. Sin embargo, los pedales económicos de Boss, MXR y TC Electronic ofrecen excelente valor." },
    { q: "Should I buy individual pedals or a multi-effects unit?", q_es: "¿Debería comprar pedales individuales o un multiefectos?", a: "Individual pedals allow you to customize your tone and mix and match brands. Multi-effects units like the Line 6 HX Stomp or Boss GT-1000 offer convenience, presets, and cost-effectiveness. Many players start with a multi-effects unit and add individual pedals later.", a_es: "Los pedales individuales permiten personalizar tu sonido y combinar marcas. Los multiefectos como Line 6 HX Stomp o Boss GT-1000 ofrecen conveniencia y rentabilidad. Muchos músicos empiezan con un multiefectos y añaden pedales individuales después." }
  ],
  daw: [
    { q: "What is the best DAW for music production?", q_es: "¿Cuál es el mejor DAW para producción musical?", a: "Ableton Live is the best for electronic music and beat-making, Pro Tools is the industry standard for recording and mixing, Logic Pro is excellent for songwriting on Mac, and Cubase offers powerful MIDI and scoring features. The best DAW depends on your workflow and genre.", a_es: "Ableton Live es el mejor para música electrónica, Pro Tools es el estándar de la industria para grabación, Logic Pro es excelente para composición en Mac, y Cubase ofrece potentes funciones MIDI. El mejor DAW depende de tu flujo de trabajo." },
    { q: "Do I need an expensive DAW as a beginner?", q_es: "¿Necesito un DAW caro como principiante?", a: "No. GarageBand (Mac), BandLab (web), and Cakewalk (Windows) are free and capable. Ableton Live Intro, FL Studio Fruity Edition, and Logic Pro (Mac) offer professional features at reasonable prices. Start with a free option and upgrade when you need more features.", a_es: "No. GarageBand (Mac), BandLab (web) y Cakewalk (Windows) son gratuitos y capaces. Ableton Live Intro, FL Studio Fruity Edition y Logic Pro (Mac) ofrecen funciones profesionales a precios razonables. Empieza con una opción gratuita." },
    { q: "What is the difference between Ableton Live and Pro Tools?", q_es: "¿Cuál es la diferencia entre Ableton Live y Pro Tools?", a: "Ableton Live is designed for electronic music production with its session view, warping, and MIDI workflow. Pro Tools is optimized for recording, editing, and mixing audio with industry-standard editing tools and automation. Many professionals use both for different stages of production.", a_es: "Ableton Live está diseñado para producción de música electrónica. Pro Tools está optimizado para grabación, edición y mezcla de audio. Muchos profesionales usan ambos para diferentes etapas de producción." }
  ],
  keyboards: [
    { q: "What is the best MIDI keyboard for music production?", q_es: "¿Cuál es el mejor teclado MIDI para producción musical?", a: "The Arturia KeyLab Essential 49 Mk3 offers the best value with great keybed feel, DAW integration, and included software. The Novation Launchkey 49 is excellent for Ableton users. For portability, the Akai MPK Mini MK3 is a compact powerhouse.", a_es: "El Arturia KeyLab Essential 49 Mk3 ofrece el mejor valor con buen tacto de teclas e integración DAW. El Novation Launchkey 49 es excelente para usuarios de Ableton. Para portabilidad, el Akai MPK Mini MK3 es un compacto potente." },
    { q: "How many keys do I need on a MIDI keyboard?", q_es: "¿Cuántas teclas necesito en un teclado MIDI?", a: "25 keys is sufficient for basslines, leads, and chord stabs. 49 keys is the sweet spot for most producers, allowing two-handed playing. 61 or 88 keys are best for pianists and those who want to play complex arrangements. Consider your desk space and portability needs.", a_es: "25 teclas son suficientes para líneas de bajo y leads. 49 teclas es el punto óptimo para la mayoría de productores. 61 u 88 teclas son mejores para pianistas. Considera tu espacio y portabilidad." },
    { q: "Weighted vs semi-weighted keys — which is better?", q_es: "¿Teclas contrapesadas vs semi-pesadas — cuál es mejor?", a: "Weighted keys simulate the feel of an acoustic piano and are best for pianists. Semi-weighted keys offer a balance between synth-action and weighted, suitable for most production styles. Synth-action (unweighted) keys are lighter and better for fast leads and synth playing.", a_es: "Las teclas contrapesadas simulan un piano acústico. Las semi-pesadas ofrecen equilibrio entre acción de sintetizador y contrapesadas. Las teclas de acción de sintetizador son más ligeras." }
  ],
  'drum-machine': [
    { q: "What is the best drum machine for music production?", q_es: "¿Cuál es la mejor caja de ritmos para producción musical?", a: "The Roland TR-8S is the best all-around drum machine with authentic 808/909 sounds, sample import, and hands-on control. The Akai MPC One is a powerful groovebox that combines drum sampling, sequencing, and production in one unit. The Korg Volca Beats is a great budget entry point.", a_es: "La Roland TR-8S es la mejor caja de ritmos versátil con sonidos auténticos 808/909. La Akai MPC One es una groovebox potente. La Korg Volca Beats es un gran punto de entrada económico." },
    { q: "Drum machine vs drum software — which should I choose?", q_es: "¿Caja de ritmos vs software de batería — cuál elegir?", a: "Software like Battery, EZDrummer, or Superior Drummer offers unlimited sounds and deep editing. Hardware drum machines like the Roland TR-8S provide tactile control and are more inspiring for live performance and beat-making. Many producers combine both approaches.", a_es: "El software como Battery o Superior Drummer ofrece sonidos ilimitados. Las cajas de ritmos hardware como Roland TR-8S proporcionan control táctil. Muchos productores combinan ambos enfoques." },
    { q: "Can I use a drum machine without a computer?", q_es: "¿Puedo usar una caja de ritmos sin computadora?", a: "Yes. Hardware drum machines like the Roland TR-8S, Akai MPC One, and Elektron Digitakt are standalone devices that don't require a computer. They have built-in sounds, sequencers, and effects. You can record their output directly into an audio interface or mixer.", a_es: "Sí. Las cajas de ritmos hardware como Roland TR-8S y Akai MPC One son dispositivos independientes que no requieren computadora. Tienen sonidos, secuenciadores y efectos incorporados." }
  ],
  streaming: [
    { q: "What is the best microphone for streaming?", q_es: "¿Cuál es el mejor micrófono para streaming?", a: "The Shure SM7B is the industry standard for streaming and podcasting vocals, with the Electro-Voice RE20 as the classic broadcast alternative. For USB simplicity, the Shure MV7+ ($299) and Elgato Wave:3 ($150) plug straight into your PC with zero setup, while the Rode NT1 5th Generation ($269) adds studio-grade condenser detail.", a_es: "El Shure SM7B es el estándar de la industria para voces de streaming y podcast, con el Electro-Voice RE20 como la alternativa clásica de broadcast. Para simplicidad USB, el Shure MV7+ ($299) y el Elgato Wave:3 ($150) se conectan directo a tu PC sin configuración, mientras el Rode NT1 5th Generation ($269) añade detalle de condensador de estudio." },
    { q: "USB vs XLR microphone for streaming — which is better?", q_es: "¿Micrófono USB vs XLR para streaming — cuál es mejor?", a: "USB mics like the Elgato Wave:3 or Shure MV7+ are plug-and-play and perfect for beginners. XLR mics like the Shure SM7B or Electro-Voice RE20 require an audio interface but sound better and allow gain control, plus room to upgrade with a Cloudlifter. The MV7+ and NT1 5th Gen do both, giving you USB today and XLR later.", a_es: "Los micros USB como el Elgato Wave:3 o Shure MV7+ son plug-and-play y perfectos para empezar. Los micros XLR como el Shure SM7B o Electro-Voice RE20 requieren una interfaz de audio pero suenan mejor y permiten controlar la ganancia, con margen para mejorar con un Cloudlifter. El MV7+ y el NT1 5th Gen ofrecen ambos: USB hoy y XLR mañana." },
    { q: "Do I need an audio interface for streaming?", q_es: "¿Necesito una interfaz de audio para streaming?", a: "Only if you use an XLR microphone. A 2-input interface like the Focusrite Scarlett 2i2 4th Gen ($199) covers a single streamer with room to grow, and models like the SSL 2+ ($299) add high headroom and MIDI. For a solo USB setup, no interface is needed at all.", a_es: "Solo si usas un micrófono XLR. Una interfaz de 2 entradas como la Focusrite Scarlett 2i2 4th Gen ($199) cubre a un streamer con margen de crecimiento, y modelos como el SSL 2+ ($299) añaden alto margen y MIDI. Para un setup USB individual, no necesitas interfaz." },
    { q: "How do I stop microphone background noise when streaming?", q_es: "¿Cómo evito el ruido de fondo del micrófono al hacer streaming?", a: "Use a dynamic microphone like the Shure SM7B or MV7+, which rejects off-axis sound much better than condensers. Set a sensible gain level so you're not boosting room noise, position the mic close (2-6 inches), and apply a noise gate in your streaming software. USB mics like the Wave:3 include built-in clipguard and software filters.", a_es: "Usa un micrófono dinámico como el Shure SM7B o MV7+, que rechazan el sonido fuera de eje mucho mejor que los condensadores. Ajusta una ganancia sensata para no amplificar el ruido de la sala, coloca el micro cerca (5-15 cm) y aplica una puerta de ruido en tu software. Los micros USB como el Wave:3 incluyen clipguard y filtros por software." },
    { q: "What do I need for a two-host podcast setup?", q_es: "¿Qué necesito para un podcast con dos presentadores?", a: "For two mics, the simplest solution is a dual-XLR interface or mixer like the Elgato Wave XLR Pro ($350) handling two microphones, or two USB mics into a laptop. The Rode Streamer X and BEACN Mix Create also route multiple audio sources. The Elgato Stream Deck+ ($160) makes mute and scene switching one press.", a_es: "Para dos micros, la solución más simple es una interfaz o mezcladora de doble XLR como el Elgato Wave XLR Pro ($350) gestionando dos micrófonos, o dos micros USB a un portátil. El Rode Streamer X y el BEACN Mix Create también enrutan múltiples fuentes de audio. El Elgato Stream Deck+ ($160) hace que silenciar o cambiar de escena sea un solo toque." }
  ]
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


function ensurePbAff(url) {
  return url && url.indexOf('a_aid=') < 0 && url.indexOf('pluginboutique.com') >= 0 ? url + (url.includes('?') ? '&' : '?') + 'a_aid=6a01e859cbe1a' : url;
}


function wrapAffiliate(storeKey, url) {
  if (!url) return url;
  if (storeKey === 'pluginboutique') return ensurePbAff(url);
  if (storeKey === 'amazon' && url.indexOf('tag=topmusicg-20') < 0 && (url.indexOf('/dp/') >= 0 || url.indexOf('amazon.com') >= 0 || url.indexOf('amazon.co.uk') >= 0)) return url + (url.indexOf('?') >= 0 ? '&' : '?') + 'tag=topmusicg-20';
  if (storeKey === 'andertons' && url.indexOf('irgwc=') < 0) return url + (url.indexOf('?') >= 0 ? '&' : '?') + 'irgwc=1&irpid=7292297';
  if (storeKey === 'reverb' && url.indexOf('awin1.com') < 0 && url.indexOf('reverb.com') >= 0) return 'https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=' + encodeURIComponent(url);
  if (storeKey === 'musicstore' && url.indexOf('awin1.com') < 0 && url.indexOf('musicstore.com') >= 0) return 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=' + encodeURIComponent(normalizeMusicStore(url));
  if (storeKey === 'zzounds' && url.indexOf('anrdoezrs.net') < 0 && url.indexOf('zzounds.com') >= 0) return 'https://www.anrdoezrs.net/click-101857888-10422044-1779394?url=' + encodeURIComponent(url);
  if (storeKey === 'gear4music' && url.indexOf('awin1.com') < 0 && url.indexOf('gear4music.com') >= 0) return 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' + encodeURIComponent(url);
  return url;
}


function normalizeMusicStore(url) {
  if (!url) return url;
  if (url.indexOf('awin1.com') >= 0) {
    const m = url.match(/ued=([^&]+)/);
    if (!m) return url;
    const inner = decodeURIComponent(m[1]);
    const norm = normalizeMusicStoreInner(inner);
    return url.replace(m[1], encodeURIComponent(norm));
  }
  return normalizeMusicStoreInner(url);
}

function normalizeMusicStoreInner(u) {
  if (u.indexOf('musicstore.com/') < 0) { u = u.replace(/https?:\/\/www\.musicstore\.de\//, 'https://www.musicstore.com/'); }
  if (u.indexOf('www.musicstore.com/') < 0) return u;
  const withCurrency = /musicstore\.com\/[A-Za-z]{2}_[A-Za-z]{2}\/[A-Za-z]{3}\//;
  if (withCurrency.test(u)) return u.replace(withCurrency, 'musicstore.com/en_OE/EUR/');
  const localeOnly = /musicstore\.com\/[A-Za-z]{2}_[A-Za-z]{2}\//;
  if (localeOnly.test(u)) return u.replace(localeOnly, 'musicstore.com/en_OE/EUR/');
  return u;
}


function getResolvedStores(product) {
  const allStoreKeys = ['pluginboutique','gear4music','amazon','reverb','andertons','musicstore','zzounds','official','macappstore'];
  const searchUrls = {
    pluginboutique: (t) => `https://www.pluginboutique.com/search?q=${encodeURIComponent(t)}&a_aid=6a01e859cbe1a`, gear4music: (t) => `https://www.gear4music.com/search?q=${encodeURIComponent(t)}`, amazon: (t) => `https://www.amazon.com/s?k=${encodeURIComponent(t)}&tag=topmusicg-20`, reverb: (t) => `https://reverb.com/marketplace?query=${encodeURIComponent(t)}`, andertons: (t) => `https://www.andertons.co.uk/search.php?search_query=${encodeURIComponent(t)}&irgwc=1&irpid=7292297`, musicstore: (t) => `https://www.musicstore.com/en_OE/EUR/search?SearchText=${encodeURIComponent(t)}`, zzounds: () => 'https://www.zzounds.com/a--925521/'
  };
  const s = {};
  const isMacOnly = !!product.stores.macappstore;
  const excluded = product.excludeStores || [];
  allStoreKeys.forEach(key => {
    if (excluded.includes(key)) return;
    if (key === 'amazon' && product.category === 'plugins') return;
    if (key === 'pluginboutique' && product.category !== 'plugins' && product.category !== 'daw') return;
    const specificUrl = product.stores[key];
    if (specificUrl) {
      if (key === 'gear4music' && specificUrl === 'https://www.gear4music.com/search') {
        s[key] = `https://www.gear4music.com/search?q=${encodeURIComponent(shortTitle(product.title))}`;
      } else if (key === 'amazon' && (specificUrl.startsWith('https://www.amazon.com/dp/') || specificUrl.startsWith('https://www.amazon.co.uk/dp/') || specificUrl.match(/\/dp\/[A-Z0-9]+/))) {
        s[key] = (product.amazonNotag || specificUrl.includes('tag=topmusicg-20')) ? specificUrl : specificUrl + (specificUrl.includes('?') ? '&' : '?') + 'tag=topmusicg-20';
      } else if (key === 'andertons' && !specificUrl.includes('irgwc=')) {
        s[key] = specificUrl + (specificUrl.includes('?') ? '&' : '?') + 'irgwc=1&irpid=7292297';
      } else {
        s[key] = specificUrl;
      }
    } else if (!isMacOnly && key !== 'amazon' && searchUrls[key]) {
      s[key] = searchUrls[key](shortTitle(product.title));
    }
  });
  if (s.reverb) {
    s.reverb = `https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=${encodeURIComponent(s.reverb)}`;
  }
  if (s.musicstore && !s.musicstore.startsWith('https://www.awin1.com/cread.php?awinmid=63816')) {
    s.musicstore = `https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=${encodeURIComponent(normalizeMusicStore(s.musicstore))}`;
  } else if (s.musicstore) {
    s.musicstore = normalizeMusicStore(s.musicstore);
  }
  if (s.gear4music) {
    s.gear4music = `https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=${encodeURIComponent(s.gear4music)}`;
  }
  if (s.zzounds) {
    s.zzounds = `https://www.anrdoezrs.net/click-101857888-10422044-1779394?url=${encodeURIComponent(s.zzounds.replace('/a--925521', ''))}`;
  }
  return s;
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
  const order = isLogic ? [] : (dawHasAmazon ? ['zzounds', 'amazon', 'reverb', 'gear4music', 'andertons', 'musicstore'] : isDaw ? ['zzounds', 'reverb', 'andertons', 'musicstore'] : ['zzounds', 'amazon', 'reverb', 'gear4music', 'andertons', 'musicstore']);
  const naList = cfg.na || [];
  const oosList = cfg.oos || [];
  const avail = order.filter(k => naList.indexOf(k) === -1 && ((cfg.urls && cfg.urls[k]) || k === 'reverb' || stores[k]));
  const revUrl = stores.reverb || ('https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=' + encodeURIComponent('https://reverb.com/marketplace?query=' + encodeURIComponent(p.title)));
  const storeSearch = {
    zzounds: () => 'https://www.zzounds.com/item--' + encodeURIComponent(p.title || '').replace(/%20/g, '+') + '?tag=topmusicg-20',
    amazon: () => 'https://www.amazon.com/s?k=' + encodeURIComponent(p.title || '').replace(/%20/g, '+') + '&tag=topmusicg-20',
    reverb: () => revUrl,
    gear4music: () => 'https://www.gear4music.com/search?q=' + encodeURIComponent(p.title || ''),
    andertons: () => 'https://www.andertons.co.uk/search.php?search_query=' + encodeURIComponent(p.title || '') + '&irgwc=1&irpid=7292297',
    musicstore: () => 'https://www.musicstore.com/en_OE/EUR/search?SearchText=' + encodeURIComponent(p.title || '')
  };
  const rowUrl = k => { var u = (cfg.urls && cfg.urls[k]) ? cfg.urls[k] : (k === 'reverb' ? revUrl : stores[k]); if (!u && storeSearch[k]) u = storeSearch[k](); return wrapAffiliate(k, u); };
  const isPlugins = p.category === 'plugins';
  var isUsa = false;
  try { var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; isUsa = tz.indexOf('America/') === 0 && (tz.indexOf('New_York') > -1 || tz.indexOf('Chicago') > -1 || tz.indexOf('Denver') > -1 || tz.indexOf('Los_Angeles') > -1 || tz.indexOf('Anchorage') > -1 || tz.indexOf('Honolulu') > -1 || tz.indexOf('Phoenix') > -1 || tz.indexOf('Detroit') > -1 || tz.indexOf('Indiana') > -1); } catch(e) {}
  const hasAmazon = !isLogic && !isPlugins;
  const primaryStoreKey = isLogic ? 'official' : isPlugins ? 'pluginboutique' : isUsa ? 'zzounds' : 'amazon';
  const pPrice = (cfg.prices && cfg.prices[primaryStoreKey]) || prices[isLogic ? 'official' : isPlugins ? 'pluginboutique' : dawHasAmazon ? 'amazon' : isDaw ? 'gear4music' : primaryStoreKey] || '';
  const zzoundsSearchUrl = 'https://www.zzounds.com/item--' + encodeURIComponent(p.title || p.name || '').replace(/%20/g, '+') + '?tag=topmusicg-20';
  const amazonSearchUrl = 'https://www.amazon.com/s?k=' + encodeURIComponent(p.title || p.name || '').replace(/%20/g, '+') + '&tag=topmusicg-20';
  var pUrlRaw = isLogic ? stores.official : isPlugins ? (stores.pluginboutique || stores.amazon || 'https://www.pluginboutique.com/search?q=' + encodeURIComponent(p.title || '') + '&a_aid=6a01e859cbe1a') : isUsa ? (stores.zzounds || zzoundsSearchUrl) : (stores.amazon || amazonSearchUrl);
  var pUrl = wrapAffiliate(primaryStoreKey, pUrlRaw);
  if (!pUrl) return '';
  const primaryBtn =
    '<a data-store="' + (primaryStoreKey) + '" href="' + pUrl + '" target="_blank" rel="noopener noreferrer sponsored" class="shop-btn-primary" ' +
    'style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:0 16px;height:40px;border-radius:12px;' +
    'background:#3b82f6;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none;border:none;cursor:pointer;' +
    'box-shadow:0 4px 16px rgba(59,130,246,.35);transition:box-shadow .2s ease,filter .2s ease,transform .18s ease" ' +
    'onmouseover="this.style.filter=\'brightness(1.05)\'" onmouseout="this.style.filter=\'\'">' +
    '<span style="display:flex;align-items:center;gap:10px">' + cartSvg + '<span style="display:flex;align-items:center;gap:10px">' + (isLogic ? t('Tienda Oficial', 'Official Store') : t('Comprar en', 'Buy at')) + (isLogic ? '' : dawHasAmazon ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:800\'><span style=\'position:relative;display:inline-block\'>Amaz' + '<svg viewBox=\'86 114 320 72\' preserveAspectRatio=\'none\' style=\'position:absolute;left:17.8%;top:100%;height:7px;width:calc(80% - 1px);margin-top:-5px\'>' + '<path fill=\'#FF9900\' d=\'m 374.00642,142.18404 c -34.99948,25.79739 -85.72909,39.56123 -129.40634,39.56123 -61.24255,0 -116.37656,-22.65135 -158.08757,-60.32496 -3.2771,-2.96252 -0.34083,-6.9999 3.59171,-4.69283 45.01431,26.19064 100.67269,41.94697 158.16623,41.94697 38.774689,0 81.4295,-8.02237 120.6499,-24.67006 5.92501,-2.51683 10.87999,3.88009 5.08607,8.17965\'/>' + '<path fill=\'#FF9900\' d=\'m 388.55678,125.53635 c -4.45688,-5.71527 -29.57261,-2.70033 -40.84585,-1.36327 -3.43442,0.41947 -3.95874,-2.56925 -0.86517,-4.71905 20.00346,-14.07844 52.82696,-10.01483 56.65462,-5.2958 3.82764,4.74526 -0.99624,37.64741 -19.79373,53.35128 -2.88385,2.41195 -5.63662,1.12734 -4.35198,-2.07113 4.2209,-10.53917 13.68519,-34.16054 9.20211,-39.90203\'/>' + '</svg></span>on</span>' : isDaw ? '<span style="' + SHOP_LOGO_STYLE.gear4music + '">' + SHOP_LOGO_TEXT.gear4music + '</span>'     : isPlugins ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:400\'>PLUG<span style=\'color:#000\'>IN</span>BOUTIQUE</span>' : (hasAmazon ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:800\'><span style=\'position:relative;display:inline-block\'>Amaz' + '<svg viewBox=\'86 114 320 72\' preserveAspectRatio=\'none\' style=\'position:absolute;left:17.8%;top:100%;height:7px;width:calc(80% - 1px);margin-top:-5px\'>' + '<path fill=\'#FF9900\' d=\'m 374.00642,142.18404 c -34.99948,25.79739 -85.72909,39.56123 -129.40634,39.56123 -61.24255,0 -116.37656,-22.65135 -158.08757,-60.32496 -3.2771,-2.96252 -0.34083,-6.9999 3.59171,-4.69283 45.01431,26.19064 100.67269,41.94697 158.16623,41.94697 38.774689,0 81.4295,-8.02237 120.6499,-24.67006 5.92501,-2.51683 10.87999,3.88009 5.08607,8.17965\'/>' + '<path fill=\'#FF9900\' d=\'m 388.55678,125.53635 c -4.45688,-5.71527 -29.57261,-2.70033 -40.84585,-1.36327 -3.43442,0.41947 -3.95874,-2.56925 -0.86517,-4.71905 20.00346,-14.07844 52.82696,-10.01483 56.65462,-5.2958 3.82764,4.74526 -0.99624,37.64741 -19.79373,53.35128 -2.88385,2.41195 -5.63662,1.12734 -4.35198,-2.07113 4.2209,-10.53917 13.68519,-34.16054 9.20211,-39.90203\'/>' + '</svg></span>on</span>' : '<span style="' + (SHOP_LOGO_STYLE[primaryStoreKey]||'font-weight:700') + '">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>')) + (pPrice ? '- ' + pPrice : '') + '</span></a>';
  const rows = order.filter(k => k !== primaryStoreKey).map(k => {
    const nm = SHOP_LOGO_TEXT[k] || storeNames[k] || k;
    const st = SHOP_LOGO_STYLE[k] || 'font-weight:700';
    const storeNotes = { zzounds: ['(Planes de pago f\u00e1ciles)', '(Easy Payment Plans)'], reverb: ['(Mercado nuevo y usado)', '(New & Used Market)'], gear4music: ['(Env\u00edos r\u00e1pidos UK)', '(Fast UK Delivery)'], andertons: ['(Soporte experto)', '(Expert Support)'], musicstore: ['(Garant\u00eda de 3 a\u00f1os)', '(3-Year Warranty)'], amazon: ['(Env\u00edo Prime)', '(Prime Delivery)'] };
    const storeNote = storeNotes[k] ? '<span style="color:#a8a8a8;font-size:12px;font-weight:600">' + t(storeNotes[k][0], storeNotes[k][1]) + '</span>' : '';
    const ds = ' data-store="' + k + '"';
    if (naList.indexOf(k) > -1 || (!(cfg.urls && cfg.urls[k]) && k !== 'reverb' && !stores[k])) {
      const naUrl = rowUrl(k);
      return '<a' + ds + ' href="' + naUrl + '" target="_blank" rel="noopener noreferrer sponsored" style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#262626;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span>' + storeNote + '</a>';
    }
    if (oosList.indexOf(k) > -1 || (k !== 'reverb' && !prices[k] && stores[k])) {
      const oosPrice = (cfg.prices && cfg.prices[k]) ? '<span style="margin-left:auto;display:flex;align-items:baseline;gap:6px;white-space:nowrap"><span style="font-weight:700;color:#a8a8a8">' + cfg.prices[k] + '</span></span>' : '';
      return '<a' + ds + ' href="' + rowUrl(k) + '" target="_blank" rel="noopener noreferrer sponsored" style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#262626;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span>' + storeNote + oosPrice + '</a>';
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

(function() {
  var storeLabel = { zzounds: 'zZounds', gear4music: 'Gear4music', musicstore: 'Music Store' };
  var storeStyles = {
    zzounds: "font-family:'Poppins',Arial,sans-serif;font-weight:800;font-style:italic;color:#fff;letter-spacing:-.5px;font-size:15px",
    gear4music: "font-family:'Quicksand','Segoe UI',sans-serif;font-weight:700;color:#fff;letter-spacing:-.3px;font-size:15px",
    andertons: "font-family:'Yellowtail',cursive;font-weight:400;color:#fff;font-size:19px",
    musicstore: "font-family:'Open Sans Condensed','Arial Narrow',Arial,sans-serif;font-weight:700;color:#fff;font-size:18px;letter-spacing:.5px"
  };
  function targetSearch(T, root) {
    var t = ((root && root.querySelector('.guide-product-card-title')) || document.querySelector('.guide-product-card-title') || {}).textContent || '';
    if (T === 'zzounds') return 'https://www.zzounds.com/item--' + encodeURIComponent(t).replace(/%20/g, '+') + '?tag=topmusicg-20';
    if (T === 'gear4music') return 'https://www.gear4music.com/search?q=' + encodeURIComponent(t);
    return 'https://www.musicstore.com/en_OE/EUR/search?SearchText=' + encodeURIComponent(t);
  }
  function doSwap(T) {
    document.querySelectorAll('.guide-product-card-stores, .guide-section-buy, .shop-buttons-wrap').forEach(function(c) {
      var pb = c.querySelector('.shop-btn-primary');
      if (!pb) return;
      var curStore = pb.getAttribute('data-store') || '';
      if (curStore === 'pluginboutique') return;
      if (curStore === T || curStore === 'msdirect') return;
      var zRow = c.querySelector('[data-store="' + T + '"]');
      if (!zRow) {
        var ml = c.querySelector('.shop-more-list');
        if (!ml) return;
        var zHref = targetSearch(T, c);
        var newPrimary = '<a href="' + zHref + '" target="_blank" rel="noopener noreferrer sponsored" class="shop-btn-primary" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:0 16px;height:40px;border-radius:12px;background:#3b82f6;color:#fff;font-size:15px;font-weight:800;text-decoration:none;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(59,130,246,.35);transition:box-shadow .2s ease,filter .2s ease,transform .18s ease" onmouseover="this.style.filter=\'brightness(1.05)\'" onmouseout="this.style.filter=\'\'"><span style="display:flex;align-items:center;gap:10px"><svg viewBox="0 0 576 512" width="1em" height="1em" fill="#fff" style="flex-shrink:0"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0-5.4 21.7c-1.1 4.5-.6 9.2 1.4 13.3L482.3 320l24 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-88 0c-30.9 0-56-25.1-56-56c0-25.9 17.6-47.6 41.5-53.9L442 128l-305.6 0c-14 26-33.1 60.1-44.4 81.5c-11 20.6-36.6 28.4-57.2 17.4c-20.6-11-28.4-36.6-17.4-57.2C35.7 133 63 82.9 74.5 61.8C83.5 45.1 100.9 34 120.8 34L96 34C82.7 34 72 23.3 72 20L0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg><span style="display:flex;align-items:center;gap:10px">Buy at<span style="' + storeStyles[T] + '">' + storeLabel[T] + '</span></span></span></a>';
        pb.insertAdjacentHTML('beforebegin', newPrimary);
        pb.remove();
        return;
      }
      if (!zRow.getAttribute('href')) return;
      var ml2 = c.querySelector('.shop-more-list');
      var zUrl = zRow.getAttribute('href');
      var zPrice = '';
      var zMatch = zRow.innerHTML.match(/font-weight:700;color:#fff[^>]*>([^<]+)/);
      if (zMatch) zPrice = zMatch[1];
      var aUrl = pb.getAttribute('href');
      var globe = '<svg viewBox="0 0 20 20" width="19" height="19" style="display:inline-block;vertical-align:-5px;flex-shrink:0;margin-right:5px"><defs><linearGradient id="glgGeo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#67c6f8"/><stop offset="1" stop-color="#2563eb"/></linearGradient><clipPath id="glcGeo"><circle cx="10" cy="10" r="8.75"/></clipPath></defs><circle cx="10" cy="10" r="8.75" fill="url(#glgGeo)"/><g clip-path="url(#glcGeo)"><path d="M2.6,6.4 Q4.4,4.2 6.6,5 Q8.5,5.7 8.2,7.5 Q7.8,9.4 5.7,9.4 Q2.9,9.3 2.6,6.4 Z" fill="#34d399"/><path d="M11.6,3.2 Q13.8,2.6 14.9,4.4 Q15.8,6 13.9,6.9 Q12,7.7 11.2,5.9 Q10.5,4.3 11.6,3.2 Z" fill="#34d399"/><path d="M11.9,11.7 Q14,10.9 15.2,12.5 Q16.3,14.2 14.6,15.5 Q12.8,16.8 11.4,15.1 Q10.2,13.5 11.9,11.7 Z" fill="#22c55e"/><path d="M4.2,12.3 Q5.8,11.7 6.6,13 Q7.3,14.3 6,15.3 Q4.5,16.3 3.5,15 Q2.6,13.5 4.2,12.3 Z" fill="#22c55e"/><ellipse cx="10" cy="10" rx="4.4" ry="8.75" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width=".7"/><path d="M1.25,10 H18.75" stroke="#fff" stroke-opacity=".35" stroke-width=".7"/></g><circle cx="10" cy="10" r="8.75" fill="none" stroke="#fff" stroke-opacity=".4"/></svg>';
      var newPrimary = '<a href="' + zUrl + '" target="_blank" rel="noopener noreferrer sponsored" class="shop-btn-primary" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:0 16px;height:40px;border-radius:12px;background:#3b82f6;color:#fff;font-size:15px;font-weight:800;text-decoration:none;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(59,130,246,.35);transition:box-shadow .2s ease,filter .2s ease,transform .18s ease" onmouseover="this.style.filter=\'brightness(1.05)\'" onmouseout="this.style.filter=\'\'"><span style="display:flex;align-items:center;gap:10px"><svg viewBox="0 0 576 512" width="1em" height="1em" fill="#fff" style="flex-shrink:0"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0-5.4 21.7c-1.1 4.5-.6 9.2 1.4 13.3L482.3 320l24 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-88 0c-30.9 0-56-25.1-56-56c0-25.9 17.6-47.6 41.5-53.9L442 128l-305.6 0c-14 26-33.1 60.1-44.4 81.5c-11 20.6-36.6 28.4-57.2 17.4c-20.6-11-28.4-36.6-17.4-57.2C35.7 133 63 82.9 74.5 61.8C83.5 45.1 100.9 34 120.8 34L96 34C82.7 34 72 23.3 72 20L0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg><span style="display:flex;align-items:center;gap:10px">Buy at<span style="' + storeStyles[T] + '">' + storeLabel[T] + '</span>' + (zPrice ? ' - ' + zPrice : '') + '</span></span></a>';
      zRow.style.display = 'none';
      pb.insertAdjacentHTML('beforebegin', newPrimary);
      pb.remove();
      if (ml2 && curStore === 'amazon' && !ml2.querySelector('[data-store="amazon"]')) {
        var aPrice = '';
        var aMatch = pb.innerHTML.match(/- ([$£€][0-9.,]+)/);
        if (aMatch) aPrice = aMatch[1];
        var amazonPrice = aPrice ? '<span style="margin-left:auto;display:flex;align-items:baseline;gap:6px;white-space:nowrap"><span style="font-weight:700;color:#fff">' + aPrice + '</span></span>' : '';
        var amazonRow = '<a data-store="amazon" href="' + aUrl + '" target="_blank" rel="noopener noreferrer sponsored" style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#333333;transition:transform .18s ease,background .18s ease,box-shadow .18s ease;color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;border:none"><span style="display:flex;align-items:center">' + globe + 'Amazon</span><span style="color:#a8a8a8;font-size:12px;font-weight:600">(Prime Delivery)</span>' + amazonPrice + '</a>';
        ml2.insertAdjacentHTML('afterbegin', amazonRow);
      }
    });
  }
  function quickTarget() {
    var tz = '';
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
    var isUSTZ = /^America[/](New_York|Chicago|Denver|Los_Angeles|Anchorage|Phoenix|Indiana|Detroit|Boise|Menominee|Kentucky|North_Dakota|Pangnirtung|Rankin_Inlet|Resolute|Yellowknife|Whitehorse|Dawson|Vancouver|Edmonton|Regina|Swift_Current|Winnipeg|Thunder_Bay|Nipigon|IQaluit|Moncton|St_Johns|Halifax|Glace_Bay|Blanc_Sablon|Atikokan|Goose_Bay|Nassau|Fortaleza|Bahia_Banderas|Curacao|Guadeloupe|Martinique|St_Barthelemy|St_Kitts|St_Lucia|St_Thomas|St_Vincent|Aruba|Turks_and_Caicos|Cayman|Bermuda|Puerto_Rico|Virgin)/.test(tz);
    if (isUSTZ) return 'zzounds';
    if (/^Europe[/]London([/]|$)/.test(tz)) return 'gear4music';
    return null;
  }
  function applyNow(T) {
    try { window.__tmgGeoDone = T; window.__tmgGeoResolved = T; } catch (e) {}
    doSwap(T);
    var ev = null;
    try { ev = window.__tmgGeoHandlers; } catch (e) {}
    if (ev) {
      for (var i = 0; i < ev.length; i++) { try { ev[i](T); } catch (e) {} }
      ev.length = 0;
    }
  }
  window.tmgGeoSwap = function() {
    if (window.__tmgGeoResolved) { applyNow(window.__tmgGeoResolved); return; }
    var q = quickTarget();
    if (q) { applyNow(q); return; }
    var cached = null;
    try { cached = localStorage.getItem('tmgGeoSwap'); } catch (e) {}
    if (cached && cached !== 'none') { applyNow(cached); return; }
    if (window.__tmgGeoPending) return;
    try { window.__tmgGeoPending = 1; } catch (e) {}
    var x = new XMLHttpRequest();
    x.open('GET', 'https://ipinfo.io/json', true);
    x.timeout = 5000;
    x.onload = function() {
      try {
        var r = JSON.parse(x.responseText);
        var cc = (r.country || '').toUpperCase();
        var MS = {'AT':1,'BE':1,'BA':1,'BG':1,'HR':1,'CZ':1,'DK':1,'EE':1,'FI':1,'FR':1,'DE':1,'GR':1,'HU':1,'IE':1,'IT':1,'LV':1,'LT':1,'LU':1,'NL':1,'NO':1,'PL':1,'PT':1,'RO':1,'RU':1,'RS':1,'SI':1,'ZA':1,'ES':1,'SE':1,'CH':1,'TR':1};
        var t = cc === 'US' ? 'zzounds' : cc === 'GB' ? 'gear4music' : MS[cc] ? 'musicstore' : 'none';
        try { localStorage.setItem('tmgGeoSwap', t); } catch (e) {}
        try { window.__tmgGeoResolved = t; } catch (e) {}
        if (t !== 'none') applyNow(t);
      } catch (e) {}
      try { window.__tmgGeoPending = 0; } catch (e) {}
    };
    x.onerror = x.ontimeout = function() {
      try { localStorage.removeItem('tmgGeoSwap'); } catch (e) {}
      try { window.__tmgGeoPending = 0; } catch (e) {}
    };
    x.send();
  };
})();
