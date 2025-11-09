"use client";

import { User } from "@/src/domain/User";
import { Paginator } from "../ui/pagination/PaginationType";
import { ConfirmationModal, ConfirmationModalRef } from "../ui/modal/ConfirmationModal";
import { PaginationTab, PaginationTabRef } from "../ui/pagination/PaginationTab";
import { LoadObjectAndShowModalRef } from "../hook/loadObjectAndShowModal";
import { useRef } from "react";
import Card from "../ui/card";
import Input from "../ui/form/Input";
import { Button, LinkButton } from "../ui/btn/button";
import { UserCreationModal } from "./userCreationModal";

interface PropsFetchEntities {
    initialData? : Paginator<User>;
    initialParams?: {
        search?: string;
        page?: number;
    };
    entityId: number;
}

export const UserManager = ({ initialData, initialParams, entityId }: PropsFetchEntities) => {
    const paginationRef = useRef<PaginationTabRef>(null);
    const modalRef = useRef<LoadObjectAndShowModalRef<User>>(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);

    return (
        <Card>
            <div className="flex justify-between">
                <Input 
                    label="Rechercher un utilisateur" 
                    placeholder="Rechercher un utilisateur" 
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
                    Créer un utilisateur
                </Button>
            </div>
            <PaginationTab 
                initialData={initialData} 
                initialParams={initialParams} 
                endpoint={`api/${entityId}/user`} 
                ref={paginationRef} 
                lineRenderer={(item : User, index) => (
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
                            <LinkButton href={'/app/' + entityId + '/user/' + item.id}
                                variant="outline"
                            >
                                Modifier
                            </LinkButton>
                            <Button className="ml-2"
                                variant="remove"
                                onClick={() => {
                                    confirmationModalRef.current?.open(
                                        "Confirmer la suppression",
                                        `Êtes-vous sûr de vouloir supprimer l'utilisateur "${item.firstname} ${item.lastname}" ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            await deleteUserController({ entityId, userId: item.id });
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
            <UserCreationModal
                onSaved={(entity) => {paginationRef.current?.refresh();}} 
                ref={modalRef} 
                isOpen={false} 
                onClose={() => {}} 
                initialObject={null} 
                entityId={entityId}
            />
            <ConfirmationModal ref={confirmationModalRef} />
        </Card>
    );
};
