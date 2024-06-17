import express from 'express'
import { processPayment } from './services/processing.js'

const app = express()

app.use(express.json())

app.post('/charges', async (req, res) => {
  const { creditCardNumber, amount } = req.body

  try {
    await processPayment(creditCardNumber, amount)
    res.status(201).json({ message: 'Charge created' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})
