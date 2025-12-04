import { loadObjectAndShowModalUpdate } from "@/src/component/hook/loadObjectAndShowModalUpdate";
import { Button } from "@/src/component/ui/btn/button";
import Input from "@/src/component/ui/form/Input";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "@/src/component/ui/modal";
import { updateMovieSizeController } from "@/src/controller/app/Cinema/MovieController";
import { Movie } from "@/src/domain/Cinema/Movie";
import { forwardRef, useImperativeHandle } from "react";
import { size } from "zod";

interface MovieSizeUpdate {
    size: number;
}

interface updateMovieProps {
    isOpen: boolean;
    movie: Movie;
    entityId: number;
    cinemaId: number;
    onSaved?: (size: number) => void | Promise<void>;
}

export interface UpdateSizeMovieRef {
    show: () => void;
}

export const UpdateSizeMovie = forwardRef(({ movie, entityId, cinemaId, onSaved, isOpen }: updateMovieProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = loadObjectAndShowModalUpdate<MovieSizeUpdate>({
        initialObject: null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: {size: 0},
        action: updateMovieSizeController,
        onSaved: (entity) => {
            console.log("UpdateSizeMovie onSaved", entity);
            if (onSaved) onSaved(entity.size);
        },
        customData: { entityId: parseInt(entityId + ''), cinemaId: parseInt(cinemaId + ''), movieId: movie.id },
    });

    const show = () => {
        setIsOpenState(true);
        loadFromObject({ size: (movie.size ?? 0) });
    };

    useImperativeHandle(ref, () => ({
        show,
    }));

    return (
        <Modal isOpen={isOpenState} onClose={() => {
            setIsOpenState(false);
        }} size="xl">
            <form onSubmit={async (e) => {
                await onSubmit(e);
            }}>
                <ModalHeader>
                    <ModalTitle>Modifier la taille du film</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            label="Taille du film (Go)"
                            type="number"
                            step="0.01"
                            value={object?.size ?? ''}
                            onChange={(size) => {
                                setObject({ ...object, size: parseFloat(size) });
                            }} 
                            containerClassName="col-span-2"
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