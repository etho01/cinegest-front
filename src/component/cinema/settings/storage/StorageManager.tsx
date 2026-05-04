"use client";
import { useLoadObjectAndShowModalRef } from "@/src/component/hook/useLoadObjectAndShowModal";
import { Button } from "@/src/component/ui/btn/button";
import Card from "@/src/component/ui/card";
import Input from "@/src/component/ui/form/Input";
import { SelectMultiple } from "@/src/component/ui/form/Select";
import { ConfirmationModal, ConfirmationModalRef } from "@/src/component/ui/modal/ConfirmationModal";
import { PaginationTab, PaginationTabRef } from "@/src/component/ui/pagination/PaginationTab";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Td } from "@/src/component/ui/table/Table";
import { deleteStorageController } from "@/src/controller/app/Cinema/Settings/StorageController";
import { Storage } from "@/src/domain/Cinema/Settings/Storage";
import { StorageType } from "@/src/domain/Cinema/Settings/StorageType";
import { useRef } from "react";
import { StorageModal } from "./StorageModal";
import { User, UserHasRight } from "@/src/domain/User";

interface PropsFetchStorageTypes {
    initialData : Paginator<Storage>;
    initialParams?: {
        search?: string;
        page?: number;
        storageTypes?: number[];
    };
    entityId: number;
    cinemaId: number;
    allStorageTypes: StorageType[];
    user: User;
}

export const StorageManager = ({ initialData, initialParams, entityId, cinemaId, allStorageTypes, user }: PropsFetchStorageTypes) => {
    const paginationRef = useRef<PaginationTabRef>(null);
    const modalRef = useRef<useLoadObjectAndShowModalRef<Storage>>(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);

    return (
        <Card>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <Input 
                        label="Rechercher une option" 
                        placeholder="Rechercher une option" 
                        onChange={(value) => {
                            paginationRef.current?.updateParam("search", value);
                        }} 
                        initialValue={initialParams?.search || ""}
                    />
                    <SelectMultiple
                        label="Filtrer par type d'option"
                        placeholder="Filtrer par type d'option"
                        onChange={(value) => {
                            const storageTypes = value ? value.map((id: string) => Number(id)) : undefined;
                            paginationRef.current?.updateParam("storageTypes", storageTypes);
                        }}
                        options={allStorageTypes.map((storageType) => ({
                            label: storageType.name,
                            value: storageType.id.toString(),
                        }))}
                        initialValue={initialParams?.storageTypes ? initialParams.storageTypes.map((id) => id.toString()) : []}
                    />
                </div>
                {UserHasRight(user, 'editStorage', cinemaId) && (
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => modalRef.current?.createNew()}
                >
                    Créer une option
                </Button>
                )}
            </div>
            <PaginationTab  
                initialData={initialData} 
                initialParams={initialParams} 
                endpoint={`api/${entityId}/cinema/${cinemaId}/settings/storage`} 
                ref={paginationRef} 
                lineRenderer={(item : Storage) => (
                    <>
                        <Td >{item.name}</Td>
                        <Td>{item.capacity}</Td>
                        <Td>{item.type?.name}</Td>
                        <Td className="text-right">
                            {UserHasRight(user, 'editStorage', cinemaId) && (
                            <Button onClick={() => modalRef.current?.loadFromObject(item)}
                                variant="outline"
                            >
                                Modifier
                            </Button>
                            )}
                            {UserHasRight(user, 'editStorage', cinemaId) && (
                            <Button className="ml-2"
                                variant="remove"
                                onClick={() => {
                                    confirmationModalRef.current?.open(
                                        "Confirmer la suppression",
                                        `Êtes-vous sûr de vouloir supprimer le stockage "${item.name}" ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            await deleteStorageController({ entityId : parseInt(entityId + ''), cinemaId : parseInt(cinemaId + ''), storageId: item.id });
                                            paginationRef.current?.refresh();
                                        }
                                    );
                                }}
                            >
                                Supprimer
                            </Button>
                            )}
                        </Td>
                    </>
                )} 
                colList={["Nom", 'Capacité (en terraoctets)', 'Type', ""]} 
            />
            <ConfirmationModal ref={confirmationModalRef} />
            <StorageModal
                entityId={entityId} 
                cinemaId={cinemaId}
                isOpen={false} 
                ref={modalRef} 
                onSaved={() => {
                    paginationRef.current?.refresh();
                }} 
                onClose={function (): void {} } 
                initialObject={null} 
                allStorageTypes={allStorageTypes}
            />
        </Card>
    );
}