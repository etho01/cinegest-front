import { loadObjectAndShowModalUpdate } from "@/src/component/hook/loadObjectAndShowModalUpdate";
import { Button } from "@/src/component/ui/btn/button";
import Input from "@/src/component/ui/form/Input";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/src/component/ui/modal/Modal";
import { addOrUpdateOptionTypeController } from "@/src/controller/app/Cinema/Settings/OptionTypesController";
import { OptionType, OptionTypeEmpty } from "@/src/domain/Cinema/Settings/OptionTypes";
import { forwardRef, useImperativeHandle } from "react";


interface OptionTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: OptionType | null;
    onSaved?: (entity: OptionType) => void | Promise<void>;
    entityId?: number;
    cinemaId?: number;
}

export const OptionTypeModal = forwardRef(({ isOpen, onClose, initialObject, onSaved, entityId, cinemaId }: OptionTypeModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, setShowErrors, loadFromObject, createNew, setObject, onSubmit, hasErrored, result, input } = loadObjectAndShowModalUpdate<OptionType>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: OptionTypeEmpty,
        action: addOrUpdateOptionTypeController,
        onSaved: (entity) => {
            onSaved && onSaved(entity);
        },
        customData: { entityId: parseInt(entityId + ''), cinemaId: parseInt(cinemaId + '') }
    });

    const loadFromId = async (id : number) => {};

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
                    <ModalTitle>{isEdit ? "Modifier le type d'option" : "Créer un nouveau type d'option"}</ModalTitle>
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