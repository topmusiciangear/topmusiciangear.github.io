import re
txt=open('guides/budget-mics.html',encoding='utf-8',errors='ignore').read()
pattern=r'<h3 class="guide-product-card-title">sE Electronics X1 S</h3>'
m=re.search(pattern, txt)
if m:
    start=m.start()
    idx=txt.find('shop-more-list', start)
    snippet=txt[idx:idx+4000]
    print(snippet)
else:
    print('not found')
