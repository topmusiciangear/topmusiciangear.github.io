import re
txt=open('guides/budget-mics.html',encoding='utf-8',errors='ignore').read()
pattern=r'<h3 class="guide-product-card-title">sE Electronics X1 S</h3>'
m=re.search(pattern, txt)
if m:
    # find next shop-btn-more
    start=m.start()
    snippet=txt[start:start+4000]
    # find the shop-btn-more block
    idx=snippet.find('shop-btn-more')
    print(snippet[idx:idx+2000])
else:
    print('not found')
