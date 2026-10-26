import json, re
g=json.load(open('data/guides.json',encoding='utf-8'))
p=json.load(open('data/products.json',encoding='utf-8'))
pm={x['id']:x for x in p}

# For each product with quickfacts, find guide sections mentioning it
for prod in p:
    if not prod.get('facts'):
        continue
    pid=prod['id']
    # find guides where this product appears
    for guide in g:
        for sec in guide.get('sections',[]):
            if pid in (sec.get('products') or []):
                content = sec.get('content','') + ' ' + sec.get('content_es','')
                # extract specs mentioned
                specs = set()
                for m in re.finditer(r'(?:self-noise|self noise|ruido propio)[^\d]*(\d+)\s*dB', content, re.I):
                    specs.add('selfnoise:'+m.group(1))
                for m in re.finditer(r'(\d+)\s*dB\s*SPL', content, re.I):
                    specs.add('spl:'+m.group(1))
                for m in re.finditer(r'(\d+)\s*mm', content, re.I):
                    specs.add('dia:'+m.group(1))
                if specs:
                    # check if our quickfacts match
                    our = [f['value'] for f in prod['facts']]
                    print(f"PID {pid} {prod['title']}: guide={guide['id']} specs={specs} ours={our}")
                break
        else:
            continue
        break
