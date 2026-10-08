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

const SHOP_LOGO_TEXT = { gear4music: 'Gear4music', andertons: 'Andertons', musicstore: "Music Store", zzounds: 'zZounds', reverb: "Reverb", amazon: "Amazon", hollyland: 'Hollyland' };;

const SHOP_LOGO_STYLE = {
  gear4music: "font-family:'Quicksand','Segoe UI',sans-serif;font-weight:700;color:#fff;letter-spacing:-.3px;font-size:15px", andertons: "font-family:'Yellowtail',cursive;font-weight:400;color:#fff;font-size:19px", musicstore: "font-family:'Open Sans Condensed','Arial Narrow',Arial,sans-serif;font-weight:700;color:#fff;font-size:18px;letter-spacing:.5px", zzounds: "font-family:'Poppins',Arial,sans-serif;font-weight:800;font-style:italic;color:#fff;letter-spacing:-.5px;font-size:15px", reverb: "font-family:'Kaushan Script',cursive;font-weight:400;color:#fff;font-size:17px", hollyland: "font-family:'Poppins',Arial,sans-serif;font-weight:800;color:#fff;letter-spacing:-.3px;font-size:15px"
};

const SHOP_FLAG = { zzounds: usaFlag, reverb: globeIcon, gear4music: ukFlag, musicstore: euFlag, andertons: ukFlag, amazon: globeIcon };

