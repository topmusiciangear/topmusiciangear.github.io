p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

# Best for card: smaller fonts/padding
old1 = """            '<div style="background:#22252c;border-radius:8px;padding:6px 8px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;gap:2px;overflow:hidden;min-height:0">' +
              '<div style="font-size:9px;color:#4d8dff;letter-spacing:.04em;text-transform:uppercase;font-weight:600">' + _bfl + '</div>' +
              '<div style="font-size:11px;font-weight:600;color:#fff;line-height:1.2">' + _bf + '</div>' +"""
new1 = """            '<div style="background:#22252c;border-radius:8px;padding:4px 6px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;gap:1px;overflow:hidden;min-height:0">' +
              '<div style="font-size:8px;color:#4d8dff;letter-spacing:.04em;text-transform:uppercase;font-weight:600">' + _bfl + '</div>' +
              '<div style="font-size:10px;font-weight:600;color:#fff;line-height:1.1">' + _bf + '</div>' +"""
assert src.count(old1) == 1, src.count(old1)
src = src.replace(old1, new1, 1)

# Fact cards: smaller fonts/padding/icon
old2 = """              return '<div style="background:#22252c;border-radius:8px;padding:6px 8px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;gap:2px;overflow:hidden;min-height:0;flex-direction:row;align-items:center;gap:6px;padding:4px 8px">' +
                '<span style="width:16px;height:16px;flex-shrink:0;color:' + col + ';display:flex;align-items:center;justify-content:center">' + _qfIcon(f.icon, col) + '</span>' +
                '<div style="display:flex;flex-direction:column;gap:0;min-width:0">' +
                  '<div style="font-size:11px;font-weight:600;color:#fff;line-height:1.1">' + (f.value || '') + '</div>' +
                  '<div style="font-size:9px;color:#9aa0ab;line-height:1.1">' + (lbl || '') + '</div>' +
                '</div>' +
              '</div>';"""
new2 = """              return '<div style="background:#22252c;border-radius:8px;padding:3px 6px;box-sizing:border-box;display:flex;flex-direction:row;align-items:center;gap:5px;overflow:hidden;min-height:0">' +
                '<span style="width:14px;height:14px;flex-shrink:0;color:' + col + ';display:flex;align-items:center;justify-content:center">' + _qfIcon(f.icon, col) + '</span>' +
                '<div style="display:flex;flex-direction:column;gap:0;min-width:0">' +
                  '<div style="font-size:10px;font-weight:600;color:#fff;line-height:1.1">' + (f.value || '') + '</div>' +
                  '<div style="font-size:8px;color:#9aa0ab;line-height:1.1">' + (lbl || '') + '</div>' +
                '</div>' +
              '</div>';"""
assert src.count(old2) == 1, src.count(old2)
src = src.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
