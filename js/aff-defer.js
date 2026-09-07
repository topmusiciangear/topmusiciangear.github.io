(function () {
  // Defers Andertons Impact affiliate links so crawlers/bots see only the clean
  // andertons.co.uk href, while a REAL user click restores the pxf.io redirect
  // (commission-preserving). The pxf.io URL is kept out of the rendered href
  // and stored in data-aff, restored at interaction time.
  //
  // Two mechanisms:
  //  1) Handles links already in the HTML statically transformed by
  //     temp/defere-aff.js (they have data-aff + clean href already).
  //  2) MutationObserver: catches <a href="pxf..."> that the SPA creates at
  //     runtime (home product cards, geo-swap re-renders, deals reloads) and
  //     converts them to clean href + data-aff on the fly, so the DOM exposed
  //     to crawlers never contains pxf.io in an href.
  if (window.__tmgAffDefer) return;
  window.__tmgAffDefer = true;

  function cleanFromPxf(pxf) {
    try {
      var uq = pxf.match(/[?&]u=([^&]+)/);
      if (uq && uq[1]) {
        var clean = decodeURIComponent(uq[1]);
        if (/^https:\/\/www\.andertons\.co\.uk\//.test(clean)) return clean;
      }
    } catch (e) {}
    return null;
  }

  function deferAnchor(a) {
    // convert <a href="pxf..."> -> href=clean, data-aff=pxf
    var href = a.getAttribute('href') || '';
    if (a.getAttribute('data-aff')) return; // already deferred
    if (href.indexOf('andertonsmusiccompany.pxf.io') === -1) return;
    var clean = cleanFromPxf(href);
    if (!clean) return;
    a.setAttribute('data-aff', href);
    a.setAttribute('href', clean);
  }

  function scanRoot(root) {
    if (!root || !root.querySelectorAll) return;
    var links = root.querySelectorAll('a[href*="andertonsmusiccompany.pxf.io"]');
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
    if (href.indexOf('andertonsmusiccompany.pxf.io') !== -1) return false;
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
    var href = a.getAttribute('href') || '';
    if (href.indexOf('andertonsmusiccompany.pxf.io') !== -1) return;
    restore(a);
  }, true);
})();
