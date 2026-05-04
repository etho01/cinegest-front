import { Role, RoleEmpty } from "@/src/domain/User";
import { forwardRef, useImperativeHandle } from "react";
import { useLoadObjectAndShowModalUpdate } from "../hook/useLoadObjectAndShowModalUpdate";
import { addOrUpdateRoleController } from "@/src/controller/app/RoleController";
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "../ui/modal";
import { Button } from "../ui/btn/button";
import Input from "../ui/form/Input";
import { SelectMultiple } from "../ui/form/Select";
import { ROLES } from "@/src/const/RolesConst";

interface RoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialObject: Role | null;
    onSaved?: (entity: Role) => void | Promise<void>;
    entityId?: number;
}

export const RoleModal = forwardRef(({ isOpen, initialObject, onSaved, entityId }: RoleModalProps, ref) => {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, loadFromObject, createNew, setObject, onSubmit, hasErrored, result } = useLoadObjectAndShowModalUpdate<Role>({
        initialObject: initialObject ? initialObject : null,
        isOpen: isOpen,
        showErrorsBase: false,
        emptyObject: RoleEmpty,
        action: addOrUpdateRoleController,
        onSaved: onSaved,
        customData: { entityId: parseInt(entityId + '') }
    });

    const loadFromId = async (id : number) => {
        const response = await fetch(`/api/${entityId}/roles/${id}`);
        const data = await response.json();
        loadFromObject(data);
    };

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
                    <ModalTitle>{isEdit ? "Modifier le rôle" : "Créer un nouveau rôle"}</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <div className="grid gap-2">
                        <Input 
                            errors={result.validationErrors?.name}
                            label="Nom" 
                            value={object.name} 
                            onChange={(value) => {
                                setObject({ ...object, name: value });
                            }} 
                            required
                            showErrors={showErrors}
                            containerClassName=""
                        />
                        <SelectMultiple
                            errors={result.validationErrors?.country}
                            label="Pays"
                            value={object.rights}
                            onChange={(value) => {
                                setObject({ ...object, rights: value });
                            }}
                            required
                            showErrors={showErrors}
                            containerClassName=""
                            options={ROLES.cinema ? Object.keys(ROLES.cinema).map(key => ({ value: key, label: ROLES.cinema[key].name })) : []}
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

RoleModal.displayName = 'RoleModal';