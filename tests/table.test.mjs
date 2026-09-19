import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { transformSync } from 'esbuild'
import { sortItems } from '../src/utils/sort.js'

// Render sin DOM: la fábrica devuelve el árbol tal cual, los hijos no se ejecutan.
function render(file, props) {
    const module = { exports: {} }
    const source = readFileSync(new URL('../src/' + file, import.meta.url), 'utf8')
    const { code } = transformSync(source, { loader: 'jsx', format: 'cjs', jsxFactory: 'element', jsxFragment: 'Fragment' })
    runInNewContext(code, {
        module, exports: module.exports, Fragment: 'fragment',
        element: (type, props, ...children) => ({ type, props: props || {}, children: children.flat() }),
        require: () => ({}),
    })
    return module.exports.default(props)
}

function nodes(tree) {
    return typeof tree === 'object' && tree !== null ? [tree, ...tree.children.flatMap(nodes)] : []
}

const ITEMS = [
    { id: 1, name: 'Uber', type: 'Platform', category: 'Gig Economy', status: 'Working', domain: 'uber.com' },
    { id: 2, name: 'Adyen', type: 'Payment Processor', category: 'Payments', status: 'Coming soon', domain: 'adyen.com' },
]

const table = (extra = {}) => render('components/DataTable/DataTable.jsx', {
    items: ITEMS, sortCol: null, sortDir: 'asc', onSort: () => {}, ...extra,
})

test('Tabla: cuatro columnas, con Categoría añadida a las tres de antes', () => {
    const headers = nodes(table()).filter(node => node.type === 'th')
    const labels = headers.map(th => nodes(th).flatMap(n => n.children).filter(c => typeof c === 'string')).flat()
    assert.deepEqual(labels.map(l => l.trim()).filter(Boolean), ['Platform', 'Type', 'Category', 'Status'])
})

test('Orden: el icono solo aparece en la columna activa', () => {
    const icons = tree => nodes(tree).filter(n => typeof n.type === 'function' && n.type.name === 'SortIcon')

    assert.equal(icons(table()).length, 0, 'sin columna activa no debe haber icono')
    assert.equal(icons(table({ sortCol: 'name' })).length, 1, 'el icono debe salir una sola vez')
})

test('Orden: aria-sort usa los valores que acepta la especificación', () => {
    const headers = nodes(table({ sortCol: 'name', sortDir: 'desc' })).filter(node => node.type === 'th')
    assert.deepEqual(headers.map(th => th.props['aria-sort']), ['descending', 'none', 'none', 'none'])
})

test('Estado: un chip de color por estado', () => {
    const chips = nodes(table()).filter(n => typeof n.props?.className === 'string' && n.props.className.includes('status-chip'))
    assert.deepEqual(chips.map(c => c.props.className), [
        'status-chip status-chip--working',
        'status-chip status-chip--soon',
    ])
})

test('Móvil: toda celda lleva data-label, que es lo que la reordena en tarjeta', () => {
    const cells = nodes(table()).filter(node => node.type === 'td')
    assert.equal(cells.length, ITEMS.length * 4)
    for (const cell of cells) assert.ok(cell.props['data-label'], 'celda sin data-label')
})

test('Vacío: mensaje propio en vez de una tabla sin filas', () => {
    const tree = table({ items: [] })
    assert.equal(tree.type, 'p')
    assert.match(tree.props.className, /state-msg/)
})

test('sortItems: ordena en ambos sentidos y respeta el sin-orden', () => {
    assert.deepEqual(sortItems(ITEMS, 'name', 'asc').map(i => i.name), ['Adyen', 'Uber'])
    assert.deepEqual(sortItems(ITEMS, 'name', 'desc').map(i => i.name), ['Uber', 'Adyen'])
    assert.equal(sortItems(ITEMS, null, 'asc'), ITEMS)
})
