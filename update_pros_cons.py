import json
path='data/guides.json'
with open(path,'r',encoding='utf-8') as f:
    data=json.load(f)

guide = next(g for g in data if g.get('id')=='channel-strip-plugins')
vpc = guide.get('verdictProsCons', [])

# Mapping by product name
mapping = {
 'Waves Scheps Omni Channel 2': {
  'pros': [
   'Modular layout: Drag and drop modules to quickly customize your exact signal path order.',
   'Three compression styles: Instantly switch between distinct VCA, FET, and Opto circuit characters.',
   'Low CPU footprint: Incredibly well-optimized to load across dozens of active mixer channels.',
   'Thump saturation control: Unique drive harmonic processing adds low-end weight without inducing muddiness.'
  ],
  'cons': [
   'Waves update plan: Subject to renewal fees for maintaining future operating system compatibility.',
   'No hardware prestige: Does not emulate a specific legendary studio console brand name.',
   'Overwhelming for beginners: The vast amount of modular options can slow initial decisions.',
   'Clipped spectrum display: Small graphical interface makes precise visual tracking slightly difficult.'
  ],
  'pros_es': [
   'Layout modular: Arrastra y suelta módulos para personalizar el orden exacto de la cadena de señal.',
   'Tres estilos de compresión: Cambia al instante entre caracteres VCA, FET y Opto distintos.',
   'Bajo consumo de CPU: Muy optimizado para cargar en decenas de canales activos.',
   'Control de saturación Thump: Procesado armónico único añade peso en graves sin ensuciar.'
  ],
  'cons_es': [
   'Plan de actualización Waves: Sujeto a cuotas de renovación para compatibilidad con sistemas operativos.',
   'Sin prestigio de hardware: No emula una marca de consola de estudio legendaria específica.',
   'Abrumador para principiantes: La gran cantidad de opciones modulares puede ralentizar decisiones iniciales.',
   'Visual recortado: La pequeña interfaz gráfica dificulta un poco el seguimiento visual preciso.'
  ]
 },
 'Universal Audio UAD SSL 4000 E Channel Strip': {
  'pros': [
   'Authentic circuit modeling: Captures genuine non-linear analog harmonic distortions and transformer saturation.',
   'Aggressive 4K punch: Delivers that iconic in-your-face transient impact and tight instrument separation.',
   'Black Knob EQ: Famous, highly responsive frequency bands built to carve out muddy frequencies.',
   'Fully native operation: Runs smoothly on your local computer CPU without requiring DSP hardware.'
  ],
  'cons': [
   'Heavy resource load: High-fidelity component modeling taxes computer processing power on massive sessions.',
   'Rigid console architecture: Total internal routing sequence is restricted to classic hardware designs.',
   'No visual analyzers: Lacks modern graphical spectrum displays, forcing you to rely only on ears.',
   'Elongated interface: Recreates the narrow hardware physical strip, looking small on high-resolution screens.'
  ],
  'pros_es': [
   'Modelado de circuito auténtico: Captura distorsiones armónicas analógicas no lineales y saturación de transformador.',
   'Punch 4K agresivo: Entrega ese impacto transitorio in-your-face icónico y separación ajustada.',
   'EQ Black Knob: Bandas de frecuencia famosas y muy responsivas para eliminar frecuencias fangosas.',
   'Operación totalmente nativa: Funciona con fluidez en la CPU local sin requerir hardware DSP.'
  ],
  'cons_es': [
   'Carga de recursos alta: El modelado de componentes de alta fidelidad exige CPU en sesiones grandes.',
   'Arquitectura de consola rígida: La secuencia interna de ruteo está restringida a diseños de hardware clásico.',
   'Sin analizadores visuales: Carece de displays espectrales gráficos modernos, obliga a confiar en el oído.',
   'Interfaz alargada: Reproduce la tira física estrecha del hardware, se ve pequeña en pantallas 4K.'
  ]
 },
 'Solid State Logic SSL Native Channel Strip 2': {
  'pros': [
   'Official factory DSP: Uses modern factory mathematical algorithms straight from Solid State Logic.',
   'Ultra-clean separation: Pristine high-fidelity digital performance ideal for clean pop and EDM mixes.',
   'Anti-cramping algorithms: Preserves flawless, natural high-frequency curves close to the Nyquist limit.',
   'Intelligent anti-clipping: Advanced built-in headroom protection handles severe signal peaks without harsh clipping.'
  ],
  'cons': [
   'No analog coloration: Lacks vintage transformer warmth or saturation by design.',
   'iLok licensing needed: Requires setting up third-party PACE activation which might frustrate installation.',
   'Stiff base pricing: Can be highly expensive outside of specific manufacturer flash sales windows.',
   'Fixed signal flow: Limited modular flexibility compared to modern custom hybrid channel strip plugins.'
  ],
  'pros_es': [
   'DSP oficial de fábrica: Usa algoritmos matemáticos modernos de Solid State Logic.',
   'Separación ultra limpia: Rendimiento digital de alta fidelidad ideal para pop y EDM limpios.',
   'Algoritmos anti-cramping: Preserva curvas de alta frecuencia naturales cercanas a Nyquist.',
   'Anti-clipping inteligente: Protección de headroom avanzada maneja picos severos sin recorte agresivo.'
  ],
  'cons_es': [
   'Sin coloración analógica: Carece de calidez de transformador vintage por diseño.',
   'Licencia iLok necesaria: Requiere activación PACE de terceros que puede frustrar la instalación.',
   'Precio base rígido: Puede ser muy caro fuera de ofertas puntuales del fabricante.',
   'Flujo de señal fijo: Flexibilidad modular limitada frente a plugins híbridos modernos.'
  ]
 },
 'Universal Audio UAD API Vision Channel Strip': {
  'pros': [
   'Proportional Q design: Filter bandwidth automatically narrows on heavier cuts for highly musical corrections.',
   'Blazing fast VCA: Dynamics section catches aggressive percussion peaks with total authority and speed.',
   'Pristine expander gate: Celebrated as one of the cleanest gates to remove background instrument bleed.',
   'Unison preamp technology: Adjusts hardware impedance when paired directly with Universal Audio Apollo interfaces.'
  ],
  'cons': [
   'Concentric dual knobs: Overlapping frequency and gain dials can feel awkward to control with mice.',
   'Lacks general subtlety: Designed to drive signals forward; unsuitable for transparent or ambient acoustic styles.',
   'No parallel mix knob: Lacks a global wet/dry blend control directly on the main strip interface.',
   'Noticeable CPU drain: Processing native American op-amps draws significant local system power.'
  ],
  'pros_es': [
   'Diseño Q proporcional: El ancho de banda se estrecha automáticamente en cortes profundos para correcciones musicales.',
   'VCA ultrarrápido: La sección de dinámica captura picos de percusión con autoridad y velocidad.',
   'Expander gate limpio: Celebrado como uno de los gates más limpios para eliminar bleed instrumental.',
   'Tecnología Unison preamp: Ajusta la impedancia de hardware con interfaces Apollo de Universal Audio.'
  ],
  'cons_es': [
   'Perillas duales concéntricas: Los diales de frecuencia y ganancia solapados resultan incómodos con ratón.',
   'Falta sutileza general: Diseñado para empujar la señal; no apto para estilos acústicos transparentes o ambientales.',
   'Sin control de mezcla paralelo: Carece de control wet/dry global en la interfaz principal.',
   'Drenaje notable de CPU: Procesar op-amps americanos nativos consume potencia significativa del sistema.'
  ]
 },
 'Waves Scheps 73': {
  'pros': [
   'Thick transformer weight: Adds incredible Neve class-A harmonic density to vocals and bass lines.',
   '12 kHz Air band: Legendary high-frequency boost opens up dark mic recordings without introducing harshness.',
   'Mid-Side matrix: Built-in spatial processing lets you equalize center and stereo sides independently.',
   'Fast acoustic leveling: Preamplifier drive controls color audio signals with massive analog musicality.'
  ],
  'cons': [
   'Limited frequency choices: Replicates rigid hardware steps, meaning you cannot sweep frequencies continuously.',
   'No dynamics module: Lacks an integrated compressor or noise gate in its strip architecture.',
   'WUP system dependency: Subject to Waves\' secondary platform maintenance fee structures over time.',
   'Not for surgical cutting: Too broad and colorful to fix specific annoying room resonances.'
  ],
  'pros_es': [
   'Peso de transformador grueso: Añade densidad armónica Neve class-A increíble a voces y bajos.',
   'Banda Air 12 kHz: Boost de alta frecuencia legendario abre grabaciones oscuras sin dureza.',
   'Matriz Mid-Side: Procesamiento espacial integrado permite ecualizar centro y lados estéreo por separado.',
   'Nivelación acústica rápida: El drive del preamplificador colorea con musicalidad analógica masiva.'
  ],
  'cons_es': [
   'Opciones de frecuencia limitadas: Replica pasos rígidos de hardware, no permite barrido continuo.',
   'Sin módulo de dinámica: Carece de compresor o gate integrado en su arquitectura.',
   'Dependencia del sistema WUP: Sujeto a tarifas de mantenimiento de la plataforma secundaria de Waves.',
   'No apto para cortes quirúrgicos: Demasiado amplio y colorido para corregir resonancias específicas de sala.'
  ]
 },
 'Waves Magma Tube Channel Strip': {
  'pros': [
   'Three-knob efficiency: Ultra-fast workflow allows you to dial in professional vintage tones in seconds.',
   'Asymmetric tube drive: Beautifully models real vacuum bulb behaviors when pushed hard into saturation.',
   'Smooth optical leveling: Musical compressor glues tracking performances together seamlessly and invisibly.',
   'Phase-aligned filters: Fixed equalization curves preserve tight, punchy tracking layouts across mixes.'
  ],
  'cons': [
   'Zero surgical utility: Only features three fixed tone bands; impossible to notched out frequencies.',
   'Constant audio footprint: Always colors the signal path, even at minimal input drive configurations.',
   'No advanced noise gate: Lacks an expansion tool to clean up noisy source recordings.',
   'Waves central installation: Requires background management software to handle licensing tasks constantly.'
  ],
  'pros_es': [
   'Eficiencia de tres perillas: Flujo ultra rápido para tonos vintage profesionales en segundos.',
   'Drive de tubo asimétrico: Modela de forma hermosa el comportamiento real de válvulas al saturar.',
   'Nivelación óptica suave: Compresor musical une tomas de forma invisible y sin fisuras.',
   'Filtros alineados en fase: Curvas fijas preservan layouts de tracking ajustados y punchy.'
  ],
  'cons_es': [
   'Utilidad quirúrgica nula: Solo tres bandas de tono fijas; imposible recortar frecuencias específicas.',
   'Huella de audio constante: Colorea siempre la señal, incluso con drive de entrada mínimo.',
   'Sin noise gate avanzado: Carece de herramienta de expansión para limpiar grabaciones ruidosas.',
   'Instalación Waves Central: Requiere software de gestión en segundo plano para licencias constantemente.'
  ]
 }
}

for item in vpc:
    name = item.get('name')
    if name in mapping:
        m = mapping[name]
        item['pros'] = m['pros']
        item['cons'] = m['cons']
        item['pros_es'] = m['pros_es']
        item['cons_es'] = m['cons_es']
        print('updated', name)

with open(path,'w',encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print('done')
