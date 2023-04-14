import { PasscardMessage, TMessage } from '@passcard/auth'
import { InteractivePlayground } from './InteractivePlayground'
import { Box, Button } from '.'

export const ExamplePasscardMessage = () => {
  const initialCode = `
    () => {
      const [result, setResult] = React.useState('')
      const message: TMessage = {
        domain: 'example.com',
        address: 'addr1qxtsw4wqagpn9jqh5wqkhupyx9k6q58k7x0ql8pku63ttdmak7sjf0mypuy30hc5usq657rjk57maxt6h4zcrhghssnsml3qp9',
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
          <Box css={{ whiteSpace: 'pre-wrap' }}>
            {result}
          </Box>
        </Box>
      )
    }
  `
  const scope = { PasscardMessage, TMessage, Box, Button }

  return <InteractivePlayground initialCode={initialCode} scope={scope} />
}
