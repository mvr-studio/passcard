import { createExoUi } from '@mvr-studio/exo-ui'

export const { Button, Modal, Heading, Text, Stack, Box, Switch, Label, AspectRatio, SimpleGrid, Flex, useDisclosure } =
  createExoUi()

export { ConnectWalletModal } from './components/ConnectWalletModal'
export { ConnectWalletButton } from './components/ConnectWalletButton'
export { WalletTile } from './components/WalletTile'

export type { OnChosenPayload } from './components/ConnectWalletModal'
