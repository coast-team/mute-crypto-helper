import { env } from './misc/env'

env.crypto = (window as any).crypto

export * from './index.common'
