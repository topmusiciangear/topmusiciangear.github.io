import json
p='data/products.json'
d=json.load(open(p,encoding='utf-8'))
pm={x['id']:x for x in d}

data = {
 342: {"bestFor":{"en":"Film, TV & outdoor","es":"Cine, TV y exterior"},"facts":[
   {"icon":"microphone","value":"Shotgun","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Lobar","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 343: {"bestFor":{"en":"On-camera & film","es":"On-camera y cine"},"facts":[
   {"icon":"microphone","value":"Shotgun","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Lobar","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 344: {"bestFor":{"en":"Film & TV","es":"Cine y TV"},"facts":[
   {"icon":"microphone","value":"Shotgun","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 345: {"bestFor":{"en":"On-camera & vlog","es":"On-camera y vlog"},"facts":[
   {"icon":"microphone","value":"Shotgun","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB/XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 346: {"bestFor":{"en":"On-camera & vlog","es":"On-camera y vlog"},"facts":[
   {"icon":"microphone","value":"Shotgun","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"3.5mm","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 358: {"bestFor":{"en":"On-camera & film","es":"On-camera y cine"},"facts":[
   {"icon":"microphone","value":"Shotgun","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Lobar","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 359: {"bestFor":{"en":"On-camera & vlog","es":"On-camera y vlog"},"facts":[
   {"icon":"microphone","value":"Shotgun","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB/3.5mm","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 360: {"bestFor":{"en":"Film & TV dialogue","es":"Diálogo cine y TV"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"14 dB-A","label":{"en":"Self-noise","es":"Ruido propio"},"tone":"good"}]},
 364: {"bestFor":{"en":"Guitar amps & brass","es":"Amplis y metales"},"facts":[
   {"icon":"microphone","value":"Ribbon","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Figure-8","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"130 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"}]},
 365: {"bestFor":{"en":"Guitar amps & vocals","es":"Amplis y voz"},"facts":[
   {"icon":"microphone","value":"Ribbon","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Figure-8","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"135 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"}]},
 366: {"bestFor":{"en":"Guitar amps & vocals","es":"Amplis y voz"},"facts":[
   {"icon":"microphone","value":"Ribbon","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Figure-8","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"130 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"}]},
 429: {"bestFor":{"en":"Podcast & streaming","es":"Podcast y streaming"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 430: {"bestFor":{"en":"Podcast & streaming","es":"Podcast y streaming"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB/XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 431: {"bestFor":{"en":"Live vocals","es":"Voz en directo"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 432: {"bestFor":{"en":"Podcast & streaming","es":"Podcast y streaming"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 433: {"bestFor":{"en":"Podcast & broadcast","es":"Podcast y radio"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB/XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 435: {"bestFor":{"en":"Guitar amps","es":"Amplis de guitarra"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 436: {"bestFor":{"en":"Podcast","es":"Podcast"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB/XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 437: {"bestFor":{"en":"Podcast & streaming","es":"Podcast y streaming"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 438: {"bestFor":{"en":"Home studio","es":"Home studio"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
}

for pid, qf in data.items():
    prod = pm[pid]
    prod['bestFor'] = qf['bestFor']
    prod['facts'] = qf['facts']
    print("Updated", pid, prod['title'])

json.dump(d, open(p,'w',encoding='utf-8'), ensure_ascii=False, indent=2)
print("done")
