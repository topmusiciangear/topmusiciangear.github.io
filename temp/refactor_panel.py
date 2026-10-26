p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

old = """          quickFactsHtml = '<div class="guide-section-quickfacts" style="min-width:0;display:grid;grid-template-rows:repeat(4,1fr);gap:4px">' +
            '<div style="' + _cardBase + 'flex:1 1 0;min-height:0">' +
              '<div style="font-size:8px;color:#4d8dff;letter-spacing:.04em;text-transform:uppercase;font-weight:600">' + _bfl + '</div>' +
              '<div style="font-size:10px;font-weight:600;color:#fff;line-height:1.1">' + _bf + '</div>' +
            '</div>' +
            firstProduct.facts.map(function (f) {
              const lbl = isEs ? (f.label && f.label.es) : (f.label && f.label.en);
              const col = f.tone === 'tradeoff' ? '#f5a524' : '#4ade80';
              return '<div style="' + _cardBase + 'flex:1 1 0;min-height:0;flex-direction:row;align-items:center;gap:6px;padding:4px 8px">' +
                '<span style="width:16px;height:16px;flex-shrink:0;color:' + col + ';display:flex;align-items:center;justify-content:center">' + _qfIcon(f.icon, col) + '</span>' +
                '<div style="display:flex;flex-direction:column;gap:0;min-width:0">' +
                  '<div style="font-size:10px;font-weight:600;color:#fff;line-height:1.1">' + (f.value || '') + '</div>' +
                  '<div style="font-size:8px;color:#9aa0ab;line-height:1.1">' + (lbl || '') + '</div>' +
                '</div>' +
              '</div>';
            }).join('') +
          '</div>';"""

new = """          quickFactsHtml = '<div class="guide-section-quickfacts">' +
            '<div class="qf-card qf-bestfor">' +
              '<div class="qf-label">' + _bfl + '</div>' +
              '<div class="qf-value">' + _bf + '</div>' +
            '</div>' +
            firstProduct.facts.map(function (f) {
              const lbl = isEs ? (f.label && f.label.es) : (f.label && f.label.en);
              const col = f.tone === 'tradeoff' ? '#f5a524' : '#4ade80';
              return '<div class="qf-card qf-fact">' +
                '<span class="qf-icon" style="color:' + col + '">' + _qfIcon(f.icon, col) + '</span>' +
                '<div class="qf-text">' +
                  '<div class="qf-value">' + (f.value || '') + '</div>' +
                  '<div class="qf-label">' + (lbl || '') + '</div>' +
                '</div>' +
              '</div>';
            }).join('') +
          '</div>';"""

assert src.count(old) == 1, src.count(old)
src = src.replace(old, new, 1)

# Now add CSS for .guide-section-quickfacts and children to the injected style tag.
# Find the injected style tag end (the one with shop-wm)
cssneedle = 'shop-wm{transition:color .18s ease}.shop-more-list a:hover .shop-wm{color:#FFB300}}'
ci = src.find(cssneedle)
assert ci >= 0
oldcss = cssneedle + '</style>'
newcss = cssneedle + '</style><style>' + \
  '.guide-section-quickfacts{flex:0 0 120px;width:120px;height:120px;min-width:0;background:transparent;display:grid;grid-template-rows:repeat(4,1fr);gap:3px;align-self:stretch;box-sizing:border-box;overflow:hidden}' + \
  '@media(min-width:901px){.guide-section-quickfacts{flex:0 0 160px;width:160px;height:160px;gap:4px}}' + \
  '.qf-card{background:#22252c;border-radius:8px;padding:4px 6px;box-sizing:border-box;overflow:hidden;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:1px}' + \
  '.qf-fact{flex-direction:row;align-items:center;gap:5px;padding:3px 6px}' + \
  '.qf-label{font-size:8px;color:#4d8dff;letter-spacing:.04em;text-transform:uppercase;font-weight:600;line-height:1.1}' + \
  '.qf-value{font-size:10px;font-weight:600;color:#fff;line-height:1.1}' + \
  '.qf-text{display:flex;flex-direction:column;gap:0;min-width:0}' + \
  '.qf-icon{width:14px;height:14px;flex-shrink:0;display:flex;align-items:center;justify-content:center}' + \
  '@media(min-width:901px){.qf-card{padding:6px 8px;gap:2px}.qf-label{font-size:9px}.qf-value{font-size:11px}.qf-fact{padding:4px 8px;gap:6px}.qf-icon{width:16px;height:16px}}' + \
  '@media(max-width:900px){.guide-section-mediabuy .guide-section-img,.guide-section-mediabuy .guide-video-thumb{width:120px;height:120px}}' + \
  '</style>'
assert src.count(oldcss) == 1
src = src.replace(oldcss, newcss, 1)

open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
