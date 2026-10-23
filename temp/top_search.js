/* Top-bar search */
(function() {
  var toggle = document.getElementById('topSearchToggle');
  var drop = document.getElementById('topSearchDrop');
  var input = document.getElementById('topSearchInput');
  var results = document.getElementById('topSearchResults');
  var closeBtn = document.getElementById('topSearchClose');
  var goBtn = document.getElementById('topSearchGo');
  if (!toggle || !drop || !input) return;

  function onGuide() { return !!document.querySelector('.guide-detail'); }

  function close() { drop.hidden = true; }

  var scrolling = false;
  window.addEventListener('scroll', function() {
    scrolling = true;
    // close the search dropdown on scroll, but keep the top bar visible
    if (drop && !drop.hidden) drop.hidden = true;
    clearTimeout(window._topSearchScrollTimer);
    window._topSearchScrollTimer = setTimeout(function() { scrolling = false; }, 200);
  }, { passive: true });

  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    drop.hidden = !drop.hidden;
    if (!drop.hidden) input.focus();
  });
  if (closeBtn) closeBtn.addEventListener('click', function(e) { e.stopPropagation(); close(); });
  document.addEventListener('click', function(e) {
    if (scrolling) return;
    if (!drop.contains(e.target) && e.target !== toggle) close();
  });

  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function highlight(q) {
    var root = document.querySelector('.guide-detail');
    if (!root) return;
    var marks = root.querySelectorAll('mark.guide-search-hit');
    marks.forEach(function(m) { var p = m.parentNode; if (p) p.replaceChild(document.createTextNode(m.textContent), m); });
    try { root.normalize(); } catch (e) {}
    if (!q || q.length < 2) return;
    var re = new RegExp(esc(q), 'gi');
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function(node) {
      var text = node.nodeValue;
      re.lastIndex = 0;
      if (!re.test(text)) return;
      re.lastIndex = 0;
      var frag = document.createDocumentFragment();
      var last = 0, m;
      while ((m = re.exec(text)) !== null) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        var mark = document.createElement('mark');
        mark.className = 'guide-search-hit';
        mark.textContent = m[0];
        frag.appendChild(mark);
        last = m.index + m[0].length;
        if (m[0].length === 0) { re.lastIndex++; }
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      if (node.parentNode) node.parentNode.replaceChild(frag, node);
    });
  }

  function scrollToFirst() {
    var root = document.querySelector('.guide-detail');
    if (!root) return;
    var hits = root.querySelectorAll('mark.guide-search-hit');
    if (hits.length) {
      setTimeout(function() {
        var freshHits = root.querySelectorAll('mark.guide-search-hit');
        if (!freshHits.length) return;
        var header = document.querySelector('header');
        var headerH = header ? header.offsetHeight : 64;
        var rect = freshHits[0].getBoundingClientRect();
        var targetY = window.scrollY + rect.top - headerH - 16;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
        freshHits[0].classList.add('guide-search-hit--active');
      }, 150);
    }
  }

  function searchHome(q) {
    if (!results) return;
    results.innerHTML = '';
    if (!q || q.length < 2) return;
    var list = (window.guides || []);
    var ql = q.toLowerCase();
    var matches = list.filter(function(g) {
      var t = (g.title || '') + ' ' + (g.title_es || '') + ' ' + (g.category || '');
      return t.toLowerCase().indexOf(ql) !== -1;
    }).slice(0, 10);
    matches.forEach(function(g) {
      var a = document.createElement('a');
      a.className = 'top-search-item';
      var title = (document.documentElement.lang === 'es' && g.title_es) ? g.title_es : g.title;
      a.textContent = title;
      a.href = (document.documentElement.lang === 'es' ? '/guides/' + g.id + '_es.html' : '/guides/' + g.id + '.html');
      results.appendChild(a);
    });
    if (!matches.length) {
      var span = document.createElement('span');
      span.className = 'top-search-item';
      span.textContent = 'No results';
      results.appendChild(span);
    }
  }

  input.addEventListener('input', function() {
    var q = input.value.trim();
    if (onGuide()) {
      highlight(q);
    } else {
      clearTimeout(window._tsTimer);
      window._tsTimer = setTimeout(function() { searchHome(q); }, 200);
    }
  });
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var q = input.value.trim();
      if (onGuide()) { highlight(q); scrollToFirst(); }
      else searchHome(q);
    }
  });
  if (goBtn) goBtn.addEventListener('click', function(e) {
    e.preventDefault();
    var q = input.value.trim();
    if (onGuide()) { highlight(q); scrollToFirst(); }
    else searchHome(q);
  });
})();