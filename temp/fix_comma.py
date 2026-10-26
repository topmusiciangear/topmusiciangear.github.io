p = 'build-guides.js'
b = open(p, 'rb').read()
old = b'musicstore: "\xe2\x82\xac89.00"\r?\n,'
import re
m = re.search(old, b)
print('match:', bool(m), m.group(0) if m else None)
if m:
    b = b[:m.start()] + b'musicstore: "\xe2\x82\xac89.00",' + b[m.end():]
    open(p, 'wb').write(b)
    print('fixed')
