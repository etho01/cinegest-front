import { forwardRef, useImperativeHandle } from "react";
import { useLoadObjectAndShowModalUpdate } from "../../hook/useLoadObjectAndShowModalUpdate";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../../ui/modal";
import { Button } from "../../ui/btn/button";
import { addKeysController } from "@/src/controller/app/Cinema/KeyController"; 
import { CustomDateRangePicker } from "../../ui/form/CustomDateRangePicker";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../ui/table/Table";
import { MovieVersion } from "@/src/domain/Cinema/Movie";
import { AsyncSelect } from "../../ui/form/AsyncSelect";
import { AddKeyModalElement } from "@/src/application/useCases/Cinema/Key/addKeys";
import { Room } from "@/src/domain/Cinema/Settings/Room";
import { SelectMultiple } from "../../ui/form/Select";

interface AddKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: AddKeyModalElement | null;
    onSaved?: (entity: AddKeyModalElement) => void | Promise<void>;
    entityId: number;
    cinemaId: number;
    rooms?: Room[];
}


export const AddKeyModal = forwardRef(({ isOpen, onClose, initialObject, onSaved, entityId, cinemaId, rooms }: AddKeyModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = useLoadObjectAndShowModalUpdate<AddKeyModalElement>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: {
            dateStart: null,
            dateEnd: null,
            cinemaId: cinemaId,
            versions: [],
        },
        action: addKeysController,
        onSaved: (entity) => {
            if (onSaved) {
                onSaved(entity);
            }
        },
        customDataFunc: (object) => {
            return object;
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
                            showErrors={showErrors}
                            errors={result.validationErrors?.dateStart || result.validationErrors?.dateEnd}
                            onChange={function(dateEnd: Date | null, dateStart: Date | null): void {
                                setObject({
                                    ...object,
                                    dateStart: dateStart ? dateStart : null,
                                    dateEnd: dateEnd ? dateEnd : null,
                                });
                            }}

                        />
                    </div>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Version</Th>
                                <Th>Salle</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {object.versions.map((version, index) => (
                                <Tr key={index}>
                                    <Td>
                                        <AsyncSelect
                                            loadOptions={async (inputValue: string) => {
                                                const response = await fetch(`/api/${entityId}/cinema/${cinemaId}/movie/version/search?search=` + encodeURIComponent(inputValue));
                                                const data = await response.json();
                                                return data.map((version: MovieVersion) => ({
                                                    label: version.movie?.title + ' - ' + version.versionName,
                                                    value: version.id.toString(),
                                                    version: version,
                                                }));
                                            }}
                                            onChange={(selectedOption) => {
                                                const opt = selectedOption as { version: MovieVersion } | null;
                                                const newVersions = [...object.versions];
                                                newVersions[index].movieVersionId = opt ? opt.version.id : null;
                                                setObject({
                                                    ...object,
                                                    versions: newVersions,
                                                });
                                            }}
                                            showErrors={showErrors}
                                            errors={result.validationErrors?.versions[index]?.movieVersionId}
                                        />
                                    </Td>
                                    <Td>
                                        <SelectMultiple
                                            options={rooms ? rooms.map((room) => ({
                                                label: room.name,
                                                value: room.id.toString(),
                                            })) : []}
                                            onChange={(value) => {
                                                const newVersions = [...object.versions];
                                                newVersions[index].rooms = value.map(Number)
                                                setObject({
                                                    ...object,
                                                    versions: newVersions,
                                                });
                                            }}
                                            value={object.versions[index].rooms.map(room => room.toString())}
                                            showErrors={showErrors}
                                            errors={result.validationErrors?.versions[index]?.rooms}
                                        />
                                    </Td>
                                    <Td>
                                        <Button variant="remove" type="button" onClick={() => {
                                            const newVersions = object.versions.filter((_, i) => i !== index);
                                            setObject({
                                                ...object,
                                                versions: newVersions,
                                            });
                                        }}>
                                            Supprimer
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                            {object.versions.length === 0 && (
                                <Tr>
                                    <Td colSpan={3} className="text-center">Aucune version sélectionnée</Td>
                                </Tr>
                            )}
                            <Tr>
                                <Td colSpan={3}>
                                    <div className="flex justify-center">
                                        <Button variant="default" type="button" onClick={() => {
                                            setObject({
                                                ...object,
                                                versions: [...object.versions, { movieVersionId: 0, rooms: [] }],
                                            });
                                        }}>
                                            Ajouter une version
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

AddKeyModal.displayName = 'AddKeyModal';