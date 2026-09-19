# Handover 2026-09-19 — Rediseño completo sobre un sistema de tokens

La página pasó de un maquetado suelto en monoespaciada con colores literales a un sistema
de diseño adaptado del lenguaje de Notion, con la tabla tratada como en relate.so.

## Qué se hizo

Tres commits, todos pusheados a `main`.

### `2403a50` · El rediseño

**Tokens.** `src/styles/tokens.css` con paleta, escala tipográfica (con el tracking
negativo explícito, que Inter sin él lee más suelto que la tipografía del sistema de
origen), espaciado de base 8, seis radios, dos sombras por capas y dos curvas de easing.
Ningún componente escribe un literal, y hay test que lo comprueba.

**Disciplina del color.** El azul `#0075de` solo pinta acciones. La paleta sticker decora.
Su única excepción son los chips de estado, y está avalada por el sistema de origen, que
dice explícitamente que el estado lo lleva esa paleta y no una rampa semántica aparte.

**Estructura.** Barra blanca sticky, banda índigo a sangre con el título y las cifras, y
debajo el lienzo cálido con una sola franja de filtros: píldoras de categoría con
contador, buscador y chips de estado. La tabla es una tarjeta blanca con cabecera en
`eyebrow` en mayúsculas y filas con hairline. Por debajo de 600px cada fila se convierte
en una tarjeta apilada mediante el `data-label` de cada celda, sin scroll horizontal.

**Logos.** `BrandLogo` con cascada de tres pasos. Se midió antes de recomendarlo:
`simple-icons` cubre **16 de 30**, medido instalándolo en un scratchpad y comprobando los
30 nombres, no de memoria.

**Dos bugs que cayeron dentro.** `SortIcon` pintaba la flecha en las tres cabeceras a la
vez, porque el componente solo recibía `sortDir` y no comparaba con la columna activa. Y
`aria-sort` emitía `asc`/`desc`, que no son valores que acepte la especificación.

**Contraste.** El verde sticker `#1aae39` sobre blanco se queda en 2,9:1 y no llega a
contraste de lectura, así que los tonos de texto de los chips se oscurecen con
`color-mix`. Eso está en `DESIGN.md` para que nadie lo "arregle" devolviéndolo al hex puro.

### `5c9fe22` · Skills vendorizadas

`npx skills add emilkowalski/skill`, instaladas dentro del proyecto. `.claude/skills`
son symlinks **relativos** a `.agents/skills`, así que resuelven en cualquier clon.

### `c13c368` · Hero, foco y aviso de demo

El hero describía la tabla que estaba justo debajo. Reescrito hacia lo que alguien viene a
hacer, y con el recuento de "coming soon", que no aparecía en ningún sitio.

El buscador pintaba **dos señales de foco**: el contorno global de
`:is(a, button, input, [tabindex]):focus-visible`, con especificidad (0,2,0), le ganaba al
`outline: none` del input, que es (0,1,1). Ahora el campo se pinta su propio anillo con
`--focus-ring` y el contorno global se queda donde sí toca, en píldoras, chips y cabeceras.

Y el aviso de que los datos son de muestra, dentro del hero: es donde la página promete
cobertura en vivo, así que es donde tiene que estar la matización.

## Cómo se verificó

```
npm run lint      → ESLint: No issues found
npm test          → 25 tests, 25 pass, 0 fail
npm run build     → ✓ built in 376ms
```

El bundle sale en 218 kB, lo que confirma que `simple-icons` se tree-shakea: el catálogo
entero son 3.460 iconos y solo viajan los 16 importados por nombre.

Manuel levantó el dev server y revisó a ojo. De ahí salieron dos correcciones suyas: el
doble foco del buscador y el mensaje del hero.

**No hay comprobación visual por mi parte**: no se abrió navegador en toda la sesión.

## Trampas

- **`walkDecls` de postcss aborta el recorrido si el callback devuelve `false`.** Ver
  [lecciones](../lessons.md). Costó un test que daba un falso negativo y otro que pasaba
  por pura suerte.
- **El barrido de literales tiene que ser estricto o no sirve.** Dos `rgba()` blancos con
  alfa que yo mismo dejé en el hero obligaron a tokenizarlos antes de poder escribir el
  test de "cero literales" con la severidad que hacía falta.
