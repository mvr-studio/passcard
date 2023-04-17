import { trimAddress } from './trimAddress'

const mockAddress =
  'addr_test1qqnxqn6ctswuh8pucv36fvg25yw63fh3sseqjtxzu5h6sq5fhtl8hrk3sxzxjh8xtdts2ds4gyt4qxlw6n4t27fka5dqmlmm2g'

describe('trimAddress', () => {
  it('trims given address', () => {
    const trimmed = trimAddress(mockAddress)
    expect(trimmed).toEqual('addr_test...mm2g')
  })
})
