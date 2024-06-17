async function processPayment(creditCardNumber, amount) {
  const response = await fetch('https://api.stripe.com/v1/charges', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer sk_test_wsFx86XDJWwmE4dMskBgJYrt',
    },
    body: JSON.stringify({
      amount,
      currency: 'usd',
      source: creditCardNumber,
    }),
  })

  if (!response.ok) {
    throw new Error('Payment failed')
  }

  return response.json()
}
