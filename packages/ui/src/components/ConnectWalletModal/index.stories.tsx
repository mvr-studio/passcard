import { useState } from "react";
import ConnectWalletModal from ".";

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(true);
  return <ConnectWalletModal isOpen={isOpen} setIsOpen={setIsOpen} />;
};
