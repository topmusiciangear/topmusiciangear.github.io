import re
s = open('guides/at2020-vs-p120.html', 'r', encoding='utf-8').read()
m = re.search(r'guide-section-mediabuy', s)
if m:
    start = m.start()
    print(s[start:start+1500])
else:
    print('NOT FOUND')