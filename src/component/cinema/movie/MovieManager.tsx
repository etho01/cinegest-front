"use client";
import { Movie } from "@/src/domain/Cinema/Movie";
import { Paginator } from "../../ui/pagination/PaginationType";
import { OptionType } from "@/src/domain/Cinema/Settings/OptionTypes";
import Card from "../../ui/card";
import { Button, LinkButton } from "../../ui/btn/button";
import Input from "../../ui/form/Input";
import { PaginationTab, PaginationTabRef } from "../../ui/pagination/PaginationTab";
import { useLoadObjectAndShowModalRef } from "../../hook/useLoadObjectAndShowModal";
import { ConfirmationModal, ConfirmationModalRef } from "../../ui/modal/ConfirmationModal";
import { useRef } from "react";
import { AddMovieModal } from "./AddMovieModal";
import { SelectMultiple } from "../../ui/form/Select";
import { Td } from "../../ui/table/Table";
import { deleteMovieController } from "@/src/controller/app/Cinema/MovieController";
import { MovieStatus } from "./MovieSatus";
import { User, UserHasRight } from "@/src/domain/User";


interface PropsFetchMovies {
    initialData : Paginator<Movie>;
    initialParams?: {
        search?: string;
        page?: number;
        status?: string[];
    };
    entityId: number;
    cinemaId: number;
    allOptionsTypes: OptionType[];
    user: User;
} 

export const MovieManager = ({ initialData, initialParams, entityId, cinemaId, user }: PropsFetchMovies) => {
    const paginationRef = useRef<PaginationTabRef>(null);
    const modalRef = useRef<useLoadObjectAndShowModalRef<Movie>>(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);

    return (
        <Card>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <Input 
                        label="Rechercher un film" 
                        placeholder="Rechercher un film" 
                        onChange={(value) => {
                            paginationRef.current?.updateParam("search", value);
                        }} 
                        initialValue={initialParams?.search || ""}
                    />
                    <SelectMultiple
                        label="Statut"
                        placeholder="Filtrer par statut"
                        onChange={(value) => {
                            paginationRef.current?.updateParam("status", value);
                        }}
                        options={[
                            { label: "Actif", value: "1" },
                            { label: "Inactif", value: "0" },
                        ]}
                        initialValue={initialParams?.status || []}
                    />
                </div>
                {UserHasRight(user, 'editCinemaMovies', cinemaId) && (
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => modalRef.current?.createNew()}
                >
                    Créer un film
                </Button>
                )}
            </div>
            <PaginationTab 
                initialData={initialData} 
                initialParams={initialParams} 
                endpoint={`api/${entityId}/cinema/${cinemaId}/movie/gets`} 
                ref={paginationRef} 
                lineRenderer={(item : Movie) => (
                    <>
                        <td className="py-2 px-1">{item.title}</td>
                        <td className="py-2 px-1">{item.releaseDate ? new Date(item.releaseDate).toLocaleDateString() : "N/A"}</td>
                        <Td>
                            <MovieStatus status={String(item.status)} />
                        </Td>
                        <td className="py-2 px-1 text-right">
                            <LinkButton href={'/app/' + entityId + '/cinema/' + cinemaId + '/movie/' + item.id}
                                variant="outline"
                            >
                                Voir
                            </LinkButton>
                            {UserHasRight(user, 'editCinemaMovies', cinemaId) && (
                            <Button className="ml-2"
                                variant="remove"
                                onClick={() => {
                                    confirmationModalRef.current?.open(
                                        "Confirmer la suppression",
                                        `Êtes-vous sûr de vouloir supprimer le film "${item.title}" ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            await deleteMovieController({ entityId, cinemaId, movieId: item.id });
                                            location.reload();
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
                colList={["Nom", "Date de sortie", 'Statut', ""]} 
            />
            <ConfirmationModal ref={confirmationModalRef} />
            <AddMovieModal
                ref={modalRef}
                isOpen={false}
                onClose={() => {}}
                entityId={entityId}
                cinemaId={cinemaId}
                initialObject={null}
                onSaved={() => {
                    paginationRef.current?.refresh();
                }}
            />
        </Card>
    );
}