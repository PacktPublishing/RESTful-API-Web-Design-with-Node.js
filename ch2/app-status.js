// Define the target URL and the interval in milliseconds
const targetUrl = 'https://httpbin.org/get'
const checkInterval = 10000 // 10 seconds

async function checkApplicationStatus() {
  const response = await fetch(targetUrl)

  // Check if the status code is in the range of 200-299
  if (response.ok) {
    console.log(`Application is up. Status code: ${response.status}.`)
  } else {
    console.log(
      `Application is down or unreachable. Status code: ${response.status}.`
    )
  }
}

// Run the check function every 30 seconds
setInterval(checkApplicationStatus, checkInterval)
