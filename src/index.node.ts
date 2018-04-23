try {
  const webcrypto = require('node-webcrypto-ossl')
  global.crypto = new webcrypto()
} catch (err) {
  console.warn(err.message)
  global.process.exit(1)
}

export * from './index.common'
