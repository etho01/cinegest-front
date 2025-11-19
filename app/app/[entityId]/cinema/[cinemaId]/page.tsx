import { ShowMenu } from "@/src/component/ui/menu/showMenu";


interface CinemaPageProps {
    params: Promise<{ entityId: number, cinemaId: number }>;
}

export default async function CinemaPage({ params }: CinemaPageProps) {
    const resolvedParams = await params;
    const { entityId, cinemaId } = resolvedParams;

    return (
        <ShowMenu
            body={async (user, entity, cinema) => {
                return (
                    <div>
                        <h1>Cinema Page for Cinema ID: {cinemaId} under Entity ID: {entityId}</h1>
                        {/* Additional cinema-related components can be added here */}
                    </div>
                );
            }}
            entityId={entityId}
            cinemaId={cinemaId}
            page="cinemaReview"
        />
    );
}