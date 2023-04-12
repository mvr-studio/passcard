import { useEffect, useState } from 'react'

type ColorMode = 'light' | 'dark'

const config = { attributes: true }

export const useColorScheme = () => {
  const [colorMode, setColorMode] = useState<ColorMode>('light')

  const colorModeFromNode = (node: any) => {
    const htmlClasses = node.classList
    const containsLight = htmlClasses.contains('light')
    return containsLight ? 'light' : 'dark'
  }

  const callback = (mutationList) => {
    return setColorMode(colorModeFromNode(mutationList[0].target))
  }

  useEffect(() => {
    const html = document.querySelector('html')
    setColorMode(colorModeFromNode(html))
    const domMutationObserver = new MutationObserver(callback)
    domMutationObserver.observe(html, config)
    return () => domMutationObserver.disconnect()
  }, [])

  return {
    colorMode
  }
}
