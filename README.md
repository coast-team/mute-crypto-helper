# Crypto API wrapper

## Web Crypto wrapper

Currently this lib is a wrapper around the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) and it offers an API with sane defaults

API :

* generateSigningKey()
* generateEncryptionKey()
* exportKey(keypair)
* importKey(keydata)
* sign(plaintext, privateKey)
* verify(plaintext, signature, publicKey)
* encrypt(plaintext, publicKey)
* decrypt(ciphertext, privateKey)
* isCryptoKeyPair(keyPair)
* isCryptoKey(key)
* isPrivateKey(key)
* isPublicKey(key)
