import re

p = 'temp/build-guides.wip.js'
b = open(p, 'rb').read()
i = b.index(b'  485: {')
j = b.index(b'  486: {')
seg = b[i:j]
old = b'amazon: "$1,099.99"'
assert seg.count(old) == 1, seg.count(old)
new = b'amazon: "$1,099.99",\r\n      musicstore: "\xe2\x82\xac1083.00"'
seg2 = seg.replace(old, new)
b = b[:i] + seg2 + b[j:]
open(p, 'wb').write(b)
print(seg2.decode('utf-8'))
