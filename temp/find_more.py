import re
txt=open('guides/budget-mics.html',encoding='utf-8',errors='ignore').read()
pattern=r'<h3 class="guide-product-card-title">sE Electronics X1 S</h3>'
m=re.search(pattern, txt)
if m:
    start=m.start()
    # find shop-more div
    idx=txt.find('shop-more', start)
    snippet=txt[idx:idx+3000]
    print(snippet)
else:
    print('not found')
