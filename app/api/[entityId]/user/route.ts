import { getUsers } from "@/src/application/useCases/User/getUsers";
import { Unauthorized } from "@/src/domain/User";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";


interface GetUsersApiProps {
    params: Promise<{ entityId: string }>;
}

export async function GET(req : Request, { params } : GetUsersApiProps) {
    try 
    {
        const { searchParams } = new URL(req.url);
        const paramsObj = await params;
        
        const page = Number(searchParams.get('page')) ?? 1;
        const search = searchParams.get('search') ?? '';

        const entityId = parseInt(paramsObj.entityId);
        const users = await getUsers(UserRepositoryImpl, entityId, {
            page,
            search
        })

        return Response.json(users);
    } 
    catch (error) 
    {
        if (error instanceof Unauthorized) {
            return new Response('Unauthorized', { status: 403 });
        }
        return Response.error();
    }
}