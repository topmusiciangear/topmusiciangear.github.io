import re
txt=open('guides/budget-mics.html',encoding='utf-8',errors='ignore').read()
# find section with X1 S card
idx=txt.find('<h3 class="guide-product-card-title">sE Electronics X1 S</h3>')
block=txt[idx:idx+5000]
# find data-store zzounds
m=re.search(r'data-store="zzounds".{0,500}', block, flags=re.S)
if m:
    print(m.group(0)[:800])
else:
    print('not found')
