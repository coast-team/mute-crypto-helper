try {
  global.crypto = require('node-webcrypto-ossl')
} catch (err) {
  console.warn(err.message)
  global.process.exit(1)
}

export * from './index.common'
