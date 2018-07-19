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

import { encryptionAlgo, keySize } from './symmetricCryptoHelper'

import BN = require('bn.js')

/**
 * Default parameters for generating the Key Derivative Function object.
 */
export const KDFKeyParams = {
  /**
   * Default format to use.
   */
  format: 'raw',
  /**
   * Default algorithm to use.
   */
  algorithm: 'PBKDF2',
  /**
   * Not Extractable by default.
   */
  extractable: false,
  /**
   * Used only to derive a key by default.
   */
  keyUsages: ['deriveKey'],
}

/**
 * Default parameters for computing the key using the KDF.
 */
export const KDFDeriveKeyParams = {
  info: {
    /**
     * Default algorithm to derive the key.
     */
    name: 'PBKDF2',
    /**
     * No salt by default, there is enough entropy in the Shared Secret computed with the Burmester-Desmedt protocol.
     */
    salt: new Uint8Array(),
    /**
     * Only one iteration, linked with {@link salt}
     */
    iterations: 1,
    /**
     * Default hashing algorithm to use.
     */
    hash: 'SHA-256',
  } as any,
  symmKeyParams: {
    /**
     * Default symmetric key algorithm to use.
     */
    name: encryptionAlgo,
    /**
     * Default symmetric key size to use.
     */
    length: keySize,
  },
  /**
   * Extractable by default.
   */
  extractable: true,
  /**
   * Can be used to encrypt and decrypt.
   */
  keyUsages: ['encrypt', 'decrypt'],
}

export const p = new BN(
  'FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A93AD2CAFFFFFFFFFFFFFFFF',
  16
)
// const p = new BN("FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AACAA68FFFFFFFFFFFFFFFF", 16)
/**
 * The generator to use.
 */
export const g = new BN(2)

/**
 * The size in bytes of the generated ri.
 */
export const riSize = 64
