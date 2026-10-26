s = open('guides/at2020-vs-p120.html', encoding='utf-8').read()
import re
for m in re.finditer(r'\.css', s):
    print(s[max(0,m.start()-40):m.start()+10])
    break
print('---')
for m in re.finditer(r'stylesheet|rel="stylesheet"', s):
    print(m.group(0), m.start())
    break
# find link tags
for m in re.finditer(r'<link[^>]*>', s):
    if 'css' in m.group(0) or 'style' in m.group(0):
        print(m.group(0)[:120])
        break
