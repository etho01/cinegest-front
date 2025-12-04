import Card from "@/src/component/ui/card";
import { Tab } from "@/src/component/ui/tab/Tab";
import { Movie } from "@/src/domain/Cinema/Movie";
import MovieVersionList from "./Tab/MovieVersionList";
import { getAllOptionsTypes } from "@/src/application/useCases/Cinema/Settings/OptionTypes/getAllOptionsTypes";
import { OptionTypesRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionTypesControllerImpl";
import { getAllOptions } from "@/src/application/useCases/Cinema/Settings/Option/getAllOptions";
import { OptionsRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionsRepositoryImpl";
import MovieReviewCard from "./Tab/MovieReviewcard";


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
                                <MovieReviewCard movie={movie} entityId={entityId} cinemaId={cinemaId} />
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