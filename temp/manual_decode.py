raw=open('data/products.json','rb').read()
needle=b'"desc_es": "El legendario'
i=raw.find(needle)
seg=raw[i:i+160]
# extract just the desc_es string bytes up to quote
start=seg.find(b': "')+3
end=seg.find(b'"', start)
field_bytes=seg[start:end]
print('field raw bytes:', field_bytes)
text=field_bytes.decode('utf-8')
print('decoded len', len(text))
open('temp/manual_repr.txt','w',encoding='utf-8').write(repr(text))
# find est
pos=text.find('est')
print('pos', pos)
print('chars', [hex(ord(c)) for c in text[pos:pos+8]])