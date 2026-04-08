import { useLoadObjectAndShowModalUpdate } from "@/src/component/hook/useLoadObjectAndShowModalUpdate";
import { Button } from "@/src/component/ui/btn/button";
import Input from "@/src/component/ui/form/Input";
import { Select } from "@/src/component/ui/form/Select";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/src/component/ui/modal";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/src/component/ui/table/Table";
import { addOrUpdateMovieVersionController } from "@/src/controller/app/Cinema/MovieController";
import { MovieVersion, MovieVersionEmpty } from "@/src/domain/Cinema/Movie";
import { Option } from "@/src/domain/Cinema/Settings/Option";
import { OptionType } from "@/src/domain/Cinema/Settings/OptionTypes";
import { forwardRef, useImperativeHandle, useState } from "react";

interface MovieVersionModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: MovieVersion | null;
    onSaved?: (entity: MovieVersion) => void | Promise<void>;
    entityId: number;
    cinemaId: number;
    movieId: number;
    optionsTypes: OptionType[];
    options: Option[];
}

type optionSelectType = {
    optionTypeId?: number;
    optionId?: number;
}


export const MovieVersionModal = forwardRef(({ isOpen, onClose, initialObject, onSaved, entityId, cinemaId, movieId, optionsTypes, options }: MovieVersionModalProps, ref) => {
    const [ optionSelectList, setOptionSelectList ] = useState<optionSelectType[]>([]);

    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = useLoadObjectAndShowModalUpdate<MovieVersion>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: MovieVersionEmpty,
        action: addOrUpdateMovieVersionController,
        onSaved: (object) => {
            if (onSaved) onSaved(object);
        },
        customDataFunc: (object) => {
            const optionsToSend = optionSelectList.filter(optionSelect => optionSelect.optionId !== undefined).map(optionSelect => {
                return options.find(opt => opt.id === optionSelect.optionId);
            }).filter(option => option !== undefined) as Option[];
            object.options = optionsToSend;

            return object;
        },
        customData: {
            entityId: parseInt(entityId + ''),
            cinemaId: parseInt(cinemaId + ''),
            movieId: parseInt(movieId + ''),
        }
    });

    const loadFromId = async () => {};

    useImperativeHandle(ref, () => ({
        loadFromId,
        loadFromObject : (obj: MovieVersion) => {
            loadFromObject(obj);
            const initialOptionSelectList : optionSelectType[] = [];
            obj.options.forEach(option => {
                const optionSelected = options.find(opt => opt.id === option.id);
                if (optionSelected) {
                    initialOptionSelectList.push({
                        optionTypeId: optionSelected.option_type_id,
                        optionId: optionSelected.id
                    });
                }
            });
            setOptionSelectList(initialOptionSelectList);
        },
        createNew : () => {
            createNew();
            setOptionSelectList([]);
        }
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
                    <ModalTitle>{isEdit ? "Modifier la version du film" : "Créer une nouvelle version du film"}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            label="Nom de la version"
                            value={object.versionName}
                            onChange={(value) => setObject({ ...object, versionName: value })}
                            errors={result.validationErrors?.versionName}
                            showErrors={showErrors}
                        />
                        <Input
                            label="Taille (GB)"
                            type="number"
                            value={object.size}
                            onChange={(value) => setObject({ ...object, size: Number(value) })}
                            errors={result.validationErrors?.size}
                            showErrors={showErrors}
                        />
                    </div>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Type d&lsquo;option</Th>
                                <Th>Option</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {optionSelectList.map((optionSelect, index) => (
                                <Tr key={index} index={index}>
                                    <Td>
                                        <Select
                                            placeholder="Sélectionner un type d&lsquo;option"
                                            options={optionsTypes.filter(optionType => {
                                                return !optionSelectList.some((os, i) => os.optionTypeId === optionType.id && i !== index);
                                            }).map(optionType => ({ value: optionType.id, label: optionType.name }))}
                                            value={optionSelect.optionTypeId ? optionSelect.optionTypeId : null}
                                            onChange={(optionTypeId) => {
                                                const updatedList = [...optionSelectList];
                                                updatedList[index].optionTypeId = optionTypeId;
                                                updatedList[index].optionId = undefined;
                                                setOptionSelectList(updatedList);
                                            }}
                                        />
                                    </Td>
                                    <Td>
                                        {optionSelect.optionTypeId ? (
                                            <Select
                                                placeholder="Sélectionner une option"
                                                options={options.filter(opt => {
                                                    return opt.option_type_id === optionSelect.optionTypeId;
                                                }).map(option => ({ value: option.id, label: option.name }))}
                                                value={optionSelect.optionId ? optionSelect.optionId : null}
                                                onChange={(optionId) => {
                                                    const updatedList = [...optionSelectList];
                                                    updatedList[index].optionId = optionId;
                                                    setOptionSelectList(updatedList);
                                                }}
                                            />
                                        ) : (
                                            <div className="text-gray-500">Sélectionnez un type d&lsquo;option d&lsquo;abord</div>
                                        )}
                                    </Td>
                                    <Td>
                                        <Button variant="remove" onClick={() => {
                                            const newList = optionSelectList.filter((_, i) => i !== index);
                                            setOptionSelectList(newList);
                                        }}>
                                            Supprimer
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                            {optionSelectList.length === 0 ? (
                                <Tr>
                                    <Td colSpan={3} className="text-center">
                                        Aucune option sélectionnée.
                                    </Td>
                                </Tr>
                            ) : null}
                            <Tr>
                                <Td colSpan={3} className="">
                                    <div className="flex justify-center">
                                        <Button onClick={(e) => {
                                            e.preventDefault();
                                            setOptionSelectList([...optionSelectList, {}]);
                                        }}>
                                            Ajouter une option
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

MovieVersionModal.displayName = 'MovieVersionModal';