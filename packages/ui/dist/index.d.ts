import * as _radix_ui_react_aspect_ratio from '@radix-ui/react-aspect-ratio';
import * as react from 'react';
import react__default from 'react';
import * as _radix_ui_react_dialog from '@radix-ui/react-dialog';
import * as _stitches_react_types_styled_component from '@stitches/react/types/styled-component';
import * as _stitches_react_types_css_util from '@stitches/react/types/css-util';

interface ConnectWalletModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onWalletChosen: (walletName: string) => void;
}
declare const ConnectWalletModal: ({ isOpen, setIsOpen, onWalletChosen }: ConnectWalletModalProps) => JSX.Element;

interface ConnectWalletButtonProps {
    buttonProps?: react__default.ComponentProps<typeof Button>;
    children?: react__default.ReactNode;
    onWalletChosen: (walletName: string) => void;
}
declare const ConnectWalletButton: (props: ConnectWalletButtonProps) => JSX.Element;

type WalletName = string;
interface WalletTileProps {
    icon: string;
    name: string;
    walletName: WalletName;
    onClick: (walletName: WalletName) => void;
}
declare const WalletTile: ({ icon, name, walletName, onClick }: WalletTileProps) => JSX.Element;

declare const Button: _stitches_react_types_styled_component.StyledComponent<"button", {
    size?: "lg" | "sm" | undefined;
    scheme?: "primary" | "ghost" | undefined;
}, {}, _stitches_react_types_css_util.CSS<{}, {}, {}, {}>>;
declare const Modal: {
    Root: react.FC<_radix_ui_react_dialog.DialogProps>;
    Portal: react.FC<_radix_ui_react_dialog.DialogPortalProps>;
    Trigger: react.ForwardRefExoticComponent<_radix_ui_react_dialog.DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
    Overlay: _stitches_react_types_styled_component.StyledComponent<react.ForwardRefExoticComponent<_radix_ui_react_dialog.DialogOverlayProps & react.RefAttributes<HTMLDivElement>>, {}, {}, _stitches_react_types_css_util.CSS<{}, {}, {}, {}>>;
    Content: _stitches_react_types_styled_component.StyledComponent<react.ForwardRefExoticComponent<_radix_ui_react_dialog.DialogContentProps & react.RefAttributes<HTMLDivElement>>, {}, {}, _stitches_react_types_css_util.CSS<{}, {}, {}, {}>>;
    Close: _stitches_react_types_styled_component.StyledComponent<react.ForwardRefExoticComponent<_radix_ui_react_dialog.DialogCloseProps & react.RefAttributes<HTMLButtonElement>>, {}, {}, _stitches_react_types_css_util.CSS<{}, {}, {}, {}>>;
};
declare const Heading: _stitches_react_types_styled_component.StyledComponent<"h1", {
    size?: "xl" | "lg" | undefined;
}, {}, _stitches_react_types_css_util.CSS<{}, {}, {}, {}>>;
declare const Text: _stitches_react_types_styled_component.StyledComponent<"p", {}, {}, _stitches_react_types_css_util.CSS<{}, {}, {}, {}>>;
declare const Stack: any;
declare const Box: _stitches_react_types_styled_component.StyledComponent<react.ComponentType<any>, {}, {}, _stitches_react_types_css_util.CSS<{}, {}, {}, {}>>;
declare const Switch: any;
declare const Label: _stitches_react_types_styled_component.StyledComponent<"label", {}, {}, _stitches_react_types_css_util.CSS<{}, {}, {}, {}>>;
declare const AspectRatio: _stitches_react_types_styled_component.StyledComponent<react.ForwardRefExoticComponent<_radix_ui_react_aspect_ratio.AspectRatioProps & react.RefAttributes<HTMLDivElement>>, {}, {}, _stitches_react_types_css_util.CSS<{}, {}, {}, {}>>;
declare const SimpleGrid: any;
declare const Flex: _stitches_react_types_styled_component.StyledComponent<"div", {}, {}, _stitches_react_types_css_util.CSS<{}, {}, {}, {}>>;
declare const useDisclosure: any;

export { AspectRatio, Box, Button, ConnectWalletButton, ConnectWalletModal, Flex, Heading, Label, Modal, SimpleGrid, Stack, Switch, Text, WalletTile, useDisclosure };
