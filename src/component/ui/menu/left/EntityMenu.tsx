import { Entity } from "@/src/domain/Entity";
import { User, UserHasRight } from "@/src/domain/User";
import { MenuElement } from "./MenuElement";
import { faBuilding, faUnlock, faUser } from "@fortawesome/free-solid-svg-icons";


interface EntityMenuProps {
    user : User;
    page : string;
    entity : Entity;
}

export const EntityMenu = ({ user, page, entity }: EntityMenuProps) => {
    return (
        <>
            <MenuElement show={UserHasRight(user, 'viewCinemas', null)} active={page === "cinemaList"} link={`/app/${entity.id}/cinema`} title="Cinémas" icon={faBuilding} />
            <MenuElement show={UserHasRight(user, 'viewUsers', null)} active={page === "userList"} link={`/app/${entity.id}/user`} title="Utilisateurs" icon={faUser} />
            <MenuElement show={UserHasRight(user, 'viewRoles', null)} active={page === "roleList"} link={`/app/${entity.id}/role`} title="Rôles" icon={faUnlock} />
        </>
    )
}