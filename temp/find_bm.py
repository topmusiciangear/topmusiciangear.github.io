s=open('guides/budget-mics.html',encoding='utf-8').read()
needle='<div class="guide-section-imgs">'
i=s.find(needle)
open('temp/out.txt','w',encoding='utf-8').write(s[i:i+260])
print('ok')
