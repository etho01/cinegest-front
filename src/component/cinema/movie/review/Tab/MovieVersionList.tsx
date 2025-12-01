"use client";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/src/component/ui/table/Table";
import { Movie, MovieVersion } from "@/src/domain/Cinema/Movie";
import { useRef, useState } from "react";
import { MovieVersionModal } from "../../version/MovieVersionModal";
import { LoadObjectAndShowModalRef } from "@/src/component/hook/loadObjectAndShowModal";
import { Button } from "@/src/component/ui/btn/button";
import { OptionType } from "@/src/domain/Cinema/Settings/OptionTypes";
import { Option } from "@/src/domain/Cinema/Settings/Option";

interface MovieVersionListProps {
    movie : Movie;
    entityId?: number;
    cinemaId?: number;
    optionsTypes: OptionType[];
    options: Option[];
}

export default function MovieVersionList({ movie, entityId, cinemaId, optionsTypes, options } : MovieVersionListProps) {
    const [versions, setVersions] = useState(movie.versions);
    const modalRef = useRef<LoadObjectAndShowModalRef<MovieVersion>>(null);

    return (
        <>
           <div className="flex justify-between">
                <div className="flex gap-3">
                </div>
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => modalRef.current?.createNew()}
                >
                    Créer une version
                </Button>
            </div>
            <Table>
                <Thead>
                    <Tr>
                        <Th className="w-1/4">Nom de la version</Th>
                        <Th className="w-1/4">Taille (MB)</Th>
                        <Th className="w-1/2">Options</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {versions.map((version, index) => (
                        <Tr key={version.id} index={index}>
                            <Th>{version.versionName}</Th>
                            <Th>{version.size}</Th>
                            <Th>
                                {version.options.length > 0 ? (
                                    <ul>
                                        {version.options.map((option, optIndex) => (
                                            <li key={optIndex}>{option}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    "Aucune option"
                                )}
                            </Th>
                        </Tr>
                    ))}
                    {versions.length === 0 && (
                        <Tr>
                            <Td colSpan={3} className="text-center">Aucune version disponible.</Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            <MovieVersionModal
                isOpen={false}
                onClose={() => {}}
                initialObject={null}
                ref={modalRef}
                entityId={entityId}
                cinemaId={cinemaId}
                optionsTypes={optionsTypes}
                options={options}
            />
        </>
    );
}