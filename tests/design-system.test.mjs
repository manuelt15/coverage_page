import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, globSync } from 'node:fs'
import postcss from 'postcss'

const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8')
const cssFiles = globSync('src/**/*.css', { cwd: new URL('../', import.meta.url) })
const componentSheets = cssFiles.filter(file => !file.endsWith('tokens.css'))

test('Tokens: los componentes no escriben colores, radios ni sombras literales', () => {
    for (const file of componentSheets) {
        const root = postcss.parse(read(file))
        root.walkDecls(decl => {
            const prop = decl.prop
            const value = decl.value

            if (/color|background|fill|stroke|border-color|box-shadow/.test(prop)) {
                assert.ok(
                    !/#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(/i.test(value),
                    `${file}: ${prop}: ${value} debe salir de un token`,
                )
            }
            if (prop === 'border-radius') {
                assert.ok(/var\(--radius-/.test(value) || value === '0', `${file}: radio literal ${value}`)
            }
            if (prop === 'box-shadow') {
                assert.ok(/var\(--(shadow-|focus-ring)/.test(value) || value === 'none', `${file}: sombra literal ${value}`)
            }
        })
    }
})

test('Tokens: la escala del sistema está completa en tokens.css', () => {
    const root = postcss.parse(read('src/styles/tokens.css'))
    const declared = new Set()
    // Ojo: postcss corta el recorrido si el callback devuelve false, nada de arrows con &&.
    root.walkDecls(decl => { if (decl.prop.startsWith('--')) declared.add(decl.prop) })

    for (const token of [
        '--primary', '--primary-active', '--secondary', '--on-primary',
        '--canvas', '--canvas-soft', '--surface', '--hairline',
        '--ink', '--ink-secondary', '--ink-muted', '--ink-faint',
        '--accent-green', '--accent-orange', '--accent-sky', '--accent-purple', '--accent-pink', '--accent-teal',
        '--radius-xs', '--radius-sm', '--radius-md', '--radius-lg', '--radius-xl', '--radius-full',
        '--shadow-1', '--shadow-2', '--focus-ring', '--container',
    ]) {
        assert.ok(declared.has(token), `falta el token ${token}`)
    }
})

test('Tipografía: los títulos aplican el tracking negativo explícito', () => {
    const root = postcss.parse(read('src/styles/tokens.css'))
    const tracks = {}
    root.walkDecls(decl => { if (decl.prop.startsWith('--track-')) tracks[decl.prop] = decl.value })

    for (const token of ['--track-display-1', '--track-display-2', '--track-heading-1', '--track-heading-2']) {
        assert.ok(tracks[token], `falta ${token}`)
        assert.ok(parseFloat(tracks[token]) < 0, `${token} debe ser negativo, Inter sin él lee más suelto`)
    }
})

test('El azul estructural no se usa como decoración de fondo', () => {
    for (const file of componentSheets) {
        const root = postcss.parse(read(file))
        root.walkDecls('background', decl => {
            assert.ok(
                !/var\(--primary\)/.test(decl.value),
                `${file}: el azul pinta acciones y enlaces, no fondos decorativos`,
            )
        })
    }
})

test('Cero emojis en el código y en el HTML', () => {
    const files = [...globSync('src/**/*.{js,jsx,css}', { cwd: new URL('../', import.meta.url) }), 'index.html']
    for (const file of files) {
        const match = read(file).match(/\p{Extended_Pictographic}/u)
        assert.equal(match, null, `${file}: emoji encontrado (${match?.[0]})`)
    }
})

test('El aviso de demo sigue en pie', () => {
    const jsx = read('src/App.jsx')
    assert.match(jsx, /hero-note/, 'falta el aviso de que los datos no son reales')
    assert.match(jsx, /sample data|Demo project/i, 'el aviso debe decir que el proyecto es de prueba')
})

test('La pestaña del navegador no arrastra el defecto de Vite', () => {
    const html = read('index.html')
    assert.ok(!/vite\.svg/.test(html), 'sigue enlazando el favicon de Vite')
    assert.match(html, /href="\/favicon\.svg"/, 'falta el favicon propio')
    assert.ok(!/<title>coverage-page<\/title>/.test(html), 'el título sigue siendo el del scaffold')
    assert.match(html, /<title>[^<]+<\/title>/)
})
