import React, { useEffect } from "react";
import { useCardanoWallets } from "@mvr-studio/use-dapp-connector";
import { Modal, Button, Heading, Stack } from "../../";

interface ConnectWalletModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ConnectWalletModal = ({ isOpen, setIsOpen }: ConnectWalletModalProps) => {
  const { wallets } = useCardanoWallets();

  useEffect(() => {
    console.log(wallets, window?.cardano);
  }, [window?.cardano]);

  return (
    <Modal.Root open={isOpen} onOpenChange={setIsOpen}>
      <Modal.Portal>
        <Modal.Overlay />
        <Modal.Content>
          <Stack css={{ gap: "1rem" }}>
            <Heading size="lg">Connect Wallet</Heading>
            <Stack>Test</Stack>
            <Modal.Close
              asChild
              css={{ position: "absolute", top: "1rem", right: "1.5rem" }}
            >
              <Button
                aria-label="Close"
                size="sm"
                scheme="ghost"
                css={{ width: "2rem" }}
              >
                X
              </Button>
            </Modal.Close>
          </Stack>
        </Modal.Content>
      </Modal.Portal>
    </Modal.Root>
  );
};

export default ConnectWalletModal;
