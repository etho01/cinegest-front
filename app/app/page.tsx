import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { User, UserIsSuperAdmin, UserHasRight } from "@/src/domain/User";
import { Entity } from "@/src/domain/Entity";
import { Cinema } from "@/src/domain/Cinema";
import Card from "@/src/component/ui/card";
import { Button } from "@/src/component/ui/btn/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faBuilding, 
    faFilm, 
    faUser, 
    faKey, 
    faCalendarDays, 
    faChartLine,
    faPlus,
    faEye,
    faCog,
    faServer,
    faUserShield
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default async function Page() {
    return (
        <ShowMenu 
            page="dashboard" 
            entityId={null} 
            cinemaId={null} 
            body={async (user: User, entity: Entity | null, cinema: Cinema | null) => {
                return (
                    <div className="p-6 space-y-6">
                        {/* En-tête de bienvenue */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
                            <h1 className="text-3xl font-bold mb-2">
                                Bienvenue dans CineGest, {user.firstname} {user.lastname}
                            </h1>
                            <p className="text-blue-100">
                                Tableau de bord de gestion cinématographique
                            </p>
                        </div>

                        {/* Statistiques rapides */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {user.entities && (
                                <Card className="p-6 bg-blue-50 border-blue-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-blue-600 text-sm font-medium">Entités</p>
                                            <p className="text-2xl font-bold text-blue-900">
                                                {user.entities.length}
                                            </p>
                                        </div>
                                        <FontAwesomeIcon icon={faBuilding} className="text-blue-500 text-2xl" />
                                    </div>
                                </Card>
                            )}

                            {user.entities && (
                                <Card className="p-6 bg-green-50 border-green-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-green-600 text-sm font-medium">Cinémas</p>
                                            <p className="text-2xl font-bold text-green-900">
                                                {user.entities.reduce((total, entity) => 
                                                    total + (entity.cinemas?.length || 0), 0
                                                )}
                                            </p>
                                        </div>
                                        <FontAwesomeIcon icon={faServer} className="text-green-500 text-2xl" />
                                    </div>
                                </Card>
                            )}

                            <Card className="p-6 bg-purple-50 border-purple-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-600 text-sm font-medium">Rôles</p>
                                        <p className="text-2xl font-bold text-purple-900">
                                            {user.roles?.length || 0}
                                        </p>
                                    </div>
                                    <FontAwesomeIcon icon={faUserShield} className="text-purple-500 text-2xl" />
                                </div>
                            </Card>

                            <Card className="p-6 bg-orange-50 border-orange-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-orange-600 text-sm font-medium">Statut</p>
                                        <p className="text-lg font-bold text-orange-900">
                                            {UserIsSuperAdmin(user) ? "Super Admin" : "Utilisateur"}
                                        </p>
                                    </div>
                                    <FontAwesomeIcon icon={faChartLine} className="text-orange-500 text-2xl" />
                                </div>
                            </Card>
                        </div>

                        {/* Actions rapides */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Actions pour une entité spécifique */}
                            {entity && (
                                <Card className="p-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <FontAwesomeIcon icon={faBuilding} className="text-blue-500" />
                                        Actions pour {entity.name}
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {UserHasRight(user, 'viewCinemas', null) && (
                                            <Link href={`/app/${entity.id}/cinema`}>
                                                <Button variant="outline" className="w-full justify-start">
                                                    <FontAwesomeIcon icon={faServer} className="mr-2" />
                                                    Gérer les cinémas
                                                </Button>
                                            </Link>
                                        )}
                                        {UserHasRight(user, 'viewUsers', null) && (
                                            <Link href={`/app/${entity.id}/user`}>
                                                <Button variant="outline" className="w-full justify-start">
                                                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                                                    Gérer les utilisateurs
                                                </Button>
                                            </Link>
                                        )}
                                        {UserHasRight(user, 'viewRoles', null) && (
                                            <Link href={`/app/${entity.id}/role`}>
                                                <Button variant="outline" className="w-full justify-start">
                                                    <FontAwesomeIcon icon={faUserShield} className="mr-2" />
                                                    Gérer les rôles
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </Card>
                            )}

                            {/* Actions pour un cinéma spécifique */}
                            {cinema && (
                                <Card className="p-6">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <FontAwesomeIcon icon={faServer} className="text-green-500" />
                                        Actions pour {cinema.name}
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {entity && UserHasRight(user, 'viewCinemaSessions', cinema.id) && (
                                            <Link href={`/app/${entity.id}/cinema/${cinema.id}/session`}>
                                                <Button variant="outline" className="w-full justify-start">
                                                    <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                                                    Sessions
                                                </Button>
                                            </Link>
                                        )}
                                        {entity && UserHasRight(user, 'viewMovies', cinema.id) && (
                                            <Link href={`/app/${entity.id}/cinema/${cinema.id}/movie`}>
                                                <Button variant="outline" className="w-full justify-start">
                                                    <FontAwesomeIcon icon={faFilm} className="mr-2" />
                                                    Films
                                                </Button>
                                            </Link>
                                        )}
                                        {entity && UserHasRight(user, 'viewKeys', cinema.id) && (
                                            <Link href={`/app/${entity.id}/cinema/${cinema.id}/key`}>
                                                <Button variant="outline" className="w-full justify-start">
                                                    <FontAwesomeIcon icon={faKey} className="mr-2" />
                                                    Clés DCP
                                                </Button>
                                            </Link>
                                        )}
                                        {entity && UserHasRight(user, 'viewCinemaSettings', cinema.id) && (
                                            <Link href={`/app/${entity.id}/cinema/${cinema.id}/settings`}>
                                                <Button variant="outline" className="w-full justify-start">
                                                    <FontAwesomeIcon icon={faCog} className="mr-2" />
                                                    Paramètres
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </Card>
                            )}

                            {/* Actions générales */}
                            <Card className="p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faChartLine} className="text-purple-500" />
                                    Accès rapide
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {user.entities && user.entities.length > 0 && (
                                        <Link href={`/app/${user.entities[0].id}`}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <FontAwesomeIcon icon={faEye} className="mr-2" />
                                                Voir mes entités
                                            </Button>
                                        </Link>
                                    )}
                                    {UserIsSuperAdmin(user) && (
                                        <Link href="/app/admin">
                                            <Button variant="outline" className="w-full justify-start">
                                                <FontAwesomeIcon icon={faUserShield} className="mr-2" />
                                                Administration
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </Card>

                            {/* Informations utilisateur */}
                            <Card className="p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faUser} className="text-indigo-500" />
                                    Mon profil
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-gray-600">Email</span>
                                        <span className="font-medium">{user.email}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-gray-600">Nom</span>
                                        <span className="font-medium">{user.firstname} {user.lastname}</span>
                                    </div>
                                    {user.phone && (
                                        <div className="flex items-center justify-between py-2 border-b">
                                            <span className="text-gray-600">Téléphone</span>
                                            <span className="font-medium">{user.phone}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-gray-600">Type de compte</span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            UserIsSuperAdmin(user) 
                                                ? "bg-red-100 text-red-800" 
                                                : "bg-blue-100 text-blue-800"
                                        }`}>
                                            {UserIsSuperAdmin(user) ? "Super Administrateur" : "Utilisateur"}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Liste des entités et cinémas */}
                        {user.entities && user.entities.length > 0 && (
                            <Card className="p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faBuilding} className="text-blue-500" />
                                    Mes entités et cinémas
                                </h2>
                                <div className="space-y-4">
                                    {user.entities.map((entity) => (
                                        <div key={entity.id} className="border rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-lg font-semibold">{entity.name}</h3>
                                                <Link href={`/app/${entity.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        <FontAwesomeIcon icon={faEye} className="mr-2" />
                                                        Voir
                                                    </Button>
                                                </Link>
                                            </div>
                                            {entity.cinemas && entity.cinemas.length > 0 && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                                    {entity.cinemas.map((cinema) => (
                                                        <Link 
                                                            key={cinema.id} 
                                                            href={`/app/${entity.id}/cinema/${cinema.id}`}
                                                            className="flex items-center gap-2 p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                                                        >
                                                            <FontAwesomeIcon icon={faServer} className="text-gray-500" />
                                                            <span className="text-sm">{cinema.name}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                            {(!entity.cinemas || entity.cinemas.length === 0) && (
                                                <p className="text-gray-500 text-sm">Aucun cinéma associé</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </div>
                )
            }} 
        />
    )
}