const TEST_SHOP_BTN = {
  1: {
    prices: {
      amazon: "$439.00",
      zzounds: "$439.00",
      gear4music: "£387.00",
      andertons: "£379.00",
      musicstore: "€398.00"
    }
  },
  2: {
    prices: {
      amazon: "$3,750.00",
      zzounds: "$3,995.00",
      andertons: "£3,007.00",
      gear4music: "£2,908.40",
      musicstore: "€2,999.00"
    }
  },
  3: {
    prices: {
      amazon: "$212.00",
      zzounds: "$214.00",
      gear4music: "£184.75",
      andertons: "£182.00",
      musicstore: "€199.00"
    }
  },
  4: {
    prices: {
      amazon: "$1,225.00",
      zzounds: "$1,299.00",
      gear4music: "£893.00",
      andertons: "£849.00",
      musicstore: "€990.00"
    }
  },
  5: {
    prices: {
      amazon: "$109.00",
      zzounds: "$109.00",
      gear4music: "£103.75",
      andertons: "£103.00",
      musicstore: "€105.00"
    }
  },
  6: {
    prices: {
      amazon: "$1,839.99",
      zzounds: "$1,839.99",
      gear4music: "£1,799.00",
      musicstore: "€1,799.00"
    },
    oos: [
      "andertons"
    ]
  },
  7: {
    prices: {
      amazon: "$4,234.33",
      zzounds: "$2,799.00",
      andertons: "£2,499.00",
      gear4music: "£2,499.00",
      musicstore: "€2,949.00"
    }
  },
  8: {
    prices: {
      amazon: "$2,499.00",
      gear4music: "£2,111.00",
      andertons: "£2,299.00",
      musicstore: "€3,212.00"
    }
  },
  11: {
    prices: {
      amazon: "$5,999.00",
      zzounds: "$5,999.00",
      andertons: "£3,890.00",
      gear4music: "£3,890.00",
      musicstore: "€4,275.00"
    }
  },
  12: {
    prices: {
      amazon: "$4,499.99",
      zzounds: "$4,699.99",
      andertons: "£4,290.00",
      gear4music: "£4,290.00",
      musicstore: "€3,599.00"
    }
  },
  13: {
    prices: {
      amazon: "$299.00",
      zzounds: "$299.00",
      andertons: "£215.00",
      gear4music: "£215.00",
      musicstore: "€249.00"
    }
  },
  14: {
    prices: {
      amazon: "$839.95",
      zzounds: "$849.00",
      gear4music: "£699.00",
      musicstore: "€849.00"
    },
    oos: ["andertons"]
  },
  15: {
    prices: {
      amazon: "$199.00",
      zzounds: "$224.99",
      gear4music: "£193.75",
      andertons: "£185.00",
      musicstore: "€172.00"
    }
  },
  16: {
    prices: {
      amazon: "$999.00",
      zzounds: "$999.00",
      gear4music: "£849.00",
      andertons: "£849.00",
      musicstore: "€945.00"
    }
  },
  17: {
    prices: {
      amazon: "$999.00",
      zzounds: "$999.00",
      gear4music: "£715.00",
      andertons: "£715.00",
      musicstore: "€889.00"
    }
  },
  18: {
    prices: {
      amazon: "$249.99",
      zzounds: "$299.99",
      gear4music: "£227.00",
      andertons: "£227.00",
      musicstore: "€295.00"
    }
  },
  19: {
    prices: {
      amazon: "$398.99",
      zzounds: "$398.99",
      gear4music: "£263.00",
      andertons: "£254.00",
      musicstore: "€289.00"
    }
  },
  20: {
    prices: {
      amazon: "$269.00",
      zzounds: "$269.00",
      gear4music: "£199.25",
      musicstore: "€266.00"
    },
    oos: [
      "andertons"
    ]
  },
  21: {
    prices: {
      amazon: "$899.99",
      zzounds: "$939.00",
      andertons: "£600.00",
      gear4music: "£600.00",
      musicstore: "€649.00"
    }
  },
  22: {
    prices: {
      amazon: "$1,175.00",
      andertons: "£959.00",
      gear4music: "£812.00",
      musicstore: "€949.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--GEN8040BPM"
    },
    oos: [
      "zzounds"
    ]
  },
  23: {
    prices: {
      amazon: "$199.99",
      andertons: "£129.00",
      gear4music: "£129.00",
      musicstore: "€149.00",
      zzounds: "$199.99"
    }
  },
  24: {
    prices: {
      amazon: "$489.00",
      zzounds: "$499.00",
      andertons: "£357.00",
      gear4music: "£355.00",
      musicstore: "€432.00"
    }
  },
  25: {
    prices: {
      amazon: "$169.00",
      zzounds: "$159.00",
      gear4music: "£148.00",
      andertons: "£133.00",
      musicstore: "€149.00"
    }
  },
  26: {
    prices: {
      amazon: "$113.00",
      gear4music: "£85.00",
      musicstore: "€89.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--SNYMDR7506"
    },
    oos: [
      "andertons",
      "zzounds"
    ]
  },
  28: {
    prices: {
      pluginboutique: "€301.50",
      andertons: "£269.00",
      gear4music: "£271.00",
      musicstore: "€295.00"
    },
    pbCur: {
      us: "$299.00",
      uk: "£237.97"
    },
  },
  29: {
    prices: {
      pluginboutique: "€906.50",
      andertons: "£639.00",
      zzounds: "$1,069.00",
      gear4music: "£639.00",
      musicstore: "€899.00"
    },
    pbCur: {
      us: "$1,069.00",
      uk: "£850.82"
    },
  },
  30: {
    prices: {
      pluginboutique: "€553.58",
      andertons: "£479.00",
      gear4music: "£479.00",
      musicstore: "€452.90"
    },
    pbCur: {
      us: "$499.00",
      uk: "£397.15"
    },
  },
  32: {
    prices: {
      pluginboutique: "€621.13",
      amazon: "$599.00",
      gear4music: "£489.00",
      musicstore: "€599.00"
    },
    pbCur: {
      us: "$599.00",
      uk: "£476.74"
    },
    oos: [
      "zzounds",
      "andertons"
    ]
  },
  33: {
    prices: {
      amazon: "$749.99",
      zzounds: "$749.99",
      andertons: "£659.00",
      gear4music: "£656.00",
      musicstore: "€669.00"
    }
  },
  39: {
    prices: {
      amazon: "$49.00",
      andertons: "£45.00",
      gear4music: "£53.50",
      musicstore: "€49.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--ASTSWIFTSHIELD"
    },
    oos: [
      "zzounds"
    ]
  },
  42: {
    prices: {
      amazon: "$1,299.99",
      zzounds: "$1,299.99",
      andertons: "£1,039.00",
      gear4music: "£1,039.00",
      musicstore: "€1,099.00"
    }
  },
  50: {
    prices: {
      amazon: "$99.00",
      zzounds: "$109.00",
      gear4music: "£105.00",
      andertons: "£103.00",
      musicstore: "€119.00"
    }
  },
  51: {
    prices: {
      amazon: "$275.00",
      zzounds: "$319.00",
      gear4music: "£222.00",
      andertons: "£231.00",
      musicstore: "€249.00"
    }
  },
  52: {
    prices: {
      amazon: "$449.00",
      zzounds: "$449.00",
      gear4music: "£575.00",
      andertons: "£549.00",
      musicstore: "€639.00"
    }
  },
  53: {
    prices: {
      amazon: "$294.01",
      zzounds: "$399.99",
      gear4music: "£175.00",
      andertons: "£175.00",
      musicstore: "€255.01"
    }
  },
  54: {
    prices: {
      amazon: "$199.95",
      zzounds: "$199.95",
      gear4music: "£226.00",
      andertons: "£210.00",
      musicstore: "€235.00"
    }
  },
  55: {
    prices: {
      amazon: "$179.00",
      zzounds: "$199.00",
      gear4music: "£142.00",
      andertons: "£149.00",
      musicstore: "€168.00"
    }
  },
  56: {
    prices: {
      amazon: "$169.00",
      zzounds: "$150.00",
      andertons: "£149.00",
      gear4music: "£138.00",
      musicstore: "€199.00"
    }
  },
  57: {
    prices: {
      amazon: "$139.80",
      andertons: "£134.00",
      gear4music: "£134.00",
      musicstore: "€121.43"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--AKGK371"
    },
    oos: ["zzounds"]
  },
  58: {
    prices: {
      amazon: "$108.99",
      zzounds: "$108.99",
      andertons: "£54.00",
      gear4music: "£54.70",
      musicstore: "€54.00"
    }
  },
  59: {
    prices: {
      amazon: "$165.99",
      andertons: "£77.00",
      gear4music: "£77.40",
      musicstore: "€78.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--KMS26754"
    },
    oos: [
      "zzounds"
    ]
  },
  60: {
    prices: {
      pluginboutique: "€29.25",
      andertons: "£25.00"
    },
    pbCur: {
      us: "$199.00",
      uk: "£158.38"
    },
  },
  61: {
    prices: {
      pluginboutique: "€50.41",
      gear4music: "£41.99"
    },
    pbCur: {
      us: "$50.00",
      uk: "£39.80"
    },
    oos: [
      "andertons",
      "musicstore"
    ]
  },
  62: {
    prices: {
      pluginboutique: "€170.40",
      zzounds: "$199.00",
      gear4music: "£119.00",
      musicstore: "€169.00",
      andertons: "£119.00"
    },
    pbCur: {
      us: "$199.00",
      uk: "£158.38"
    },
  },
  63: {
    prices: {
      pluginboutique: "€170.40",
      zzounds: "$199.00",
      gear4music: "£145.00",
      musicstore: "€169.00",
      andertons: "£139.00"
    },
    pbCur: {
      us: "$199.00",
      uk: "£158.38"
    },
  },
  65: {
    prices: {
      amazon: "$862.39",
      zzounds: "$879.99",
      andertons: "£749.00",
      gear4music: "£739.00",
      musicstore: "€844.00"
    }
  },
  68: {
    prices: {
      amazon: "$204.99",
      andertons: "£179.00",
      gear4music: "£179.00",
      musicstore: "€239.00",
      zzounds: "$229.99"
    }
  },
  71: {
    prices: {
      amazon: "$789.99",
      zzounds: "$789.99",
      andertons: "£749.00",
      gear4music: "£749.00",
      musicstore: "€859.00"
    }
  },
  72: {
    prices: {
      amazon: "$349.99",
      zzounds: "$350.00",
      andertons: "£279.00",
      gear4music: "£269.00",
      musicstore: "€328.00"
    }
  },
  73: {
    prices: {
      amazon: "$1,799.99",
      zzounds: "$1,799.99",
      andertons: "£1,629.00",
      gear4music: "£970.00",
      musicstore: "€1,149.00"
    }
  },
  74: {
    prices: {
      amazon: "$749.99",
      zzounds: "$749.99",
      andertons: "£599.00",
      gear4music: "£599.00",
      musicstore: "€699.00"
    }
  },
  75: {
    prices: {
      amazon: "$749.99",
      zzounds: "$749.99",
      andertons: "£649.00",
      gear4music: "£649.00",
      musicstore: "€729.00"
    }
  },
  76: {
    prices: {
      amazon: "$749.99",
      zzounds: "$749.99",
      andertons: "£749.00",
      gear4music: "£749.00",
      musicstore: "€888.00"
    }
  },
  91: {
    prices: {
      amazon: "$659.00",
      zzounds: "$659.00",
      andertons: "£589.00",
      gear4music: "£595.00",
      musicstore: "€539.00"
    }
  },
  92: {
    prices: {
      amazon: "$849.00",
      musicstore: "€769.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Sennheiser-EW-100-G4-Wireless-Microphone-System-with-935-S-E-Band/2BBJ",
      zzounds: "https://www.zzounds.com/a--925521/item--SENEW100G4935S"
    },
    oos: [
      "andertons",
      "zzounds"
    ]
  },
93: {
    prices: {
      zzounds: "$1,099.00",
      gear4music: "£755.00",
      andertons: "£759.00",
      musicstore: "€998.00"
    }
  },
  95: {
    prices: {
      amazon: "$749.00",
      zzounds: "$749.00",
      andertons: "£518.00",
      gear4music: "£518.00",
      musicstore: "€675.00"
    }
  },
  96: {
    prices: {
      amazon: "$99.00",
      zzounds: "$99.99",
      andertons: "£105.00",
      gear4music: "£105.00",
      musicstore: "€148.00"
    }
  },
  97: {
    prices: {
      amazon: "$186.20",
      zzounds: "$197.99",
      andertons: "£174.99",
      gear4music: "£166.00",
      musicstore: "€179.00"
    }
  },
  98: {
    prices: {
      amazon: "$103.50",
      zzounds: "$109.99",
      andertons: "£89.99",
      gear4music: "£84.20",
      musicstore: "€99.00"
    }
  },
  99: {
    prices: {
      amazon: "$99.99",
      zzounds: "$99.99",
      andertons: "£99.99",
      gear4music: "£99.00",
      musicstore: "€169.00"
    }
  },
  100: {
    prices: {
      amazon: "$129.00",
      andertons: "£95.00",
      gear4music: "£95.00",
      musicstore: "€110.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--TCEHALLOFFAME2"
    },
    oos: [
      "zzounds"
    ]
  },
  102: {
    prices: {
      amazon: "$229.00",
      andertons: "£299.00",
      gear4music: "£239.00",
      musicstore: "€269.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--YAMFG800"
    },
    oos: [
      "zzounds"
    ]
  },
  103: {
    prices: {
      amazon: "$329.99",
      zzounds: "$379.99",
      gear4music: "£288.00",
      andertons: "£269.00",
      musicstore: "€329.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Yamaha-Pacifica-112V-Natural-Satin/3SL4"
    }
  },
  104: {
    prices: {
      amazon: "$3,499.99",
      andertons: "£3,599.00",
      musicstore: "€3,499.00",
      gear4music: "£3,199.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--MRTD28"
    },
    oos: ["zzounds"]
  },
  105: {
    prices: {
      amazon: "$549.00",
      zzounds: "$549.00",
      andertons: "£436.00",
      gear4music: "£469.00",
      musicstore: "€599.00"
    }
  },
  106: {
    prices: {
      amazon: "$899.99",
      zzounds: "$899.99",
      andertons: "£845.00",
      gear4music: "£862.00",
      musicstore: "€999.00"
    }
  },
  107: {
    prices: {
      amazon: "$469.00",
      zzounds: "$469.00",
      andertons: "£398.00",
      gear4music: "£399.00",
      musicstore: "€449.00"
    }
  },
  108: {
    prices: {
      amazon: "$909.99",
      zzounds: "$909.99",
      gear4music: "£659.00",
      musicstore: "€611.00"
    },
    oos: [
      "andertons"
    ]
  },
  109: {
    prices: {
      amazon: "$1,781.01",
      zzounds: "$1,899.00",
      andertons: "£1,333.00",
      gear4music: "£1,325.00",
      musicstore: "€1,699.00"
    }
  },
  110: {
    prices: {
      amazon: "$749.00",
      andertons: "£599.00",
      gear4music: "£529.00",
      musicstore: "€599.00"
    }
  },
  112: {
    prices: {
      amazon: "$165.00",
      zzounds: "$179.00",
      gear4music: "£192.25",
      musicstore: "€299.00",
      andertons: "£199.00"
    }
  },
  113: {
    prices: {
      gear4music: "£594.00",
      amazon: "$599.00",
      andertons: "£549.00",
      zzounds: "$599.00",
      musicstore: "€599.00",
      pluginboutique: "€834.90"
    },
    pbCur: {
      us: "$805.00",
      uk: "£640.70"
    },
  },
  114: {
    prices: {
      gear4music: "£479.00",
      amazon: "$579.99",
      andertons: "£479.00",
      zzounds: "$579.99",
      musicstore: "€569.00",
      pluginboutique: "€583.83"
    },
    pbCur: {
      us: "$579.99",
      uk: "£461.61"
    },
  },
  115: {
    prices: {
      andertons: "£299.00",
      gear4music: "£245.00",
      amazon: "$399.00",
      pluginboutique: "€289.19"
    },
    pbCur: {
      us: "$299.00",
      uk: "£237.97"
    },
  },
  116: {
    prices: {
      amazon: "$129.00",
      andertons: "£112.00",
      gear4music: "£163.00",
      musicstore: "€155.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--JBLLSR305PMKII"
    },
    oos: [
      "zzounds"
    ]
  },
  117: {
    prices: {
      amazon: "$249.00",
      zzounds: "$249.00",
      andertons: "£169.00",
      gear4music: "£194.00",
      musicstore: "€199.00"
    }
  },
  119: {
    prices: {
      pluginboutique: "€168.19"
    },
    pbCur: {
      us: "$166.79",
      uk: "£132.75"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--WAVSSLNAT"
    },
    oos: [
      "zzounds"
    ],
    na: [
      "gear4music",
      "musicstore"
    ]
  },
  120: {
    prices: {
      pluginboutique: "€99.83",
      zzounds: "$99.00",
      gear4music: "£74.99",
      amazon: "$119.00",
      musicstore: "€83.20",
      andertons: "£79.00"
    },
    pbCur: {
      us: "$99.00",
      uk: "£78.79"
    },
  },
  121: {
    prices: {
      pluginboutique: "€503.15",
      andertons: "£869.00",
      zzounds: "$999.00",
      gear4music: "£899.00"
    },
    pbCur: {
      us: "$999.00",
      uk: "£795.10"
    },
    oos: [
      "musicstore"
    ]
  },
  122: {
    prices: {
      pluginboutique: "€1,511.50",
      gear4music: "£1,299.00",
      musicstore: "€1,349.00",
      andertons: "£1,299.00"
    },
    pbCur: {
      us: "$1,399.00",
      uk: "£1,113.46"
    },
  },
  123: {
    prices: {
      gear4music: "£1,124.00",
      pluginboutique: "€1,259.40",
      andertons: "£1,124.00",
      zzounds: "$1,249.00",
      musicstore: "€1,249.00"
    },
    pbCur: {
      us: "$1,249.00",
      uk: "£994.08"
    },
  },
  124: {
    prices: {
      gear4music: "£729.00",
      amazon: "$879.99",
      zzounds: "$879.99",
      andertons: "£919.00",
      musicstore: "€859.00"
    }
  },
  126: {
    prices: {
      gear4music: "£1,742.00",
      amazon: "$1,839.99",
      zzounds: "$1,839.99",
      musicstore: "€1,799.00"
    },
    oos: [
      "andertons"
    ]
  },
  127: {
    prices: {
      amazon: "$1,099.00",
      zzounds: "$1,099.00",
      andertons: "£799.00",
      gear4music: "£799.00",
      musicstore: "€868.00"
    }
  },
  128: {
    prices: {
      amazon: "$469.99",
      zzounds: "$453.99",
      andertons: "£345.00",
      gear4music: "£345.00",
      musicstore: "€399.00"
    }
  },
  129: {
    prices: {
      amazon: "$404.40",
      zzounds: "$469.99",
      andertons: "£319.00",
      gear4music: "£314.00",
      musicstore: "€349.00"
    }
  },
  130: {
    prices: {
      gear4music: "£125.00",
      amazon: "$149.99",
      zzounds: "$149.99",
      andertons: "£129.00",
      musicstore: "€150.42"
    }
  },
  131: {
    prices: {
      amazon: "$349.00",
      zzounds: "$349.00",
      andertons: "£239.00",
      gear4music: "£238.00",
      musicstore: "€284.00"
    }
  },
  132: {
    prices: {
      andertons: "£859.00",
      gear4music: "£829.00",
      amazon: "$949.99",
      musicstore: "€884.00"
    }
  },
  133: {
    prices: {
      amazon: "$109.99",
      zzounds: "$109.99",
      andertons: "£109.99",
      gear4music: "£99.10",
      musicstore: "€104.00"
    }
  },
  134: {
    prices: {
      amazon: "$88.00",
      zzounds: "$119.99",
      andertons: "£85.00",
      gear4music: "£79.00",
      musicstore: "€95.00"
    }
  },
  135: {
    prices: {
      amazon: "$679.00",
      zzounds: "$679.00",
      andertons: "£679.00",
      gear4music: "£679.00",
      musicstore: "€699.00"
    }
  },
  136: {
    prices: {
      amazon: "$108.57",
      zzounds: "$115.99",
      andertons: "£119.99",
      gear4music: "£119.00",
      musicstore: "€139.00"
    }
  },
  137: {
    prices: {
      amazon: "$250.74",
      zzounds: "$325.00",
      andertons: "£225.00",
      gear4music: "£225.50",
      musicstore: "€279.00"
    }
  },
  138: {
    prices: {
      amazon: "$1,398.00",
      andertons: "£991.00",
      gear4music: "£1,037.00",
      musicstore: "€1,298.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/productreview--BEHX32COMPACT"
    },
    oos: [
      "zzounds"
    ]
  },
  139: {
    prices: {
      gear4music: "£3,050.00",
      amazon: "$3,999.00",
      andertons: "£2,599.00",
      musicstore: "€2,990.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--AAHSQ5"
    },
    oos: [
      "zzounds"
    ]
  },
  140: {
    prices: {
      amazon: "$749.99",
      zzounds: "$769.99",
      andertons: "£496.00",
      gear4music: "£489.00",
      musicstore: "€599.00"
    }
  },
  141: {
    prices: {
      amazon: "$649.99",
      andertons: "£584.00",
      gear4music: "£584.00",
      musicstore: "€619.00",
      zzounds: "$699.99"
    }
  },
  142: {
    prices: {
      amazon: "$684.39",
      zzounds: "$699.99",
      andertons: "£489.00",
      gear4music: "£489.00",
      musicstore: "€611.00"
    }
  },
  143: {
    prices: {
      amazon: "$1,899.00",
      zzounds: "$1,899.00",
      andertons: "£1,469.00",
      gear4music: "£1,594.00",
      musicstore: "€1,679.00"
    }
  },
  144: {
    prices: {
      gear4music: "£286.00",
      amazon: "$299.99",
      andertons: "£249.00",
      zzounds: "$299.00",
      musicstore: "€299.00"
    }
  },
  145: {
    prices: {
      amazon: "$509.00",
      andertons: "£315.00",
      gear4music: "£315.00",
      musicstore: "€369.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/productreview--BEHXR18"
    },
    oos: [
      "zzounds"
    ]
  },
  146: {
    prices: {
      amazon: "$380.00",
      zzounds: "$379.99",
      andertons: "£281.00",
      gear4music: "£291.50",
      musicstore: "€349.00"
    }
  },
  147: {
    prices: {
      amazon: "$1,099.99",
      zzounds: "$1,199.99",
      andertons: "£829.00",
      gear4music: "£819.00",
      musicstore: "€1,059.00"
    }
  },
  148: {
    prices: {
      gear4music: "£2,009.00",
      amazon: "$2,499.00",
      andertons: "£1,452.00",
      musicstore: "€2,099.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--MIDM32RLIVE"
    },
    oos: [
      "zzounds"
    ]
  },
  149: {
    prices: {
      gear4music: "£504.00",
      amazon: "$675.00",
      zzounds: "$573.74",
      andertons: "£504.00",
      musicstore: "€599.00"
    }
  },
  150: {
    prices: {
      gear4music: "£188.50",
      amazon: "$268.00",
      andertons: "£169.00",
      musicstore: "€195.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--BEHX1222USB"
    },
    oos: [
      "zzounds"
    ]
  },
  151: {
    prices: {
      gear4music: "£407.00",
      amazon: "$374.99",
      musicstore: "€335.29"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--MACTHUMP215XT"
    },
    oos: [
      "andertons",
      "zzounds"
    ]
  },
  152: {
    prices: {
      amazon: "$1,232.49",
      zzounds: "$1,450.00",
      andertons: "£975.00",
      gear4music: "£975.00",
      musicstore: "€1,299.00"
    }
  },
  153: {
    prices: {
      amazon: "$399.00",
      zzounds: "$399.00",
      andertons: "£295.00",
      gear4music: "£322.00",
      musicstore: "€489.00"
    }
  },
  154: {
    prices: {
      amazon: "$390.99",
      andertons: "£394.00",
      gear4music: "£394.00",
      musicstore: "€366.47"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--YAMDBR12"
    },
    oos: [
      "zzounds"
    ]
  },
  155: {
    prices: {
      amazon: "$1,689.99",
      zzounds: "$1,889.99",
      gear4music: "£1,879.00"
    },
    oos: [
      "andertons"
    ]
  },
  156: {
    prices: {
      amazon: "$1,739.99",
      zzounds: "$1,939.99",
      andertons: "£1,599.00",
      musicstore: "€1,799.00",
      gear4music: "£1,849.00"
    }
  },
  157: {
    prices: {
      amazon: "$529.99",
      andertons: "£399.00",
      gear4music: "£419.00",
      musicstore: "€488.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--SQU0303075"
    },
    oos: [
      "zzounds"
    ]
  },
  158: {
    prices: {
      amazon: "$351.49",
      andertons: "£249.00",
      gear4music: "£251.50",
      musicstore: "€299.00",
      zzounds: "$369.99"
    }
  },
  159: {
    prices: {
      amazon: "$419.99",
      zzounds: "$450.00",
      andertons: "£399.00",
      gear4music: "£397.00",
      musicstore: "€439.00"
    }
  },
  160: {
    prices: {
      amazon: "$379.99",
      zzounds: "$379.99",
      andertons: "£349.00",
      gear4music: "£296.00",
      musicstore: "€369.00"
    }
  },
  161: {
    prices: {
      amazon: "$399.99",
      zzounds: "$399.99",
      andertons: "£399.00",
      gear4music: "£399.00",
      musicstore: "€539.00"
    }
  },
  162: {
    prices: {
      andertons: "£749.00",
      gear4music: "£707.00",
      musicstore: "€756.00"
    }
  },
  163: {
    prices: {
      amazon: "$599.00",
      zzounds: "$599.00",
      andertons: "£349.00",
      gear4music: "£419.00"
    }
  },
  164: {
    prices: {
      amazon: "$649.00",
      zzounds: "$649.00",
      andertons: "£599.00",
      gear4music: "£599.00"
    },
    oos: [
      "musicstore"
    ]
  },
  165: {
    prices: {
      zzounds: "$649.00",
      gear4music: "£579.00",
      amazon: "$599.00",
      musicstore: "€699.00"
    },
    oos: [
      "andertons"
    ]
  },
  166: {
    prices: {
      andertons: "£319.00",
      gear4music: "£349.00",
      amazon: "$399.00",
      musicstore: "€369.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--HOFIVB"
    },
    oos: [
      "zzounds"
    ]
  },
  167: {
    prices: {
      amazon: "$53.95",
      zzounds: "$65.95",
      gear4music: "£44.99",
      musicstore: "€45.00",
      andertons: "£41.00"
    },
    urls: {
      andertons: "https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2Fmogami-2534-quad-neglex-3m-xlrf-xlrm-mic-cable-neutrik-black-gold-xlr%2F"
    }
  },
  170: {
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/G4M-Acoustics-Squarewave-4-Pack/5KYU"
    },
    oos: [
      "gear4music",
      "zzounds"
    ]
  },
  173: {
    prices: {
      gear4music: "£17.99",
      amazon: "$23.00",
      musicstore: "€17.90"
    },
    oos: [
      "andertons"
    ]
  },
  174: {
    prices: {
      amazon: "$3,599.99",
      zzounds: "$3,599.99",
      gear4music: "£3,699.99",
      andertons: "£2,999.00",
      musicstore: "€3,399.00"
    }
  },
  175: {
    prices: {
      gear4music: "£4,337.00",
      amazon: "$4,399.99",
      zzounds: "$4,399.99",
      andertons: "£3,899.00",
      musicstore: "€4,679.00"
    }
  },
  176: {
    prices: {
      amazon: "$3,299.00",
      zzounds: "$3,499.00",
      andertons: "£2,778.00",
      gear4music: "£2,850.00",
      musicstore: "€3,149.00"
    }
  },
  177: {
    prices: {
      amazon: "$2,995.00",
      gear4music: "£2,899.00"
    },
    oos: [
      "andertons",
      "musicstore"
    ]
  },
  178: {
    prices: {
      amazon: "$1,199.00",
      gear4music: "£1,159.00",
      musicstore: "€1,244.00"
    },
    oos: [
      "andertons"
    ]
  },
  180: {
    prices: {
      amazon: "$3,999.99",
      gear4music: "£2,954.00",
      musicstore: "€3,389.00"
    },
    oos: [
      "andertons"
    ]
  },
  181: {
    prices: {
      amazon: "$4,199.00",
      gear4music: "£3,120.00",
      musicstore: "€3,585.00"
    },
    oos: [
      "andertons"
    ]
  },
  182: {
    prices: {
      amazon: "$4,999.00",
      zzounds: "$3,999.00",
      andertons: "£3,821.00",
      gear4music: "£4,255.00",
      musicstore: "€3,640.00"
    },
    urls: {
      musicstore: "https://www.musicstore.com/en_OE/EUR/Universal-Audio-Apollo-x16-with-UAD-Analog-Classics/art-PCM0018211-000"
    }
  },
  183: {
    prices: {
      amazon: "$3,199.00",
      zzounds: "$3,199.00",
      andertons: "£2,434.00",
      gear4music: "£2,213.00",
      musicstore: "€2,899.00"
    }
  },
  185: {
    prices: {
      amazon: "$2,299.99",
      zzounds: "$2,299.99",
      andertons: "£2,199.00",
      gear4music: "£2,165.00",
      musicstore: "€2,349.00"
    }
  },
  186: {
    prices: {
      gear4music: "£2,599.00",
      amazon: "$2,749.00",
      zzounds: "$2,549.00",
      andertons: "£2,599.00",
      musicstore: "€2,015.97"
    }
  },
  187: {
    prices: {
      gear4music: "£2,599.00",
      amazon: "$3,499.00",
      zzounds: "$3,499.00",
      andertons: "£2,566.00",
      musicstore: "€3,079.00"
    }
  },
  188: {
    prices: {
      amazon: "$1,699.00",
      zzounds: "$1,699.00",
      andertons: "£1,399.00",
      gear4music: "£1,399.00",
      musicstore: "€1,599.00"
    },
    urls: {
      musicstore: "https://www.musicstore.com/en_OE/EUR/AKAI-Professional-MPC-Live-III/art-SYN0009363-000"
    }
  },
  191: {
    prices: {
      gear4music: "£363.00",
      amazon: "$479.00",
      zzounds: "$479.00",
      musicstore: "€379.00"
    },
    oos: [
      "andertons"
    ]
  },
  192: {
    prices: {
      amazon: "$424.99",
      zzounds: "$499.00",
      andertons: "£449.00",
      gear4music: "£449.00",
      musicstore: "€525.00"
    }
  },
  193: {
    prices: {
      gear4music: "£374.00",
      amazon: "$499.99",
      zzounds: "$499.99",
      andertons: "£349.00",
      musicstore: "€399.00"
    }
  },
  194: {
    prices: {
      amazon: "$199.00",
      zzounds: "$299.00",
      andertons: "£272.00",
      gear4music: "£273.50",
      musicstore: "€309.00"
    }
  },
  195: {
    prices: {
      amazon: "$119.99"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Elgato-WAVE3-Microphone/43BD"
    },
    oos: [
      "andertons",
      "gear4music"
    ]
  },
  196: {
    prices: {
      amazon: "$99.00",
      zzounds: "$119.00",
      andertons: "£79.00",
      gear4music: "£82.60",
      musicstore: "€98.00"
    }
  },
  197: {
    prices: {
      amazon: "$99.00",
      zzounds: "$86.00",
      andertons: "£86.00",
      gear4music: "£61.00",
      musicstore: "€75.00"
    }
  },
  198: {
    prices: {
      gear4music: "£106.50",
      amazon: "$79.00",
      zzounds: "$109.00",
      andertons: "£97.00",
      musicstore: "€119.00"
    }
  },
  199: {
    prices: {
      gear4music: "£319.00",
      amazon: "$399.00",
      zzounds: "$499.00",
      andertons: "£299.00",
      musicstore: "€389.00"
    }
  },
  200: {
    prices: {
      amazon: "$204.99",
      zzounds: "$219.99",
      andertons: "£219.00",
      gear4music: "£196.00",
      musicstore: "€229.00"
    }
  },
  201: {
    prices: {
      amazon: "$83.90",
      andertons: "£58.00",
      gear4music: "£58.00",
      musicstore: "€66.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--TCEDITTO"
    },
    oos: [
      "zzounds"
    ]
  },
  202: {
    prices: {
      amazon: "$599.99",
      zzounds: "$599.99",
      andertons: "£499.00",
      gear4music: "£526.00",
      musicstore: "€599.00"
    }
  },
  203: {
    prices: {
      amazon: "$228.50",
      zzounds: "$229.99",
      gear4music: "£199.00",
      musicstore: "€259.00",
      andertons: "£219.00"
    }
  },
  204: {
    prices: {
      gear4music: "£284.00",
      amazon: "$349.99",
      zzounds: "$384.99",
      andertons: "£309.00",
      musicstore: "€295.00"
    }
  },
  205: {
    prices: {
      gear4music: "£419.00",
      amazon: "$449.00",
      zzounds: "$499.00",
      andertons: "£439.00",
      musicstore: "€495.00"
    }
  },
  206: {
    prices: {
      amazon: "$1,599.00",
      zzounds: "$1,599.00",
      andertons: "£1,399.00",
      gear4music: "£1,399.00",
      musicstore: "€1,799.00"
    }
  },
  207: {
    prices: {
      amazon: "$1,762.00",
      andertons: "£1,069.00",
      gear4music: "£1,099.00",
      musicstore: "€1,279.00"
    }
  },
  208: {
    prices: {
      amazon: "$849.00",
      zzounds: "$899.00",
      andertons: "£709.00",
      gear4music: "£709.28",
      musicstore: "€729.00"
    }
  },
  209: {
    prices: {
      amazon: "$1,399.00",
      andertons: "£879.00",
      musicstore: "€1,199.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Austrian-Audio-OC818-Studio-Set-Black/4PIK",
      zzounds: "https://www.zzounds.com/a--925521/item--AAUOC818STUDSET"
    },
    oos: [
      "zzounds",
      "gear4music"
    ]
  },
  210: {
    prices: {
      amazon: "$219.00",
      zzounds: "$219.00",
      andertons: "£149.00",
      gear4music: "£149.50",
      musicstore: "€149.00"
    }
  },
  211: {
    prices: {
      gear4music: "£372.00",
      amazon: "$399.00",
      zzounds: "$499.99",
      andertons: "£372.00",
      musicstore: "€349.00"
    }
  },
  212: {
    prices: {
      gear4music: "£196.00",
      amazon: "$219.00",
      zzounds: "$219.00",
      andertons: "£193.00",
      musicstore: "€209.00"
    }
  },
  213: {
    prices: {
      amazon: "$199.00",
      zzounds: "$199.00",
      andertons: "£179.00",
      gear4music: "£185.50",
      musicstore: "€219.00"
    }
  },
  214: {
    prices: {
      zzounds: "$159.00",
      andertons: "£112.00",
      gear4music: "£111.00",
      musicstore: "€139.00"
    }
  },
  215: {
    prices: {
      gear4music: "£532.00",
      amazon: "$660.00",
      andertons: "£405.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--DPAVO4099D"
    },
    oos: [
      "zzounds"
    ]
  },
  216: {
    prices: {
      gear4music: "£1,016.00",
      amazon: "$1,699.00",
      andertons: "£899.00",
      musicstore: "€1,249.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--RCFNX912SMA"
    },
    oos: [
      "zzounds"
    ]
  },
  217: {
    prices: {
      gear4music: "£918.00",
      amazon: "$949.00",
      zzounds: "$949.00",
      andertons: "£787.00",
      musicstore: "€929.00"
    }
  },
  218: {
    prices: {
      amazon: "$669.99",
      zzounds: "$670.00",
      andertons: "£463.00",
      gear4music: "£463.00",
      musicstore: "€586.00"
    }
  },
  219: {
    prices: {
      gear4music: "£568.00",
      amazon: "$696.99",
      zzounds: "$845.00",
      andertons: "£555.00",
      musicstore: "€749.00"
    }
  },
  220: {
    prices: {
      gear4music: "£666.63",
      zzounds: "$949.00",
      amazon: "$949.00",
      musicstore: "€646.22",
      andertons: "£699.00"
    }
  },
  221: {
    prices: {
      amazon: "$2,100.00",
      musicstore: "€1,847.90"
    },
    oos: [
      "andertons"
    ]
  },
  222: {},
  223: {
    prices: {
      gear4music: "£2,149.99",
      amazon: "$3,499.00",
      musicstore: "€2,629.00"
    },
    oos: [
      "andertons"
    ]
  },
  224: {
    prices: {
      gear4music: "£1,786.00",
      amazon: "$2,299.00",
      zzounds: "$2,299.00",
      musicstore: "€1,998.00",
      andertons: "£1,675.00"
    }
  },
