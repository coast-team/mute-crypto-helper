// Copyright 2017-2018 Jean-Philippe Eisenbarth
//
// This file is part of Crypto API wrapper.
//
// Crypto API Wrapper is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Crypto API Wrapper is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Crypto API Wrapper. See the file COPYING.  If not, see <http://www.gnu.org/licenses/>.

export const signingAlgorithm = "RSA-PSS"
export const encryptionAlgorithm = "RSA-OAEP"
export const keySize = 4096
export const hashAlgorithm = "SHA-256"
export const saltLength = 128
export const publicExponent = new Uint8Array([0x01, 0x00, 0x01]) // 0x010001 -> 65537
export const keyDataFormat = "jwk" // JSON Web key is a format for representing a public/private key as a JSON object
