s=open('guides/at2020-vs-p120_es.html',encoding='utf-8').read()
i=s.find('<div class="guide-section-quickfacts">')
open('temp/qf.txt','w',encoding='utf-8').write(s[i:i+1400])
print('done')
