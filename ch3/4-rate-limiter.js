function createRequestCounter(maxRequestsPerMinute) {
  let requestCount = 0
  let lastResetTime = Date.now()

  function resetCounter() {
    requestCount = 0
    lastResetTime = Date.now() + 60000 // Reset every minute
  }

  function isRateLimited() {
    if (Date.now() >= lastResetTime) {
      resetCounter()
    }

    if (requestCount >= maxRequestsPerMinute) {
      return true
    }

    requestCount++
    return false
  }

  return {
    isRateLimited,
  }
}

module.exports = createRequestCounter
