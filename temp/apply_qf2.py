import json
p='data/products.json'
d=json.load(open(p,encoding='utf-8'))
pm={x['id']:x for x in d}

data = {
 51: {  # Sennheiser MD 421 Kompakt
   "bestFor": {"en":"Instruments, toms & broadcast","es":"Instrumentos, toms y radio"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"146 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"},
   ]
 },
 52: {  # Electro-Voice RE20
   "bestFor": {"en":"Broadcast & vocals","es":"Radio y voz"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"146 dB","label":{"en":"Max SPL","es":"SPL máx."},"tone":"good"},
   ]
 },
 91: {  # Shure BLX288/PG58
   "bestFor": {"en":"Live vocals (2 mics)","es":"Voz en directo (2 mics)"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"Wireless","label":{"en":"System","es":"Sistema"},"tone":"good"},
   ]
 },
 92: {  # Sennheiser EW 100 G4-935
   "bestFor": {"en":"Live vocals (wireless)","es":"Voz en directo (inalámbrico)"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"Wireless","label":{"en":"System","es":"Sistema"},"tone":"good"},
   ]
 },
 93: {  # Sennheiser EW-D Dual Wireless
   "bestFor": {"en":"Dual-channel wireless","es":"Inalámbrico de 2 canales"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"Digital","label":{"en":"System","es":"Sistema"},"tone":"good"},
   ]
 },
 95: {  # Sennheiser EW-D 835-S
   "bestFor": {"en":"Live vocals (wireless)","es":"Voz en directo (inalámbrico)"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"Digital","label":{"en":"System","es":"Sistema"},"tone":"good"},
   ]
 },
 187: {  # Lewitt LCT1040
   "bestFor": {"en":"Studio vocals & instruments","es":"Voz e instrumentos en estudio"},
   "facts": [
     {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Multi-pattern","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"10 dB-A","label":{"en":"Self-noise","es":"Ruido propio"},"tone":"good"},
   ]
 },
 194: {  # Shure MV7+
   "bestFor": {"en":"Podcast & streaming","es":"Podcast y streaming"},
   "facts": [
     {"icon":"microphone","value":"Dynamic","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"USB/XLR","label":{"en":"Output","es":"Salida"},"tone":"good"},
   ]
 },
 195: {  # Elgato Wave:3
   "bestFor": {"en":"Streaming & podcasting","es":"Streaming y podcasting"},
   "facts": [
     {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"USB","label":{"en":"Output","es":"Salida"},"tone":"good"},
   ]
 },
 196: {  # Audio-Technica AT2020
   "bestFor": {"en":"Vocals & acoustic guitar","es":"Voces y guitarra acústica"},
   "facts": [
     {"icon":"microphone","value":"Condenser","label":{"en":"Type","es":"Tipo"},"tone":"good"},
     {"icon":"wave","value":"Cardioid","label":{"en":"Pattern","es":"Patrón"},"tone":"good"},
     {"icon":"volumeHigh","value":"20 dB","label":{"en":"Self-noise","es":"Ruido propio"},"tone":"good"},
   ]
 },
}

for pid, qf in data.items():
    prod = pm[pid]
    prod['bestFor'] = qf['bestFor']
    prod['facts'] = qf['facts']
    print("Updated", pid, prod['title'])

json.dump(d, open(p,'w',encoding='utf-8'), ensure_ascii=False, indent=2)
print("done")
