path='guides/budget-mics.html'
txt=open(path,encoding='utf-8').read()
if 'overrides.css' not in txt:
    new=txt.replace('</noscript>','</noscript>\n  <link rel="stylesheet" href="/css/overrides.css?v=59">')
    open(path,'w',encoding='utf-8').write(new)
    print('added')
else:
    print('exists')
