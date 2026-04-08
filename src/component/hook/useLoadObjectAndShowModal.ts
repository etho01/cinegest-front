import { useState } from "react";

export interface useLoadObjectAndShowModalRef<T> {
    loadFromId: (id: number) => Promise<void>;
    loadFromObject: (entity: T) => void;
    createNew: () => void;
}

export interface useLoadObjectAndShowModalObjectProps<T> {
    initialObject: T | null;
    isOpen: boolean;
    showErrorsBase : boolean;
    emptyObject: T;
    setDefaultValues?: (object: T) => T;

}

export function useLoadObjectAndShowModal<T>({ initialObject, isOpen, showErrorsBase, emptyObject, setDefaultValues }: useLoadObjectAndShowModalObjectProps<T>) {
    if (initialObject == null) {
        initialObject = emptyObject;
    }
    const [isEdit, setIsEdit] = useState(!!initialObject);

    const [object, setObject] = useState<T>(initialObject);
    const [isOpenState, setIsOpenState] = useState(isOpen);
    const [showErrors, setShowErrors] = useState(showErrorsBase);


    const loadFromObject = async (object: T) => {
        if (setDefaultValues) {
            object = setDefaultValues(object);
        }
        setObject(object);
        setIsEdit(true);
        setIsOpenState(true);
        setShowErrors(false);
    }

    const createNew = () => {
        setObject(emptyObject);
        setIsEdit(false);
        setIsOpenState(true);
        setShowErrors(false);
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
        setObject
    };
}