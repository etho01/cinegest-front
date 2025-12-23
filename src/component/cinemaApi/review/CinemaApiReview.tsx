import { CinemaApi } from "@/src/domain/CinemaApi";
import Card from "../../ui/card";
import { Tab } from "../../ui/tab/Tab";
import { CinemaApiReviewcard } from "./Tab/CinemaApiReviewcard";
import { getAllCinemasByEntity } from "@/src/application/useCases/Cinema/getAllCinemasByEntity";
import { CinemaRepositoryImpl } from "@/src/infrastructure/repositories/CinemaRepositoryImpl";
import { PriceList } from "./Tab/PriceList";
import { User } from "@/src/domain/User";

interface CinemaApiReviewProps {
    cinemaApi : CinemaApi
    entityId: number;
    user: User;
}

export const CinemaApiReview = async ({ cinemaApi, entityId, user }: CinemaApiReviewProps) => {
    const cinemas = await getAllCinemasByEntity(CinemaRepositoryImpl, entityId);
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
                                <CinemaApiReviewcard cinemas={cinemas} cinemaApi={cinemaApi} entityId={entityId} />
                            ),
                        },
                    },
                    {
                        header: {
                            title: "Prix",
                        },
                        body: {
                            content: (
                                <PriceList user={user} entityId={entityId} cinemaApiId={cinemaApi.id} prices={cinemaApi.prices || []} />
                            ),
                        },
                    }
                ]}    
            />
        </Card>
    );
}