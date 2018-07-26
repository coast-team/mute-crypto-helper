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

import { BN } from '../../src/index.common'
import { keyAgreementCrypto } from '../../src/index.common'
import { symmetricCrypto as symCrypto } from '../../src/index.common'
import * as helper from '../helper/helper'

describe('Key Agreement Crypto API wrapper test\n', () => {
  let globalR1: BN
  let globalR2: BN
  let globalR3: BN
  let globalR4: BN

  beforeAll(() => {
    globalR1 = new BN(
      '1549826380536156725025621896204168338530405777022402132899748669264118101547524324974273889296364158412220450257094156311870595440187728867828269655907174'
    )
    globalR2 = new BN(
      '10402361629660971335423607589343639608255711479924975631999327718824028075504073422903897864827214190353257065637567981266782510302048707687978273918694039'
    )
    globalR3 = new BN(
      '12940882709609214045840088640991848971104511293696943214990328455100207816867146376238643696107426119211217160144523698841978246083955315791575371595884774'
    )
    globalR4 = new BN(
      '12093104404176490130932678720154517883563120623522173571990666206572760630146894096340510615261683578689163726068604651029963895467797849341982787766490471'
    )
  })

  it('deriveKey(sharedSecret) should succeed', (done) => {
    const sharedSecret = helper.randomSecret(10)
    keyAgreementCrypto
      .deriveKey(sharedSecret)
      .then((secretKey1) => {
        keyAgreementCrypto
          .deriveKey(sharedSecret)
          .then((secretKey2) => {
            const s = 'Hello, world'
            symCrypto
              .encrypt(helper.str2buffer(s), secretKey1)
              .then((ciphertext) => symCrypto.decrypt(ciphertext, secretKey1))
              .then((plaintext) => {
                expect(helper.buffer2str(plaintext)).toEqual(s)
                done()
              })
              .catch(fail)
          })
          .catch(fail)
      })
      .catch(fail)
  })

  it('ComputeXi with 2 users should equal 1', () => {
    const z1 = keyAgreementCrypto.computeZi(globalR1)
    const z2 = keyAgreementCrypto.computeZi(globalR2)

    const x1 = keyAgreementCrypto.computeXi(globalR1, z2, z2)
    const x2 = keyAgreementCrypto.computeXi(globalR2, z1, z1)

    expect(new BN(x1 as Buffer).eqn(1)).toBeTruthy()
    expect(new BN(x1 as Buffer).eq(new BN(x2 as Buffer))).toBeTruthy()
  })

  it('keyAgreement protocol with 2 users should succeed', async () => {
    const z1 = keyAgreementCrypto.computeZi(globalR1)
    const z2 = keyAgreementCrypto.computeZi(globalR2)

    const x1 = keyAgreementCrypto.computeXi(globalR1, z2, z2)
    const x2 = keyAgreementCrypto.computeXi(globalR2, z1, z1)

    const xiList = [x1, x2]

    const sk1 = keyAgreementCrypto.computeSharedSecret(globalR1, x1, z2, xiList)
    const sk2 = keyAgreementCrypto.computeSharedSecret(globalR2, x2, z1, xiList)

    const goodResult = new BN(
      '623431257361301410553399281824969136793981446974408966805885660585081681411436511386685430211580037153817165531883201309635326699989320635132654247498596486115309809003673146175821998736070287988023633936935470852228466808712290739349067257843916276039215987752324110976631451967982101378590265957073021876938704439314584392120997506782398374595297404922333410159584712096302301857475612949506389479719928702904454408412380153053940065270813867541744562796654011653032017137716472140718902941536073511338021082413526933059618208666334350913217609432137333907640889209028694319833066240144234065489032250927343444194141622827808744702789462514259165310381171795843549340191781196684222118305703808966541300850740426890955129413348671538499433523992137146645962180886956193245247601706480121073710137406224896841253282497531107183948804708249756557845329058403033218363418047583942233012195379741685158256378785538648470034330'
    ).toArrayLike(Uint8Array as any) as Uint8Array

    expect(sk1).toEqual(sk2)
    expect(sk2).toEqual(goodResult)

    const secretKey1 = await keyAgreementCrypto.deriveKey(sk1)
    const secretKey2 = await keyAgreementCrypto.deriveKey(sk2)
    expect(secretKey1).toEqual(secretKey2)
  })

  it('keyAgreement protocol with 3 users should succeed', async () => {
    const z1 = keyAgreementCrypto.computeZi(globalR1)
    const z2 = keyAgreementCrypto.computeZi(globalR2)
    const z3 = keyAgreementCrypto.computeZi(globalR3)

    const x1 = keyAgreementCrypto.computeXi(globalR1, z2, z3)
    const x2 = keyAgreementCrypto.computeXi(globalR2, z3, z1)
    const x3 = keyAgreementCrypto.computeXi(globalR3, z1, z2)

    const xiList = [x1, x2, x3]

    const sk1 = keyAgreementCrypto.computeSharedSecret(globalR1, x1, z3, xiList)
    const sk2 = keyAgreementCrypto.computeSharedSecret(globalR2, x2, z1, xiList)
    const sk3 = keyAgreementCrypto.computeSharedSecret(globalR3, x3, z2, xiList)

    const goodResult = new BN(
      '5562316245963740849001201034434785222148168924394150442132042538380760568731446632854295176065998020480087042703479959945486736692845660595895585988184959453830354278838981150527915003735579248130735143553135188942815543182973388851483430425842625577587472534070997777755872119081891322811210417717543255535936791233512141366425080029615807461221556270267377099097998134978690631404513633222359780061211558169258218704480450663552885066041640420280038103752587408239049885040694976915217333993934171520830917134493688795752334208936564333938983290491594418707307607481586252951618385736787312137650342776750108839104237472228422519142269777457098177261433323271573651605965152503613035039149334896679745057240389372704206446830893959732957707935828653797507618489431318814361362959610253064716760577094236574532011487063661819741531901069227106172257730603376212504289375865108681345176894998563840709787548639882127557668691'
    ).toArrayLike(Uint8Array as any) as Uint8Array

    expect(sk1).toEqual(sk2)
    expect(sk2).toEqual(sk3)
    expect(sk3).toEqual(goodResult)

    const secretKey1 = await keyAgreementCrypto.deriveKey(sk1)
    const secretKey2 = await keyAgreementCrypto.deriveKey(sk2)
    const secretKey3 = await keyAgreementCrypto.deriveKey(sk3)
    expect(secretKey1).toEqual(secretKey2)
    expect(secretKey2).toEqual(secretKey3)
  })

  it('keyAgreement protocol with 4 users should succeed', async () => {
    const z1 = keyAgreementCrypto.computeZi(globalR1)
    const z2 = keyAgreementCrypto.computeZi(globalR2)
    const z3 = keyAgreementCrypto.computeZi(globalR3)
    const z4 = keyAgreementCrypto.computeZi(globalR4)

    const x1 = keyAgreementCrypto.computeXi(globalR1, z2, z4)
    const x2 = keyAgreementCrypto.computeXi(globalR2, z3, z1)
    const x3 = keyAgreementCrypto.computeXi(globalR3, z4, z2)
    const x4 = keyAgreementCrypto.computeXi(globalR4, z1, z3)

    const xiList = [new Uint8Array(x1), new Uint8Array(x2), new Uint8Array(x3), new Uint8Array(x4)]

    const sk1 = keyAgreementCrypto.computeSharedSecret(globalR1, x1, z4, xiList)
    const sk2 = keyAgreementCrypto.computeSharedSecret(globalR2, x2, z1, xiList)
    const sk3 = keyAgreementCrypto.computeSharedSecret(globalR3, x3, z2, xiList)
    const sk4 = keyAgreementCrypto.computeSharedSecret(globalR4, x4, z3, xiList)

    const goodResult = new BN(
      '4786429500386374497819322003802470493220257022912680601233665769038390053368877845241992840471932483695968638818048300529425953016186086152076315887724584320220206384994415782661998034005429488570663179147972855888026376571509663386940800927946671172015808829665212930399896626037797447593013909654571624897032826413725669234823983808985021719183549708653348476316909168322452856863313612523764112642184683405892468828244222965140064496850638459238844074635488438330390299316845827687360119191632495669693355014051146167197730954774080172777156238657905493013482481069307890585474897722868576250958867939905743744124127812252824550572199837151227124863344531994653335481462302321867054202710978645631196089646734815769606913042811960883640722685585508469403151985618335901273903912357329917436560785308910940098580862715772052234157175837538992113727313654950570423700508827132525308585314741023584584788324842197700030701777'
    ).toArrayLike(Uint8Array as any) as Uint8Array

    expect(sk1).toEqual(sk2)
    expect(sk2).toEqual(sk3)
    expect(sk3).toEqual(sk4)
    expect(sk4).toEqual(goodResult)

    const secretKey1 = await keyAgreementCrypto.deriveKey(sk1)
    const secretKey2 = await keyAgreementCrypto.deriveKey(sk2)
    const secretKey3 = await keyAgreementCrypto.deriveKey(sk3)
    const secretKey4 = await keyAgreementCrypto.deriveKey(sk4)
    expect(secretKey1).toEqual(secretKey2)
    expect(secretKey2).toEqual(secretKey3)
    expect(secretKey3).toEqual(secretKey4)
  })

  it('keyAgreement protocol with 3 users (with random ri) should succeed', async () => {
    const r1: BN = keyAgreementCrypto.generateRi()
    const r2: BN = keyAgreementCrypto.generateRi()
    const r3: BN = keyAgreementCrypto.generateRi()

    const z1 = keyAgreementCrypto.computeZi(r1)
    const z2 = keyAgreementCrypto.computeZi(r2)
    const z3 = keyAgreementCrypto.computeZi(r3)

    const x1 = keyAgreementCrypto.computeXi(r1, z2, z3)
    const x2 = keyAgreementCrypto.computeXi(r2, z3, z1)
    const x3 = keyAgreementCrypto.computeXi(r3, z1, z2)

    const xiList = [x1, x2, x3]

    const sk1 = keyAgreementCrypto.computeSharedSecret(r1, x1, z3, xiList)
    const sk2 = keyAgreementCrypto.computeSharedSecret(r2, x2, z1, xiList)
    const sk3 = keyAgreementCrypto.computeSharedSecret(r3, x3, z2, xiList)

    expect(sk1).toEqual(sk2)
    expect(sk2).toEqual(sk3)

    const secretKey1 = await keyAgreementCrypto.deriveKey(sk1)
    const secretKey2 = await keyAgreementCrypto.deriveKey(sk2)
    const secretKey3 = await keyAgreementCrypto.deriveKey(sk3)
    expect(secretKey1).toEqual(secretKey2)
    expect(secretKey2).toEqual(secretKey3)
  })
})
