'use client';

import * as React from 'react';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from './Modal';
import { Button } from '../btn/button';

// Exemple d'utilisation de la Modal avec useRef
export const ModalExample = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);
    
    // Refs pour la gestion du focus
    const confirmButtonRef = React.useRef<HTMLButtonElement>(null);
    const cancelButtonRef = React.useRef<HTMLButtonElement>(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const openConfirmModal = () => {
        setIsConfirmOpen(true);
        setIsOpen(false);
    };
    
    const closeConfirmModal = () => {
        setIsConfirmOpen(false);
        setIsOpen(true); // Retour à la modal principale
    };

    const handleConfirm = () => {
        setIsConfirmOpen(false);
        setIsOpen(false);
        alert('Action confirmée !');
    };

    return (
        <div className="p-8">
            <Button onClick={openModal}>
                Ouvrir la Modal avec useRef
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                size="lg"
                closeOnOverlayClick={true}
                closeOnEscape={true}
                showCloseButton={true}
                usePortal={true}
            >
                <ModalHeader>
                    <ModalTitle id="modal-title">Modal avec useRef et Focus Management</ModalTitle>
                </ModalHeader>
                
                <ModalBody>
                    <div className="space-y-4">
                        <p className="text-gray-600">
                            Cette modal utilise maintenant <code className="bg-gray-100 px-2 py-1 rounded">useRef</code> pour :
                        </p>
                        <ul className="list-disc list-inside text-gray-600 space-y-2">
                            <li><strong>Focus trapping</strong> : Utilisez Tab/Shift+Tab pour naviguer</li>
                            <li><strong>Auto-focus</strong> : Le premier élément focusable est automatiquement sélectionné</li>
                            <li><strong>Portal rendering</strong> : Rendu dans document.body</li>
                            <li><strong>Accessibilité</strong> : ARIA attributes et gestion clavier</li>
                        </ul>
                        
                        <div className="border-t pt-4">
                            <p className="text-sm text-gray-500 mb-3">
                                Testez la navigation au clavier et le focus trapping :
                            </p>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                    Premier bouton
                                </Button>
                                <Button variant="outline" size="sm">
                                    Deuxième bouton
                                </Button>
                                <Button variant="outline" size="sm" onClick={openConfirmModal}>
                                    Ouvrir confirmation
                                </Button>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                
                <ModalFooter>
                    <Button variant="outline" onClick={closeModal}>
                        Annuler
                    </Button>
                    <Button onClick={openConfirmModal}>
                        Continuer
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal de confirmation avec focus initial personnalisé */}
            <Modal
                isOpen={isConfirmOpen}
                onClose={closeConfirmModal}
                size="sm"
                initialFocus={cancelButtonRef}
            >
                <ModalHeader>
                    <ModalTitle>Confirmation</ModalTitle>
                </ModalHeader>
                
                <ModalBody>
                    <p className="text-gray-600">
                        Cette modal s'ouvre avec le focus sur le bouton "Annuler" 
                        grâce à la prop <code className="bg-gray-100 px-2 py-1 rounded">initialFocus</code>.
                    </p>
                </ModalBody>
                
                <ModalFooter>
                    <Button 
                        ref={cancelButtonRef}
                        variant="outline" 
                        onClick={closeConfirmModal}
                    >
                        Annuler
                    </Button>
                    <Button 
                        ref={confirmButtonRef}
                        variant="destructive" 
                        onClick={handleConfirm}
                    >
                        Confirmer
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

// Exemple de modal de confirmation
