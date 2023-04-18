import { Box, Stack, Text } from '@/components'
import { PostCard } from '@/components/PostCard'
import { PostForm } from '@/components/PostForm'
import { db } from '@/db'
import { useLiveQuery } from 'dexie-react-hooks'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'

const HomePage: NextPage = () => {
  const session = useSession()
  const posts = useLiveQuery(() => db.posts.toArray())

  return (
    <Box>
      {session.status === 'authenticated' ? <PostForm /> : <Text>Sign in to create a post.</Text>}
      <Stack css={{ marginTop: '1rem', gap: '0.5rem' }}>
        {posts?.map((post) => (
          <PostCard key={post.id} address={post.address} content={post.content} createdAt={post.createdAt} />
        ))}
      </Stack>
    </Box>
  )
}

export default HomePage
