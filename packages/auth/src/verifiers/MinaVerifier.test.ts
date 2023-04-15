import { MinaVerifier } from './MinaVerifier'

const message = 'test'
const invalidMessage = 'test2'
const signature = {
  field: '252403253139183825896720998734292107278559191239040288620606364618586441522',
  scalar: '26131070198915636113524933871911613220178335459955941530471705280374181192081'
}
const publicKey = 'B62qnd4pWcbnGtyxVGo2FrY1VssKQGfLCqqApA9ZwCTNsKU9eTtACvt'

describe('MinaVerifier', () => {
  it('verifies successfully', () => {
    const result = MinaVerifier.verify({ data: message, signature: signature, publicKey })
    expect(result).toBeTruthy()
  })
  it('fails', () => {
    const result = MinaVerifier.verify({ data: invalidMessage, signature: signature, publicKey })
    expect(result).toBeFalsy()
  })
})
