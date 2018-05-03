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

import { defaultCryptoKeyDataFormat } from './helper/cryptoHelper'
import {
  defaultImportEncryptionParams,
  defaultSymmetricEncryptionParams,
  getDefaultEncryptParams,
  joinNonceCiphertext,
  splitNonceCiphertext,
} from './helper/symmetricCryptoHelper'

/**
 * generateEncryptionKey generates a cryptoKeyPair with sane defaults to be used for symmetric encryption purpose.
 *
 * @see {@link defaultSymmetricEncryptionParams}
 */
export function generateEncryptionKey() {
  return global.crypto.subtle.generateKey(
    defaultSymmetricEncryptionParams,
    true, // whether the key is extractable (i.e. can be used in exportKey)
    ['encrypt', 'decrypt']
  ) as Promise<CryptoKey>
}

/**
 * exportKey exports a CryptoKey to a JSON Web Key.
 * The CryptoKeyPair should be the same as returned by {@link generateEncryptionKey}.
 */
export function exportKey(cryptoKey: CryptoKey) {
  return global.crypto.subtle.exportKey(defaultCryptoKeyDataFormat, cryptoKey) as Promise<JsonWebKey>
}

/**
 * importKey imports a JSON Web Key to a CryptoKey.
 * The JSON Web Key should be the same as returned by {@link exportKey}.
 */
export function importKey(cryptoKeyData: JsonWebKey) {
  return global.crypto.subtle.importKey(defaultCryptoKeyDataFormat, cryptoKeyData, defaultImportEncryptionParams as any, true, [
    'encrypt',
    'decrypt',
  ]) as Promise<CryptoKey>
}

/**
 * encrypt returns the ciphertext of the given plaintext.
 *
 * @param encryptionKey The secret key used to encrypt (generated by {@link generateEncryptionKey}).
 */
export async function encrypt(plaintext: Uint8Array, encryptionKey: CryptoKey) {
  const params = getDefaultEncryptParams(true)
  const ciphertext = await global.crypto.subtle.encrypt(params, encryptionKey, plaintext)
  return joinNonceCiphertext(params.iv, new Uint8Array(ciphertext)) as Promise<Uint8Array>
}

/**
 * decrypt decrypts the given ciphertext.
 *
 * @param encryptionKey The secret key used to decrypt (same as the one to encrypt, generated by
 * {@link generateEncryptionKey}).
 */
export async function decrypt(data: Uint8Array, encryptionKey: CryptoKey) {
  const [nonce, ciphertext] = await splitNonceCiphertext(data)
  const params = getDefaultEncryptParams(false)
  params.iv = nonce
  return global.crypto.subtle.decrypt(params, encryptionKey, ciphertext).then((buffer) => new Uint8Array(buffer))
}
