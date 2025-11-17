import { getRooms } from "@/src/application/useCases/Cinema/Settings/room/getRooms";
import { Unauthorized } from "@/src/domain/User";
import { RoomRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/RoomRepositoryImpl";


interface getRoomApiProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
}

export async function GET(req : Request, { params } : getRoomApiProps) {
    try 
    {
        const { searchParams } = new URL(req.url);
        const { entityId, cinemaId } = await params;
        
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