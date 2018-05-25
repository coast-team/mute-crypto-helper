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

// import * as cryptoHelper from '../../src/crypto/helper/cryptoHelper'
import * as symCryptoHelper from '../../src/crypto/helper/symmetricCryptoHelper'
import { symmetricCrypto as symCrypto } from '../../src/index.common'
import * as helper from '../helper/helper'

describe('Symmetric Crypto API wrapper test\n', () => {
  let encryptionKey: CryptoKey

  beforeAll((done) => {
    symCrypto.generateEncryptionKey().then((key) => {
      encryptionKey = key
      done()
    })
  })

  it('exportKey(key), importkey(keyData) should succeed (key is a secret crypto key)', (done) => {
    symCrypto
      .exportKey(encryptionKey)
      .then((keyDataObj) => symCrypto.importKey(keyDataObj))
      .then((secretCryptoKey) => {
        expect(secretCryptoKey).toEqual(encryptionKey)
        done()
      })
      .catch(fail)
  })

  it('toB64(keyData), fromB64(keyDataB64) should succeed', (done) => {
    symCrypto
      .exportKey(encryptionKey)
      .then((keyDataObj) => {
        const keyDataObj2 = symCrypto.fromB64(symCrypto.toB64(keyDataObj))
        expect(keyDataObj2).toEqual(keyDataObj)
        symCrypto.importKey(keyDataObj2).then((secretCryptoKey) => {
          expect(secretCryptoKey).toEqual(encryptionKey)
          done()
        })
        done()
      })
      .catch(fail)
  })

  it('joinNonceCiphertext() splitNonceCiphertext()', () => {
    const s = helper.randStr()
    const nonce = symCryptoHelper.getDefaultEncryptParams(true).iv

    symCryptoHelper
      .joinNonceCiphertext(nonce, s)
      .then((ciphertext) => {
        symCryptoHelper
          .splitNonceCiphertext(ciphertext)
          .then(([nonce2, s2]) => {
            expect(nonce2).toEqual(nonce)
            expect(s2).toEqual(s)
          })
          .catch(fail)
      })
      .catch(fail)
  })

  it('encrypt() decrypt(), random string test', (done) => {
    const s = helper.randStr()
    symCrypto
      .encrypt(s, encryptionKey)
      .then((ciphertext) => symCrypto.decrypt(ciphertext, encryptionKey))
      .then((plaintext) => {
        expect(plaintext).toEqual(s)
        done()
      })
      .catch(fail)
  })

  it('encrypt() decrypt(), real world test', (done) => {
    const s = 'Hello, world'
    symCrypto
      .encrypt(helper.str2buffer(s), encryptionKey)
      .then((ciphertext) => symCrypto.decrypt(ciphertext, encryptionKey))
      .then((plaintext) => {
        expect(helper.buffer2str(plaintext)).toEqual(s)
        done()
      })
      .catch(fail)
  })
})
