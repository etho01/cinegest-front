import { Entity } from "@/src/domain/Entity";
import { User, UserHasOneRight, UserHasRight } from "@/src/domain/User";
import { MenuElement } from "./MenuElement";
import { faBuilding, faFilm, faGear, faKey, faServer } from "@fortawesome/free-solid-svg-icons";
import { Cinema } from "@/src/domain/Cinema";


interface EntityMenuProps {
    user : User;
    page : string;
    entity : Entity;
    cinema : Cinema;
}

export const CinemaMenu = ({ user, page, entity, cinema }: EntityMenuProps) => {
    return (
        <>  
            <MenuElement show={UserHasRight(user, 'viewCinemaSessions', cinema.id)} active={(page === "cinemaSession")} link={`/app/${entity.id}/cinema/${cinema.id}/session`} title="Sessions" icon={faBuilding} />
            <MenuElement show={UserHasRight(user, 'viewStrorageItems', cinema.id)} active={(page === "cinemaStorage")} link={`/app/${entity.id}/cinema/${cinema.id}/storage`} title="Stockage des films" icon={faServer} />
            <MenuElement show={UserHasRight(user, 'viewCinemaKey', cinema.id)} active={(page === "cinemaKey")} link={`/app/${entity.id}/cinema/${cinema.id}/key`} title="KDM" icon={faKey} />
            <MenuElement show={UserHasRight(user, 'viewCinemaMovies', cinema.id)} active={(page === "cinemaMovie")} link={`/app/${entity.id}/cinema/${cinema.id}/movie`} title="Films" icon={faFilm} />
            <MenuElement show={UserHasOneRight(user, ['viewRooms', 'viewStorage', 'viewStorageTypes', 'viewOptions', 'viewOptionsTypes'], cinema.id)} active={(page === "cinemaSettings")} link={`/app/${entity.id}/cinema/${cinema.id}/settings`} title="Paramètres du cinéma" icon={faGear} />
        </>
    )
}