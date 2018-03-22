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

import * as helper from "./symmetricCryptoHelper"

export function generateEncryptionKey () {
    return window.crypto.subtle.generateKey({
        name: helper.encryptionAlgorithm,
        length: helper.keySize,
    }, true, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"])
}

export function exportKey (keyObj) {
    return window.crypto.subtle.exportKey(helper.keyDataFormat,
        keyObj) as Promise<JsonWebKey>
}

export function importKey (keyDataObj) {
    return window.crypto.subtle.importKey(helper.keyDataFormat,
        keyDataObj, {
            name: helper.encryptionAlgorithm,
        },
        false, ["encrypt", "decrypt"])

}

// data is an ArrayBuffer
export async function encrypt (plaintext, encryptionKey) {
    const nonce = helper.generateNonce()

    const ciphertext = await window.crypto.subtle.encrypt({
        name: helper.encryptionAlgorithm,
        counter: nonce,
        length: 128, //can be 1-128
    },
        encryptionKey,
        plaintext)

    return helper.joinNonceCiphertext(nonce, new Uint8Array(ciphertext))
}

// signature is an ArrayBuffer
export function decrypt (data, encryptionPrivateKey) {
    const {
        nonce,
        ciphertext
    } = helper.splitNonceCiphertext(data)
    return window.crypto.subtle.decrypt({
        name: helper.encryptionAlgorithm,
        counter: nonce,
        length: 128,
    },
            encryptionPrivateKey,
            ciphertext)
        .then((buffer) => new Uint8Array(buffer))
}

export function isSecretCryptoKey (obj) {
    return obj instanceof CryptoKey && obj.type === "secret"
}
