import re
txt=open('guides/budget-mics.html',encoding='utf-8',errors='ignore').read()
m=re.search(r'guide-product-card-img.*?x1s.webp', txt, flags=re.S)
if m:
    print(txt[m.start()-200:m.end()+800])
