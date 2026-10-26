p='guides/best-monitors_es.html'
s=open(p,encoding='utf-8').read()
for i,c in enumerate(s):
    if '\u2500'<=c<='\u257f':
        out=repr(s[max(0,i-80):i+20])
        open('temp/ctx.txt','w',encoding='utf-8').write(out)
        break