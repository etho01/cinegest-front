import { Movie, MovieEmpty, MovieSearchResult } from "@/src/domain/Cinema/Movie";
import { forwardRef, useImperativeHandle } from "react";
import { useLoadObjectAndShowModalUpdate } from "../../hook/useLoadObjectAndShowModalUpdate";
import { addMovieController } from "@/src/controller/app/Cinema/MovieController";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../../ui/modal";
import { Button } from "../../ui/btn/button";
import { AsyncSelect, Option } from "../../ui/form/AsyncSelect";


interface AddMovieModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: Movie | null;
    onSaved?: (entity: Movie) => void | Promise<void>;
    entityId?: number;
    cinemaId?: number;
}

export const AddMovieModal = forwardRef(({ isOpen, onClose, initialObject, onSaved, entityId, cinemaId }: AddMovieModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = useLoadObjectAndShowModalUpdate<Movie>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: MovieEmpty,
        action: addMovieController,
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
        }} size="xl">
            <form onSubmit={async (e) => {
                await onSubmit(e);
            }}>
                <ModalHeader>
                    <ModalTitle>{isEdit ? "Modifier le film" : "Créer un nouveau film"}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-2 gap-2">
                        <AsyncSelect
                            containerClassName=" col-span-2 "
                            label="Films"
                            placeholder="Sélectionner le film"
                            loadOptions={(inputValue: string, callback: (options: Option<MovieSearchResult>[]) => void) => {
                                if (inputValue.length < 3) {
                                    callback([]);
                                    return;
                                }
                                fetch(`/api/${entityId}/cinema/${cinemaId}/movie/search?search=` + encodeURIComponent(inputValue))
                                    .then((response) => response.json())
                                    .then((data) => {
                                        const options = data.map((movie: MovieSearchResult) => ({
                                            label: movie.title + (movie.release_date ? ` (${new Date(movie.release_date).getFullYear()})` : ''),
                                            value: movie,
                                        }));
                                        callback(options);
                                    });
                                    
                            }}
                            onChange={(value) => {
                                setObject({
                                    ...object,
                                    externalId: value ? value.value.id : 0,
                                    title: value ? value.value.title : '',
                                    description: value ? value.value.overview : '',
                                    releaseDate: value ? value.value.release_date : '',
                                });
                            }}
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

AddMovieModal.displayName = 'AddMovieModal';