p = 'build-guides.js'
src = open(p, encoding='utf-8').read()

# Add a specific rule for .qf-bestfor with tighter spacing, after .qf-card rule
old = ".qf-card{background:#22252c;border-radius:8px;padding:4px 6px;box-sizing:border-box;overflow:hidden;min-height:0;display:flex;flex-direction:column;justify-content:center;gap:1px}"
new = old + ".qf-bestfor{padding:3px 6px;gap:0}.qf-bestfor .qf-label{font-size:7px}.qf-bestfor .qf-value{font-size:9px;line-height:1.05}"
assert src.count(old) == 1
src = src.replace(old, new, 1)

# Also update the desktop media query for qf-bestfor
old2 = "@media(min-width:901px){.qf-card{padding:6px 8px;gap:2px}.qf-label{font-size:9px}.qf-value{font-size:11px}.qf-fact{padding:4px 8px;gap:6px}.qf-icon{width:16px;height:16px}}"
new2 = "@media(min-width:901px){.qf-card{padding:6px 8px;gap:2px}.qf-bestfor{padding:5px 8px;gap:1px}.qf-label{font-size:9px}.qf-value{font-size:11px}.qf-fact{padding:4px 8px;gap:6px}.qf-icon{width:16px;height:16px}}"
assert src.count(old2) == 1
src = src.replace(old2, new2, 1)

open(p, 'w', encoding='utf-8', newline='').write(src)
print('done')
