import { useState, useEffect } from 'react'

// El dominio alimenta la cascada de BrandLogo cuando simple-icons no trae la marca.
const MOCK_DATA = [
  { id: 1, name: 'Uber', type: 'Platform', category: 'Gig Economy', status: 'Working', domain: 'uber.com' },
  { id: 2, name: 'Lyft', type: 'Platform', category: 'Gig Economy', status: 'Working', domain: 'lyft.com' },
  { id: 3, name: 'DoorDash', type: 'Platform', category: 'Gig Economy', status: 'Working', domain: 'doordash.com' },
  { id: 4, name: 'Stripe', type: 'Payment Processor', category: 'Payments', status: 'Working', domain: 'stripe.com' },
  { id: 5, name: 'PayPal', type: 'Payment Processor', category: 'Payments', status: 'Working', domain: 'paypal.com' },
  { id: 6, name: 'Square', type: 'Payment Processor', category: 'Payments', status: 'Working', domain: 'squareup.com' },
  { id: 7, name: 'Adyen', type: 'Payment Processor', category: 'Payments', status: 'Coming soon', domain: 'adyen.com' },
  { id: 8, name: 'Braintree', type: 'Payment Processor', category: 'Payments', status: 'Working', domain: 'braintreepayments.com' },
  { id: 9, name: 'Stripe Connect', type: 'Payment Processor', category: 'Payments', status: 'Working', domain: 'stripe.com' },
  { id: 10, name: 'Rippling', type: 'Payroll', category: 'Payroll & HRIS', status: 'Working', domain: 'rippling.com' },
  { id: 11, name: 'Gusto', type: 'Payroll', category: 'Payroll & HRIS', status: 'Working', domain: 'gusto.com' },
  { id: 12, name: 'QuickBooks', type: 'Payroll', category: 'Payroll & HRIS', status: 'Working', domain: 'quickbooks.intuit.com' },
  { id: 13, name: 'ADP', type: 'Payroll', category: 'Payroll & HRIS', status: 'Coming soon', domain: 'adp.com' },
  { id: 14, name: 'Workday', type: 'HRIS', category: 'Payroll & HRIS', status: 'Coming soon', domain: 'workday.com' },
  { id: 15, name: 'Zenefits', type: 'Payroll', category: 'Payroll & HRIS', status: 'Working', domain: 'zenefits.com' },
  { id: 16, name: 'IRS', type: 'Tax Portal', category: 'Tax Portals', status: 'Working', domain: 'irs.gov' },
  { id: 17, name: 'TurboTax', type: 'Tax Software', category: 'Tax Portals', status: 'Working', domain: 'turbotax.intuit.com' },
  { id: 18, name: 'H&R Block', type: 'Tax Service', category: 'Tax Portals', status: 'Coming soon', domain: 'hrblock.com' },
  { id: 19, name: 'Salesforce', type: 'CRM', category: 'Tax Portals', status: 'Coming soon', domain: 'salesforce.com' },
  { id: 20, name: 'Comcast', type: 'Internet', category: 'Utilities', status: 'Working', domain: 'comcast.com' },
  { id: 21, name: 'AT&T', type: 'Telecom', category: 'Utilities', status: 'Working', domain: 'att.com' },
  { id: 22, name: 'Verizon', type: 'Telecom', category: 'Utilities', status: 'Working', domain: 'verizon.com' },
  { id: 23, name: 'T-Mobile', type: 'Telecom', category: 'Utilities', status: 'Coming soon', domain: 't-mobile.com' },
  { id: 24, name: 'PG&E', type: 'Utility', category: 'Utilities', status: 'Working', domain: 'pge.com' },
  { id: 25, name: 'Instacart', type: 'Platform', category: 'Gig Economy', status: 'Working', domain: 'instacart.com' },
  { id: 26, name: 'TaskRabbit', type: 'Platform', category: 'Gig Economy', status: 'Coming soon', domain: 'taskrabbit.com' },
  { id: 27, name: 'Grubhub', type: 'Platform', category: 'Gig Economy', status: 'Working', domain: 'grubhub.com' },
  { id: 28, name: 'Venmo', type: 'Payment Processor', category: 'Payments', status: 'Working', domain: 'venmo.com' },
  { id: 29, name: 'Square Payroll', type: 'Payroll', category: 'Payroll & HRIS', status: 'Coming soon', domain: 'squareup.com' },
  { id: 30, name: 'Xero', type: 'Accounting', category: 'Tax Portals', status: 'Working', domain: 'xero.com' },
]

export const useDatasources = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      setData(MOCK_DATA)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  return { data, loading, error }
}
