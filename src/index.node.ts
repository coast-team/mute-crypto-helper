import { env } from './misc/env'

try {
  const webcrypto = require('node-webcrypto-ossl')
  env.crypto = new webcrypto() as Crypto
} catch (err) {
  console.error(err.message)
}

export * from './index.common'
