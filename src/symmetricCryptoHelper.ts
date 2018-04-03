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

export const encryptionAlgorithm = 'AES-CTR'
export const keySize = 128 // bits
export const nonceLength = 16 // bytes
export const keyDataFormat = 'jwk' // JSON Web key is a format for representing a public/private key as a JSON object

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
    nonce,
    ciphertext,
  }
}
