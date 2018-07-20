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

export const defaultCryptoKeyDataFormat = 'jwk'

export function int8ArrayEqual(array1: Uint8Array, array2: Uint8Array) {
  if (array1 === array2) {
    return true
  }

  if (array1.byteLength !== array1.byteLength) {
    return false
  }

  for (let i = 0; i !== array1.byteLength; i++) {
    if (array1[i] !== array2[i]) {
      return false
    }
  }

  return true
}
