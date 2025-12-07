import { getRooms } from "@/src/application/useCases/Cinema/Settings/room/getRooms";
import { Unauthorized } from "@/src/domain/User";
import { RoomRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/RoomRepositoryImpl";


interface getRoomsApiProps {
    params: Promise<{ entityId: string; cinemaId: string }>;
}

export async function GET(req : Request, { params } : getRoomsApiProps) {
    try 
    {
        const { searchParams } = new URL(req.url);
        const resolvedParams = await params;
        const entityId = parseInt(resolvedParams.entityId);
        const cinemaId = parseInt(resolvedParams.cinemaId);
        
        const page = Number(searchParams.get('page')) ?? 1;
        const search = searchParams.get('search') ?? '';

        const options = searchParams.getAll('options[]').map((id) => Number(id));
        const storages = searchParams.getAll('storages[]').map((id) => Number(id));

        const rooms = await getRooms(RoomRepositoryImpl, entityId, cinemaId, { search, page, options: options, storages: storages });

        return Response.json(rooms);
    }
    catch (error) 
    {
        if (error instanceof Unauthorized) {
            return new Response('Unauthorized', { status: 403 });
        }
        return Response.error();
    }
}