226: {
    prices: {
      amazon: "$179.00",
      zzounds: "$179.00",
      andertons: "£163.00",
      musicstore: "€175.00",
      gear4music: "£163.50"
    }
  },
227: {
    prices: {
      gear4music: "£153.50",
      amazon: "$199.95",
      zzounds: "$199.95",
      andertons: "£148.00",
      musicstore: "€179.00"
    }
  },
228: {
    prices: {
      gear4music: "£148.25",
      amazon: "$214.00",
      zzounds: "$219.00",
      andertons: "£149.00",
      musicstore: "€153.00"
    }
  },
229: {
    prices: {
      gear4music: "£249.00",
      amazon: "$249.00",
      zzounds: "$249.00",
      andertons: "£249.00",
      musicstore: "€315.00"
    }
  },
230: {
    prices: {
      gear4music: "£75.00",
      amazon: "$131.60",
      zzounds: "$139.00",
      andertons: "£99.00",
      musicstore: "€89.00"
    }
  },
231: {
    prices: {
      amazon: "$259.00",
      andertons: "£236.00",
      gear4music: "£236.50",
      musicstore: "€225.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--AUDOM7"
    },
    oos: [
      "zzounds"
    ]
  },
232: {
    prices: {
      amazon: "$169.00",
      zzounds: "$169.00",
      andertons: "£129.00",
      gear4music: "£139.00",
      musicstore: "€189.00"
    }
  },
  233: {
    prices: {
      amazon: "$2,199.99",
      zzounds: "$2,199.99",
      andertons: "£1,599.00",
      gear4music: "£1,770.00",
      musicstore: "€1,931.93"
    }
  },
  234: {
    prices: {
      amazon: "$3,499.00",
      zzounds: "$3,849.00",
      andertons: "£2,549.00",
      musicstore: "€2,898.00"
    },
    urls: {
      musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FRCF-SUB-8004-AS-18-%2Fart-PAH0014398-000"
    },
    oos: [
      "gear4music"
    ]
  },
  235: {
    prices: {
      amazon: "$999.00",
      zzounds: "$1,099.00",
      andertons: "£803.00",
      gear4music: "£848.00",
      musicstore: "€1,100.00"
    }
  },
  236: {
    prices: {
      gear4music: "£1,139.00",
      amazon: "$1,349.00",
      zzounds: "$1,499.00",
      andertons: "£1,149.00",
      musicstore: "€1,399.00"
    }
  },
  237: {
    prices: {
      gear4music: "£1,452.00",
      amazon: "$1,739.99",
      andertons: "£1,452.00",
      musicstore: "€1,999.00"
    }
  },
  238: {
    prices: {
      pluginboutique: "€102.85",
      gear4music: "£39.00",
      amazon: "$99.00",
      musicstore: "€83.19"
    },
    pbCur: {
      us: "$99.00",
      uk: "£78.79"
    },
    oos: [
      "andertons"
    ]
  },
  239: {
    prices: {
      amazon: "$438.50",
      zzounds: "$488.00",
      andertons: "£386.00",
      gear4music: "£366.00",
      musicstore: "€385.00"
    }
  },
  240: {
    prices: {
      gear4music: "£358.00",
      amazon: "$499.99",
      zzounds: "$459.99",
      musicstore: "€269.00"
    },
    oos: [
      "andertons"
    ]
  },
  243: {
    prices: {
      amazon: "$159.99",
      musicstore: "€199.00"
    },
    oos: [
      "andertons"
    ]
  },
  244: {
    prices: {
      gear4music: "£239.50",
      amazon: "$249.00",
      zzounds: "$229.00",
      musicstore: "€293.28"
    },
    oos: [
      "andertons"
    ]
  },
  246: {
    prices: {
      amazon: "$169.99"
    },
    oos: [
      "andertons"
    ]
  },
  247: {
    prices: {
      gear4music: "£699.00",
      amazon: "$799.99",
      zzounds: "$799.99",
      andertons: "£521.00",
      musicstore: "€649.00"
    }
  },
  248: {
    prices: {
      amazon: "$529.00",
      zzounds: "$595.00",
      andertons: "£519.00",
      gear4music: "£519.00",
      musicstore: "€635.00"
    }
  },
  249: {
    prices: {
      amazon: "$219.00",
      musicstore: "€259.00"
    }
  },
  250: {
    prices: {
      gear4music: "£261.50",
      amazon: "$260.00",
      zzounds: "$260.00",
      andertons: "£258.00",
      musicstore: "€335.29"
    }
  },
  251: {
    holly: {
      eu: {
        u: "https://eu.hollyland.com/de-de/products/lark-m2",
        p: "€92.00"
      },
      us: {
        u: "https://store.hollyland.com/products/lark-m2",
        p: "$68.40"
      },
      uk: {
        u: "https://uk.hollyland.com/products/lark-m2",
        p: "£78.00"
      }
    },
    prices: {
      amazon: "$76.00"
    },
    na: [
      "zzounds",
      "reverb",
      "gear4music",
      "andertons",
      "musicstore"
    ]
  },
  252: {
    prices: {
      gear4music: "£165.00",
      amazon: "$173.85",
      zzounds: "$190.00",
      andertons: "£169.00",
      musicstore: "€199.00"
    }
  },
  253: {
    prices: {
      amazon: "$109.99"
    },
    oos: [
      "andertons",
      "musicstore"
    ]
  },
  254: {
    prices: {
      musicstore: "€99.00"
    },
    urls: {
      musicstore: "https://www.musicstore.com/en_OE/EUR/DJI-Mic-Mini-2-2-TX-1-RX-Charging-Case-/art-REC0017234-000"
    }
  },
  255: {
    prices: {
      amazon: "$449.99",
      zzounds: "$519.99",
      andertons: "£452.00",
      gear4music: "£549",
      musicstore: "€419.33"
    }
  },
  256: {
    prices: {
      amazon: "$799.00",
      zzounds: "$799.00",
      andertons: "£719.00",
      gear4music: "£829",
      musicstore: "€849.00"
    }
  },
  257: {
    prices: {
      gear4music: "£339.00",
      amazon: "$399.00",
      zzounds: "$399.00",
      andertons: "£329.00",
      musicstore: "€461.34"
    }
  },
  258: {
    prices: {
      gear4music: "£249.99",
      amazon: "$249.99",
      zzounds: "$199.99",
      andertons: "£249.00",
      musicstore: "€269.00"
    }
  },
  259: {
    prices: {
      gear4music: "£399.00",
      amazon: "$499.99",
      zzounds: "$599.99",
      andertons: "£399.00",
      musicstore: "€498.00"
    }
  },
  260: {
    prices: {
      amazon: "$349.99"
    },
    oos: [
      "andertons"
    ]
  },
  261: {
    prices: {
      amazon: "$229.00"
    },
    oos: [
      "andertons"
    ]
  },
  262: {
    prices: {
      amazon: "$129.99",
      zzounds: "$179.00",
      andertons: "£91.00",
      gear4music: "£94.00",
      musicstore: "€115.00"
    }
  },
  263: {
    prices: {
      amazon: "$299.00",
      zzounds: "$299.00",
      andertons: "£225.00",
      gear4music: "£234.00",
      musicstore: "€234.45"
    }
  },
  264: {
    prices: {
      gear4music: "£329.99",
      amazon: "$349.99"
    },
    oos: [
      "andertons"
    ]
  },
  265: {
    prices: {
      amazon: "$149.90"
    },
    oos: [
      "andertons"
    ]
  },
  266: {
    prices: {
      gear4music: "£1,180.00",
      amazon: "$1,749.00",
      zzounds: "$1,749.00",
      andertons: "£1,180.00",
      musicstore: "€1,398.00"
    }
  },
  267: {
    prices: {
      amazon: "$419.99",
      zzounds: "$989.00",
      andertons: "£859.00",
      gear4music: "£875.00",
      musicstore: "€959.00"
    }
  },
  268: {
    prices: {
      amazon: "$1,699.95"
    },
    oos: [
      "andertons"
    ]
  },
  269: {
    prices: {
      amazon: "$989.00",
      zzounds: "$999.00",
      andertons: "£866.00",
      gear4music: "£902.00",
      musicstore: "€1,049.00"
    }
  },
  270: {
    prices: {
      amazon: "$219.99"
    },
    oos: [
      "andertons",
      "musicstore"
    ]
  },
  271: {
    prices: {
      amazon: "$499.00",
      andertons: "£449.00",
      gear4music: "£425.00",
      musicstore: "€485.00",
      zzounds: "$499.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--TAYGSMINISV2"
    }
  },
  272: {
    prices: {
      amazon: "$879.99",
      andertons: "£699.00",
      gear4music: "£749.00",
      musicstore: "€789.00"
    }
  },
  273: {
    prices: {
      amazon: "$879.99",
      andertons: "£699.00",
      gear4music: "£706.00",
      musicstore: "€799.00"
    }
  },
  274: {
    prices: {
      gear4music: "£309.00",
      amazon: "$239.99",
      musicstore: "€335.29"
    },
    oos: [
      "andertons"
    ]
  },
  275: {
    prices: {
      gear4music: "£349.00",
      amazon: "$329.99",
      musicstore: "€399.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--TRAULNY"
    },
    oos: [
      "andertons",
      "zzounds"
    ]
  },
  276: {
    prices: {
      gear4music: "£95.00",
      amazon: "$69.99",
      zzounds: "$99.99",
      musicstore: "€98.00"
    },
    oos: [
      "andertons"
    ]
  },
  277: {
    prices: {
      amazon: "$69.99"
    },
    oos: [
      "andertons"
    ]
  },
  278: {
    prices: {
      amazon: "$67.99"
    },
    oos: [
      "andertons"
    ]
  },
  279: {
    prices: {
      amazon: "$54.99"
    },
    oos: [
      "andertons"
    ]
  },
  280: {
    prices: {
      amazon: "$41.00",
      zzounds: "$39.99",
      gear4music: "£36.00",
      musicstore: "€32.77"
    },
    oos: [
      "andertons"
    ]
  },
  281: {
    prices: {
      amazon: "$45.00",
      zzounds: "$44.99",
      gear4music: "£39.00",
      musicstore: "€35.29"
    },
    oos: [
      "andertons"
    ]
  },
  284: {
    prices: {
      amazon: "$30.00"
    },
    oos: [
      "andertons"
    ]
  },
  286: {
    prices: {
      gear4music: "£135.50",
      amazon: "$159.00",
      andertons: "£129.00",
      musicstore: "€145.00",
      zzounds: "$159.00"
    }
  },
  287: {
    prices: {
      amazon: "$19.99",
      zzounds: "$19.99",
      gear4music: "£17.00",
      musicstore: "€15.97"
    },
    oos: [
      "andertons"
    ]
  },
  289: {
    prices: {
      amazon: "$32.99"
    },
    oos: [
      "andertons"
    ]
  },
  290: {
    prices: {
      gear4music: "£99.99",
      amazon: "$149.00",
      zzounds: "$109.00"
    },
    oos: [
      "andertons"
    ]
  },
  291: {
    prices: {
      gear4music: "£149.00",
      amazon: "$168.00",
      zzounds: "$169.00",
      andertons: "£149.00",
      musicstore: "€167.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Audio-Technica-AT2020USBX-Cardioid-Condenser-Microphone/528M"
    },
    oos: [
      "gear4music"
    ]
  },
  292: {
    prices: {
      amazon: "$103.00",
      zzounds: "$105.00",
      gear4music: "£84.20",
      andertons: "£85.00",
      musicstore: "€95.00"
    }
  },
  293: {
    prices: {
      gear4music: "£299.00",
      amazon: "$329.99",
      zzounds: "$369.99",
      andertons: "£299.00",
      musicstore: "€320.00"
    }
  },
  294: {
    prices: {
      gear4music: "£279.00",
      amazon: "$279.00",
      zzounds: "$349.00",
      musicstore: "€377.31",
      andertons: "£269.00"
    }
  },
  295: {
    prices: {
      amazon: "$295.99"
    },
    oos: [
      "andertons"
    ]
  },
  296: {
    prices: {
      amazon: "$699.00",
      andertons: "£799.00"
    }
  },
  297: {
    prices: {
      amazon: "$154.00",
      zzounds: "$159.00",
      andertons: "£119.99",
      gear4music: "£119.99",
      musicstore: "€128.00"
    }
  },
  298: {
    prices: {
      amazon: "$159.00",
      zzounds: "$159.00",
      andertons: "£159.00",
      musicstore: "€179.00",
      gear4music: "£166.00"
    }
  },
  299: {
    prices: {
      gear4music: "£104.99",
      amazon: "$198.00",
      zzounds: "$199.00",
      andertons: "£159.00",
      musicstore: "€143.00"
    }
  },
  300: {
    prices: {
      andertons: "£499.00",
      amazon: "$599.00",
      zzounds: "$599.00",
      musicstore: "€599.00",
      gear4music: "£499.00"
    }
  },
  301: {
    prices: {
      zzounds: "$599.99",
      andertons: "£629.00",
      gear4music: "£629.00",
      musicstore: "€699.00",
      amazon: "$599.99"
    }
  },
  302: {
    prices: {
      gear4music: "£499.00",
      amazon: "$599.99",
      zzounds: "$299.99",
      andertons: "£249.00",
      musicstore: "€489.00"
    }
  },
  303: {
    prices: {
      gear4music: "£277.00",
      amazon: "$395.00",
      andertons: "£288.00",
      musicstore: "€299.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--GEN8010APM"
    },
    oos: [
      "zzounds"
    ]
  },
  304: {
    prices: {
      andertons: "£449.00",
      gear4music: "£499.00",
      amazon: "$599.00",
      musicstore: "€649.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--KAAINUNF"
    },
    oos: [
      "zzounds"
    ]
  },
  305: {
    prices: {
      gear4music: "£504.42",
      amazon: "$593.75",
      zzounds: "$599.00",
      andertons: "£499.00",
      musicstore: "€469.00"
    }
  },
  306: {
    prices: {
      gear4music: "£267.50",
      amazon: "$289.99",
      zzounds: "$349.99",
      andertons: "£260.00",
      musicstore: "€251.26"
    }
  },
  307: {
    prices: {
      amazon: "$349.00",
      zzounds: "$349.00",
      andertons: "£276.99",
      gear4music: "£259.00",
      musicstore: "€349.00"
    }
  },
  308: {
    prices: {
      gear4music: "£650.00",
      amazon: "$799.99",
      zzounds: "$799.99",
      andertons: "£609.00",
      musicstore: "€399.00"
    }
  },
  309: {
    prices: {
      amazon: "$139.99"
    },
    oos: [
      "andertons"
    ]
  },
  310: {
    prices: {
      amazon: "$319.99",
      zzounds: "$319.99",
      gear4music: "£229.00",
      musicstore: "€269.00",
      andertons: "£239.00"
    }
  },
  311: {
    prices: {
      amazon: "$499.99",
      zzounds: "$499.99",
      gear4music: "£379.00",
      musicstore: "€455.00",
      andertons: "£399.00"
    }
  },
  312: {
    prices: {
      amazon: "$949.00",
      zzounds: "$949.00",
      andertons: "£799.00",
      gear4music: "£829.00",
      musicstore: "€699.00"
    }
  },
  313: {
    prices: {
      gear4music: "£145.00",
      amazon: "$249.99",
      zzounds: "$249.99",
      andertons: "£139.00",
      musicstore: "€179.00"
    }
  },
  314: {
    prices: {
      gear4music: "£398.00",
      amazon: "$419.99",
      andertons: "£399.00",
      musicstore: "€399.00"
    }
  },
  315: {
    prices: {
      gear4music: "£295.00",
      amazon: "$259.99",
      zzounds: "$279.99",
      andertons: "£299.00",
      musicstore: "€329.00"
    }
  },
  316: {
    prices: {
      amazon: "$449.99",
      zzounds: "$449.99",
      andertons: "£449.00",
      musicstore: "€499.00",
      gear4music: "£419.00"
    }
  },
  317: {
    prices: {
      zzounds: "$1,149.00",
      andertons: "£999.00"
    },
    oos: [
      "gear4music"
    ]
  },
  318: {
    prices: {
      gear4music: "£1,690.00",
      amazon: "$2,199.99",
      zzounds: "$2,199.99",
      andertons: "£1,699.00",
      musicstore: "€2,099.00"
    }
  },
  319: {
    prices: {
      amazon: "$2,275.00",
      zzounds: "$2,629.00",
      andertons: "£2,699.00",
      musicstore: "€2,499.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/ESP-E-II-Eclipse-Tobacco-Sunburst/273H",
      andertons: "https://www.andertons.co.uk/esp-e-ii-eclipse-db-gransp-granite-sparkle/"
    },
    oos: [
      "andertons"
    ]
  },
  321: {
    prices: {
      gear4music: "£511.00",
      amazon: "$549.00",
      zzounds: "$549.00",
      andertons: "£508.00",
      musicstore: "€522.00"
    }
  },
  323: {
    prices: {
      amazon: "$99.00",
      zzounds: "$99.99",
      andertons: "£91.00",
      gear4music: "£91.30",
      musicstore: "€99.00"
    }
  },
  324: {
    prices: {
      amazon: "$129.99",
      zzounds: "$129.99",
      andertons: "£99.00",
      gear4music: "£102.00",
      musicstore: "€99.00"
    }
  },
  325: {
    prices: {
      gear4music: "£380.00",
      amazon: "$549.00",
      zzounds: "$549.00",
      musicstore: "€503.36",
      andertons: "£379.00"
    }
  },
  326: {
    prices: {
      gear4music: "£399.00",
      andertons: "£399.00",
      zzounds: "$599.00"
    }
  },
  327: {
    prices: {
      amazon: "$109.97"
    },
    oos: [
      "andertons",
      "musicstore"
    ]
  },
  328: {
    prices: {
      gear4music: "£139.99",
      amazon: "$219.00",
      zzounds: "$219.00",
      andertons: "£152.00",
      musicstore: "€199.16"
    }
  },
  329: {
    prices: {
      amazon: "$199.00",
      zzounds: "$218.00",
      andertons: "£164.00",
      gear4music: "£164.00"
    },
    oos: [
      "musicstore"
    ]
  },
  330: {
    prices: {
      gear4music: "£16.80",
      amazon: "$20.99",
      andertons: "£16.00",
      musicstore: "€22.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--BEHXM8500"
    },
    oos: [
      "zzounds"
    ]
  },
  331: {
    prices: {
      andertons: "£3,579.00",
      musicstore: "€3,669.00"
    }
  },
  332: {
    prices: {
      gear4music: "£540.00",
      amazon: "$599.00",
      zzounds: "$599.00",
      andertons: "£525.00",
      musicstore: "€472.44"
    }
  },
  333: {
    prices: {
      gear4music: "£246.00",
      amazon: "$459.99",
      zzounds: "$460.00",
      andertons: "£246.00",
      musicstore: "€359.00"
    }
  },
  334: {
    prices: {
      gear4music: "£1,708.00",
      amazon: "$3,299.99",
      zzounds: "$3,299.99",
      andertons: "£1,499.00",
      musicstore: "€2,499.00"
    }
  },
  335: {
    prices: {
      amazon: "$999.99",
      zzounds: "$744.95"
    },
    urls: {
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Korg-Soundlink-MW1608-Hybrid-Mixer/38AJ"
    },
    oos: [
      "musicstore",
      "andertons",
      "gear4music"
    ]
  },
  336: {
    prices: {
      amazon: "$249.99",
      zzounds: "$249.99"
    },
    urls: {
      gear4music: "https://www.gear4music.com/PA-DJ-and-Lighting/Mackie-Mobile-Mix-8-Channel-USB-Mixer/651Y"
    },
    oos: [
      "andertons"
    ]
  },
  337: {
    prices: {
      gear4music: "£1,565.79",
      amazon: "$1,999.00",
      zzounds: "$1,999.00",
      andertons: "£1,565.00",
      musicstore: "€1,489.00"
    }
  },
  338: {
    prices: {
      andertons: "£1,019.00",
      musicstore: "€587.39"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Genelec-7050C-Subwoofer/8M",
      zzounds: "https://www.zzounds.com/a--925521/item--GEN7050CPM"
    },
    oos: [
      "gear4music",
      "zzounds"
    ]
  },
  339: {
    prices: {
      gear4music: "£739.00",
      amazon: "$999.00",
      zzounds: "$999.00",
      andertons: "£739.00",
      musicstore: "€839.34"
    }
  },
  340: {
    prices: {
      amazon: "$485.00",
      zzounds: "$485.00",
      andertons: "£472.00",
      gear4music: "£491.00",
      musicstore: "€478.15"
    }
  },
  341: {
    prices: {
      amazon: "$559.00",
      zzounds: "$641.52",
      gear4music: "£564.00",
      musicstore: "€574.79"
    },
    oos: [
      "andertons"
    ]
  },
  342: {
    prices: {
      amazon: "$329.95",
      zzounds: "$349.00",
      andertons: "£222.00",
      gear4music: "£223.50",
      musicstore: "€221.85"
    }
  },
  343: {
    prices: {
      amazon: "$269.00",
      zzounds: "$269.00",
      musicstore: "€293.28"
    },
    oos: [
      "andertons",
      "gear4music"
    ]
  },
  344: {
    prices: {
      amazon: "$399.00"
    },
    na: [
      "zzounds",
      "reverb",
      "gear4music",
      "andertons",
      "musicstore"
    ]
  },
  345: {
    prices: {
      gear4music: "£191.50",
      amazon: "$239.40",
      zzounds: "$239.40",
      andertons: "£219.00",
      musicstore: "€239.00"
    }
  },
  346: {
    prices: {
      gear4music: "£173.75",
      amazon: "$187.51",
      zzounds: "$219.00",
      musicstore: "€298.00"
    },
    oos: [
      "andertons"
    ]
  },
  347: {
    prices: {
      gear4music: "£180.82",
      zzounds: "$249.99",
      andertons: "£175.00",
      amazon: "$199.99",
      musicstore: "€235.00"
    }
  },
  348: {
    prices: {
      gear4music: "£482.39",
      zzounds: "$478.00",
      andertons: "£433.00",
      amazon: "$479.99"
    }
  },
  349: {
    prices: {
      amazon: "$1,090.00",
      zzounds: "$1,249.00",
      andertons: "£899.00",
      gear4music: "£881.00",
      musicstore: "€949.00"
    }
  },
  350: {
    prices: {
      zzounds: "$228.99",
      amazon: "$228.99"
    },
    oos: [
      "musicstore",
      "andertons"
    ]
  },
  352: {
    prices: {
      gear4music: "£179.00",
      amazon: "$189.00",
      zzounds: "$249.99",
      andertons: "£189.00",
      musicstore: "€158.80"
    }
  },
  353: {
    prices: {
      gear4music: "£499.00",
      amazon: "$529.99",
      musicstore: "€539.00"
    },
    oos: [
      "andertons"
    ]
  },
  354: {
    prices: {
      gear4music: "£499.00",
      andertons: "£379.00",
      amazon: "$599.00",
      musicstore: "€419.33"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--PAUSEP20F"
    },
    oos: [
      "zzounds"
    ]
  },
  355: {
    prices: {
      gear4music: "£339.00",
      musicstore: "€335.29"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B009WU5SV0",
      zzounds: "https://www.zzounds.com/a--925521/item--EPIEE00"
    },
    oos: [
      "amazon",
      "zzounds",
      "andertons"
    ]
  },
  356: {
    prices: {
      gear4music: "£189.00",
      amazon: "$199.99",
      musicstore: "€219.00"
    },
    oos: [
      "andertons"
    ]
  },
  357: {
    prices: {
      gear4music: "£515.00",
      amazon: "$599.99",
      andertons: "£485.00",
      musicstore: "€604.20"
    }
  },
  358: {
    prices: {
      amazon: "$189.00",
      zzounds: "$189.00",
      musicstore: "€124.37"
    },
    oos: [
      "andertons"
    ]
  },
  359: {
    prices: {
      gear4music: "£87.70",
      amazon: "$94.99",
      musicstore: "€82.35"
    },
    oos: [
      "andertons"
    ]
  },
  360: {
    prices: {
      amazon: "$1,499.00",
      zzounds: "$1,499.00",
      musicstore: "€1,368.90"
    },
    oos: [
      "andertons"
    ]
  },
  361: {
    prices: {
      gear4music: "£886.00",
      amazon: "$999.00",
      zzounds: "$999.99",
      andertons: "£829.00",
      musicstore: "€755.46"
    }
  },
  362: {
    prices: {
      amazon: "$649.00",
      zzounds: "$649.00",
      andertons: "£479.00",
      gear4music: "£479.00",
      musicstore: "€599.00"
    }
  },
  363: {
    prices: {
      amazon: "$279.99",
      zzounds: "$279.99",
      gear4music: "£222.00",
      andertons: "£209.00",
      musicstore: "€269.00"
    }
  },
  364: {
    prices: {
      amazon: "$507.99",
      zzounds: "$1,049.99",
      andertons: "£799.00",
      gear4music: "£788.00",
      musicstore: "€798.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/beyerdynamic-M160-Double-Ribbon-Microphone/92T"
    }
  },
  365: {
    prices: {
      amazon: "$477.73",
      zzounds: "$519.00",
      andertons: "£323.00",
      gear4music: "£466.00",
      musicstore: "€436.13"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/sE-Electronics-VR2-Voodoo-Active-Ribbon-Mic/DRQ",
      zzounds: "https://www.zzounds.com/item--SEEVR2"
    }
  },
  366: {
    prices: {
      amazon: "$99.95",
      zzounds: "$99.95"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--MXLR144HE"
    },
    oos: [
      "zzounds",
      "andertons"
    ]
  },
  370: {
    prices: {
      amazon: "$384.99",
      zzounds: "$384.99",
      andertons: "£319.00",
      gear4music: "£315.00",
      musicstore: "€349.00"
    },
    urls: {
      gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FKeyboards-and-Pianos%2FRoland-GOKEYS-3-Music-Creation-Keyboard-Midnight-Blue%2F6AB8",
      zzounds: "https://www.zzounds.com/item--ROLGOKEYS3"
    }
  },
  371: {
    prices: {
      amazon: "$199.99",
      zzounds: "$239.99",
      andertons: "£118.00",
      gear4music: "£125.00",
      musicstore: "€159.00"
    }
  },
  372: {
    prices: {
      amazon: "$795.00",
      andertons: "£517.00",
      gear4music: "£540.00",
      musicstore: "€453.78"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--GEN8030CP"
    },
    oos: [
      "zzounds"
    ]
  },
  374: {
    prices: {
      pluginboutique: "€99.83"
    },
    pbCur: {
      us: "$99.00",
      uk: "£78.79"
    },
    urls: {
      pluginboutique: "https://www.pluginboutique.com/product/2-Effects/53-Multi-Effect-/9819-ShaperBox-3-Bundle",
      amazon: "https://www.amazon.com/dp/B0002E4Z8M/?tag=topmusicg-20"
    },
    na: [
      "andertons",
      "gear4music",
      "musicstore"
    ]
  },
  375: {
    prices: {
      pluginboutique: "€99.83",
      gear4music: "£42.00",
      musicstore: "€49.00",
      amazon: "$99.00"
    },
    pbCur: {
      us: "$99.00",
      uk: "£78.79"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/XLN-Audio-RC-20-Retro-Color/3NGQ",
      pluginboutique: "https://www.pluginboutique.com/product/2-Effects/44-Saturation/3016-RC-20-Retro-Color",
      musicstore: "https://www.musicstore.com/en_OE/EUR/XLN-Audio-RC-20-Retro-Color/art-PCM0018798-000",
      amazon: "https://www.amazon.com/XLN-Audio-RC-20-Retro-Color/dp/B08JSYBDY1"
    }
  },
  376: {
    prices: {
      pluginboutique: "€10.08"
    },
    pbCur: {
      us: "$12.00",
      uk: "£9.55"
    },
    urls: {
      pluginboutique: "https://www.pluginboutique.com/product/2-Effects/53-Multi-Effect-/3952-HalfTime",
      amazon: "https://www.amazon.com/dp/B0002E4Z8M/?tag=topmusicg-20"
    },
    na: [
      "andertons",
      "gear4music",
      "musicstore"
    ]
  },
  377: {
    prices: {
      pluginboutique: "€120.00",
      gear4music: "£111.00",
      andertons: "£99.00",
      musicstore: "€129.00",
      amazon: "$129.00"
    },
    pbCur: {
      us: "$129.00",
      uk: "£102.67"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Baby-Audio-Transit-2/6RY2",
      andertons: "https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2Fbaby-audio-transit-2-motion-effects-plugin%2F",
      pluginboutique: "https://www.pluginboutique.com/product/2-Effects/53-Multi-Effect-/13431-Transit-2",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Baby-Audio-Transit-2-License-Code/art-PCM0018531-000",
      amazon: "https://www.amazon.com/Baby-Audio-Transit-2-Plugin/dp/B0DCJ5LPZL"
    }
  },
  378: {
    prices: {
      pluginboutique: "€99.83",
      andertons: "£82.80",
      gear4music: "£82.80"
    },
    pbCur: {
      us: "$89.00",
      uk: "£70.84"
    },
  },
  379: {
    prices: {
      pluginboutique: "€42.35"
    },
    pbCur: {
      us: "$175.00",
      uk: "£139.28"
    },
  },
  380: {
    prices: {
      pluginboutique: "€120.99"
    },
    pbCur: {
      us: "$129.99",
      uk: "£103.46"
    },
    urls: {
      pluginboutique: "https://www.pluginboutique.com/product/2-Effects/53-Multi-Effect-/7627-Infiltrator-2",
      amazon: "https://www.amazon.com/dp/B0002E4Z8M/?tag=topmusicg-20"
    },
    na: [
      "andertons",
      "gear4music",
      "musicstore"
    ]
  },
  381: {
    prices: {
      pluginboutique: "€331.75",
      gear4music: "£231.00",
      andertons: "£252.00",
      musicstore: "€242.90",
      amazon: "$299"
    },
    pbCur: {
      us: "$299.00",
      uk: "£237.97"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/iZotope-Neutron-5-Advanced/6U5K",
      andertons: "https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2Fizotope-neutron-5-standard--esd%2F",
      pluginboutique: "https://www.pluginboutique.com/product/2-Effects/21-Channel-Strip/13502-Neutron-5",
      musicstore: "https://www.musicstore.com/en_OE/EUR/iZotope-Neutron-5-License-Code/art-PCM0018250-000",
      amazon: "https://www.amazon.com/dp/B0002E4Z8M/?tag=topmusicg-20"
    }
  },
  382: {
    prices: {
      pluginboutique: "€99.83",
      amazon: "$99.00"
    },
    pbCur: {
      us: "$99.00",
      uk: "£78.79"
    },
    urls: {
      pluginboutique: "https://www.pluginboutique.com/product/3-Studio-Tools/93-Music-Theory-Tools/14563-Scaler-3",
      amazon: "https://www.amazon.com/Plugin-Boutique-Scaler-3-Software/dp/B0FKK2H83D"
    },
    na: [
      "andertons",
      "gear4music",
      "musicstore"
    ]
  },
  383: {
    prices: {
      pluginboutique: "€130.08",
      gear4music: "£62.00",
      musicstore: "€105.00",
      amazon: "$129.00"
    },
    pbCur: {
      us: "$129.00",
      uk: "£102.67"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Sonible-SmartEQ-4/65LT",
      pluginboutique: "https://www.pluginboutique.com/product/2-Effects/16-EQ/11784-smart-EQ-4",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Sonible-smart-EQ-4-License-Code/art-PCM0017947-000",
      amazon: "https://www.amazon.com/Sonible-smartEQ-4/dp/B0CVHRCRW2"
    },
    na: [
      "andertons"
    ]
  },
  384: {
    prices: {
      pluginboutique: "€130.08",
      gear4music: "£62.00",
      musicstore: "€105.00",
      amazon: "$129.00"
    },
    pbCur: {
      us: "$129.00",
      uk: "£102.67"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Sonible-SmartLimit/4M4S",
      pluginboutique: "https://www.pluginboutique.com/product/2-Effects/9-Limiter/8476-smart-limit",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Sonible-Smart-limit-License-Code/art-PCM0017210-000",
      amazon: "https://www.amazon.com/Sonible-smartlimit-Plugin/dp/B0C8J4WJF1"
    },
    na: [
      "andertons"
    ]
  },
  385: {
    prices: {
      pluginboutique: "€70.54"
    },
    pbCur: {
      us: "$80.00",
      uk: "£63.67"
    },
  },
  386: {
    prices: {
      pluginboutique: "€109.90",
      gear4music: "£62.55",
      andertons: "£95.00",
      musicstore: "€83.20",
      amazon: "$99.00"
    },
    pbCur: {
      us: "$99.00",
      uk: "£78.79"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/iZotope-Trash/6AAU",
      andertons: "https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2Fizotope-trash-creative-distortion-plugin%2F",
      pluginboutique: "https://www.pluginboutique.com/product/2-Effects/30-Distortion/11987-Trash",
      musicstore: "https://www.musicstore.com/en_OE/EUR/iZotope-Trash-License-Code/art-PCM0018334-000",
      amazon: "https://www.amazon.com/iZotope-Trash-Distortion-Plugin/dp/B0DF84C84J"
    }
  },
  387: {
    prices: {
      pluginboutique: "€79.65",
      amazon: "$79.00"
    },
    pbCur: {
      us: "$79.00",
      uk: "£62.88"
    },
    urls: {
      pluginboutique: "https://www.pluginboutique.com/product/2-Effects/53-Multi-Effect-/8036-Lifeline-Expanse",
      amazon: "https://www.amazon.com/Excite-Audio-Lifeline-Expanse-Plugin/dp/B0DKF74MVH"
    },
    na: [
      "andertons",
      "gear4music",
      "musicstore"
    ]
  },
  389: {
    prices: {
      gear4music: "£128.00",
      pluginboutique: "€99.83",
      musicstore: "€49.00"
    },
    pbCur: {
      us: "$49.00",
      uk: "£39.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B0002E4Z8M/?tag=topmusicg-20"
    }
  },
  390: {
    prices: {
      gear4music: "£37.00",
      pluginboutique: "€51.43"
    },
    pbCur: {
      us: "$49.00",
      uk: "£39.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B0002E4Z8M/?tag=topmusicg-20"
    }
  },
  392: {
    prices: {
      pluginboutique: "€89.75",
      zzounds: "$89.00",
      gear4music: "£74.99",
      musicstore: "€89.00"
    },
    pbCur: {
      us: "$99.00",
      uk: "£78.79"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--DSXREPEATER",
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Slate-Digital-Repeater-Delay/41TU",
      musicstore: "https://www.musicstore.com/en_OE/EUR/D16-Group-Repeater-License-Code/art-PCM0015075-000"
    }
  },
  394: {
    prices: {
      pluginboutique: "€79.65"
    },
    pbCur: {
      us: "$79.00",
      uk: "£62.88"
    },
  },
  395: {
    prices: {
      amazon: "$467.46",
      zzounds: "$499.99",
      gear4music: "£449.00",
      andertons: "£419.00",
      musicstore: "€529.00"
    }
  },
  396: {
    prices: {
      amazon: "$419.00",
      gear4music: "£266.00",
      andertons: "£266.00",
      musicstore: "€298.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/a--925521/item--BEHXTOUCH"
    },
    oos: [
      "zzounds"
    ]
  },
  397: {
    prices: {
      amazon: "$699.99",
      zzounds: "$699.99",
      gear4music: "£496.00",
      andertons: "£496.00",
      musicstore: "€639.00"
    }
  },
  398: {
    prices: {
      zzounds: "$1,495.00",
      musicstore: "€1,349.00",
      amazon: "$1,295",
      andertons: "£1,549.00"
    }
  },
  399: {
    prices: {
      musicstore: "€318.49"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B071XHN18K",
      zzounds: "https://www.zzounds.com/a--925521/item--ICNPLATFORMMPLUS"
    },
    oos: [
      "amazon",
      "zzounds"
    ]
  },
  400: {
    prices: {
      amazon: "$1,299.99",
      zzounds: "$1,399.99",
      musicstore: "€1,032.77"
    },
    oos: [
      "andertons"
    ]
  },
  401: {
    prices: {
      amazon: "$899.00",
      gear4music: "£770.00",
      andertons: "£849.00",
      musicstore: "€899.00",
      zzounds: "$999.00"
    }
  },
  402: { prices: { amazon: "$1,999.00", gear4music: "£1,348.00", andertons: "£1,234.00", musicstore: "€1,555.00" }, urls: { zzounds: "https://www.zzounds.com/item--BEHX32" }, oos: [ "zzounds" ] },
  403: { prices: { gear4music: "£2,969.00", amazon: "$2,499", andertons: "£2,659.00", musicstore: "€2,977.00" }, urls: { zzounds: "https://www.zzounds.com/a--925521/item--MIDM32LIVE" }, oos: [ "zzounds" ] },
  406: {
    prices: {
      zzounds: "$1,599.00",
      gear4music: "£1,510.00",
      amazon: "$1,599.99",
      andertons: "£1,510.00",
      musicstore: "€1,789.00"
    }
  },
  408: {
    prices: {
      zzounds: "$1,399.99",
      amazon: "$1,399.99",
      gear4music: "£1,036.00",
      musicstore: "€1,365.46"
    },
    oos: [
      "andertons"
    ]
  },
  410: {
    prices: {
      amazon: "$1,499.00",
      zzounds: "$999.00",
      gear4music: "£730.00",
      andertons: "£749.00",
      musicstore: "€869.00"
    }
  },
  411: { prices: { amazon: "$1,799.99", zzounds: "$1,866.00", andertons: "£1,399.00", gear4music: "£1,447.00", musicstore: "€1,427.70" } },
  412: {
    prices: {
      gear4music: "£2,399.00",
      andertons: "£2,159.00",
      musicstore: "€1,899.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--PRSSTUDIOLIVE32S",
      musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FPresonus-StudioLive-32S%2Fart-REC0014236-000"
    }
  },
  413: {
    prices: {
      amazon: "$1,689.99",
      musicstore: "€1,427.73",
      andertons: "£1,399.00"
    }
  },
  414: {
    prices: {
      zzounds: "$5,999.00",
      gear4music: "£3,799.00",
      musicstore: "€4,499.00",
      andertons: "£3,799.00"
    },
    urls: {
      andertons: "https://www.andertons.co.uk/allen-heath-sq-6-digital-mixer-2/?search_query=Allen%20%26%20Heath%20SQ-6"
    }
  },
  418: {
    prices: {
      amazon: "$2,999.00",
      zzounds: "$3,099.00",
      andertons: "£3,449.00",
      musicstore: "€4,498.00"
    }
  },
  419: {
    prices: {
      amazon: "$99.00",
      gear4music: "£75.00",
      musicstore: "€74.80"
    }
  },
  420: {
    prices: {
      amazon: "$99.00",
      gear4music: "£92.00",
      musicstore: "€111.00",
      zzounds: "$109.00",
      andertons: "£90.00"
    }
  },
  421: {
    prices: {
      amazon: "$249.00",
      gear4music: "£200.50",
      musicstore: "€215.00"
    }
  },
  422: {
    prices: {
      amazon: "$279.00",
      gear4music: "£149.00",
      musicstore: "€304.00"
    }
  },
  423: {
    prices: {
      zzounds: "$379.00",
      amazon: "$379.00",
      andertons: "£279.00",
      gear4music: "£305.00",
      musicstore: "€349.00"
    }
  },
  424: {
    prices: {
      zzounds: "$699.00",
      amazon: "$599.00",
      andertons: "£525.00",
      gear4music: "£559.00",
      musicstore: "€545.00"
    }
  },
  425: {
    prices: {
      amazon: "$179.00",
      musicstore: "€335.29"
    },
    oos: [
      "zzounds"
    ]
  },
  602: {
    prices: {
      amazon: "$279.99",
      zzounds: "$319.99",
      andertons: "£219.00",
      gear4music: "£239.50",
      musicstore: "€229.00"
    }
  },
  603: {
    prices: {
      amazon: "$599.99",
      zzounds: "$649.99",
      andertons: "£475.00",
      gear4music: "£557.00",
      musicstore: "€499.00"
    },
    urls: {
      musicstore: "https://www.musicstore.com/en_OE/EUR/beyerdynamic-DT-1990-PRO-MKII/art-REC0016806-000"
    }
  },
  426: {
    prices: {
      amazon: "$149.00",
      gear4music: "£139.00"
    },
    oos: [
      "zzounds"
    ]
  },
  427: {
    prices: {
      amazon: "$99.00",
      gear4music: "£87.40",
      musicstore: "€99.00",
      zzounds: "$99.00"
    }
  },
  428: {
    prices: {
      amazon: "$37.49",
      zzounds: "$50.00"
    }
  },
  429: {
    prices: {
      amazon: "$75.99",
      zzounds: "$79.99",
      gear4music: "£69.00",
      musicstore: "€63.03"
    },
    oos: [
      "andertons"
    ]
  },
  430: {
    prices: {
      amazon: "$39.99",
      zzounds: "$39.99",
      gear4music: "£35.00",
      musicstore: "€31.93"
    },
    oos: [
      "andertons"
    ]
  },
  431: {
    prices: {
      amazon: "$90.88",
      zzounds: "$105.00",
      gear4music: "£79.00",
      andertons: "£75.00",
      musicstore: "€98.00"
    }
  },
  432: {
    prices: {
      amazon: "$99.99"
    }
  },
  433: {
    prices: {
      amazon: "$143.39",
      zzounds: "$149.99",
      andertons: "£199.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/us/en/Recording-and-Computers/OFFLINE-Samson-Q9U-USB-XLR-Dynamic-Broadcast-Microphone/3JKA"
    },
    oos: [
      "gear4music"
    ]
  },
  434: {
    prices: {
      amazon: "$79.99",
      gear4music: "£95.00",
      musicstore: "€105.00"
    },
    oos: [
      "andertons"
    ]
  },
  435: {
    prices: {
      amazon: "$39.90",
      gear4music: "£25.70",
      andertons: "£26.00",
      musicstore: "€46.00"
    }
  },
  436: {
    prices: {
      amazon: "$49.99"
    },
    oos: [
      "reverb",
      "gear4music",
      "andertons",
      "musicstore"
    ]
  },
  437: {
    prices: {
      amazon: "$37.99"
    }
  },
  438: {
    prices: {
      amazon: "$52.13",
      zzounds: "$79.99",
      gear4music: "£50.00",
      andertons: "£62.00",
      musicstore: "€77.00"
    }
  },
  439: {
    prices: {
      amazon: "$35.99"
    }
  },
  440: {
    prices: {
      amazon: "$2,299.99",
      zzounds: "$2,299.99",
      gear4music: "£1,899.00",
      musicstore: "€1,847.90",
      andertons: "£1,999.00"
    }
  },
  441: {
    prices: {
      amazon: "$849.99",
      zzounds: "$849.99",
      gear4music: "£812.00",
      musicstore: "€899.00",
      andertons: "£799.00"
    }
  },
  442: {
    prices: {
      amazon: "$849.99",
      zzounds: "$849.99",
      gear4music: "£804.00",
      musicstore: "€899.00",
      andertons: "£799.00"
    }
  },
  443: {
    prices: {
      amazon: "$83.50",
      zzounds: "$83.50",
      gear4music: "£75.00",
      musicstore: "€66.00",
      andertons: "£69.99"
    }
  },
  444: {
    prices: {
      amazon: "$849.99",
      zzounds: "$849.99",
      gear4music: "£699.00",
      musicstore: "€671.43",
      andertons: "£799.00"
    }
  },
  445: {
    prices: {
      amazon: "$259.99",
      zzounds: "$259.99",
      gear4music: "£256.00",
      musicstore: "€217.60",
      andertons: "£229.00"
    }
  },
  446: {
    prices: {
      amazon: "$399.00",
      zzounds: "$399.00",
      gear4music: "£349.00",
      musicstore: "€335.30"
    }
  },
  447: {
    prices: {
      amazon: "$269.95",
      gear4music: "£252.50",
      musicstore: "€251.30",
      andertons: "£259.00"
    }
  },
  448: {
    prices: {
      amazon: "$209.99",
      zzounds: "$209.99",
      gear4music: "£206.00",
      musicstore: "€166.40",
      andertons: "£198.00"
    }
  },
  449: {
    prices: {
      amazon: "$149.99",
      musicstore: "€133.60",
      andertons: "£139.00"
    }
  },
  450: {
    prices: {
      amazon: "$79.00",
      zzounds: "$79.00"
    }
  },
  451: {
    prices: {
      amazon: "$229.00",
      gear4music: "£199.00",
      musicstore: "€209.20",
      andertons: "£199.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--LRBPARADI"
    },
    oos: [
      "zzounds"
    ]
  },
  452: {
    prices: {
      zzounds: "$4,599.99",
      amazon: "$4,399.00",
      gear4music: "£4,749.00",
      andertons: "£4,599.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Martin-D-28-Modern-Deluxe/2WVL"
    },
    oos: [
      "gear4music"
    ]
  },
  453: {
    prices: {
      andertons: "£6,799.00",
      musicstore: "€6,599.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B079V26HMV"
    },
    oos: ["amazon"]
  },
  454: {
    prices: {
      zzounds: "$5,999.00",
      gear4music: "£4,499.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B0D777R4L2",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Taylor-Builders-Edition-914ce-Sinker-Redwood-Top-Honduran-Rosewood-Back-and-Sides/7M78"
    },
    oos: [
      "amazon",
      "gear4music"
    ]
  },
  455: {
    prices: {
      zzounds: "$8,999.00",
      gear4music: "£7,499.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B0BD48TMYK"
    },
    oos: [
      "amazon"
    ]
  },
  456: {
    prices: {
      zzounds: "$4,999.00",
      gear4music: "£4,599.00",
      andertons: "£4,199.00",
      musicstore: "€4,444.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B001R2ITEE",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Gibson-1942-Banner-J-45-Vintage-Sunburst/39E5"
    },
    oos: [
      "amazon",
      "gear4music"
    ]
  },
  457: {
    prices: {
      zzounds: "$5,799.00",
      gear4music: "£4,499.00",
      andertons: "£5,699.00",
      musicstore: "€4,798.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B0CTKDGRHP"
    },
    oos: [
      "amazon"
    ]
  },
  458: {
    prices: {
      amazon: "$199.99"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Epiphone-Les-Paul-Special-Satin-E1-Les-Paul-Special-VE-Ebony/1LQB"
    },
    oos: [
      "gear4music"
    ]
  },
  459: {
    prices: {
      zzounds: "$239.99",
      amazon: "$149.99",
      gear4music: "£125.50",
      musicstore: "€129.00",
      andertons: "£129.00"
    }
  },
  460: {
    prices: {
      zzounds: "$249.99",
      gear4music: "£197.00",
      andertons: "£209.00",
      musicstore: "€249.00"
    },
    oos: [
      "amazon"
    ]
  },
  461: {
    prices: {
      amazon: "$169.00",
      gear4music: "£155.00"
    },
    oos: [
      "zzounds"
    ]
  },
  462: {
    prices: {
      gear4music: "£159.00",
      amazon: "$249.99",
      zzounds: "$249.99",
      andertons: "£159.00",
      musicstore: "€189.00"
    }
  },
  463: {
    prices: {
      gear4music: "£199.00",
      andertons: "£209.00",
      musicstore: "€211.00",
      zzounds: "$269.99"
    }
  },
  464: {
    prices: {
      gear4music: "£409.00",
      andertons: "£399.00",
      zzounds: "$599.99",
      amazon: "$539.99",
      musicstore: "€479.00"
    }
  },
  465: {
    prices: {
      gear4music: "£119.00",
      amazon: "$219.00"
    }
  },
  466: {
    prices: {
      gear4music: "£179.00"
    }
  },
  467: {
    prices: {
      gear4music: "£635.00",
      andertons: "£659.00",
      musicstore: "€669.00",
      zzounds: "$629.00",
      amazon: "$599.99"
    }
  },
  468: {
    prices: {
      andertons: "£3,399.00",
      musicstore: "€3,869.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B0FSGYBWZQ",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Neumann-KH-810-II/art-REC0017051-000",
      andertons: "https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2Fneumann-kh-810-ii-10-active-subwoofer%2F",
      zzounds: "https://www.zzounds.com/item--NEMKH810II"
    },
    na: [
      "gear4music"
    ]
  },
  470: {},
  472: {
    prices: {
      pluginboutique: "€120.00",
      gear4music: "£109.00",
      andertons: "£109.00",
      musicstore: "€129.00"
    },
    pbCur: {
      us: "$129.00",
      uk: "£102.67"
    },
  },
  473: {
    prices: {
      pluginboutique: "€42.35"
    },
    pbCur: {
      us: "$125.00",
      uk: "£99.49"
    },
  },
  474: {
    prices: {
      pluginboutique: "€70.54"
    },
    pbCur: {
      us: "$80.00",
      uk: "£63.67"
    },
  },
  475: {
    prices: {
      amazon: "$349.00",
      zzounds: "$349.00",
      andertons: "£264.00",
      musicstore: "€319.00"
    },
    oos: ["gear4music"]
  },
  476: {
    prices: {
      amazon: "$929.00",
      andertons: "£449.00",
      musicstore: "€699.00"
    },
    oos: ["gear4music", "zzounds"]
  },
  477: {
    prices: {
      amazon: "$1,399.00",
      zzounds: "$1,399.00",
      gear4music: "£1,099.00",
      andertons: "£1,058.00",
      musicstore: "€1,299.00"
    }
  },
  478: {
    prices: {
      amazon: "$1,399.99",
      zzounds: "$1,499.00",
      gear4music: "£1,510.00",
      andertons: "£1,399.00",
      musicstore: "€1,459.00"
    }
  },
  479: {
    prices: {
      zzounds: "$2,999.00",
      andertons: "£2,199.00",
      musicstore: "€2,590.00"
    }
  },
  480: {
    prices: {
      gear4music: "£2,910.00",
      andertons: "£2,599.00",
      musicstore: "€2,829.00"
    },
    urls: {
      gear4music: "https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=https%3A%2F%2Fwww.gear4music.com%2FRecording-and-Computers%2FGenelec-7370A-Smart-Active-Monitoring-Subwoofer-Dark-Grey%2F1MYN"
    },
    oos: [
      "zzounds"
    ]
  },
  481: {},
  482: {
    prices: {
      amazon: "$2,999.00",
      andertons: "£1,829.00",
      musicstore: "€2,179.00",
      gear4music: "£1,859.00"
    }
  },
  483: {
    prices: {
      amazon: "$439.00",
      andertons: "£529.00"
    }
  },
  484: {
    prices: {
      amazon: "$399.00",
      gear4music: "£259.00",
      andertons: "£269.00",
      zzounds: "$399.00"
    }
  },
  485: {
    prices: {
      gear4music: "£999.00",
      andertons: "£1,099.00",
      amazon: "$1,099.99"
    }
  },
  486: {
    prices: {
      zzounds: "$499.00",
      amazon: "$525.00",
      andertons: "£422.00",
      gear4music: "£458.00",
      musicstore: "€444.00"
    }
  },
  487: {
    prices: {
      amazon: "$585.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--SOUSIG12MTK"
    },
    oos: [
      "zzounds"
    ]
  },
  488: {
    prices: {
      zzounds: "$349.99",
      amazon: "$318.99",
      andertons: "£319.00",
      gear4music: "£285.50"
    }
  },
  489: {
    prices: {
      zzounds: "$199.00",
      amazon: "$199.00",
      andertons: "£199.99",
      musicstore: "€179.00"
    },
    oos: [
      "gear4music"
    ]
  },
  490: {
    prices: {
      zzounds: "$269.99",
      andertons: "£319.00",
      gear4music: "£319.00",
      musicstore: "€349.00"
    }
  },
  491: {
    prices: {
      zzounds: "$249.00",
      amazon: "$249.00",
      andertons: "£179.00",
      gear4music: "£165.00",
      musicstore: "€199.00"
    }
  },
  492: {
    prices: {
      zzounds: "$449.99",
      amazon: "$328.98",
      andertons: "£349.00",
      gear4music: "£349.00",
      musicstore: "€399.00"
    }
  },
  493: {
    prices: {
      zzounds: "$569.00",
      amazon: "$439.20",
      andertons: "£459.00",
      gear4music: "£463.00",
      musicstore: "€549.00"
    }
  },
  494: {
    prices: {
      zzounds: "$529.99",
      andertons: "£368.00",
      gear4music: "£374.00",
      musicstore: "€429.00"
    }
  },
  495: {
    prices: {
      zzounds: "$949.00",
      amazon: "$849.00",
      gear4music: "£659.00",
      musicstore: "€819.00"
    },
    oos: [
      "andertons"
    ]
  },
  496: {
    prices: {
      zzounds: "$1,099.00",
      amazon: "$1,099.00",
      andertons: "£1,049.00",
      musicstore: "€1,199.00"
    },
    oos: [
      "gear4music"
    ]
  },
  497: {
    prices: {
      zzounds: "$415.00",
      amazon: "$399.00",
      gear4music: "£335.50",
      musicstore: "€365.00"
    }
  },
  499: {
    prices: {
      zzounds: "$267.00",
      gear4music: "£354.00",
      musicstore: "€389.00"
    }
  },
  500: {
    prices: {
      zzounds: "$466.95",
      gear4music: "£418.00",
      musicstore: "€469.00"
    }
  },
  501: {
    prices: {
      gear4music: "£379.00",
      andertons: "£379.00",
      musicstore: "€399.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--TURTFX122MAN"
    }
  },
  502: {
    prices: {
      zzounds: "$779.99",
      amazon: "$749.99",
      gear4music: "£749.00",
      musicstore: "€789.00"
    }
  },
  503: {
    prices: {
      gear4music: "£439.00",
      amazon: "$599.99",
      zzounds: "$599.99",
      andertons: "£439.00",
      musicstore: "€499.00"
    }
  },
  504: {
    holly: {
      eu: {
        u: "https://eu.hollyland.com/de-de/products/lark-max",
        p: "€143.00"
      },
      us: {
        u: "https://store.hollyland.com/products/lark-max",
        p: "$139.00"
      }
    },
    na: [
      "zzounds",
      "reverb",
      "gear4music",
      "andertons",
      "musicstore",
      "amazon"
    ]
  },
  505: {
    holly: {
      eu: {
        u: "https://eu.hollyland.com/de-de/products/lark-a2",
        p: "€44.99"
      },
      us: {
        u: "https://store.hollyland.com/products/lark-a2",
        p: "$44.99"
      },
      uk: {
        u: "https://uk.hollyland.com/products/lark-a2",
        p: "£46.30"
      }
    },
    na: [
      "zzounds",
      "reverb",
      "gear4music",
      "andertons",
      "musicstore",
      "amazon"
    ]
  },
  506: {
    holly: {
      eu: {
        u: "https://eu.hollyland.com/de-de/products/lark-max-2?variant=51364345807115",
        p: "€212.00"
      },
      us: {
        u: "https://store.hollyland.com/products/lark-max-2?variant=46839711826179",
        p: "$269.00"
      },
      uk: {
        u: "https://uk.hollyland.com/products/lark-max-2?variant=48696453267684",
        p: "£180.20"
      }
    },
    prices: {
      amazon: "$249.00"
    },
    na: [
      "zzounds",
      "reverb",
      "gear4music",
      "andertons",
      "musicstore"
    ]
  },
  508: {
    holly: {
      eu: {
        u: "https://eu.hollyland.com/de-de/products/melo-p1",
        p: "€369.00"
      },
      us: {
        u: "https://store.hollyland.com/products/melo-p1",
        p: "$249.00"
      },
      uk: {
        u: "https://uk.hollyland.com/products/melo-p1",
        p: "£301.00"
      }
    },
    prices: {
      amazon: "$249.00"
    },
    na: [
      "zzounds",
      "reverb",
      "gear4music",
      "andertons",
      "musicstore"
    ]
  },
  509: {
    holly: {
      eu: {
        u: "https://eu.hollyland.com/de-de/products/solidcom-c1?variant=45698861072651",
        p: "€364.00"
      },
      us: {
        u: "https://store.hollyland.com/products/solidcom-c1?variant=42779547435267",
        p: "$399.00"
      },
      uk: {
        u: "https://uk.hollyland.com/products/solidcom-c1?variant=49084502081764",
        p: "£309.40"
      }
    },
    prices: {
      amazon: "$399.00"
    },
    na: [
      "zzounds",
      "reverb",
      "gear4music",
      "andertons",
      "musicstore"
    ]
  },
  510: {
    holly: {
      eu: {
        u: "https://eu.hollyland.com/de-de/products/solidcom-c1-pro?variant=45698811003147",
        p: "€589.00"
      },
      us: {
        u: "https://store.hollyland.com/products/solidcom-c1-pro?variant=43796065779971",
        p: "$649.00"
      },
      uk: {
        u: "https://uk.hollyland.com/products/solidcom-c1-pro?variant=49084560507108",
        p: "£539.00"
      }
    },
    prices: {
      amazon: "$649.00"
    },
    na: [
      "zzounds",
      "reverb",
      "gear4music",
      "andertons",
      "musicstore"
    ]
  },
  511: {
    holly: {
      eu: {
        u: "https://eu.hollyland.com/de-de/products/solidcom-se-pro?variant=51170563358987",
        p: "€342.00"
      },
      us: {
        u: "https://store.hollyland.com/products/solidcom-se-pro?variant=46564892803331",
        p: "$369.00"
      },
      uk: {
        u: "https://uk.hollyland.com/products/solidcom-se-pro?variant=48696449302756",
        p: "£290.70"
      }
    },
    prices: {
      amazon: "$369.00"
    },
    na: [
      "zzounds",
      "reverb",
      "gear4music",
      "andertons",
      "musicstore"
    ]
  },
  512: {
    prices: {
      amazon: "$1,995.00",
      zzounds: "$1,995.00",
      gear4music: "£1,525.00",
      andertons: "£1,525.00",
      musicstore: "€1,799.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Neumann-MT48-Premium-Audio-Interface/5E3S",
      amazon: "https://www.amazon.com/dp/B0BTGVGCJN",
      andertons: "https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2FNeumann-MT-48-Audio-Interface-Universal-PSU-inc-USB-Connection%2F",
      zzounds: "https://www.zzounds.com/item--NEMMT48",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Neumann-Neumann-MT-48-U/art-PCM0017584-000"
    },
    oos: [
      "zzounds"
    ]
  },
  513: {
    prices: {
      amazon: "$3,299.00",
      zzounds: "$3,399.00",
      gear4music: "£2,899.00",
      andertons: "£2,899.00",
      musicstore: "€3,399.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Universal-Audio-Apollo-x8p-Gen-2-Essentialsand-Edition/6P0K",
      andertons: "https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2Fapollo-x8p-gen-2-ess%2F",
      amazon: "https://www.amazon.com/dp/B0DC13HNN3",
      zzounds: "https://www.zzounds.com/item--UADAPX8PG2E",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Universal-Audio-Apollo-x8p-Gen2-Studio-/art-PCM0018210-000"
    },
    oos: []
  },
  514: {
    prices: {
      andertons: "£5,015.00"
    },
    urls: {
      andertons: "https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2Fapogee-symphony-i-o-mkii-thunderbolt-chassis-with-16x16-module%2F"
    },
    oos: [
      "andertons"
    ]
  },
  515: {
    prices: {
      amazon: "$3,499.99",
      zzounds: "$3,499.99",
      gear4music: "£2,454.00",
      andertons: "£2,200.00",
      musicstore: "€3,239.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Audient-ORIA-Interface-and-Immersive-Monitor-Controller-for-Dolby-Atmos/66Y3",
      andertons: "https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=https%3A%2F%2Fwww.andertons.co.uk%2Faudient-oria-usb-interface%2F",
      amazon: "https://www.amazon.com/dp/B0CTW4MD53",
      zzounds: "https://www.zzounds.com/item--ADIORIA",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Audient-ORIA/art-PCM0017953-000"
    },
    oos: []
  },
  516: {
    prices: {},
    urls: {
      musicstore: "https://www.musicstore.com/en_OE/EUR/Lynx-Studio-Technology-Aurora-n-16-USB/art-REC0013406-000"
    },
    oos: [
      "musicstore"
    ]
  },
  518: {
    prices: {
      amazon: "$129.99"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Recording-and-Computers/Blue-Yeti-USB-Microphone-Slate/3U30"
    }
  },
  527: {
    prices: {
      pluginboutique: "€89.00"
    },
    pbCur: {
      us: "$108.90",
      uk: "£86.67"
    }
  },
  528: {
    prices: {
      andertons: "£899.00",
      musicstore: "€1,159.00",
      amazon: "$1299.99",
      zzounds: "$1,300.00",
      gear4music: "£899.00"
    }
  },
  529: {
    prices: {
      andertons: "£579.00",
      gear4music: "£699.00",
      zzounds: "$899.00"
    }
  },
  530: {
    prices: {
      gear4music: "£419.00",
      musicstore: "€444.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--TRAULB"
    },
    oos: [
      "zzounds"
    ]
  },
  531: {
    prices: {
      gear4music: "£399.00",
      zzounds: "$499.00",
      amazon: "$499.00",
      musicstore: "€429.00"
    }
  },
  532: {
    prices: {
      amazon: "$369.00",
      gear4music: "£289.00"
    }
  },
  533: {
    prices: {
      gear4music: "£679.00",
      andertons: "£679.00",
      musicstore: "€759.00",
      zzounds: "$849.99"
    }
  },
  534: {
    urls: {
      amazon: "https://www.amazon.com/Gretsch-G2220-Junior-Bass-Short-Scale/dp/B09NYLL9QK",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Gretsch-G2220-Junior-Jet-Bass-II-Bass-Guitar-Black/QIO",
      zzounds: "https://www.zzounds.com/item--GRE2514620",
      musicstore: "https://www.musicstore.com/en_OT/EUR/Gretsch-G2220-Junior-Jet-II-Bass-Guita-r-Black-/art-BAS0005818-000"
    },
    oos: [
      "gear4music",
      "amazon",
      "zzounds",
      "musicstore"
    ]
  },
  535: {
    prices: {
      amazon: "$219.99",
      andertons: "£179.00",
      gear4music: "£179.00",
      musicstore: "€209.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--JAC2915555"
    },
    oos: [
      "zzounds"
    ]
  },
  536: {
    prices: {
      gear4music: "£179.00",
      andertons: "£195.00",
      zzounds: "$260.00",
      musicstore: "€219.00"
    }
  },
  537: {
    prices: {
      gear4music: "£190.00",
      andertons: "£209.00",
      zzounds: "$220.00",
      musicstore: "€229.00"
    }
  },
  538: {
    prices: {
      gear4music: "£309.00",
      musicstore: "€349.00",
      zzounds: "$299.00",
      andertons: "£289.00"
    }
  },
  539: {
    prices: {
      andertons: "£449.00",
      zzounds: "$400.00",
      musicstore: "€489.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Sterling-SUB-Ray5-Bass-RW-Walnut-Satin/VF1"
    },
    oos: [
      "gear4music"
    ]
  },
  540: {
    prices: {
      gear4music: "£416.00",
      andertons: "£429.00",
      musicstore: "€499.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--YAMTRBX305"
    },
    oos: [
      "zzounds"
    ]
  },
  541: {
    prices: {
      zzounds: "$399.99",
      andertons: "£279.00",
      gear4music: "£279.00",
      musicstore: "€329.00"
    }
  },
  542: {
    prices: {
      andertons: "£669.00",
      gear4music: "£669.00",
      zzounds: "$699.00",
      amazon: "$699.00"
    }
  },
  543: {
    prices: {
      gear4music: "£759.00",
      amazon: "$659.99",
      musicstore: "€799.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--YAMBB435"
    },
    oos: [
      "zzounds"
    ]
  },
  544: {
    prices: {
      andertons: "£629.00",
      gear4music: "£629.00",
      musicstore: "€749.00",
      zzounds: "$750.00",
      amazon: "$749.99"
    }
  },
  545: {
    prices: {
      gear4music: "£439.00",
      zzounds: "$560.00",
      musicstore: "€529.00"
    }
  },
  546: {
    prices: {
      musicstore: "€1,899.00",
      andertons: "£1,599.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Fender-American-Professional-II-Jazz-Bass-V-RW-Olympic-White/3J06",
      zzounds: "https://www.zzounds.com/item--FEN0193992"
    },
    oos: [
      "gear4music",
      "zzounds"
    ]
  },
  547: {
    prices: {
      andertons: "£2,299.00",
      zzounds: "$2519.99",
      musicstore: "€2,479.00",
      gear4music: "£2,351.00"
    }
  },
  548: {
    prices: {
      gear4music: "£1044.00",
      zzounds: "$1,400.00",
      andertons: "£1,149.00"
    }
  },
  549: {
    prices: {
      andertons: "£2049.00",
      musicstore: "€2,440.00"
    }
  },
  550: {
    prices: {
      gear4music: "£142.00",
      andertons: "£179.00",
      musicstore: "€179.00",
      amazon: "$229.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B01ET9GCGS?tag=topmusicg-20",
      zzounds: "https://www.zzounds.com/item--BEHUMC1820"
    }
  },
  551: {
    prices: {
      zzounds: "$199.00",
      amazon: "$199.00",
      gear4music: "£115.00",
      andertons: "£114.00",
      musicstore: "€139.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B09HL4GZF9?tag=topmusicg-20",
      musicstore: "https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=https%3A%2F%2Fwww.musicstore.com%2Fen_OE%2FEUR%2FArturia-MiniFuse-2-Black%2Fart-PCM0017077-000"
    }
  },
  
  552: {
    prices: {
      zzounds: "$450.00",
      andertons: "£379.00",
      gear4music: "£347.00",
      musicstore: "€399.00"
    }
  },
  553: {
    prices: {
      gear4music: "£189.00",
      andertons: "£189.00",
      musicstore: "€215.00"
    },
    urls: {
      amazon: "https://www.amazon.com/dp/B07K2JLS56",
      andertons: "https://www.andertons.co.uk/fender-classic-design-cn60s-nylon-strung-classical-guitar-in-natural-w-walnut-fingerboard/?search_query=Fender%20CN-60S",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Fender-CN-60S-Natural-/art-GIT0049159-000"
    }
  },
