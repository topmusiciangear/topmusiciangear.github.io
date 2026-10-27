import re
path='guides/budget-mics_es.html'
txt=open(path,encoding='utf-8').read()
m=re.search(r'<div class="guide-section-imgs">.*?</div>',txt,re.S)
print('found' if m else 'no')
if m:
    snippet=m.group(0)[:800]
    print(snippet)
