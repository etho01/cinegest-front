"use client";
import { useLoadObjectAndShowModalRef } from "@/src/component/hook/useLoadObjectAndShowModal";
import { Button } from "@/src/component/ui/btn/button";
import Card from "@/src/component/ui/card";
import Input from "@/src/component/ui/form/Input";
import { Select } from "@/src/component/ui/form/Select";
import { ConfirmationModal, ConfirmationModalRef } from "@/src/component/ui/modal/ConfirmationModal";
import { PaginationTab, PaginationTabRef } from "@/src/component/ui/pagination/PaginationTab";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Td } from "@/src/component/ui/table/Table";
import { deleteOptionController } from "@/src/controller/app/Cinema/Settings/OptionController";
import { Option } from "@/src/domain/Cinema/Settings/Option";
import { OptionType } from "@/src/domain/Cinema/Settings/OptionTypes";
import { useRef } from "react";
import { OptionModal } from "./OptionModal";
import { User, UserHasRight } from "@/src/domain/User";


interface PropsFetchOptionsTypes {
    initialData : Paginator<Option>;
    initialParams?: {
        search?: string;
        page?: number;
        optionTypes?: number[];
    };
    entityId: number;
    cinemaId: number;
    allOptionsTypes: OptionType[];
    user: User;
}

export const OptionManager = ({ initialData, initialParams, entityId, cinemaId, allOptionsTypes, user }: PropsFetchOptionsTypes) => {
    const paginationRef = useRef<PaginationTabRef>(null);
    const modalRef = useRef<useLoadObjectAndShowModalRef<Option>>(null);
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
                    <Select 
                        label="Filtrer par type d'option"
                        placeholder="Filtrer par type d'option"
                        onChange={(value) => {
                            const optionTypes = value ? value.map((id: string) => Number(id)) : undefined;
                            paginationRef.current?.updateParam("optionTypes", optionTypes);
                        }}
                        isMulti={true}
                        options={allOptionsTypes.map((type) => ({
                            label: type.name,
                            value: type.id.toString(),
                        }))}
                        initialValue={initialParams?.optionTypes ? initialParams.optionTypes.map((id) => id.toString()) : []}
                    />
                </div>
                {UserHasRight(user, 'editOptions', cinemaId) && (
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
                endpoint={`api/${entityId}/cinema/${cinemaId}/settings/option`} 
                ref={paginationRef} 
                lineRenderer={(item : Option) => (
                    <>
                        <Td >{item.name}</Td>
                        <Td>{item.type?.name}</Td>
                        <Td>{item.price} €</Td>
                        <Td className="text-right">
                            {UserHasRight(user, 'editOptions', cinemaId) && (
                            <Button onClick={() => modalRef.current?.loadFromObject(item)}
                                variant="outline"
                            >
                                Modifier
                            </Button>
                            )}
                            {UserHasRight(user, 'editOptions', cinemaId) && (
                            <Button className="ml-2"
                                variant="remove"
                                onClick={() => {
                                    confirmationModalRef.current?.open(
                                        "Confirmer la suppression",
                                        `Êtes-vous sûr de vouloir supprimer l'option "${item.name}" ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            await deleteOptionController({ entityId : parseInt(entityId + ''), cinemaId : parseInt(cinemaId + ''), optionId: item.id });
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
                colList={["Nom", ""]} 
            />
            <ConfirmationModal ref={confirmationModalRef} />
            <OptionModal
                entityId={entityId} 
                cinemaId={cinemaId}
                isOpen={false} 
                ref={modalRef} 
                onSaved={() => {
                    paginationRef.current?.refresh();
                }} 
                onClose={function (): void {} } 
                initialObject={null} 
                allOptionsTypes={allOptionsTypes}
            />
        </Card>
    );
}