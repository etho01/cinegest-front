import { useLoadObjectAndShowModalUpdate } from "@/src/component/hook/useLoadObjectAndShowModalUpdate";
import { Button } from "@/src/component/ui/btn/button";
import Input from "@/src/component/ui/form/Input";
import Textarea from "@/src/component/ui/form/Textarea";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/src/component/ui/modal";
import { addOrUpdatePriceController } from "@/src/controller/app/CinemaApiController";
import { Price, PriceEmpty } from "@/src/domain/CinemaApi";
import { forwardRef, useImperativeHandle } from "react";

interface PriceModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: Price | null;
    onSaved?: (entity: Price) => void | Promise<void>;
    entityId: number;
    cinemaApiId: number;
}

export const PriceModal = forwardRef(({ isOpen, onClose, initialObject, onSaved, entityId, cinemaApiId }: PriceModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = useLoadObjectAndShowModalUpdate<Price>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: PriceEmpty,
        action: addOrUpdatePriceController,
        onSaved: (object) => {
            if (onSaved) onSaved(object);
        },
        customData: {
            entityId: parseInt(entityId + ''),
            cinemaApiId: parseInt(cinemaApiId + ''),
        },
        customDataFunc: (object) => {
            return {
                ...object,
                amount: parseFloat(object.amount + '')
            }
        }
    });

    const loadFromId = async () => {};

    useImperativeHandle(ref, () => ({
        loadFromId,
        loadFromObject,
        createNew
    }));

    return (
        <Modal isOpen={isOpenState} onClose={() => {
            setIsOpenState(false);
            onClose();
        }} size="lg">
            <form onSubmit={async (e) => {
                await onSubmit(e);
            }}>
                <ModalHeader>
                    <ModalTitle>{isEdit ? "Modifier le prix" : "Créer un nouveau prix"}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-1 gap-4">
                        <Input
                            label="Nom"
                            value={object.name}
                            onChange={(value) => setObject({ ...object, name: value })}
                            errors={result.validationErrors?.name}
                            showErrors={showErrors}
                        />
                        <Input
                            label="Montant"
                            type="number"
                            step="0.01"
                            value={object.amount}
                            onChange={(value) => setObject({ ...object, amount: Number(value) })}
                            errors={result.validationErrors?.amount}
                            showErrors={showErrors}
                        />
                        <Textarea
                            label="Description"
                            value={object.description}
                            onChange={(value) => setObject({ ...object, description: value })}
                            errors={result.validationErrors?.description}
                            showErrors={showErrors}
                        />
                    </div>
                    { hasErrored && showErrors ? <div className="text-red-500">{ result.serverError }</div> : null }
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline" onClick={() => setIsOpenState(false)}>
                        Fermer
                    </Button>
                    <Button type="submit">
                        Sauvegarder
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
});

PriceModal.displayName = 'PriceModal';