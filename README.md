Rate Limiter
---------

Provides a generic rate limiter for node.js. Useful for API clients, web
crawling, or other tasks that need to be throttled. Two classes are exposed,
RateLimiter and TokenBucket. TokenBucket provides a lower level interface to
rate limiting with a configurable burst rate and drip rate. RateLimiter sits
on top of the token bucket and adds a restriction on the maximum number of
tokens that can be removed each interval to comply with common API
restrictions like "150 requests per hour maximum".

## Installation ##

Use NPM to install:

    npm install @druide/rate-limiter

## Usage ##

A simple example allowing 150 requests per hour:

    const RateLimiter = require('@druide/rate-limiter')
    // Allow 150 requests per hour (the Twitter search limit). Also understands
    // 'second', 'minute', 'day', or a number of milliseconds
    const limiter = new RateLimiter(150, 'hour')

    // Throttle requests
    if (limiter.accept(1)) {
      callMyRequestSendingFunction(...)
    }

Another example allowing one message to be sent every 250ms:

    const RateLimiter = require('@druide/rate-limiter')
    const limiter = new RateLimiter(1, 250)

    if (limiter.accept(1)) {
      callMyMessageSendingFunction(...)
    }

Uses the token bucket directly to throttle at the byte level:

    const BURST_RATE = 1024 * 1024 * 150 // 150KB/sec burst rate
    const FILL_RATE = 1024 * 1024 * 50 // 50KB/sec sustained rate
    const TokenBucket = require('@druide/rate-limiter').TokenBucket
    // We could also pass a parent token bucket in as the last parameter to
    // create a hierarchical token bucket
    const bucket = new TokenBucket(BURST_RATE, FILL_RATE, 'second')

    if (bucket.accept(myData.byteLength)) {
      sendMyData(myData)
    })

Throttle any function

    const throttle = require('@druide/rate-limiter').throttle
    const log = throttle(console.log, 10, 10000)
    let i = 0
    setInterval(() => {
        log(++i)
    }, 100)

## License ##

(The MIT License)

Copyright (c) 2011 Cull TV, Inc. <jhurliman@cull.tv>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
