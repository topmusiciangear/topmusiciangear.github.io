s=open('guides/at2020-vs-p120_es.html',encoding='utf-8').read()
i=s.find('guide-section-quickfacts')
open('temp/out.txt','w',encoding='utf-8').write(s[i:i+260])
print('ok')
