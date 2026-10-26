s=open('guides/at2020-vs-p120.html',encoding='utf-8').read()
needle = '<div class="guide-section-imgs">'
i = s.find(needle)
print('found' if i>=0 else 'not found')
open('temp/out.txt','w',encoding='utf-8').write(s[i:i+420] if i>=0 else 'NA')
