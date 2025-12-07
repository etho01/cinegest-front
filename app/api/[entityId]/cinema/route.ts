import { getCinemas } from "@/src/application/useCases/Cinema/getCinemas";
import { Unauthorized } from "@/src/domain/User";
import { CinemaRepositoryImpl } from "@/src/infrastructure/repositories/CinemaRepositoryImpl";

interface GetCinemasApiProps {
    params: Promise<{ entityId: string }>;
}

export async function GET(req : Request, { params } : GetCinemasApiProps) {
    try 
    {
        const { searchParams } = new URL(req.url);
        const paramsObj = await params;
        const entityId = parseInt(paramsObj.entityId);
        
        const page = Number(searchParams.get('page')) ?? 1;
        const search = searchParams.get('search') ?? '';

        const cinemas = await getCinemas(CinemaRepositoryImpl, {entityId, page, search})

        return Response.json(cinemas);
    }
    catch (error) 
    {
        if (error instanceof Unauthorized) {
            return new Response('Unauthorized', { status: 403 });
        }
        return Response.error();
    }
}