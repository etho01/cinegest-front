"use client";
import { useLoadObjectAndShowModalRef } from "../../hook/useLoadObjectAndShowModal";
import Card from "../../ui/card";
import { ConfirmationModal, ConfirmationModalRef } from "../../ui/modal/ConfirmationModal";
import { PaginationTab, PaginationTabRef } from "../../ui/pagination/PaginationTab";
import { useRef } from "react";
import { Movie } from "@/src/domain/Cinema/Movie";
import { Paginator } from "../../ui/pagination/PaginationType";
import { Room } from "@/src/domain/Cinema/Settings/Room";
import { PropsGetSessions } from "@/src/application/useCases/Cinema/Sessions/getSessions";
import { Button } from "../../ui/btn/button";
import { Select } from "../../ui/form/Select";
import { Session } from "@/src/domain/Cinema/Session";
import { Td } from "../../ui/table/Table";
import { AddSessionModal } from "./AddSessionModal";
import { deleteSessionController } from "@/src/controller/app/Cinema/SessionController";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddKeyModalElement } from "@/src/application/useCases/Cinema/Key/addKeys";
import { addStorageItemObjectParams } from "@/src/application/useCases/Cinema/StorageItem/addStorageItems";
import { AddKeyModal } from "../key/AddKeyModal";
import { AddStorageItemModal } from "../storage/AddStorageItemModal";
import { Storage } from "@/src/domain/Cinema/Settings/Storage";
import { User, UserHasRight } from "@/src/domain/User";

interface PropsSessionManager {
    entityId: number;
    cinemaId: number;
    activeMovies?: Movie[];
    initialParams?: PropsGetSessions;
    initialData?: Paginator<Session>;
    rooms: Room[];
    storages: Storage[];
    user: User;
}


export const SessionManager = ({ entityId, cinemaId, activeMovies, initialParams, initialData, rooms, storages, user }: PropsSessionManager) => {
    const paginationRef = useRef<PaginationTabRef>(null);
    const addModalRef = useRef<useLoadObjectAndShowModalRef<Session>>(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);
    const addKeyModalRef = useRef<useLoadObjectAndShowModalRef<AddKeyModalElement>>(null);
    const addStorageModalRef = useRef<useLoadObjectAndShowModalRef<addStorageItemObjectParams>>(null);

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
                {UserHasRight(user, 'editCinemaSessions', cinemaId) && (
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => addModalRef.current?.createNew()}
                >
                    Ajouter des séances
                </Button>
                )}
            </div>
            <PaginationTab 
                initialData={initialData} 
                initialParams={initialParams} 
                endpoint={`api/${entityId}/cinema/${cinemaId}/session`} 
                ref={paginationRef} 
                lineRenderer={(item : Session) => {
                    const formatDate = (isoString: string) => {
                        const date = new Date(isoString);
                        return date.toLocaleDateString('fr-FR', { 
                            year: 'numeric', 
                            month: '2-digit', 
                            day: '2-digit' 
                        });
                    };
                    
                    const formatTime = (isoString: string) => {
                        const date = new Date(isoString);
                        return date.toLocaleTimeString('fr-FR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                        });
                    };
                    
                    return (
                    <>
                        <Td>{item.movie?.title}</Td>
                        <Td>{item.movieVersion?.versionName}</Td>
                        <Td>{item.room?.name}</Td>
                        <Td>{formatDate(item.startTime)}</Td>
                        <Td>{formatTime(item.startTime)}</Td>
                        <Td>{formatTime(item.endTime)}</Td>
                        <Td>{item.nbSeatsSold || 0} / {item.room?.capacity || 0}</Td>
                        <Td>
                            <div className="flex justify-between">
                                <div>
                                    {item.statusKey == 'noKey' ? 'Sans clé' : 'Clée présente'}
                                </div>
                                {(item.statusKey == 'noKey' && UserHasRight(user, 'editCinemaKey', cinemaId)) && (
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={async () => {
                                            addKeyModalRef.current?.createNew();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                )}
                            </div>
                        </Td>
                        <Td>
                            <div className="flex justify-between">
                                <div>
                                    {item.statusServer == 'hasMovieServer' ? 'Présent sur le serveur' : 'Non présent sur le serveur'}
                                </div>
                                {(item.statusServer == 'noMovieServer' && UserHasRight(user, 'editStorageItems', cinemaId)) && (
                                    <Button
                                        variant="default"
                                        size="sm"
                                        onClick={async () => {
                                            addStorageModalRef.current?.createNew();
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </Button>
                                )}
                            </div>
                        </Td>
                        <Td className="text-right">
                            {UserHasRight(user, 'editCinemaSessions', cinemaId) && (
                            <Button className="ml-2"
                                variant="remove"
                                onClick={() => {
                                    confirmationModalRef.current?.open(
                                        "Confirmer la suppression",
                                        `Êtes-vous sûr de vouloir supprimer la séance ?" ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            await deleteSessionController({
                                                entityId: parseInt(entityId.toString()),
                                                cinemaId: parseInt(cinemaId.toString()),
                                                sessionId: item.id,
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
                )}} 
                colList={["Film", "Version", 'Salle', "Date", "Heure de début", "Heure de fin", "Nombre de sièges vendus", "Clé", "Serveur", "Actions"]}
            />
            <AddKeyModal
                ref={addKeyModalRef}
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
            <AddStorageItemModal
                ref={addStorageModalRef}
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
            <ConfirmationModal ref={confirmationModalRef} />
            <AddSessionModal
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