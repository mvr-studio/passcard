import { NJSON } from 'next-json'
import { Signature } from '../types'

export const stringifySignature = (payload: Signature) => {
  return NJSON.stringify(payload)
}

export const parseSignature = (payload: string): Signature => {
  return NJSON.parse(payload)
}
