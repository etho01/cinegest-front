import { getKeys } from "@/src/application/useCases/Cinema/Key/getKeys";
import { Unauthorized } from "@/src/domain/User";
import { KeyRepositoryImpl } from "@/src/infrastructure/repositories/KeyRepositoryImpl";


interface getOptionTypesApiProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
}

export async function GET(req : Request, { params } : getOptionTypesApiProps) {
    try 
    {
        const { searchParams } = new URL(req.url);
        const { entityId, cinemaId } = await params;
        
        const page = Number(searchParams.get('page')) ?? 1;

        const movies = await getKeys(KeyRepositoryImpl, entityId, cinemaId, { page });

        return Response.json(movies);
    }
    catch (error) 
    {
        if (error instanceof Unauthorized) {
            return new Response('Unauthorized', { status: 403 });
        }
        return Response.error();
    }
}