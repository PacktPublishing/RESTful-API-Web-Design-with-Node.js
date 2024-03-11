const winston = require('winston')

// Define the target URL and the interval in milliseconds
const targetUrl = 'https://httpbin.org/get'
const checkInterval = 10000 // 10 seconds

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'application_status.log' }),
  ],
})

async function checkApplicationStatus() {
  const response = await fetch(targetUrl)

  // Check if the status code is in the range of 200-299
  if (response.ok) {
    logger.info(`Application is up. Status code: ${response.status}.`)
  } else {
    logger.warn(
      `Application is down or unreachable. Status code: ${response.status}.`
    )
  }
}

// Run the check function every 10 seconds
setInterval(checkApplicationStatus, checkInterval)
