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

export const signingAlgorithm = 'RSA-PSS'
export const encryptionAlgorithm = 'RSA-OAEP'
export const keySize = 4096
export const hashAlgorithm = 'SHA-256'
export const saltLength = 128
export const publicExponent = new Uint8Array([0x01, 0x00, 0x01]) // 0x010001 -> 65537
export const keyDataFormat = 'jwk' // JSON Web key is a format for representing a public/private key as a JSON object
