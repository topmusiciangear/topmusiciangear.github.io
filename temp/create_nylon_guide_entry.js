const fs = require('fs');
const guidesPath = 'data/guides.json';
let guides = JSON.parse(fs.readFileSync(guidesPath, 'utf8'));

const guide = {
  id: "best-nylon-guitars-for-beginners",
  title: "Best Classical Guitars for Beginners: Top Nylon-String Picks",
  title_es: "Mejores guitarras clásicas para principiantes: las mejores opciones de cuerdas de nylon",
  titleTag: "Best Classical Guitars for Beginners: Top Nylon-String Picks",
  titleTag_es: "Mejores guitarras clásicas para principiantes: opciones de cuerdas de nylon",
  category: "guitars",
  image: "img/products/a631bbc777.webp",
  badge: "recommended",
  intro: "Nylon strings are softer on the fingertips and give a warm, singing tone that works for classical studies and late-night practice. If you're starting out, the right classical guitar makes a huge difference in comfort and motivation. These nine picks cover every budget and body size, from the official student standard to fractional sizes for kids.",
  intro_es: "Las cuerdas de nylon son más suaves para las yemas y dan un tono cálido y cantable que funciona para estudios clásicos y práctica nocturna. Si estás empezando, la guitarra clásica adecuada marca una gran diferencia en comodidad y motivación. Estas nueve opciones cubren cada presupuesto y tamaño de cuerpo, desde el estándar oficial de estudiante hasta tamaños fraccionarios para niños.",
  sections: [
    {
      heading: "Yamaha C40II: the absolute best overall and official student standard",
      heading_es: "Yamaha C40II: la mejor en general y estándar oficial de estudiante",
      content: "<strong>The C40II is the guitar teachers hand you first.</strong> Spruce top with meranti back and sides gives a balanced, warm nylon sound that records cleanly and stays in tune lesson after lesson. The slim classical neck and comfortable low action make chord shapes reachable on day one, and the 650 mm scale is the true classical length. Build quality is consistent, so you know what you get in any store. It's the reference point every other beginner nylon is measured against.",
      content_es: "<strong>La C40II es la guitarra que te entregan los profesores.</strong> Tapa de abeto con fondo y aros de meranti ofrece un sonido de nylon equilibrado y cálido que graba con limpieza y mantiene la afinación clase tras clase. El mástil clásico fino y la acción baja hacen alcanzables los acordes el primer día y la escala de 650 mm es la verdadera longitud clásica. La construcción es consistente y sabes lo que compras en cualquier tienda. Es el punto de referencia contra el que se miden las demás nylon de iniciación.",
      products: [459],
      verdict: "Best overall beginner classical, period.",
      verdict_es: "La mejor clásica para principiantes, sin discusión.",
      pros: [
        "Consistent factory setup and reliable tuning",
        "True 650 mm scale and 52 mm nut for proper technique",
        "Balanced spruce/meranti tone that sits well in recordings",
        "Lightweight and comfortable for long practice"
      ],
      pros_es: [
        "Ajuste de fábrica consistente y afinación fiable",
        "Escala real de 650 mm y cejuela de 52 mm para técnica correcta",
        "Tono equilibrado de abeto/meranti que encaja bien en grabaciones",
        "Ligera y cómoda para práctica prolongada"
      ],
      cons: [
        "Laminate back and sides limit long-term projection",
        "Wide nut can feel bulky for small hands",
        "No electronics for plug-in playing",
        "Basic finish and tuners"
      ],
      cons_es: [
        "Fondo y aros laminados limitan la proyección a largo plazo",
        "Cejuela ancha puede resultar voluminosa para manos pequeñas",
        "Sin electrónica para conectar",
        "Acabado y afinadores básicos"
      ],
      specs: {
        "Top": "Spruce",
        "Back & sides": "Meranti",
        "Scale length": "650 mm",
        "Nut width": "52 mm",
        "Body shape": "Classical 4/4",
        "Electronics": "None"
      }
    },
    {
      heading: "Cordoba C5: best traditional tone and premium solid-top upgrade",
      heading_es: "Cordoba C5: mejor tono tradicional y actualización con tapa maciza",
      content: "<strong>If you want a solid top without jumping to concert prices, the C5 gets you there.</strong> Solid cedar over laminated mahogany gives a soft attack and warm midrange that flatters fingerstyle and early classical pieces. The 650 mm scale and 52 mm nut are true classical dimensions, so technique transfers directly. It's lighter than many beginners expect, and the finish feels grown up. Try it if you want more depth than a laminate starter.",
      content_es: "<strong>Si quieres tapa maciza sin saltar a precios de concierto, la C5 te lleva ahí.</strong> Cedro macizo sobre caoba laminada da un ataque suave y un medio cálido que favorece el fingerstyle y las primeras piezas clásicas. La escala de 650 mm y cejuela de 52 mm son dimensiones clásicas reales, así que la técnica se traslada directamente. Es más ligera de lo que muchos esperan y el acabado se siente adulto. Pruébala si quieres más profundidad que una iniciación laminada.",
      products: [1058],
      verdict: "Best solid-top step up for traditionalists.",
      verdict_es: "Mejor paso a tapa sólida para tradicionalistas.",
      pros: [
        "Solid cedar top adds warmth and responsiveness",
        "Authentic classical dimensions",
        "Comfortable neck profile for beginners",
        "Good projection for the price"
      ],
      pros_es: [
        "Tapa de cedro macizo añade calidez y respuesta",
        "Dimensiones clásicas auténticas",
        "Perfil de mástil cómodo para principiantes",
        "Buena proyección para el precio"
      ],
      cons: [
        "Laminated back and sides still limit dynamics",
        "Cedar is soft and can dent",
        "No gig bag included in all markets",
        "Wide nut can challenge small hands"
      ],
      cons_es: [
        "Fondo y aros laminados siguen limitando la dinámica",
        "El cedro es blando y puede abollarse",
        "En algunos mercados no incluye funda",
        "Cejuela ancha puede costar a manos pequeñas"
      ],
      specs: {
        "Top": "Solid cedar",
        "Back & sides": "Laminated mahogany",
        "Scale length": "650 mm",
        "Nut width": "52 mm",
        "Body shape": "Classical 4/4",
        "Electronics": "None"
      }
    },
    {
      heading: "Ortega R121 Family Series: best value budget pack with gig bag",
      heading_es: "Ortega R121 Family Series: mejor pack económico con funda",
      content: "<strong>The R121 is a complete starter pack.</strong> Solid spruce top with mahogany back and sides sounds bigger than its price, and the deluxe gig bag means you can take it anywhere. The satin finish feels fast, and the traditional 650 mm scale with 52 mm nut gives an honest classical feel. It's a no-fuss guitar for students who need something ready to play out of the box.",
      content_es: "<strong>La R121 es un pack de iniciación completo.</strong> Tapa sólida de abeto con fondo y aros de caoba suena más grande de lo que cuesta y la funda rígida de lujo permite llevarla a cualquier sitio. El acabado satinado se siente rápido y la escala tradicional de 650 mm con cejuela de 52 mm aporta un tacto clásico honesto. Es una guitarra sin complicaciones para estudiantes que necesitan algo listo para tocar.",
      products: [1059],
      verdict: "Best budget pack for new students.",
      verdict_es: "Mejor pack económico para estudiantes nuevos.",
      pros: [
        "Solid spruce top at a low price",
        "Deluxe gig bag included",
        "Traditional classical feel",
        "Satin finish comfortable for beginners"
      ],
      pros_es: [
        "Tapa sólida de abeto a bajo precio",
        "Funda rígida de lujo incluida",
        "Tacto clásico tradicional",
        "Acabado satinado cómodo para principiantes"
      ],
      cons: [
        "Laminated mahogany back and sides",
        "Setup can vary between units",
        "Heavier than Yamaha C40",
        "No electronics"
      ],
      cons_es: [
        "Fondo y aros de caoba laminados",
        "El ajuste puede variar entre unidades",
        "Más pesada que la Yamaha C40",
        "Sin electrónica"
      ],
      specs: {
        "Top": "Solid spruce",
        "Back & sides": "Mahogany",
        "Scale length": "650 mm",
        "Nut width": "52 mm",
        "Body shape": "Classical 4/4",
        "Includes": "Deluxe gig bag"
      }
    },
    {
      heading: "Fender Highway Series Classical: best modern ergonomic and content creator choice",
      heading_es: "Fender Highway Series Clásica: mejor opción ergonómica moderna y para creadores",
      content: "<strong>This guitar trades a little traditional width for comfort.</strong> The body is slimmer and lighter, with a solid cedar top and mahogany back and sides that give a warm, even voice. The slightly narrower neck and lower profile make it easy for electric converts and for filming at a desk. It's the viral pick for creators who want a nylon sound without the classical bulk.",
      content_es: "<strong>Esta guitarra cambia algo de ancho tradicional por comodidad.</strong> El cuerpo es más fino y ligero, con tapa sólida de cedro y fondo y aros de caoba que dan una voz cálida y pareja. El mástil algo más estrecho y el perfil más bajo facilitan la transición desde eléctricas y grabar en el escritorio. Es la elección viral de creadores que quieren sonido de nylon sin el volumen clásico.",
      products: [1060],
      verdict: "Best ergonomic nylon for creators.",
      verdict_es: "Mejor nylon ergonómico para creadores.",
      pros: [
        "Slimmer, lighter body for comfort",
        "Warm cedar top with balanced tone",
        "Easier neck for electric players",
        "Good looks for video content"
      ],
      pros_es: [
        "Cuerpo más fino y ligero para comodidad",
        "Tapa de cedro cálida con tono equilibrado",
        "Mástil más fácil para quienes vienen de eléctricas",
        "Buena estética para contenido de video"
      ],
      cons: [
        "Less traditional classical feel",
        "Projection not as strong as full-depth models",
        "Narrower string spacing limits some repertoire",
        "Limited availability in some regions"
      ],
      cons_es: [
        "Menos sensación clásica tradicional",
        "Proyección no tan fuerte como modelos de cuerpo completo",
        "Separación de cuerdas más estrecha limita algo de repertorio",
        "Disponibilidad limitada en algunas regiones"
      ],
      specs: {
        "Top": "Solid cedar",
        "Back & sides": "Mahogany",
        "Scale length": "650 mm",
        "Nut width": "50 mm approx",
        "Body shape": "Ergonomic classical",
        "Electronics": "None"
      }
    },
    {
      heading: "Yamaha CG122MSH: best concert projection under €250",
      heading_es: "Yamaha CG122MSH: mejor proyección de concierto por menos de 250 €",
      content: "<strong>When you need real projection on a student budget, the CG122MSH delivers.</strong> Solid European spruce top with rosewood back and sides gives clear, articulate notes that carry in a room. The matte finish feels fast and the build is typical Yamaha reliable. It's a step above laminate starters and holds its own in lessons and small performances.",
      content_es: "<strong>Cuando necesitas proyección real con presupuesto de estudiante, la CG122MSH cumple.</strong> Tapa sólida de abeto europeo con fondo y aros de palisandro ofrece notas claras y articuladas que se proyectan en la sala. El acabado mate se siente rápido y la construcción es fiable al estilo Yamaha. Es un paso por encima de las laminadas de iniciación y se defiende en clases y pequeñas actuaciones.",
      products: [1061],
      verdict: "Best value solid-top concert tone.",
      verdict_es: "Mejor relación calidad-precio en tono de concierto tapa sólida.",
      pros: [
        "Solid spruce top with good projection",
        "Rosewood back and sides for clarity",
        "Matte finish comfortable to play",
        "Consistent Yamaha quality"
      ],
      pros_es: [
        "Tapa sólida de abeto con buena proyección",
        "Fondo y aros de palisandro para claridad",
        "Acabado mate cómodo al tocar",
        "Calidad Yamaha consistente"
      ],
      cons: [
        "Price pushes the sub-€250 target in some markets",
        "No gig bag in all configurations",
        "Standard classical neck can be wide",
        "Rosewood requires care"
      ],
      cons_es: [
        "El precio roza el límite de 250 € en algunos mercados",
        "En algunas configuraciones no incluye funda",
        "Mástil clásico estándar puede resultar ancho",
        "El palisandro requiere cuidado"
      ],
      specs: {
        "Top": "Solid European spruce",
        "Back & sides": "Rosewood",
        "Scale length": "650 mm",
        "Nut width": "52 mm",
        "Body shape": "Classical 4/4",
        "Finish": "Matte natural"
      }
    },
    {
      heading: "Fender Classic Design CN-60S: best crossover hybrid for small hands",
      heading_es: "Fender Classic Design CN-60S: mejor híbrida crossover para manos pequeñas",
      content: "<strong>If a wide classical nut feels like a stretch, the CN-60S bridges the gap.</strong> Solid spruce top with mahogany back and sides, paired with a 43 mm nut width and a radiused fingerboard, makes it comfortable for acoustic converts. Nylon strings stay soft on the fingertips while the slimmer neck speeds up chord changes. It's the easiest crossover for students coming from steel strings.",
      content_es: "<strong>Si la cejuela clásica ancha se siente como un estiramiento, la CN-60S hace de puente.</strong> Tapa sólida de abeto con fondo y aros de caoba, con cejuela de 43 mm y diapasón radiado, la hace cómoda para quienes vienen de acústicas. Las cuerdas de nylon siguen siendo suaves y el mástil más estrecho acelera los cambios de acordes. Es la crossover más fácil para estudiantes que provienen de cuerdas de acero.",
      products: [553],
      verdict: "Best crossover for small hands.",
      verdict_es: "Mejor crossover para manos pequeñas.",
      pros: [
        "Narrow 43 mm nut eases transition",
        "Solid spruce top with warm mahogany",
        "Radiused fingerboard feels familiar",
        "Comfortable for beginners"
      ],
      pros_es: [
        "Cejuela estrecha de 43 mm facilita la transición",
        "Tapa sólida de abeto con caoba cálida",
        "Diapasón radiado familiar",
        "Cómoda para principiantes"
      ],
      cons: [
        "Less authentic classical feel",
        "Narrow string spacing limits some repertoire",
        "No traditional classical tone",
        "Limited dynamic range"
      ],
      cons_es: [
        "Menos sensación clásica auténtica",
        "Separación estrecha limita algo de repertorio",
        "Sin tono clásico tradicional",
        "Rango dinámico limitado"
      ],
      specs: {
        "Top": "Solid spruce",
        "Back & sides": "Mahogany",
        "Scale length": "25.3 in",
        "Nut width": "43 mm",
        "Body shape": "Crossover classical",
        "Electronics": "None"
      }
    },
    {
      heading: "Ibanez GA35TCE: best thin-body electro-classical for stage",
      heading_es: "Ibanez GA35TCE: mejor electro-clásica de cuerpo fino para el escenario",
      content: "<strong>When you need to amplify nylon without feedback, the GA35TCE is built for it.</strong> Thinline cutaway body with spruce top and mahogany back and sides, 46 mm nut width and built-in preamp make it comfortable for electric players. The 648 mm scale feels familiar, and the pickup delivers a clean signal straight to the PA. It's a practical stage tool for gigging classical players.",
      content_es: "<strong>Cuando necesitas amplificar nylon sin acoples, la GA35TCE está pensada para eso.</strong> Cuerpo fino con cutaway, tapa de abeto, fondo y aros de caoba, cejuela de 46 mm y preamplificador integrado la hacen cómoda para quienes vienen de eléctricas. La escala de 648 mm se siente familiar y la pastilla entrega señal limpia directa a la PA. Es una herramienta práctica de escenario para clásicos que tocan en directo.",
      products: [1062],
      verdict: "Best stage-ready electro classical.",
      verdict_es: "Mejor electro-clásica lista para escenario.",
      pros: [
        "Built-in pickup and preamp",
        "Thin body reduces feedback",
        "Cutaway for upper fret access",
        "Comfortable narrow nut"
      ],
      pros_es: [
        "Pastilla y preamplificador integrados",
        "Cuerpo fino reduce acoples",
        "Cutaway para acceso a trastes altos",
        "Cejuela estrecha cómoda"
      ],
      cons: [
        "Not as warm acoustically as full-depth",
        "Narrow nut limits classical repertoire",
        "Electronics add complexity",
        "Laminate construction"
      ],
      cons_es: [
        "Acústicamente menos cálida que las de cuerpo completo",
        "Cejuela estrecha limita repertorio clásico",
        "La electrónica añade complejidad",
        "Construcción laminada"
      ],
      specs: {
        "Top": "Spruce",
        "Back & sides": "Mahogany",
        "Scale length": "648 mm",
        "Nut width": "46 mm",
        "Body shape": "Thinline cutaway",
        "Electronics": "Built-in pickup"
      }
    },
    {
      heading: "Cordoba Protege C1 3/4: best fractional size for kids",
      heading_es: "Cordoba Protege C1 3/4: mejor tamaño fraccionario para niños",
      content: "<strong>Kids need a guitar that fits, and the Protege C1 3/4 does exactly that.</strong> 615 mm scale and 48 mm nut make reach comfortable for ages 7-11, while layered spruce and mahogany keep the classical voice intact. It's a school-friendly size that still sounds like a real classical guitar. Pair it with a light set of nylon strings and lessons become fun.",
      content_es: "<strong>Los niños necesitan una guitarra que les quede y la Protege C1 3/4 lo hace.</strong> Escala de 615 mm y cejuela de 48 mm hacen cómodo el alcance para edades 7-11, mientras que abeto y caoba laminados mantienen la voz clásica. Es un tamaño apto para la escuela que sigue sonando a guitarra clásica de verdad. Combínala con un juego ligero de nylon y las clases se vuelven divertidas.",
      products: [1063],
      verdict: "Best 3/4 size for young learners.",
      verdict_es: "Mejor tamaño 3/4 para jóvenes alumnos.",
      pros: [
        "Proper 3/4 size fits kids",
        "Lightweight and comfortable",
        "True classical tone for size",
        "Affordable entry point"
      ],
      pros_es: [
        "Tamaño 3/4 adecuado para niños",
        "Ligera y cómoda",
        "Sonido clásico real para su tamaño",
        "Punto de entrada asequible"
      ],
      cons: [
        "Smaller projection than full size",
        "Laminate top and back",
        "Limited dynamic headroom",
        "Not ideal for adult hands"
      ],
      cons_es: [
        "Proyección menor que tamaño completo",
        "Tapa y fondo laminados",
        "Cabida dinámica limitada",
        "No ideal para manos adultas"
      ],
      specs: {
        "Top": "Laminated spruce",
        "Back & sides": "Mahogany",
        "Scale length": "615 mm",
        "Nut width": "48 mm",
        "Body shape": "3/4 classical",
        "Electronics": "None"
      }
    },
    {
      heading: "Admira Alba 4/4: best ultra-budget traditional European entry",
      heading_es: "Admira Alba 4/4: mejor entrada tradicional europea ultra económica",
      content: "<strong>The Admira Alba is the classroom standard in Europe for a reason.</strong> Oregon pine top and sapelli body give warm, smooth nylon tone, and the action is set low from the factory for fresh fingertips. The traditional 4/4 scale and 52 mm nut feel authentic, and at under £150 it's the most reliable entry point for adult beginners who want a real classical geometry.",
      content_es: "<strong>La Admira Alba es el estándar de aula en Europa por una razón.</strong> Tapa de pino de Oregón y cuerpo de sapelli ofrecen un tono de nylon cálido y suave, y la acción viene baja de fábrica para yemas nuevas. La escala 4/4 tradicional y cejuela de 52 mm se sienten auténticas y por menos de 150 £ es el punto de entrada más fiable para principiantes adultos que quieren geometría clásica real.",
      products: [1064],
      verdict: "Best ultra-budget authentic classical.",
      verdict_es: "Mejor clásica auténtica de presupuesto muy ajustado.",
      pros: [
        "Warm Oregon pine and sapelli tone",
        "Low factory action for beginners",
        "True classical scale and nut width",
        "Very affordable"
      ],
      pros_es: [
        "Tono cálido de pino de Oregón y sapelli",
        "Acción baja de fábrica para principiantes",
        "Escala y cejuela clásicas reales",
        "Muy asequible"
      ],
      cons: [
        "Wide nut can be bulky",
        "Traditional size not for small hands",
        "Laminate construction limits projection",
        "Basic tuners and finish"
      ],
      cons_es: [
        "Cejuela ancha puede resultar voluminosa",
        "Tamaño tradicional no para manos pequeñas",
        "Construcción laminada limita proyección",
        "Afinadores y acabado básicos"
      ],
      specs: {
        "Top": "Oregon pine",
        "Back & sides": "Sapelli",
        "Scale length": "650 mm",
        "Nut width": "52 mm",
        "Body shape": "Classical 4/4",
        "Electronics": "None"
      }
    }
  ],
  conclusion: "<p>If you want one guitar to start and grow with, the <span class=\"product-name\">Yamaha C40II</span> is still the student standard.</p><p>If you want a solid-top upgrade, the <span class=\"product-name\">Cordoba C5</span> gives you that traditional cedar warmth without a steep price.</p>",
  conclusion_es: "<p>Si quieres una guitarra para empezar y crecer, la <span class=\"product-name\">Yamaha C40II</span> sigue siendo el estándar de estudiante.</p><p>Si buscas una mejora con tapa sólida, la <span class=\"product-name\">Cordoba C5</span> te da esa calidez de cedro tradicional sin precio elevado.</p>",
  verdict: "<p><strong><span class=\"product-name\">Yamaha C40II</span> is the absolute best overall beginner classical.</strong> Official student standard with reliable build and true classical feel.</p>",
  verdict_es: "<p><strong>La <span class=\"product-name\">Yamaha C40II</span> es la mejor clásica de iniciación en general.</strong> Estándar oficial de estudiante con construcción fiable y tacto clásico real.</p>",
  productTable: {
    title: "Best Classical Guitars for Beginners Compared",
    title_es: "Comparativa de las mejores guitarras clásicas para principiantes",
    columns: [
      { title: "Yamaha C40II", title_es: "Yamaha C40II" },
      { title: "Cordoba C5", title_es: "Cordoba C5" },
      { title: "Ortega R121", title_es: "Ortega R121" },
      { title: "Fender Highway Classical", title_es: "Fender Highway Clásica" },
      { title: "Yamaha CG122MSH", title_es: "Yamaha CG122MSH" },
      { title: "Fender CN-60S", title_es: "Fender CN-60S" },
      { title: "Ibanez GA35TCE", title_es: "Ibanez GA35TCE" },
      { title: "Cordoba Protege C1 3/4", title_es: "Cordoba Protege C1 3/4" },
      { title: "Admira Alba 4/4", title_es: "Admira Alba 4/4" }
    ],
    rows: [
      {
        label: "Best For",
        label_es: "Ideal para",
        values: [
          { value: "Official student standard", value_es: "Estándar oficial de estudiante" },
          { value: "Traditional solid-top upgrade", value_es: "Actualización tapa sólida tradicional" },
          { value: "Budget pack with bag", value_es: "Pack económico con funda" },
          { value: "Ergonomic modern play", value_es: "Tacto ergonómico moderno" },
          { value: "Concert projection under €250", value_es: "Proyección de concierto bajo 250 €" },
          { value: "Crossover for small hands", value_es: "Crossover para manos pequeñas" },
          { value: "Thin-body electro stage", value_es: "Electro cuerpo fino para escenario" },
          { value: "Fractional size for kids", value_es: "Tamaño fraccionario para niños" },
          { value: "Ultra-budget traditional", value_es: "Tradicional ultra económica" }
        ]
      },
      {
        label: "Top",
        label_es: "Tapa",
        values: [
          { value: "Spruce", value_es: "Abeto" },
          { value: "Solid cedar", value_es: "Cedro macizo" },
          { value: "Solid spruce", value_es: "Abeto macizo" },
          { value: "Solid cedar", value_es: "Cedro macizo" },
          { value: "Solid spruce", value_es: "Abeto macizo" },
          { value: "Solid spruce", value_es: "Abeto macizo" },
          { value: "Spruce", value_es: "Abeto" },
          { value: "Laminated spruce", value_es: "Abeto laminado" },
          { value: "Oregon pine", value_es: "Pino de Oregón" }
        ]
      },
      {
        label: "Back & sides",
        label_es: "Aros y fondo",
        values: [
          { value: "Meranti", value_es: "Meranti" },
          { value: "Mahogany", value_es: "Caoba" },
          { value: "Mahogany", value_es: "Caoba" },
          { value: "Mahogany", value_es: "Caoba" },
          { value: "Rosewood", value_es: "Palisandro" },
          { value: "Mahogany", value_es: "Caoba" },
          { value: "Mahogany", value_es: "Caoba" },
          { value: "Mahogany", value_es: "Caoba" },
          { value: "Sapelli", value_es: "Sapelli" }
        ]
      },
      {
        label: "Scale length",
        label_es: "Escala",
        values: [
          { value: "650 mm", value_es: "650 mm" },
          { value: "650 mm", value_es: "650 mm" },
          { value: "650 mm", value_es: "650 mm" },
          { value: "650 mm", value_es: "650 mm" },
          { value: "650 mm", value_es: "650 mm" },
          { value: "25.3 in", value_es: "25,3 in" },
          { value: "648 mm", value_es: "648 mm" },
          { value: "615 mm", value_es: "615 mm" },
          { value: "650 mm", value_es: "650 mm" }
        ]
      },
      {
        label: "Nut width",
        label_es: "Cejuela",
        values: [
          { value: "52 mm", value_es: "52 mm" },
          { value: "52 mm", value_es: "52 mm" },
          { value: "52 mm", value_es: "52 mm" },
          { value: "50 mm", value_es: "50 mm" },
          { value: "52 mm", value_es: "52 mm" },
          { value: "43 mm", value_es: "43 mm" },
          { value: "46 mm", value_es: "46 mm" },
          { value: "48 mm", value_es: "48 mm" },
          { value: "52 mm", value_es: "52 mm" }
        ]
      }
    ]
  },
  faqs: [
    {
      q: "Are nylon strings easier on fingers than steel?",
      q_es: "¿Las cuerdas de nylon son más suaves para los dedos que el acero?",
      a: "Yes. Nylon has lower tension and a softer feel, so fingertips build calluses more slowly and early practice is more comfortable.",
      a_es: "Sí. El nylon tiene menos tensión y sensación más suave, así que las yemas forman callos más despacio y la práctica inicial es más cómoda."
    },
    {
      q: "What size classical guitar should a beginner choose?",
      q_es: "¿Qué tamaño de guitarra clásica debería elegir un principiante?",
      a: "Most adults start with a full 4/4 size with 650 mm scale and 52 mm nut. Kids 7-11 often fit better with 3/4 size, 615 mm scale.",
      a_es: "La mayoría de adultos empieza con tamaño 4/4 completo, escala 650 mm y cejuela 52 mm. Los niños de 7-11 suelen encajar mejor con tamaño 3/4, escala 615 mm."
    },
    {
      q: "Do I need a cutaway and pickup as a beginner?",
      q_es: "¿Necesito cutaway y pastilla como principiante?",
      a: "Not for learning. Cutaway and electronics add cost and complexity. Focus on playability and tone first, then add electronics later.",
      a_es: "No para aprender. Cutaway y electrónica suman coste y complejidad. Concéntrate primero en jugabilidad y tono, y añade electrónica más adelante."
    },
    {
      q: "Solid top versus laminate for beginners?",
      q_es: "¿Tapa sólida versus laminada para principiantes?",
      a: "Solid tops sound more responsive and open up with time. Laminate is more stable and affordable. A solid top is worth it if you plan to stick with it.",
      a_es: "Las tapas macizas suenan más responsivas y mejoran con el tiempo. El laminado es más estable y económico. Una tapa maciza merece la pena si piensas continuar."
    },
    {
      q: "How often should I change nylon strings?",
      q_es: "¿Con qué frecuencia debo cambiar las cuerdas de nylon?",
      a: "Every 3-6 months with regular practice. Nylon loses brightness faster than steel, and fresh strings improve intonation.",
      a_es: "Cada 3-6 meses con práctica regular. El nylon pierde brillo más rápido que el acero y las cuerdas nuevas mejoran la entonación."
    }
  ],
  description: "Best classical guitars for beginners with nylon strings. Yamaha C40II, Cordoba C5 and more.",
  description_es: "Mejores guitarras clásicas para principiantes con cuerdas de nylon. Yamaha C40II, Cordoba C5 y más."
};

guides.push(guide);
fs.writeFileSync(guidesPath, JSON.stringify(guides, null, 2));
console.log('Guide added');
