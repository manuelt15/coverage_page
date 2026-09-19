# Lecciones

Corrección → causa → fix → regla. Solo cosas que pasaron de verdad.

## 2026-09-19 · `walkDecls` de postcss corta el recorrido si el callback devuelve `false`

**Corrección:** un test de tipografía fallaba diciendo "falta --track-display-1" cuando el
token estaba escrito y bien. El mismo código en un script suelto devolvía los siete tokens.

**Causa:** el callback era un arrow con `&&`:

```js
root.walkDecls(decl => decl.prop.startsWith('--track-') && (tracks[decl.prop] = decl.value))
```

En la primera declaración que no encajaba, la expresión valía `false`, y **postcss
interpreta un `false` devuelto como "deja de recorrer"**. El recorrido moría en la primera
línea del fichero.

Peor: otro test del mismo fichero usaba el mismo patrón y **pasaba de chiripa**, porque
ahí la primera declaración sí encajaba y nunca devolvía `false`.

**Fix:** cuerpo de bloque con `if`, nunca la expresión corta.

```js
root.walkDecls(decl => { if (decl.prop.startsWith('--track-')) tracks[decl.prop] = decl.value })
```

**Regla:** en cualquier `walk*` de postcss, el callback va con cuerpo de bloque. Y cuando
un test falla con un dato que sabes que existe, sospechar del recorrido antes que del dato.
El segundo test que pasaba por suerte es el recordatorio de que un test en verde tampoco
prueba que el recorrido funcione.

## 2026-09-19 · Un test de "cero literales" no vale si el autor se deja los suyos

**Corrección:** al escribir el test que prohíbe colores literales en los componentes, dos
`rgba(255,255,255,...)` que yo mismo había puesto en el hero lo habrían hecho fallar.

**Causa:** los escribí mientras montaba el hero, cuando aún no existía el test, y se
quedaron. Son blancos con alfa sobre la banda índigo, que no tenían token.

**Fix:** tokenizarlos como `--on-primary-soft` y `--on-primary-faint` antes de escribir el
test, para poder escribirlo estricto en vez de con una excepción.

**Regla:** la tentación al escribir un chequeo es relajarlo para que pase con lo que ya
hay. Lo correcto es al revés: arreglar lo que hay para poder escribir el chequeo duro. Un
test con excepciones nace ya erosionado.
