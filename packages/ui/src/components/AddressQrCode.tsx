import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { AspectRatio, Box, Card } from '..'

type AspectRatioProps = React.ComponentProps<typeof AspectRatio>

interface AddressQrCodeProps extends AspectRatioProps {
  address: string
  backgroundColor?: string
  foregroundColor?: string
}

export const AddressQrCode = ({ address, backgroundColor, foregroundColor, ...rest }: AddressQrCodeProps) => {
  return (
    <Box {...rest}>
      <AspectRatio ratio={1}>
        <Card css={{ width: '100%', height: '100%', padding: '$sm' }}>
          <Box
            as={QRCodeSVG}
            value={address}
            css={{ width: '100%', height: '100%' }}
            bgColor={backgroundColor || 'var(--background-e0)'}
            fgColor={foregroundColor || 'var(--default-text-color)'}
          />
        </Card>
      </AspectRatio>
    </Box>
  )
}
