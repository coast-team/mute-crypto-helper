# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="1.0.4"></a>
## [1.0.4](https://github.com/coast-team/mute-crypto-helper/compare/v1.0.3...v1.0.4) (2023-04-07)

###
Removed peerDependencies

<a name="1.0.3"></a>
## [1.0.3](https://github.com/coast-team/mute-crypto-helper/compare/v1.0.2...v1.0.3) (2018-10-23)

### Bug Fixes

* **build:** dist was not included in the previous release


<a name="1.0.2"></a>
## [1.0.2](https://github.com/coast-team/mute-crypto-helper/compare/v1.0.1...v1.0.2) (2018-09-06)



<a name="1.0.1"></a>
## [1.0.1](https://github.com/coast-team/mute-crypto-helper/compare/v1.0.0...v1.0.1) (2018-09-03)


### Bug Fixes

* **build:** do not bundle node-webcrypto-ossl ([f44b10a](https://github.com/coast-team/mute-crypto-helper/commit/f44b10a))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/coast-team/mute-crypto-helper/compare/v1.0.0-beta.0...v1.0.0) (2018-08-28)


### Bug Fixes

* **helper:** wrong arrays lengths comparison ([568898b](https://github.com/coast-team/mute-crypto-helper/commit/568898b))


### Code Refactoring

* **asymmetric:** change exportKey and importKey signature ([3df7153](https://github.com/coast-team/mute-crypto-helper/commit/3df7153))


### BREAKING CHANGES

* **asymmetric:** 1) ICryptoKeyPairData is no longer exported by the API. 2)
asymmetricCrypto.importKey takes JsonWebKey as parameter and returns CryptoKey. 3)
asymmetricCrypto.exportKey takes CryptoKey as parameter and returns JsonWebKey.



<a name="1.0.0-beta.0"></a>
# [1.0.0-beta.0](https://github.com/coast-team/mute-crypto-helper/compare/v0.6.5...v1.0.0-beta.0) (2018-08-10)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/coast-team/mute-crypto-helper/compare/v0.6.5...v1.0.0) (2018-08-10)



<a name="0.6.5"></a>
## [0.6.5](https://github.com/coast-team/crypto-api-wrapper/compare/v0.6.4...v0.6.5) (2018-07-26)



<a name="0.6.4"></a>
## [0.6.4](https://github.com/coast-team/crypto-api-wrapper/compare/v0.6.3...v0.6.4) (2018-07-20)


### Code Refactoring

* **keyagreement:** update types ([029eba9](https://github.com/coast-team/crypto-api-wrapper/commit/029eba9))


### BREAKING CHANGES

* **keyagreement:** doesn't export BN anymore (Uint8Array instead)



<a name="0.6.3"></a>
## [0.6.3](https://github.com/coast-team/crypto-api-wrapper/compare/v0.6.2...v0.6.3) (2018-07-19)


### Bug Fixes

* **types:** fix [@types](https://github.com/types)/bn.js dependency ([5a0598a](https://github.com/coast-team/crypto-api-wrapper/commit/5a0598a))



<a name="0.6.2"></a>
## [0.6.2](https://github.com/coast-team/crypto-api-wrapper/compare/v0.6.1...v0.6.2) (2018-07-19)


### Features

* **keyagreement:** add generation of the user's random value ([408dd2f](https://github.com/coast-team/crypto-api-wrapper/commit/408dd2f))


### BREAKING CHANGES

* **keyagreement:** computeSKi() -> computeSharedSecret()



<a name="0.6.1"></a>
## [0.6.1](https://github.com/coast-team/crypto-api-wrapper/compare/v0.6.0...v0.6.1) (2018-07-18)


### Bug Fixes

* **package:** build for browser points to the right file ([3ee7403](https://github.com/coast-team/crypto-api-wrapper/commit/3ee7403))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/coast-team/crypto-api-wrapper/compare/v0.4.2...v0.6.0) (2018-07-13)


### Bug Fixes

* **KeyAgreement:** Shared secret as Uint8Array and not BN anymore ([f3cf3a7](https://github.com/coast-team/crypto-api-wrapper/commit/f3cf3a7))


### Features

* **KeyAgreement:** add key agreement crypto primitives ([1b5fc62](https://github.com/coast-team/crypto-api-wrapper/commit/1b5fc62))



<a name="0.4.2"></a>
## [0.4.2](https://github.com/coast-team/crypto-api-wrapper/compare/v0.4.1...v0.4.2) (2018-05-25)



<a name="0.4.1"></a>
## [0.4.1](https://github.com/coast-team/crypto-api-wrapper/compare/v0.4.0-beta...v0.4.1) (2018-05-25)



<a name="0.4.0-beta"></a>
# [0.4.0-beta](https://github.com/coast-team/crypto-api-wrapper/compare/v0.3.0-beta1...v0.4.0-beta) (2018-05-25)



<a name="0.3.0-beta1"></a>
# [0.3.0-beta1](https://github.com/coast-team/crypto-api-wrapper/compare/v0.2.2-beta1...v0.3.0-beta1) (2018-05-03)



<a name="0.2.2-beta1"></a>
## [0.2.2-beta1](https://github.com/coast-team/crypto-api-wrapper/compare/v0.2.1-beta1...v0.2.2-beta1) (2018-04-25)



<a name="0.2.1-beta1"></a>
## [0.2.1-beta1](https://github.com/coast-team/crypto-api-wrapper/compare/v0.2.0-beta1...v0.2.1-beta1) (2018-04-24)



<a name="0.2.0-beta1"></a>
# [0.2.0-beta1](https://github.com/coast-team/crypto-api-wrapper/compare/v0.1.0-beta-2...v0.2.0-beta1) (2018-04-23)



<a name="0.1.0-beta-2"></a>
# [0.1.0-beta-2](https://github.com/coast-team/crypto-api-wrapper/compare/v0.1.0-beta-1...v0.1.0-beta-2) (2018-04-18)



<a name="0.1.0-beta-1"></a>
# 0.1.0-beta-1 (2018-04-17)