554: {
    prices: {
      gear4music: "£209.00",
      amazon: "$349.00",
      zzounds: "$349.00",
      musicstore: "€299.00"
    },
    urls: {
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Takamine-GC1-Classical-Guitar-Natural/1FSN",
      amazon: "https://www.amazon.com/dp/B00EOADUTU",
      zzounds: "https://www.zzounds.com/item--TAKGC1?siid=178306",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Takamine-GC1N/art-GIT0063165-001"
    }
  },
  555: {
    prices: {
      zzounds: "$541.00",
      gear4music: "£689.00",
      andertons: "£649.00",
      musicstore: "€659.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--FEN2370500",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Fender-Rumble-200-1x15-Bass-Combo/X0Q",
      andertons: "https://www.andertons.co.uk/Fender-Rumble-200-V3-Bass-Amp-230V-uk/?search_query=Fender%20Rumble%20200%20V3",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Fender-Rumble-200-V3-Combo-/art-BAS0007200-000"
    }
  },
  556: {
    prices: {
      zzounds: "$629.00",
      gear4music: "£519.00",
      andertons: "£539.00",
      musicstore: "€599.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--AMPRB115",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Ampeg-Rocket-Bass-115/3T6U",
      andertons: "https://www.andertons.co.uk/ampeg-rocket-rb-115-200w-bass-combo/?search_query=Ampeg%20Rocket%20Bass%20RB-115",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Ampeg-RB-115-Rocket-Bass-Amplifier/art-BAS0011676-000"
    }
  },
  557: {
    prices: {
      gear4music: "£324.50",
      andertons: "£359.00",
      musicstore: "€419.00"
    },
    urls: {
      zzounds: "https://www.zzounds.com/item--BOSKTN50EXV3",
      gear4music: "https://www.gear4music.com/Guitar-and-Bass/Boss-Katana-50-EX-Gen-3-1x12-Combo/6E9C",
      andertons: "https://www.andertons.co.uk/boss-katana-50-ex-gen-3-50w-guitar-amp-combo/",
      musicstore: "https://www.musicstore.com/en_OE/EUR/Boss-Katana-50-EX-Gen-3-Combo/art-GIT0061743-000",
      amazon: "https://www.amazon.com/Katana-50-50-watt-12-inch-Combo-Amplifier/dp/B0D1ZCK91X"
    }
  },
  558: {
    prices: {
      andertons: "£1,169.00",
      gear4music: "£1,169.00",
      musicstore: "€1,285.00"
    }
  },
  559: {
    prices: {
      amazon: "$979.00",
      andertons: "£666.00",
      gear4music: "£666.00",
      musicstore: "€790.00"
    },
    oos: [
      "zzounds"
    ],
    urls: {
      zzounds: "https://www.zzounds.com/item--BEHX32RACK"
    }
  },
  560: {
    prices: {
      amazon: "$1,299.00",
      andertons: "£580.00",
      gear4music: "£872.00",
      musicstore: "€799.00"
    },
    oos: [
      "zzounds"
    ],
    urls: {
      zzounds: "https://www.zzounds.com/item--MIAM32C"
    }
  },
  561: {
    prices: {
      amazon: "$999.99",
      zzounds: "$999.99",
      andertons: "£730.00",
      gear4music: "£736.00",
      musicstore: "€905.00"
    }
  },
  564: {
    prices: {
      andertons: "£1,199.00",
      gear4music: "£1,199.00",
      musicstore: "€1,489.00",
      zzounds: "$1,299.00"
    }
  },
  563: {
    prices: {
      andertons: "£1,999.00",
      zzounds: "$2,799.00",
      musicstore: "€2,499.00"
    }
  },
  565: { prices: { amazon: "$1,319.99", zzounds: "$1,319.99", gear4music: "£799.00", andertons: "£839.00", musicstore: "€989.00" } },
  566: { prices: {}, na: ["zzounds", "andertons", "musicstore", "gear4music"] },
  567: { prices: { amazon: "$1,749.99", zzounds: "$1,749.99", gear4music: "£1,175.00", andertons: "£1,175.00", musicstore: "€1,399.00" } },
  568: { prices: { amazon: "$1,499.00" }, oos: ["zzounds"], na: ["andertons", "musicstore", "gear4music"] },
  569: { prices: { amazon: "$3,099.99", gear4music: "£2,146.00", andertons: "£2,146.00", musicstore: "€2,095.00" }, na: ["zzounds"] },
  570: { prices: { amazon: "$3,299.99", gear4music: "£1,469.00", andertons: "£1,513.00", musicstore: "€1,799.00" }, na: ["zzounds"] },
  571: { prices: { zzounds: "$729.99", gear4music: "€505.00", andertons: "£399.00", musicstore: "€499.00" } },
  572: { prices: { amazon: "$499.99", andertons: "£399.00", gear4music: "£355.00", musicstore: "€419.00" }, oos: ["zzounds"] },
  573: { prices: { amazon: "$1,299.99", zzounds: "$1,299.99", andertons: "£899.00", gear4music: "£899.00", musicstore: "€1,049.00" }, urls: { gear4music: "https://www.gear4music.com/Keyboards-and-Pianos/Yamaha-YDP-146-Digital-Piano-Black/86R5" } },
  574: { prices: { amazon: "$1,469.99", zzounds: "$1,499.99", gear4music: "£1,349.00", andertons: "£1,399.00" } },
  575: { prices: { official: "$1,099.99" } },
  576: { prices: { official: "$699.99", gear4music: "£559.00" } },
  577: { prices: { zzounds: "$799.99", gear4music: "£445.00" }, urls: { gear4music: "https://www.gear4music.com/Guitar-and-Bass/Zoom-G11-Multi-Effects-Processor/54OK" } },
  578: { prices: { zzounds: "$659.99", gear4music: "£635.00", andertons: "£649.00", musicstore: "€777.00" } },
  579: { prices: { zzounds: "$1,799.00", andertons: "£1,449.00", musicstore: "€1,585.00" }, urls: { gear4music: "https://www.gear4music.com/Guitar-and-Bass/Neural-DSP-Quad-Cortex/61MZ" } },
  580: { prices: { musicstore: "€599.00" }, urls: { gear4music: "https://www.gear4music.com/Guitar-and-Bass/Mooer-GE300-Multi-Effects-Pedal/2UHQ" }, oos: ["gear4music"] },
  581: { prices: { zzounds: "$168.45", gear4music: "£159.00", andertons: "£180.00" } },
  582: { prices: { zzounds: "$199.97", gear4music: "£189.00", andertons: "£189.00", musicstore: "€215.00" } },
  583: { prices: { zzounds: "$199.00", gear4music: "£175.00", andertons: "£174.00", musicstore: "€259.00" } },
  584: { prices: { zzounds: "$99.99", gear4music: "£109.00", andertons: "£109.00", musicstore: "€109.00" } },
  585: { prices: { zzounds: "$186.99", gear4music: "£157.00", andertons: "£169.00", musicstore: "€169.00" } },
  586: { prices: { zzounds: "$351.99", gear4music: "£273.00", andertons: "£299.00", musicstore: "€299.00" } },
  587: { prices: { gear4music: "£150.00", andertons: "£150.00", musicstore: "€239.00" }, urls: { zzounds: "https://www.zzounds.com/item--TCEDITTOX4LOOPER" }, oos: ["zzounds"] },
  588: { prices: { zzounds: "$181.40", gear4music: "£149.00", andertons: "£150.00", musicstore: "€158.00" } },
  590: { prices: { zzounds: "$159.99", gear4music: "£159.00", musicstore: "€199.00", andertons: "£160.00" } },
  591: { prices: { zzounds: "$449.00", gear4music: "£429.00", andertons: "£429.00", musicstore: "€469.00" } },
  592: { prices: { gear4music: "£668.00", andertons: "£619.00", musicstore: "€799.00" }, urls: { gear4music: "https://www.gear4music.com/Guitar-and-Bass/Meris-LVX-Modular-Delay-System-Pedal/4V7F" } },
  593: { prices: { gear4music: "£384.00" }, urls: { zzounds: "https://www.zzounds.com/item--EVTTIMEFACTOR" }, oos: ["zzounds"] },
  594: { prices: { zzounds: "$299.99", andertons: "£319.00" } },
  595: { prices: { zzounds: "$199.00", andertons: "£209.00" } },
  596: { prices: { zzounds: "$399.00", gear4music: "£293.00", andertons: "£319.00", musicstore: "€369.00" } },
  597: { prices: { zzounds: "$160.00", gear4music: "£159.00", andertons: "£160.00", musicstore: "€199.00" } },
  598: { prices: { zzounds: "$349.00", gear4music: "£299.00", andertons: "£379.00", musicstore: "€349.00" } },
  599: { prices: { zzounds: "$320.99", gear4music: "£243.00", andertons: "£259.00", musicstore: "€289.00" } },
  600: { prices: { gear4music: "£199.00" }, urls: { zzounds: "https://www.zzounds.com/item--EHXSNCO03E" }, oos: ["zzounds"] },
  601: { prices: { zzounds: "$659.99", gear4music: "£461.00", andertons: "£499.00", musicstore: "€499.00" } },
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
    // Keep one trailing model word (Rack, LIVE, Pro...) so store searches
    // don't collapse variants: "Behringer X32 Rack" must not become "Behringer X32".
    var end = lastNumIdx + 1;
    if (end === words.length - 1 && /^[A-Za-z]+$/.test(words[end])) end++;
    return words.slice(0, end).join(' ');
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


