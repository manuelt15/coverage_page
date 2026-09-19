# Memoria — manuelt15/coverage_page

Página de cobertura de plataformas de datos. React 19 + Vite, JavaScript sin TypeScript,
CSS a mano con tokens. Las convenciones viven en `AGENTS.md` y el sistema visual completo
en `DESIGN.md`, los dos en la raíz. **Leer `DESIGN.md` antes de tocar cualquier estilo.**

**Los datos son de muestra.** 30 registros en `src/hooks/useDatasources.js`. La propia
página lo avisa en el hero y hay un test que impide que ese aviso desaparezca.

Commits con la cuenta personal: `user.email` fijado en local a `manueltorres1512@gmail.com`.

## Índice

- [Pendiente](pending.md) — lo que queda abierto. **Leer esto primero.**
- [Handover 2026-09-19](handovers-archive/HANDOVER-2026-09-19-rediseno-sistema-notion.md) — rediseño completo sobre un sistema de tokens, tabla, logos de marca y 25 tests de contrato.
- [Lecciones](lessons.md) — trampas reales de este repo.

## Cosas que conviene saber antes de tocar

**Ningún componente escribe un color, un radio, una sombra ni una curva literal.** Todo
sale de `src/styles/tokens.css` y hay un test que falla con el primero que aparezca.

**El azul `--primary` es el único color que pinta una acción.** La paleta sticker decora;
su única excepción estructural son los chips de estado, y viene heredada del sistema de
origen, no inventada.

**La banda índigo `--secondary` es de un solo momento**, el hero. No se repite.

**Sin emojis en ningún sitio**, ni en la interfaz ni en los commits. Hay test.

**`node --test tests/` no necesita framework.** 25 contratos sobre tokens, tabla,
breakpoints y movimiento. Leen el código, no la pantalla: no sustituyen mirarla.

**Las skills de emilkowalski están vendorizadas** en `.agents/skills/`, con symlinks
relativos desde `.claude/skills/`. De ahí salen las reglas de movimiento de `DESIGN.md`.
