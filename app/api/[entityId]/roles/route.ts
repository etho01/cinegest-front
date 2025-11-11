import { getRoles } from "@/src/application/useCases/Role/getRoles";
import { Unauthorized } from "@/src/domain/User";
import { RoleRepositoryImpl } from "@/src/infrastructure/repositories/RoleRepositoryImpl";

interface GetRolesApiProps {
    params: Promise<{ entityId: number }>;
}

export async function GET(req : Request, { params } : GetRolesApiProps) {
    try 
    {
        const { searchParams } = new URL(req.url);
        const paramsObj = await params;
        
        const page = Number(searchParams.get('page')) ?? 1;
        const search = searchParams.get('search') ?? '';

        const roles = await getRoles(RoleRepositoryImpl, paramsObj.entityId, { search, page });

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