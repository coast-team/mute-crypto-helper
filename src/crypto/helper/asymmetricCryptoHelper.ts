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

const encryptionAlgo = 'RSA-OAEP'
const encryptionKeySize = 2048
const encryptionHashAlgo = 'SHA-256'

const signingAlgo = 'RSA-PSS'
const signingKeySize = 2048
const signingHashAlgo = 'SHA-256'
const signingSaltLength = 128

const publicExponent = new Uint8Array([0x01, 0x00, 0x01])

export const defaultAsymmetricEncryptionParam = {
  /**
   * Default encryption Algorithm to use.
   */
  name: encryptionAlgo,
  /**
   * Default key size to use.
   * 2048 or 4096 for RSA.
   */
  modulusLength: encryptionKeySize,
  /**
   * Default hash algorithm to use with encryption scheme.
   * SHA-256, SHA-384 or SHA-512 for RSA-OAEP.
   */
  hash: { name: encryptionHashAlgo },
  /**
   * Default public exponent.
   * 0x010001 -> 65537
   */
  publicExponent,
}

export const defaultAsymmetricSigningParam = {
  /**
   * Default encryption Algorithm to use.
   */
  name: signingAlgo,
  /**
   * Default key size to use.
   * 2048 or 4096 for RSA.
   */
  modulusLength: signingKeySize,
  /**
   * Default hash algorithm to use with signature.
   * SHA-256, SHA-384 or SHA-512 for RSA-PSS.
   */
  hash: { name: signingHashAlgo },
  /**
   * Default public exponent.
   * 0x010001 -> 65537
   */
  publicExponent,
}

export const defaultEncryptParams = {
  name: encryptionAlgo,
  // label: Uint8Array([...]) //optional
}

export const defaultSigningParams = {
  name: signingAlgo,
  /**
   * Default salt length.
   * SHA-256, SHA-384 or SHA-512.
   */
  saltLength: signingSaltLength,
}

export const defaultImportEncryptionParam = {
  name: encryptionAlgo,
  /**
   * Default hash algorithm to use with encryption scheme.
   * SHA-256, SHA-384 or SHA-512 for RSA-OAEP.
   */
  hash: { name: encryptionHashAlgo },
}

export const defaultImportSigningParam = {
  name: signingAlgo,
  /**
   * Default hash algorithm to use with signature scheme.
   * SHA-256, SHA-384 or SHA-512 for RSA-OAEP.
   */
  hash: { name: signingHashAlgo },
}
