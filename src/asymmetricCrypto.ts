// Licensed to Inria Grand-Est / Loria under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  Inria Grand-Est / Loria licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import * as helper from './asymmetricCryptoHelper'

export function generateSigningKey () {
  return window.crypto.subtle.generateKey({
    name: helper.signingAlgorithm,
    modulusLength: helper.keySize,
    publicExponent: helper.publicExponent,
    hash: {
      name: helper.hashAlgorithm, // slightly better perf on 64bits proc ?
    },
  }, true, // whether the key is extractable (i.e. can be used in exportKey)
    ['sign', 'verify'])
}

export function generateEncryptionKey () {
  return window.crypto.subtle.generateKey({
    name: helper.encryptionAlgorithm,
    modulusLength: helper.keySize, // can be 1024, 2048, or 4096
    publicExponent: helper.publicExponent,
    hash: {
      name: helper.hashAlgorithm, // slightly better perf on 64bits proc ?
    },
  }, true, // whether the key is extractable (i.e. can be used in exportKey)
    ['encrypt', 'decrypt'])
}

export async function exportKey (keyObj) {
  const result = {
    publicKey: null,
    privateKey: null,
  }
  if (isCryptoKeyPair(keyObj)) {
    result.publicKey = await window.crypto.subtle.exportKey(helper.keyDataFormat, keyObj.publicKey)
    result.privateKey = await window.crypto.subtle.exportKey(helper.keyDataFormat, keyObj.privateKey)
  } else if (isPublicKey(keyObj)) {
    result.publicKey = await window.crypto.subtle.exportKey(helper.keyDataFormat, keyObj)
  } else if (isPrivateKey(keyObj)) {
    result.privateKey = await window.crypto.subtle.exportKey(helper.keyDataFormat, keyObj)
  } else {
    return Promise.reject(new TypeError(`KeyObj should be one of these : \
      A valid CryptoKeyPair, a valid PublicKey or a valid PrivateKey ...`))
  }
  return result
}

export async function importKey (keyDataObj) {
  const result = {} as any
  const err = new TypeError('keyDataObj isn\'t valid ... it should be the same obj as returned by exportKey.')
  if (keyDataObj.hasOwnProperty('publicKey') && keyDataObj.hasOwnProperty('privateKey')) {
    if ((keyDataObj.publicKey === null || keyDataObj.publicKey === undefined) &&
      (keyDataObj.privateKey === null || keyDataObj.privateKey === undefined)) {
      throw err
    }
    if (keyDataObj.publicKey !== null && keyDataObj.publicKey !== undefined) {
      if (keyDataObj.publicKey.hasOwnProperty('key_ops')) {
        if (keyDataObj.publicKey.key_ops.includes('verify')) {
          result.publicKey = await importSigningKey('public', keyDataObj.publicKey)
        } else if (keyDataObj.publicKey.key_ops.includes('encrypt')) {
          result.publicKey = await importEncryptionKey('public', keyDataObj.publicKey)
        } else {
          throw err
        }
      } else {
        throw err
      }
    }
    if (keyDataObj.privateKey !== null && keyDataObj.privateKey !== undefined) {
      if (keyDataObj.privateKey.hasOwnProperty('key_ops')) {
        if (keyDataObj.privateKey.key_ops.includes('sign')) {
          result.privateKey = await importSigningKey('private', keyDataObj.privateKey)
        } else if (keyDataObj.privateKey.key_ops.includes('decrypt')) {
          result.privateKey = await importEncryptionKey('private', keyDataObj.privateKey)
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
  case 'public':
    result = genericImportKey(helper.signingAlgorithm, ['verify'], keyData)
    break
  case 'private':
    result = genericImportKey(helper.signingAlgorithm, ['sign'], keyData)
    break
  default:
    result = Promise.reject(new TypeError('KeyType should be either \'public\' or \'private\''))
  }
  return result
}

function importEncryptionKey (keyType, keyData) {
  let result
  switch (keyType) {
  case 'public':
    result = genericImportKey(helper.encryptionAlgorithm, ['encrypt'], keyData)
    break
  case 'private':
    result = genericImportKey(helper.encryptionAlgorithm, ['decrypt'], keyData)
    break
  default:
    result = Promise.reject(new TypeError('KeyType should be either \'public\' or \'private\''))
  }
  return result
}

function genericImportKey (algorithm, usagesArray, keyData) {
  return window.crypto.subtle.importKey(helper.keyDataFormat, keyData, {
    name: algorithm,
    hash: {
      name: helper.hashAlgorithm,
    },
  },
    false, usagesArray)
}

// data is an ArrayBuffer
export function sign (plaintext, signingPrivateKey) {
  return window.crypto.subtle.sign({
    name: helper.signingAlgorithm,
    saltLength: helper.saltLength,
  },
    signingPrivateKey,
    plaintext) as Promise<ArrayBuffer>
}

// signature is an ArrayBuffer
export function verifySignature (plaintext, signature, signingPublicKey) {
  return window.crypto.subtle.verify({
    name: helper.signingAlgorithm,
    saltLength: helper.saltLength,
  },
    signingPublicKey,
    signature,
    plaintext)
}

// data is an ArrayBuffer
export function encrypt (plaintext, encryptionPublicKey) {
  return window.crypto.subtle.encrypt({
    name: helper.encryptionAlgorithm,
    // label: Uint8Array([...]) //optional
  },
    encryptionPublicKey,
    plaintext) as Promise<ArrayBuffer>
}

// signature is an ArrayBuffer
export function decrypt (ciphertext, encryptionPrivateKey) {
  return window.crypto.subtle.decrypt({
    name: helper.encryptionAlgorithm,
    // label: Uint8Array([...]) //optional
  },
    encryptionPrivateKey,
    ciphertext)
    .then((buffer) => new Uint8Array(buffer))
}

export function isCryptoKeyPair (obj) {
  return obj.hasOwnProperty('privateKey') &&
    isPrivateKey(obj.privateKey) &&
    obj.hasOwnProperty('publicKey') &&
    isPublicKey(obj.publicKey)
}

export function isCryptoKey (key) {
  return key instanceof CryptoKey
}

export function isPublicKey (cryptoKey) {
  return isCryptoKey(cryptoKey) && cryptoKey.type === 'public'
}

export function isPrivateKey (cryptoKey) {
  return isCryptoKey(cryptoKey) && cryptoKey.type === 'private'
}
