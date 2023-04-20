import { PasscardMessage } from './PasscardMessage'
import correctMessage from '../test/mocks/correctMessage.json'
// @ts-ignore - Vite imports the raw contents correctly
import stringifiedMessage from '../test/mocks/stringifiedMessage.txt?raw'
import { getBech32FromHex } from './utils/cardano'

// beforeAll(() => {
//   window.cardano.lace = {
//     enable: vi.fn(),
//     apiVersion: '0.0.1',
//     name: 'Lace',
//     icon: '',
//     isEnabled: vi.fn()
//   }
// })

describe('PasscardMessage', () => {
  describe('rawMessage as string', () => {
    it('creates instance from string', () => {
      const rawMessageString = JSON.stringify(correctMessage)
      const { message } = new PasscardMessage(rawMessageString)
      expect(message.domain).toEqual('example.com')
    })
    it('throws a validation error', () => {
      const invalidMessage = { ...correctMessage, networkId: 'Testnet' }
      try {
        new PasscardMessage(invalidMessage as any)
      } catch (error) {
        expect(error.issues[0].code).toEqual('invalid_enum_value')
      }
    })
  })
  describe('rawMessage as object', () => {
    it('creates instance from complete object', () => {
      const { message } = new PasscardMessage(correctMessage)
      expect(message.domain).toEqual('example.com')
    })
  })
  describe('.stringify', () => {
    it('stringifies the message', async () => {
      const pMessage = new PasscardMessage(correctMessage)
      expect(pMessage.stringify()).toEqual(stringifiedMessage)
    })
  })
  describe('.verify', () => {
    it('verifies the correct message', async () => {
      const pMessage = new PasscardMessage(correctMessage)
      const verificationResult = pMessage.verify({
        signature: {
          parsedMessage: pMessage.stringify(),
          address: '', // takes it from correctMessage
          payload: {
            signature:
              '845882a3012704583900970755c0ea0332c817a3816bf024316da050f6f19e0f9c36e6a2b5b77db7a124bf640f0917df14e401aa7872b53dbe997abd4581dd1784276761646472657373583900970755c0ea0332c817a3816bf024316da050f6f19e0f9c36e6a2b5b77db7a124bf640f0917df14e401aa7872b53dbe997abd4581dd178427a166686173686564f459019a6578616d706c652e636f6d2077616e747320796f7520746f207369676e2064617461207769746820796f75722043617264616e6f20616464726573733a0a616464725f7465737431717a7473773477716167706e396a71683577716b6875707978396b367135386b377830716c38706b7536337474646d616b37736a66306d797075793330686335757371363537726a6b35376d6178743668347a637268676873736e736366767164360a0a5468697320697320612073616d706c652073746174656d656e742e0a0a4d6574613a0a426c6f636b636861696e3a2043617264616e6f0a56657273696f6e3a20302e302e310a5552493a2068747470733a2f2f6578616d706c652e636f6d2f736f6d652d706167653f706172616d3d76616c75650a4e6574776f726b2049443a20300a4e6f6e63653a2061626364656667680a4973737565642041743a20323032332d30342d30345431303a33303a30305a0a45787069726174696f6e2054696d653a20323032332d30342d30345431323a33303a30305a0a45787465726e616c2049443a2061626364313233345840c6271730a450086277e3ae06532fd0771d351c608500c2013160530817f966021db01c052ac514bc80aafbaa3a8cbb744bf5d1e4423647db8ac5edc4fa2d110d',
            key: 'a5010102583900970755c0ea0332c817a3816bf024316da050f6f19e0f9c36e6a2b5b77db7a124bf640f0917df14e401aa7872b53dbe997abd4581dd17842703272006215820127959c7e536557758bc3f0179435b62ee361c203de553a909c04402bf6357d6'
          }
        }
      })
      expect(verificationResult).toBeTruthy()
      expect(pMessage.message.domain).toEqual('example.com')
    })
  })
  describe('.getAddress', () => {
    it('returns Bech32 address in case its Cardano', () => {
      const pMessage = new PasscardMessage(correctMessage)
      expect(pMessage.getAddress()).toEqual(getBech32FromHex(pMessage.message.address))
    })
  })
  describe.skip('.sign', () => {
    it('signs the given message', async () => {
      const pMessage = new PasscardMessage(correctMessage)
      await pMessage.sign({ walletName: 'lace' })
    })
  })
})
