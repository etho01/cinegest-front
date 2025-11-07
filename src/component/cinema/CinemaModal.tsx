import { Cinema, CinemaEmpty } from "@/src/domain/Cinema";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../ui/modal";
import { Button } from "../ui/btn/button";
import Input from "../ui/form/Input";
import { SelectCountry } from "../ui/form/Select";
import { loadObjectAndShowModalUpdate } from "../hook/loadObjectAndShowModalUpdate";
import { addOrUpdateCinemaController } from "@/src/controller/app/CinemaController";

interface CinemaModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialEntity : Cinema | null;
    onSaved?: (entity: Cinema) => void | Promise<void>;
    entityId?: number;
}

export const CinemaModal = forwardRef(({ isOpen, onClose, initialEntity, onSaved, entityId }: CinemaModalProps, ref) => {
    const { isEdit, entity, isOpenState, showErrors, setIsOpenState, setShowErrors, loadFromObject, createNew, setEntity, onSubmit, hasErrored, result, input } = loadObjectAndShowModalUpdate<Cinema>({
        initialEntity: initialEntity ? initialEntity : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: CinemaEmpty,
        action: addOrUpdateCinemaController,
        onSaved: onSaved,
        customData: { entityId: entityId }
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
                    <ModalTitle>{isEdit ? "Modifier le cinéma" : "Créer un nouveau cinéma"}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-2 gap-2">
                        <Input 
                            errors={result.validationErrors?.name}
                            label="Nom" 
                            value={entity.name} 
                            onChange={(e) => {
                                setEntity({ ...entity, name: e.target.value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=" col-span-2 "
                        />
                        <Input 
                            errors={result.validationErrors?.address}
                            label="Adresse" 
                            value={entity.address} 
                            onChange={(e) => {
                                setEntity({ ...entity, address: e.target.value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=" col-span-2 "
                        />
                        <Input 
                            errors={result.validationErrors?.address_complement}
                            label="Adresse complémentaire" 
                            value={entity.address_complement} 
                            onChange={(e) => {
                                setEntity({ ...entity, address_complement: e.target.value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=" col-span-2 "
                        />
                        <Input 
                            errors={result.validationErrors?.postal_code}
                            label="Code postal" 
                            value={entity.postal_code} 
                            onChange={(e) => {
                                setEntity({ ...entity, postal_code: e.target.value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=""
                        />
                        <Input 
                            errors={result.validationErrors?.city}
                            label="Ville" 
                            value={entity.city} 
                            onChange={(e) => {
                                setEntity({ ...entity, city: e.target.value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=""
                        />
                        <SelectCountry
                            errors={result.validationErrors?.country}
                            label="Pays"
                            value={entity.country}
                            onChange={(value) => {
                                setEntity({ ...entity, country: value });
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