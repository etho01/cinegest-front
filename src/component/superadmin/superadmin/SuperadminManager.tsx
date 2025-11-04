"use client"
import { Button } from "../../ui/btn/button";
import Card from "../../ui/card";
import Input from "../../ui/form/Input";
import { PaginationTab, PaginationTabRef } from "../../ui/pagination/PaginationTab";
import { ConfirmationModal, ConfirmationModalRef } from "../../ui/modal/ConfirmationModal";
import { Superadmin } from "@/src/domain/superadmin";
import { Paginator } from "../../ui/pagination/PaginationType";
import { useRef } from "react";
import { EntityModal } from "../entity/EntityModal";

interface PropsFetchEntities {
    initialData : Paginator<Superadmin>;
    initialParams?: Record<string, any>;
}

export default function SuperadminManager({ initialData, initialParams }: PropsFetchEntities) {
    const paginationRef = useRef<PaginationTabRef>(null);
    const modalRef = useRef(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);
    
    return (
        <Card>
            <div className="flex justify-between">
                <Input 
                    label="Rechercher un superadmin" 
                    placeholder="Rechercher un superadmin" 
                    onChange={(e) => {
                        paginationRef.current?.updateParam("search", e.target.value);
                    }} 
                />
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => modalRef.current?.createNew()}
                >
                    Créer un superadmin
                </Button>
            </div>
            <PaginationTab 
                initialData={initialData} 
                initialParams={initialParams} 
                endpoint="api/entity" 
                ref={paginationRef} 
                lineRenderer={(item : Superadmin, index) => (
                    <>
                        <td className="py-2 px-1">
                            {item.firstname} {item.lastname}
                        </td>
                        <td className="py-2 px-1">
                            {item.email}
                        </td>
                        <td className="py-2 px-1">
                            {item.phone ?? "Pas de téléphone"}
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
                                        }
                                    );
                                }}
                            >
                                Supprimer
                            </Button>
                        </td>
                    </>
                )} 
                colList={["Nom", "Email", "Téléphone", ""]} 
            />
            <EntityModal 
                onSaved={(entity) => {console.log('d'); paginationRef.current?.refresh();}} 
                ref={modalRef} 
                isOpen={false} 
                onClose={() => {}} 
                initialEntity={null} 
            />
            <ConfirmationModal ref={confirmationModalRef} />
        </Card>
    );
}