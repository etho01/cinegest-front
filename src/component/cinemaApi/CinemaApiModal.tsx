import { Cinema } from "@/src/domain/Cinema";
import { CinemaApi, CinemaApiEmpty } from "@/src/domain/CinemaApi";
import { forwardRef, useImperativeHandle } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../ui/modal";
import { Input, Select } from "../ui/form";
import { Button } from "../ui/btn/button";
import { loadObjectAndShowModalUpdate } from "../hook/loadObjectAndShowModalUpdate";
import { addOrUpdateCinemaApiController } from "@/src/controller/app/CinemaApiController";


interface CinaApiModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: CinemaApi | null;
    onSaved?: (entity: CinemaApi) => void | Promise<void>;
    entityId?: number;
    cinemaId?: number;
    cinemas : Cinema[];
}

export const CinemaApiModal = forwardRef (({ isOpen, onClose, initialObject, onSaved, entityId, cinemaId, cinemas }: CinaApiModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = loadObjectAndShowModalUpdate<CinemaApi>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: CinemaApiEmpty,
        action: addOrUpdateCinemaApiController,
        onSaved: (entity) => {
            if (onSaved) onSaved(entity);
            location.reload();
        },
        customData: { entityId: parseInt(entityId + '') }
    });

    const loadFromId = async () => {};

    useImperativeHandle(ref, () => ({
        loadFromId,
        loadFromObject : (e : CinemaApi) => {
            e.cinemaIds = e.cinemas?.map(cinema => cinema.id) || [];
            loadFromObject(e);
        },
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
                    <ModalTitle>{isEdit ? "Modifier l'API cinéma" : "Créer une nouvelle API cinéma"}</ModalTitle>
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
                        <Input 
                            errors={result.validationErrors?.websiteUrl}
                            label="URL du site web" 
                            value={object.websiteUrl || ""} 
                            onChange={(value) => {
                                setObject({ ...object, websiteUrl: value });
                            }} 
                            showErrors={showErrors}
                            containerClassName=" col-span-2 "
                            placeholder="https://exemple.com"
                        />
                        <Select 
                            errors={result.validationErrors?.cinemaIds}
                            label="Cinémas" 
                            placeholder="Sélectionner les cinémas"
                            value={object.cinemaIds || []} 
                            onChange={(value) => {
                                setObject({ ...object, cinemaIds: value });
                            }} 
                            options={cinemas.map((cinema) => ({ label: cinema.name, value: cinema.id }))}
                            isMulti
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