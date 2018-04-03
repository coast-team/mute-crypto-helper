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

import * as symCrypto from '../src/symmetricCrypto'
import * as symCryptoHelper from '../src/symmetricCryptoHelper'
import * as helper from './helper'

describe('Symmetric Crypto API wrapper test\n', () => {
  let encryptionKey

  beforeAll((done) => {
    symCrypto.generateEncryptionKey()
      .then((key) => {
        encryptionKey = key
        done()
      })
  })

  it('isSecretCryptoKey', () => {
    expect(symCrypto.isSecretCryptoKey(encryptionKey))
      .toBeTruthy()
    expect(symCrypto.isSecretCryptoKey({
      publicKey: {},
      privateKey: {},
    }))
      .toBeFalsy()
    expect(symCrypto.isSecretCryptoKey('test'))
      .toBeFalsy()
    expect(symCrypto.isSecretCryptoKey({}))
      .toBeFalsy()
  })

  it('exportKey(key), importkey(keyData) should succeed (key is a secret crypto key)', (done) => {
    symCrypto.exportKey(encryptionKey)
      .then((keyDataObj) => symCrypto.importKey(keyDataObj))
      .then((secretCryptoKey) => {
        expect(symCrypto.isSecretCryptoKey(secretCryptoKey))
          .toBeTruthy()
        done()
      })
      .catch(fail)
  })

  it('joinNonceCiphertext() splitNonceCiphertext()', () => {
    const s = helper.randStr()
    const nonce = symCryptoHelper.generateNonce()

    const data = symCryptoHelper.joinNonceCiphertext(nonce, s)

    const {
      nonce: nonce2,
      ciphertext: s2,
    } = symCryptoHelper.splitNonceCiphertext(data)

    expect(nonce2)
      .toEqual(nonce)
    expect(s2)
      .toEqual(s)
  })

  it('encrypt() decrypt()', (done) => {
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
