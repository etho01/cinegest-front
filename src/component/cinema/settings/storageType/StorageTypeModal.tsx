import { loadObjectAndShowModalUpdate } from "@/src/component/hook/loadObjectAndShowModalUpdate";
import { Button } from "@/src/component/ui/btn/button";
import Input from "@/src/component/ui/form/Input";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter } from "@/src/component/ui/modal";
import { addOrUpdateStorageTypeController } from "@/src/controller/app/Cinema/Settings/StorageTypeController";
import { StorageType, StorageTypeEmpty } from "@/src/domain/Cinema/Settings/StorageType";
import { forwardRef, useImperativeHandle } from "react";


interface StorageTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: StorageType | null;
    onSaved?: (entity: StorageType) => void | Promise<void>;
    entityId?: number;
    cinemaId?: number;
}


export const StorageTypeModal = forwardRef(({ isOpen, initialObject, onSaved, entityId, cinemaId }: StorageTypeModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = loadObjectAndShowModalUpdate<StorageType>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: StorageTypeEmpty,
        action: addOrUpdateStorageTypeController,
        onSaved: (entity) => {
            if (onSaved) onSaved(entity);
        },
        customData: { entityId: parseInt(entityId + ''), cinemaId: parseInt(cinemaId + '') }
    });

    const loadFromId = async () => {};

    useImperativeHandle(ref, () => ({
        loadFromId,
        loadFromObject,
        createNew
    }));

    return (
        <Modal isOpen={isOpenState} onClose={() => setIsOpenState(false)} size="xl">
            <form onSubmit={async (e) => {
                await onSubmit(e);
            }}>
                <ModalHeader>
                    <ModalTitle>{isEdit ? "Modifier le type de stockage" : "Créer un nouveau type de stockage"}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-2 gap-2">
                        <Input 
                            errors={result.validationErrors?.name}
                            label="Nom" 
                            value={object.name} 
                            onChange={(value) => {
                                setObject({ ...object, name: value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=" col-span-2 "
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