import { forwardRef, useImperativeHandle } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../../ui/modal";
import { Button } from "../../ui/btn/button";
import Input from "../../ui/form/Input";
import { Superadmin, SuperadminEmpty } from "@/src/domain/superadmin";
import { addOrUpdateSuperadminController } from "@/src/controller/app/SuperadminController";
import { useLoadObjectAndShowModalUpdate } from "../../hook/useLoadObjectAndShowModalUpdate";

interface SuperadminModelProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject : Superadmin | null;
    onSaved?: (entity: Superadmin) => void | Promise<void>;
}

export const SuperadminModal = forwardRef(({ isOpen, initialObject, onSaved }: SuperadminModelProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = useLoadObjectAndShowModalUpdate<Superadmin>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: SuperadminEmpty,
        action: addOrUpdateSuperadminController,
        onSaved: onSaved,
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
                    <ModalTitle>{isEdit ? "Modifier le superadmin" : "Créer un nouveau superadmin"}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-2 gap-2">
                        <Input 
                            errors={result.validationErrors?.firstname}
                            label="Prénom" 
                            value={object.firstname} 
                            onChange={(value) => {
                                setObject({ ...object, firstname: value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=""
                        />
                        <Input 
                            errors={result.validationErrors?.lastname}
                            label="Nom" 
                            value={object.lastname} 
                            onChange={(value) => {
                                setObject({ ...object, lastname: value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=""
                        />
                        <Input 
                            errors={result.validationErrors?.email}
                            label="Email" 
                            type="email"
                            value={object.email} 
                            onChange={(value) => {
                                setObject({ ...object, email: value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=""
                        />
                        <Input 
                            errors={result.validationErrors?.phone}
                            label="Téléphone" 
                            type="tel"
                            value={object.phone || ""} 
                            onChange={(value) => {
                                setObject({ ...object, phone: value });
                            }} 
                            showErrors={showErrors}
                            containerClassName=""
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

SuperadminModal.displayName = 'SuperadminModal';