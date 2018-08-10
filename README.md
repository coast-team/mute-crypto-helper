# Mute-Crypto-Helper

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/7f57d309a20e4a2ba0e20337898b0b4f)](https://app.codacy.com/app/kalitine/mute-crypto-helper?utm_source=github.com&utm_medium=referral&utm_content=coast-team/mute-crypto-helper&utm_campaign=badger)
[![Build Status](https://travis-ci.org/coast-team/mute-crypto-helper.svg?branch=master)](https://travis-ci.org/coast-team/mute-crypto-helper)

Isomorphic API exporting helper functions for `mute-crypto` project. It is powered by [Web Crypto API][1] for the client side and by [node-webcrypto-ossl][3] for NodeJS. The documentation can be found [here][2].

## Install

```sh
npm install mute-crypto-helper
```

For NodeJS, `node-webcrypto-ossl` peer dependency is also required.

```sh
npm install node-webcrypto-oss
```

## Usage

This lib exports 2 objects: `asymmetricCrypto`, `symmetricCrypto` and `keyAgreementCrypto`.

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
