(function () {
  // Defers redirect-based affiliate links so crawlers/bots see only the clean
  // store href, while a REAL user click restores the redirect (commission-
  // preserving). The affiliate URL is kept out of the rendered href and stored
  // in data-aff, restored at interaction time.
  //
  // Covers the redirect-based networks (each redirect counts every visit as a
  // click -> crawlers following the href generate ghost clicks):
  //   - Impact/pxf Andertons     andertonsmusiccompany.pxf.io ... ?u=<clean>
  //   - Awin gear4music/musicstore/reverb  awin1.com/cread.php ... &ued=<clean>
  //   - CJ zZounds               anrdoezrs.net/click-... ... ?url=<clean>
  // Tag-based networks (Amazon ?tag=, Plugin Boutique ?a_aid=) are NOT deferred:
  // they attribute via cookie, no click counting, so nothing to clean.
  //
  // Two mechanisms:
  //  1) Handles links already in statically transformed HTML (they have
  //     data-aff + clean href already; restores on interaction).
  //  2) MutationObserver: catches <a href="<affiliate...>"> that the SPA creates
  //     at runtime (home product cards, geo-swap re-renders, deals reloads) and
  //     converts them to clean href + data-aff on the fly, so the DOM exposed
  //     to crawlers never contains an affiliate redirect in an href.
  if (window.__tmgAffDefer) return;
  window.__tmgAffDefer = true;

  function cleanFromRedirect(aff) {
    try {
      if (aff.indexOf('andertonsmusiccompany.pxf.io') !== -1) {
        var uq = aff.match(/[?&]u=([^&]+)/);
        if (uq && uq[1]) {
          var clean = decodeURIComponent(uq[1]);
          if (/^https:\/\/www\.andertons\.co\.uk\//.test(clean)) return clean;
        }
      } else if (aff.indexOf('awin1.com/cread.php') !== -1) {
        var uq2 = aff.match(/ued=([^&]+)/);
        if (uq2 && uq2[1]) {
          var clean2 = decodeURIComponent(uq2[1]);
          if (/^https:\/\/(?:www\.)?(?:gear4music\.com|musicstore\.com|reverb\.com)\//.test(clean2)) return clean2;
        }
      } else if (aff.indexOf('anrdoezrs.net/click-') !== -1) {
        var uq3 = aff.match(/url=([^&]+)/);
        if (uq3 && uq3[1]) {
          var clean3 = decodeURIComponent(uq3[1]);
          if (/^https:\/\/www\.zzounds\.com\//.test(clean3)) return clean3;
        }
      }
    } catch (e) {}
    return null;
  }

  function isAffiliateHref(href) {
    if (!href) return false;
    return href.indexOf('andertonsmusiccompany.pxf.io') !== -1 ||
      href.indexOf('awin1.com/cread.php') !== -1 ||
      href.indexOf('anrdoezrs.net/click-') !== -1;
  }

  function deferAnchor(a) {
    // convert <a href="<affiliate>"> -> href=clean, data-aff=<affiliate>
    var href = a.getAttribute('href') || '';
    if (a.getAttribute('data-aff')) return; // already deferred
    if (!isAffiliateHref(href)) return;
    var clean = cleanFromRedirect(href);
    if (!clean) return;
    a.setAttribute('data-aff', href);
    a.setAttribute('href', clean);
  }

  function scanRoot(root) {
    if (!root || !root.querySelectorAll) return;
    var links = root.querySelectorAll('a[href*="andertonsmusiccompany.pxf.io"], a[href*="awin1.com/cread.php"], a[href*="anrdoezrs.net/click-"]');
    for (var i = 0; i < links.length; i++) deferAnchor(links[i]);
  }

  function closestAnchor(el) {
    var n = el;
    while (n && n.tagName !== 'A') n = n.parentNode;
    return n && n.tagName === 'A' ? n : null;
  }

  function restore(a) {
    var aff = a.getAttribute('data-aff');
    if (!aff) return false;
    var href = a.getAttribute('href') || '';
    if (isAffiliateHref(href)) return false; // already restored
    a.setAttribute('href', aff);
    return true;
  }

  scanRoot(document);

  // Watch for SPA-generated links (home product cards, geo-swap, deals reload)
  if (window.MutationObserver) {
    var mo = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var added = muts[i].addedNodes;
        if (!added) continue;
        for (var j = 0; j < added.length; j++) {
          var n = added[j];
          if (n.nodeType === 1) {
            if (n.tagName === 'A') deferAnchor(n);
            else if (n.querySelectorAll) scanRoot(n);
          }
        }
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }

  document.addEventListener('mousedown', function (ev) {
    var a = closestAnchor(ev.target);
    if (!a) return;
    if (a.getAttribute('data-aff')) restore(a);
  }, true);

  document.addEventListener('click', function (ev) {
    var a = closestAnchor(ev.target);
    if (!a) return;
    if (!a.getAttribute('data-aff')) return;
    restore(a);
  }, true);
})();