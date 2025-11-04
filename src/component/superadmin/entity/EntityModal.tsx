"use client"
import { Entity, EntityEmpty } from "@/src/domain/Entity";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../../ui/modal";
import { Button } from "../../ui/btn/button";
import Input from "../../ui/form/Input";
import { addEntityController, updateEntityController } from "@/src/controller/app/EntityController";
import { en } from "zod/locales";

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

    const [entity, setEntity] = useState<Entity>(initialEntity);
    const [isOpenState, setIsOpenState] = useState(isOpen);

    const loadFromId = async () => {};

    const loadFromEntity = async (entity: Entity) => {
        setEntity(entity);
        setIsEdit(true);
        setIsOpenState(true);
    }

    const createNew = () => {
        setEntity(EntityEmpty);
        setIsEdit(false);
        setIsOpenState(true);
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
                let entityTemp = entity;
                if (entity.id == 0) {
                    entityTemp = (await addEntityController(entity))?.data ?? EntityEmpty;
                } else {
                    entityTemp = (await updateEntityController(entity))?.data ?? entity;
                }

                setIsOpenState(false);
                onSaved && onSaved(entityTemp);
            }}>
                <ModalHeader>
                    <ModalTitle>{isEdit ? "Modifier l'entité" : "Créer une nouvelle entité"}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Input 
                        onChange={(e) => setEntity({ ...entity, name: e.target.value })} 
                        label="Nom de l'entité" 
                        value={entity?.name || ""} 
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