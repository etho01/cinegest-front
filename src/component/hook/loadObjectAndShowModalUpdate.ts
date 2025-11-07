import { HookSafeActionFn, useAction } from "next-safe-action/hooks";
import { loadObjectAndShowModal, loadObjectAndShowModalObjectProps } from "./loadObjectAndShowModal";

interface LoadObjectAndShowModalUpdateProps<T> extends loadObjectAndShowModalObjectProps<T> {
    action: HookSafeActionFn<any, any, any, any>;
    onSaved?: (entity: T) => void | Promise<void>;
    customData?: any;
}

export function loadObjectAndShowModalUpdate<T>({ initialEntity, isOpen, showErrorsBase, emptyObject, action, onSaved, customData }: LoadObjectAndShowModalUpdateProps<T>) {
    const { isEdit, entity, isOpenState, showErrors, setIsOpenState, setShowErrors, loadFromObject, createNew, setEntity } = loadObjectAndShowModal<T>({
        initialEntity,
        isOpen,
        showErrorsBase,
        emptyObject
    });

    const { executeAsync, hasErrored, result, input } = useAction(action)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowErrors(true);
        let entityTemp = entity;
        console.log("Submitting entity:", entityTemp, customData);
        let formData = entity;
        if (customData) {
            formData = { ...entity, ...customData };
        }
        let result = await executeAsync(formData);
        if (result?.data) {
            entityTemp = result.data;
        }

        if (result.serverError || result.validationErrors) {
            return;
        }

        setIsOpenState(false);
        onSaved && onSaved(entityTemp);
    }

    return {
        isEdit,
        entity,
        isOpenState,
        showErrors,
        setIsOpenState,
        setShowErrors,
        loadFromObject,
        createNew,
        setEntity,
        onSubmit,
        hasErrored,
        result,
        input
    };
}