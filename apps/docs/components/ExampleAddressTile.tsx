import { AddressTile } from '@passcard/ui'
import { InteractivePlayground } from './InteractivePlayground'

export const ExampleAddressTile = () => {
  const initialCode = `
    () => (
      <AddressTile address="addr_test1qztsw4wqagpn9jqh5wqkhupyx9k6q58k7x0ql8pku63ttdmak7sjf0mypuy30hc5usq657rjk57maxt6h4zcrhghssnscfvqd6" />
    )
  `
  const scope = { AddressTile }

  return <InteractivePlayground initialCode={initialCode} scope={scope} />
}
