"use client";
import { useRef } from "react";
import { Button } from "../ui/btn/button";
import { PaginationTab, PaginationTabRef } from "../ui/pagination/PaginationTab";
import { ConfirmationModal, ConfirmationModalRef } from "../ui/modal/ConfirmationModal";
import Card from "../ui/card";
import Input from "../ui/form/Input";
import { Paginator } from "../ui/pagination/PaginationType";
import { Cinema } from "@/src/domain/Cinema";
import { CinemaModal } from "./CinemaModal";
import { LoadObjectAndShowModalRef } from "../hook/loadObjectAndShowModal";

interface PropsFetchEntities {
    initialData : Paginator<Cinema>;
    initialParams?: {
        search?: string;
        page?: number;
        entityId?: number;
    };
}

export const CinemaManager = ({ initialData, initialParams }: PropsFetchEntities) => {
    const paginationRef = useRef<PaginationTabRef>(null);
    const modalRef = useRef<LoadObjectAndShowModalRef<Cinema>>(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);

    return (
        <Card>
            <div className="flex justify-between">
                <Input 
                    label="Rechercher un cinema" 
                    placeholder="Rechercher un cinema" 
                    onChange={(e) => {
                        paginationRef.current?.updateParam("search", e.target.value);
                    }} 
                />
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => modalRef.current?.createNew()}
                >
                    Créer un cinema
                </Button>
            </div>
            <PaginationTab 
                initialData={initialData} 
                initialParams={initialParams} 
                endpoint={`api/${initialParams?.entityId}/cinema`} 
                ref={paginationRef} 
                lineRenderer={(item : Cinema, index) => (
                    <>
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
                                        `Êtes-vous sûr de vouloir supprimer le cinéma "${item.name}" ? Cette action est irréversible.`,
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
            <ConfirmationModal ref={confirmationModalRef} />
            <CinemaModal entityId={initialParams?.entityId} isOpen={false} ref={modalRef} onSaved={(cinema) => {
                paginationRef.current?.refresh();
            } } onClose={function (): void {
            } } initialEntity={null} />
        </Card>
    );
}