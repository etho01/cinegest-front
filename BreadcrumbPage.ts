import { en } from "zod/locales";
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
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
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
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                subLevel : {
                    name : 'Gestion des utilisateurs',
                    link : '/app/[entityId]/user'
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
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
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
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
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
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
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
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
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
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
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
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
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
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
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
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
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
            subLevel : {
                name : (entity) => entity?.name || 'Détail entité',
                link : (entity) => '/app/' + entity?.id,
                subLevel : {
                    name : 'Gestion des cinémas',
                    link : (entity) => '/app/' + entity?.id + '/cinema',
                    subLevel : {
                        name : (entity, cinema) => cinema?.name || 'Détail cinéma',
                        link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id,
                        subLevel : {
                            name : 'Liste des films',
                            link : (entity, cinema) => '/app/' + entity?.id + '/cinema/' + cinema?.id + '/movie',
                        }
                    }
                }
            }
        }
    }
}