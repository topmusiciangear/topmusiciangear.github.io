import json
p='data/products.json'
d=json.load(open(p,'r',encoding='utf-8'))
for prod in d:
    if prod.get('id')==1070:
        prod['bestFor']={'en':'Vintage tube saturation and optical compression','es':'Saturación de tubo vintage y compresión óptica'}
        prod['score']=8.7
        prod['excludeStores']=['amazon','zzounds','reverb','andertons','gear4music','musicstore']
        prod['facts']=[
            {'icon':'sliders','value':'Tube channel strip','label':{'en':'Type','es':'Tipo'},'tone':'good'},
            {'icon':'compactDisc','value':'VST2/VST3/AU/AAX','label':{'en':'Format','es':'Formato'},'tone':'good'},
            {'icon':'signal','value':'macOS & Windows','label':{'en':'Platforms','es':'Plataformas'},'tone':'good'},
            {'icon':'lock','value':'iLok','label':{'en':'Copy protection','es':'Protección anticopia'},'tone':'good'}
        ]
        break
json.dump(d, open(p,'w',encoding='utf-8'), indent=2)
print('done')