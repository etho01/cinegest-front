import { fetchEntities } from "@/src/application/useCases/Entity/fetchEntities";
import { EntityRepositoryImpl } from "@/src/infrastructure/repositories/EntityRepositoryImpl";

export async function GET(req : Request) {
    const { searchParams } = new URL(req.url);
    
    const page = Number(searchParams.get('page')) ?? 1;
    const search = searchParams.get('search') ?? '';

    const entities = await fetchEntities(EntityRepositoryImpl, {page, search})

    return Response.json(entities);

}