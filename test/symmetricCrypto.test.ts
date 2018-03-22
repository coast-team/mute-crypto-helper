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

import * as symCrypto from "../src/symmetricCrypto"
import * as symCryptoHelper from "../src/symmetricCryptoHelper"
import * as helper from "./helper"


describe("Symmetric Crypto API wrapper test\n", () => {
    let encryptionKey

    beforeAll((done) => {
        symCrypto.generateEncryptionKey()
            .then((key) => {
                encryptionKey = key
                done()
            })
    })

    it("isSecretCryptoKey", () => {
        expect(symCrypto.isSecretCryptoKey(encryptionKey))
            .toBeTruthy()
        expect(symCrypto.isSecretCryptoKey({
            publicKey: {},
            privateKey: {}
        }))
            .toBeFalsy()
        expect(symCrypto.isSecretCryptoKey("test"))
            .toBeFalsy()
        expect(symCrypto.isSecretCryptoKey({}))
            .toBeFalsy()
    })

    it("exportKey(key), importkey(keyData) should succeed (key is a secret crypto key)", (done) => {
        symCrypto.exportKey(encryptionKey)
            .then((keyDataObj) => symCrypto.importKey(keyDataObj))
            .then((secretCryptoKey) => {
                expect(symCrypto.isSecretCryptoKey(secretCryptoKey))
                    .toBeTruthy()
                done()
            })
            .catch(fail)
    })

    it("joinNonceCiphertext() splitNonceCiphertext()", () => {
        const s = helper.randStr()
        const nonce = symCryptoHelper.generateNonce()

        const data = symCryptoHelper.joinNonceCiphertext(nonce, s)

        const {
            nonce: nonce2,
            ciphertext: s2
        } = symCryptoHelper.splitNonceCiphertext(data)

        expect(nonce2)
            .toEqual(nonce)
        expect(s2)
            .toEqual(s)
    })

    it("encrypt() decrypt()", (done) => {
        const s = helper.randStr()
        symCrypto.encrypt(s, encryptionKey)
            .then((ciphertext) => symCrypto.decrypt(ciphertext, encryptionKey))
            .then((plaintext) => {
                expect(plaintext)
                    .toEqual(s)
                done()
            })
            .catch(fail)
    })
})
