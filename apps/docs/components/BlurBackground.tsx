import { Box } from '.'
import { useColorScheme } from '../hooks/useColorScheme'

export const BlurBackground = ({ top, right, bottom, left }: Record<string, string>) => {
  const { colorMode } = useColorScheme()
  const isDark = colorMode === 'dark'
  return (
    <Box
      css={{
        position: 'absolute',
        zIndex: -1,
        right: right,
        top: top,
        bottom: bottom,
        left: left,
        width: '24rem',
        height: '24rem',
        backgroundColor: isDark ? '$primary700' : '$primary100',
        borderRadius: '50%',
        filter: 'blur(32rem)'
      }}
    />
  )
}
