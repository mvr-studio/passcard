import { useEffect, useMemo, useState } from 'react'
import { useCardanoWallets } from '@mvr-studio/use-dapp-connector'

interface UseWalletsProps {
  setAreWalletsLoading?: (value: boolean) => void
  allowedBlockchains: string[]
}

export const useWallets = ({ setAreWalletsLoading, allowedBlockchains }: UseWalletsProps) => {
  const { fetchWallets: fetchCardanoWallets, wallets: caradanoWalletsRaw } = useCardanoWallets()

  const [minaAvailable, setMinaAvailable] = useState(false)
  const [ethereumAvailable, setEthereumAvailable] = useState(false)
  const [solanaAvailable, setSolanaAvailable] = useState(false)

  const allowsCardano = useMemo(() => allowedBlockchains.includes('cardano'), [allowedBlockchains])
  const allowsMina = useMemo(() => allowedBlockchains.includes('mina'), [allowedBlockchains])
  const allowsEthereum = useMemo(() => allowedBlockchains.includes('ethereum'), [allowedBlockchains])
  const allowsSolana = useMemo(() => allowedBlockchains.includes('solana'), [allowedBlockchains])

  const cardanoWallets = useMemo(
    () => caradanoWalletsRaw.map((wallet) => ({ ...wallet, blockchain: 'cardano' })),
    [caradanoWalletsRaw]
  )

  const minaWallet = {
    name: 'Mina',
    walletName: 'mina',
    blockchain: 'mina',
    icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cg fill='%232d2d2d' stroke='%23fff' stroke-miterlimit='5.333' stroke-width='1.333'%3E%3Cpath d='M4 .7h24c1.8 0 3.3 1.5 3.3 3.3v24c0 1.8-1.5 3.3-3.3 3.3H4C2.2 31.3.7 29.8.7 28V4C.7 2.2 2.2.7 4 .7z'/%3E%3Cpath d='M16 24c.3 0 .5-.1.7-.2.2-.2.3-.4.3-.7l.2-1.2c-.8.2-1.6.2-2.4 0l.2 1.2c0 .3.1.5.3.7.2.1.4.2.7.2zm6.9-.2h1.9V12.9c0-1.5-.7-2.5-1.9-2.9zm-15.7 0h1.9V10c-1.2.4-1.9 1.4-1.9 2.9zm10-1.9c1.2-.3 2.1-1.2 2.3-2.8l1.2-9.2c-1.4.3-2.1 1.4-2.4 3.1zm-2.4 0L13.7 13c-.2-1.7-1-2.8-2.3-3.1l1.2 9.2c.2 1.6 1 2.5 2.2 2.8zM22.9 10v-.8c0-.8-.4-1.2-1-1.2s-1 .4-1.1 1.1l-.1.8c.7-.1 1.5-.1 2.2.1zM9.1 10c.4-.1.9-.2 1.3-.2.3 0 .6 0 1 .1l-.1-.8c-.2-.8-.6-1.1-1.2-1.1s-1 .4-1 1.2z'/%3E%3C/g%3E%3C/svg%3E`
  }

  const ethereumWallet = {
    name: 'Ethereum',
    walletName: 'ethereum',
    blockchain: 'ethereum',
    icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:xodm='http://www.corel.com/coreldraw/odm/2003' xml:space='preserve' width='100%25' height='100%25' version='1.1' shape-rendering='geometricPrecision' text-rendering='geometricPrecision' image-rendering='optimizeQuality' fill-rule='evenodd' clip-rule='evenodd' viewBox='0 0 784.37 1277.39'%3E%3Cscript xmlns=''/%3E%3Cscript xmlns=''/%3E%3Cg id='Layer_x0020_1'%3E%3Cmetadata id='CorelCorpID_0Corel-Layer'/%3E%3Cg id='_1421394342400'%3E%3Cg%3E%3Cpolygon fill='%23343434' fill-rule='nonzero' points='392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 '/%3E%3Cpolygon fill='%238C8C8C' fill-rule='nonzero' points='392.07,0 -0,650.54 392.07,882.29 392.07,472.33 '/%3E%3Cpolygon fill='%233C3C3B' fill-rule='nonzero' points='392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 '/%3E%3Cpolygon fill='%238C8C8C' fill-rule='nonzero' points='392.07,1277.38 392.07,956.52 -0,724.89 '/%3E%3Cpolygon fill='%23141414' fill-rule='nonzero' points='392.07,882.29 784.13,650.54 392.07,472.33 '/%3E%3Cpolygon fill='%23393939' fill-rule='nonzero' points='0,650.54 392.07,882.29 392.07,472.33 '/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E`
  }

  const solanaWallet = {
    name: 'Solana',
    walletName: 'solana',
    blockchain: 'solana',
    icon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' viewBox='0 0 397.7 311.7' style='enable-background:new 0 0 397.7 311.7;' xml:space='preserve'%3E%3Cscript xmlns=''/%3E%3Cscript xmlns=''/%3E%3Cstyle type='text/css'%3E .st0%7Bfill:url(%23SVGID_1_);%7D .st1%7Bfill:url(%23SVGID_2_);%7D .st2%7Bfill:url(%23SVGID_3_);%7D%0A%3C/style%3E%3ClinearGradient id='SVGID_1_' gradientUnits='userSpaceOnUse' x1='360.8791' y1='351.4553' x2='141.213' y2='-69.2936' gradientTransform='matrix(1 0 0 -1 0 314)'%3E%3Cstop offset='0' style='stop-color:%2300FFA3'/%3E%3Cstop offset='1' style='stop-color:%23DC1FFF'/%3E%3C/linearGradient%3E%3Cpath class='st0' d='M64.6,237.9c2.4-2.4,5.7-3.8,9.2-3.8h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5 c-5.8,0-8.7-7-4.6-11.1L64.6,237.9z'/%3E%3ClinearGradient id='SVGID_2_' gradientUnits='userSpaceOnUse' x1='264.8291' y1='401.6014' x2='45.163' y2='-19.1475' gradientTransform='matrix(1 0 0 -1 0 314)'%3E%3Cstop offset='0' style='stop-color:%2300FFA3'/%3E%3Cstop offset='1' style='stop-color:%23DC1FFF'/%3E%3C/linearGradient%3E%3Cpath class='st1' d='M64.6,3.8C67.1,1.4,70.4,0,73.8,0h317.4c5.8,0,8.7,7,4.6,11.1l-62.7,62.7c-2.4,2.4-5.7,3.8-9.2,3.8H6.5 c-5.8,0-8.7-7-4.6-11.1L64.6,3.8z'/%3E%3ClinearGradient id='SVGID_3_' gradientUnits='userSpaceOnUse' x1='312.5484' y1='376.688' x2='92.8822' y2='-44.061' gradientTransform='matrix(1 0 0 -1 0 314)'%3E%3Cstop offset='0' style='stop-color:%2300FFA3'/%3E%3Cstop offset='1' style='stop-color:%23DC1FFF'/%3E%3C/linearGradient%3E%3Cpath class='st2' d='M333.1,120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8,0-8.7,7-4.6,11.1l62.7,62.7c2.4,2.4,5.7,3.8,9.2,3.8h317.4 c5.8,0,8.7-7,4.6-11.1L333.1,120.1z'/%3E%3C/svg%3E`
  }

  const wallets = useMemo(
    () =>
      [
        ...(allowsCardano ? cardanoWallets : []),
        ...(allowsMina && minaAvailable ? [minaWallet] : []),
        ...(allowsEthereum && ethereumAvailable ? [ethereumWallet] : []),
        ...(allowsSolana && solanaAvailable ? [solanaWallet] : [])
      ] || [],
    [cardanoWallets, minaAvailable, ethereumAvailable]
  )

  useEffect(() => {
    setAreWalletsLoading && setAreWalletsLoading(true)
    setTimeout(() => {
      if (typeof (window as any).mina !== 'undefined') setMinaAvailable(true)
      if (typeof (window as any).ethereum !== 'undefined') setEthereumAvailable(true)
      if (typeof (window as any).solana !== 'undefined') setSolanaAvailable(true)
      fetchCardanoWallets()
      setAreWalletsLoading && setAreWalletsLoading(false)
    }, 1000)
  }, [])

  return { wallets }
}
