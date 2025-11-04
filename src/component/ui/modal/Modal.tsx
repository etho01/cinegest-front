'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { Button } from '../btn/button';
import { PropsWithChildren, HTMLAttributes } from 'react';

// Modal variants pour différentes tailles
const modalVariants = cva(
    'relative bg-white rounded-lg shadow-xl transform transition-all outline-none',
    {
        variants: {
            size: {
                sm: 'max-w-sm w-full mx-4',
                md: 'max-w-md w-full mx-4',
                lg: 'max-w-lg w-full mx-4',
                xl: 'max-w-xl w-full mx-4',
                '2xl': 'max-w-2xl w-full mx-4',
                '3xl': 'max-w-3xl w-full mx-4',
                '4xl': 'max-w-4xl w-full mx-4',
                full: 'max-w-full w-full h-full',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    }
);

// Contexte pour partager les données entre les composants de la modal
interface ModalContextType {
    titleId: string;
    modalId: string;
    closeModal: () => void;
}

const ModalContext = React.createContext<ModalContextType | null>(null);

const ModalProvider = ({ children, value }: { children: React.ReactNode; value: ModalContextType }) => (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
);

const useModalContext = () => {
    const context = React.useContext(ModalContext);
    if (!context) {
        throw new Error('Les composants Modal doivent être utilisés à l\'intérieur d\'un Modal');
    }
    return context;
};
// Interface pour les props du Modal avec support de ref
export interface ModalProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id'>,
    VariantProps<typeof modalVariants> {
    isOpen: boolean;
    onClose: () => void;
    closeOnOverlayClick?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
    initialFocus?: React.RefObject<HTMLElement | null>;
    usePortal?: boolean;
}

// Hook personnalisé pour la gestion avancée du focus
const useModalFocus = (
    isOpen: boolean,
    modalRef: React.RefObject<HTMLDivElement | null>,
    initialFocus?: React.RefObject<HTMLElement | null>
) => {
    const lastFocusedElement = React.useRef<HTMLElement | null>(null);
    const firstFocusableElement = React.useRef<HTMLElement | null>(null);
    const lastFocusableElement = React.useRef<HTMLElement | null>(null);

    // Sauvegarder le focus actuel et configurer les éléments focusables
    React.useEffect(() => {
        if (!isOpen || !modalRef.current) return;

        // Sauvegarder l'élément actuellement focusé
        lastFocusedElement.current = document.activeElement as HTMLElement;

        const modal = modalRef.current;
        
        // Trouver tous les éléments focusables
        const focusableSelector = [
            'button:not([disabled])',
            '[href]',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"]):not([disabled])',
            '[contenteditable="true"]'
        ].join(', ');

        const focusableElements = modal.querySelectorAll(focusableSelector) as NodeListOf<HTMLElement>;
        
        if (focusableElements.length > 0) {
            firstFocusableElement.current = focusableElements[0];
            lastFocusableElement.current = focusableElements[focusableElements.length - 1];

            // Focus initial personnalisé ou premier élément
            const elementToFocus = initialFocus?.current || firstFocusableElement.current;
            if (elementToFocus) {
                // Petit délai pour s'assurer que la modal est rendue
                setTimeout(() => elementToFocus.focus(), 10);
            }
        }

        // Gestionnaire de navigation au clavier
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                
                const isShiftPressed = e.shiftKey;
                const activeElement = document.activeElement as HTMLElement;

                if (isShiftPressed) {
                    // Shift + Tab - navigation vers l'arrière
                    if (activeElement === firstFocusableElement.current) {
                        lastFocusableElement.current?.focus();
                    } else {
                        // Trouver l'élément précédent
                        const focusableArray = Array.from(focusableElements);
                        const currentIndex = focusableArray.indexOf(activeElement);
                        if (currentIndex > 0) {
                            focusableArray[currentIndex - 1].focus();
                        } else {
                            lastFocusableElement.current?.focus();
                        }
                    }
                } else {
                    // Tab normal - navigation vers l'avant
                    if (activeElement === lastFocusableElement.current) {
                        firstFocusableElement.current?.focus();
                    } else {
                        // Trouver l'élément suivant
                        const focusableArray = Array.from(focusableElements);
                        const currentIndex = focusableArray.indexOf(activeElement);
                        if (currentIndex < focusableArray.length - 1) {
                            focusableArray[currentIndex + 1].focus();
                        } else {
                            firstFocusableElement.current?.focus();
                        }
                    }
                }
            }
        };

        modal.addEventListener('keydown', handleKeyDown);

        return () => {
            modal.removeEventListener('keydown', handleKeyDown);
            
            // Restaurer le focus à la fermeture
            if (lastFocusedElement.current && document.contains(lastFocusedElement.current)) {
                lastFocusedElement.current.focus();
            }
        };
    }, [isOpen, modalRef, initialFocus]);

    return {
        firstFocusableElement,
        lastFocusableElement,
        lastFocusedElement
    };
};

