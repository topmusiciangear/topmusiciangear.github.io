import re
txt=open('guides/budget-mics.html',encoding='utf-8',errors='ignore').read()
matches=[m.start() for m in re.finditer('sE Electronics X1 S', txt)]
print('matches',len(matches))
for pos in matches[:3]:
    snippet=txt[max(0,pos-300):pos+600]
    print('---')
    print(snippet[:800])
