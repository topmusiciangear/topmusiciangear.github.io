import re
txt=open('guides/budget-mics.html',encoding='utf-8',errors='ignore').read()
idx=txt.find('<h3 class="guide-product-card-title">sE Electronics X1 S</h3>')
# find next shop-more-list
start=idx
end=txt.find('shop-more-list', start)
block=txt[start:end+2000]
m=re.search(r'data-store="zzounds"', block)
if m:
    print('found zzounds at', m.start())
    print(block[m.start()-200:m.start()+400])
else:
    print('zzounds not in block')
