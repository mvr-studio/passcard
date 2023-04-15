import { toHexMessage } from './toHexMessage'

describe('toHexMessage', () => {
  it('converts to hex', () => {
    const hexMessage = toHexMessage('test')
    expect(hexMessage).toEqual('74657374')
  })
})
