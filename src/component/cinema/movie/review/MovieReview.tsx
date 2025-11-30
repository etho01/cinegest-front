import Card from "@/src/component/ui/card";
import { ReviewCategory } from "@/src/component/ui/review/ReviewCategory";
import { ReviewElement } from "@/src/component/ui/review/ReviewElement";
import { Tab } from "@/src/component/ui/tab/Tab";
import { Movie } from "@/src/domain/Cinema/Movie";
import { MovieStatus } from "../MovieSatus";
import MovieVersionList from "./Tab/MovieVersionList";
import { getAllOptionsTypes } from "@/src/application/useCases/Cinema/Settings/OptionTypes/getAllOptionsTypes";
import { OptionTypesRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionTypesControllerImpl";
import { getAllOptions } from "@/src/application/useCases/Cinema/Settings/Option/getAllOptions";
import { OptionsRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionsRepositoryImpl";


interface MovieReviewProps {
    movie : Movie;
    entityId: number;
    cinemaId: number;
}

export default async function MovieReview({ movie, entityId, cinemaId } : MovieReviewProps) 
{
    const optionsTypes = await getAllOptionsTypes(OptionTypesRepositoryImpl, entityId, cinemaId);
    const options = await getAllOptions(OptionsRepositoryImpl, entityId, cinemaId);

    return (
        <Card>
            <Tab
                tabList={[
                    {
                        header: {
                            title: "Details",
                        },
                        body: {
                            content: (
                                <ReviewCategory title={movie.title}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <ReviewElement title="Titre" containerClassName=" col-span-2 ">
                                            {movie.title}
                                        </ReviewElement>
                                        <ReviewElement title="Date de sortie">
                                            {movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString() : "N/A"}
                                        </ReviewElement>
                                        <ReviewElement title="Status">
                                            <MovieStatus status={String(movie.status)} />
                                        </ReviewElement>
                                        <ReviewElement title="Description" containerClassName=" col-span-2 ">
                                            {movie.description}
                                        </ReviewElement>
                                    </div>
                                </ReviewCategory>
                            ),
                        },
                    },
                    {
                        header: {
                            title: "Versions",
                        },
                        body: {
                            content: (
                                <MovieVersionList 
                                    movie={movie} 
                                    entityId={entityId} 
                                    cinemaId={cinemaId}
                                    optionsTypes={optionsTypes}
                                    options={options}
                                />
                            ),
                        },
                    }
                    // You can add more tabs here if needed
                ]}    
            />
        </Card>
    );
}