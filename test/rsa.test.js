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

import * as rsa from "../src/rsa"
import * as helper from "./helper"

describe("RSA Crypto wrapper test\n", () => {
    let cryptoSigningKeypair
    let cryptoEncryptionKeypair
    const importKeyError = "TypeError"
    const importKeyErrorMessage =
        "keyDataObj isn't valid ... it should be the same obj as returned by exportKey."

    beforeAll((done) => {
        rsa.generateSigningKey()
            .then((key) => {
                cryptoSigningKeypair = key
                return rsa.generateEncryptionKey()
            })
            .then((key2) => {
                cryptoEncryptionKeypair = key2
                done()
            })
    })

    it("isPublicKey", () => {
        expect(rsa.isPublicKey(cryptoSigningKeypair.publicKey))
            .toBeTruthy()
        expect(rsa.isPublicKey(cryptoSigningKeypair.privateKey))
            .toBeFalsy()
        expect(rsa.isPublicKey(cryptoEncryptionKeypair.publicKey))
            .toBeTruthy()
        expect(rsa.isPublicKey(cryptoEncryptionKeypair.privateKey))
            .toBeFalsy()
        expect(rsa.isPublicKey("test"))
            .toBeFalsy()
        expect(rsa.isPublicKey({}))
            .toBeFalsy()
    })

    it("isPrivateKey", () => {
        expect(rsa.isPrivateKey(cryptoSigningKeypair.privateKey))
            .toBeTruthy()
        expect(rsa.isPrivateKey(cryptoSigningKeypair.publicKey))
            .toBeFalsy()
        expect(rsa.isPrivateKey(cryptoEncryptionKeypair.privateKey))
            .toBeTruthy()
        expect(rsa.isPrivateKey(cryptoEncryptionKeypair.publicKey))
            .toBeFalsy()
        expect(rsa.isPrivateKey({}))
            .toBeFalsy()
        expect(rsa.isPrivateKey("test"))
            .toBeFalsy()
    })

    it("isCryptoKeyPair", () => {
        expect(rsa.isCryptoKeyPair(cryptoSigningKeypair))
            .toBeTruthy()
        expect(rsa.isCryptoKeyPair(cryptoEncryptionKeypair))
            .toBeTruthy()
        expect(rsa.isCryptoKeyPair({
            publicKey: {},
            privateKey: {}
        }))
            .toBeFalsy()
        expect(rsa.isCryptoKeyPair({
            publicKey: cryptoSigningKeypair.publicKey
        }))
            .toBeFalsy()
        expect(rsa.isCryptoKeyPair({
            privateKey: cryptoSigningKeypair.privateKey
        }))
            .toBeFalsy()
        expect(rsa.isCryptoKeyPair({
            publicKey: {},
            privateKey: cryptoSigningKeypair.privateKey
        }))
            .toBeFalsy()
        expect(rsa.isCryptoKeyPair({
            publicKey: "test",
            privateKey: cryptoSigningKeypair.privateKey
        }))
            .toBeFalsy()
        expect(rsa.isCryptoKeyPair({
            publicKey: cryptoSigningKeypair.publicKey,
            privateKey: "test"
        }))
            .toBeFalsy()
        expect(rsa.isCryptoKeyPair({
            publicKey: cryptoSigningKeypair.privateKey,
            privateKey: cryptoSigningKeypair.publicKey
        }))
            .toBeFalsy()
        expect(rsa.isCryptoKeyPair("test"))
            .toBeFalsy()
    })

    it("exportKey(key), importkey should succeed (key is a signing KeyPair)", (done) => {
        rsa.exportKey(cryptoSigningKeypair)
            .then((keyDataObj) => rsa.importKey(keyDataObj))
            .then((keyPair) => {
                expect(keyPair.hasOwnProperty("publicKey") && rsa.isPublicKey(keyPair.publicKey))
                    .toBeTruthy()
                expect(keyPair.hasOwnProperty("privateKey") && rsa.isPrivateKey(keyPair.privateKey))
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    it("exportKey(key), importkey should succeed (key is a encryption KeyPair)", (done) => {
        rsa.exportKey(cryptoEncryptionKeypair)
            .then((keyDataObj) => rsa.importKey(keyDataObj))
            .then((keyPair) => {
                expect(keyPair.hasOwnProperty("publicKey") && rsa.isPublicKey(keyPair.publicKey))
                    .toBeTruthy()
                expect(keyPair.hasOwnProperty("privateKey") && rsa.isPrivateKey(keyPair.privateKey))
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    it("exportKey(key), importkey should succeed (key is a signing public key)", (done) => {
        rsa.exportKey(cryptoSigningKeypair.publicKey)
            .then((keyDataObj) => rsa.importKey(keyDataObj))
            .then((keyPair) => {
                expect(keyPair.hasOwnProperty("publicKey") && rsa.isPublicKey(keyPair.publicKey))
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    it("exportKey(key), importkey should succeed (key is a signing private key)", (done) => {
        rsa.exportKey(cryptoSigningKeypair.privateKey)
            .then((keyDataObj) => rsa.importKey(keyDataObj))
            .then((keyPair) => {
                expect(keyPair.hasOwnProperty("privateKey") && rsa.isPrivateKey(keyPair.privateKey))
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    it("exportKey(key), importkey should succeed (key is a encryption public key)", (done) => {
        rsa.exportKey(cryptoEncryptionKeypair.publicKey)
            .then((keyDataObj) => rsa.importKey(keyDataObj))
            .then((keyPair) => {
                expect(keyPair.hasOwnProperty("publicKey") && rsa.isPublicKey(keyPair.publicKey))
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    it("exportKey(key), importkey should succeed (key is a encryption private key)", (done) => {
        rsa.exportKey(cryptoEncryptionKeypair.privateKey)
            .then((keyDataObj) => rsa.importKey(keyDataObj))
            .then((keyPair) => {
                expect(keyPair.hasOwnProperty("privateKey") && rsa.isPrivateKey(keyPair.privateKey))
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    /*
      IMPORTKEY (fail)
    */

    it("importkey(key) should throw a TypeError if key is a string", (done) => {
        rsa.importKey("test")
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
        rsa.importKey({})
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
        rsa.importKey({
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
            rsa.importKey({
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
        rsa.importKey({
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
        rsa.importKey({
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
        rsa.importKey({
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
        rsa.importKey({
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
        rsa.sign(data, cryptoSigningKeypair.privateKey)
            .then((signature) => rsa.verifySignature(data, signature, cryptoSigningKeypair.publicKey))
            .then((isValid) => {
                expect(isValid)
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    it("encrypt() decrypt()", (done) => {
        const data = helper.randStr()
        rsa.encrypt(data, cryptoEncryptionKeypair.publicKey)
            .then((encryptedData) => rsa.decrypt(encryptedData, cryptoEncryptionKeypair.privateKey))
            .then((plaintext) => {
                expect(plaintext)
                    .toEqual(data)
                done()
            })
            .catch(fail)
    })
})
