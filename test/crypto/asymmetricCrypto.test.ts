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

import { asymmetricCrypto as asymCrypto } from '../../src/index.common'
import * as helper from '../helper/helper'

describe('Asymmetric Crypto API wrapper test\n', () => {
  let cryptoSigningKeypair: any
  let cryptoEncryptionKeypair: any
  const importKeyError = 'TypeError'
  const UndefinedKeyOpsError = `key_ops should not be undefined.\
    cryptoKeyPairData should be the same object as returned by exportKey ...`

  beforeAll((done) => {
    asymCrypto
      .generateSigningKey()
      .then((key) => {
        cryptoSigningKeypair = key
        return asymCrypto.generateEncryptionKey()
      })
      .then((key2) => {
        cryptoEncryptionKeypair = key2
        done()
      })
      .catch(fail)
  })

  it('exportKey(key), importkey should succeed (key is a signing KeyPair)', (done) => {
    asymCrypto
      .exportKey(cryptoSigningKeypair)
      .then((keyDataObj) => {
        asymCrypto
          .importKey(keyDataObj)
          .then((keyPair) => {
            expect(cryptoSigningKeypair).toEqual(keyPair)
            done()
          })
          .catch(fail)
      })
      .catch(fail)
  })

  it('exportKey(key), importkey should succeed (key is a encryption KeyPair)', (done) => {
    asymCrypto
      .exportKey(cryptoEncryptionKeypair)
      .then((keyDataObj) => asymCrypto.importKey(keyDataObj))
      .then((keyPair) => {
        expect(cryptoEncryptionKeypair).toEqual(keyPair)
        done()
      })
      .catch(fail)
  })

  /*
      IMPORTKEY (fail)
    */

  it('importkey(keypair) should throw a TypeError if the private key is a JsonWebKey that do not contain key_ops', (done) => {
    asymCrypto
      .importKey({
        publicKey: {
          kty: 'RSA',
          e: 'AQAB',
          n:
            'vWJiVP3tUiJ_-lImHdJo6kHqKFHQFulcPu7jbiiJ56-Hy8MXW_iCxYbQ3iqIsQlRTxSn5NLuqoejWM2OntJSPOEp79GRh5Fjri6l6BbVlViWoVAy-NW54VRJput4QXHKFpu2h_SVMwNvVdC0UyMIPqqFz3rZsst2tQ7fVjXyOcNTrVOBEqaWW8T-jYbd2j_BcuOz3Rc7AsgSPbDK1B6-W41Ibp1SWZtWuUEY1IVSGtT5iz1vLDLUxxT3QyCyXfuVmL5qrQ-nV_XR3zdoKEn6eKOD1Bx9rAJVYVHqrApRsrjIiL4vPCyIZEYQ1cbg4Ux1DsRqTVWUTPVVE5D-Q2_1FQ',
          alg: 'RSA-OAEP-256',
          ext: true,
          key_ops: ['encrypt'],
        },
        privateKey: {
          alg: 'PS256',
          d:
            'YrvV7PBkjiNEljI0dpJJAFjT-YhJ_dZ-uzWB2VNU01vLaCL4-i_EpAY2Ns-P_iIemw30RnrXZ4xCoimEXjI6SRApIl7DChrw9ct0GLGzNtz-Uf2Q49sAtcUNfkQCcAV-kB-Fr_q5cR_2pAoc3dY4hjyM8_5taZ1dlm8ov3OwdQjmzdfhmzwtHmpw805xFdMAZmUtIRelkyaj6Uc9ja4PMO5-Kmvf9a5hPdwJF3nGVuy5IiaN_cv5_T4jd3p5SRDXvSf4h_Wr0BqltIDpE3bvb1pJP35oXfhmaoOND4s9WflNxjP2A53o_TJtpblUkd84bnaEovSymJrj0hzW1FKr1Q',
          dp:
            'm_zy8LjAiVxB8px29qBtkIKtGUfViha6Zgq58Ley6U2QXXmPaSbex7iBtHyrAP4UNQTaORoTAta_G1Q33InQp0W0c0n4AqVxVTzEuotZgSPf8atQZHsPpadUDjlVvg3SWCn2D55c6iygxrqN5j1tpc_BCJYxtfnR43jSJzfzvbU',
          dq:
            'rZ5DbleUPf6ApVYs3rWq21HmOkUS3kKijcud-mVImcPYqXo2eBV__Y4qwWrTB8xSwcQEo6HSNyM59bUx-OJDEPXD53SDqubqQN6NL09jZ1lkDTTNQSo8xWZLt26S5d8g_3HdasL0znsUcu9bcMxld-NIhY4yJOmvprH41ytNr1k',
          e: 'AQAB',
          ext: true,
          kty: 'RSA',
          n:
            '3Eac1B6i-qSr4o0SQoI89xQ3drpGBipigAw-phrIH2nRFoJWto3kWKdgojbdx2YRtbqmo2_2MMp633TCquANNJNZwxvyiNj0Q2dIJ69nvapIipkrWLGBwZd10CSbqb2o5I28Jr_VKDELZzyxahKBKkw0EQ7d1Y6oZK3jC9WGBqsf1Bzd5SOnvZO6fsvCoY8f260-YoSWoQ5sR_EGKpb4u2EuhYTGfYBtBo9u5zJvRdr37__ctKCd8pbEGp0mw5IzbbEg2BpExHCCMNOihwr-PUQi4VvWQEsiz30RvPyO1p1YgDNVZxueJgxI09UjapS6WOALjicwAxs6hZ3XvLZ-fw',
          p:
            '_aJsmCcH8-L0-r5f4AksMvcbBMT85mfPgWkqo8z1K70klzoE-KjYcnkrKGW4keLXiSi7rxW8OTmEnjJZTj9RhVtEnUA71Y5vxsZAtC1mc427dyKT1Ysvhpr1u7fsiQ-Jv9PIbCePWtKBKIFLF2gzVwkzxCOvIok3DK6SkL_U2Ks',
          q:
            '3lSKpIF38wxUGGeTVnW36flsxw_h7HqoImfX7s8VfpYtOd6GfUDwMtAH69v3fUz0shIFD3gNAqiJtC7mB3wAxsUCTA4FihotUYJQ9s8VIf0TZC1kTY0AEXZ8isqEx37wWyxp1B99yo50s0GMz7A8r__Xi_vWMpS0623lGBngGX0',
          qi:
            'thTQiQFnYH9fbGXLNDY6_hoCCpUlAjACw3atW4PH7IApF9wEVQp5lH4C6OVb1QUeu-kHD1ae4UoMeGmtMGzAfUn2ZOEB3V88MSejeYJz6dLLgdZXHmJzZOtqWsYE4F9KVBb7xdOvYjMiCNRqCz3tCqY1sgTa3pXIxbb_GZQt6Ts',
        },
      })
      .then(fail)
      .catch((err) => {
        expect(err.constructor.name).toEqual(importKeyError)
        expect(err.message).toEqual(UndefinedKeyOpsError)
        done()
      })
  })

  it('importkey(publicKey) should throw a TypeError if the publicKey is a JsonWebKey that do not contain key_ops', (done) => {
    asymCrypto
      .importKey({
        publicKey: {
          kty: 'RSA',
          e: 'AQAB',
          n:
            'vWJiVP3tUiJ_-lImHdJo6kHqKFHQFulcPu7jbiiJ56-Hy8MXW_iCxYbQ3iqIsQlRTxSn5NLuqoejWM2OntJSPOEp79GRh5Fjri6l6BbVlViWoVAy-NW54VRJput4QXHKFpu2h_SVMwNvVdC0UyMIPqqFz3rZsst2tQ7fVjXyOcNTrVOBEqaWW8T-jYbd2j_BcuOz3Rc7AsgSPbDK1B6-W41Ibp1SWZtWuUEY1IVSGtT5iz1vLDLUxxT3QyCyXfuVmL5qrQ-nV_XR3zdoKEn6eKOD1Bx9rAJVYVHqrApRsrjIiL4vPCyIZEYQ1cbg4Ux1DsRqTVWUTPVVE5D-Q2_1FQ',
          alg: 'RSA-OAEP-256',
          ext: true,
        },
        privateKey: {
          alg: 'PS256',
          d:
            'YrvV7PBkjiNEljI0dpJJAFjT-YhJ_dZ-uzWB2VNU01vLaCL4-i_EpAY2Ns-P_iIemw30RnrXZ4xCoimEXjI6SRApIl7DChrw9ct0GLGzNtz-Uf2Q49sAtcUNfkQCcAV-kB-Fr_q5cR_2pAoc3dY4hjyM8_5taZ1dlm8ov3OwdQjmzdfhmzwtHmpw805xFdMAZmUtIRelkyaj6Uc9ja4PMO5-Kmvf9a5hPdwJF3nGVuy5IiaN_cv5_T4jd3p5SRDXvSf4h_Wr0BqltIDpE3bvb1pJP35oXfhmaoOND4s9WflNxjP2A53o_TJtpblUkd84bnaEovSymJrj0hzW1FKr1Q',
          dp:
            'm_zy8LjAiVxB8px29qBtkIKtGUfViha6Zgq58Ley6U2QXXmPaSbex7iBtHyrAP4UNQTaORoTAta_G1Q33InQp0W0c0n4AqVxVTzEuotZgSPf8atQZHsPpadUDjlVvg3SWCn2D55c6iygxrqN5j1tpc_BCJYxtfnR43jSJzfzvbU',
          dq:
            'rZ5DbleUPf6ApVYs3rWq21HmOkUS3kKijcud-mVImcPYqXo2eBV__Y4qwWrTB8xSwcQEo6HSNyM59bUx-OJDEPXD53SDqubqQN6NL09jZ1lkDTTNQSo8xWZLt26S5d8g_3HdasL0znsUcu9bcMxld-NIhY4yJOmvprH41ytNr1k',
          e: 'AQAB',
          ext: true,
          kty: 'RSA',
          n:
            '3Eac1B6i-qSr4o0SQoI89xQ3drpGBipigAw-phrIH2nRFoJWto3kWKdgojbdx2YRtbqmo2_2MMp633TCquANNJNZwxvyiNj0Q2dIJ69nvapIipkrWLGBwZd10CSbqb2o5I28Jr_VKDELZzyxahKBKkw0EQ7d1Y6oZK3jC9WGBqsf1Bzd5SOnvZO6fsvCoY8f260-YoSWoQ5sR_EGKpb4u2EuhYTGfYBtBo9u5zJvRdr37__ctKCd8pbEGp0mw5IzbbEg2BpExHCCMNOihwr-PUQi4VvWQEsiz30RvPyO1p1YgDNVZxueJgxI09UjapS6WOALjicwAxs6hZ3XvLZ-fw',
          p:
            '_aJsmCcH8-L0-r5f4AksMvcbBMT85mfPgWkqo8z1K70klzoE-KjYcnkrKGW4keLXiSi7rxW8OTmEnjJZTj9RhVtEnUA71Y5vxsZAtC1mc427dyKT1Ysvhpr1u7fsiQ-Jv9PIbCePWtKBKIFLF2gzVwkzxCOvIok3DK6SkL_U2Ks',
          q:
            '3lSKpIF38wxUGGeTVnW36flsxw_h7HqoImfX7s8VfpYtOd6GfUDwMtAH69v3fUz0shIFD3gNAqiJtC7mB3wAxsUCTA4FihotUYJQ9s8VIf0TZC1kTY0AEXZ8isqEx37wWyxp1B99yo50s0GMz7A8r__Xi_vWMpS0623lGBngGX0',
          qi:
            'thTQiQFnYH9fbGXLNDY6_hoCCpUlAjACw3atW4PH7IApF9wEVQp5lH4C6OVb1QUeu-kHD1ae4UoMeGmtMGzAfUn2ZOEB3V88MSejeYJz6dLLgdZXHmJzZOtqWsYE4F9KVBb7xdOvYjMiCNRqCz3tCqY1sgTa3pXIxbb_GZQt6Ts',
          key_ops: ['decrypt'],
        },
      })
      .then(fail)
      .catch((err) => {
        expect(err.constructor.name).toEqual(importKeyError)
        expect(err.message).toEqual(UndefinedKeyOpsError)
        done()
      })
  })

  it('importkey(keypair) should throw a TypeError if the publicKey is a JsonWebKey that do have wrong content for key_ops', (done) => {
    asymCrypto
      .importKey({
        publicKey: {
          kty: 'RSA',
          e: 'AQAB',
          n:
            'vWJiVP3tUiJ_-lImHdJo6kHqKFHQFulcPu7jbiiJ56-Hy8MXW_iCxYbQ3iqIsQlRTxSn5NLuqoejWM2OntJSPOEp79GRh5Fjri6l6BbVlViWoVAy-NW54VRJput4QXHKFpu2h_SVMwNvVdC0UyMIPqqFz3rZsst2tQ7fVjXyOcNTrVOBEqaWW8T-jYbd2j_BcuOz3Rc7AsgSPbDK1B6-W41Ibp1SWZtWuUEY1IVSGtT5iz1vLDLUxxT3QyCyXfuVmL5qrQ-nV_XR3zdoKEn6eKOD1Bx9rAJVYVHqrApRsrjIiL4vPCyIZEYQ1cbg4Ux1DsRqTVWUTPVVE5D-Q2_1FQ',
          alg: 'RSA-OAEP-256',
          ext: true,
          key_ops: [''],
        },
        privateKey: {
          alg: 'PS256',
          d:
            'YrvV7PBkjiNEljI0dpJJAFjT-YhJ_dZ-uzWB2VNU01vLaCL4-i_EpAY2Ns-P_iIemw30RnrXZ4xCoimEXjI6SRApIl7DChrw9ct0GLGzNtz-Uf2Q49sAtcUNfkQCcAV-kB-Fr_q5cR_2pAoc3dY4hjyM8_5taZ1dlm8ov3OwdQjmzdfhmzwtHmpw805xFdMAZmUtIRelkyaj6Uc9ja4PMO5-Kmvf9a5hPdwJF3nGVuy5IiaN_cv5_T4jd3p5SRDXvSf4h_Wr0BqltIDpE3bvb1pJP35oXfhmaoOND4s9WflNxjP2A53o_TJtpblUkd84bnaEovSymJrj0hzW1FKr1Q',
          dp:
            'm_zy8LjAiVxB8px29qBtkIKtGUfViha6Zgq58Ley6U2QXXmPaSbex7iBtHyrAP4UNQTaORoTAta_G1Q33InQp0W0c0n4AqVxVTzEuotZgSPf8atQZHsPpadUDjlVvg3SWCn2D55c6iygxrqN5j1tpc_BCJYxtfnR43jSJzfzvbU',
          dq:
            'rZ5DbleUPf6ApVYs3rWq21HmOkUS3kKijcud-mVImcPYqXo2eBV__Y4qwWrTB8xSwcQEo6HSNyM59bUx-OJDEPXD53SDqubqQN6NL09jZ1lkDTTNQSo8xWZLt26S5d8g_3HdasL0znsUcu9bcMxld-NIhY4yJOmvprH41ytNr1k',
          e: 'AQAB',
          ext: true,
          kty: 'RSA',
          n:
            '3Eac1B6i-qSr4o0SQoI89xQ3drpGBipigAw-phrIH2nRFoJWto3kWKdgojbdx2YRtbqmo2_2MMp633TCquANNJNZwxvyiNj0Q2dIJ69nvapIipkrWLGBwZd10CSbqb2o5I28Jr_VKDELZzyxahKBKkw0EQ7d1Y6oZK3jC9WGBqsf1Bzd5SOnvZO6fsvCoY8f260-YoSWoQ5sR_EGKpb4u2EuhYTGfYBtBo9u5zJvRdr37__ctKCd8pbEGp0mw5IzbbEg2BpExHCCMNOihwr-PUQi4VvWQEsiz30RvPyO1p1YgDNVZxueJgxI09UjapS6WOALjicwAxs6hZ3XvLZ-fw',
          p:
            '_aJsmCcH8-L0-r5f4AksMvcbBMT85mfPgWkqo8z1K70klzoE-KjYcnkrKGW4keLXiSi7rxW8OTmEnjJZTj9RhVtEnUA71Y5vxsZAtC1mc427dyKT1Ysvhpr1u7fsiQ-Jv9PIbCePWtKBKIFLF2gzVwkzxCOvIok3DK6SkL_U2Ks',
          q:
            '3lSKpIF38wxUGGeTVnW36flsxw_h7HqoImfX7s8VfpYtOd6GfUDwMtAH69v3fUz0shIFD3gNAqiJtC7mB3wAxsUCTA4FihotUYJQ9s8VIf0TZC1kTY0AEXZ8isqEx37wWyxp1B99yo50s0GMz7A8r__Xi_vWMpS0623lGBngGX0',
          qi:
            'thTQiQFnYH9fbGXLNDY6_hoCCpUlAjACw3atW4PH7IApF9wEVQp5lH4C6OVb1QUeu-kHD1ae4UoMeGmtMGzAfUn2ZOEB3V88MSejeYJz6dLLgdZXHmJzZOtqWsYE4F9KVBb7xdOvYjMiCNRqCz3tCqY1sgTa3pXIxbb_GZQt6Ts',
        },
      })
      .then(fail)
      .catch((err) => {
        expect(err.constructor.name).toEqual(importKeyError)
        expect(err.message).toEqual(UndefinedKeyOpsError)
        done()
      })
  })

  it(`importkey(keypair) should throw a TypeError if the privateKey is a JsonWebKey that do have wrong content for key_ops`, (done) => {
    asymCrypto
      .importKey({
        publicKey: {
          kty: 'RSA',
          e: 'AQAB',
          n:
            'vWJiVP3tUiJ_-lImHdJo6kHqKFHQFulcPu7jbiiJ56-Hy8MXW_iCxYbQ3iqIsQlRTxSn5NLuqoejWM2OntJSPOEp79GRh5Fjri6l6BbVlViWoVAy-NW54VRJput4QXHKFpu2h_SVMwNvVdC0UyMIPqqFz3rZsst2tQ7fVjXyOcNTrVOBEqaWW8T-jYbd2j_BcuOz3Rc7AsgSPbDK1B6-W41Ibp1SWZtWuUEY1IVSGtT5iz1vLDLUxxT3QyCyXfuVmL5qrQ-nV_XR3zdoEKn6eKOD1Bx9rAJVYVHqrApRsrjIiL4vPCyIZEYQ1cbg4Ux1DsRqTVWUTPVVE5D-Q2_1FQ',
          alg: 'RSA-OAEP-256',
          ext: true,
          key_ops: ['encrypt'],
        },
        privateKey: {
          alg: 'PS256',
          d:
            'YrvV7PBkjiNEljI0dpJJAFjT-YhJ_dZ-uzWB2VNU01vLaCL4-i_EpAY2Ns-P_iIemw30RnrXZ4xCoimEXjI6SRApIl7DChrw9ct0GLGzNtz-Uf2Q49sAtcUNfkQCcAV-kB-Fr_q5cR_2pAoc3dY4hjyM8_5taZ1dlm8ov3OwdQjmzdfhmzwtHmpw805xFdMAZmUtIRelkyaj6Uc9ja4PMO5-Kmvf9a5hPdwJF3nGVuy5IiaN_cv5_T4jd3p5SRDXvSf4h_Wr0BqltIDpE3bvb1pJP35oXfhmaoOND4s9WflNxjP2A53o_TJtpblUkd84bnaEovSymJrj0hzW1FKr1Q',
          dp:
            'm_zy8LjAiVxB8px29qBtkIKtGUfViha6Zgq58Ley6U2QXXmPaSbex7iBtHyrAP4UNQTaORoTAta_G1Q33InQp0W0c0n4AqVxVTzEuotZgSPf8atQZHsPpadUDjlVvg3SWCn2D55c6iygxrqN5j1tpc_BCJYxtfnR43jSJzfzvbU',
          dq:
            'rZ5DbleUPf6ApVYs3rWq21HmOkUS3kKijcud-mVImcPYqXo2eBV__Y4qwWrTB8xSwcQEo6HSNyM59bUx-OJDEPXD53SDqubqQN6NL09jZ1lkDTTNQSo8xWZLt26S5d8g_3HdasL0znsUcu9bcMxld-NIhY4yJOmvprH41ytNr1k',
          e: 'AQAB',
          ext: true,
          kty: 'RSA',
          n:
            '3Eac1B6i-qSr4o0SQoI89xQ3drpGBipigAw-phrIH2nRFoJWto3kWKdgojbdx2YRtbqmo2_2MMp633TCquANNJNZwxvyiNj0Q2dIJ69nvapIipkrWLGBwZd10CSbqb2o5I28Jr_VKDELZzyxahKBKkw0EQ7d1Y6oZK3jC9WGBqsf1Bzd5SOnvZO6fsvCoY8f260-YoSWoQ5sR_EGKpb4u2EuhYTGfYBtBo9u5zJvRdr37__ctKCd8pbEGp0mw5IzbbEg2BpExHCCMNOihwr-PUQi4VvWQEsiz30RvPyO1p1YgDNVZxueJgxI09UjapS6WOALjicwAxs6hZ3XvLZ-fw',
          p:
            '_aJsmCcH8-L0-r5f4AksMvcbBMT85mfPgWkqo8z1K70klzoE-KjYcnkrKGW4keLXiSi7rxW8OTmEnjJZTj9RhVtEnUA71Y5vxsZAtC1mc427dyKT1Ysvhpr1u7fsiQ-Jv9PIbCePWtKBKIFLF2gzVwkzxCOvIok3DK6SkL_U2Ks',
          q:
            '3lSKpIF38wxUGGeTVnW36flsxw_h7HqoImfX7s8VfpYtOd6GfUDwMtAH69v3fUz0shIFD3gNAqiJtC7mB3wAxsUCTA4FihotUYJQ9s8VIf0TZC1kTY0AEXZ8isqEx37wWyxp1B99yo50s0GMz7A8r__Xi_vWMpS0623lGBngGX0',
          qi:
            'thTQiQFnYH9fbGXLNDY6_hoCCpUlAjACw3atW4PH7IApF9wEVQp5lH4C6OVb1QUeu-kHD1ae4UoMeGmtMGzAfUn2ZOEB3V88MSejeYJz6dLLgdZXHmJzZOtqWsYE4F9KVBb7xdOvYjMiCNRqCz3tCqY1sgTa3pXIxbb_GZQt6Ts',
          key_ops: [''],
        },
      })
      .then(fail)
      .catch((err) => {
        expect(err.constructor.name).toEqual(importKeyError)
        expect(err.message).toEqual(UndefinedKeyOpsError)
        done()
      })
  })

  it('sign, verify', (done) => {
    const data = helper.randStr()
    asymCrypto
      .sign(data, cryptoSigningKeypair.privateKey)
      .then((signature) =>
        asymCrypto
          .verifySignature(data, signature, cryptoSigningKeypair.publicKey)
          .then((isValid) => {
            expect(isValid).toBeTruthy()
            done()
          })
          .catch(fail)
      )
      .catch(fail)
  })

  it('encrypt() decrypt()', (done) => {
    const data = helper.randStr()
    asymCrypto
      .encrypt(data, cryptoEncryptionKeypair.publicKey)
      .then((encryptedData) =>
        asymCrypto
          .decrypt(encryptedData, cryptoEncryptionKeypair.privateKey)
          .then((plaintext) => {
            expect(plaintext).toEqual(data)
            done()
          })
          .catch(fail)
      )
      .catch(fail)
  })
})
