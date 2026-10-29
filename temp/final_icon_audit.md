# Auditoría de iconos quickfacts

**Iconos siempre en verde #4ade80, 20×20, stroke-width 2**

Total de etiquetas con más de un icono: **8**

---

## 1. Type
**Icono mayoritario actual:** `microphone` (107 usos)
SVG correcto:
```svg
<!-- microphone se renderiza vía FontAwesome en _qfIcon, fallback -->
```
El icono dominante es FontAwesome `microphone` (se muestra como micrófono verde).

**Usos incorrectos detectados:**
- `chip` (80 usos) → Ej.: 33 Roland TR-8S, 71 Fender Blues Junior IV, 72 Boss Katana 50, 73 Vox AC30, 74 Marshall DSL40CR
  *Debe usar el icono mayoritario de Type → `microphone`*
- `sliders` (71 usos) → Ej.: 29 FabFilter Total Bundle, 30 iZotope Ozone 12, 32 Soundtoys 5.5
  *Debe usar `microphone`*
- `wave` (42 usos) → Ej.: 96 Ibanez TS9 Tube Screamer, 97 Boss DD-8, 98 Boss TU-3
  *Debe usar `microphone`*
- `headphones` (29 usos) → Ej.: 23 Beyerdynamic DT 770 Pro, 24 Sennheiser HD 490 Pro
  *Debe usar `microphone`*
- `wrench` (19 usos) → Ej.: 39 Aston Shield GN, 58 K&M 210/2
  *Debe usar `microphone`*

*Nota: `Type` se usa en muchas categorías. En la práctica el icono debería adaptarse por categoría, pero según consistencia actual el dominante es `microphone`.*

---

## 2. Pattern
**Icono correcto mayoritario:** `wave`
```svg
<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round"><path d="M1 8 C 4 2, 7 2, 10 8 S 16 14, 19 8 S 22 2, 23 8"/></svg>
```

**Incorrecto:**
- `signal` (1 uso) → 648 MiniDSP UMIK-1
  *Debe cambiar a `wave` (el SVG de arriba).*

---

## 3. Pickups
**Icono correcto mayoritario:** `sineWave` = mismo SVG que `wave`
```svg
<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round"><path d="M1 8 C 4 2, 7 2, 10 8 S 16 14, 19 8 S 22 2, 23 8"/></svg>
```

**Incorrecto:**
- `sliders` (23 usos) → Ej.: 6 Fender American Professional II Stratocaster, 7 Gibson Les Paul Standard ’60s, 65 Fender Player II Jazzmaster
  *Debe cambiar a `sineWave`.*

---

## 4. Connectivity
**Icono correcto mayoritario:** `signal`
```svg
<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round"><line x1="12" y1="14" x2="12" y2="11.5"/><path d="M9 9 A 5 5 0 0 1 15 9"/><path d="M5.8 5.5 A 9.4 9.4 0 0 1 18.2 5.5"/></svg>
```

**Incorrecto:**
- `globe` (15 usos) → Ej.: 13 Arturia KeyLab Essential 61, 14 Native Instruments Kontrol S61, 137 Yamaha MG10XU
  *Debe cambiar a `signal`.*

---

## 5. Preamps
**Icono correcto mayoritario:** `microphone` (fallback FontAwesome)

**Incorrecto:**
- `layers` (8 usos) → Ej.: 137 Yamaha MG10XU, 138 Behringer X32 Compact, 139 Allen & Heath SQ-5
  *Debe cambiar a `microphone`.*

---

## 6. Power
**Icono correcto mayoritario:** `gauge`
```svg
<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round"><path d="M3 14 A 9 9 0 0 1 21 14"/><line x1="12" y1="14" x2="17" y2="6" stroke-width="2"/></svg>
```

**Incorrecto:**
- `volumeHigh` (25 usos) → Ej.: 71 Fender Blues Junior IV, 72 Boss Katana 50, 73 Vox AC30
  *Debe cambiar a `gauge`.*

---

## 7. Platforms
**Icono correcto mayoritario:** `globe` (fallback FontAwesome)

**Incorrecto:**
- `chip` (6 usos) → Ej.: 110 Ableton Live 12 Suite, 111 Logic Pro, 112 FL Studio
  *Debe cambiar a `globe`.*

---

## 8. Range
**Icono correcto mayoritario:** `signal`
```svg
<svg viewBox="0 0 24 16" width="20" height="20" fill="none" stroke="#4ade80" stroke-width="2" stroke-linecap="round"><line x1="12" y1="14" x2="12" y2="11.5"/><path d="M9 9 A 5 5 0 0 1 15 9"/><path d="M5.8 5.5 A 9.4 9.4 0 0 1 18.2 5.5"/></svg>
```

**Incorrecto:**
- `freq` (1 uso) → 170 G4M Acoustics Squarewave Panels
  *Debe cambiar a `signal`.*

---

**Resumen:** No se ha hecho ningún cambio. Solo se listan los iconos que no coinciden con el icono mayoritario / esperado para cada etiqueta de quickfacts. Todos los SVG mostrados mantienen el color verde `#4ade80` y el tamaño 20×20 usado actualmente.
