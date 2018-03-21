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

export const encryptionAlgorithm = "AES-CTR"
export const keySize = 128 // bits
export const nonceLength = 16 // bytes
export const keyDataFormat = "jwk" // JSON Web key is a format for representing a public/private key as a JSON object

export function generateNonce () {
    return window.crypto.getRandomValues(new Uint8Array(nonceLength))
}

export function joinNonceCiphertext (nonce, ciphertext) {
    const result = new Uint8Array(nonce.length + ciphertext.length)
    result.set(nonce)
    result.set(ciphertext, nonce.length)
    return result
}

export function splitNonceCiphertext (data) {
    const nonce = data.slice(0, nonceLength)
    const ciphertext = data.slice(nonceLength, data.length)
    return {
        nonce: nonce,
        ciphertext: ciphertext
    }
}
