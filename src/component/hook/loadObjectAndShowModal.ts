import { useState } from "react";

export interface LoadObjectAndShowModalRef<T> {
    loadFromId: (id: number) => Promise<void>;
    loadFromObject: (entity: T) => void;
    createNew: () => void;
}

export interface loadObjectAndShowModalObjectProps<T> {
    initialObject: T | null;
    isOpen: boolean;
    showErrorsBase : boolean;
    emptyObject: T;
    setDefaultValues?: (object: T) => T;

}

export function loadObjectAndShowModal<T>({ initialObject, isOpen, showErrorsBase, emptyObject, setDefaultValues }: loadObjectAndShowModalObjectProps<T>) {
    const [isEdit, setIsEdit] = useState(!!initialObject);
    if (initialObject == null) {
        initialObject = emptyObject;
    }

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