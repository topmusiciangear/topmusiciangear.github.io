import os
root='.'
targets=set('\u251c\u252c\u2502\u2551\u2592'.split())  # individual
# Actually scan for any box drawing
box_chars=set(chr(c) for c in range(0x2500,0x2580))
results=[]
for dirpath,_,files in os.walk(root):
    # skip .git and temp? scan temp too maybe not needed
    if '.git' in dirpath.split(os.sep): continue
    for fn in files:
        path=os.path.join(dirpath,fn)
        try:
            with open(path,'r',encoding='utf-8') as f:
                text=f.read()
        except Exception:
            continue
        hits=[c for c in text if c in box_chars]
        if hits:
            results.append((path, len(hits), sorted(set(hits))))
# write
lines=[f"{p}: {n} hits {h}" for p,n,h in results]
open('temp/box_files.txt','w',encoding='utf-8').write('\n'.join(lines))
print('files with box chars:', len(results))