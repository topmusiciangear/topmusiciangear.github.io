import re
txt=open('guides/budget-mics.html',encoding='utf-8',errors='ignore').read()
pattern=r'<h3 class="guide-product-card-title">sE Electronics X1 S</h3>'
m=re.search(pattern, txt)
if m:
    start=m.start()
    snippet=txt[start:start+2500]
    print(snippet)
else:
    print('not found')