function wrapAndertons(url) {
  if (!url) return url;
  if (url.indexOf('pxf.io') >= 0 || url.indexOf('andertonsmusiccompany.pxf.io') >= 0) return url;
  var clean = url.replace(/([?&])(irpid|irgwc|afsrc|im_ref|sharedid)=[^&]*/g, '$1').replace(/([?&])+/g, '$1').replace(/[?&]+$/, '');
  return 'https://andertonsmusiccompany.pxf.io/c/7292297/3326127/43829?u=' + encodeURIComponent(clean);
}


function wrapAffiliate(storeKey, url) {
  if (!url) return url;
  if (storeKey === 'pluginboutique') return ensurePbAff(url);
  if (storeKey === 'amazon' && url.indexOf('tag=topmusicg-20') < 0 && (url.indexOf('/dp/') >= 0 || url.indexOf('amazon.com') >= 0 || url.indexOf('amazon.co.uk') >= 0)) return url + (url.indexOf('?') >= 0 ? '&' : '?') + 'tag=topmusicg-20';
  if (storeKey === 'andertons') return wrapAndertons(url);
  if (storeKey === 'reverb' && url.indexOf('awin1.com') < 0 && url.indexOf('reverb.com') >= 0) return 'https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=' + encodeURIComponent(url);
  if (storeKey === 'musicstore' && url.indexOf('awin1.com') < 0 && url.indexOf('musicstore.com') >= 0) return 'https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=' + encodeURIComponent(normalizeMusicStore(url));
  if (storeKey === 'zzounds' && url.indexOf('anrdoezrs.net') < 0 && url.indexOf('zzounds.com') >= 0) return 'https://www.anrdoezrs.net/click-101857888-10439229?url=' + encodeURIComponent(url);
  if (storeKey === 'gear4music' && url.indexOf('awin1.com') < 0 && url.indexOf('gear4music.com') >= 0) return 'https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=' + encodeURIComponent(url);
  if (storeKey === 'hollyland' && url.indexOf('awin1.com') < 0 && url.indexOf('hollyland.com') >= 0) return 'https://www.awin1.com/cread.php?awinmid=128051&awinaffid=2891111&ued=' + encodeURIComponent(url);
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
    pluginboutique: (t) => `https://www.pluginboutique.com/search?q=${encodeURIComponent(t)}&a_aid=6a01e859cbe1a`, gear4music: (t) => `https://www.gear4music.com/search?q=${encodeURIComponent(t)}`, amazon: (t) => `https://www.amazon.com/s?k=${encodeURIComponent(t)}&tag=topmusicg-20`, reverb: (t) => `https://reverb.com/marketplace?query=${encodeURIComponent(t)}`, andertons: (t) => `https://www.andertons.co.uk/search.php?search_query=${encodeURIComponent(t)}`, musicstore: (t) => `https://www.musicstore.com/en_OE/EUR/search?SearchText=${encodeURIComponent(t)}`, zzounds: () => 'https://www.zzounds.com/a--925521/'
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
      } else {
        s[key] = specificUrl;
      }
    } else if (!isMacOnly && key !== 'amazon' && searchUrls[key]) {
      s[key] = searchUrls[key](shortTitle(product.title));
    }
  });
  if (product.stores.hollyland) {
    s.hollyland = wrapAffiliate('hollyland', product.stores.hollyland);
  }
  if (s.reverb && !s.reverb.startsWith('https://www.awin1.com/cread.php?awinmid=67144')) {
    s.reverb = `https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=${encodeURIComponent(s.reverb)}`;
  }
  if (s.musicstore && !s.musicstore.startsWith('https://www.awin1.com/cread.php?awinmid=63816')) {
    s.musicstore = `https://www.awin1.com/cread.php?awinmid=63816&awinaffid=2891111&ued=${encodeURIComponent(normalizeMusicStore(s.musicstore))}`;
  } else if (s.musicstore) {
    s.musicstore = normalizeMusicStore(s.musicstore);
  }
  if (s.gear4music && !s.gear4music.startsWith('https://www.awin1.com/cread.php?awinmid=1117')) {
    s.gear4music = `https://www.awin1.com/cread.php?awinmid=1117&awinaffid=2891111&ued=${encodeURIComponent(s.gear4music)}`;
  }
  if (s.zzounds && !s.zzounds.startsWith('https://www.anrdoezrs.net/click-101857888-10439229')) {
    s.zzounds = `https://www.anrdoezrs.net/click-101857888-10439229?url=${encodeURIComponent(s.zzounds.replace('/a--925521', ''))}`;
  }
  if (s.andertons) {
    s.andertons = wrapAndertons(s.andertons);
  }
  return s;
}


