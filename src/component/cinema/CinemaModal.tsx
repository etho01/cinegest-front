import { Cinema, CinemaEmpty } from "@/src/domain/Cinema";
import { forwardRef, useImperativeHandle } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../ui/modal";
import { Button } from "../ui/btn/button";
import Input from "../ui/form/Input";
import { SelectCountry } from "../ui/form/Select";
import { useLoadObjectAndShowModalUpdate } from "../hook/useLoadObjectAndShowModalUpdate";
import { addOrUpdateCinemaController } from "@/src/controller/app/CinemaController";

interface CinemaModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: Cinema | null;
    onSaved?: (entity: Cinema) => void | Promise<void>;
    entityId?: number;
}

export const CinemaModal = forwardRef(({ isOpen, onClose, initialObject, onSaved, entityId }: CinemaModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = useLoadObjectAndShowModalUpdate<Cinema>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: CinemaEmpty,
        action: addOrUpdateCinemaController,
        onSaved: (entity) => {
            if (onSaved) onSaved(entity);
            location.reload();
        },
        customData: { entityId: entityId }
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
                    <ModalTitle>{isEdit ? "Modifier le cinéma" : "Créer un nouveau cinéma"}</ModalTitle>
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
                            errors={result.validationErrors?.address}
                            label="Adresse" 
                            value={object.address} 
                            onChange={(value) => {
                                setObject({ ...object, address: value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=" col-span-2 "
                        />
                        <Input 
                            errors={result.validationErrors?.address_complement}
                            label="Adresse complémentaire" 
                            value={object.address_complement} 
                            onChange={(value) => {
                                setObject({ ...object, address_complement: value });
                            }}
                            showErrors={showErrors}
                            containerClassName=" col-span-2 "
                        />
                        <Input 
                            errors={result.validationErrors?.postal_code}
                            label="Code postal" 
                            value={object.postal_code} 
                            onChange={(value) => {
                                setObject({ ...object, postal_code: value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=""
                        />
                        <Input 
                            errors={result.validationErrors?.city}
                            label="Ville" 
                            value={object.city} 
                            onChange={(value) => {
                                setObject({ ...object, city: value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=""
                        />
                        <SelectCountry
                            errors={result.validationErrors?.country}
                            label="Pays"
                            value={object.country}
                            onChange={(value) => {
                                setObject({ ...object, country: value });
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

CinemaModal.displayName = 'CinemaModal';