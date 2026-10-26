import re
s=open('guides/at2020-vs-p120_es.html',encoding='utf-8').read()
for m in re.finditer(r'qf-value">([^<]+)', s):
    print(repr(m.group(1)))
