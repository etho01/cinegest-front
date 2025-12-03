"use client";

import { LoadObjectAndShowModalRef } from "../../hook/loadObjectAndShowModal";
import { PaginationTab, PaginationTabRef } from "../../ui/pagination/PaginationTab";
import { ConfirmationModalRef } from "../../ui/modal/ConfirmationModal";
import { useRef } from "react";
import { Movie } from "@/src/domain/Cinema/Movie";
import { Paginator } from "../../ui/pagination/PaginationType";
import Card from "../../ui/card";
import { Button } from "../../ui/btn/button";
import { Select } from "../../ui/form/Select";
import Pagination from "../../ui/pagination/Pagination";
import { Td } from "../../ui/table/Table";
import { Key } from "@/src/domain/Cinema/Key";
import { AddKeyModal } from "./AddKeyModal";

interface PropsKeyManager {
    entityId: number;
    cinemaId: number;
    allActiveMovie?: Movie[];
    initialParams?: {
        page?: number;
        movies?: number[];
    };
    initialData?: Paginator<Key>;
}

export const KeyManager = ({ entityId, cinemaId, allActiveMovie, initialParams, initialData }: PropsKeyManager) => {
    const paginationRef = useRef<PaginationTabRef>(null);
    const addModalRef = useRef<LoadObjectAndShowModalRef<Key>>(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);
    
    return (
        <Card>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <Select
                        label="Filtrer par film"
                        placeholder="Filtrer par film"
                        onChange={(value) => {
                            const movies = value ? value.map((id: string) => Number(id)) : undefined;
                            paginationRef.current?.updateParam("movies", movies);
                        }}
                        isMulti={true}
                        options={allActiveMovie ? allActiveMovie.map((movie) => ({
                            label: movie.title,
                            value: movie.id.toString(),
                        })) : []}
                        initialValue={initialParams?.movies ? initialParams.movies.map((id) => id.toString()) : []}
                     />
                </div>
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => addModalRef.current?.createNew()}
                >
                    Ajouter des KDM
                </Button>
            </div>
            <PaginationTab 
                initialData={initialData} 
                initialParams={initialParams} 
                endpoint={`api/${entityId}/cinema/${cinemaId}/key`} 
                ref={paginationRef} 
                lineRenderer={(item : Key) => (
                    <>
                        <Td>{item.movieVersion?.movie?.title}</Td>
                        <Td>{item.movieVersion?.versionName}</Td>
                        <Td>{item.dateStart}</Td>
                        <Td>{item.dateEnd}</Td>
                        <Td className="text-right">
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
                                        `Êtes-vous sûr de vouloir supprimer la KDM" ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            
                                            paginationRef.current?.refresh();
                                        }
                                    );
                                }}
                            >
                                Supprimer
                            </Button>
                        </Td>
                    </>
                )} 
                colList={["Film", "Version", "Date de début", "Date de fin", "Actions"]} 
            />
            <AddKeyModal
                ref={addModalRef}
                entityId={entityId}
                cinemaId={cinemaId}
                isOpen={false}
                initialObject={null}
                onClose={() => {}}
                onSaved={async (key) => {
                    paginationRef.current?.refresh();
                }}
            />
        </Card>
    );
}