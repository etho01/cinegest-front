import { forwardRef, useImperativeHandle } from "react";
import { Modal, ModalBody, ModalFooter, ModalTitle, ModalHeader } from "../../ui/modal";
import { Button } from "../../ui/btn/button";
import { Room } from "@/src/domain/Cinema/Settings/Room";
import { loadObjectAndShowModalUpdate } from "../../hook/loadObjectAndShowModalUpdate";
import { MovieVersion } from "@/src/domain/Cinema/Movie";
import { addStorageItemsController } from "@/src/controller/app/Cinema/StorageItemController";
import { Select } from "../../ui/form/Select";
import { Storage } from "@/src/domain/Cinema/Settings/Storage";
import { Table, Th, Tr, Thead, Tbody, Td } from "../../ui/table/Table";
import { AsyncSelect } from "../../ui/form/AsyncSelect";
import { addStorageItemObjectParams } from "@/src/application/useCases/Cinema/StorageItem/addStorageItems";

interface AddStorageItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: addStorageItemObjectParams | null;
    onSaved?: (entity: addStorageItemObjectParams) => void | Promise<void>;
    entityId: number;
    cinemaId: number;
    rooms: Room[];
    storages: Storage[];
}

export const AddStorageItemModal = forwardRef(({ isOpen, onClose, initialObject, onSaved, entityId, cinemaId, rooms, storages }: AddStorageItemModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = loadObjectAndShowModalUpdate<addStorageItemObjectParams>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: {
            roomId: undefined,
            storageId: undefined,
            originId: undefined,
            movieVersions: [],
        },
        action: addStorageItemsController,
        onSaved: (entity) => {
            if (onSaved) onSaved(entity);
        },
        customData: { entityId: parseInt(entityId + ''), cinemaId: parseInt(cinemaId + '') },
    });

    useImperativeHandle(ref, () => ({
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
                    <ModalTitle>Ajouter des versions de films dans le stockage</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-2 gap-2">
                        <Select
                            label="Salle / Stockage"
                            placeholder="Salle / Stockage"
                            options={
                                rooms.map((room) => ({
                                    label: 'Salle ' + room.name,
                                    value: 'room_' + room.id.toString(),
                                })).concat(storages.map((store : Storage) => ({
                                    label: 'Stockage ' + store.name,
                                    value: 'storage_' + store.id.toString(),
                                })))
                            }
                            containerClassName="col-span-2"
                            value={object.roomId !== undefined ? 'room_' + object.roomId.toString() : object.storageId !== undefined ? 'storage_' + object.storageId.toString() : undefined}
                            onChange={(value) => {
                                if (value && value.startsWith('room_')) {
                                    setObject({
                                        ...object,
                                        roomId: parseInt(value.substring(5)),
                                        storageId: undefined,
                                    });
                                } else if (value && value.startsWith('storage_')) {
                                    setObject({
                                        ...object,
                                        storageId: parseInt(value.substring(8)),
                                        roomId: undefined,
                                    });
                                } else {
                                    setObject({
                                        ...object,
                                        roomId: undefined,
                                        storageId: undefined,
                                    });
                                }
                            }}
                            showErrors={showErrors}
                            errors={result.validationErrors?.roomId || result.validationErrors?.storageId}
                        />
                        <Select
                            label="Origine"
                            placeholder="Origine"
                            options={storages.map((store : Storage) => ({
                                label: store.name,
                                value: store.id.toString(),
                            }))}
                            value={object.originId ? object.originId.toString() : undefined}
                            onChange={(value) => {
                                if (value) {
                                    setObject({
                                        ...object,
                                        originId: parseInt(value),
                                    });
                                } else {
                                    setObject({
                                        ...object,
                                        originId: undefined,
                                    });
                                }
                            }}
                            showErrors={showErrors}
                            errors={result.validationErrors?.originId}
                            containerClassName="col-span-2"
                        />
                    </div>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Version du film</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {object.movieVersions.map((mv, index) => (
                                <Tr key={index}>
                                    <Td>
                                        <AsyncSelect
                                            loadOptions={async (inputValue: string, callback) => {
                                                const response = await fetch(`/api/${entityId}/cinema/${cinemaId}/movie/version/search?search=` + encodeURIComponent(inputValue));
                                                const data = await response.json();
                                                return data.map((version: MovieVersion) => ({
                                                    label: version.movie?.title + ' - ' + version.versionName,
                                                    value: version.id.toString(),
                                                    version: version,
                                                }));
                                            }}
                                            onChange={(selectedOption: { value: string; label: string; version: MovieVersion } | null) => {
                                                const newVersions = [...object.movieVersions];
                                                newVersions[index] = selectedOption ? selectedOption.version.id : null;
                                                setObject({
                                                    ...object,
                                                    movieVersions: newVersions,
                                                });
                                            }}
                                            showErrors={showErrors}
                                            errors={
                                                
                                                result.validationErrors?.movieVersions[index]}
                                        />
                                    </Td>
                                    <Td>
                                        <Button variant="remove" onClick={() => {
                                            const newMovieVersions = [...object.movieVersions];
                                            newMovieVersions.splice(index, 1);
                                            setObject({
                                                ...object,
                                                movieVersions: newMovieVersions,
                                            });
                                        }}>
                                            Supprimer
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                            {object.movieVersions.length === 0 && (
                                <Tr>
                                    <Td colSpan={2} className="text-center">Aucune version de film ajoutée</Td>
                                </Tr>
                            )}
                            <Tr>
                                <Td colSpan={2}>
                                    <div className="flex justify-center">
                                        <Button variant="default" type="button" onClick={() => {
                                            setObject({
                                                ...object,
                                                movieVersions: [...object.movieVersions, null],
                                            });
                                        }}>
                                            Ajouter une version de film
                                        </Button>
                                    </div>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
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