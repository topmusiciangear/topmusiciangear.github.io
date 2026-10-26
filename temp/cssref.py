import re
s = open('guides/at2020-vs-p120.html', encoding='utf-8').read()
for m in re.finditer(r'href="[^"]*\.css"', s):
    print(m.group(0))
