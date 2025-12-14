import { getCinemaApis } from "@/src/application/useCases/cinemaApi/getCinemaApis";
import { Unauthorized } from "@/src/domain/User";
import { CinemaApiRepositoryImpl } from "@/src/infrastructure/repositories/CinemaApiRepositoryImpt";


interface GetRolesApiProps {
    params: Promise<{ entityId: string }>;
}

export async function GET(req : Request, { params } : GetRolesApiProps) {
    try 
    {
        const { searchParams } = new URL(req.url);
        const paramsObj = await params;
        
        const page = Number(searchParams.get('page')) ?? 1;
        const search = searchParams.get('search') ?? '';
        const cinemaIds = searchParams.getAll('cinemaIds[]');

        const entityId = parseInt(paramsObj.entityId);
        const roles = await getCinemaApis(CinemaApiRepositoryImpl, entityId, { search, page, cinemaIds: cinemaIds.map(id => parseInt(id)) });

        return Response.json(roles);
    }
    catch (error) 
    {
        if (error instanceof Unauthorized) {
            return new Response('Unauthorized', { status: 403 });
        }
        return Response.error();
    }
}