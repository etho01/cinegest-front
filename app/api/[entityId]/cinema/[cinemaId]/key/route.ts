import { getKeys } from "@/src/application/useCases/Cinema/Key/getKeys";
import { Unauthorized } from "@/src/domain/User";
import { KeyRepositoryImpl } from "@/src/infrastructure/repositories/KeyRepositoryImpl";


interface getOptionTypesApiProps {
    params: Promise<{ entityId: string; cinemaId: string }>;
}

export async function GET(req : Request, { params } : getOptionTypesApiProps) {
    try 
    {
        const { searchParams } = new URL(req.url);
        const resolvedParams = await params;
        const entityId = parseInt(resolvedParams.entityId);
        const cinemaId = parseInt(resolvedParams.cinemaId);
        
        const page = Number(searchParams.get('page')) ?? 1;
        const rooms = searchParams.getAll('rooms[]').map((v) => parseInt(v));
        const movies = searchParams.getAll('movies[]').map((v) => parseInt(v));

        const keys = await getKeys(KeyRepositoryImpl, entityId, cinemaId, { page, rooms, movies });

        return Response.json(keys);
    }
    catch (error) 
    {
        if (error instanceof Unauthorized) {
            return new Response('Unauthorized', { status: 403 });
        }
        return Response.error();
    }
}