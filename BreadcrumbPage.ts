import { BreadcrumbLevel } from "./src/component/ui/menu/Breadcrumb";
import { UserHasRight, UserIsSuperAdmin } from "./src/domain/User";

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
    'entityReview': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id
            }
        }
    },
    'cinemaManager': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : '/app/[entityId]/cinema'
                }
            }
        }
    },
    'userManager': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des utilisateurs',
                    link : '/app/[entityId]/user'
                }
            }
        }
    },
    'roleList': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des rôles',
                    link : '/app/[entityId]/role'
                }
            }
        }
    },
    'userReview': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
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
    },
    'cinemaReview': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id
                    }
                }
            }
        }
    },
    'cinemaSettings': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
                        showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                        subLevel : {
                            name : 'Paramètres du cinéma',
                            link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/settings'
                        }
                    }
                }
            }
        }
    },
    'cinemaOptionTypesSettings': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
                        showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                        subLevel : {
                            name : 'Paramètres du cinéma',
                            link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/settings',
                            subLevel : {
                                name : 'Types d\'options',
                                link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/settings/optionTypes',
                            }
                        }
                    }
                }
            }
        }
    },
    'cinemaOptionsSettings': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
                        showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                        subLevel : {
                            name : 'Paramètres du cinéma',
                            link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/settings',
                            subLevel : {
                                name : 'Options',
                                link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/settings/options',
                            }
                        }
                    }
                }
            }
        }
    },
    'cinemaStorageTypesSettings': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
                        showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                        subLevel : {
                            name : 'Paramètres du cinéma',
                            link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/settings',
                            subLevel : {
                                name : 'Types de stockage',
                                link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/settings/storageType',
                            }
                        }
                    }
                }
            }
        }
    },
    'cinemaStoragesSettings': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
                        showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                        subLevel : {
                            name : 'Paramètres du cinéma',
                            link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/settings',
                            subLevel : {
                                name : 'Stockages',
                                link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/settings/storage',
                            }
                        }
                    }
                }
            }
        }
    },
    'cinemaRoomsSettings': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
                        showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                        subLevel : {
                            name : 'Paramètres du cinéma',
                            link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/settings',
                            subLevel : {
                                name : 'Salles',
                                link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/settings/rooms',
                            }
                        }
                    }
                }
            }
        }
    },
    'cinemaMovie': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
                        showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                        subLevel : {
                            name : 'Liste des films',
                            link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/movie',
                        }
                    }
                }
            }
        }
    },
    'cinemaMovieReview': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
                        showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                        subLevel : {
                            name : 'Liste des films',
                            link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/movie',
                            subLevel : {
                                name : (entity, cinema, user, movie) => (movie as { title?: string })?.title || 'Détail film',
                                link : (entity, cinema, user, movie) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/movie/' + (movie as { id?: number })?.id,
                            }
                        }
                    }
                }
            }
        }
    },
    'cinemaKey': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
                        showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                        subLevel : {
                            name : 'KDMs',
                            link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/key',
                        }
                    }
                }
            }
        }
    },
    'cinemaStorage': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
                        showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                        subLevel : {
                            name : 'Elements de stockage',
                            link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/storage', 
                        }
                    }
                }
            }
        }
    },
    'cinemaSession': {
        name : 'Tableau de bord',
        link : '/app',
        subLevel : {
            name : 'Gestion des entités',
            link : '/app/entity',
            showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                showCondition : (entity, cinema, user) => UserIsSuperAdmin(user),
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
                        showCondition : (entity, cinema, user) => UserHasRight(user, "viewCinemas", null),
                        subLevel : {
                            name : 'Séances',
                            link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/session',
                        }
                    }
                }
            }
        }
    },
    'account': {
        name : 'Mon compte',
        link : '/account'
    }
}