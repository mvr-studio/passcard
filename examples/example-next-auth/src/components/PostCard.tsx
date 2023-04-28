import dayjs from 'dayjs'
import { Box, Stack, Text, Content } from '.'
import { trimAddress } from '@passcard/auth'
import ReactMarkdown from 'react-markdown'

interface PostCardProps {
  address: string
  content: string
  createdAt: Date
}

export const PostCard = ({ address, content, createdAt }: PostCardProps) => {
  return (
    <Box css={{ border: '1px solid', borderColor: '$gray200', borderRadius: '$md', padding: '$sm' }}>
      <Stack>
        <Text>{trimAddress(address)}</Text>
        <Content>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Content>
        <Text css={{ fontSize: '$sm' }}>{dayjs(createdAt).format('DD MMM YYYY')}</Text>
      </Stack>
    </Box>
  )
}
