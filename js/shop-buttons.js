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
  return flagBadge('<rect width="24" height="16" fill="#012169"/>' +
    '<path d="M0,0 L24,16 M24,0 L0,16" stroke="#fff" stroke-width="3.4"/>' +
    '<path d="M0,0 L24,16 M24,0 L0,16" stroke="#C8102E" stroke-width="1.3"/>' +
    '<path d="M12,0 V16 M0,8 H24" stroke="#fff" stroke-width="5.6"/>' +
    '<path d="M12,0 V16 M0,8 H24" stroke="#C8102E" stroke-width="3.4"/>');
};

function globeIcon() {
  const gid = 'glg' + (++FLAG_UID);
  const gcid = 'glc' + (++FLAG_UID);
  return '<svg viewBox="0 0 20 20" width="19" height="19" style="display:inline-block;vertical-align:-5px;flex-shrink:0;margin-right:5px">' +
    '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#67c6f8"/><stop offset="1" stop-color="#2563eb"/></linearGradient>' +
    '<clipPath id="' + gcid + '"><circle cx="10" cy="10" r="8.75"/></clipPath></defs>' +
    '<circle cx="10" cy="10" r="8.75" fill="url(#' + gid + ')"/>' +
    '<g clip-path="url(#' + gcid + ')">' +
    '<path d="M2.6,6.4 Q4.4,4.2 6.6,5 Q8.5,5.7 8.2,7.5 Q7.8,9.4 5.7,9.4 Q2.9,9.3 2.6,6.4 Z" fill="#34d399"/>' +
    '<path d="M11.6,3.2 Q13.8,2.6 14.9,4.4 Q15.8,6 13.9,6.9 Q12,7.7 11.2,5.9 Q10.5,4.3 11.6,3.2 Z" fill="#34d399"/>' +
    '<path d="M11.9,11.7 Q14,10.9 15.2,12.5 Q16.3,14.2 14.6,15.5 Q12.8,16.8 11.4,15.1 Q10.2,13.5 11.9,11.7 Z" fill="#22c55e"/>' +
    '<path d="M4.2,12.3 Q5.8,11.7 6.6,13 Q7.3,14.3 6,15.3 Q4.5,16.3 3.5,15 Q2.6,13.5 4.2,12.3 Z" fill="#22c55e"/>' +
    '<ellipse cx="10" cy="10" rx="4.4" ry="8.75" fill="none" stroke="#ffffff" stroke-opacity=".35" stroke-width=".7"/>' +
    '<path d="M1.25,10 H18.75" stroke="#ffffff" stroke-opacity=".35" stroke-width=".7"/>' +
    '</g>' +
    '<circle cx="10" cy="10" r="8.75" fill="none" stroke="#ffffff" stroke-opacity=".4"/>' +
    '<ellipse cx="7.2" cy="6.2" rx="3.2" ry="1.8" fill="#ffffff" opacity=".25"/>' +
    '</svg>';
};

const SHOP_LOGO_STYLE = {
  gear4music: "font-family:'Quicksand','Segoe UI',sans-serif;font-weight:700;color:#fff;letter-spacing:-.3px;font-size:15px",
  andertons: "font-family:'Yellowtail',cursive;font-weight:400;color:#fff;font-size:19px",
  musicstore: "font-family:'Open Sans Condensed','Arial Narrow',Arial,sans-serif;font-weight:700;color:#fff;font-size:18px;letter-spacing:.5px",
  zzounds: "font-family:'Poppins',Arial,sans-serif;font-weight:800;font-style:italic;color:#fff;letter-spacing:-.5px;font-size:15px",
  reverb: "font-family:'Kaushan Script',cursive;font-weight:400;color:#fff;font-size:17px"
};

const SHOP_LOGO_TEXT = { gear4music: 'Gear4music', andertons: 'Andertons', musicstore: 'Music Store', zzounds: 'zZounds', reverb: 'Reverb' };

const SHOP_FLAG = { zzounds: usaFlag, reverb: globeIcon, gear4music: globeIcon, musicstore: globeIcon, andertons: ukFlag };

