import { forwardRef, useImperativeHandle } from "react";
import { loadObjectAndShowModalUpdate } from "../../hook/loadObjectAndShowModalUpdate";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../../ui/modal";
import { Button } from "../../ui/btn/button";
import { Key, KeyEmpty } from "@/src/domain/Cinema/Key";
import { addKeyController } from "@/src/controller/app/Cinema/KeyController"; 
import { CustomDateRangePicker } from "../../ui/form/CustomDateRangePicker";


interface AddKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: Key | null;
    onSaved?: (entity: Key) => void | Promise<void>;
    entityId: number;
    cinemaId: number;
}


export const AddKeyModal = forwardRef(({ isOpen, onClose, initialObject, onSaved, entityId, cinemaId }: AddKeyModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = loadObjectAndShowModalUpdate<Key>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: KeyEmpty,
        action: addKeyController,
        onSaved: (entity) => {
            if (onSaved) {
                onSaved(entity);
            }
        },
        customData: { entityId: parseInt(entityId + ''), cinemaId: parseInt(cinemaId + '') },
        setDefaultValues: (object: Key) => {
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
        <Modal isOpen={isOpenState} onClose={() => {
            setIsOpenState(false);
            onClose();
        }} size="xl">
            <form onSubmit={async (e) => {
                await onSubmit(e);
            }}>
                <ModalHeader>
                    <ModalTitle>{isEdit ? "Modifier la KDM" : "Ajouter une nouvelle KDM"}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-2 gap-2">
                        <CustomDateRangePicker
                            label="Période de validité"
                            containerClassName=" col-span-2 "
                        />
                    </div>
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