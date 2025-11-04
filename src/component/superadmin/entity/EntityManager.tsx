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

interface PropsFetchEntities {
    initialData : Paginator<Entity>;
    initialParams?: Record<string, any>;
}

export default function EntityManager({ initialData, initialParams }: PropsFetchEntities) {
    const paginationRef = useRef<PaginationTabRef>(null);
    const modelRef = useRef(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);

    return (
        <div className="bg-white shadow px-0 sm:px-6 py-3 rounded-lg mb-5 mx-auto">
            <div className="flex justify-between">
                <Input 
                    label="Rechercher une entité" 
                    placeholder="Rechercher une entité" 
                    onChange={(e) => {
                        paginationRef.current?.updateParam("search", e.target.value);
                    }} 
                />
                <Button 
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => modelRef.current?.createNew()}
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
                            <Button onClick={() => modelRef.current?.loadFromEntity(item)}
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
                                        }
                                    );
                                }}
                            >
                                Supprimer
                            </Button>
                        </td>
                    </>
                )} 
                colList={["Name", ""]} 
            />
            <EntityModal 
                onSaved={(entity) => {console.log('d'); paginationRef.current?.refresh();}} 
                ref={modelRef} 
                isOpen={false} 
                onClose={() => {}} 
                initialEntity={null} 
            />
            <ConfirmationModal ref={confirmationModalRef} />
        </div>
    )
}