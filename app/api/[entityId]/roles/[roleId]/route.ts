import { getRole } from "@/src/application/useCases/Role/getRole";
import { Unauthorized } from "@/src/domain/User";
import { RoleRepositoryImpl } from "@/src/infrastructure/repositories/RoleRepositoryImpl";


interface GetRoleApiProps {
    params: Promise<{ entityId: string; roleId: string }>;
}

export async function GET(req : Request, { params } : GetRoleApiProps) {
    try 
    {
        const paramsObj = await params;
        const entityId = parseInt(paramsObj.entityId);
        const roleId = parseInt(paramsObj.roleId);

        const role = await getRole(RoleRepositoryImpl, entityId, roleId);

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