import { CardanoVerifier } from './CardanoVerifier'

const validSignature =
  '845882a3012704583900970755c0ea0332c817a3816bf024316da050f6f19e0f9c36e6a2b5b77db7a124bf640f0917df14e401aa7872b53dbe997abd4581dd1784276761646472657373583900970755c0ea0332c817a3816bf024316da050f6f19e0f9c36e6a2b5b77db7a124bf640f0917df14e401aa7872b53dbe997abd4581dd178427a166686173686564f44474657374584044b91f8c94c044b5a87d64f9784cd535b6ccb92211afbc21ed4fe3e047facaf952ee8a948abfd154c5dcb455497a3995d50f26f097af6464d5fe0649cdf17c05'
const validKey =
  'a5010102583900970755c0ea0332c817a3816bf024316da050f6f19e0f9c36e6a2b5b77db7a124bf640f0917df14e401aa7872b53dbe997abd4581dd17842703272006215820127959c7e536557758bc3f0179435b62ee361c203de553a909c04402bf6357d6'
const message = 'test'
const invalidMessage = 'test2'
const bech32Address =
  'addr_test1qztsw4wqagpn9jqh5wqkhupyx9k6q58k7x0ql8pku63ttdmak7sjf0mypuy30hc5usq657rjk57maxt6h4zcrhghssnscfvqd6'

describe('CardanoVerifier', () => {
  it('verifies successfully', () => {
    const result = CardanoVerifier.verify({ signature: validSignature, key: validKey, message, address: bech32Address })
    expect(result).toBeTruthy()
  })
  it('fails', () => {
    const result = CardanoVerifier.verify({
      signature: validSignature,
      key: validKey,
      message: invalidMessage,
      address: bech32Address
    })
    expect(result).toBeFalsy()
  })
})
