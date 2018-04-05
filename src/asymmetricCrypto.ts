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

export interface ICryptoKeyPairData {
  readonly publicKey: JsonWebKey
  readonly privateKey: JsonWebKey
}

export function generateSigningKey (): Promise<CryptoKeyPair> {
  return window.crypto.subtle.generateKey({
    name: helper.signingAlgorithm,
    modulusLength: helper.keySize,
    publicExponent: helper.publicExponent,
    hash: {
      name: helper.hashAlgorithm, // slightly better perf on 64bits proc ?
    },
  }, true, // whether the key is extractable (i.e. can be used in exportKey)
    ['sign', 'verify']) as Promise<CryptoKeyPair>
}

export function generateEncryptionKey (): Promise<CryptoKeyPair> {
  return window.crypto.subtle.generateKey({
    name: helper.encryptionAlgorithm,
    modulusLength: helper.keySize, // can be 1024, 2048, or 4096
    publicExponent: helper.publicExponent,
    hash: {
      name: helper.hashAlgorithm, // slightly better perf on 64bits proc ?
    },
  }, true, // whether the key is extractable (i.e. can be used in exportKey)
    ['encrypt', 'decrypt']) as Promise<CryptoKeyPair>
}

export async function exportKey (cryptoKeyPair: CryptoKeyPair): Promise<ICryptoKeyPairData> {
  const publicKey = await window.crypto.subtle.exportKey(helper.keyDataFormat, cryptoKeyPair.publicKey)
  const privateKey = await window.crypto.subtle.exportKey(helper.keyDataFormat, cryptoKeyPair.privateKey)
  return { publicKey, privateKey } as ICryptoKeyPairData
}

export async function importKey (cryptoKeyPairData: ICryptoKeyPairData): Promise<CryptoKeyPair> {
  const UndefinedKeyOpsError = Promise.reject(new TypeError(`key_ops should not be undefined.\
    cryptoKeyPairData should be the same object as returned by exportKey ...`))
  let publicKey: CryptoKey
  let privateKey: CryptoKey
  if (cryptoKeyPairData.publicKey.key_ops) {
    if (cryptoKeyPairData.publicKey.key_ops.includes('verify')) {
      publicKey = await window.crypto.subtle.importKey(helper.keyDataFormat, cryptoKeyPairData.publicKey,
        {
          name: helper.signingAlgorithm, hash: { name: helper.hashAlgorithm },
        },
          false, ['verify'])
    } else if (cryptoKeyPairData.publicKey.key_ops.includes('encrypt')) {
      publicKey = await window.crypto.subtle.importKey(helper.keyDataFormat, cryptoKeyPairData.publicKey,
        {
          name: helper.encryptionAlgorithm, hash: { name: helper.hashAlgorithm },
        },
          false, ['encrypt'])
    } else {
      return UndefinedKeyOpsError
    }
  } else {
    return UndefinedKeyOpsError
  }

  if (cryptoKeyPairData.privateKey.key_ops) {
    if (cryptoKeyPairData.privateKey.key_ops.includes('sign')) {
      privateKey = await window.crypto.subtle.importKey(helper.keyDataFormat, cryptoKeyPairData.privateKey,
        {
          name: helper.signingAlgorithm, hash: { name: helper.hashAlgorithm },
        },
          false, ['sign'])
    } else if (cryptoKeyPairData.privateKey.key_ops.includes('decrypt')) {
      privateKey = await window.crypto.subtle.importKey(helper.keyDataFormat, cryptoKeyPairData.privateKey,
        {
          name: helper.encryptionAlgorithm, hash: { name: helper.hashAlgorithm },
        },
          false, ['decrypt'])
    } else {
      return UndefinedKeyOpsError
    }
  } else {
    return UndefinedKeyOpsError

  }
  return { publicKey, privateKey } as CryptoKeyPair
}

export function sign (plaintext: Uint8Array, signingPrivateKey: CryptoKey) {
  return window.crypto.subtle.sign({
    name: helper.signingAlgorithm,
    saltLength: helper.saltLength,
  },
    signingPrivateKey,
    plaintext).then((signature) => new Uint8Array(signature)) as Promise<Uint8Array>
}

// signature is an ArrayBuffer
export function verifySignature (plaintext: Uint8Array, signature: Uint8Array, signingPublicKey: CryptoKey) {
  return window.crypto.subtle.verify({
    name: helper.signingAlgorithm,
    saltLength: helper.saltLength,
  },
    signingPublicKey,
    signature,
    plaintext) as Promise<boolean>
}

// data is an ArrayBuffer
export function encrypt (plaintext: Uint8Array, encryptionPublicKey: CryptoKey) {
  return window.crypto.subtle.encrypt({
    name: helper.encryptionAlgorithm,
    // label: Uint8Array([...]) //optional
  },
    encryptionPublicKey,
    plaintext).then((ciphertext) => new Uint8Array(ciphertext)) as Promise<Uint8Array>
}

// signature is an ArrayBuffer
export function decrypt (ciphertext: Uint8Array, encryptionPrivateKey: CryptoKey) {
  return window.crypto.subtle.decrypt({
    name: helper.encryptionAlgorithm,
    // label: Uint8Array([...]) //optional
  },
    encryptionPrivateKey,
    ciphertext).then((plaintext) => new Uint8Array(plaintext)) as Promise<Uint8Array>
}

export function isPublicKey (cryptoKey: CryptoKey) {
  return cryptoKey.type === 'public'
}

export function isPrivateKey (cryptoKey: CryptoKey) {
  return cryptoKey.type === 'private'
}
