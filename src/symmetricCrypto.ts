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

import * as helper from './symmetricCryptoHelper'

export function generateEncryptionKey () {
  return window.crypto.subtle.generateKey({
    name: helper.encryptionAlgorithm,
    length: helper.keySize,
  }, true, // whether the key is extractable (i.e. can be used in exportKey)
    ['encrypt', 'decrypt'])
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
    false, ['encrypt', 'decrypt'])

}

// data is an ArrayBuffer
export async function encrypt (plaintext, encryptionKey) {
  const nonce = helper.generateNonce()

  const ciphertext = await window.crypto.subtle.encrypt({
    name: helper.encryptionAlgorithm,
    counter: nonce,
    length: 128, // can be 1-128
  },
    encryptionKey,
    plaintext)

  return helper.joinNonceCiphertext(nonce, new Uint8Array(ciphertext))
}

// signature is an ArrayBuffer
export function decrypt (data, encryptionPrivateKey) {
  const {
    nonce,
    ciphertext,
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
  return obj instanceof CryptoKey && obj.type === 'secret'
}
