import re
s = open('guides/at2020-vs-p120.html', 'r', encoding='utf-8').read()
m = re.search(r'guide-section-mediabuy', s)
if m:
    start = m.start()
    # Print just the part we need
    excerpt = s[start:start+300]
    print(excerpt)
else:
    print('NOT FOUND')