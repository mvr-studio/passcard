import { Buffer } from 'buffer'

export const toHexMessage = (message: string) => Buffer.from(message).toString('hex')
