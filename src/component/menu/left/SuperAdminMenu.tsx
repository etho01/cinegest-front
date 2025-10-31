import { faBuilding, faChartLine, faCrown } from "@fortawesome/free-solid-svg-icons"
import { MenuElement } from "./MenuElement"

interface SuperAdminMenuProps {
    page : string;
}

export const SuperAdminMenu = ({ page } : SuperAdminMenuProps) => {
    return (
        <>
            <MenuElement active={page === "dashboard"} link="/app" title="Tableau de bord" icon={faChartLine} />
            <MenuElement active={page === "entityList"} link="/app/entity" title="Entités" icon={faBuilding} />
            <MenuElement active={page === "adminList"} link="/app/admin" title="Administrateurs" icon={faCrown} />
        </>
    )
}