import { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../../ui/modal";
import { Button } from "../../ui/btn/button";
import Input from "../../ui/form/Input";
import { Superadmin, SuperadminEmpty } from "@/src/domain/superadmin";
import { useAction } from "next-safe-action/hooks";
import { addOrUpdateSuperadminController, addSuperadminController } from "@/src/controller/app/SuperadminController";

interface SuperadminModelProps {
    isOpen: boolean;
    onClose: () => void;
    initialEntity : Superadmin | null;
    onSaved?: (entity: Superadmin) => void | Promise<void>;
}

export const SuperadminModal = forwardRef(({ isOpen, onClose, initialEntity, onSaved }: SuperadminModelProps, ref) => {
    const [isEdit, setIsEdit] = useState(!!initialEntity);
    if (initialEntity == null) {
        initialEntity = SuperadminEmpty;
    }

    const { executeAsync, hasErrored, result, input } = useAction(addOrUpdateSuperadminController)

    const [superadmin, setSuperadmin] = useState<Superadmin>(initialEntity);
    const [isOpenState, setIsOpenState] = useState(isOpen);
    const [showErrors, setShowErrors] = useState(false);

    const loadFromId = async () => {};

    const loadFromSuperadmin = async (superadmin: Superadmin) => {
        setSuperadmin(superadmin);
        setIsEdit(true);
        setIsOpenState(true);
        setShowErrors(false);
    }

    const createNew = () => {
        setSuperadmin(SuperadminEmpty);
        setIsEdit(false);
        setIsOpenState(true);
        setShowErrors(false);
    }

    useImperativeHandle(ref, () => ({
        loadFromId,
        loadFromSuperadmin,
        createNew
    }));

    return (
        <Modal isOpen={isOpenState} onClose={() => setIsOpenState(false)} size="xl">
            <form onSubmit={async (e) => {
                e.preventDefault();
                setShowErrors(true);
                let superadminTemp = superadmin;
                let result = await executeAsync(superadmin);
                if (result?.data) {
                    superadminTemp = result.data;
                }

                if (result.serverError || result.validationErrors) {
                    return;
                }

                setIsOpenState(false);
                onSaved && onSaved(superadminTemp);

            }}>
                <ModalHeader>
                    <ModalTitle>{isEdit ? "Modifier le superadmin" : "Créer un nouveau superadmin"}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="grid grid-cols-2 gap-2">
                        <Input 
                            errors={result.validationErrors?.firstname}
                            label="Prénom" 
                            value={superadmin.firstname} 
                            onChange={(e) => {
                                setSuperadmin({ ...superadmin, firstname: e.target.value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=""
                        />
                        <Input 
                            errors={result.validationErrors?.lastname}
                            label="Nom" 
                            value={superadmin.lastname} 
                            onChange={(e) => {
                                setSuperadmin({ ...superadmin, lastname: e.target.value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=""
                        />
                        <Input 
                            errors={result.validationErrors?.email}
                            label="Email" 
                            type="email"
                            value={superadmin.email} 
                            onChange={(e) => {
                                setSuperadmin({ ...superadmin, email: e.target.value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=""
                        />
                        <Input 
                            errors={result.validationErrors?.phone}
                            label="Téléphone" 
                            type="tel"
                            value={superadmin.phone || ""} 
                            onChange={(e) => {
                                setSuperadmin({ ...superadmin, phone: e.target.value });
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
})