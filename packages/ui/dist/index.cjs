var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
var import_react = __toESM(require("react"), 1);
var import_use_dapp_connector = require("@mvr-studio/use-dapp-connector");
var ConnectWalletModal = ({ isOpen, setIsOpen, onWalletChosen }) => {
  const { fetchWallets, wallets } = (0, import_use_dapp_connector.useCardanoWallets)();
  const handleWalletChosen = (walletName) => {
    onWalletChosen(walletName);
    setIsOpen(false);
  };
  (0, import_react.useEffect)(() => {
    setTimeout(() => fetchWallets(), 1e3);
  }, []);
  return /* @__PURE__ */ import_react.default.createElement(Modal.Root, { open: isOpen, onOpenChange: setIsOpen }, /* @__PURE__ */ import_react.default.createElement(Modal.Portal, null, /* @__PURE__ */ import_react.default.createElement(Modal.Overlay, null), /* @__PURE__ */ import_react.default.createElement(Modal.Content, null, /* @__PURE__ */ import_react.default.createElement(Stack, { css: { gap: "1rem" } }, /* @__PURE__ */ import_react.default.createElement(Heading, { size: "lg" }, "Connect Wallet"), wallets.length > 0 ? /* @__PURE__ */ import_react.default.createElement(SimpleGrid, { columns: { "@base": 5 }, css: { gap: "$sm" } }, wallets.map((wallet) => /* @__PURE__ */ import_react.default.createElement(
    WalletTile,
    {
      key: wallet.walletName,
      name: wallet.name,
      walletName: wallet.walletName,
      icon: wallet.icon,
      onClick: handleWalletChosen
    }
  ))) : /* @__PURE__ */ import_react.default.createElement(Box, null, "No compatible wallets found."), /* @__PURE__ */ import_react.default.createElement(Modal.Close, { asChild: true, css: { position: "absolute", top: "1rem", right: "1.5rem" } }, /* @__PURE__ */ import_react.default.createElement(Button, { "aria-label": "Close", size: "sm", scheme: "ghost", css: { width: "2rem" } }, "\u{1D5EB}"))))));
};

// src/components/ConnectWalletButton/index.tsx
var import_react2 = __toESM(require("react"), 1);
var ConnectWalletButton = (props) => {
  const { isOpen, onOpen, setIsOpen } = useDisclosure();
  return /* @__PURE__ */ import_react2.default.createElement(import_react2.default.Fragment, null, /* @__PURE__ */ import_react2.default.createElement(ConnectWalletModal, { isOpen, setIsOpen, onWalletChosen: props.onWalletChosen }), /* @__PURE__ */ import_react2.default.createElement(Button, { onClick: onOpen, ...props.buttonProps }, props.children || "Connect Wallet"));
};

// src/components/WalletTile/index.tsx
var import_react3 = __toESM(require("react"), 1);
var WalletTile = ({ icon, name, walletName, onClick }) => {
  return /* @__PURE__ */ import_react3.default.createElement(AspectRatio, { ratio: 1 }, /* @__PURE__ */ import_react3.default.createElement(
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
    /* @__PURE__ */ import_react3.default.createElement(Box, { as: "img", src: icon, css: { height: "2rem" } }),
    /* @__PURE__ */ import_react3.default.createElement(
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