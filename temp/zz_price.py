txt=open('guides/budget-mics.html',encoding='utf-8',errors='ignore').read()
start=txt.find('sE Electronics X1 S')
# find next occurrence of shop-more-list after start
idx=txt.find('shop-more-list', start)
# find the preceding <h3> maybe
block=txt[max(0,start-2000):start+4000]
# find data-store zzounds inside block
import re
m=re.search(r'data-store="zzounds".*?shop-price.*?>(.*?)</span>', block, flags=re.S)
if m:
    print(m.group(1)[:200])
else:
    print('not found')
