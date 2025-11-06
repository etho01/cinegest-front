import { Entity } from "@/src/domain/Entity";
import { User } from "@/src/domain/User";
import { MenuElement } from "./MenuElement";
import { faBuilding, faUser } from "@fortawesome/free-solid-svg-icons";


interface EntityMenuProps {
    user : User;
    page : string;
    entity : Entity;
}

export const EntityMenu = ({ user, page, entity }: EntityMenuProps) => {
    return (
        <>
            <MenuElement active={page === "cinemaList"} link={`/app/${entity.id}/cinema`} title="Cinémas" icon={faBuilding} />
            <MenuElement active={page === "userList"} link={`/app/${entity.id}/user`} title="Utilisateurs" icon={faUser} />
        </>
    )
}