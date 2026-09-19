import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, globSync } from 'node:fs'
import postcss from 'postcss'

const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8')
const files = globSync('src/**/*.css', { cwd: new URL('../', import.meta.url) })
const sheets = files.map(file => ({ file, root: postcss.parse(read(file)) }))

// Declaraciones de un selector, opcionalmente dentro de una media query de ancho máximo.
function declsAt(file, selector, maxWidth) {
    const out = {}
    sheets.find(sheet => sheet.file === file).root.walkRules(rule => {
        if (rule.selector !== selector) return
        const media = rule.parent.type === 'atrule' ? parseInt(rule.parent.params.match(/max-width:\s*(\d+)/)?.[1] ?? '0', 10) : null
        if (maxWidth ? media !== maxWidth : media !== null) return
        rule.walkDecls(decl => { out[decl.prop] = decl.value })
    })
    return out
}

test('Móvil ≤600: la tabla se reordena en tarjetas, no en scroll horizontal', () => {
    const file = 'src/components/DataTable/DataTable.css'
    assert.equal(declsAt(file, '.data-table thead', 600).display, 'none', 'la cabecera debe desaparecer')
    assert.equal(declsAt(file, '.data-table td', 600).display, 'flex', 'las celdas pasan a fila etiquetada')
    assert.match(declsAt(file, '.data-table td::before', 600).content ?? '', /attr\(data-label\)/)
    assert.match(declsAt(file, '.data-table tbody tr', 600)['border-radius'] ?? '', /var\(--radius-/)
})

test('Móvil ≤600: el título del hero baja de escala', () => {
    const base = declsAt('src/App.css', '.hero-title').font
    const small = declsAt('src/App.css', '.hero-title', 600).font
    assert.match(base, /--text-display-1/)
    assert.ok(small && small !== base, 'display-1 a 64px no cabe en un móvil')
})

test('Categorías: en móvil la fila de píldoras desliza en vez de romper el ancho', () => {
    const tabs = declsAt('src/components/Tabs/Tabs.css', '.tabs', 600)
    assert.equal(tabs['overflow-x'], 'auto')
    assert.match(tabs['flex-flow'] ?? '', /nowrap/)
})

test('Nada se ancla con position fixed ni se mide en vh artificiales', () => {
    for (const { file, root } of sheets) {
        root.walkDecls('position', decl => {
            assert.notEqual(decl.value, 'fixed', `${file}: position fixed rompe el flujo en móvil`)
        })
        root.walkDecls(decl => {
            if (!/^(height|min-height)$/.test(decl.prop)) return
            if (file.endsWith('index.css') && decl.value === '100dvh') return
            assert.ok(!/\d+vh\b/.test(decl.value), `${file}: ${decl.prop}: ${decl.value}`)
        })
    }
})

test('El contenedor y los anchos de columna salen del sistema', () => {
    const container = declsAt('src/App.css', '.app-main')['max-width']
    assert.equal(container, 'var(--container)')
})
