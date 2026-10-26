p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

old = '''        if (firstProduct.bestFor && firstProduct.facts && firstProduct.facts.length) {
          const _bf = (isEs ? firstProduct.bestFor.es : firstProduct.bestFor.en) || '';
          const _bfl = isEs ? 'Ideal para' : 'Best for';
          quickFactsHtml = '<div style="flex:0 0 160px;width:160px;height:160px;min-width:0;background:#22252c;border-radius:8px;padding:6px;box-sizing:border-box;display:flex;flex-direction:column;gap:2px;overflow:hidden">' +
            '<div style="font-size:10px;color:#4d8dff;letter-spacing:.04em;text-transform:uppercase;font-weight:600">' + _bfl + '</div>' +
            '<div style="font-size:12px;font-weight:500;color:#fff;line-height:1.3">' + _bf + '</div>' +
            firstProduct.facts.map(function (f) {
              const lbl = isEs ? (f.label && f.label.es) : (f.label && f.label.en);
              const col = f.tone === 'tradeoff' ? '#f5a524' : '#4ade80';
              return '<div style="display:flex;gap:6px;align-items:center">' +
                '<span style="width:16px;height:16px;flex-shrink:0;color:' + col + ';display:flex;align-items:center;justify-content:center">' + icon(f.icon, 'fa-solid') + '</span>' +
                '<div style="display:flex;flex-direction:column;gap:1px;min-width:0">' +
                  '<div style="font-size:12px;font-weight:500;color:#fff;line-height:1.2">' + (f.value || '') + '</div>' +
                  '<div style="font-size:10px;color:#9aa0ab;line-height:1.2">' + (lbl || '') + '</div>' +
                '</div>' +
              '</div>';
            }).join('') +
          '</div>';
        }'''

new = '''        if (firstProduct.bestFor && firstProduct.facts && firstProduct.facts.length) {
          const _bf = (isEs ? firstProduct.bestFor.es : firstProduct.bestFor.en) || '';
          const _bfl = isEs ? 'Ideal para' : 'Best for';
          function _qfIcon(name, color) {
            if (name === 'sineWave') {
              return '<svg viewBox="0 0 24 16" width="16" height="16" fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round"><path d="M1 8 C 4 2, 7 2, 10 8 S 16 14, 19 8 S 22 2, 23 8"/></svg>';
            }
            if (name === 'gauge') {
              return '<svg viewBox="0 0 24 16" width="16" height="16" fill="none" stroke="' + color + '" stroke-width="2" stroke-linecap="round"><path d="M3 14 A 9 9 0 0 1 21 14"/><line x1="12" y1="14" x2="17" y2="6" stroke-width="2"/></svg>';
            }
            return icon(name, 'fa-solid');
          }
          const _cardBase = 'background:#22252c;border-radius:8px;padding:6px 8px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;gap:2px;overflow:hidden;';
          quickFactsHtml = '<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:4px;height:100%">' +
            '<div style="' + _cardBase + 'flex:1 1 0;min-height:0">' +
              '<div style="font-size:9px;color:#4d8dff;letter-spacing:.04em;text-transform:uppercase;font-weight:600">' + _bfl + '</div>' +
              '<div style="font-size:11px;font-weight:600;color:#fff;line-height:1.2">' + _bf + '</div>' +
            '</div>' +
            firstProduct.facts.map(function (f) {
              const lbl = isEs ? (f.label && f.label.es) : (f.label && f.label.en);
              const col = f.tone === 'tradeoff' ? '#f5a524' : '#4ade80';
              return '<div style="' + _cardBase + 'flex:1 1 0;min-height:0;flex-direction:row;align-items:center;gap:6px;padding:4px 8px">' +
                '<span style="width:16px;height:16px;flex-shrink:0;color:' + col + ';display:flex;align-items:center;justify-content:center">' + _qfIcon(f.icon, col) + '</span>' +
                '<div style="display:flex;flex-direction:column;gap:0;min-width:0">' +
                  '<div style="font-size:11px;font-weight:600;color:#fff;line-height:1.1">' + (f.value || '') + '</div>' +
                  '<div style="font-size:9px;color:#9aa0ab;line-height:1.1">' + (lbl || '') + '</div>' +
                '</div>' +
              '</div>';
            }).join('') +
          '</div>';
        }'''

assert src.count(old) == 1, src.count(old)
src = src.replace(old, new, 1)
open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
