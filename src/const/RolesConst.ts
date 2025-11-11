
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
            }
    },
    'cinema' : {
            'viewMovies' : {
                'name' : 'Voir les films',
                'description' : 'Permet de voir la liste des films dans le système.'
            },
            'addMovie' : {
                'name' : 'Ajouter un film',
                'description' : 'Permet d\'ajouter un nouveau film.'
            },
            'editMovie' : {
                'name' : 'Modifier un film',
                'description' : 'Permet de modifier les détails d\'un film.'
            },
            'deleteMovie' : {
                'name' : 'Supprimer un film',
                'description' : 'Permet de supprimer un film.'
            }
    }
};