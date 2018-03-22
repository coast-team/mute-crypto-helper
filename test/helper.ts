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

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export function randStr () {
    const strLength = 20
    let str = ""
    for (let i = 0; i < strLength; i++) {
        str = str + String.fromCharCode(0x0000 + Math.ceil(Math.random() * 10000))
    }
    return str2buffer(str)
}

export function str2buffer (str) {
    return encoder.encode(str)
}

export function buffer2str (buffer) {
    return decoder.decode(buffer)
}

export function isEmpty (obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false
        }
    }
    return true
}
