import { ShowMenu } from "@/src/component/ui/menu/showMenu";
import { User, UserHasRight } from "@/src/domain/User";
import { Entity } from "@/src/domain/Entity";
import { Cinema } from "@/src/domain/Cinema";
import Card from "@/src/component/ui/card";
import { Button } from "@/src/component/ui/btn/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faServer, 
    faFilm, 
    faKey, 
    faCalendarDays, 
    faChartLine,
    faPlus,
    faEye,
    faCog,
    faBuilding,
    faMapMarkerAlt,
    faGlobe,
    faHardDrive,
    faPlayCircle,
    faTools
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface CinemaPageProps {
    params: Promise<{ entityId: number, cinemaId: number }>;
}

export default async function CinemaPage({ params }: CinemaPageProps) {
    const resolvedParams = await params;
    const { entityId, cinemaId } = resolvedParams;

    return (
        <ShowMenu
            body={async (user: User, entity: Entity | null, cinema: Cinema | null) => {
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

                if (!cinema) {
                    return (
                        <div className="p-6">
                            <Card className="p-6 text-center">
                                <h2 className="text-xl font-bold text-red-600 mb-2">Cinéma non trouvé</h2>
                                <p className="text-gray-600">Le cinéma demandé n'existe pas ou vous n'y avez pas accès.</p>
                                <Link href={`/app/${entityId}/cinema`} className="mt-4 inline-block">
                                    <Button variant="outline">
                                        <FontAwesomeIcon icon={faServer} className="mr-2" />
                                        Retour aux cinémas
                                    </Button>
                                </Link>
                            </Card>
                        </div>
                    );
                }

                return (
                    <div className="p-6 space-y-6">
                        {/* En-tête du cinéma */}
                        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">
                                        {cinema.name}
                                    </h1>
                                    <div className="flex items-center gap-4 text-green-100">
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                                            <span>{cinema.city}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FontAwesomeIcon icon={faGlobe} />
                                            <span>{cinema.country}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-green-100 text-sm">Entité</p>
                                    <p className="text-white font-semibold">{entity.name}</p>
                                </div>
                            </div>
                        </div>

                        {/* Statistiques du cinéma */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="p-6 bg-blue-50 border-blue-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-blue-600 text-sm font-medium">Films</p>
                                        <p className="text-2xl font-bold text-blue-900">
                                            {cinema.movies?.length || 0}
                                        </p>
                                    </div>
                                    <FontAwesomeIcon icon={faFilm} className="text-blue-500 text-2xl" />
                                </div>
                            </Card>

                            <Card className="p-6 bg-green-50 border-green-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-green-600 text-sm font-medium">Clés DCP</p>
                                        <p className="text-2xl font-bold text-green-900">
                                            {cinema.keys?.length || 0}
                                        </p>
                                    </div>
                                    <FontAwesomeIcon icon={faKey} className="text-green-500 text-2xl" />
                                </div>
                            </Card>

                            <Card className="p-6 bg-purple-50 border-purple-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-600 text-sm font-medium">Salles</p>
                                        <p className="text-2xl font-bold text-purple-900">
                                            {cinema.rooms?.length || 0}
                                        </p>
                                    </div>
                                    <FontAwesomeIcon icon={faBuilding} className="text-purple-500 text-2xl" />
                                </div>
                            </Card>

                            <Card className="p-6 bg-orange-50 border-orange-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-orange-600 text-sm font-medium">Sessions</p>
                                        <p className="text-2xl font-bold text-orange-900">
                                            {cinema.sessions?.length || 0}
                                        </p>
                                    </div>
                                    <FontAwesomeIcon icon={faCalendarDays} className="text-orange-500 text-2xl" />
                                </div>
                            </Card>
                        </div>

                        {/* Actions principales */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Gestion du contenu */}
                            <Card className="p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faFilm} className="text-blue-500" />
                                    Gestion du contenu
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {UserHasRight(user, 'viewMovies', cinema.id) && (
                                        <Link href={`/app/${entityId}/cinema/${cinemaId}/movie`}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <FontAwesomeIcon icon={faFilm} className="mr-2" />
                                                Gérer les films
                                            </Button>
                                        </Link>
                                    )}
                                    {UserHasRight(user, 'createMovie', cinema.id) && (
                                        <Link href={`/app/${entityId}/cinema/${cinemaId}/movie`}>
                                            <Button className="w-full justify-start">
                                                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                                Nouveau film
                                            </Button>
                                        </Link>
                                    )}
                                    {UserHasRight(user, 'viewKeys', cinema.id) && (
                                        <Link href={`/app/${entityId}/cinema/${cinemaId}/key`}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <FontAwesomeIcon icon={faKey} className="mr-2" />
                                                Clés DCP
                                            </Button>
                                        </Link>
                                    )}
                                    {UserHasRight(user, 'viewCinemaSessions', cinema.id) && (
                                        <Link href={`/app/${entityId}/cinema/${cinemaId}/session`}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                                                Sessions
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </Card>

                            {/* Configuration et paramètres */}
                            <Card className="p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faCog} className="text-green-500" />
                                    Configuration
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {UserHasRight(user, 'viewCinemaSettings', cinema.id) && (
                                        <Link href={`/app/${entityId}/cinema/${cinemaId}/settings`}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <FontAwesomeIcon icon={faCog} className="mr-2" />
                                                Paramètres
                                            </Button>
                                        </Link>
                                    )}
                                    {UserHasRight(user, 'viewRooms', cinema.id) && (
                                        <Link href={`/app/${entityId}/cinema/${cinemaId}/settings/room`}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                                                Salles
                                            </Button>
                                        </Link>
                                    )}
                                    {UserHasRight(user, 'viewStorages', cinema.id) && (
                                        <Link href={`/app/${entityId}/cinema/${cinemaId}/settings/storage`}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <FontAwesomeIcon icon={faHardDrive} className="mr-2" />
                                                Stockages
                                            </Button>
                                        </Link>
                                    )}
                                    {UserHasRight(user, 'viewOptions', cinema.id) && (
                                        <Link href={`/app/${entityId}/cinema/${cinemaId}/settings/option`}>
                                            <Button variant="outline" className="w-full justify-start">
                                                <FontAwesomeIcon icon={faTools} className="mr-2" />
                                                Options
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </Card>
                        </div>

                        {/* Accès rapide et navigation */}
                        <Card className="p-6">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <FontAwesomeIcon icon={faChartLine} className="text-purple-500" />
                                Accès rapide
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {UserHasRight(user, 'viewEntity', null) && (
                                    <Link href={`/app/${entityId}`}>
                                        <Button variant="outline" className="w-full justify-start">
                                            <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                                            Entité {entity.name}
                                        </Button>
                                    </Link>
                                )}
                                {UserHasRight(user, 'viewCinemas', null) && (
                                    <Link href={`/app/${entityId}/cinema`}>
                                        <Button variant="outline" className="w-full justify-start">
                                            <FontAwesomeIcon icon={faServer} className="mr-2" />
                                            Tous les cinémas
                                        </Button>
                                    </Link>
                                )}
                                <Link href="/app">
                                    <Button variant="outline" className="w-full justify-start">
                                        <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                                        Tableau de bord
                                    </Button>
                                </Link>
                                {cinema.movies && cinema.movies.length > 0 && UserHasRight(user, 'viewMovies', cinema.id) && (
                                    <Link href={`/app/${entityId}/cinema/${cinemaId}/movie/${cinema.movies[0].id}`}>
                                        <Button variant="outline" className="w-full justify-start">
                                            <FontAwesomeIcon icon={faPlayCircle} className="mr-2" />
                                            Dernier film
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </Card>

                        {/* Informations détaillées */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Informations du cinéma */}
                            <Card className="p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faServer} className="text-blue-500" />
                                    Informations du cinéma
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-gray-600">Nom</span>
                                        <span className="font-medium">{cinema.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-gray-600">Ville</span>
                                        <span className="font-medium">{cinema.city}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-gray-600">Pays</span>
                                        <span className="font-medium">{cinema.country}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-gray-600">ID Cinéma</span>
                                        <span className="font-medium">#{cinema.id}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-gray-600">Entité</span>
                                        <span className="font-medium">{entity.name}</span>
                                    </div>
                                </div>
                            </Card>

                            {/* Statistiques détaillées */}
                            <Card className="p-6">
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <FontAwesomeIcon icon={faChartLine} className="text-green-500" />
                                    Statistiques
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-gray-600">Films disponibles</span>
                                        <span className="font-medium">{cinema.movies?.length || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-gray-600">Clés DCP actives</span>
                                        <span className="font-medium">{cinema.keys?.length || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-gray-600">Salles configurées</span>
                                        <span className="font-medium">{cinema.rooms?.length || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2 border-b">
                                        <span className="text-gray-600">Sessions programmées</span>
                                        <span className="font-medium">{cinema.sessions?.length || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-2">
                                        <span className="text-gray-600">Mes droits</span>
                                        <span className="font-medium">
                                            {user.roles?.filter(role => role.cinemaId === cinema.id).length || 0} rôles
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Films récents ou message d'état */}
                        {cinema.movies && cinema.movies.length > 0 ? (
                            <Card className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <FontAwesomeIcon icon={faFilm} className="text-blue-500" />
                                        Films récents
                                    </h2>
                                    <Link href={`/app/${entityId}/cinema/${cinemaId}/movie`}>
                                        <Button variant="outline" size="sm">
                                            <FontAwesomeIcon icon={faEye} className="mr-2" />
                                            Voir tous
                                        </Button>
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {cinema.movies.slice(0, 6).map((movie) => (
                                        <Link 
                                            key={movie.id} 
                                            href={`/app/${entityId}/cinema/${cinemaId}/movie/${movie.id}`}
                                            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FontAwesomeIcon icon={faFilm} className="text-blue-500 text-xl" />
                                                <div>
                                                    <h4 className="font-semibold">{movie.name}</h4>
                                                    <p className="text-sm text-gray-600">
                                                        {movie.versions?.length || 0} versions
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </Card>
                        ) : (
                            <Card className="p-6 text-center">
                                <FontAwesomeIcon icon={faFilm} className="text-gray-300 text-4xl mb-4" />
                                <h3 className="text-lg font-semibold text-gray-600 mb-2">Aucun film</h3>
                                <p className="text-gray-500 mb-4">
                                    Ce cinéma n'a pas encore de films ajoutés.
                                </p>
                                {UserHasRight(user, 'createMovie', cinema.id) && (
                                    <Link href={`/app/${entityId}/cinema/${cinemaId}/movie`}>
                                        <Button>
                                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                            Ajouter le premier film
                                        </Button>
                                    </Link>
                                )}
                            </Card>
                        )}
                    </div>
                );
            }}
            entityId={entityId}
            cinemaId={cinemaId}
            page="cinemaReview"
        />
    );
}