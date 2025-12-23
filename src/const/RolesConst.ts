
interface RolePermission {
    name: string;
    description: string;
}

interface Roles {
    'global': { [key: string]: RolePermission };
    'cinema': { [key: string]: RolePermission };
}

export const ROLES : Roles  = {
    'global' : {
            // user management
            'viewUsers' : {
                'name' : 'Voir les utilisateurs',
                'description' : 'Permet de voir la liste des utilisateurs dans le système.'
            },
            'editUser' : {
                'name' : 'Modifier les utilisateurs',
                'description' : 'Permet de modifier les détails de l\'utilisateur.'
            },
            'addUser' : {
                'name' : 'Ajouter un utilisateur',
                'description' : 'Permet d\'ajouter un nouvel utilisateur.'
            },
            'deleteUser' : {
                'name' : 'Supprimer un utilisateur',
                'description' : 'Permet de supprimer un utilisateur.'
            },

            // manage cinema
            'viewCinemas' : {
                'name' : 'Voir les cinémas',
                'description' : 'Permet de voir la liste des cinémas dans le système.'
            },
            'addCinema' : {
                'name' : 'Ajouter un cinéma',
                'description' : 'Permet d\'ajouter un nouveau cinéma.'
            },
            'editCinema' : {
                'name' : 'Modifier un cinéma',
                'description' : 'Permet de modifier les détails d\'un cinéma.'
            },
            'deleteCinema' : {
                'name' : 'Supprimer un cinéma',
                'description' : 'Permet de supprimer un cinéma.'
            },
            'viewRoles' : {
                'name' : 'Voir les rôles',
                'description' : 'Permet de voir la liste des rôles dans le système.'
            },
            'addRole' : {
                'name' : 'Ajouter un rôle',
                'description' : 'Permet d\'ajouter un nouveau rôle.'
            },
            'editRole' : {
                'name' : 'Gérer les rôles',
                'description' : 'Permet de gérer les rôles et leurs permissions.'
            },
            'deleteRole' : {
                'name' : 'Supprimer un rôle',
                'description' : 'Permet de supprimer un rôle.'
            }
    },
    'cinema' : {
            'viewCinemaSessions' : {
                'name' : 'Voir les séances du cinéma',
                'description' : 'Permet de voir la liste des séances pour un cinéma spécifique.'
            },
            'editCinemaSessions' : {
                'name' : 'Gerer les séances du cinéma',
                'description' : 'Gerer les séances pour un cinéma spécifique.'
            },
            'viewCinemaMovies' : {
                'name' : 'Voir les films du cinéma',
                'description' : 'Permet de voir la liste des films pour un cinéma spécifique.'
            },
            'editCinemaMovies' : {
                'name' : 'Gerer les films du cinéma',
                'description' : 'Gerer les films pour un cinéma spécifique.'
            },
            'editCinemaMovieVersions' : {
                'name' : 'Gerer les versions des films du cinéma',
                'description' : 'Gerer les versions des films pour un cinéma spécifique.'
            },
            'viewCinemaKey' : {
                'name' : 'Voir KDM du cinéma',
                'description' : 'Permet de voir les KDM pour un cinéma spécifique.'
            },
            'editCinemaKey' : {
                'name' : 'Gerer KDM du cinéma',
                'description' : 'Gerer les KDM pour un cinéma spécifique.'
            },
            'viewStrorageItems' : {
                'name' : 'Voir les éléments de stockage du cinéma',
                'description' : 'Permet de voir les éléments de stockage pour un cinéma spécifique.'
            },
            'editStrorageItems' : {
                'name' : 'Gerer les éléments de stockage du cinéma',
                'description' : 'Gerer les éléments de stockage pour un cinéma spécifique.'
            },
            'viewOptionsTypes' : {
                'name' : 'Voir les types d\'options du cinéma',
                'description' : 'Permet de voir les types d\'options pour un cinéma spécifique.'
            },
            'editOptionsTypes' : {
                'name' : 'Gerer les types d\'options du cinéma',
                'description' : 'Gerer les types d\'options pour un cinéma spécifique.'
            },
            'viewOptions' : {
                'name' : 'Voir les options du cinéma',
                'description' : 'Permet de voir les options pour un cinéma spécifique.'
            },
            'editOptions' : {
                'name' : 'Gerer les options du cinéma',
                'description' : 'Gerer les options pour un cinéma spécifique.'
            },
            'viewStorageTypes' : {
                'name' : 'Voir les types de stockage du cinéma',
                'description' : 'Permet de voir les types de stockage pour un cinéma spécifique.'
            },
            'editStorageTypes' : {
                'name' : 'Gerer les types de stockage du cinéma',
                'description' : 'Gerer les types de stockage pour un cinéma spécifique.'
            },
            'viewStorage' : {
                'name' : 'Voir les stockages du cinéma',
                'description' : 'Permet de voir les stockages pour un cinéma spécifique.'
            },
            'editStorage' : {
                'name' : 'Gerer les stockages du cinéma',
                'description' : 'Gerer les stockages pour un cinéma spécifique.'
            },
            'viewRooms' : {
                'name' : 'Voir les salles du cinéma',
                'description' : 'Permet de voir les salles pour un cinéma spécifique.'
            },
            'editRooms' : {
                'name' : 'Gerer les salles du cinéma',
                'description' : 'Gerer les salles pour un cinéma spécifique.'
            },
            'editCinemaApiPrices' : {
                'name' : 'Gerer les prix Cinema API du cinéma',
                'description' : 'Gerer les prix Cinema API pour un cinéma spécifique.'
            }
    }
};