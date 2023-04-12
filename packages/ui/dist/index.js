var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/index.ts
import { createExoUi } from "@mvr-studio/exo-ui";

// src/components/ConnectWalletModal/index.tsx
import { useEffect } from "react";
import { useCardanoWallets } from "@mvr-studio/use-dapp-connector";
import { jsx, jsxs } from "react/jsx-runtime";
var ConnectWalletModal = ({ isOpen, setIsOpen, onWalletChosen }) => {
  const { fetchWallets, wallets } = useCardanoWallets();
  useEffect(() => {
    setTimeout(() => fetchWallets(), 1e3);
  }, []);
  return /* @__PURE__ */ jsx(Modal.Root, { open: isOpen, onOpenChange: setIsOpen, children: /* @__PURE__ */ jsxs(Modal.Portal, { children: [
    /* @__PURE__ */ jsx(Modal.Overlay, {}),
    /* @__PURE__ */ jsx(Modal.Content, { children: /* @__PURE__ */ jsxs(Stack, { css: { gap: "1rem" }, children: [
      /* @__PURE__ */ jsx(Heading, { size: "lg", children: "Connect Wallet" }),
      wallets.length > 0 ? /* @__PURE__ */ jsx(SimpleGrid, { columns: { "@base": 5 }, css: { gap: "$sm" }, children: wallets.map((wallet) => /* @__PURE__ */ jsx(
        WalletTile,
        {
          name: wallet.name,
          walletName: wallet.walletName,
          icon: wallet.icon,
          onClick: onWalletChosen
        },
        wallet.walletName
      )) }) : /* @__PURE__ */ jsx(Box, { children: "No compatible wallets found." }),
      /* @__PURE__ */ jsx(Modal.Close, { asChild: true, css: { position: "absolute", top: "1rem", right: "1.5rem" }, children: /* @__PURE__ */ jsx(Button, { "aria-label": "Close", size: "sm", scheme: "ghost", css: { width: "2rem" }, children: "\u{1D5EB}" }) })
    ] }) })
  ] }) });
};

// src/components/ConnectWalletButton/index.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ConnectWalletButton = (props) => {
  const { isOpen, onOpen, setIsOpen } = useDisclosure();
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx2(ConnectWalletModal, { isOpen, setIsOpen, onWalletChosen: props.onWalletChosen }),
    /* @__PURE__ */ jsx2(Button, __spreadProps(__spreadValues({ onClick: onOpen }, props.buttonProps), { children: props.children || "Connect Wallet" }))
  ] });
};

// src/components/WalletTile/index.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var WalletTile = ({ icon, name, walletName, onClick }) => {
  return /* @__PURE__ */ jsx3(AspectRatio, { ratio: 1, children: /* @__PURE__ */ jsxs3(
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
      onClick: () => onClick(walletName),
      children: [
        /* @__PURE__ */ jsx3(Box, { as: "img", src: icon, css: { height: "2rem" } }),
        /* @__PURE__ */ jsx3(
          Text,
          {
            css: {
              textAlign: "center",
              textTransform: "capitalize",
              marginTop: "$xs",
              fontSize: "$sm",
              fontWeight: "$semibold"
            },
            children: name
          }
        )
      ]
    }
  ) });
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