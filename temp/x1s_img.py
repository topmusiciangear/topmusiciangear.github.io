txt=open('guides/budget-mics.html',encoding='utf-8',errors='ignore').read()
i=txt.find('src="../img/products/x1s.webp"')
print(txt[i-200:i+500])
