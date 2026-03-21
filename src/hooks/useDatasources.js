import { useState } from 'react'

const MOCK_DATA = [
  { id: 1, name: 'Uber', type: 'Platform', category: 'Gig Economy', status: 'Working', logoUrl: '/1.avif' },
  { id: 2, name: 'Lyft', type: 'Platform', category: 'Gig Economy', status: 'Working', logoUrl: '/2.jpg' },
  { id: 3, name: 'DoorDash', type: 'Platform', category: 'Gig Economy', status: 'Working', logoUrl: '/3.avif' },
  { id: 4, name: 'Stripe', type: 'Payment Processor', category: 'Payments', status: 'Working', logoUrl: '/vite.svg' },
  { id: 5, name: 'PayPal', type: 'Payment Processor', category: 'Payments', status: 'Working', logoUrl: '/1.avif' },
  { id: 6, name: 'Square', type: 'Payment Processor', category: 'Payments', status: 'Working', logoUrl: '/2.jpg' },
  { id: 7, name: 'Adyen', type: 'Payment Processor', category: 'Payments', status: 'Coming soon', logoUrl: '/3.avif' },
  { id: 8, name: 'Braintree', type: 'Payment Processor', category: 'Payments', status: 'Working', logoUrl: '/vite.svg' },
  { id: 9, name: 'Stripe Connect', type: 'Payment Processor', category: 'Payments', status: 'Working', logoUrl: '/1.avif' },
  { id: 10, name: 'Rippling', type: 'Payroll', category: 'Payroll & HRIS', status: 'Working', logoUrl: '/2.jpg' },
  { id: 11, name: 'Gusto', type: 'Payroll', category: 'Payroll & HRIS', status: 'Working', logoUrl: '/3.avif' },
  { id: 12, name: 'QuickBooks', type: 'Payroll', category: 'Payroll & HRIS', status: 'Working', logoUrl: '/vite.svg' },
  { id: 13, name: 'ADP', type: 'Payroll', category: 'Payroll & HRIS', status: 'Coming soon', logoUrl: '/1.avif' },
  { id: 14, name: 'Workday', type: 'HRIS', category: 'Payroll & HRIS', status: 'Coming soon', logoUrl: '/2.jpg' },
  { id: 15, name: 'Zenefits', type: 'Payroll', category: 'Payroll & HRIS', status: 'Working', logoUrl: '/3.avif' },
  { id: 16, name: 'IRS', type: 'Tax Portal', category: 'Tax Portals', status: 'Working', logoUrl: '/vite.svg' },
  { id: 17, name: 'TurboTax', type: 'Tax Software', category: 'Tax Portals', status: 'Working', logoUrl: '/1.avif' },
  { id: 18, name: 'H&R Block', type: 'Tax Service', category: 'Tax Portals', status: 'Coming soon', logoUrl: '/2.jpg' },
  { id: 19, name: 'Salesforce', type: 'CRM', category: 'Tax Portals', status: 'Coming soon', logoUrl: '/3.avif' },
  { id: 20, name: 'Comcast', type: 'Internet', category: 'Utilities', status: 'Working', logoUrl: '/vite.svg' },
  { id: 21, name: 'AT&T', type: 'Telecom', category: 'Utilities', status: 'Working', logoUrl: '/1.avif' },
  { id: 22, name: 'Verizon', type: 'Telecom', category: 'Utilities', status: 'Working', logoUrl: '/2.jpg' },
  { id: 23, name: 'T-Mobile', type: 'Telecom', category: 'Utilities', status: 'Coming soon', logoUrl: '/3.avif' },
  { id: 24, name: 'PG&E', type: 'Utility', category: 'Utilities', status: 'Working', logoUrl: '/vite.svg' },
  { id: 25, name: 'Instacart', type: 'Platform', category: 'Gig Economy', status: 'Working', logoUrl: '/1.avif' },
  { id: 26, name: 'TaskRabbit', type: 'Platform', category: 'Gig Economy', status: 'Coming soon', logoUrl: '/2.jpg' },
  { id: 27, name: 'Grubhub', type: 'Platform', category: 'Gig Economy', status: 'Working', logoUrl: '/3.avif' },
  { id: 28, name: 'Venmo', type: 'Payment Processor', category: 'Payments', status: 'Working', logoUrl: '/vite.svg' },
  { id: 29, name: 'Square Payroll', type: 'Payroll', category: 'Payroll & HRIS', status: 'Coming soon', logoUrl: '/1.avif' },
  { id: 30, name: 'Xero', type: 'Accounting', category: 'Tax Portals', status: 'Working', logoUrl: '/2.jpg' },
]

export const useDatasources = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useState(() => {
    try {
      setData(MOCK_DATA)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  })

  return { data, loading, error }
}
