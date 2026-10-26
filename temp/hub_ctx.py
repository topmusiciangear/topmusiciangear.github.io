out=[]
for p in ['_hub_content.js','optimize-all-guides.js','README.md']:
    s=open(p,encoding='utf-8').read()
    for i,c in enumerate(s):
        if '\u2500'<=c<='\u257f':
            out.append(f"{p}: {repr(s[max(0,i-60):i+40])}")
            break
open('temp/hub_ctx.txt','w',encoding='utf-8').write('\n'.join(out))