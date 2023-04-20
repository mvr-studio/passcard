import { getBech32FromHex, getHexFromBech32 } from './cardano'

const mockHexAddress =
  '00970755c0ea0332c817a3816bf024316da050f6f19e0f9c36e6a2b5b77db7a124bf640f0917df14e401aa7872b53dbe997abd4581dd178427'
const mockBech32Address =
  'addr_test1qztsw4wqagpn9jqh5wqkhupyx9k6q58k7x0ql8pku63ttdmak7sjf0mypuy30hc5usq657rjk57maxt6h4zcrhghssnscfvqd6'

describe('getBech32FromHex', () => {
  it('returns Bech32 Cardano address', () => {
    const bech32Address = getBech32FromHex(mockHexAddress)
    expect(bech32Address).toEqual(mockBech32Address)
  })
})
describe('getHexFromBech32', () => {
  it('returns hex Cardano address', () => {
    const hexAddress = getHexFromBech32(mockBech32Address)
    expect(hexAddress).toEqual(mockHexAddress)
  })
})
