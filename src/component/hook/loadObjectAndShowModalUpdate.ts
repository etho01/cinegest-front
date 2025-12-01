import { HookSafeActionFn, useAction } from "next-safe-action/hooks";
import { loadObjectAndShowModal, loadObjectAndShowModalObjectProps } from "./loadObjectAndShowModal";

interface LoadObjectAndShowModalUpdateProps<T> extends loadObjectAndShowModalObjectProps<T> {
    action: HookSafeActionFn<any, any, any, any>;
    onSaved?: (entity: T) => void | Promise<void>;
    customData?: any;
    customDataFunc?: (object: T) => any;
}

export function loadObjectAndShowModalUpdate<T>({ initialObject, isOpen, showErrorsBase, emptyObject, action, onSaved, customData, setDefaultValues, customDataFunc }: LoadObjectAndShowModalUpdateProps<T>) {
    const { isEdit, object, isOpenState, showErrors, setIsOpenState, setShowErrors, loadFromObject, createNew, setObject } = loadObjectAndShowModal<T>({
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
        let result = await executeAsync(formData);
        if (result?.data) {
            objectTemp = result.data;
        }

        if (result.serverError || result.validationErrors) {
            return;
        }

        setIsOpenState(false);
        onSaved && onSaved(objectTemp);
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