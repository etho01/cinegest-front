"use client";
import { ReviewCategory } from "@/src/component/ui/review/ReviewCategory";
import { ReviewElement } from "@/src/component/ui/review/ReviewElement";
import { Movie } from "@/src/domain/Cinema/Movie";
import { MovieStatus } from "../../MovieSatus";
import { UpdateSizeMovie, UpdateSizeMovieRef } from "../UpdateSizeMovie";
import { useRef, useState } from "react";
import { User, UserHasRight } from "@/src/domain/User";


interface MovieReviewProps {
    movie: Movie;
    entityId: number;
    cinemaId: number;
    user: User;
}

export default function MovieReviewCard({ movie, entityId, cinemaId, user }: MovieReviewProps) {
    const [movieUpdated, setMovie] = useState<Movie>(movie);
    const updateSizeModal = useRef<UpdateSizeMovieRef>(null);

    return (
        <>
            <ReviewCategory title={movieUpdated.title}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <ReviewElement title="Titre" containerClassName=" col-span-2 ">
                        {movieUpdated.title}
                    </ReviewElement>
                    <ReviewElement title="Taille du film (Go)" showUpdate={UserHasRight(user, 'editCinemaMovies', cinemaId)} updateFunction={() => {
                        updateSizeModal.current?.show();
                    }}>
                        {movieUpdated.size}
                    </ReviewElement>
                    <ReviewElement title="Date de sortie">
                        {movieUpdated.releaseDate ? new Date(movieUpdated.releaseDate).toLocaleDateString() : "N/A"}
                    </ReviewElement>
                    <ReviewElement title="Status">
                        <MovieStatus status={String(movieUpdated.status)} />
                    </ReviewElement>
                    <ReviewElement title="Description" containerClassName=" col-span-2 ">
                        {movieUpdated.description}
                    </ReviewElement>
                </div>
            </ReviewCategory>
            <UpdateSizeMovie
                movie={movieUpdated}
                entityId={entityId}
                cinemaId={cinemaId}
                onSaved={(size) => {
                    setMovie({ ...movieUpdated, size: size });
                }}
                isOpen={false}
                ref={updateSizeModal}
            />
        </>
    );
}