// Copyright 2017-2018 Jean-Philippe Eisenbarth
//
// This file is part of Crypto API wrapper.
//
// Crypto API Wrapper is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Crypto API Wrapper is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Crypto API Wrapper. See the file COPYING.  If not, see <http://www.gnu.org/licenses/>.

import * as asymCrypto from "../src/asymmetricCrypto"
import * as helper from "./helper"

describe("Asymmetric Crypto API wrapper test\n", () => {
    let cryptoSigningKeypair
    let cryptoEncryptionKeypair
    const importKeyError = "TypeError"
    const importKeyErrorMessage =
        "keyDataObj isn't valid ... it should be the same obj as returned by exportKey."

    beforeAll((done) => {
        asymCrypto.generateSigningKey()
            .then((key) => {
                cryptoSigningKeypair = key
                return asymCrypto.generateEncryptionKey()
            })
            .then((key2) => {
                cryptoEncryptionKeypair = key2
                done()
            })
    })

    it("isPublicKey", () => {
        expect(asymCrypto.isPublicKey(cryptoSigningKeypair.publicKey))
            .toBeTruthy()
        expect(asymCrypto.isPublicKey(cryptoSigningKeypair.privateKey))
            .toBeFalsy()
        expect(asymCrypto.isPublicKey(cryptoEncryptionKeypair.publicKey))
            .toBeTruthy()
        expect(asymCrypto.isPublicKey(cryptoEncryptionKeypair.privateKey))
            .toBeFalsy()
        expect(asymCrypto.isPublicKey("test"))
            .toBeFalsy()
        expect(asymCrypto.isPublicKey({}))
            .toBeFalsy()
    })

    it("isPrivateKey", () => {
        expect(asymCrypto.isPrivateKey(cryptoSigningKeypair.privateKey))
            .toBeTruthy()
        expect(asymCrypto.isPrivateKey(cryptoSigningKeypair.publicKey))
            .toBeFalsy()
        expect(asymCrypto.isPrivateKey(cryptoEncryptionKeypair.privateKey))
            .toBeTruthy()
        expect(asymCrypto.isPrivateKey(cryptoEncryptionKeypair.publicKey))
            .toBeFalsy()
        expect(asymCrypto.isPrivateKey({}))
            .toBeFalsy()
        expect(asymCrypto.isPrivateKey("test"))
            .toBeFalsy()
    })

    it("isCryptoKeyPair", () => {
        expect(asymCrypto.isCryptoKeyPair(cryptoSigningKeypair))
            .toBeTruthy()
        expect(asymCrypto.isCryptoKeyPair(cryptoEncryptionKeypair))
            .toBeTruthy()
        expect(asymCrypto.isCryptoKeyPair({
            publicKey: {},
            privateKey: {}
        }))
            .toBeFalsy()
        expect(asymCrypto.isCryptoKeyPair({
            publicKey: cryptoSigningKeypair.publicKey
        }))
            .toBeFalsy()
        expect(asymCrypto.isCryptoKeyPair({
            privateKey: cryptoSigningKeypair.privateKey
        }))
            .toBeFalsy()
        expect(asymCrypto.isCryptoKeyPair({
            publicKey: {},
            privateKey: cryptoSigningKeypair.privateKey
        }))
            .toBeFalsy()
        expect(asymCrypto.isCryptoKeyPair({
            publicKey: "test",
            privateKey: cryptoSigningKeypair.privateKey
        }))
            .toBeFalsy()
        expect(asymCrypto.isCryptoKeyPair({
            publicKey: cryptoSigningKeypair.publicKey,
            privateKey: "test"
        }))
            .toBeFalsy()
        expect(asymCrypto.isCryptoKeyPair({
            publicKey: cryptoSigningKeypair.privateKey,
            privateKey: cryptoSigningKeypair.publicKey
        }))
            .toBeFalsy()
        expect(asymCrypto.isCryptoKeyPair("test"))
            .toBeFalsy()
    })

    it("exportKey(key), importkey should succeed (key is a signing KeyPair)", (done) => {
        asymCrypto.exportKey(cryptoSigningKeypair)
            .then((keyDataObj) => asymCrypto.importKey(keyDataObj))
            .then((keyPair) => {
                expect(keyPair.hasOwnProperty("publicKey") && asymCrypto.isPublicKey(keyPair.publicKey))
                    .toBeTruthy()
                expect(keyPair.hasOwnProperty("privateKey") && asymCrypto.isPrivateKey(keyPair.privateKey))
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    it("exportKey(key), importkey should succeed (key is a encryption KeyPair)", (done) => {
        asymCrypto.exportKey(cryptoEncryptionKeypair)
            .then((keyDataObj) => asymCrypto.importKey(keyDataObj))
            .then((keyPair) => {
                expect(keyPair.hasOwnProperty("publicKey") && asymCrypto.isPublicKey(keyPair.publicKey))
                    .toBeTruthy()
                expect(keyPair.hasOwnProperty("privateKey") && asymCrypto.isPrivateKey(keyPair.privateKey))
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    it("exportKey(key), importkey should succeed (key is a signing public key)", (done) => {
        asymCrypto.exportKey(cryptoSigningKeypair.publicKey)
            .then((keyDataObj) => asymCrypto.importKey(keyDataObj))
            .then((keyPair) => {
                expect(keyPair.hasOwnProperty("publicKey") && asymCrypto.isPublicKey(keyPair.publicKey))
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    it("exportKey(key), importkey should succeed (key is a signing private key)", (done) => {
        asymCrypto.exportKey(cryptoSigningKeypair.privateKey)
            .then((keyDataObj) => asymCrypto.importKey(keyDataObj))
            .then((keyPair) => {
                expect(keyPair.hasOwnProperty("privateKey") && asymCrypto.isPrivateKey(keyPair.privateKey))
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    it("exportKey(key), importkey should succeed (key is a encryption public key)", (done) => {
        asymCrypto.exportKey(cryptoEncryptionKeypair.publicKey)
            .then((keyDataObj) => asymCrypto.importKey(keyDataObj))
            .then((keyPair) => {
                expect(keyPair.hasOwnProperty("publicKey") && asymCrypto.isPublicKey(keyPair.publicKey))
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    it("exportKey(key), importkey should succeed (key is a encryption private key)", (done) => {
        asymCrypto.exportKey(cryptoEncryptionKeypair.privateKey)
            .then((keyDataObj) => asymCrypto.importKey(keyDataObj))
            .then((keyPair) => {
                expect(keyPair.hasOwnProperty("privateKey") && asymCrypto.isPrivateKey(keyPair.privateKey))
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    /*
      IMPORTKEY (fail)
    */

    it("importkey(key) should throw a TypeError if key is a string", (done) => {
        asymCrypto.importKey("test")
            .then(fail)
            .catch((err) => {
                expect(err.constructor.name)
                    .toEqual(importKeyError)
                expect(err.message)
                    .toEqual(importKeyErrorMessage)
                done()
            })
    })

    it("importkey(key) should throw a TypeError if key is a empty object", (done) => {
        asymCrypto.importKey({})
            .then(fail)
            .catch((err) => {
                expect(err.constructor.name)
                    .toEqual(importKeyError)
                expect(err.message)
                    .toEqual(importKeyErrorMessage)
                done()
            })
    })
    it("importkey(key) should throw a TypeError if key is a object that contains null for PK and PrK", (done) => {
        asymCrypto.importKey({
            publicKey: null,
            privateKey: null
        })
            .then(fail)
            .catch((err) => {
                expect(err.constructor.name)
                    .toEqual(importKeyError)
                expect(err.message)
                    .toEqual(importKeyErrorMessage)
                done()
            })
    })

    it("importkey(key) should throw a TypeError if key is a is a object that contains undefined for PK and PrK",
        (done) => {
            asymCrypto.importKey({
                publicKey: undefined,
                privateKey: undefined
            })
                .then(fail)
                .catch((err) => {
                    expect(err.constructor.name)
                        .toEqual(importKeyError)
                    expect(err.message)
                        .toEqual(importKeyErrorMessage)
                    done()
                })
        })
    it("importkey(key) should throw a TypeError if key is a object that contains a string for PK", (done) => {
        asymCrypto.importKey({
            publicKey: "test",
            privateKey: null
        })
            .then(fail)
            .catch((err) => {
                expect(err.constructor.name)
                    .toEqual(importKeyError)
                expect(err.message)
                    .toEqual(importKeyErrorMessage)
                done()
            })
    })

    it("importkey(key) should throw a TypeError if key is a object that contains a string for PrK", (done) => {
        asymCrypto.importKey({
            publicKey: null,
            privateKey: "test"
        })
            .then(fail)
            .catch((err) => {
                expect(err.constructor.name)
                    .toEqual(importKeyError)
                expect(err.message)
                    .toEqual(importKeyErrorMessage)
                done()
            })
    })
    it("importkey(key) should throw a TypeError if key is a object that contains an empty object for PK", (done) => {
        asymCrypto.importKey({
            publicKey: {},
            privateKey: null
        })
            .then(fail)
            .catch((err) => {
                expect(err.constructor.name)
                    .toEqual(importKeyError)
                expect(err.message)
                    .toEqual(importKeyErrorMessage)
                done()
            })
    })

    it("importkey(key) should throw a TypeError if key is a object that contains an empty object for PrK", (done) => {
        asymCrypto.importKey({
            publicKey: null,
            privateKey: {}
        })
            .then(fail)
            .catch((err) => {
                expect(err.constructor.name)
                    .toEqual(importKeyError)
                expect(err.message)
                    .toEqual(importKeyErrorMessage)
                done()
            })
    })

    it("sign, verify", (done) => {
        const data = helper.randStr()
        asymCrypto.sign(data, cryptoSigningKeypair.privateKey)
            .then((signature) => asymCrypto.verifySignature(data, signature, cryptoSigningKeypair.publicKey))
            .then((isValid) => {
                expect(isValid)
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    it("encrypt() decrypt()", (done) => {
        const data = helper.randStr()
        asymCrypto.encrypt(data, cryptoEncryptionKeypair.publicKey)
            .then((encryptedData) => asymCrypto.decrypt(encryptedData, cryptoEncryptionKeypair.privateKey))
            .then((plaintext) => {
                expect(plaintext)
                    .toEqual(data)
                done()
            })
            .catch(fail)
    })
})
