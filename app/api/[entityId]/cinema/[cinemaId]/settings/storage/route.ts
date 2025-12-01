import { getStorages } from "@/src/application/useCases/Cinema/Settings/Storage/getStorages";
import { Unauthorized } from "@/src/domain/User";
import { StorageRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/StorageRepositoryImpl";


interface getStorageTypesApiProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
}

export async function GET(req : Request, { params } : getStorageTypesApiProps) {
    try 
    {
        const { searchParams } = new URL(req.url);
        const { entityId, cinemaId } = await params;
        
        const page = Number(searchParams.get('page')) ?? 1;
        const search = searchParams.get('search') ?? '';

        const storageTypeParams = searchParams.getAll('storageTypes[]').map((id) => Number(id));

        const storageTypes = await getStorages(StorageRepositoryImpl, entityId, cinemaId, { search, page, storageTypes: storageTypeParams });

        return Response.json(storageTypes);
    }
    catch (error) 
    {
        if (error instanceof Unauthorized) {
            return new Response('Unauthorized', { status: 403 });
        }
        return Response.error();
    }
}