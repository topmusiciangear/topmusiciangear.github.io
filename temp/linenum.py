txt=open('build-guides.js',encoding='utf-8').read()
lines=txt.splitlines()
idx=184243
cum=0
for i,l in enumerate(lines):
    cum+=len(l)+1
    if cum>idx:
        print(i+1)
        break
