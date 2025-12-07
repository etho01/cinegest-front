"use client";

import { LoadObjectAndShowModalRef } from "../../hook/loadObjectAndShowModal";
import { PaginationTab, PaginationTabRef } from "../../ui/pagination/PaginationTab";
import { ConfirmationModal, ConfirmationModalRef } from "../../ui/modal/ConfirmationModal";
import { useRef } from "react";
import { Movie } from "@/src/domain/Cinema/Movie";
import { Paginator } from "../../ui/pagination/PaginationType";
import Card from "../../ui/card";
import { Button } from "../../ui/btn/button";
import { Select } from "../../ui/form/Select";
import { Td } from "../../ui/table/Table";
import { Key } from "@/src/domain/Cinema/Key";
import { AddKeyModal } from "./AddKeyModal";
import { Room } from "@/src/domain/Cinema/Settings/Room";
import { deleteKeyController } from "@/src/controller/app/Cinema/KeyController";
import { User, UserHasRight } from "@/src/domain/User";

interface PropsKeyManager {
    entityId: number;
    cinemaId: number;
    activeMovies?: Movie[];
    initialParams?: {
        page?: number;
        movies?: number[];
        rooms?: number[];
    };
    initialData?: Paginator<Key>;
    rooms: Room[];
    user: User;
}

export const KeyManager = ({ entityId, cinemaId, activeMovies, initialParams, initialData, rooms, user }: PropsKeyManager) => {
    const paginationRef = useRef<PaginationTabRef>(null);
    const addModalRef = useRef<LoadObjectAndShowModalRef<Key>>(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);
    
    return (
        <Card>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <Select
                        label="Film"
                        placeholder="Film"
                        onChange={(value) => {
                            const movies = value ? value.map((id: string) => Number(id)) : undefined;
                            paginationRef.current?.updateParam("movies", movies);
                        }}
                        isMulti={true}
                        options={activeMovies ? activeMovies.map((movie) => ({
                            label: movie.title,
                            value: movie.id.toString(),
                        })) : []}
                        initialValue={initialParams?.movies ? initialParams.movies.map((id) => id.toString()) : []}
                     />
                     <Select
                        label="Salle"
                        placeholder="Salle"
                        onChange={(value) => {
                            const rooms = value ? value.map((id: string) => Number(id)) : undefined;
                            paginationRef.current?.updateParam("rooms", rooms);
                        }}
                        isMulti={true}
                        options={rooms ? rooms.map((room) => ({
                            label: room.name,
                            value: room.id.toString(),
                        })) : []}
                        initialValue={initialParams?.rooms ? initialParams.rooms.map((id) => id.toString()) : []}
                     />
                </div>
                {UserHasRight(user, 'editCinemaKey', cinemaId) && (
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => addModalRef.current?.createNew()}
                >
                    Ajouter des KDM
                </Button>
                )}
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
                        <Td>{item.room?.name}</Td>
                        <Td>{item.dateStart}</Td>
                        <Td>{item.dateEnd}</Td>
                        <Td className="text-right">
                            {UserHasRight(user, 'editCinemaKey', cinemaId) && (
                            <Button className="ml-2"
                                variant="remove"
                                onClick={() => {
                                    confirmationModalRef.current?.open(
                                        "Confirmer la suppression",
                                        `Êtes-vous sûr de vouloir supprimer la KDM" ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            await deleteKeyController({
                                                entityId: parseInt(entityId.toString()),
                                                cinemaId: parseInt(cinemaId.toString()),
                                                keyId: item.id,
                                            });
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
                colList={["Film", "Version", 'Salle', "Date de début", "Date de fin", "Actions"]} 
            />
            <ConfirmationModal ref={confirmationModalRef} />
            <AddKeyModal
                ref={addModalRef}
                entityId={entityId}
                cinemaId={cinemaId}
                isOpen={false}
                initialObject={null}
                onClose={() => {}}
                onSaved={async () => {
                    paginationRef.current?.refresh();
                }}
                rooms={rooms}
            />
        </Card>
    );
}