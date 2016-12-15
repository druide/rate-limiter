require('@druide/flow-remove-types-register')({module: '@druide/rate-limiter'})

module.exports = require('./lib/rate-limiter')
module.exports.TokenBucket = require('./lib/token-bucket')
module.exports.throttle = require('./lib/throttle')
