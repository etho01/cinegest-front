"use client";
import { CinemaApi } from "@/src/domain/CinemaApi";
import { Paginator } from "../ui/pagination/PaginationType";
import { User, UserHasRight } from "@/src/domain/User";
import { Cinema } from "@/src/domain/Cinema";
import { PaginationTab, PaginationTabRef } from "../ui/pagination/PaginationTab";
import { LoadObjectAndShowModalRef } from "../hook/loadObjectAndShowModal";
import { useRef } from "react";
import { ConfirmationModal, ConfirmationModalRef } from "../ui/modal/ConfirmationModal";
import Card from "../ui/card";
import { Input, Select } from "../ui/form";
import { Button, LinkButton } from "../ui/btn/button";
import { Td } from "../ui/table/Table";
import { CinemaApiModal } from "./CinemaApiModal";
import { deleteCinemaApiController } from "@/src/controller/app/CinemaApiController";


interface PropsFetchCinemaApis {
    initialData : Paginator<CinemaApi>;
    initialParams?: {
        search?: string;
        page?: number;
        cinemaIds?: number[];
    };
    entityId: number;
    user: User;
    cinemas: Cinema[];
}

export const CinemaApiManager = ({ initialData, initialParams, entityId, user, cinemas }: PropsFetchCinemaApis) => {
    const paginationRef = useRef<PaginationTabRef>(null);
    const modalRef = useRef<LoadObjectAndShowModalRef<CinemaApi>>(null);
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
                        label="Filtrer par cinéma"
                        placeholder="Filtrer par cinéma"
                        onChange={(value) => {
                            const cinemaIds = value ? value.map((id: string) => Number(id)) : undefined;
                            paginationRef.current?.updateParam("cinemaIds", cinemaIds);
                        }}
                        isMulti={true}
                        options={cinemas.map((cinema) => ({
                            label: cinema.name,
                            value: cinema.id.toString(),
                        }))}
                        initialValue={initialParams?.cinemaIds ? initialParams.cinemaIds.map((id) => id.toString()) : []}
                    />
                </div>
                {UserHasRight(user, 'editCinemaApi', null) && (
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => modalRef.current?.createNew()}
                >
                    Créer une api
                </Button>
                )}
            </div>
            <PaginationTab 
                initialData={initialData} 
                initialParams={initialParams} 
                endpoint={`api/${entityId}/cinemaApi/`} 
                ref={paginationRef} 
                lineRenderer={(item : CinemaApi) => (
                    <>
                        <Td >{item.name}</Td>
                        <Td >{item.cinemas?.map(cinema => cinema.name).join(', ')}</Td>
                        <Td >{item.apiKey}</Td>
                        
                        <Td className="text-right">
                            {UserHasRight(user, 'editCinemaApi', null) && (
                                <LinkButton 
                                    href={`/app/${entityId}/cinemaApi/${item.id}`}
                                    variant="outline"
                                >
                                    Voir / Éditer
                                </LinkButton>
                            )}
                            {UserHasRight(user, 'editCinemaApi', null) && (
                            <Button className="ml-2"
                                variant="remove"
                                onClick={() => {
                                    confirmationModalRef.current?.open(
                                        "Confirmer la suppression",
                                        `Êtes-vous sûr de vouloir supprimer l'option "${item.name}" ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            await deleteCinemaApiController({ entityId : parseInt(entityId + ''), cinemaApiId : parseInt(item.id + '') });
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
                colList={["Nom", "Cinema", "Clé api", ""]} 
            />
            <ConfirmationModal   ref={confirmationModalRef} />
            <CinemaApiModal
                entityId={entityId} 
                isOpen={false} 
                ref={modalRef} 
                onSaved={() => {
                    paginationRef.current?.refresh();
                }} 
                onClose={function (): void {} } 
                initialObject={null} 
                cinemas={cinemas}
            />
        </Card>
    );
}