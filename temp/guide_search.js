/* Guide in-page search */
(function() {
  var input = document.getElementById('guideSearch');
  if (!input) return;
  var root = document.querySelector('.guide-detail') || document.body;
  function clear() {
    var marks = root.querySelectorAll('mark.guide-search-hit');
    marks.forEach(function(m) {
      var p = m.parentNode;
      if (p) p.replaceChild(document.createTextNode(m.textContent), m);
    });
    try { root.normalize(); } catch (e) {}
  }
  function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function search(q) {
    clear();
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
    if (hits.length) {
      hits[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
      hits[0].classList.add('guide-search-hit--active');
    }
  }
  var timer;
  input.addEventListener('input', function() {
    clearTimeout(timer);
    timer = setTimeout(function() { search(input.value.trim()); }, 300);
  });
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); search(input.value.trim()); }
  });
})();