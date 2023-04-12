"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AspectRatio: () => AspectRatio,
  Box: () => Box,
  Button: () => Button,
  ConnectWalletButton: () => ConnectWalletButton,
  ConnectWalletModal: () => ConnectWalletModal,
  Flex: () => Flex,
  Heading: () => Heading,
  Label: () => Label,
  Modal: () => Modal,
  SimpleGrid: () => SimpleGrid,
  Stack: () => Stack,
  Switch: () => Switch,
  Text: () => Text,
  WalletTile: () => WalletTile,
  useDisclosure: () => useDisclosure
});
module.exports = __toCommonJS(src_exports);
var import_exo_ui = require("@mvr-studio/exo-ui");

// src/components/ConnectWalletModal/index.tsx
var import_react = require("react");
var import_use_dapp_connector = require("@mvr-studio/use-dapp-connector");
var import_jsx_runtime = require("react/jsx-runtime");
var ConnectWalletModal = ({ isOpen, setIsOpen, onWalletChosen }) => {
  const { fetchWallets, wallets } = (0, import_use_dapp_connector.useCardanoWallets)();
  (0, import_react.useEffect)(() => {
    setTimeout(() => fetchWallets(), 1e3);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.Root, { open: isOpen, onOpenChange: setIsOpen, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal.Portal, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.Overlay, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.Content, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Stack, { css: { gap: "1rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, { size: "lg", children: "Connect Wallet" }),
      wallets.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpleGrid, { columns: { "@base": 5 }, css: { gap: "$sm" }, children: wallets.map((wallet) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        WalletTile,
        {
          name: wallet.name,
          walletName: wallet.walletName,
          icon: wallet.icon,
          onClick: onWalletChosen
        },
        wallet.walletName
      )) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Box, { children: "No compatible wallets found." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal.Close, { asChild: true, css: { position: "absolute", top: "1rem", right: "1.5rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { "aria-label": "Close", size: "sm", scheme: "ghost", css: { width: "2rem" }, children: "\u{1D5EB}" }) })
    ] }) })
  ] }) });
};

// src/components/ConnectWalletButton/index.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var ConnectWalletButton = (props) => {
  const { isOpen, onOpen, setIsOpen } = useDisclosure();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ConnectWalletModal, { isOpen, setIsOpen, onWalletChosen: props.onWalletChosen }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Button, __spreadProps(__spreadValues({ onClick: onOpen }, props.buttonProps), { children: props.children || "Connect Wallet" }))
  ] });
};

// src/components/WalletTile/index.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var WalletTile = ({ icon, name, walletName, onClick }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(AspectRatio, { ratio: 1, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Box, { as: "img", src: icon, css: { height: "2rem" } }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var { Button, Modal, Heading, Text, Stack, Box, Switch, Label, AspectRatio, SimpleGrid, Flex, useDisclosure } = (0, import_exo_ui.createExoUi)();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.cjs.map