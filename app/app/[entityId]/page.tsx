import { ShowMenu } from "@/src/component/ui/menu/showMenu";


interface EntityPageProps {
    params: Promise<{ entityId: number }>;
}

export default async function EntityPage({ params }: EntityPageProps) {
    const resolvedParams = await params;
    const { entityId } = resolvedParams;

    return (
        <ShowMenu
            body={async (user) => {
                return (
                    <div>
                        <h1>Entity Page for Entity ID: {entityId}</h1>
                        {/* Additional entity-related components can be added here */}
                    </div>
                );
            }}
            entityId={entityId}
            cinemaId={null}
            page="entityReview"
        />
    );
}