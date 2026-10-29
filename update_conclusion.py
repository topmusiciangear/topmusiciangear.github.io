import json
path='data/guides.json'
with open(path,'r',encoding='utf-8') as f:
    data=json.load(f)

guide = next((g for g in data if g.get('id')=='channel-strip-plugins'), None)
if not guide:
    raise SystemExit('guide not found')

en_conclusion = """<p>That is why I would go with <span class="product-name">Waves Scheps Omni Channel 2</span> as our top recommendation. It is the ultimate hybrid mixing workflow, offering unmatched modular flexibility, three compressor flavors, and the signature "Thump" saturation control in a single window without crushing your CPU.</p>
<p>However, if you have a specific sound in mind, choose based on your mixing style:</p>
<ul>
<li><strong>For Vintage Analog Punch:</strong> Go with the <span class="product-name">Universal Audio UAD SSL 4000 E Channel Strip</span>.</li>
<li><strong>For Pristine Modern Pop/EDM:</strong> Go with the <span class="product-name">Solid State Logic SSL Native Channel Strip 2</span>.</li>
<li><strong>For Fast Mid-Range Attack (Drums/Rock):</strong> Go with the <span class="product-name">Universal Audio UAD API Vision Channel Strip</span>.</li>
</ul>
<p>For absolute speed, freedom, and multi-genre versatility, load up the <span class="product-name">Waves Scheps Omni Channel 2</span> and don't look back.</p>"""

es_conclusion = """<p>Por eso, mi recomendación principal es <span class="product-name">Waves Scheps Omni Channel 2</span>. Es el flujo de mezcla híbrido definitivo, con flexibilidad modular sin igual, tres sabores de compresor y el control característico de saturación "Thump" todo en una sola ventana sin castigar la CPU.</p>
<p>Sin embargo, si buscas un sonido concreto, elige según tu estilo de mezcla:</p>
<ul>
<li><strong>Para pegada analógica vintage:</strong> ve con <span class="product-name">Universal Audio UAD SSL 4000 E Channel Strip</span>.</li>
<li><strong>Para pop/EDM moderno y limpio:</strong> ve con <span class="product-name">Solid State Logic SSL Native Channel Strip 2</span>.</li>
<li><strong>Para ataque rápido en medios (batería/rock):</strong> ve con <span class="product-name">Universal Audio UAD API Vision Channel Strip</span>.</li>
</ul>
<p>Para velocidad absoluta, libertad y versatilidad multi-género, carga <span class="product-name">Waves Scheps Omni Channel 2</span> y no mires atrás.</p>"""

guide['conclusion'] = en_conclusion
guide['conclusion_es'] = es_conclusion

with open(path,'w',encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('updated')
