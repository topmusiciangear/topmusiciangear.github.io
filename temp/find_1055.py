txt=open('build-guides.js',encoding='utf-8').read()
lines=txt.splitlines()
for i,l in enumerate(lines,1):
    if '1055' in l:
        print(i,l)
