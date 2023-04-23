import React from 'react'
import type { Story, StoryDefault } from '@ladle/react'
import { AddressQrCode } from './AddressQrCode'

export const Basic: Story = () => {
  return (
    <AddressQrCode
      address="addr_test1qztsw4wqagpn9jqh5wqkhupyx9k6q58k7x0ql8pku63ttdmak7sjf0mypuy30hc5usq657rjk57maxt6h4zcrhghssnscfvqd6"
      css={{ maxWidth: '10rem', maxHeight: '10rem' }}
    />
  )
}

export default {
  title: 'Components / Address QR Code'
} satisfies StoryDefault
