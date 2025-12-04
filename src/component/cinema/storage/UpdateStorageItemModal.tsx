import { Modal } from "../../ui/modal";


export const AddStorageItemModal = forwardRef(({ isOpen, onClose, initialObject, onSaved, entityId, cinemaId }: AddStorageItemModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = loadObjectAndShowModalUpdate<StorageItem>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: StorageItemEmpty,
        action: addStorageItemController,
        onSaved: (entity) => {
            if (onSaved) onSaved(entity);
        },
        customData: { entityId: parseInt(entityId + ''), cinemaId: parseInt(cinemaId + '') },
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
                    <ModalTitle>{isEdit ? "Modifier l'article de stockage" : "Créer un nouvel article de stockage"}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    {/* Form fields go here */}
                </ModalBody>
                <ModalFooter>
                    <Button type="button" variant="secondary" onClick={() => {
                        setIsOpenState(false);
                        onClose();
                    }}>Annuler</Button>
                    <Button type="submit" variant="primary">{isEdit ? "Enregistrer les modifications" : "Créer l'article de stockage"}</Button>
                </ModalFooter>
            </form>
        </Modal>
    );
}