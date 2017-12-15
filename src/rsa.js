// Copyright 2017 Jean-Philippe Eisenbarth
//
// This file is part of Crypto API wrapper.
//
// Foobar is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Mute Authentication Proxy is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Foobar. See the file COPYING.  If not, see <http://www.gnu.org/licenses/>.

const RSASigningAlgorithm = "RSA-PSS"
const RSAEncryptionAlgorithm = "RSA-OAEP"
const rsaKeySize = 4096
const HashAlgorithm = "SHA-256"
const saltLength = 128
const publicExponent = new Uint8Array([0x01, 0x00, 0x01]) // 0x010001 -> 65537
const keyDataFormat = "jwk" // JSON Web key is a format for representing a public/private key as a JSON object

export function generateSigningKey () {
    return window.crypto.subtle.generateKey({
        name: RSASigningAlgorithm,
        modulusLength: rsaKeySize,
        publicExponent: publicExponent,
        hash: {
            name: HashAlgorithm //slightly better perf on 64bits proc ?
        }
    }, true, //whether the key is extractable (i.e. can be used in exportKey)
    ["sign", "verify"])
}

export function generateEncryptionKey () {
    return window.crypto.subtle.generateKey({
        name: RSAEncryptionAlgorithm,
        modulusLength: rsaKeySize, //can be 1024, 2048, or 4096
        publicExponent: publicExponent,
        hash: {
            name: HashAlgorithm //slightly better perf on 64bits proc ?
        }
    }, true, //whether the key is extractable (i.e. can be used in exportKey)
    ["encrypt", "decrypt"])
}

export async function exportKey (keyObj) {
    const result = {
        publicKey: null,
        privateKey: null
    }
    if (isCryptoKeyPair(keyObj)) {
        result.publicKey = await window.crypto.subtle.exportKey(keyDataFormat, keyObj.publicKey)
        result.privateKey = await window.crypto.subtle.exportKey(keyDataFormat, keyObj.privateKey)
    } else if (isPublicKey(keyObj)) {
        result.publicKey = await window.crypto.subtle.exportKey(keyDataFormat, keyObj)
    } else if (isPrivateKey(keyObj)) {
        result.privateKey = await window.crypto.subtle.exportKey(keyDataFormat, keyObj)
    } else {
        return Promise.reject(new TypeError("KeyObj should be one of these : A valid CryptoKeyPair, a valid PublicKey or a valid PrivateKey ..."))
    }
    return result
}

export async function importKey (keyDataObj) {
    const result = {}
    const err = new TypeError("keyDataObj isn't valid ... it should be the same obj as returned by exportKey.")
    if (keyDataObj.hasOwnProperty("publicKey") && keyDataObj.hasOwnProperty("privateKey")) {
        if ((keyDataObj.publicKey === null || keyDataObj.publicKey === undefined) &&
            (keyDataObj.privateKey === null || keyDataObj.privateKey === undefined)) {
            throw err
        }
        if (keyDataObj.publicKey !== null && keyDataObj.publicKey !== undefined) {
            if (keyDataObj.publicKey.hasOwnProperty("key_ops")) {
                if (keyDataObj.publicKey.key_ops.includes("verify")) {
                    result.publicKey = await importSigningKey("public", keyDataObj.publicKey)
                } else if (keyDataObj.publicKey.key_ops.includes("encrypt")) {
                    result.publicKey = await importEncryptionKey("public", keyDataObj.publicKey)
                } else {
                    throw err
                }
            } else {
                throw err
            }
        }
        if (keyDataObj.privateKey !== null && keyDataObj.privateKey !== undefined) {
            if (keyDataObj.privateKey.hasOwnProperty("key_ops")) {
                if (keyDataObj.privateKey.key_ops.includes("sign")) {
                    result.privateKey = await importSigningKey("private", keyDataObj.privateKey)
                } else if (keyDataObj.privateKey.key_ops.includes("decrypt")) {
                    result.privateKey = await importEncryptionKey("private", keyDataObj.privateKey)
                } else {
                    throw err
                }
            } else {
                throw err
            }
        }
    } else {
        throw err
    }
    return result

}

function importSigningKey (keyType, keyData) {
    let result
    switch (keyType) {
        case "public":
            result = genericImportKey(RSASigningAlgorithm, ["verify"], keyData)
            break
        case "private":
            result = genericImportKey(RSASigningAlgorithm, ["sign"], keyData)
            break
        default:
            result = Promise.reject(new TypeError("KeyType should be either 'public' or 'private'"))
    }
    return result
}

function importEncryptionKey (keyType, keyData) {
    let result
    switch (keyType) {
        case "public":
            result = genericImportKey(RSAEncryptionAlgorithm, ["encrypt"], keyData)
            break
        case "private":
            result = genericImportKey(RSAEncryptionAlgorithm, ["decrypt"], keyData)
            break
        default:
            result = Promise.reject(new TypeError("KeyType should be either 'public' or 'private'"))
    }
    return result
}

function genericImportKey (algorithm, usagesArray, keyData) {
    return window.crypto.subtle.importKey(keyDataFormat, keyData, {
        name: algorithm,
        hash: {
            name: HashAlgorithm
        },
    },
        false, usagesArray)
}

// data is an ArrayBuffer
export function sign (plaintext, signingPrivateKey) {
    return window.crypto.subtle.sign({
        name: RSASigningAlgorithm,
        saltLength: saltLength,
    },
        signingPrivateKey,
        plaintext)
}

// signature is an ArrayBuffer
export function verifySignature (plaintext, signature, signingPublicKey) {
    return window.crypto.subtle.verify({
        name: RSASigningAlgorithm,
        saltLength: saltLength,
    },
        signingPublicKey,
        signature,
        plaintext)
}

// data is an ArrayBuffer
export function encrypt (plaintext, encryptionPublicKey) {
    return window.crypto.subtle.encrypt({
        name: RSAEncryptionAlgorithm,
            //label: Uint8Array([...]) //optional
    },
        encryptionPublicKey,
        plaintext)
}

// signature is an ArrayBuffer
export function decrypt (ciphertext, encryptionPrivateKey) {
    return window.crypto.subtle.decrypt({
        name: RSAEncryptionAlgorithm,
                //label: Uint8Array([...]) //optional
    },
            encryptionPrivateKey,
            ciphertext)
        .then((buffer) => new Uint8Array(buffer))
}

export function isCryptoKeyPair (obj) {
    return obj.hasOwnProperty("privateKey") &&
        isPrivateKey(obj.privateKey) &&
        obj.hasOwnProperty("publicKey") &&
        isPublicKey(obj.publicKey)
}

export function isCryptoKey (key) {
    return key instanceof CryptoKey
}

export function isPublicKey (cryptoKey) {
    return isCryptoKey(cryptoKey) && cryptoKey.type === "public"
}

export function isPrivateKey (cryptoKey) {
    return isCryptoKey(cryptoKey) && cryptoKey.type === "private"
}
