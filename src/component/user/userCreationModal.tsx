import { User, UserEmpty } from "@/src/domain/User";
import { loadObjectAndShowModalUpdate } from "../hook/loadObjectAndShowModalUpdate";
import { PaginationTabProps } from "../ui/pagination/PaginationTab";
import { forwardRef, useImperativeHandle } from "react";
import { Cinema } from "@/src/domain/Cinema";
import { addUserController } from "@/src/controller/app/UserController";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../ui/modal";
import Input from "../ui/form/Input";
import { Button } from "../ui/btn/button";

interface UserCreationModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: User | null;
    onSaved?: (entity: User) => void | Promise<void>;
    entityId?: number;
}

export const UserCreationModal = forwardRef(({ isOpen, onClose, initialObject, onSaved, entityId }: UserCreationModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, setShowErrors, loadFromObject, createNew, setObject, onSubmit, hasErrored, result, input } = loadObjectAndShowModalUpdate<User>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: UserEmpty,
        action: addUserController,
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
                    <ModalTitle>{isEdit ? "Modifier l'utilisateur" : "Créer un nouvel utilisateur"}</ModalTitle>
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