import { loadObjectAndShowModalUpdate } from "@/src/component/hook/loadObjectAndShowModalUpdate";
import { Button } from "@/src/component/ui/btn/button";
import Input from "@/src/component/ui/form/Input";
import { Select } from "@/src/component/ui/form/Select";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/src/component/ui/modal";
import { addOrUpdateOptionController } from "@/src/controller/app/Cinema/Settings/OptionController";
import { Option, OptionEmpty } from "@/src/domain/Cinema/Settings/Option";
import { OptionType } from "@/src/domain/Cinema/Settings/OptionTypes";
import { forwardRef, useImperativeHandle } from "react";

interface OptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: Option | null;
    onSaved?: (entity: Option) => void | Promise<void>;
    entityId?: number;
    cinemaId?: number;
    allOptionsTypes: OptionType[];
}

export const OptionModal = forwardRef(({ isOpen, onClose, initialObject, onSaved, entityId, cinemaId, allOptionsTypes }: OptionModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, setShowErrors, loadFromObject, createNew, setObject, onSubmit, hasErrored, result, input } = loadObjectAndShowModalUpdate<Option>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: OptionEmpty,
        action: addOrUpdateOptionController,
        onSaved: (entity) => {
            onSaved && onSaved(entity);
        },
        customData: { entityId: parseInt(entityId + ''), cinemaId: parseInt(cinemaId + '') },
        setDefaultValues: (object: Option) => {
            object.option_type_id = object.type?.id;
            return object;
        }
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
                        <Select
                            containerClassName=" col-span-2 "
                            errors={result.validationErrors?.option_type_id}
                            label="Type d'option"
                            value={object.option_type_id ? object.option_type_id.toString() : ''}
                            onChange={(value) => {
                                setObject({ ...object, option_type_id: value ? parseInt(value) : undefined });
                            }}
                            required
                            isMulti={false}
                            showErrors={showErrors}
                            options={allOptionsTypes.map((type) => ({
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