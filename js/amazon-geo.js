/* TopMusicianGear - Amazon geo link localizer */
(function () {
  'use strict';
  var ORIGIN = 'https://www.amazon.com/';
  var DOM = {
    GB: 'https://www.amazon.co.uk/', IE: 'https://www.amazon.co.uk/',
    DE: 'https://www.amazon.de/', AT: 'https://www.amazon.de/', CH: 'https://www.amazon.de/', LI: 'https://www.amazon.de/', LU: 'https://www.amazon.de/',
    FR: 'https://www.amazon.fr/', BE: 'https://www.amazon.fr/',
    ES: 'https://www.amazon.es/', IT: 'https://www.amazon.it/',
    NL: 'https://www.amazon.nl/', PL: 'https://www.amazon.pl/', SE: 'https://www.amazon.se/',
    NO: 'https://www.amazon.de/', FI: 'https://www.amazon.de/', DK: 'https://www.amazon.de/', IS: 'https://www.amazon.de/',
    JP: 'https://www.amazon.co.jp/', CA: 'https://www.amazon.ca/',
    AU: 'https://www.amazon.com.au/', IN: 'https://www.amazon.in/',
    MX: 'https://www.amazon.com.mx/', BR: 'https://www.amazon.com.br/',
    AE: 'https://www.amazon.ae/', SA: 'https://www.amazon.sa/', SG: 'https://www.amazon.sg/'
  };
  var TZ = {
    'Europe/London': 'GB', 'Europe/Dublin': 'IE', 'Europe/Belfast': 'GB',
    'Europe/Berlin': 'DE', 'Europe/Vienna': 'AT', 'Europe/Zurich': 'CH', 'Europe/Luxembourg': 'LU',
    'Europe/Paris': 'FR', 'Europe/Brussels': 'BE',
    'Europe/Madrid': 'ES', 'Europe/Rome': 'IT', 'Europe/Amsterdam': 'NL',
    'Europe/Warsaw': 'PL', 'Europe/Stockholm': 'SE',
    'Europe/Oslo': 'NO', 'Europe/Helsinki': 'FI', 'Europe/Copenhagen': 'DK', 'Atlantic/Reykjavik': 'IS',
    'Asia/Tokyo': 'JP',
    'America/Toronto': 'CA', 'America/Vancouver': 'CA', 'America/Edmonton': 'CA', 'America/Winnipeg': 'CA', 'America/Halifax': 'CA',
    'Australia/Sydney': 'AU', 'Australia/Melbourne': 'AU', 'Australia/Brisbane': 'AU', 'Australia/Perth': 'AU', 'Australia/Adelaide': 'AU',
    'Asia/Kolkata': 'IN', 'Asia/Calcutta': 'IN',
    'America/Mexico_City': 'MX', 'America/Sao_Paulo': 'BR',
    'Asia/Dubai': 'AE', 'Asia/Riyadh': 'SA', 'Asia/Singapore': 'SG'
  };
  var base = null;
  function detectCountry() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz && TZ[tz]) return TZ[tz];
    } catch (e) {}
    var langs = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < langs.length; i++) {
      var m = /[-_]([A-Z]{2})\b/.exec(langs[i]);
      if (m && DOM[m[1]]) return m[1];
    }
    return null;
  }
  function fixLink(a) {
    var h = a.getAttribute('href') || '';
    if (h.lastIndexOf(ORIGIN, 0) !== 0) return;
    var nh = base + h.slice(ORIGIN.length);
    if (nh !== h) a.setAttribute('href', nh);
  }
  function scan(root) {
    var links = (root || document).querySelectorAll('a[href^="' + ORIGIN + '"]');
    for (var i = 0; i < links.length; i++) fixLink(links[i]);
  }
  function init() {
    var c = detectCountry();
    if (!c) return;
    base = DOM[c];
    scan(document);
    if (window.MutationObserver) {
      var mo = new MutationObserver(function (muts) {
        for (var i = 0; i < muts.length; i++) {
          var added = muts[i].addedNodes;
          for (var j = 0; j < added.length; j++) {
            var n = added[j];
            if (n.nodeType !== 1) continue;
            if (n.tagName === 'A') fixLink(n);
            else if (n.querySelectorAll) scan(n);
          }
        }
      });
      mo.observe(document.documentElement, { childList: true, subtree: true });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
