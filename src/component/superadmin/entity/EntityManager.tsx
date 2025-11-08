"use client";
import { Entity } from "@/src/domain/Entity";
import { Paginator } from "../../ui/pagination/PaginationType";
import { PaginationTab, PaginationTabRef } from "../../ui/pagination/PaginationTab";
import { useRef } from "react";
import Input from "../../ui/form/Input";
import { EntityModal } from "./EntityModal";
import { Button } from "../../ui/btn/button";
import { ConfirmationModal, ConfirmationModalRef } from "../../ui/modal/ConfirmationModal";
import { deleteEntityController } from "@/src/controller/app/EntityController";
import Card from "../../ui/card";

interface PropsFetchEntities {
    initialData : Paginator<Entity>;
    initialParams?: Record<string, any>;
}

export default function EntityManager({ initialData, initialParams }: PropsFetchEntities) {
    const paginationRef = useRef<PaginationTabRef>(null);
    const modalRef = useRef(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);

    return (
        <Card>
            <div className="flex justify-between">
                <Input 
                    label="Rechercher une entité" 
                    placeholder="Rechercher une entité" 
                    onChange={(value) => {
                        paginationRef.current?.updateParam("search", value);
                    }} 
                />
                <Button 
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => modalRef.current?.createNew()}
                >
                    Créer une entité
                </Button>
            </div>
            <PaginationTab 
                initialData={initialData} 
                initialParams={initialParams} 
                endpoint="api/entity" 
                ref={paginationRef} 
                lineRenderer={(item : Entity, index) => (
                    <>
                        <td className="py-2 px-1">
                            {item.name}
                        </td>
                        <td className="py-2 px-1 text-right">
                            <Button onClick={() => modalRef.current?.loadFromEntity(item)}
                                variant="outline"
                            >
                                Modifier
                            </Button>
                            <Button className="ml-2"
                                variant="remove"
                                onClick={() => {
                                    confirmationModalRef.current?.open(
                                        "Confirmer la suppression",
                                        `Êtes-vous sûr de vouloir supprimer l'entité "${item.name}" ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            await deleteEntityController({ id: item.id });
                                            paginationRef.current?.refresh();
                                            location.reload();
                                        }
                                    );
                                }}
                            >
                                Supprimer
                            </Button>
                        </td>
                    </>
                )} 
                colList={["Nom", ""]} 
            />
            <EntityModal 
                onSaved={(entity) => {location.reload(); paginationRef.current?.refresh();}} 
                ref={modalRef} 
                isOpen={false} 
                onClose={() => {}} 
                initialEntity={null} 
            />
            <ConfirmationModal ref={confirmationModalRef} />
        </Card>
    )
}