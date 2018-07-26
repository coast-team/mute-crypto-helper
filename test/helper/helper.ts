import { env } from '../../src/misc/env'

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

let encoder: TextEncoder
let decoder: TextDecoder
if ('window' in global) {
  encoder = new TextEncoder()
  decoder = new TextDecoder()
} else {
  const textEncoding = require('text-encoding')
  encoder = new textEncoding.TextEncoder()
  decoder = new textEncoding.TextDecoder()
}

export function randStr() {
  const strLength = 20
  let str = ''
  for (let i = 0; i < strLength; i++) {
    str = str + String.fromCharCode(0x0000 + Math.ceil(Math.random() * 10000))
  }
  return str2buffer(str)
}

export function str2buffer(str: string) {
  return encoder.encode(str)
}

export function buffer2str(buffer: BufferSource) {
  return decoder.decode(buffer as ArrayBuffer)
}

export function randomSecret(bytes: number) {
  return env.crypto.getRandomValues(new Uint8Array(bytes)) as Uint8Array
}
