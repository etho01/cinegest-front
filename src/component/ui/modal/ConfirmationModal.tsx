import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "./Modal";
import { Button } from "../btn/button";

interface ConfirmationModalProps {
}

export interface ConfirmationModalRef {
    open: (title: string, message: string, onConfirm: () => void, onClose?: () => void) => void;
}

export const ConfirmationModal = React.forwardRef(({  }: ConfirmationModalProps, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [onConfirm, setOnConfirm] = React.useState<() => void>(() => {});
    const [onClose, setOnClose] = React.useState<() => void>(() => { setIsOpen(false); });

    React.useImperativeHandle(ref, () => ({
        open: (titleParam: string, messageParam: string, onConfirmParam: () => void, onCloseParam?: () => void) => {
            setTitle(titleParam);
            setMessage(messageParam);
            setOnConfirm(() => onConfirmParam);
            setOnClose(() => onCloseParam || (() => { setIsOpen(false); }));
            setIsOpen(true);
        }
    }));

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <ModalHeader>
                <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <p>{message}</p>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => { onConfirm(); onClose(); }} variant="default">Confirm</Button>
            </ModalFooter>
        </Modal>
    );
});