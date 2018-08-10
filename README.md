# Mute-Crypto-Helper

[![Build Status](https://travis-ci.org/coast-team/mute-crypto-helper.svg?branch=master)](https://travis-ci.org/coast-team/mute-crypto-helper)
[![install size](https://packagephobia.now.sh/badge?p=@coast-team/mute-crypto-helper@1.0.0-beta.0)](https://packagephobia.now.sh/result?p=@coast-team/mute-crypto-helper@1.0.0-beta.0)

Isomorphic API exporting helper functions for `mute-crypto` project. It is powered by [Web Crypto API][1] for the client side and by [node-webcrypto-ossl][3] for NodeJS. The documentation can be found [here][2].

## Install

```sh
npm install @coast-team/mute-crypto-helper
```

For NodeJS, `node-webcrypto-ossl` peer dependency is also required.

```sh
npm install node-webcrypto-oss
```

## Usage

3 objects are exported by the API: `asymmetricCrypto`, `symmetricCrypto` and `keyAgreementCrypto`.

```javascript
import { asymmetricCrypto, symmetricCrypto, keyAgreementCrypto } from '@coast-team/mute-crypto-helper'
```

Or

```javascript
const { asymmetricCrypto, symmetricCrypto, keyAgreementCrypto } = require('@coast-team/mute-crypto-helper')
```

## Tests

Run the test in a browser:

```sh
npm run test
```

Run the test with NodeJS:

```sh
npm run test-node
```

## Generate the documentation

```sh
npm run doc
```

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
[2]: https://coast-team.github.io/mute-crypto-helper/
[3]: https://github.com/PeculiarVentures/node-webcrypto-ossl
