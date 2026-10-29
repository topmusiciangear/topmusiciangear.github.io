import json, os, hashlib, requests
from PIL import Image
import io

data=json.load(open('data/products.json',encoding='utf-8'))
ids={1069,379,1066,1068,1071,1070}
out_dir='img/products'
os.makedirs(out_dir, exist_ok=True)

for p in data:
    pid=p.get('id')
    if pid not in ids:
        continue
    url=p.get('img')
    if not url or url.startswith('img/'):
        continue
    try:
        r=requests.get(url, timeout=30)
        r.raise_for_status()
        img_bytes=r.content
        # compute hash for filename
        h=hashlib.md5(img_bytes).hexdigest()[:10]
        out_path=os.path.join(out_dir,f'{h}.webp')
        if not os.path.exists(out_path):
            im=Image.open(io.BytesIO(img_bytes))
            # ensure RGB
            if im.mode in ('RGBA','LA'):
                bg=Image.new('RGB', im.size, (255,255,255))
                bg.paste(im, mask=im.split()[-1] if im.mode=='RGBA' else None)
                im=bg
            elif im.mode!='RGB':
                im=im.convert('RGB')
            im.save(out_path, 'WEBP', quality=88)
        p['img']=f'img/products/{h}.webp'
        print(pid, p['img'])
    except Exception as e:
        print('error', pid, e)

json.dump(data, open('data/products.json','w',encoding='utf-8'), ensure_ascii=False, indent=2)
print('done')