// Hook pour la gestion du scroll et des événements clavier globaux
const useModalEvents = (
    isOpen: boolean,
    onClose: () => void,
    closeOnEscape: boolean
) => {
    React.useEffect(() => {
        if (!isOpen) return;

        // Gestion du scroll du body
        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;
        
        // Calculer la largeur de la scrollbar pour éviter le jump
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        // Gestionnaire pour la touche Escape
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && closeOnEscape) {
                e.preventDefault();
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            // Restauration des styles
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose, closeOnEscape]);
};

// Composant principal Modal avec useRef avancé
export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(({
    isOpen,
    onClose,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    initialFocus,
    usePortal = true,
    size,
    className,
    children,
    ...props
}, forwardedRef) => {
    // Refs pour la gestion avancée
    const modalRef = React.useRef<HTMLDivElement>(null);
    const overlayRef = React.useRef<HTMLDivElement>(null);
    const closeButtonRef = React.useRef<HTMLButtonElement>(null);
    const [mounted, setMounted] = React.useState(false);

    // Combinaison des refs (forwardedRef et ref interne)
    const combinedRef = React.useCallback((node: HTMLDivElement | null) => {
        modalRef.current = node;
        if (typeof forwardedRef === 'function') {
            forwardedRef(node);
        } else if (forwardedRef) {
            forwardedRef.current = node;
        }
    }, [forwardedRef]);

    // Hooks personnalisés
    useModalEvents(isOpen, onClose, closeOnEscape);
    const { firstFocusableElement, lastFocusableElement } = useModalFocus(
        isOpen, 
        modalRef, 
        initialFocus
    );

    // Gestion du mounting côté client
    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Gestionnaire d'overlay avec useCallback pour optimisation
    const handleOverlayClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (closeOnOverlayClick && e.target === overlayRef.current) {
            onClose();
        }
    }, [closeOnOverlayClick, onClose]);

    // Gestionnaire du bouton de fermeture
    const handleCloseClick = React.useCallback(() => {
        onClose();
    }, [onClose]);

    // ID unique pour l'accessibilité
    const modalId = React.useId();
    const titleId = `${modalId}-title`;

    // Contenu de la modal avec toutes les améliorations useRef
    const modalContent = (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={`${modalId}-description`}
            {...props}
        >
            {/* Overlay avec ref */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black bg-opacity-50 transition-opacity animate-in fade-in duration-200"
                onClick={handleOverlayClick}
                aria-hidden="true"
            />
            
            {/* Modal Content avec ref combiné */}
            <div 
                ref={combinedRef}
                className={cn(
                    modalVariants({ size, className }),
                    'animate-in zoom-in-95 duration-200'
                )}
                tabIndex={-1}
                role="document"
            >
                {/* Bouton de fermeture avec ref */}
                {showCloseButton && (
                    <button
                        ref={closeButtonRef}
                        onClick={handleCloseClick}
                        className="cursor-pointer absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 rounded-md p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Fermer la modal"
                        type="button"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                )}
                
                {/* Contexte pour les composants enfants */}
                <ModalProvider value={{ titleId, modalId, closeModal: onClose }}>
                    {children}
                </ModalProvider>
            </div>
        </div>
    );

    // Ne rien rendre si fermé
    if (!isOpen) return null;

    // Portal ou rendu direct
    if (usePortal && mounted && typeof document !== 'undefined') {
        return createPortal(modalContent, document.body);
    }

    return modalContent;
});

interface ModalHeaderProps extends
    HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
    className?: string;
}

export const ModalHeader = ({
    className,
    children,
    ...props
}: ModalHeaderProps) => (
    <div
        className={cn(
            'px-6 py-4 border-b border-gray-200',
            className
        )}
        {...props}
    >
        {children}
    </div>
);

interface ModalTitleProps extends
    HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
    className?: string;
}

export const ModalTitle = ({
    className,
    children,
    ...props
} : ModalTitleProps) => {
    const { titleId } = useModalContext();
    
    return (
        <h2
            id={titleId}
            className={cn(
                'text-lg font-semibold text-gray-900',
                className
            )}
            {...props}
        >
            {children}
        </h2>
    );
};

interface ModalBodyProps extends
    HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
    className?: string;
}

export const ModalBody = ({
    className,
    children,
    ...props
} : ModalBodyProps) => {
    const { modalId } = useModalContext();
    
    return (
        <div
            id={`${modalId}-description`}
            className={cn(
                'px-6 py-4',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

interface ModalFooterProps extends
    HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
    className?: string;
}

export const ModalFooter = ({
    className,
    children,
    ...props
} : ModalFooterProps) => (
    <div
        className={cn(
            'px-6 py-4 border-t border-gray-200 flex justify-end space-x-2',
            className
        )}
        {...props}
    >
        {children}
    </div>
);