function hollyDefaultRegion() {
  var isUsa = false;
  try { var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; isUsa = tz.indexOf('America/') === 0 && (tz.indexOf('New_York') > -1 || tz.indexOf('Chicago') > -1 || tz.indexOf('Denver') > -1 || tz.indexOf('Los_Angeles') > -1 || tz.indexOf('Anchorage') > -1 || tz.indexOf('Honolulu') > -1 || tz.indexOf('Phoenix') > -1 || tz.indexOf('Detroit') > -1 || tz.indexOf('Indiana') > -1); } catch(e) {}
  return isUsa ? 'us' : 'eu';
}

function hollyPickEntry(cfg, r) {
  if (!cfg || !cfg.holly) return null;
  return cfg.holly[r] || cfg.holly.eu || cfg.holly.us || cfg.holly.uk || null;
}
// Plain-text amount (no label, no markup): strips decimals and re-applies the
// thousands separator. Used for data-* attributes and for the geo-swap.

function fmtPricePlain(raw) {
  if (!raw) return '';
  var s = String(raw);
  var m = s.match(/^([$\u00a3\u20ac])\s*([\d,]+)(?:\.(\d+))?\s*$/);
  if (!m) return s;
  var whole = parseInt(String(m[2]).replace(/,/g, ''), 10);
  if (!isFinite(whole)) return s;
  return m[1] + String(whole).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Formats a store price for display: strips decimals (truncates) and renders
// the "Approx." label in the "Check price" typography (12px, semibold, italic)
// followed by the plain amount.
// Label color depends on the surface: #a8a8a8 on the dark store rows, and
// #ffffff on the blue primary button where gray would not be readable.
// Always re-applies the thousands separator so values above 999 keep the
// comma (AGENTS rule). The plain amount is kept in data-price so the
// geo-swap script can move prices between the primary button and the rows
// without parsing HTML.

function fmtPrice(raw, lang, primary) {
  if (!raw) return '';
  var s = String(raw);
  var m = s.match(/^([$\u00a3\u20ac])\s*([\d,]+)(?:\.(\d+))?\s*$/);
  if (!m) return s;
  var whole = parseInt(String(m[2]).replace(/,/g, ''), 10);
  if (!isFinite(whole)) return s;
  var out = String(whole).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  var label = lang === 'es' ? 'Aprox.' : 'Approx.';
  var color = primary ? '#ffffff' : '#a8a8a8';
  return '<span class=\'shop-price\' data-price=\'' + m[1] + out + '\'>' +
    '<span style=\'font-size:12px;font-weight:600;color:' + color + ';font-style:italic\'>' + label + '</span> ' +
    m[1] + out + '</span>';
}


function shopButtonsTest(p, lang) {
  const cfg = TEST_SHOP_BTN[p.id] || {};
  const prices = cfg.prices || {};
  const stores = getResolvedStores(p);
  const isDaw = p.category === 'daw';
  const isLogic = isDaw && !!stores.official;
  const isHolly = !!stores.hollyland;
  const hollyRegion = hollyDefaultRegion();
  const hollyPick = hollyPickEntry(cfg, hollyRegion);
  const dawHasAmazon = isDaw && !isLogic && prices.amazon;
  const t = (es, en) => lang === 'es' ? es : en;
  const cartSvg = '<svg viewBox="0 0 576 512" width="1em" height="1em" fill="#fff" style="flex-shrink:0"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0-5.4 21.7c-1.1 4.5-.6 9.2 1.4 13.3L482.3 320l24 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-88 0c-30.9 0-56-25.1-56-56c0-25.9 17.6-47.6 41.5-53.9L442 128l-305.6 0c-14 26-33.1 60.1-44.4 81.5c-11 20.6-36.6 28.4-57.2 17.4c-20.6-11-28.4-36.6-17.4-57.2C35.7 133 63 82.9 74.5 61.8C83.5 45.1 100.9 34 120.8 34L96 34C82.7 34 72 23.3 72 20L0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>';
  const chevSvg = '<svg viewBox="0 0 512 512" width="1.1em" height="1.1em" fill="currentColor" style="flex-shrink:0;transition:transform .3s ease;margin-top:2px"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>';
  const order = isLogic ? [] : (dawHasAmazon ? ['amazon', 'reverb', 'zzounds', 'gear4music', 'andertons', 'musicstore'] : isDaw ? ['zzounds', 'reverb', 'andertons', 'musicstore'] : ['amazon', 'reverb', 'zzounds', 'gear4music', 'andertons', 'musicstore']);
  const naList = cfg.na || [];
  const oosList = cfg.oos || [];
  const avail = order.filter(k => naList.indexOf(k) === -1 && ((cfg.urls && cfg.urls[k]) || k === 'reverb' || stores[k]));
  const revUrl = stores.reverb || ('https://www.awin1.com/cread.php?awinmid=67144&awinaffid=2891111&ued=' + encodeURIComponent('https://reverb.com/marketplace?query=' + encodeURIComponent(p.title)));
  const storeSearch = {
    zzounds: () => 'https://www.zzounds.com/prodsearch?form=search&q=' + encodeURIComponent(p.title || '').replace(/%20/g, '+'),
    amazon: () => 'https://www.amazon.com/s?k=' + encodeURIComponent(p.title || '').replace(/%20/g, '+') + '&tag=topmusicg-20',
    reverb: () => revUrl,
    gear4music: () => 'https://www.gear4music.com/search?q=' + encodeURIComponent(p.title || ''),
    andertons: () => 'https://www.andertons.co.uk/search.php?search_query=' + encodeURIComponent(p.title || ''),
    musicstore: () => 'https://www.musicstore.com/en_OE/EUR/search?SearchText=' + encodeURIComponent(p.title || '')
  };
  const isPlugins = p.category === 'plugins';
  const storeHome = {
    zzounds: () => 'https://www.zzounds.com/a--925521/',
    amazon: () => 'https://www.amazon.com/?tag=topmusicg-20',
    reverb: () => 'https://reverb.com/',
    gear4music: () => 'https://www.gear4music.com/',
    andertons: () => 'https://www.andertons.co.uk/',
    musicstore: () => 'https://www.musicstore.com/en_OE/EUR'
  };
  const rowUrl = k => { var u = (k === 'amazon' && isPlugins) ? 'https://www.amazon.com/?tag=topmusicg-20' : ((cfg.urls && cfg.urls[k]) ? cfg.urls[k] : (k === 'reverb' ? revUrl : stores[k]) || ((oosList.indexOf(k) > -1 && storeHome[k]) ? storeHome[k]() : null)); if (!u && storeSearch[k]) u = storeSearch[k](); return wrapAffiliate(k, u); };
  var isUsa = false;
  try { var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; isUsa = tz.indexOf('America/') === 0 && (tz.indexOf('New_York') > -1 || tz.indexOf('Chicago') > -1 || tz.indexOf('Denver') > -1 || tz.indexOf('Los_Angeles') > -1 || tz.indexOf('Anchorage') > -1 || tz.indexOf('Honolulu') > -1 || tz.indexOf('Phoenix') > -1 || tz.indexOf('Detroit') > -1 || tz.indexOf('Indiana') > -1); } catch(e) {}
  const hasAmazon = !isLogic && !isPlugins && !isHolly;
  const primaryStoreKey = isHolly ? 'hollyland' : isLogic ? 'official' : isPlugins ? 'pluginboutique' : isUsa ? 'zzounds' : 'amazon';
  const pPrice = (primaryStoreKey === 'amazon') ? t('Verificar precio', 'Check price') : fmtPrice(isHolly ? (hollyPick ? hollyPick.p || '' : '') : (cfg.prices && cfg.prices[primaryStoreKey]) || prices[isLogic ? 'official' : isPlugins ? 'pluginboutique' : dawHasAmazon ? 'amazon' : isDaw ? 'gear4music' : primaryStoreKey] || '', lang, true);
  const zzoundsSearchUrl = 'https://www.zzounds.com/prodsearch?form=search&q=' + encodeURIComponent(p.title || p.name || '').replace(/%20/g, '+');
  const amazonSearchUrl = 'https://www.amazon.com/s?k=' + encodeURIComponent(p.title || p.name || '').replace(/%20/g, '+') + '&tag=topmusicg-20';
  var pUrlRaw = isLogic ? stores.official : isHolly ? (hollyPick ? hollyPick.u || '' : stores.hollyland || '') : isPlugins ? (stores.pluginboutique || stores.amazon || 'https://www.pluginboutique.com/search?q=' + encodeURIComponent(p.title || '') + '&a_aid=6a01e859cbe1a') : isUsa ? (stores.zzounds || zzoundsSearchUrl) : (stores.amazon || amazonSearchUrl);
  var pUrl = wrapAffiliate(primaryStoreKey, pUrlRaw);
  if (!pUrl) return '';
  var hollyAttrs = '';
  if (isHolly) {
    ['eu', 'us', 'uk'].forEach(function(r) {
      var he = hollyPickEntry(cfg, r);
      if (he) {
        hollyAttrs += ' data-hu-' + r + '="' + wrapAffiliate('hollyland', he.u || '') + '" data-hu-' + r + '-p="' + fmtPricePlain(he.p || '') + '"';
      }
    });
  }
  var pbAttrs = '';
  if (primaryStoreKey === 'pluginboutique' && cfg.pbCur) {
    pbAttrs = ' data-pb-eu-p="' + fmtPricePlain(prices.pluginboutique || '') + '"';
    if (cfg.pbCur.us) pbAttrs += ' data-pb-us-p="' + fmtPricePlain(cfg.pbCur.us) + '"';
    if (cfg.pbCur.uk) pbAttrs += ' data-pb-uk-p="' + fmtPricePlain(cfg.pbCur.uk) + '"';
  }
  const primaryBtn =
    '<a data-store="' + (primaryStoreKey) + '" href="' + pUrl + '"' + hollyAttrs + pbAttrs + ' target="_blank" rel="noopener noreferrer sponsored" class="shop-btn-primary" ' +
    'style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:0 16px;height:40px;border-radius:12px;' +
    'background:#3b82f6;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none;border:none;cursor:pointer;' +
    'box-shadow:0 4px 16px rgba(59,130,246,.35);transition:box-shadow .2s ease,filter .2s ease,transform .18s ease" ' +
    'onmouseover="this.style.filter=\'brightness(1.05)\'" onmouseout="this.style.filter=\'\'">' +
    '<span style="display:flex;align-items:center;gap:10px">' + cartSvg + '<span style="display:flex;align-items:center;gap:10px">' + (isLogic ? t('Tienda Oficial', 'Official Store') : t('Comprar en', 'Buy at')) + (isLogic ? '' : isHolly ? '<span style="' + SHOP_LOGO_STYLE.hollyland + '">' + SHOP_LOGO_TEXT.hollyland + '</span>' : dawHasAmazon ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:800\'><span style=\'position:relative;display:inline-block\'>Amaz' + '<svg viewBox=\'86 114 320 72\' preserveAspectRatio=\'none\' style=\'position:absolute;left:17.8%;top:100%;height:7px;width:calc(80% - 1px);margin-top:-5px\'>' + '<path fill=\'#FF9900\' d=\'m 374.00642,142.18404 c -34.99948,25.79739 -85.72909,39.56123 -129.40634,39.56123 -61.24255,0 -116.37656,-22.65135 -158.08757,-60.32496 -3.2771,-2.96252 -0.34083,-6.9999 3.59171,-4.69283 45.01431,26.19064 100.67269,41.94697 158.16623,41.94697 38.774689,0 81.4295,-8.02237 120.6499,-24.67006 5.92501,-2.51683 10.87999,3.88009 5.08607,8.17965\'/>' + '<path fill=\'#FF9900\' d=\'m 388.55678,125.53635 c -4.45688,-5.71527 -29.57261,-2.70033 -40.84585,-1.36327 -3.43442,0.41947 -3.95874,-2.56925 -0.86517,-4.71905 20.00346,-14.07844 52.82696,-10.01483 56.65462,-5.2958 3.82764,4.74526 -0.99624,37.64741 -19.79373,53.35128 -2.88385,2.41195 -5.63662,1.12734 -4.35198,-2.07113 4.2209,-10.53917 13.68519,-34.16054 9.20211,-39.90203\'/>' + '</svg></span>on</span>' : isDaw ? '<span style="' + SHOP_LOGO_STYLE.gear4music + '">' + SHOP_LOGO_TEXT.gear4music + '</span>'     : isPlugins ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:400\'>PLUG<span style=\'color:#000\'>IN</span>BOUTIQUE</span>' : (hasAmazon ? '<span style=\'font-family:Arial,Helvetica,sans-serif;font-weight:800\'><span style=\'position:relative;display:inline-block\'>Amaz' + '<svg viewBox=\'86 114 320 72\' preserveAspectRatio=\'none\' style=\'position:absolute;left:17.8%;top:100%;height:7px;width:calc(80% - 1px);margin-top:-5px\'>' + '<path fill=\'#FF9900\' d=\'m 374.00642,142.18404 c -34.99948,25.79739 -85.72909,39.56123 -129.40634,39.56123 -61.24255,0 -116.37656,-22.65135 -158.08757,-60.32496 -3.2771,-2.96252 -0.34083,-6.9999 3.59171,-4.69283 45.01431,26.19064 100.67269,41.94697 158.16623,41.94697 38.774689,0 81.4295,-8.02237 120.6499,-24.67006 5.92501,-2.51683 10.87999,3.88009 5.08607,8.17965\'/>' + '<path fill=\'#FF9900\' d=\'m 388.55678,125.53635 c -4.45688,-5.71527 -29.57261,-2.70033 -40.84585,-1.36327 -3.43442,0.41947 -3.95874,-2.56925 -0.86517,-4.71905 20.00346,-14.07844 52.82696,-10.01483 56.65462,-5.2958 3.82764,4.74526 -0.99624,37.64741 -19.79373,53.35128 -2.88385,2.41195 -5.63662,1.12734 -4.35198,-2.07113 4.2209,-10.53917 13.68519,-34.16054 9.20211,-39.90203\'/>' + '</svg></span>on</span>' : '<span style="' + (SHOP_LOGO_STYLE[primaryStoreKey]||'font-weight:700') + '">' + (SHOP_LOGO_TEXT[primaryStoreKey]||primaryStoreKey) + '</span>')) + (pPrice ? '<span>- ' + pPrice + '</span>' : '') + '</span></a>';
  const rows = order.filter(k => k !== primaryStoreKey).map(k => {
    const nm = SHOP_LOGO_TEXT[k] || storeNames[k] || k;
    const st = SHOP_LOGO_STYLE[k] || 'font-weight:700';
    const storeNotes = { zzounds: ['(Planes de pago f\u00e1ciles)', '(Easy Payment Plans)'], reverb: ['(Mercado nuevo y usado)', '(New & Used Market)'], gear4music: ['(Env\u00edos r\u00e1pidos UK)', '(Fast UK Delivery)'], andertons: ['(Soporte experto)', '(Expert Support)'], musicstore: ['(Garant\u00eda de 3 a\u00f1os)', '(3-Year Warranty)'], amazon: ['(Env\u00edo Prime)', '(Prime Delivery)'] };
    const storeNote = '';
    const ds = ' data-store="' + k + '"';
    if (naList.indexOf(k) > -1 || (!(cfg.urls && cfg.urls[k]) && k !== 'reverb' && !stores[k])) {
      const naUrl = rowUrl(k);
      return '<a' + ds + ' href="' + naUrl + '" target="_blank" rel="noopener noreferrer sponsored" style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:8px 16px;min-height:40px;height:auto;flex-wrap:wrap;row-gap:2px;border-radius:12px;background:#262626;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none"><span style="white-space:nowrap;flex-shrink:0;' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span>' + storeNote + ((k === 'amazon' || k === 'reverb') ? '<span style="margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic">' + t('Verificar precio', 'Check price') + '</span>' : '') + '</a>';
    }
    if (oosList.indexOf(k) > -1 || (k !== 'reverb' && !prices[k] && stores[k])) {
      const oosPrice = (k === 'amazon') ? '<span style="margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic">' + t('Verificar precio', 'Check price') + '</span>' : ((cfg.prices && cfg.prices[k]) && !(k === 'amazon' && isPlugins)) ? '<span style="margin-left:auto;display:flex;align-items:baseline;gap:6px;white-space:nowrap;flex-shrink:0"><span style="font-weight:700;color:#a8a8a8">' + fmtPrice(cfg.prices[k], lang) + '</span></span>' : '';
      return '<a' + ds + ' href="' + rowUrl(k) + '" target="_blank" rel="noopener noreferrer sponsored" style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:8px 16px;min-height:40px;height:auto;flex-wrap:wrap;row-gap:2px;border-radius:12px;background:#262626;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none"><span style="white-space:nowrap;flex-shrink:0;' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span>' + storeNote + oosPrice + '</a>';
    }
    const pr = (k === 'amazon') ? '<span style="margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic">' + t('Verificar precio', 'Check price') + '</span>' : (k === 'amazon' && isPlugins) ? '' : (k === 'reverb') ? '<span style="margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic">' + t('Verificar precio', 'Check price') + '</span>' : (prices[k] ? '<span style="margin-left:auto;display:flex;align-items:baseline;gap:6px;white-space:nowrap;flex-shrink:0">' + '<span style="font-weight:700;color:#fff">' + fmtPrice(prices[k], lang) + '</span></span>' : '');
    return '<a' + ds + ' href="' + rowUrl(k) + '" target="_blank" rel="noopener noreferrer sponsored" ' +
      'style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:8px 16px;min-height:40px;height:auto;flex-wrap:wrap;row-gap:2px;border-radius:12px;background:#333333;transition:transform .18s ease,background .18s ease,box-shadow .18s ease;' +
      'color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;border:none"><span style="white-space:nowrap;flex-shrink:0;' + st + '">' + (SHOP_FLAG[k] ? SHOP_FLAG[k]() : '') + nm + '</span>' + storeNote + pr + '</a>';
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
  function tmgIsEsDoc() { return (document.documentElement.lang || 'en').indexOf('es') === 0; }
  function tmgPriceHtml(plain, primary) {
    if (!plain) return '';
    var lab = tmgIsEsDoc() ? 'Aprox.' : 'Approx.';
    var col = primary ? '#ffffff' : '#a8a8a8';
    return '<span class="shop-price" data-price="' + plain + '"><span style="font-size:12px;font-weight:600;color:' + col + ';font-style:italic">' + lab + '</span> ' + plain + '</span>';
  }
  function doSwap(T) {
    document.querySelectorAll('.guide-product-card-stores, .guide-section-buy, .shop-buttons-wrap').forEach(function(c) {
      var pb = c.querySelector('.shop-btn-primary');
      if (!pb) return;
      var curStore = pb.getAttribute('data-store') || '';
      if (curStore === 'pluginboutique') {
        var pbReg = (T === 'musicstore') ? 'eu' : (T === 'gear4music') ? 'uk' : 'us';
        var pbP = pb.getAttribute('data-pb-' + pbReg + '-p');
        if (pbP) {
          var pbPE = pb.querySelector('.shop-price');
          if (pbPE) pbPE.outerHTML = tmgPriceHtml(pbP, true);
          else pb.innerHTML = pb.innerHTML.replace(/- [£$€][0-9.,]+/, '- ' + tmgPriceHtml(pbP, true));
        }
        return;
      }
      if (curStore === 'hollyland') {
        var hr = (T === 'musicstore') ? 'eu' : (T === 'gear4music') ? 'uk' : 'us';
        var hu = pb.getAttribute('data-hu-' + hr);
        if (hu) {
          pb.setAttribute('href', hu);
          var hp = pb.getAttribute('data-hu-' + hr + '-p');
          if (hp) {
            var hpEl = pb.querySelector('.shop-price');
            if (hpEl) hpEl.outerHTML = tmgPriceHtml(hp, true);
            else pb.innerHTML = pb.innerHTML.replace(/- [£$€][0-9.,]+/, '- ' + tmgPriceHtml(hp, true));
          }
        }
        return;
      }
      var tmgCheckLabel = tmgIsEsDoc() ? 'Verificar precio' : 'Check price';
      if (curStore === T || curStore === 'msdirect') return;
      var zRow = c.querySelector('[data-store="' + T + '"]');
      if (!zRow) return;
      if (!zRow.getAttribute('href')) return;
      var ml2 = c.querySelector('.shop-more-list');
      var zUrl = zRow.getAttribute('href');
      var zAff = zRow.getAttribute('data-aff');
      var zAffAttr = zAff ? ' data-aff="' + zAff + '"' : '';
      var zPriceEl = zRow.querySelector('.shop-price');
      var zPlain = zPriceEl ? zPriceEl.getAttribute('data-price') : '';
      var zPriceHtml = zPlain ? tmgPriceHtml(zPlain, true) : (T === 'amazon' ? '<span style="margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic">' + tmgCheckLabel + '</span>' : '');
      var aUrl = pb.getAttribute('href');
      var aAff = pb.getAttribute('data-aff');
      var aAffAttr = aAff ? ' data-aff="' + aAff + '"' : '';
      var newPrimary = '<a href="' + zUrl + '"' + zAffAttr + ' target="_blank" rel="noopener noreferrer sponsored" class="shop-btn-primary" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:0 16px;height:40px;border-radius:12px;background:#3b82f6;color:#fff;font-size:15px;font-weight:800;text-decoration:none;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(59,130,246,.35);transition:box-shadow .2s ease,filter .2s ease,transform .18s ease" onmouseover="this.style.filter=\'brightness(1.05)\'" onmouseout="this.style.filter=\'\'"><span style="display:flex;align-items:center;gap:10px"><svg viewBox="0 0 576 512" width="1em" height="1em" fill="#fff" style="flex-shrink:0"><path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0-5.4 21.7c-1.1 4.5-.6 9.2 1.4 13.3L482.3 320l24 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-88 0c-30.9 0-56-25.1-56-56c0-25.9 17.6-47.6 41.5-53.9L442 128l-305.6 0c-14 26-33.1 60.1-44.4 81.5c-11 20.6-36.6 28.4-57.2 17.4c-20.6-11-28.4-36.6-17.4-57.2C35.7 133 63 82.9 74.5 61.8C83.5 45.1 100.9 34 120.8 34L96 34C82.7 34 72 23.3 72 20L0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg><span style="display:flex;align-items:center;gap:10px">Buy at<span style="' + (SHOP_LOGO_STYLE[T] || 'font-weight:700') + '">' + (SHOP_LOGO_TEXT[T] || T) + '</span>' + (zPriceHtml ? ' - ' + zPriceHtml : '') + '</span></span></a>';
      zRow.style.display = 'none';
      pb.insertAdjacentHTML('beforebegin', newPrimary);
      pb.remove();
      if (ml2) { var existing = ml2.querySelector('[data-store="' + curStore + '"]'); if (existing) existing.remove(); if (!ml2.querySelector('[data-store="' + curStore + '"]')) {
        var dispEl = pb.querySelector('.shop-price');
        var dispPlain = dispEl ? dispEl.getAttribute('data-price') : '';
        var dispPriceSpan = curStore === 'amazon' ? '<span style="margin-left:auto;font-size:12px;font-weight:600;color:#a8a8a8;font-style:italic">' + tmgCheckLabel + '</span>' : (dispPlain ? '<span style="margin-left:auto;display:flex;align-items:baseline;gap:6px;white-space:nowrap;flex-shrink:0"><span style="font-weight:700;color:#fff">' + tmgPriceHtml(dispPlain) + '</span></span>' : '');
        var dispNotes = { zzounds: ['(Planes de pago fáciles)', '(Easy Payment Plans)'], reverb: ['(Mercado nuevo y usado)', '(New & Used Market)'], gear4music: ['(Envíos rápidos UK)', '(Fast UK Delivery)'], andertons: ['(Soporte experto)', '(Expert Support)'], musicstore: ['(Garantía de 3 años)', '(3-Year Warranty)'], amazon: ['(Envío Prime)', '(Prime Delivery)'] };
        var isEsPage = tmgIsEsDoc();
        var dispNm = SHOP_LOGO_TEXT[curStore] || curStore;
        var dispSt = SHOP_LOGO_STYLE[curStore] || 'font-weight:700';
        var dispFlag = SHOP_FLAG[curStore] ? SHOP_FLAG[curStore]() : '';
        var dispNote = '';
        var dispRow = '<a data-store="' + curStore + '" href="' + aUrl + '"' + aAffAttr + ' target="_blank" rel="noopener noreferrer sponsored" style="width:100%;box-sizing:border-box;flex:none;min-height:40px;display:flex;align-items:center;gap:8px;padding:8px 16px;min-height:40px;height:auto;flex-wrap:wrap;row-gap:2px;border-radius:12px;background:#333333;transition:transform .18s ease,background .18s ease,box-shadow .18s ease;color:#ffffff;text-decoration:none;font-size:15px;font-weight:800;border:none"><span style="display:flex;align-items:center">' + dispFlag + '<span style="white-space:nowrap;flex-shrink:0;' + dispSt + '">' + dispNm + '</span></span>' + dispNote + dispPriceSpan + '</a>';
        ml2.insertAdjacentHTML('afterbegin', dispRow);
      }
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
    if (T === 'none') T = 'amazon';
    if (!T) return;
    try { window.__tmgGeoDone = T; } catch (e) {}
    doSwap(T);
    var ev = null;
    try { ev = window.__tmgGeoHandlers; } catch (e) {}
    if (ev) {
      for (var i = 0; i < ev.length; i++) { try { ev[i](T); } catch (e) {} }
      ev.length = 0;
    }
  }
  function geoZone(c) {
    var MS = {'AT':1,'BE':1,'BA':1,'BG':1,'HR':1,'CZ':1,'DK':1,'EE':1,'FI':1,'FR':1,'DE':1,'GR':1,'HU':1,'IE':1,'IT':1,'LV':1,'LT':1,'LU':1,'NL':1,'NO':1,'PL':1,'PT':1,'RO':1,'RU':1,'RS':1,'SI':1,'ZA':1,'ES':1,'SE':1,'CH':1,'TR':1};
    c = (c || '').toUpperCase();
    return c === 'US' ? 'zzounds' : c === 'GB' ? 'gear4music' : MS[c] ? 'musicstore' : 'none';
  }
  window.tmgGeoSwap = function() {
    try { if (window.__tmgGeoResolved) { applyNow(window.__tmgGeoResolved); return; } } catch (e) {}
    var q = quickTarget();
    if (q) applyNow(q);
    if (window.__tmgGeoPending) return;
    try { window.__tmgGeoPending = 1; } catch (e) {}
    function finish(cc) {
      if (!cc) return;
      cc = (cc + '').toUpperCase();
      if (cc === 'XX') return;
      try { if (window.__tmgGeoResolved) return; } catch (e) {}
      var t = geoZone(cc);
      try { window.__tmgGeoResolved = t; } catch (e) {}
      applyNow(t);
    }
    function clearPending() { try { window.__tmgGeoPending = 0; } catch (e) {} }
    function tryTrace() {
      try { if (window.__tmgGeoResolved) { clearPending(); return; } } catch (e) {}
      var x = new XMLHttpRequest();
      x.open('GET', 'https://1.1.1.1/cdn-cgi/trace', true);
      x.timeout = 4000;
      x.onload = function() {
        try {
          var m = /(?:^|\n)loc=(\S+)/.exec(x.responseText);
          if (m && m[1]) finish(m[1]);
        } catch (e) {}
        clearPending();
      };
      x.onerror = x.ontimeout = function() { clearPending(); };
      x.send();
    }
    var y = new XMLHttpRequest();
    y.open('GET', 'https://ipinfo.io/json', true);
    y.timeout = 4000;
    y.onload = function() {
      try {
        var r = JSON.parse(y.responseText);
        if (r && r.country) finish(r.country);
      } catch (e) {}
      tryTrace();
    };
    y.onerror = y.ontimeout = function() { tryTrace(); };
    y.send();
  };
})();
