import json
p='data/products.json'
d=json.load(open(p,encoding='utf-8'))
pm={x['id']:x for x in d}

data = {
 278: {"bestFor":{"en":"Podcast & streaming","es":"Podcast y streaming"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB/XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 279: {"bestFor":{"en":"Gaming & streaming","es":"Gaming y streaming"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 280: {"bestFor":{"en":"Streaming","es":"Streaming"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 281: {"bestFor":{"en":"Streaming","es":"Streaming"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 284: {"bestFor":{"en":"Podcasting","es":"Podcasting"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 286: {"bestFor":{"en":"Podcast & streaming","es":"Podcast y streaming"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Hypercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 287: {"bestFor":{"en":"Beginners & podcast","es":"Principiantes y podcast"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 289: {"bestFor":{"en":"Gaming","es":"Gaming"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 290: {"bestFor":{"en":"Streaming","es":"Streaming"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 291: {"bestFor":{"en":"Podcast & streaming","es":"Podcast y streaming"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 292: {"bestFor":{"en":"Podcast","es":"Podcast"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 297: {"bestFor":{"en":"Home studio vocals","es":"Voz en home studio"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"4 dB-A","label":{"en":"Self-noise","es":"Ruido propio"},"tone":"good"}]},
 298: {"bestFor":{"en":"Home studio","es":"Home studio"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"12 dB-A","label":{"en":"Self-noise","es":"Ruido propio"},"tone":"good"}]},
 299: {"bestFor":{"en":"Streaming","es":"Streaming"},"facts":[
   {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 321: {"bestFor":{"en":"Podcast & broadcast","es":"Podcast y radio"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"USB/XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 329: {"bestFor":{"en":"Broadcast & podcast","es":"Radio y podcast"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 330: {"bestFor":{"en":"Live & budget","es":"Directo y económico"},"facts":[
   {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 339: {"bestFor":{"en":"Film, TV & voiceover","es":"Cine, TV y locución"},"facts":[
   {"icon":"microphone","value":"Shotgun","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Lobar","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 340: {"bestFor":{"en":"Film & TV","es":"Cine y TV"},"facts":[
   {"icon":"microphone","value":"Shotgun","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
 341: {"bestFor":{"en":"Film & TV","es":"Cine y TV"},"facts":[
   {"icon":"microphone","value":"Shotgun","label":{"en":"Type","es":"Tipo"},"tone":"good"},
   {"icon":"wave","value":"Supercardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
   {"icon":"volumeHigh","value":"XLR","label":{"en":"Output","es":"Salida"},"tone":"good"}]},
}

for pid, qf in data.items():
    prod = pm[pid]
    prod['bestFor'] = qf['bestFor']
    prod['facts'] = qf['facts']
    print("Updated", pid, prod['title'])

json.dump(d, open(p,'w',encoding='utf-8'), ensure_ascii=False, indent=2)
print("done")
