import { faBuilding, faChartLine, faCity, faCrown } from "@fortawesome/free-solid-svg-icons"
import { MenuElement } from "./MenuElement"

interface SuperAdminMenuProps {
    page : string;
}

export const SuperAdminMenu = ({ page } : SuperAdminMenuProps) => {
    return (
        <>
            <MenuElement active={page === "entityList"} link="/app/entity" title="Entités" icon={faCity} />
            <MenuElement active={page === "adminList"} link="/app/admin" title="Administrateurs" icon={faCrown} />
        </>
    )
}