import { useLoadObjectAndShowModalUpdate } from "@/src/component/hook/useLoadObjectAndShowModalUpdate";
import { Button } from "@/src/component/ui/btn/button";
import Input from "@/src/component/ui/form/Input";
import { Select } from "@/src/component/ui/form/Select";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/src/component/ui/modal";
import { addOrUpdateRoomController } from "@/src/controller/app/Cinema/Settings/RoomController";
import { Option } from "@/src/domain/Cinema/Settings/Option";
import { Room, RoomEmpty } from "@/src/domain/Cinema/Settings/Room";
import { Storage } from "@/src/domain/Cinema/Settings/Storage";
import { forwardRef, useImperativeHandle } from "react";


interface RoomModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: Room | null;
    onSaved?: (entity: Room) => void | Promise<void>;
    entityId?: number;
    cinemaId?: number;
    allOptions: Option[];
    allStorages: Storage[];
}

export const RoomModal = forwardRef(({ isOpen, initialObject, onSaved, entityId, cinemaId, allOptions, allStorages }: RoomModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = useLoadObjectAndShowModalUpdate<Room>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: RoomEmpty,
        action: addOrUpdateRoomController,
        onSaved: (entity) => {
            if (onSaved) onSaved(entity);
        },
        customData: { entityId: parseInt(entityId + ''), cinemaId: parseInt(cinemaId + '') },
        setDefaultValues: (object: Room) => {
            object.optionsIds = object.options?.map(option => option.id);
            object.storagesIds = object.storages?.map(storage => storage.id);
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
                    <ModalTitle>{isEdit ? "Modifier la salle" : "Créer une nouvelle salle"}</ModalTitle>
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
                            errors={result.validationErrors?.option_id}
                            label="Liste des options"
                            value={object.optionsIds ? object.optionsIds : []}
                            onChange={(value) => {
                                setObject({ ...object, optionsIds: value ? value.map((id: string) => Number(id)) : [] });
                            }}
                            required
                            isMulti={true}
                            showErrors={showErrors}
                            options={allOptions.map((option) => ({
                                label: option.name,
                                value: option.id.toString(),
                            }))}
                            initialValue={object.optionsIds ? object.optionsIds.map((id) => id.toString()) : []}
                        />
                        <Select
                            containerClassName=" col-span-2 "
                            errors={result.validationErrors?.storage_id}
                            label="Liste des stockages"
                            value={object.storagesIds ? object.storagesIds : []}
                            onChange={(value) => {
                                setObject({ ...object, storagesIds: value ? value.map((id: string) => Number(id)) : [] });
                            }}
                            required
                            isMulti={true}
                            showErrors={showErrors}
                            options={allStorages.map((storage) => ({
                                label: storage.name,
                                value: storage.id.toString(),
                            }))}
                            initialValue={object.storagesIds ? object.storagesIds.map((id) => id.toString()) : []}
                        />
                        <Input
                            errors={result.validationErrors?.serveurSize}
                            label="Taille du serveur (en To)"
                            type="number"
                            value={object.serveurSize ? object.serveurSize.toString() : ''}
                            onChange={(value) => {
                                setObject({ ...object, serveurSize: parseInt(value) });
                            }}
                            required
                            showErrors={showErrors}
                            containerClassName=" col-span-2 "
                        />
                        <Input
                            errors={result.validationErrors?.serveurSize}
                            label="Nombre de sièges"
                            type="number"
                            value={object.capacity ? object.capacity.toString() : ''}
                            onChange={(value) => {
                                setObject({ ...object, capacity: parseInt(value) });
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
    )
});