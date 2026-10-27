import re
txt=open('guides/budget-mics.html',encoding='utf-8',errors='ignore').read()
pat='<h3 class="guide-product-card-title">Rode NT1 Signature Series</h3>'
m=re.search(pat, txt)
if m:
    snippet=txt[m.start():m.start()+2000]
    print(snippet)
