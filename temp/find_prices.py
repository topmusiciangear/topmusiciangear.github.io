import re
txt=open('guides/budget-mics.html',encoding='utf-8',errors='ignore').read()
start=txt.find('sE Electronics X1 S')
idx=txt.find('shop-more-list', start)
snippet=txt[idx:idx+8000]
# find all occurrences of Check Price or $ in snippet
import re
prices=re.finditer(r'Check Price|\$\d', snippet)
for m in prices:
    print(m.start(), snippet[max(0,m.start()-100):m.start()+100])
