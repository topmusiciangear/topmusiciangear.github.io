import re
txt=open('guides/budget-mics.html',encoding='utf-8',errors='ignore').read()
i=txt.find('x1s.webp')
# find next shop-more-list after image
j=txt.find('shop-more-list', i)
block=txt[i:j+1500]
# print a bit around
print(block[:2000])
