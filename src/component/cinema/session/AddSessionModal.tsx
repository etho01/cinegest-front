import { forwardRef, useImperativeHandle } from "react";
import { loadObjectAndShowModalUpdate } from "../../hook/loadObjectAndShowModalUpdate";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../../ui/modal";
import { Button } from "../../ui/btn/button";
import { Table, Tbody, Td, Th, Thead, Tr } from "../../ui/table/Table";
import { MovieVersion } from "@/src/domain/Cinema/Movie";
import { AsyncSelect } from "../../ui/form/AsyncSelect";
import { Room } from "@/src/domain/Cinema/Settings/Room";
import { Select } from "../../ui/form/Select";
import { AddSessionModalElement } from "@/src/application/useCases/Cinema/Sessions/addSessions";
import { calendarToDate, DateTimePicker, dateToCalendarDateTime } from "../../ui/form";
import { addSessionController } from "@/src/controller/app/Cinema/SessionController";

interface AddSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: AddSessionModalElement | null;
    onSaved?: (entity: AddSessionModalElement) => void | Promise<void>;
    entityId: number;
    cinemaId: number;
    rooms?: Room[];
}


export const AddSessionModal = forwardRef(({ isOpen, onClose, initialObject, onSaved, entityId, cinemaId, rooms }: AddSessionModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = loadObjectAndShowModalUpdate<AddSessionModalElement>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: {
            sessions: [],
        },
        action: addSessionController,
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
        }} size="3xl">
            <form onSubmit={async (e) => {
                await onSubmit(e);
            }}>
                <ModalHeader>
                    <ModalTitle>Ajouter des séances</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Version</Th>
                                <Th>Salle</Th>
                                <Th>Date de début</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {object.sessions.map((version, index) => (
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
                                                const newsessions = [...object.sessions];
                                                newsessions[index].movieVersionId = selectedOption ? selectedOption.version.id : null;
                                                setObject({
                                                    ...object,
                                                    sessions: newsessions,
                                                });
                                            }}
                                            showErrors={showErrors}
                                            errors={result.validationErrors?.sessions[index]?.movieVersionId}
                                        />
                                    </Td>
                                    <Td>
                                        <Select
                                            isMulti={false}
                                            options={rooms ? rooms.map((room) => ({
                                                label: room.name,
                                                value: room.id,
                                            })) : []}
                                            onChange={(value) => {
                                                const newsessions = [...object.sessions];
                                                newsessions[index].roomId = value
                                                setObject({
                                                    ...object,
                                                    sessions: newsessions,
                                                });
                                            }}
                                            value={object.sessions[index].roomId}
                                            showErrors={showErrors}
                                            errors={result.validationErrors?.sessions[index]?.roomId}
                                        />
                                    </Td>
                                    <Td>
                                        <DateTimePicker
                                            placeholder="Choisissez une date..."

                                            granularity="minute"
                                            showMonthAndYearPickers={true}
                                            description="Sélectionnez la date et l'heure de votre événement"
                                            onChange={(value) => {
                                                if (!value) return;
                                                const newsessions = [...object.sessions];
                                                newsessions[index].startAt = calendarToDate(value);
                                                setObject({
                                                    ...object,
                                                    sessions: newsessions,
                                                });
                                            }}
                                            value={object.sessions[index].startAt ? dateToCalendarDateTime(object.sessions[index].startAt) : null}
                                            showErrors={showErrors}
                                            errors={result.validationErrors?.sessions[index]?.startAt}
                                        />
                                    </Td>
                                    <Td>
                                        <Button variant="remove" type="button" onClick={() => {
                                            const newsessions = object.sessions.filter((_, i) => i !== index);
                                            setObject({
                                                ...object,
                                                sessions: newsessions,
                                            });
                                        }}>
                                            Supprimer
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                            {object.sessions.length === 0 && (
                                <Tr>
                                    <Td colSpan={4} className="text-center">Aucune session ajoutée</Td>
                                </Tr>
                            )}
                            <Tr>
                                <Td colSpan={4}>
                                    <div className="flex justify-center">
                                        <Button variant="default" type="button" onClick={() => {
                                            setObject({
                                                ...object,
                                                sessions: [...object.sessions, { movieVersionId: null, roomId: 0, startAt: null }],
                                            });
                                        }}>
                                            Ajouter une séance
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