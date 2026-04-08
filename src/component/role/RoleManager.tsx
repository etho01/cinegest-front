"use client";
import { Role, User, UserHasRight } from "@/src/domain/User";
import { Paginator } from "../ui/pagination/PaginationType";
import Card from "../ui/card";
import Input from "../ui/form/Input";
import { Button } from "../ui/btn/button";
import { PaginationTab, PaginationTabRef } from "../ui/pagination/PaginationTab";
import { ConfirmationModal, ConfirmationModalRef } from "../ui/modal/ConfirmationModal";
import { useLoadObjectAndShowModalRef } from "../hook/useLoadObjectAndShowModal";
import { useRef } from "react";
import { deleteRoleController } from "@/src/controller/app/RoleController";
import { RoleModal } from "./RoleModal";

interface PropsFetchRoles {
    initialData : Paginator<Role>;
    initialParams?: {
        search?: string;
        page?: number;
    };
    entityId: number;
    user: User;
}

export const RoleManager = ({ initialData, initialParams, entityId, user }: PropsFetchRoles) => {
    const paginationRef = useRef<PaginationTabRef>(null);
    const modalRef = useRef<useLoadObjectAndShowModalRef<Role>>(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);

    return (
        <Card>
            <div className="flex justify-between">
                <Input 
                    label="Rechercher un rôle"
                    placeholder="Rechercher un rôle"
                    onChange={(value) => {
                        paginationRef.current?.updateParam("search", value);
                    }} 
                    initialValue={initialParams?.search || ""}
                />
                {UserHasRight(user, 'addRole', null) && (
                    <Button
                        className="mt-auto" 
                        variant="default" 
                        onClick={() => modalRef.current?.createNew()}
                    >
                        Créer un rôle
                    </Button>
                )}
            </div>
            <PaginationTab 
                initialData={initialData}
                initialParams={initialParams}
                endpoint={`api/${entityId}/roles`}
                ref={paginationRef}
                lineRenderer={(item : Role) => (
                    <>
                        <td className="py-2 px-1">{item.name}</td>
                        <td className="py-2 px-1 text-right">
                            {UserHasRight(user, 'editRole', null) && (
                                <Button onClick={() => modalRef.current?.loadFromId(item.id)}
                                    variant="outline"
                                >
                                    Modifier
                                </Button>
                            )}
                            {UserHasRight(user, 'deleteRole', null) && (
                            <Button className="ml-2"
                                variant="remove"
                                onClick={() => {
                                    confirmationModalRef.current?.open(
                                        "Confirmer la suppression",
                                        `Êtes-vous sûr de vouloir supprimer le rôle "${item.name}" ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            await deleteRoleController({ entityId: parseInt(entityId + ''), roleId: item.id });
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
            <RoleModal 
                entityId={entityId} 
                isOpen={false} 
                ref={modalRef} 
                onSaved={() => {
                    paginationRef.current?.refresh();
                }} 
                onClose={function (): void {} } 
                initialObject={null} 
            />
            <ConfirmationModal ref={confirmationModalRef} />
        </Card>
    );
}