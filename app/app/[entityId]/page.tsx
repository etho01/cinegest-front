import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { User, UserHasRight } from "@/src/domain/User";
import { Entity } from "@/src/domain/Entity"
import Card from "@/src/component/ui/card";
import { Button } from "@/src/component/ui/btn/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faBuilding, 
    faServer, 
    faUser, 
    faUserShield, 
    faChartLine,
    faPlus,
    faEye,
    faFilm,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface EntityPageProps {
    params: Promise<{ entityId: number }>;
}

export default async function EntityPage({ params }: EntityPageProps) {
    const resolvedParams = await params;
    const { entityId } = resolvedParams;

    return (
        <ShowMenu
            body={async (user: User, entity: Entity | null) => {
                if (!entity) {
                    return (
                        <div className="p-6">
                            <Card className="p-6 text-center">
                                <h2 className="text-xl font-bold text-red-600 mb-2">Entité non trouvée</h2>
                                <p className="text-gray-600">L'entité demandée n'existe pas ou vous n'y avez pas accès.</p>
                            </Card>
                        </div>
                    );
                }

                return (
                    <div className="p-6 space-y-6">
                        {/* En-tête de l'entité */}
                        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg p-6">
                            <h1 className="text-3xl font-bold mb-2">
                                {entity.name}
                            </h1>
                            <p className="text-indigo-100">
                                Tableau de bord de l'entité
                            </p>
                        </div>

                        {/* Statistiques de l'entité */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="p-6 bg-blue-50 border-blue-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-600 text-sm font-medium">Cinémas</p>
                                        <p className="text-2xl font-bold text-blue-900">
                                            {entity.cinemas?.length || 0}
                                        </p>
                                    </div>
                                    <FontAwesomeIcon icon={faServer} className="text-blue-500 text-2xl" />
                                </div>
                            </Card>

                            <Card className="p-6 bg-green-50 border-green-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-600 text-sm font-medium">Films totaux</p>
                                        <p className="text-2xl font-bold text-green-900">
                                            {entity.cinemas?.reduce((total, cinema) => 
                                                total + (cinema.movies?.length || 0), 0
                                            ) || 0}
                                        </p>
                                    </div>
                                    <FontAwesomeIcon icon={faFilm} className="text-green-500 text-2xl" />
                                </div>
                            </Card>

                            <Card className="p-6 bg-purple-50 border-purple-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-600 text-sm font-medium">Utilisateurs</p>
                                        <p className="text-2xl font-bold text-purple-900">
                                            {user.roles?.filter(role => role.entityId === entity.id).length || 0}
                                        </p>
                                    </div>
                                    <FontAwesomeIcon icon={faUser} className="text-purple-500 text-2xl" />
                                </div>
                            </Card>

                            <Card className="p-6 bg-orange-50 border-orange-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-orange-600 text-sm font-medium">Mes droits</p>
                                        <p className="text-lg font-bold text-orange-900">
                                            {user.roles?.filter(role => role.entityId === entity.id).length || 0} rôles
                                        </p>
                                    </div>
                                    <FontAwesomeIcon icon={faUserShield} className="text-orange-500 text-2xl" />
                                </div>
                            </Card>
                        </div>

                        {/* Actions principales */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Gestion de l'entité */}
                            <Card className="p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faBuilding} className="text-indigo-500" />
                                    Gestion de l'entité
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
                                    {UserHasRight(user, 'createCinema', null) && (
                                        <Link href={`/app/${entity.id}/cinema`}>
                                            <Button className="w-full justify-start">
                                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                                Nouveau cinéma
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

                            {/* Accès rapide */}
                            <Card className="p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faChartLine} className="text-green-500" />
                                    Accès rapide
                                </h2>
                                <div className="space-y-3">
                                    <Link href="/app">
                                        <Button variant="outline" className="w-full justify-start">
                                            <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                                            Retour au tableau de bord
                                        </Button>
                                    </Link>
                                    {entity.cinemas && entity.cinemas.length === 1 && (
                                        <Link href={`/app/${entity.id}/cinema/${entity.cinemas[0].id}`}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <FontAwesomeIcon icon={faEye} className="mr-2" />
                                                Voir le cinéma
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* Liste des cinémas */}
                        {entity.cinemas && entity.cinemas.length > 0 && (
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <FontAwesomeIcon icon={faServer} className="text-blue-500" />
                                        Cinémas de l'entité
                                    </h2>
                                    {UserHasRight(user, 'viewCinemas', null) && (
                                        <Link href={`/app/${entity.id}/cinema`}>
                                            <Button variant="outline" size="sm">
                                                <FontAwesomeIcon icon={faEye} className="mr-2" />
                                                Voir tous
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {entity.cinemas.map((cinema) => (
                                        <div key={cinema.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="font-semibold flex items-center gap-2">
                                                    <FontAwesomeIcon icon={faServer} className="text-blue-500" />
                                                    {cinema.name}
                                                </h3>
                                            </div>
                                            
                                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                                                <p className="flex items-center gap-2">
                                                    <FontAwesomeIcon icon={faBuilding} className="text-gray-400" />
                                                    {cinema.city}, {cinema.country}
                                                </p>
                                                {cinema.movies && (
                                                    <p className="flex items-center gap-2">
                                                        <FontAwesomeIcon icon={faFilm} className="text-gray-400" />
                                                        {cinema.movies.length} films
                                                    </p>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <Link href={`/app/${entity.id}/cinema/${cinema.id}`}>
                                                    <Button variant="outline" size="sm" className="w-full">
                                                        <FontAwesomeIcon icon={faEye} className="mr-1" />
                                                        Voir
                                                    </Button>
                                                </Link>
                                                {UserHasRight(user, 'viewMovies', cinema.id) && (
                                                    <Link href={`/app/${entity.id}/cinema/${cinema.id}/movie`}>
                                                        <Button variant="outline" size="sm" className="w-full">
                                                            <FontAwesomeIcon icon={faFilm} className="mr-1" />
                                                            Films
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Message si aucun cinéma */}
                        {(!entity.cinemas || entity.cinemas.length === 0) && (
                            <Card className="p-6 text-center">
                                <FontAwesomeIcon icon={faServer} className="text-gray-300 text-4xl mb-4" />
                                <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun cinéma</h3>
                                <p className="text-gray-500 mb-4">
                                    Cette entité n'a pas encore de cinémas associés.
                                </p>
                                {UserHasRight(user, 'createCinema', null) && (
                                    <Link href={`/app/${entity.id}/cinema`}>
                                        <Button>
                                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                            Créer le premier cinéma
                                        </Button>
                                    </Link>
                                )}
                            </Card>
                        )}

                        {/* Informations de l'entité */}
                        <Card className="p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faBuilding} className="text-indigo-500" />
                                Informations de l'entité
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-gray-600">Nom de l'entité</span>
                                        <span className="font-medium">{entity.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-gray-600">Nombre de cinémas</span>
                                        <span className="font-medium">{entity.cinemas?.length || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-gray-600">ID de l'entité</span>
                                        <span className="font-medium">#{entity.id}</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-gray-600">Mes rôles</span>
                                        <span className="font-medium">
                                            {user.roles?.filter(role => role.entityId === entity.id).length || 0}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-gray-600">Accès total films</span>
                                        <span className="font-medium">
                                            {entity.cinemas?.reduce((total, cinema) => 
                                                total + (cinema.movies?.length || 0), 0
                                            ) || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                );
            }}
            entityId={entityId}
            cinemaId={null}
            page="entityReview"
        />
    );
}