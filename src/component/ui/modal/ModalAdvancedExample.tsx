'use client';

import * as React from 'react';
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from './Modal';
import { Button } from '../btn/button';

// Hook personnalisé pour la gestion avancée des modals
const useAdvancedModal = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const modalRef = React.useRef<HTMLDivElement>(null);
    const triggerRef = React.useRef<HTMLButtonElement>(null);

    const openModal = React.useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeModal = React.useCallback(() => {
        setIsOpen(false);
        // Focus retourne automatiquement sur le déclencheur
        setTimeout(() => {
            triggerRef.current?.focus();
        }, 100);
    }, []);

    return {
        isOpen,
        openModal,
        closeModal,
        modalRef,
        triggerRef
    };
};

// Exemple avancé avec useRef intégré
export const ModalAdvancedExample = () => {
    // Hooks pour différentes modals
    const basicModal = useAdvancedModal();
    const formModal = useAdvancedModal();
    const confirmModal = useAdvancedModal();

    // Refs pour les éléments de focus spécifiques
    const firstInputRef = React.useRef<HTMLInputElement>(null);
    const cancelButtonRef = React.useRef<HTMLButtonElement>(null);
    const dangerButtonRef = React.useRef<HTMLButtonElement>(null);
    
    // État du formulaire
    const [formData, setFormData] = React.useState({ name: '', email: '' });

    // Gestionnaires de formulaire
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        formModal.closeModal();
        setFormData({ name: '', email: '' });
    };

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Bouton Modal Basique */}
                <Button 
                    ref={basicModal.triggerRef}
                    onClick={basicModal.openModal}
                    variant="outline"
                >
                    Modal Basique avec Ref
                </Button>

                {/* Bouton Modal Formulaire */}
                <Button 
                    ref={formModal.triggerRef}
                    onClick={formModal.openModal}
                >
                    Modal Formulaire
                </Button>

                {/* Bouton Modal Confirmation */}
                <Button 
                    ref={confirmModal.triggerRef}
                    onClick={confirmModal.openModal}
                    variant="destructive"
                >
                    Modal Destructive
                </Button>
            </div>

            {/* Modal Basique avec useRef */}
            <Modal
                ref={basicModal.modalRef}
                isOpen={basicModal.isOpen}
                onClose={basicModal.closeModal}
                size="lg"
            >
                <ModalHeader>
                    <ModalTitle>Modal avec useRef Avancé</ModalTitle>
                </ModalHeader>
                
                <ModalBody>
                    <div className="space-y-4">
                        <p className="text-gray-600">
                            Cette modal démontre l'intégration avancée de <code className="bg-gray-100 px-2 py-1 rounded">useRef</code> :
                        </p>
                        
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-blue-900 mb-2">🎯 Fonctionnalités intégrées :</h4>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>✅ Focus trapping avec navigation circulaire</li>
                                <li>✅ Gestion automatique du focus de retour</li>
                                <li>✅ Support forwardRef pour référence externe</li>
                                <li>✅ Portal rendering optimisé</li>
                                <li>✅ Accessibilité WCAG complète</li>
                                <li>✅ Prévention du scroll-jump</li>
                            </ul>
                        </div>

                        <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Bouton Test 1</Button>
                            <Button size="sm" variant="outline">Bouton Test 2</Button>
                            <Button size="sm" variant="outline">Bouton Test 3</Button>
                        </div>
                    </div>
                </ModalBody>
                
                <ModalFooter>
                    <Button variant="outline" onClick={basicModal.closeModal}>
                        Fermer
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal Formulaire avec focus initial */}
            <Modal
                isOpen={formModal.isOpen}
                onClose={formModal.closeModal}
                size="md"
                initialFocus={firstInputRef}
            >
                <ModalHeader>
                    <ModalTitle>Formulaire avec Focus Initial</ModalTitle>
                </ModalHeader>
                
                <form onSubmit={handleFormSubmit}>
                    <ModalBody>
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600 mb-4">
                                Le focus va automatiquement sur le premier input grâce à <code>initialFocus</code>
                            </p>
                            
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nom complet
                                </label>
                                <input
                                    ref={firstInputRef}
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleInputChange('name')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Votre nom complet"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange('email')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="votre@email.com"
                                    required
                                />
                            </div>
                        </div>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button type="button" variant="outline" onClick={formModal.closeModal}>
                            Annuler
                        </Button>
                        <Button type="submit">
                            Sauvegarder
                        </Button>
                    </ModalFooter>
                </form>
            </Modal>

            {/* Modal Confirmation avec focus sur Annuler */}
            <Modal
                isOpen={confirmModal.isOpen}
                onClose={confirmModal.closeModal}
                size="sm"
                initialFocus={cancelButtonRef}
            >
                <ModalHeader>
                    <ModalTitle>⚠️ Action Destructive</ModalTitle>
                </ModalHeader>
                
                <ModalBody>
                    <div className="space-y-3">
                        <p className="text-gray-600">
                            Cette action ne peut pas être annulée. Êtes-vous sûr de vouloir continuer ?
                        </p>
                        <div className="bg-red-50 p-3 rounded border border-red-200">
                            <p className="text-sm text-red-800">
                                💡 Le focus initial est sur "Annuler" pour la sécurité
                            </p>
                        </div>
                    </div>
                </ModalBody>
                
                <ModalFooter>
                    <Button 
                        ref={cancelButtonRef}
                        variant="outline" 
                        onClick={confirmModal.closeModal}
                    >
                        Annuler
                    </Button>
                    <Button 
                        ref={dangerButtonRef}
                        variant="destructive" 
                        onClick={() => {
                            alert('Action destructive exécutée !');
                            confirmModal.closeModal();
                        }}
                    >
                        Supprimer
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Informations de débogage */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">🔧 Informations techniques :</h3>
                <div className="text-sm text-gray-600 space-y-1">
                    <p>• <strong>Focus management</strong> : Hooks personnalisés avec refs</p>
                    <p>• <strong>Portal rendering</strong> : Rendu dans document.body</p>
                    <p>• <strong>Scroll prevention</strong> : Compensation de la scrollbar</p>
                    <p>• <strong>Keyboard navigation</strong> : Tab trapping circulaire</p>
                    <p>• <strong>ARIA compliance</strong> : IDs uniques et labels appropriés</p>
                </div>
            </div>
        </div>
    );
};