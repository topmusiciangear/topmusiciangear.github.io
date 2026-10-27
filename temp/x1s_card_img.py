txt=open('guides/budget-mics.html',encoding='utf-8',errors='ignore').read()
# find guide-product-card-img with x1s
i=txt.find('guide-product-card-img')
# find x1s after that
pos=txt.find('x1s.webp', i)
if pos!=-1:
    print(txt[pos-500:pos+500])
