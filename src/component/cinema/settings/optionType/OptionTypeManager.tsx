"use client";
import { LoadObjectAndShowModalRef } from "@/src/component/hook/loadObjectAndShowModal";
import { Button } from "@/src/component/ui/btn/button";
import Card from "@/src/component/ui/card";
import Input from "@/src/component/ui/form/Input";
import { ConfirmationModal, ConfirmationModalRef } from "@/src/component/ui/modal/ConfirmationModal";
import { PaginationTab, PaginationTabRef } from "@/src/component/ui/pagination/PaginationTab";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { deleteOptionTypeController } from "@/src/controller/app/Cinema/Settings/OptionTypesController";
import { OptionType } from "@/src/domain/Cinema/Settings/OptionTypes";
import { useRef } from "react";
import { OptionTypeModal } from "./OptionTypeModal";
import { User, UserHasRight } from "@/src/domain/User";

interface PropsFetchOptionsTypes {
    initialData : Paginator<OptionType>;
    initialParams?: {
        search?: string;
        page?: number;
    };
    entityId: number;
    cinemaId: number;
    user: User;
}

export const OptionTypeManager = ({ initialData, initialParams, entityId, cinemaId, user }: PropsFetchOptionsTypes) => {
    const paginationRef = useRef<PaginationTabRef>(null);
    const modalRef = useRef<LoadObjectAndShowModalRef<OptionType>>(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);

    return (
        <Card>
            <div className="flex justify-between">
                <Input 
                    label="Rechercher un type d'option" 
                    placeholder="Rechercher un type d'option" 
                    onChange={(value) => {
                        paginationRef.current?.updateParam("search", value);
                    }} 
                    initialValue={initialParams?.search || ""}
                />
                {UserHasRight(user, 'editOptionsTypes', cinemaId) && (
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => modalRef.current?.createNew()}
                >
                    Créer un type d'option
                </Button>
                )}
            </div>
            <PaginationTab 
                initialData={initialData} 
                initialParams={initialParams} 
                endpoint={`api/${entityId}/cinema/${cinemaId}/settings/option-types`} 
                ref={paginationRef} 
                lineRenderer={(item : OptionType, index) => (
                    <>
                        <td className="py-2 px-1">{item.name}</td>
                        <td className="py-2 px-1 text-right">
                            {UserHasRight(user, 'editOptionsTypes', cinemaId) && (
                            <Button onClick={() => modalRef.current?.loadFromObject(item)}
                                variant="outline"
                            >
                                Modifier
                            </Button>
                            )}
                            {UserHasRight(user, 'editOptionsTypes', cinemaId) && (
                            <Button className="ml-2"
                                variant="remove"
                                onClick={() => {
                                    confirmationModalRef.current?.open(
                                        "Confirmer la suppression",
                                        `Êtes-vous sûr de vouloir supprimer le type d'option "${item.name}" ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            await deleteOptionTypeController({ entityId : parseInt(entityId + ''), cinemaId : parseInt(cinemaId + ''), optionTypeId: item.id });
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
            <OptionTypeModal
                entityId={entityId} 
                cinemaId={cinemaId}
                isOpen={false} 
                ref={modalRef} 
                onSaved={(optionType) => {
                    paginationRef.current?.refresh();
                }} 
                onClose={function (): void {} } 
                initialObject={null} 
            />
        </Card>
    );
}