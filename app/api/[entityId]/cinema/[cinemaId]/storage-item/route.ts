import { getStorageItems } from "@/src/application/useCases/Cinema/StorageItem/getStorageItems";
import { Unauthorized } from "@/src/domain/User";
import { StorageItemRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/StorageItemRepositoryImpl";

interface getStorageItemRouteParams {
    params: Promise<{ entityId: string; cinemaId: string }>;
}

export async function GET(req : Request, { params } : getStorageItemRouteParams) : Promise<Response>{
    try 
    {
        const { searchParams } = new URL(req.url);
        const resolvedParams = await params;
        const entityId = parseInt(resolvedParams.entityId);
        const cinemaId = parseInt(resolvedParams.cinemaId);
        
        const page = Number(searchParams.get('page')) ?? 1;
        const rooms = searchParams.getAll('rooms[]').map((id) => Number(id));
        const movies = searchParams.getAll('movies[]').map((id) => Number(id));
        const storage = searchParams.getAll('storage[]').map((id) => Number(id));

        const optionTypes = await getStorageItems(StorageItemRepositoryImpl, entityId, cinemaId, {
            page,
            rooms,
            movies,
            storage,
        });

        return Response.json(optionTypes);
    }
    catch (error) 
    {
        if (error instanceof Unauthorized) {
            return new Response('Unauthorized', { status: 403 });
        }
        return Response.error();
    }
}