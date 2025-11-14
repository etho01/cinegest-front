"use client"
import { Entity, EntityEmpty } from "@/src/domain/Entity";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../../ui/modal";
import { Button } from "../../ui/btn/button";
import Input from "../../ui/form/Input";
import { addOrUpdateEntityController } from "@/src/controller/app/EntityController";
import { loadObjectAndShowModalUpdate } from "../../hook/loadObjectAndShowModalUpdate";

interface EntityModelProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject : Entity | null;
    onSaved?: (entity: Entity) => void | Promise<void>;
}

export const EntityModal = forwardRef(({ isOpen, onClose, initialObject, onSaved }: EntityModelProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, setShowErrors, loadFromObject, createNew, setObject, onSubmit, hasErrored, result, input } = loadObjectAndShowModalUpdate<Entity>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: EntityEmpty,
        action: addOrUpdateEntityController,
        onSaved: (entity) => {
            onSaved && onSaved(entity);
            location.reload();
        },
    });

    const loadFromId = async (id : number) => {};

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