import { PasscardMessage } from '@passcard/auth'
import { InteractivePlayground } from './InteractivePlayground'
import { Box, Button } from '.'

export const ExamplePasscardMessage = () => {
  const initialCode = `
    () => {
      const [result, setResult] = React.useState('')
      const message: TMessage = {
        domain: 'example.com',
        blockchain: 'Cardano',
        address: '00970755c0ea0332c817a3816bf024316da050f6f19e0f9c36e6a2b5b77db7a124bf640f0917df14e401aa7872b53dbe997abd4581dd178427',
        statement: 'This is a sample statement.', // optional
        version: '0.0.1',
        uri: 'https://example.com/some-page?param=value',
        networkId: 0,
        nonce: 'abcdefgh',
        issuedAt: '2023-04-04T10:30:00Z', // optional
        expirationTime: '2023-04-04T12:30:00Z', // optional
        externalId: 'abcd1234' // optional
      }
      const handleStringify = () => {
        try {
          const pMessage = new PasscardMessage(message)
          setResult(pMessage.stringify())
        } catch (error) {
          logger.log(error)
        }
      }
      return (
        <Box>
          <Button onClick={handleStringify}>Stringify</Button>
          <Box css={{ whiteSpace: 'pre-wrap', fontSize: '$sm', marginTop: '$md' }}>
            {result}
          </Box>
        </Box>
      )
    }
  `
  const scope = { PasscardMessage, Box, Button }

  return <InteractivePlayground initialCode={initialCode} scope={scope} />
}
