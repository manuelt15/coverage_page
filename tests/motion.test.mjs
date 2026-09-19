import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, globSync } from 'node:fs'
import postcss from 'postcss'

const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8')
const files = globSync('src/**/*.css', { cwd: new URL('../', import.meta.url) })
const sheets = files.map(file => ({ file, root: postcss.parse(read(file)) }))

test('Transiciones: propiedades explícitas, nunca all', () => {
    for (const { file, root } of sheets) {
        root.walkDecls('transition', decl => {
            assert.ok(!/\ball\b/.test(decl.value), `${file}: transition all anima de más y cuesta caro`)
        })
    }
})

test('Duraciones: nada por encima de 300ms en interfaz', () => {
    for (const { file, root } of sheets) {
        root.walkDecls(decl => {
            if (!/^transition/.test(decl.prop)) return
            for (const match of decl.value.matchAll(/([\d.]+)(ms|s)\b/g)) {
                const ms = match[2] === 's' ? parseFloat(match[1]) * 1000 : parseFloat(match[1])
                assert.ok(ms <= 300, `${file}: ${match[0]} se sale del presupuesto de 300ms`)
            }
        })
    }
})

test('Easing: ease-in nunca, y las curvas salen de un token', () => {
    for (const { file, root } of sheets) {
        root.walkDecls(decl => {
            if (!/^transition|^animation/.test(decl.prop)) return
            assert.ok(
                !/\bease-in\b(?!-out)/.test(decl.value),
                `${file}: ease-in arranca lento justo donde se está mirando`,
            )
            assert.ok(
                !/cubic-bezier/.test(decl.value),
                `${file}: la curva va en un token, no suelta en el componente`,
            )
        })
    }
})

test('Hover: solo con puntero fino, que en táctil se dispara al tocar', () => {
    for (const { file, root } of sheets) {
        root.walkRules(rule => {
            if (!rule.selector.includes(':hover')) return
            const parent = rule.parent
            const gated = parent.type === 'atrule'
                && parent.params.includes('hover: hover')
                && parent.params.includes('pointer: fine')
            assert.ok(gated, `${file}: ${rule.selector} sin puerta de puntero`)
        })
    }
})

test('Pulsación: los controles responden al dedo', () => {
    const pressable = [
        ['src/components/Tabs/Tabs.css', '.tab:active'],
        ['src/components/StatusChips/StatusChips.css', '.chip:active'],
    ]
    for (const [file, selector] of pressable) {
        let transform = null
        sheets.find(s => s.file === file).root.walkRules(rule => {
            if (rule.selector !== selector || rule.parent.type === 'atrule') return
            rule.walkDecls('transform', decl => { transform = decl.value })
        })
        assert.match(transform ?? '', /scale\(0\.9[0-9]?\)/, `${file}: ${selector} sin respuesta a la pulsación`)
    }
})

test('Movimiento reducido: se va el desplazamiento, se queda el color', () => {
    const root = postcss.parse(read('src/index.css'))
    let block = null
    root.walkAtRules('media', rule => {
        if (rule.params.includes('prefers-reduced-motion: reduce')) block = rule
    })
    assert.ok(block, 'falta la alternativa de movimiento reducido')

    const css = block.toString()
    assert.match(css, /animation: none/, 'las animaciones deben pararse')
    assert.ok(!/transition: none !important/.test(css), 'apagar toda transición se lleva por delante el color, que sí ayuda')
    assert.match(css, /transform: none/, 'el desplazamiento sí se va')
})
