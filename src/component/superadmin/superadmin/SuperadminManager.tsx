"use client"
import { Button } from "../../ui/btn/button";
import Card from "../../ui/card";
import Input from "../../ui/form/Input";
import { PaginationTab, PaginationTabRef } from "../../ui/pagination/PaginationTab";
import { ConfirmationModal, ConfirmationModalRef } from "../../ui/modal/ConfirmationModal";
import { Superadmin } from "@/src/domain/superadmin";
import { Paginator } from "../../ui/pagination/PaginationType";
import { useRef } from "react";
import { SuperadminModal } from "./SuperadminModal";
import { deleteSuperadminController } from "@/src/controller/app/SuperadminController";
import { useLoadObjectAndShowModalRef } from "../../hook/useLoadObjectAndShowModal";

interface PropsFetchEntities {
    initialData : Paginator<Superadmin>;
    initialParams?: Record<string, any>;
}

export default function SuperadminManager({ initialData, initialParams }: PropsFetchEntities) {
    const paginationRef = useRef<PaginationTabRef>(null);
    const modalRef = useRef<useLoadObjectAndShowModalRef<Superadmin>>(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);
    
    return (
        <Card>
            <div className="flex justify-between">
                <Input 
                    label="Rechercher un superadmin" 
                    placeholder="Rechercher un superadmin" 
                    onChange={(value) => {
                        paginationRef.current?.updateParam("search", value);
                    }} 
                    initialValue={initialParams?.search || ""}
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
                endpoint="api/superadmin" 
                ref={paginationRef} 
                lineRenderer={(item : Superadmin) => (
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
                            <Button onClick={() => modalRef.current?.loadFromObject(item)}
                                variant="outline"
                            >
                                Modifier
                            </Button>
                            <Button className="ml-2"
                                variant="remove"
                                onClick={() => {
                                    confirmationModalRef.current?.open(
                                        "Confirmer la suppression",
                                        `Êtes-vous sûr de vouloir supprimer le superadmin "${item.firstname} ${item.lastname}" ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            await deleteSuperadminController({ id: item.id });
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
            <SuperadminModal 
                onSaved={() => {paginationRef.current?.refresh();}} 
                ref={modalRef} 
                isOpen={false} 
                onClose={() => {}} 
                initialObject={null} 
            />
            <ConfirmationModal ref={confirmationModalRef} />
        </Card>
    );
}