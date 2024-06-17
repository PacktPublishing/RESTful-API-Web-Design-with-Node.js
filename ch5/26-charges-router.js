import express from 'express'
import createRateLimitMiddleware from './24-rate-limiter.js'

const router = express.Router()

/**
 * Database records
 */
const charges = [
  { id: 12345, amount: 100, date: new Date('2023-12-23') },
  { id: 12346, amount: 30, date: new Date('2024-01-03') },
  { id: 12347, amount: 4, date: new Date('2024-02-04') },
]

/**
 * base path: /charges
 */
router.use(createRateLimitMiddleware(5))

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Charge created' })
})

router.post('/:id', (req, res) => {
  const id = Number(req.params.id)
  const { amount } = req.body

  const charge = charges.find((charge) => charge.id === id)

  if (!charge) {
    res.status(404).json({ message: 'Charge not found' })
    return
  }

  charge.amount = amount

  res.status(200).json({ message: 'Charge updated' })
})

router.get('/:id', (req, res) => {
  res.status(200).json({ message: 'Charge retrieved' })
})

router.get('/', (req, res) => {
  const startDate = new Date(req.query.startDate)
  const filteredCharges = charges.filter((charge) => charge.date >= startDate)
  res.status(200).json(filteredCharges)
})

router.get('/search', (req, res) => {
  res.status(200).json({ message: 'Charge searched' })
})

export default router
