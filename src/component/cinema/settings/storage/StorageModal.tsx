import { useLoadObjectAndShowModalUpdate } from "@/src/component/hook/useLoadObjectAndShowModalUpdate";
import { Button } from "@/src/component/ui/btn/button";
import Input from "@/src/component/ui/form/Input";
import { Select } from "@/src/component/ui/form/Select";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/src/component/ui/modal/Modal";
import { addOrUpdateStorageController } from "@/src/controller/app/Cinema/Settings/StorageController";
import { Storage, StorageEmpty } from "@/src/domain/Cinema/Settings/Storage";
import { StorageType } from "@/src/domain/Cinema/Settings/StorageType";
import { forwardRef, useImperativeHandle } from "react";


interface StorageModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: Storage | null;
    onSaved?: (entity: Storage) => void | Promise<void>;
    entityId?: number;
    cinemaId?: number;
    allStorageTypes: StorageType[];
}

export const StorageModal = forwardRef(({ isOpen, initialObject, onSaved, entityId, cinemaId, allStorageTypes }: StorageModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = useLoadObjectAndShowModalUpdate<Storage>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: StorageEmpty,
        action: addOrUpdateStorageController,
        onSaved: (entity) => {
            if (onSaved) onSaved(entity);
        },
        customData: { entityId: parseInt(entityId + ''), cinemaId: parseInt(cinemaId + '') },
        setDefaultValues: (object: Storage) => {
            object.storage_type_id = object.type?.id;
            return object;
        }
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
                    <ModalTitle>{isEdit ? "Modifier l'option" : "Créer une nouvelle option"}</ModalTitle>
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
                        <Input 
                            errors={result.validationErrors?.capacity}
                            label="Capacité (en terraoctets)" 
                            type="number"
                            value={object.capacity.toString()} 
                            onChange={(value) => {
                                setObject({ ...object, capacity: parseInt(value) });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=" col-span-2 "
                        />
                        <Select
                            containerClassName=" col-span-2 "
                            errors={result.validationErrors?.option_type_id}
                            label="Type de stockage"
                            value={object.storage_type_id ? object.storage_type_id.toString() : ''}
                            onChange={(value) => {
                                setObject({ ...object, storage_type_id: value ? parseInt(value) : undefined });
                            }}
                            required
                            isMulti={false}
                            showErrors={showErrors}
                            options={allStorageTypes.map((type) => ({
                                label: type.name,
                                value: type.id.toString(),
                            }))}
                            initialValue={object.type?.id ? object.type?.id.toString() : ''}
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