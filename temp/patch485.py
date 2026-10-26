import io

p = 'build-guides.js'
src = open(p, encoding='utf-8').read()
i = src.index('  485: {')
j = src.index('  486: {')
seg = src[i:j]
old = '      amazon: "$1,099.99"\n'
new = '      amazon: "$1,099.99",\n      musicstore: "\u20ac1083.00"\n'
assert seg.count(old) == 1, seg.count(old)
seg2 = seg.replace(old, new)
src = src[:i] + seg2 + src[j:]
open(p, 'w', encoding='utf-8', newline='').write(src)
print(repr(seg2))
