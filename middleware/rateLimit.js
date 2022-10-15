const rateLimit = require('express-rate-limit');

// SET RATE LIMIT
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 1000, // Limit each IP to 1000 requests per `window` (here 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Maximum requests exceeded',
})

module.exports = limiter;
