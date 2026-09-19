import { useState } from 'react'
import {
  siAdp, siAdyen, siAtandt, siBraintree, siDoordash, siGusto, siInstacart,
  siLyft, siPaypal, siQuickbooks, siSquare, siStripe, siUber, siVenmo,
  siVerizon, siXero,
} from 'simple-icons'
import './BrandLogo.css'

// Cascada de tres pasos: icono vectorial de marca, favicon del dominio, monograma.
// simple-icons cubre 16 de las 30 plataformas; el resto no está en el catálogo.
const ICONS = {
  'ADP': siAdp,
  'AT&T': siAtandt,
  'Adyen': siAdyen,
  'Braintree': siBraintree,
  'DoorDash': siDoordash,
  'Gusto': siGusto,
  'Instacart': siInstacart,
  'Lyft': siLyft,
  'PayPal': siPaypal,
  'QuickBooks': siQuickbooks,
  'Square': siSquare,
  'Square Payroll': siSquare,
  'Stripe': siStripe,
  'Stripe Connect': siStripe,
  'Uber': siUber,
  'Venmo': siVenmo,
  'Verizon': siVerizon,
  'Xero': siXero,
}

// Fondos del monograma: paleta sticker, que es decoración y aquí no estructura nada.
const MONOGRAM_TINTS = [
  'var(--accent-sky)', 'var(--accent-purple)', 'var(--accent-pink)',
  'var(--accent-teal)', 'var(--accent-green)', 'var(--accent-orange)',
]

const tintFor = (name) => {
  let hash = 0
  for (const char of name) hash = (hash * 31 + char.charCodeAt(0)) % 997
  return MONOGRAM_TINTS[hash % MONOGRAM_TINTS.length]
}

const initial = (name) => name.replace(/[^\p{L}\p{N}]/gu, '').charAt(0).toUpperCase() || '?'

const BrandLogo = ({ name, domain }) => {
  const [faviconFailed, setFaviconFailed] = useState(false)
  const icon = ICONS[name]

  if (icon) {
    return (
      <span className="brand-logo" aria-hidden="true">
        <svg viewBox="0 0 24 24" role="presentation" style={{ fill: `#${icon.hex}` }}>
          <path d={icon.path} />
        </svg>
      </span>
    )
  }

  if (domain && !faviconFailed) {
    return (
      <span className="brand-logo" aria-hidden="true">
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt=""
          loading="lazy"
          onError={() => setFaviconFailed(true)}
        />
      </span>
    )
  }

  return (
    <span className="brand-logo brand-logo--monogram" style={{ background: tintFor(name) }} aria-hidden="true">
      {initial(name)}
    </span>
  )
}

export default BrandLogo
