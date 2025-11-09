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
    },
    'cinemaManager': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            subLevel : {
                name : 'Gestion des cinémas',
                link : '/app/[entityId]/cinema'
            }
        }
    },
    'userManager': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            subLevel : {
                name : 'Gestion des utilisateurs',
                link : '/app/[entityId]/user'
            }
        }
    },
    'userReview': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            subLevel : {
                name : 'Gestion des utilisateurs',
                link : (entity) => '/app/' + entity?.id + '/user',
                subLevel : {
                    name : 'Détail utilisateur',
                    link : (entityId, userId) => '/app/' + entityId + '/user/' + userId
                }
            }
        }
    }
}