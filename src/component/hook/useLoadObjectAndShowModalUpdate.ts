import { HookSafeActionFn, useAction } from "next-safe-action/hooks";
import { useLoadObjectAndShowModal, useLoadObjectAndShowModalObjectProps } from "./useLoadObjectAndShowModal";

interface useLoadObjectAndShowModalUpdateProps<T> extends useLoadObjectAndShowModalObjectProps<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    action: HookSafeActionFn<any, any, any, any>;
    onSaved?: (entity: T) => void | Promise<void>;
    customData?: unknown;
    customDataFunc?: (object: T) => T;
}

export function useLoadObjectAndShowModalUpdate<T>({ initialObject, isOpen, showErrorsBase, emptyObject, action, onSaved, customData, setDefaultValues, customDataFunc }: useLoadObjectAndShowModalUpdateProps<T>) {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, setShowErrors, loadFromObject, createNew, setObject } = useLoadObjectAndShowModal<T>({
        initialObject: initialObject ? initialObject : null,
        isOpen,
        showErrorsBase,
        emptyObject,
        setDefaultValues
    });

    const { executeAsync, hasErrored, result, input } = useAction(action)

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setShowErrors(true);
        let objectTemp = object;
        let formData = object;
        if (customDataFunc) {
            formData = customDataFunc(formData);
        }
        if (customData) {
            formData = { ...formData, ...customData };
        }
        const result = await executeAsync(formData);
        if (result?.data) {
            objectTemp = result.data;
        }

        if (result.serverError || result.validationErrors) {
            return;
        }

        setIsOpenState(false);
        if (onSaved) onSaved(objectTemp);
    }

    return {
        isEdit,
        object,
        isOpenState,
        showErrors,
        setIsOpenState,
        setShowErrors,
        loadFromObject,
        createNew,
        setObject,
        onSubmit,
        hasErrored,
        result,
        input
    };
}