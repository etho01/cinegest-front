"use client";
import { useLoadObjectAndShowModalRef } from "@/src/component/hook/useLoadObjectAndShowModal";
import { Button } from "@/src/component/ui/btn/button";
import Card from "@/src/component/ui/card";
import Input from "@/src/component/ui/form/Input";
import { ConfirmationModal, ConfirmationModalRef } from "@/src/component/ui/modal/ConfirmationModal";
import { PaginationTab, PaginationTabRef } from "@/src/component/ui/pagination/PaginationTab";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { deleteStorageTypeController } from "@/src/controller/app/Cinema/Settings/StorageTypeController";
import { StorageType } from "@/src/domain/Cinema/Settings/StorageType";
import { useRef } from "react";
import { StorageTypeModal } from "./StorageTypeModal";
import { User, UserHasRight } from "@/src/domain/User";

interface PropsFetchStorageTypes {
    initialData : Paginator<StorageType>;
    initialParams?: {
        search?: string;
        page?: number;
    };
    entityId: number;
    cinemaId: number;
    user: User;
}

export const StorageTypeManager = ({ initialData, initialParams, entityId, cinemaId, user }: PropsFetchStorageTypes) => {
    const paginationRef = useRef<PaginationTabRef>(null);
    const modalRef = useRef<useLoadObjectAndShowModalRef<StorageType>>(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);

    return (
        <Card>
            <div className="flex justify-between">
                <Input 
                    label="Rechercher un type de stockage" 
                    placeholder="Rechercher un type de stockage" 
                    onChange={(value) => {
                        paginationRef.current?.updateParam("search", value);
                    }} 
                    initialValue={initialParams?.search || ""}
                />
                {UserHasRight(user, 'editStorageTypes', cinemaId) && (
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => modalRef.current?.createNew()}
                >
                    Créer un type de stockage
                </Button>
                )}
            </div>
            <PaginationTab 
                initialData={initialData} 
                initialParams={initialParams} 
                endpoint={`api/${entityId}/cinema/${cinemaId}/settings/storage-type`} 
                ref={paginationRef} 
                lineRenderer={(item : StorageType) => (
                    <>
                        <td className="py-2 px-1">{item.name}</td>
                        <td className="py-2 px-1 text-right">
                            {UserHasRight(user, 'editStorageTypes', cinemaId) && (
                            <Button onClick={() => modalRef.current?.loadFromObject(item)}
                                variant="outline"
                            >
                                Modifier
                            </Button>
                            )}
                            {UserHasRight(user, 'editStorageTypes', cinemaId) && (
                            <Button className="ml-2"
                                variant="remove"
                                onClick={() => {
                                    confirmationModalRef.current?.open(
                                        "Confirmer la suppression",
                                        `Êtes-vous sûr de vouloir supprimer le type de stockage "${item.name}" ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            await deleteStorageTypeController({ entityId : parseInt(entityId + ''), cinemaId : parseInt(cinemaId + ''), storageTypeId: item.id });
                                            paginationRef.current?.refresh();
                                        }
                                    );
                                }}
                            >
                                Supprimer
                            </Button>
                            )}
                        </td>
                    </>
                )} 
                colList={["Nom", ""]} 
            />
            <ConfirmationModal ref={confirmationModalRef} />
            <StorageTypeModal
                entityId={entityId} 
                cinemaId={cinemaId}
                isOpen={false} 
                ref={modalRef} 
                onSaved={() => {
                    paginationRef.current?.refresh();
                }} 
                onClose={function (): void {} } 
                initialObject={null} 
            />
        </Card>
    );
}