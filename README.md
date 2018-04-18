# Crypto API wrapper

This lib is a wrapper around the [Web Crypto API][1], it offers an API
with sane defaults.

## Installation

```sh
npm i crypto-api-wrapper
```

## Usage

This lib exports 2 objects : asymmetricCrypto and symmetricCrypto

### asymmetricCrypto API

* generateSigningKey()
* generateEncryptionKey()
* exportKey(keypair)
* importKey(keydata)
* sign(plaintext, privateKey)
* verify(plaintext, signature, publicKey)
* encrypt(plaintext, publicKey)
* decrypt(ciphertext, privateKey)

### symmetricCrypto API

* generateEncryptionKey()
* exportKey(keypair)
* importKey(keydata)
* encrypt(plaintext, encryptionKey)
* decrypt(ciphertext, encryptionKey)

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
