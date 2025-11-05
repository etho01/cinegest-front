import { BreadcrumbLevel } from "./src/component/ui/menu/Breadcrumb";

export const BreadcrumbPageList: Record<string, BreadcrumbLevel> = {
    'dashboard': {
        name: 'Tableau de bord',
        link: '/app'
    },
    'entity': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity'
        }
    },
    'superadmin': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des superadmins',
            link : '/app/superadmin'
        }
    }
}