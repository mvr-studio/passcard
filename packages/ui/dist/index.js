// src/index.ts
import { createExoUi } from "@mvr-studio/exo-ui";

// src/components/ConnectWalletModal/index.tsx
import React, { useEffect } from "react";
import { useCardanoWallets } from "@mvr-studio/use-dapp-connector";
var ConnectWalletModal = ({ isOpen, setIsOpen, onWalletChosen }) => {
  const { fetchWallets, wallets } = useCardanoWallets();
  const handleWalletChosen = (walletName) => {
    onWalletChosen(walletName);
    setIsOpen(false);
  };
  useEffect(() => {
    setTimeout(() => fetchWallets(), 1e3);
  }, []);
  return /* @__PURE__ */ React.createElement(Modal.Root, { open: isOpen, onOpenChange: setIsOpen }, /* @__PURE__ */ React.createElement(Modal.Portal, null, /* @__PURE__ */ React.createElement(Modal.Overlay, null), /* @__PURE__ */ React.createElement(Modal.Content, null, /* @__PURE__ */ React.createElement(Stack, { css: { gap: "1rem" } }, /* @__PURE__ */ React.createElement(Heading, { size: "lg" }, "Connect Wallet"), wallets.length > 0 ? /* @__PURE__ */ React.createElement(SimpleGrid, { columns: { "@base": 5 }, css: { gap: "$sm" } }, wallets.map((wallet) => /* @__PURE__ */ React.createElement(
    WalletTile,
    {
      key: wallet.walletName,
      name: wallet.name,
      walletName: wallet.walletName,
      icon: wallet.icon,
      onClick: handleWalletChosen
    }
  ))) : /* @__PURE__ */ React.createElement(Box, null, "No compatible wallets found."), /* @__PURE__ */ React.createElement(Modal.Close, { asChild: true, css: { position: "absolute", top: "1rem", right: "1.5rem" } }, /* @__PURE__ */ React.createElement(Button, { "aria-label": "Close", size: "sm", scheme: "ghost", css: { width: "2rem" } }, "\u{1D5EB}"))))));
};

// src/components/ConnectWalletButton/index.tsx
import React2 from "react";
var ConnectWalletButton = (props) => {
  const { isOpen, onOpen, setIsOpen } = useDisclosure();
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(ConnectWalletModal, { isOpen, setIsOpen, onWalletChosen: props.onWalletChosen }), /* @__PURE__ */ React2.createElement(Button, { onClick: onOpen, ...props.buttonProps }, props.children || "Connect Wallet"));
};

// src/components/WalletTile/index.tsx
import React3 from "react";
var WalletTile = ({ icon, name, walletName, onClick }) => {
  return /* @__PURE__ */ React3.createElement(AspectRatio, { ratio: 1 }, /* @__PURE__ */ React3.createElement(
    Flex,
    {
      css: {
        border: "1px solid",
        borderColor: "$gray200",
        cursor: "pointer",
        height: "100%",
        borderRadius: "$md",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      },
      onClick: () => onClick(walletName)
    },
    /* @__PURE__ */ React3.createElement(Box, { as: "img", src: icon, css: { height: "2rem" } }),
    /* @__PURE__ */ React3.createElement(
      Text,
      {
        css: {
          textAlign: "center",
          textTransform: "capitalize",
          marginTop: "$xs",
          fontSize: "$sm",
          fontWeight: "$semibold"
        }
      },
      name
    )
  ));
};

// src/index.ts
var { Button, Modal, Heading, Text, Stack, Box, Switch, Label, AspectRatio, SimpleGrid, Flex, useDisclosure } = createExoUi();
export {
  AspectRatio,
  Box,
  Button,
  ConnectWalletButton,
  ConnectWalletModal,
  Flex,
  Heading,
  Label,
  Modal,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  WalletTile,
  useDisclosure
};
//# sourceMappingURL=index.js.map