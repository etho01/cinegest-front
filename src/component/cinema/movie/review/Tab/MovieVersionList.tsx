"use client";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/src/component/ui/table/Table";
import { Movie, MovieVersion } from "@/src/domain/Cinema/Movie";
import { useRef, useState } from "react";
import { MovieVersionModal } from "../../version/MovieVersionModal";
import { LoadObjectAndShowModalRef } from "@/src/component/hook/loadObjectAndShowModal";
import { Button } from "@/src/component/ui/btn/button";
import { OptionType } from "@/src/domain/Cinema/Settings/OptionTypes";
import { Option } from "@/src/domain/Cinema/Settings/Option";
import { deleteMovieVersionController } from "@/src/controller/app/Cinema/MovieController";
import { ConfirmationModal, ConfirmationModalRef } from "@/src/component/ui/modal/ConfirmationModal";
import { ErrorModal, ErrorModalRef } from "@/src/component/ui/modal";
import { User, UserHasRight } from "@/src/domain/User";

interface MovieVersionListProps {
    movie : Movie;
    entityId: number;
    cinemaId: number;
    optionsTypes: OptionType[];
    options: Option[];
    user: User;
}

export default function MovieVersionList({ movie, entityId, cinemaId, optionsTypes, options, user } : MovieVersionListProps) {
    const [versions, setVersions] = useState(movie.versions);
    const modalRef = useRef<LoadObjectAndShowModalRef<MovieVersion>>(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);
    const errorModalRef = useRef<ErrorModalRef>(null);

    return (
        <>
           <div className="flex justify-between">
                <div className="flex gap-3">
                </div>
                {UserHasRight(user, 'editCinemaMovieVersions', cinemaId) && 
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => modalRef.current?.createNew()}
                >
                    Créer une version
                </Button>
                }
            </div>
            <Table>
                <Thead>
                    <Tr>
                        <Th className="w-1/4">Nom de la version</Th>
                        <Th className="w-1/4">Taille (GB)</Th>
                        <Th className="w-1/2">Options</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {versions.map((version, index) => (
                        <Tr key={version.id} index={index}>
                            <Td>{version.versionName}</Td>
                            <Td>{version.size}</Td>
                            <Td>
                                {version.options.length > 0 ? (
                                    version.options.map((option) => option.name).join(", ")
                                ) : (
                                    "Aucune option"
                                )}
                            </Td>
                            <Td>
                                <div className="flex gap-3">
                                    {UserHasRight(user, 'editCinemaMovieVersions', cinemaId) && 
                                    <Button
                                        variant="default"
                                        onClick={() => modalRef.current?.loadFromObject(version)}
                                    >
                                        Éditer
                                    </Button>
                                    }
                                    {UserHasRight(user, 'editCinemaMovieVersions', cinemaId) && 
                                    <Button
                                        variant="remove"
                                        onClick={async () => {
                                            confirmationModalRef.current?.open(
                                                "Confirmer la suppression",
                                                "Êtes-vous sûr de vouloir supprimer cette version ?",
                                                async () => {
                                                    const resp = await deleteMovieVersionController({ entityId: parseInt(entityId + ""), cinemaId: parseInt(cinemaId + ""), movieId: movie.id, movieVersionId: version.id });
                                                    if (resp.serverError || resp.validationErrors) {
                                                        errorModalRef.current?.open(
                                                            "Erreur lors de la suppression",
                                                            resp.serverError || "Une erreur est survenue lors de la suppression de la version."
                                                        );
                                                        return;
                                                    }
                                                    const updatedVersions = versions.filter(v => v.id !== version.id);
                                                    setVersions(updatedVersions);
                                                }
                                            );
                                        }}
                                    >
                                        Supprimer
                                    </Button>
                                    }
                                </div>
                            </Td>
                        </Tr>
                    ))}
                    {versions.length === 0 && (
                        <Tr>
                            <Td colSpan={3} className="text-center">Aucune version disponible.</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            <ConfirmationModal ref={confirmationModalRef} />
            <ErrorModal ref={errorModalRef} />
            <MovieVersionModal
                isOpen={false}
                onClose={() => {}}
                initialObject={null}
                ref={modalRef}
                entityId={entityId}
                cinemaId={cinemaId}
                movieId={movie.id}
                onSaved={async (savedVersion) => {
                    let updatedVersions = [...versions];
                    const existingIndex = updatedVersions.findIndex(v => v.id === savedVersion.id);
                    if (existingIndex >= 0) {
                        // Update existing version
                        updatedVersions[existingIndex] = savedVersion;
                    } else {
                        // Add new version
                        updatedVersions.push(savedVersion);
                    }
                    setVersions(updatedVersions);
                }}
                optionsTypes={optionsTypes}
                options={options}
            />
        </>
    );
}