import { Stack, Textarea, Button } from '.'
import { db } from '@/db'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'

export const PostForm = () => {
  const [content, setContent] = useState('')
  const session = useSession()
  const address = session.data?.user.address!

  const createPost = (event: FormEvent) => {
    event.preventDefault()
    return db.posts.add({
      address,
      content,
      createdAt: dayjs().toDate()
    })
  }

  return (
    <Stack as="form" id="postForm" onSubmit={createPost}>
      <Textarea value={content} onChange={(event) => setContent(event.target.value)} required />
      <Button type="submit">Send</Button>
    </Stack>
  )
}
