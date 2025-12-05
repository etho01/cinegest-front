"use client";
import { Movie } from "@/src/domain/Cinema/Movie";
import { Room } from "@/src/domain/Cinema/Settings/Room";
import { Paginator } from "../../ui/pagination/PaginationType";
import { StorageItem } from "@/src/domain/Cinema/StorageItem";
import { Storage } from "@/src/domain/Cinema/Settings/Storage";
import Card from "../../ui/card";
import { Select } from "../../ui/form/Select";
import { PaginationTab, PaginationTabRef } from "../../ui/pagination/PaginationTab";
import { LoadObjectAndShowModalRef } from "../../hook/loadObjectAndShowModal";
import { ConfirmationModal, ConfirmationModalRef } from "../../ui/modal/ConfirmationModal";
import { useRef } from "react";
import { Td } from "../../ui/table/Table";
import { Button } from "../../ui/btn/button";
import { AddStorageItemModal } from "./AddStorageItemModal";
import { addStorageItemObjectParams } from "@/src/application/useCases/Cinema/StorageItem/addStorageItems";
import { deleteStorageItemController } from "@/src/controller/app/Cinema/StorageItemController";

interface PropsStorageItemManager {
    entityId: number;
    cinemaId: number;
    activeMovies: Movie[];
    rooms : Room[];
    storages: Storage[];
    initialParams?: {
        page?: number;
        movies?: number[];
        rooms?: number[];
        storage?: number[];
    };
    initialData?: Paginator<StorageItem>;
}

export const StorageItemManager  = ({entityId, cinemaId, activeMovies, rooms, storages, initialParams, initialData}: PropsStorageItemManager) => {
    const paginationRef = useRef<PaginationTabRef>(null);
    const addModalRef = useRef<LoadObjectAndShowModalRef<addStorageItemObjectParams>>(null);
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
                    <Select
                        label="Stockage"
                        placeholder="Stockage"
                        onChange={(value) => {
                            const storage = value ? value.map((id: string) => Number(id)) : undefined;
                            paginationRef.current?.updateParam("storage", storage);
                        }}
                        isMulti={true}
                        options={storages ? storages.map((storage) => ({
                            label: storage.name,
                            value: storage.id.toString(),
                        })) : []}
                        initialValue={initialParams?.storage ? initialParams.storage.map((id) => id.toString()) : []}
                    />
                </div>
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => addModalRef.current?.createNew()}
                >
                    Ajouter un élément de stockage
                </Button>
            </div>
            <PaginationTab
                ref={paginationRef}
                initialData={initialData}
                endpoint={`api/${entityId}/cinema/${cinemaId}/storage-item`}
                initialParams={initialParams}
                colList={["Film", "Version", "Salle", "Stockage", "Origine", "Actions"]}
                lineRenderer={(item: StorageItem) => (
                    <>
                        <Td>{item?.movie?.title}</Td>
                        <Td>{item?.movieVersion?.versionName}</Td>
                        <Td>{item?.room?.name}</Td>
                        <Td>{item?.storage?.name}</Td>
                        <Td>{item?.origin?.name ?? 'Origin externe'}</Td>
                        <Td>
                            <div className="flex">
                            <Button className="ml-2 mr-auto"
                                variant="remove"
                                onClick={() => {
                                    confirmationModalRef.current?.open(
                                        "Confirmer la suppression",
                                        `Êtes-vous sûr de vouloir supprimer l'élément de stockage ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            await deleteStorageItemController({
                                                entityId : parseInt(entityId.toString()),
                                                cinemaId : parseInt(cinemaId.toString()),
                                                storageItemId: item.id,
                                            });
                                            // Refresh pagination
                                            //
                                            paginationRef.current?.refresh();
                                        }
                                    );
                                }}
                            >
                                Supprimer
                            </Button>
                            </div>
                        </Td>
                    </>
                )}
            />
            <ConfirmationModal ref={confirmationModalRef} />
            <AddStorageItemModal
                ref={addModalRef}
                entityId={entityId}
                cinemaId={cinemaId}
                rooms={rooms}
                storages={storages}
                onSaved={() => {
                    paginationRef.current?.refresh();
                }}
                isOpen={false}
                onClose={() => {}}
                initialObject={null}
            />
        </Card>
    );
}