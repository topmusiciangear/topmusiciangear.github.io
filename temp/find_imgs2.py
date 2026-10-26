s=open('guides/at2020-vs-p120.html',encoding='utf-8').read()
needle = '<div class="guide-section-imgs">'
i = s.find(needle)
open('temp/out.txt','w',encoding='utf-8').write(s[i:i+620])
print('ok')
