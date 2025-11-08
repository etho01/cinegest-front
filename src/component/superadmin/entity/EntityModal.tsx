"use client"
import { Entity, EntityEmpty } from "@/src/domain/Entity";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../../ui/modal";
import { Button } from "../../ui/btn/button";
import Input from "../../ui/form/Input";
import { addEntityController, addOrUpdateEntityController, updateEntityController } from "@/src/controller/app/EntityController";
import { en } from "zod/locales";
import { useAction } from "next-safe-action/hooks";

interface EntityModelProps {
    isOpen: boolean;
    onClose: () => void;
    initialEntity : Entity | null;
    onSaved?: (entity: Entity) => void | Promise<void>;
}

export const EntityModal = forwardRef(({ isOpen, onClose, initialEntity, onSaved }: EntityModelProps, ref) => {
    const [isEdit, setIsEdit] = useState(!!initialEntity);
    if (initialEntity == null) {
        initialEntity = EntityEmpty;
    }

    const { executeAsync, hasErrored, result, input } = useAction(addOrUpdateEntityController)

    const [entity, setEntity] = useState<Entity>(initialEntity);
    const [isOpenState, setIsOpenState] = useState(isOpen);
    const [showErrors, setShowErrors] = useState(false);

    const loadFromId = async () => {};

    const loadFromEntity = async (entity: Entity) => {
        setEntity(entity);
        setIsEdit(true);
        setIsOpenState(true);
        setShowErrors(false);
    }

    const createNew = () => {
        setEntity(EntityEmpty);
        setIsEdit(false);
        setIsOpenState(true);
        setShowErrors(false);
    }

    useImperativeHandle(ref, () => ({
        loadFromId,
        loadFromEntity,
        createNew
    }));

    return (
        <Modal isOpen={isOpenState} onClose={() => setIsOpenState(false)} size="md">
            <form onSubmit={async (e) => {
                e.preventDefault();
                setShowErrors(true);
                let entityTemp = entity;
                let result = await executeAsync(entity);
                if (result?.data) {
                    entityTemp = result.data;
                }

                if (result.serverError || result.validationErrors) {
                    return;
                }

                setIsOpenState(false);
                onSaved && onSaved(entityTemp);
            }}>
                <ModalHeader>
                    <ModalTitle>{isEdit ? "Modifier l'entité" : "Créer une nouvelle entité"}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Input 
                        onChange={(value) => setEntity({ ...entity, name: value })} 
                        label="Nom de l'entité" 
                        value={entity?.name || ""} 
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