import re

p = 'temp/build-guides.wip.js'
b = open(p, 'rb').read()
pat = re.compile(br',\r?\n\s*\r?\n(\s*musicstore: "\xe2\x82\xac1083\.00")')
b2, n = pat.subn(br',\r\n\1', b)
print('replacements', n)
open(p, 'wb').write(b2)
i = b2.index(b'  485: {')
j = b2.index(b'  486: {')
print(b2[i:j].decode('utf-8'))
