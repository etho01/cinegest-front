import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "./Modal";
import { Button } from "../btn/button";


export interface ErrorModalRef {
    open: (title: string, error: string | Error, onClose?: () => void) => void;
    close: () => void;
}

export const ErrorModal = React.forwardRef<ErrorModalRef>(({}, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [title, setTitle] = React.useState("Erreur");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [onCloseCallback, setOnCloseCallback] = React.useState<() => void>(() => () => {});

    const handleClose = () => {
        setIsOpen(false);
        onCloseCallback();
    };

    React.useImperativeHandle(ref, () => ({
        open: (titleParam: string, error: string | Error, onCloseParam?: () => void) => {
            setTitle(titleParam);
            
            // Gérer différents types d'erreurs
            if (error instanceof Error) {
                setErrorMessage(error.message || "Une erreur inattendue s'est produite");
            } else if (typeof error === 'string') {
                setErrorMessage(error);
            } else {
                setErrorMessage("Une erreur inattendue s'est produite");
            }
            
            setOnCloseCallback(() => onCloseParam || (() => {}));
            setIsOpen(true);
        },
        close: () => {
            handleClose();
        }
    }));

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            size="md"
        >
            <ModalHeader>
                <ModalTitle className="text-red-600 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {title}
                </ModalTitle>
            </ModalHeader>
            
            <ModalBody>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 whitespace-pre-wrap">{errorMessage}</p>
                </div>
            </ModalBody>
            
            <ModalFooter>
                <Button 
                    variant="outline" 
                    onClick={handleClose}
                    className="ml-auto"
                >
                    Fermer
                </Button>
            </ModalFooter>
        </Modal>
    );
});

ErrorModal.displayName = 'ErrorModal';