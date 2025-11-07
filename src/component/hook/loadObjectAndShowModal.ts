import { useState } from "react";

export interface LoadObjectAndShowModalRef<T> {
    loadFromId: (id: number) => Promise<void>;
    loadFromObject: (entity: T) => void;
    createNew: () => void;
}

export interface loadObjectAndShowModalObjectProps<T> {
    initialEntity: T | null;
    isOpen: boolean;
    showErrorsBase : boolean;
    emptyObject: T;

}

export function loadObjectAndShowModal<T>({ initialEntity, isOpen, showErrorsBase, emptyObject }: loadObjectAndShowModalObjectProps<T>) {
    const [isEdit, setIsEdit] = useState(!!initialEntity);
    if (initialEntity == null) {
        initialEntity = emptyObject;
    }

    const [entity, setEntity] = useState<T>(initialEntity);
    const [isOpenState, setIsOpenState] = useState(isOpen);
    const [showErrors, setShowErrors] = useState(showErrorsBase);


    const loadFromObject = async (entity: T) => {
        setEntity(entity);
        setIsEdit(true);
        setIsOpenState(true);
        setShowErrors(false);
    }

    const createNew = () => {
        setEntity(emptyObject);
        setIsEdit(false);
        setIsOpenState(true);
        setShowErrors(false);
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
        setEntity
    };
}