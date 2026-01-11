import Card from "@/src/component/ui/card";
import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { SettingsCategory, SettingsItem } from "@/src/component/ui/settings/Settings";
import { Unauthorized, UserHasOneRight, UserHasRight } from "@/src/domain/User";
import { faSchool } from "@fortawesome/free-solid-svg-icons";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Paramètres du cinéma - CineGest",
    description: "Configuration et paramètres du cinéma",
};

interface CinemaPageProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
}

export default async function CinemaSettingsPage({ params }: CinemaPageProps) {
    const { entityId, cinemaId } = await params;
    return (
        <ShowMenu 
            body={async (user) => {
                if (!UserHasOneRight(user, ['viewRooms', 'viewStorage', 'viewStorageTypes', 'viewOptions', 'viewOptionsTypes'], cinemaId))
                {
                    throw new Unauthorized('Vous n\'avez pas les droits nécessaires pour accéder à cette page.');
                }

                return (
                    <Card>
                        <SettingsCategory show={UserHasOneRight(user, ['viewRooms', 'viewStorage', 'viewStorageTypes'], cinemaId)} title="Gestion des salles">
                            <SettingsItem 
                                show={UserHasRight(user, 'viewRooms', cinemaId)}
                                icon={faSchool}
                                title="Liste des salles"
                                link={`/app/${entityId}/cinema/${cinemaId}/settings/room`}
                            />
                            <SettingsItem 
                                show={UserHasRight(user, 'viewStorage', cinemaId)}
                                icon={faSchool}
                                title="Liste des moyens de stockage"
                                link={`/app/${entityId}/cinema/${cinemaId}/settings/storage`}
                            />
                            <SettingsItem 
                                show={UserHasRight(user, 'viewStorageTypes', cinemaId)}
                                icon={faSchool}
                                title="Liste des type de moyens de stockage"
                                link={`/app/${entityId}/cinema/${cinemaId}/settings/storageType`}
                            />
                        </SettingsCategory> 
                        <SettingsCategory show={UserHasOneRight(user, ['viewOptions', 'viewOptionsTypes'], cinemaId)} title="Informations sur les films">
                            <SettingsItem 
                                show={UserHasRight(user, 'viewOptions', cinemaId)}
                                icon={faSchool}
                                title="Listes des options"
                                link={`/app/${entityId}/cinema/${cinemaId}/settings/options`}
                            />
                            <SettingsItem 
                                show={UserHasRight(user, 'viewOptionsTypes', cinemaId)}
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