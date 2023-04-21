import React from 'react'
import type { Story, StoryDefault } from '@ladle/react'
import { AddressTile } from './AddressTile'

export const Basic: Story = () => {
  return (
    <AddressTile address="addr_test1qztsw4wqagpn9jqh5wqkhupyx9k6q58k7x0ql8pku63ttdmak7sjf0mypuy30hc5usq657rjk57maxt6h4zcrhghssnscfvqd6" />
  )
}

export default {
  title: 'Components / Address Tile'
} satisfies StoryDefault
