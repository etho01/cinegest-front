"use client"
import { Entity, EntityEmpty } from "@/src/domain/Entity";
import { forwardRef, useImperativeHandle } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../../ui/modal";
import { Button } from "../../ui/btn/button";
import Input from "../../ui/form/Input";
import { addOrUpdateEntityController } from "@/src/controller/app/EntityController";
import { useLoadObjectAndShowModalUpdate } from "../../hook/useLoadObjectAndShowModalUpdate";

interface EntityModelProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject : Entity | null;
    onSaved?: (entity: Entity) => void | Promise<void>;
}

export const EntityModal = forwardRef(({ isOpen, initialObject, onSaved }: EntityModelProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = useLoadObjectAndShowModalUpdate<Entity>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: EntityEmpty,
        action: addOrUpdateEntityController,
        onSaved: (entity) => {
            if (onSaved) onSaved(entity);
            location.reload();
        },
    });

    const loadFromId = async () => {};

    useImperativeHandle(ref, () => ({
        loadFromId,
        loadFromObject,
        createNew
    }));

    return (
        <Modal isOpen={isOpenState} onClose={() => setIsOpenState(false)} size="md">
            <form onSubmit={async (e) => {
                await onSubmit(e);
            }}>
                <ModalHeader>
                    <ModalTitle>{isEdit ? "Modifier l'entité" : "Créer une nouvelle entité"}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Input 
                        onChange={(value) => setObject({ ...object, name: value })} 
                        label="Nom de l'entité" 
                        value={object?.name || ""} 
                        required
                        errors={result.validationErrors?.name}
                        showErrors={showErrors}
                    />
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
})