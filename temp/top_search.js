/* Top-bar search */
(function() {
  var toggle = document.getElementById('topSearchToggle');
  var drop = document.getElementById('topSearchDrop');
  var input = document.getElementById('topSearchInput');
  var results = document.getElementById('topSearchResults');
  if (!toggle || !drop || !input) return;

  function isGuidePage() { return !!document.getElementById('guideSearch') === false && !!document.querySelector('.guide-detail'); }
  // Actually detect guide page by presence of guide-detail
  function onGuide() { return !!document.querySelector('.guide-detail'); }

  function close() { drop.hidden = true; }

  toggle.addEventListener('click', function(e) {
    e.stopPropagation();
    drop.hidden = !drop.hidden;
    if (!drop.hidden) input.focus();
  });
  document.addEventListener('click', function(e) {
    if (!drop.contains(e.target) && e.target !== toggle) close();
  });

  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  // In-page highlight for guides
  function highlight(q) {
    var root = document.querySelector('.guide-detail');
    if (!root) return;
    // clear previous
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
    var hits = root.querySelectorAll('mark.guide-search-hit');
    if (hits.length && hits[0].scrollIntoView) {
      hits[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Home: show matching guides
  function searchHome(q) {
    if (!results) return;
    results.innerHTML = '';
    if (!q || q.length < 2) return;
    var list = (window.guides || []);
    var ql = q.toLowerCase();
    var matches = list.filter(function(g) {
      var t = (g.title || '') + ' ' + (g.title_es || '') + ' ' + (g.category || '');
      return t.toLowerCase().indexOf(ql) !== -1;
    }).slice(0, 8);
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

  var timer;
  input.addEventListener('input', function() {
    var q = input.value.trim();
    clearTimeout(timer);
    timer = setTimeout(function() {
      if (onGuide()) {
        highlight(q);
      } else {
        searchHome(q);
      }
    }, 300);
  });
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      var q = input.value.trim();
      if (onGuide()) highlight(q);
      else searchHome(q);
    }
  });
})();