const TEST_SHOP_BTN = {
  1: { prices: { amazon: '$439.00', zzounds: '$439.00', reverb: '$439.00', gear4music: '£381.50', andertons: '£379.00', musicstore: '€389.00' } },
  2: { prices: { amazon: '$3,750.00', zzounds: '$3,995.00', reverb: '$3,750.00', andertons: '£3,007.00' } },
  3: { prices: { amazon: '$249.00', zzounds: '$214.00', reverb: '$249.00', gear4music: '£184.75', andertons: '£179.00', musicstore: '€199.00' } },
  4: { prices: { amazon: '$1,225.00', zzounds: '$1,299.00', reverb: '$1,225.00', gear4music: '£893.00', andertons: '£849.00', musicstore: '€772.30' } },
  5: { prices: { amazon: '$109.00', zzounds: '$109.00', reverb: '$109.00', gear4music: '£103.50', andertons: '£103.00', musicstore: '€105.00' } },
  6: { prices: {amazon: '$1,839.99', zzounds: '$1,839.99', andertons: '£1,549.00' } },
  7: { prices: {amazon: '$4,234.33',  zzounds: '$2,799.00', andertons: '£2,499.00' } },
  9: { prices: {amazon: '$1,199.99', zzounds: '$1,199.99', andertons: '£899.00' } },
  10: { prices: { zzounds: '$3,999.00', andertons: '£4,299.00' } },
  11: { prices: {amazon: '$5,999.00',  zzounds: '$5,999.00', andertons: '£3,890.00' } },
  12: { prices: {amazon: '$4,499.99', zzounds: '$4,699.99', andertons: '£4,290.00' } },
  13: { prices: {amazon: '$299.00', zzounds: '$299.00', andertons: '£215.00' } },
  14: { prices: {amazon: '$839.95', zzounds: '$849.00', andertons: '£595.00' } },
  15: { prices: { amazon: '$199.00', zzounds: '$224.99', reverb: '$199.00', gear4music: '£193.75', andertons: '£185.00', musicstore: '€172.00' } },
  16: { prices: { amazon: '$999.00', zzounds: '$999.00', reverb: '$999.00', gear4music: '£849.00', andertons: '£849.00', musicstore: '€945.00' } },
  17: { prices: { amazon: '$999.00', zzounds: '$999.00', reverb: '$999.00', gear4music: '£715.00', andertons: '£715.00', musicstore: '€911.40' } },
  18: { prices: { amazon: '$249.99', zzounds: '$299.99', reverb: '$249.99', gear4music: '£227.00', andertons: '£227.00', musicstore: '€295.00' } },
  19: { prices: { amazon: '$398.99', zzounds: '$339.14', reverb: '$398.99', gear4music: '£263.00', andertons: '£254.00', musicstore: '€289.00' } },
  20: { prices: { amazon: '$269.00', zzounds: '$269.00', reverb: '$269.00', gear4music: '£199.25', musicstore: '€266.00' }, oos: ['andertons'] },
  21: { prices: {amazon: '$899.99', zzounds: '$899.99', andertons: '£600.00' } },
  22: { prices: {amazon: '$1175.00',  andertons: '£959.00' }, oos: ['zzounds'] },
  23: { prices: {amazon: '$199.99', andertons: '£129.00' } },
  24: { prices: {amazon: '$429.99',  zzounds: '$499.00', andertons: '£357.00' } },
  25: { prices: { amazon: '$159.00', zzounds: '$159.00', reverb: '$149.00', gear4music: '£148.00', andertons: '£133.00', musicstore: '€149.00' } },
  26: { prices: { amazon: '$83.98', reverb: '$99.99', gear4music: '£99.00', musicstore: '€89.00' }, urls: { zzounds: 'https://www.zzounds.com/item--SNYMDR7506' }, oos: ['andertons'] },
  28: { prices: { pluginboutique: '$299.00', andertons: '£269.00' } },
  29: { prices: { pluginboutique: '$1069.00', andertons: '£639.00' } },
  30: { prices: { pluginboutique: '$499.00', andertons: '£479.00' } },
  32: { prices: { pluginboutique: '$599.00' } },
  33: { prices: {amazon: '$749.99', zzounds: '$899.99', andertons: '£659.00' } },
  34: { oos: ['zzounds'] },
  39: { prices: { amazon: 'na', andertons: '£42.00' }, oos: ['zzounds'] },
  41: { prices: {amazon: '$329.00', zzounds: '$284.99', andertons: '£249.00' } },
  42: { prices: {amazon: '$1299.99',  zzounds: '$1,299.99', andertons: '£1,052.00' } },
  50: { prices: { amazon: '$99.00', zzounds: '$109.00', reverb: '$109.00', gear4music: '£103.50', andertons: '£103.00', musicstore: '€119.00' } },
  51: { prices: { amazon: '$275.00', zzounds: '$319.00', reverb: '$265.38', gear4music: '£225.00', andertons: '£231.00', musicstore: '€249.00' } },
  52: { prices: { amazon: '$449.00', zzounds: '$449.00', reverb: '$449.00', gear4music: '£539.00', andertons: '£549.00', musicstore: '€539.00' } },
  53: { prices: { amazon: '$294.01', zzounds: '$399.99', reverb: '$295.00', gear4music: '£178.75', andertons: '£175.00', musicstore: '€214.29' } },
  54: { prices: { amazon: '$199.95', zzounds: '$199.95', reverb: '$199.95', gear4music: '£226.00', andertons: '£210.00', musicstore: '€209.20' } },
  55: { prices: { amazon: '$179.00', zzounds: '$199.00', reverb: '$179.00', gear4music: '£153.00', andertons: '£149.00', musicstore: '€133.60' } },
  56: { prices: {amazon: '$139.00', zzounds: '$199.99', andertons: '£149.00' } },
  57: { prices: {amazon: '$139.80',  andertons: '£134.00' }, oos: ['zzounds'] },
  58: { prices: {amazon: '$94.99',  zzounds: '$108.99', andertons: '£54.00' } },
  59: { prices: {amazon: '$165.99',  andertons: '£77.00' }, oos: ['zzounds'] },
  60: { prices: { pluginboutique: '$199.00' } },
  61: { prices: { pluginboutique: '$19.00' } },
  62: { prices: { pluginboutique: '$199.00' } },
  63: { prices: { pluginboutique: '$199.00' } },
  64: { prices: { amazon: '$1,875.65' }, oos: ['zzounds'] },
  65: { prices: {amazon: '$862.39', zzounds: '$879.99', andertons: '£749.00' } },
  66: { prices: { amazon: '$849.99' }, oos: ['zzounds'] },
  67: { prices: { amazon: '$849.99' }, oos: ['zzounds'] },
  68: { prices: {amazon: '$204.99', andertons: '£179.00' }, oos: ['zzounds'] },
  71: { prices: {amazon: '$789.99',  zzounds: '$789.99', andertons: '£749.00' } },
  72: { prices: {amazon: '$334.99', zzounds: '$349.99' } },
  73: { prices: {amazon: '$1,799.99', zzounds: '$1,799.99', andertons: '£1,629.00' } },
  74: { prices: {amazon: '$749.99',  zzounds: '$749.99', andertons: '£599.00' } },
  75: { prices: {amazon: '$749.99', zzounds: '$749.99' } },
  76: { prices: {amazon: '$749.99', zzounds: '$749.99', andertons: '£749.00' } },
  91: { prices: {amazon: '$659.00', zzounds: '$659.00' } },
  92: { oos: ['zzounds'] },
  93: { prices: {amazon: '$2499.00',  zzounds: '$1,099.00' } },
  95: { prices: {amazon: '$749.00', zzounds: '$749.00' } },
  96: { prices: {amazon: '$99.00', zzounds: '$99.99', andertons: '£109.99' } },
  97: { prices: {amazon: '$186.20', zzounds: '$197.99', andertons: '£174.99' } },
  98: { prices: {amazon: '$103.50', zzounds: '$109.99', andertons: '£89.99' } },
  99: { prices: {amazon: '$99.99', zzounds: '$99.99', andertons: '£99.99' } },
  100: { prices: {amazon: '$129.00', andertons: '£95.00' }, oos: ['zzounds'] },
  101: { prices: {amazon: '$83.50', andertons: '£69.99' }, oos: ['zzounds'] },
  102: { prices: {amazon: '$229.00', andertons: '£299.00' }, oos: ['zzounds'] },
  103: { prices: {amazon: '$340.17', zzounds: '$359.99', andertons: '£269.00' } },
  104: { prices: {amazon: '$3,099.99', andertons: '£3,599.00' }, oos: ['zzounds'] },
  105: { prices: {amazon: '$549.00', zzounds: '$549.00', andertons: '£436.00' } },
  106: { prices: {amazon: '$899.99', zzounds: '$899.99', andertons: '£845.00' } },
  108: { prices: {amazon: '$909.99', zzounds: '$909.99' } },
  109: { prices: {amazon: '$1,781.01', zzounds: '$1,899.00', andertons: '£1,359.00' } },
8: { prices: {amazon: '$2,499.00' } },
  110: { prices: {amazon: '$749.00', andertons: '£599.00' } },
  173: { prices: {amazon: '$23.00' } },
  177: { prices: {amazon: '$2,995.00' } },
  178: { prices: {amazon: '$1,199.00' } },
  180: { prices: {amazon: '$3,999.99' } },
  181: { prices: {amazon: '$4,199.00' } },
  195: { prices: {amazon: '$149.99' } },
  221: { prices: {amazon: '$2,100.00' } },
  223: { prices: {amazon: '$3,499.00' } },
  243: { prices: {amazon: '$159.99' } },
  246: { prices: {amazon: '$169.99' } },
  249: { prices: {amazon: '$219.00' } },
  251: { prices: {amazon: '$76.00' } },
  253: { prices: {amazon: '$109.99' } },
  254: { prices: {amazon: '$78.99' } },
  261: { prices: {amazon: '$229.00' } },
  264: { prices: {amazon: '$229.99' } },
  265: { prices: {amazon: '$149.90' } },
  268: { prices: {amazon: '$1,699.95' } },
  270: { prices: {amazon: '$219.99' } },
  274: { prices: {amazon: '$239.99' } },
  277: { prices: {amazon: '$69.99' } },
  278: { prices: {amazon: '$67.99' } },
  279: { prices: {amazon: '$54.99' } },
  280: { prices: {amazon: '$30.99' } },
  281: { prices: {amazon: '$59.99' } },
  284: { prices: {amazon: '$30.00' } },
  286: { prices: {amazon: '$159.00' } },
  287: { prices: {amazon: '$19.99' } },
  289: { prices: {amazon: '$32.99' } },
  290: { prices: {amazon: '$149.00' } },
  295: { prices: {amazon: '$295.99' } },
  309: { prices: {amazon: '$139.99' } },
  314: { prices: {amazon: '$419.99' } },
  327: { prices: {amazon: '$109.97' } },
  333: { prices: {amazon: '$459.99' } },
  353: { prices: {amazon: '$529.99' } },
  356: { prices: {amazon: '$199.99' } },
  357: { prices: {amazon: '$599.99' } },
  359: { prices: {amazon: '$94.99' } },
  112: { prices: {amazon: '$165.00' } },
  113: { prices: {amazon: '$599.00', andertons: '£549.00' } },
  114: { prices: {amazon: '$579.99' } },
  115: { prices: {andertons: '£299.00' } },
  116: { prices: {amazon: '$129.00', andertons: '£112.00' }, oos: ['zzounds'] },
  117: { prices: {amazon: '$249.00', zzounds: '$249.00', andertons: '£169.00' } },
  118: { prices: { pluginboutique: '$7599.00' } },
  119: { prices: { pluginboutique: '$30.00' } },
  121: { prices: { pluginboutique: '$999.00', andertons: '£869.00' } },
  122: { prices: { pluginboutique: '$1399.00' } },
  123: { prices: { pluginboutique: '$1249.00', andertons: '£1,124.00' } },
  124: { prices: {amazon: '$879.99', zzounds: '$879.99', andertons: '£919.00' } },
  125: { prices: { amazon: '$719.99' }, oos: ['zzounds'] },
  126: { prices: {amazon: '$1,839.99', zzounds: '$1,839.99', andertons: '£1,599.00' } },
  127: { prices: {amazon: '$1,099.00', zzounds: '$1,099.00', andertons: '£765.00' } },
  128: { prices: {amazon: '$469.99', zzounds: '$469.99' } },
  129: { prices: {amazon: '$404.40', zzounds: '$469.99', andertons: '£319.00' } },
  130: { prices: {amazon: '$149.99', zzounds: '$149.99', andertons: '£129.00' } },
  131: { prices: {amazon: '$349.00', zzounds: '$349.00', andertons: '£239.00' } },
  132: { prices: { andertons: '£859.00' } },
  133: { prices: {amazon: '$109.99', zzounds: '$109.99' } },
  134: { prices: {amazon: '$88.00', zzounds: '$119.99' } },
  135: { prices: {amazon: '$679.00', zzounds: '$679.00', andertons: '£519.00' } },
  136: { prices: {amazon: '$108.57', zzounds: '$115.99', andertons: '£119.99' } },
  137: { prices: {amazon: '$250.74', zzounds: '$250.74' } },
  138: { prices: {amazon: '$1,398.00', andertons: '£991.00' }, oos: ['zzounds'] },
  139: { prices: {amazon: '$3,999.00', andertons: '£2,599.00' }, oos: ['zzounds'] },
  140: { prices: {amazon: '$749.99', zzounds: '$769.99' } },
  141: { prices: { amazon: '$649.99' }, oos: ['zzounds'] },
  142: { prices: {amazon: '$684.39', zzounds: '$699.99', andertons: '£489.00' } },
  143: { prices: {amazon: '$1,899.00', zzounds: '$1,899.00' } },
  144: { prices: {amazon: '$299.99', andertons: '£249.00' }, oos: ['zzounds'] },
  145: { prices: {amazon: '$509.00', andertons: '£315.00' }, oos: ['zzounds'] },
  146: { prices: {amazon: '$380.00',  zzounds: '$379.99', andertons: '£281.00' } },
  147: { prices: {amazon: '$1,099.99', zzounds: '$1,199.99', andertons: '£829.00' } },
  148: { prices: {amazon: '$2,499.00', andertons: '£1,452.00' }, oos: ['zzounds'] },
  149: { prices: {amazon: '$675.00', zzounds: '$573.74' } },
  150: { prices: {amazon: '$268.00', andertons: '£169.00' }, oos: ['zzounds'] },
  151: { prices: { amazon: '$374.99' }, oos: ['zzounds'] },
  152: { prices: {amazon: '$1,232.49', zzounds: '$1,232.49' } },
  153: { prices: {amazon: '$399.00', zzounds: '$399.00', andertons: '£295.00' } },
  154: { prices: {amazon: '$390.99', andertons: '£394.00' }, oos: ['zzounds'] },
  155: { prices: {amazon: '$1,689.99', zzounds: '$1,889.99', andertons: '£1,879.00' } },
  156: { prices: {amazon: '$1,739.99', zzounds: '$1,939.99', andertons: '£1,799.00' } },
  157: { prices: {amazon: '$529.99', andertons: '£399.00' }, oos: ['zzounds'] },
  158: { prices: {amazon: '$351.49', andertons: '£249.00' }, oos: ['zzounds'] },
  159: { prices: {amazon: '$419.99', zzounds: '$419.99', andertons: '£399.00' } },
  160: { prices: {amazon: '$379.99', zzounds: '$379.99', andertons: '£349.00' } },
  161: { prices: {amazon: '$399.99', zzounds: '$399.99', andertons: '£399.00' } },
  162: { prices: { amazon: 'na', andertons: '£799.00' }, oos: ['zzounds'] },
  163: { prices: { zzounds: '$599.00', andertons: '£349.00' } },
  164: { prices: {amazon: '$649.00', zzounds: '$649.00' } },
  165: { prices: { zzounds: '$649.00' } },
  166: { prices: { andertons: '£319.00' }, oos: ['zzounds'] },
  167: { prices: { amazon: '$54.95', zzounds: '$65.95' } },
  174: { prices: {amazon: '$3473.73',  zzounds: '$3,499.99', andertons: '£2,899.00' } },
  175: { prices: {amazon: '$4399.99',  zzounds: '$3,499.99', andertons: '£3,899.00' } },
  176: { prices: {amazon: '$3299.00',  zzounds: '$3,499.00' } },
  182: { prices: {amazon: '$4999.00',  zzounds: '$3,899.00', andertons: '£3,821.00' } },
  183: { prices: {amazon: '$3199.00',  zzounds: '$3,199.00', andertons: '£2,035.00' } },
  184: { prices: { amazon: '$2,299.99', zzounds: '$2,299.99', andertons: '£1,999.00' } },
  185: { prices: {amazon: '$2299.99',  zzounds: '$2,299.99', andertons: '£2,049.00' } },
  186: { prices: {amazon: '$2749.00',  zzounds: '$2,549.00', andertons: '£2,599.00' } },
  187: { prices: {amazon: '$3499.00',  zzounds: '$3,499.00', andertons: '£2,566.00' } },
  188: { prices: {amazon: '$1699.00',  zzounds: '$1,699.00', andertons: '£1,399.00' } },
  189: { prices: { amazon: '$2,149.99', zzounds: '$2,149.99', andertons: '£1,099.00' } },
  190: { prices: {amazon: '$2749.00', zzounds: '$2,749.00', andertons: '£1,799.00' }, oos: ['andertons'] },
  191: { prices: {amazon: '$479.00', zzounds: '$399.99', andertons: '£339.00' } },
  192: { prices: {amazon: '$424.99',  zzounds: '$424.99', andertons: '£451.00' } },
  193: { prices: {amazon: '$499.99',  zzounds: '$499.99', andertons: '£349.00' } },
  194: { prices: { amazon: '$299.00', zzounds: '$299.00', andertons: '£272.00' } },
  196: { prices: {amazon: '$99.00',  zzounds: '$119.00', andertons: '£79.00' } },
  197: { prices: {amazon: '$99.00', zzounds: '$86.00', andertons: '£86.00' } },
  198: { prices: { amazon: '$79.00', zzounds: '$109.00', andertons: '£97.00' } },
  199: { prices: { amazon: '$399.00', zzounds: '$499.00', andertons: '£299.00' } },
  200: { prices: { amazon: '$204.99', zzounds: '$219.99', andertons: '£219.00' } },
  201: { prices: { amazon: '$83.90', andertons: '£58.00' }, oos: ['zzounds'] },
  202: { prices: {amazon: '$699.99',  zzounds: '$599.99', andertons: '£479.00' } },
  203: { prices: {amazon: '$228.50',  zzounds: '$229.99' } },
  204: { prices: {amazon: '$349.99',  zzounds: '$384.99', andertons: '£309.00' } },
  205: { prices: { amazon: '$449.00', zzounds: '$499.00', andertons: '£439.00' } },
  206: { prices: {amazon: '$1599.00',  zzounds: '$1,599.00', andertons: '£1,399.00' } },
  207: { prices: { amazon: '$2,959.00', andertons: '£1,069.00' } },
  208: { prices: { zzounds: '$899.00', andertons: '£709.00' } },
  209: { prices: { amazon: '$1,399.00', andertons: '£879.00' }, oos: ['zzounds'] },
  210: { prices: { amazon: '$219.00', zzounds: '$219.00', andertons: '£149.00' } },
  211: { prices: { amazon: '$399.00', zzounds: '$499.99', andertons: '£372.00' } },
  212: { prices: { amazon: '$219.00', zzounds: '$219.00', andertons: '£193.00' } },
  213: { prices: { amazon: '$199.00', zzounds: '$199.00', andertons: '£179.00' } },
  214: { prices: { amazon: '$429.00', zzounds: '$429.00', andertons: '£295.00' } },
  215: { prices: { amazon: '$660.00', andertons: '£405.00' }, oos: ['zzounds'] },
  216: { prices: { amazon: '$1,699.00', andertons: '£899.00' }, oos: ['zzounds'] },
  217: { prices: { zzounds: '$949.00', andertons: '£787.00' } },
  218: { prices: { amazon: '$669.99', zzounds: '$589.99', andertons: '£463.00' } },
  219: { prices: { amazon: '$696.99', zzounds: '$696.99', andertons: '£555.00' } },
  220: { prices: {amazon: '$399.99', zzounds: '$949.00' } },
  224: { prices: {amazon: '$2,299.00',  zzounds: '$2,299.00' } },
  225: { prices: {amazon: '$549.00', zzounds: '$549.00', andertons: '£429.00' } },
  226: { prices: {amazon: '$179.00',  zzounds: '$179.00' } },
  227: { prices: {amazon: '$199.95', zzounds: '$199.95' } },
  228: { prices: {amazon: '$214.00',  zzounds: '$219.00' } },
  229: { prices: {amazon: '$249.00', zzounds: '$249.00' } },
  230: { prices: {amazon: '$131.60',  zzounds: '$139.00' } },
  231: { prices: { amazon: '$259.00' }, oos: ['zzounds'] },
  232: { prices: {amazon: '$169.00',  zzounds: '$169.00' } },
  233: { prices: {amazon: '$2,199.99', zzounds: '$2,199.99', andertons: '£1,599.00' } },
  234: { prices: {amazon: '$3499.00',  zzounds: '$3,849.00', andertons: '£2,549.00' } },
  235: { prices: {amazon: '$999.00', zzounds: '$1,099.00', andertons: '£803.00' } },
  236: { prices: {amazon: '$1,349.00', zzounds: '$1,499.00', andertons: '£1,149.00' } },
  237: { prices: {amazon: '$1,739.99', andertons: '£1,452.00' } },
  238: { prices: { pluginboutique: '$99.00' } },
  239: { prices: {amazon: '$499.00', zzounds: '$488.00', andertons: '£390.00' } },
  240: { prices: { amazon: '$499.99', zzounds: '$459.99' } },
  244: { prices: {amazon: '$249.00', zzounds: '$229.00' } },
  247: { prices: {amazon: '$799.99',  zzounds: '$799.99', andertons: '£521.00' } },
  248: { prices: {amazon: '$529.00', zzounds: '$595.00', andertons: '£523.00' } },
  250: { prices: {amazon: '$260.00',  zzounds: '$260.00', andertons: '£258.00' } },
  252: { prices: {amazon: '$183.00',  zzounds: '$190.00', andertons: '£173.00' } },
  255: { prices: {amazon: '$449.99',  zzounds: '$519.99', andertons: '£452.00' } },
  256: { prices: {amazon: '$799.00',  zzounds: '$799.00', andertons: '£719.00' } },
  257: { prices: {amazon: '$399.00',  zzounds: '$399.00', andertons: '£329.00' } },
  258: { prices: {amazon: '$249.99',  zzounds: '$199.99', andertons: '£249.00' } },
  259: { prices: {amazon: '$499.99',  zzounds: '$599.99', andertons: '£399.00' } },
  262: { prices: {amazon: '$139.49', zzounds: '$179.99', andertons: '£91.00' } },
  263: { prices: {amazon: '$299.00', zzounds: '$299.00', andertons: '£225.00' } },
  266: { prices: {amazon: '$1,749.00',  zzounds: '$1,749.00', andertons: '£1,180.00' } },
  267: { prices: {amazon: '$989.00',  zzounds: '$989.00', andertons: '£859.00' } },
  269: { prices: {amazon: '$989.00',  zzounds: '$999.00', andertons: '£866.00' } },
  271: { prices: {amazon: '$599.00',  andertons: '£449.00' } },
272: { prices: {amazon: '$879.99',  andertons: '£699.00' } },
273: { prices: {amazon: '$879.99',  andertons: '£699.00' } },
  275: { prices: { amazon: '$329.99' }, oos: ['zzounds'] },
  276: { prices: {amazon: '$69.99', zzounds: '$99.99' } },
  291: { prices: {amazon: '$168.00',  zzounds: '$169.00', andertons: '£149.00' } },
  292: { prices: {amazon: '$103.00',  andertons: '£85.00' } },
  293: { prices: {amazon: '$329.99',  zzounds: '$369.99', andertons: '£299.00' } },
  294: { prices: {amazon: '$279.00',  zzounds: '$349.00' } },
  296: { prices: {amazon: '$699.00',  andertons: '£799.00' } },
  297: { prices: {amazon: '$159.00',  zzounds: '$146.00', andertons: '£122.00' } },
  298: { prices: {amazon: '$159.00',  zzounds: '$159.00', andertons: '£159.00' } },
  299: { prices: {amazon: '$198.00',  zzounds: '$199.00', andertons: '£159.00' } },
  300: { prices: {amazon: '$599.00',  zzounds: '$599.00' } },
  301: { prices: {amazon: '$599.99',  zzounds: '$599.99', andertons: '£566.00' } },
  302: { prices: {amazon: '$599.99',  zzounds: '$299.99' } },
  303: { prices: {amazon: '$395.00',  andertons: '£288.00' }, oos: ['zzounds'] },
  304: { prices: {amazon: '$109.99', andertons: '£449.00' }, oos: ['zzounds'] },
  305: { prices: {amazon: '$593.75',  zzounds: '$599.00', andertons: '£499.00' } },
  306: { prices: {amazon: '$289.99',  zzounds: '$349.99', andertons: '£260.00' } },
  307: { prices: {amazon: '$349.00',  zzounds: '$349.00', andertons: '£276.99' } },
  308: { prices: {amazon: '$799.99',  zzounds: '$799.99', andertons: '£609.00' } },
  310: { prices: {amazon: '$319.99',  zzounds: '$319.99' } },
  311: { prices: {amazon: '$499.99',  zzounds: '$499.99' } },
  312: { prices: {amazon: '$949.00',  zzounds: '$949.00', andertons: '£799.00' } },
  313: { prices: {amazon: '$249.99',  zzounds: '$249.99', andertons: '£139.00' } },
  315: { prices: {amazon: '$259.99',  zzounds: '$259.99', andertons: '£299.00' } },
  316: { prices: {amazon: '$449.99',  zzounds: '$449.99', andertons: '£449.00' } },
  317: { prices: {amazon: '$449.99', zzounds: '$1,149.00', andertons: '£1,199.00' } },
  318: { prices: {amazon: '$2199.99',  zzounds: '$2,199.99', andertons: '£1,699.00' } },
  319: { prices: {amazon: '$2,275.00',  zzounds: '$2,629.00', andertons: '£2,199.00' } },
  320: { prices: {amazon: '$649.95',  zzounds: '$949.00', andertons: '£799.00' } },
  321: { prices: {amazon: '$467.00',  zzounds: '$549.00', andertons: '£505.00' } },
  322: { prices: {amazon: '$779.66', zzounds: '$799.00', andertons: '£598.00' } },
  323: { prices: {amazon: '$99.00',  andertons: '£91.00' } },
  324: { prices: {amazon: '$129.99',  zzounds: '$129.99', andertons: '£89.00' } },
  325: { prices: {amazon: '$549.00', zzounds: '$549.00' } },
  326: { prices: {andertons: '£399.00' } },
  328: { prices: { amazon: '$219.00', zzounds: '$219.00', reverb: '$219.00', andertons: '£152.00' } },
  329: { prices: {amazon: '$199.00',  zzounds: '$229.00' } },
  330: { prices: {amazon: '$20.99', andertons: '£16.00' } },
  331: { prices: {amazon: '$208.00', andertons: '£3,579.00' } },
  332: { prices: {amazon: '$599.00',  zzounds: '$599.00' } },
  334: { prices: {amazon: '$3,299.99', zzounds: '$3,299.99' } },
  335: { prices: {amazon: '$999.99', zzounds: '$744.95' } },
  336: { prices: {amazon: '$249.99',  zzounds: '$249.99' } },
  337: { prices: {amazon: '$1,999.00', zzounds: '$1,999.00', andertons: '£1,565.00' } },
  338: { prices: { amazon: '$359.99', andertons: '£1,019.00' }, oos: ['zzounds'] },
  339: { prices: {amazon: '$999.00',  zzounds: '$1,049.00' } },
  340: { prices: {amazon: '$485.00', zzounds: '$485.00' } },
  341: { prices: {amazon: '$559.00',  zzounds: '$641.52' } },
  342: { prices: {amazon: '$329.95', zzounds: '$349.00' } },
  343: { prices: {amazon: '$269.00', zzounds: '$269.00' } },
  345: { prices: {amazon: '$239.40',  zzounds: '$239.40' } },
  346: { prices: {amazon: '$187.51', zzounds: '$219.00' } },
  347: { prices: { zzounds: '$249.99', andertons: '£175.00' } },
  348: { prices: { zzounds: '$599.99', andertons: '£433.00' } },
  349: { prices: { zzounds: '$1,249.00', andertons: '£899.00' } },
  350: { prices: { zzounds: '$228.99' } },
  352: { prices: {amazon: '$189.00', zzounds: '$249.99' } },
  354: { prices: {amazon: '$799.99', andertons: '£379.00' }, oos: ['zzounds'] },
  355: { prices: { amazon: 'na' }, oos: ['zzounds'] },
  358: { prices: {amazon: '$189.00',  zzounds: '$189.00' } },
  360: { prices: {amazon: '$1499.00',  zzounds: '$1,499.00' } },
  361: { prices: {amazon: '$999.00',  zzounds: '$999.99' } },
  362: { prices: {amazon: '$649.00', zzounds: '$649.00' } },
};

