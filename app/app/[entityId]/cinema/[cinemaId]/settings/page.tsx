import Card from "@/src/component/ui/card";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { SettingsCategory, SettingsItem } from "@/src/component/ui/settings/Settings";
import { faSchool } from "@fortawesome/free-solid-svg-icons";

interface CinemaPageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
}

export default async function CinemaSettingsPage({ params }: CinemaPageProps) {
    const { entityId, cinemaId } = await params;
    return (
        <ShowMenu 
            body={async (user, entity, cinema) => {
                return (
                    <Card>
                        <SettingsCategory title="Gestion des salles">
                            <SettingsItem 
                                icon={faSchool}
                                title="Liste des salles"
                                link={`/app/${entityId}/cinema/${cinemaId}/settings/rooms`}
                            />
                            <SettingsItem 
                                icon={faSchool}
                                title="Liste des moyens de stockage"
                                link={`/app/${entityId}/cinema/${cinemaId}/settings/storage`}
                            />
                            <SettingsItem 
                                icon={faSchool}
                                title="Liste des type de moyens de stockage"
                                link={`/app/${entityId}/cinema/${cinemaId}/settings/storageTypes`}
                            />
                        </SettingsCategory> 
                        <SettingsCategory title="Informations sur les films">
                            <SettingsItem 
                                icon={faSchool}
                                title="Listes des options"
                                link={`/app/${entityId}/cinema/${cinemaId}/settings/options`}
                            />
                            <SettingsItem 
                                icon={faSchool}
                                title="Listes des types d'options"
                                link={`/app/${entityId}/cinema/${cinemaId}/settings/optionTypes`}
                            />
                        </SettingsCategory>
                    </Card>
                );
            }}
            page="cinemaSettings"
            entityId={entityId} 
            cinemaId={cinemaId} 
        />
    );
}