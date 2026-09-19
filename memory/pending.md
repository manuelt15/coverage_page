# Pendiente

## 1. Los logos dependen de un tercero en 14 de 30 filas

`BrandLogo` resuelve en tres pasos: `simple-icons`, favicon del dominio, monograma.
El catálogo de simple-icons cubre **16 de las 30** plataformas. Las otras 14 piden el
favicon a `google.com/s2/favicons`, que es **la única llamada a un tercero que hace la
página**.

Si algún día molesta, las salidas son: bajar todas a monograma (cero terceros, se pierden
los logos reales), o meter los 14 SVG en `public/` a mano.

No están en el catálogo: Salesforce, Workday, Comcast, T-Mobile, Grubhub, TaskRabbit,
TurboTax, H&R Block, Rippling, Zenefits, IRS y PG&E.

## 2. El monograma casi nunca se va a ver

El servicio de favicons devuelve un globo genérico cuando no encuentra el dominio, en vez
de un 404, así que el `onError` no se dispara y el monograma solo entra si falla la red.
Es aceptable, pero conviene saberlo antes de darlo por roto.

## 3. Origen de datos

`MOCK_DATA` se sustituye por un `fetch` dentro del `useEffect` que ya existe. **Hay que
conservar el campo `domain`**, que es de lo que vive la cascada de logos.

## 4. La cobertura visual sigue siendo manual

Los 25 tests leen el código fuente, no una página renderizada. Fijan contratos, no
apariencia.
