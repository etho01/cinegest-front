import { Entity } from "@/src/domain/Entity";
import { User } from "@/src/domain/User";
import { MenuElement } from "./MenuElement";
import { faBuilding, faGear, faUnlock, faUser } from "@fortawesome/free-solid-svg-icons";
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
            <MenuElement active={(page === "cinemaMovie")} link={`/app/${entity.id}/cinema/${cinema.id}/movie`} title="Films" icon={faBuilding} />
            <MenuElement active={(page === "cinemaSettings")} link={`/app/${entity.id}/cinema/${cinema.id}/settings`} title="Paramètres du cinéma" icon={faGear} />
        </>
    )
}