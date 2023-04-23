import { AddressQrCode } from '@passcard/ui'
import { InteractivePlayground } from './InteractivePlayground'

export const ExampleAddressQrCode = () => {
  const initialCode = `
    () => (
      <AddressQrCode address="addr_test1qztsw4wqagpn9jqh5wqkhupyx9k6q58k7x0ql8pku63ttdmak7sjf0mypuy30hc5usq657rjk57maxt6h4zcrhghssnscfvqd6" css={{ maxWidth: '10rem', maxHeight: '10rem' }} />
    )
  `
  const scope = { AddressQrCode }

  return <InteractivePlayground initialCode={initialCode} scope={scope} />
}
