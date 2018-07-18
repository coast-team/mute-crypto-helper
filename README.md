# Crypto API wrapper

This lib is a wrapper around the [Web Crypto API][1], it offers an API
with sane defaults. The documentation can be found [here][2].

## Installation

```sh
npm i crypto-api-wrapper
```

## Usage

This lib exports 2 objects : asymmetricCrypto and symmetricCrypto

### asymmetricCrypto API

- generateSigningKey()
- generateEncryptionKey()
- exportKey(keypair)
- importKey(keydata)
- sign(plaintext, privateKey)
- verify(plaintext, signature, publicKey)
- encrypt(plaintext, publicKey)
- decrypt(ciphertext, privateKey)

### symmetricCrypto API

- generateEncryptionKey()
- exportKey(encryptionKey)
- toB64(keydata)
- fromB64(keydataB64)
- importKey(keydata)
- encrypt(plaintext, encryptionKey)
- decrypt(ciphertext, encryptionKey)

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
[2]: https://coast-team.github.io/crypto-api-wrapper/

## Contributing

### Install dependencies

```sh
npm i
npm i --no-save node-webcrypto-ossl
```

### Run the tests

Run the test in a browser :

```sh
npm run test
```

Run the test with NodeJS :

```sh
npm run test-node
```

### Generate the documentation

```sh
npm run doc
```