function shopButtonsTest(p, lang) {
  const cfg = TEST_SHOP_BTN[p.id] || {};
  const prices = cfg.prices || {};
  const stores = getResolvedStores(p);
  const isDaw = p.category === 'daw';
  const isLogic = isDaw && !!stores.official;
  const dawHasAmazon = isDaw && !isLogic && prices.amazon;
  const t = (es, en) => lang === 'es' ? es : en;
  const cartSvg = '<svg viewBox="0 0 576 512" width="1em" height="1em" fill="#fff" style="flex-shrink:0"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0-5.4 21.7c-1.1 4.5-.6 9.2 1.4 13.3L482.3 320l24 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-88 0c-30.9 0-56-25.1-56-56c0-25.9 17.6-47.6 41.5-53.9L442 128l-305.6 0c-14 26-33.1 60.1-44.4 81.5c-11 20.6-36.6 28.4-57.2 17.4c-20.6-11-28.4-36.6-17.4-57.2C35.7 133 63 82.9 74.5 61.8C83.5 45.1 100.9 34 120.8 34L96 34C82.7 34 72 23.3 72 20L0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>';
  const chevSvg = '<svg viewBox="0 0 512 512" width="1em" height="1em" fill="currentColor" style="flex-shrink:0;transition:transform .3s ease"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>';
  const order = isLogic ? [] : (dawHasAmazon ? ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore'] : isDaw ? ['zzounds', 'reverb', 'andertons', 'musicstore'] : ['zzounds', 'reverb', 'gear4music', 'andertons', 'musicstore']);
  const naList = cfg.na || [];
  const oosList = cfg.oos || [];
  const avail = order.filter(k => naList.indexOf(k) === -1 && ((cfg.urls && cfg.urls[k]) || k === 'reverb' || stores[k]));
  const revUrl = 'https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=' + encodeURIComponent('https://reverb.com/marketplace?query=' + encodeURIComponent(p.title));
  const rowUrl = k => (cfg.urls && cfg.urls[k]) ? cfg.urls[k] : (k === 'reverb' ? revUrl : stores[k]);
  const isPlugins = p.category === 'plugins';
  const pUrl = isLogic ? stores.official : (dawHasAmazon ? stores.amazon : isDaw ? (stores.gear4music || stores.andertons || stores.musicstore || stores.zzounds || stores.pluginboutique) : isPlugins ? (stores.pluginboutique || stores.amazon) : stores.amazon) || stores[Object.keys(prices)[0]] || stores[avail[0]];
  if (!pUrl) return '';
  const pPrice = prices[isLogic ? 'official' : isPlugins ? 'pluginboutique' : dawHasAmazon ? 'amazon' : isDaw ? 'gear4music' : 'amazon'] || '';
  const primaryBtn =
    '<a href="' + pUrl + '" target="_blank" rel="noopener noreferrer sponsored" class="shop-btn-primary" ' +
    'style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:0 16px;height:40px;border-radius:12px;' +
    'background:#3b82f6;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none;border:none;cursor:pointer;' +
    'box-shadow:0 4px 16px rgba(59,130,246,.35);transition:box-shadow .2s ease,filter .2s ease,transform .18s ease" ' +
    'onmouseover="this.style.filter=\'brightness(1.05)\'" onmouseout="this.style.filter=\'\'">' +
    cartSvg + '<span>' + (isLogic ? t('Tienda Oficial', 'Official Store') : t('Comprar en ', 'Buy at ')) + (isLogic ? '' : dawHasAmazon ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:800\'><span style=\'position:relative;display:inline-block\'>Amaz' + '<svg viewBox=\'86 114 320 72\' preserveAspectRatio=\'none\' style=\'position:absolute;left:17.8%;top:100%;height:7px;width:calc(80% - 1px);margin-top:-5px\'>' + '<path fill=\'#FF9900\' d=\'m 374.00642,142.18404 c -34.99948,25.79739 -85.72909,39.56123 -129.40634,39.56123 -61.24255,0 -116.37656,-22.65135 -158.08757,-60.32496 -3.2771,-2.96252 -0.34083,-6.9999 3.59171,-4.69283 45.01431,26.19064 100.67269,41.94697 158.16623,41.94697 38.774689,0 81.4295,-8.02237 120.6499,-24.67006 5.92501,-2.51683 10.87999,3.88009 5.08607,8.17965\'/>' + '<path fill=\'#FF9900\' d=\'m 388.55678,125.53635 c -4.45688,-5.71527 -29.57261,-2.70033 -40.84585,-1.36327 -3.43442,0.41947 -3.95874,-2.56925 -0.86517,-4.71905 20.00346,-14.07844 52.82696,-10.01483 56.65462,-5.2958 3.82764,4.74526 -0.99624,37.64741 -19.79373,53.35128 -2.88385,2.41195 -5.63662,1.12734 -4.35198,-2.07113 4.2209,-10.53917 13.68519,-34.16054 9.20211,-39.90203\'/>' + '</svg></span>on</span>' : isDaw ? '<span style="' + SHOP_LOGO_STYLE.gear4music + '">' + SHOP_LOGO_TEXT.gear4music + '</span>' : isPlugins ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:400\'>PLUG<span style=\'color:#000\'>IN</span>BOUTIQUE</span>' : '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:800\'><span style=\'position:relative;display:inline-block\'>Amaz' + '<svg viewBox=\'86 114 320 72\' preserveAspectRatio=\'none\' style=\'position:absolute;left:17.8%;top:100%;height:7px;width:calc(80% - 1px);margin-top:-5px\'>' + '<path fill=\'#FF9900\' d=\'m 374.00642,142.18404 c -34.99948,25.79739 -85.72909,39.56123 -129.40634,39.56123 -61.24255,0 -116.37656,-22.65135 -158.08757,-60.32496 -3.2771,-2.96252 -0.34083,-6.9999 3.59171,-4.69283 45.01431,26.19064 100.67269,41.94697 158.16623,41.94697 38.774689,0 81.4295,-8.02237 120.6499,-24.67006 5.92501,-2.51683 10.87999,3.88009 5.08607,8.17965\'/>' + '<path fill=\'#FF9900\' d=\'m 388.55678,125.53635 c -4.45688,-5.71527 -29.57261,-2.70033 -40.84585,-1.36327 -3.43442,0.41947 -3.95874,-2.56925 -0.86517,-4.71905 20.00346,-14.07844 52.82696,-10.01483 56.65462,-5.2958 3.82764,4.74526 -0.99624,37.64741 -19.79373,53.35128 -2.88385,2.41195 -5.63662,1.12734 -4.35198,-2.07113 4.2209,-10.53917 13.68519,-34.16054 9.20211,-39.90203\'/>' + '</svg></span>on</span>') + (pPrice ? ' - ' + pPrice : '') + '</span></a>';
  const rows = order.map(k => {
    const nm = SHOP_LOGO_TEXT[k] || storeNames[k] || k;
    const st = SHOP_LOGO_STYLE[k] || 'font-weight:700';
    if (naList.indexOf(k) > -1 || (!(cfg.urls && cfg.urls[k]) && k !== 'reverb' && !stores[k])) {
      return '<div style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#262626;color:#777;font-size:15px;font-weight:800;cursor:default"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span><span style="margin-left:auto;font-size:12px;font-weight:600;color:#777;font-style:italic">' + t('No disponible', 'Not Available') + '</span></div>';
    }
    if (oosList.indexOf(k) > -1) {
      return '<a href="' + rowUrl(k) + '" target="_blank" rel="noopener noreferrer sponsored" style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#262626;color:#777;font-size:15px;font-weight:800;text-decoration:none"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span><span style="margin-left:auto;font-size:12px;font-weight:600;color:#777;font-style:italic">' + t('Agotado', 'Out of stock') + '</span></a>';
    }
    const pr = prices[k] ? '<span style="margin-left:auto;font-weight:700;color:#fff;white-space:nowrap">' + (k === 'reverb' ? '<span style="color:#555;font-size:12px;font-weight:600;margin-left:6px">' + t('aprox.', 'approx.') + '</span> ' : '') + prices[k] + '</span>' : '';
    const note = k === 'zzounds' && prices[k] ? '<span style="color:#555;font-size:12px;font-weight:600">' + t('(Env\u00edos gratis)', '(Free shipping)') + '</span>' : '';
    return '<a href="' + rowUrl(k) + '" target="_blank" rel="noopener noreferrer sponsored" ' +
      'style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:0 16px;height:40px;border-radius:12px;background:#333333;transition:transform .18s ease,background .18s ease,box-shadow .18s ease;' +
      'color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;border:none"><span style="' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span>' + note + pr + '</a>';
  }).join('');
  const moreBtn =
    '<button type="button" class="shop-btn-more" ' +
    'onclick="var l=this.nextElementSibling;var open=l.style.maxHeight&&l.style.maxHeight!==\'0px\';if(open){l.style.overflow=\'hidden\';l.style.maxHeight=\'0px\';}else{l.style.maxHeight=l.scrollHeight+\'px\';setTimeout(function(){l.style.overflow=\'visible\';},330);}var s=this.querySelector(\'svg:last-of-type\');if(s)s.style.transform=open?\'\':\'rotate(180deg)\';" ' +
    'style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:0 16px;height:40px;border-radius:12px;' +
    'background:#333333;color:#ffffff;font-size:15px;font-weight:800;border:none;cursor:pointer;margin-top:8px;transition:background .2s ease,transform .18s ease" ' +
    'onmouseover="this.style.background=\'#3d3d3d\'" onmouseout="this.style.background=\'#333333\'">' +
    chevSvg + '<span style=\'margin-left:6px\'>' + t('Otras opciones de compra', 'More buying options') + ' (' + order.length + ')</span>' + '</button>' +
    '<div class="shop-more-list" style="width:100%;box-sizing:border-box;display:flex;flex-direction:column;gap:6px;margin-top:8px;overflow:hidden;max-height:0;transition:max-height .3s ease">' + rows + '</div>';
  return isLogic ? primaryBtn : primaryBtn + moreBtn;
};

window.tmgStoreButtons = function (p) {
  try {
    return shopButtonsTest(p, typeof currentLang !== "undefined" ? currentLang : "en");
  } catch (e) { /* fallback a chips */ }
  return null;
};
