import { createExoUi } from '@mvr-studio/exo-ui'

export const {
  Button,
  Modal,
  Heading,
  Text,
  Stack,
  Box,
  Switch,
  Label,
  AspectRatio,
  SimpleGrid,
  Flex,
  useDisclosure,
  Spinner,
  Card,
  Image,
  Skeleton
} = createExoUi()

export { ConnectWalletModal } from './components/ConnectWalletModal'
export { ConnectWalletButton } from './components/ConnectWalletButton'
export { WalletTile } from './components/WalletTile'
export { AddressTile } from './components/AddressTile'
export { AddressQrCode } from './components/AddressQrCode'

export type { OnChosenPayload } from './components/ConnectWalletModal'
