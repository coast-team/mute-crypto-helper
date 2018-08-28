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

  beforeAll(async () => {
    encryptionKey = await symCrypto.generateEncryptionKey()
  })

  it('exportKey(key), importkey(keyData) should succeed (key is a secret crypto key)', async () => {
    const keyDataObj = await symCrypto.exportKey(encryptionKey)
    const secretCryptoKey = await symCrypto.importKey(keyDataObj)
    expect(secretCryptoKey).toEqual(encryptionKey)
  })

  it('toB64(keyData), fromB64(keyDataB64) should succeed', async () => {
    const keyDataObj = await symCrypto.exportKey(encryptionKey)
    const keyDataObj2 = symCrypto.fromB64(symCrypto.toB64(keyDataObj))
    expect(keyDataObj2).toEqual(keyDataObj)
    const secretCryptoKey = await symCrypto.importKey(keyDataObj2)
    expect(secretCryptoKey).toEqual(encryptionKey)
  })

  it('joinNonceCiphertext() splitNonceCiphertext()', async () => {
    const s = helper.randStr()
    const nonce = symCryptoHelper.getDefaultEncryptParams(true).iv
    const ciphertext = await symCryptoHelper.joinNonceCiphertext(nonce, s)
    const [nonce2, s2] = await symCryptoHelper.splitNonceCiphertext(ciphertext)
    expect(nonce2).toEqual(nonce)
    expect(s2).toEqual(s)
  })

  it('encrypt() decrypt(), random string test', async () => {
    const s = helper.randStr()
    const ciphertext = await symCrypto.encrypt(s, encryptionKey)
    const plaintext = await symCrypto.decrypt(ciphertext, encryptionKey)
    expect(plaintext).toEqual(s)
  })

  it('encrypt() decrypt(), real world test', async () => {
    const s = 'Hello, world'
    const ciphertext = await symCrypto.encrypt(helper.str2buffer(s), encryptionKey)
    const plaintext = await symCrypto.decrypt(ciphertext, encryptionKey)
    expect(helper.buffer2str(plaintext)).toEqual(s)
  })
})
