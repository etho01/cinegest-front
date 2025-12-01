import { getRole } from "@/src/application/useCases/Role/getRole";
import { Unauthorized } from "@/src/domain/User";
import { RoleRepositoryImpl } from "@/src/infrastructure/repositories/RoleRepositoryImpl";


interface GetRolesApiProps {
    params: Promise<{ entityId: number; roleId: number }>;
}

export async function GET(req : Request, { params } : GetRolesApiProps) {
    try 
    {
        const paramsObj = await params;

        const role = await getRole(RoleRepositoryImpl, paramsObj.entityId, paramsObj.roleId);

        return Response.json(role);
    }
    catch (error) 
    {
        if (error instanceof Unauthorized) {
            return new Response('Unauthorized', { status: 403 });
        }
        return Response.error();
    }
}