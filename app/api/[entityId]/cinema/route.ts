import { getCinemas } from "@/src/application/useCases/Cinema/getCinemas";
import { CinemaRepositoryImpl } from "@/src/infrastructure/repositories/CinemaRepositoryImpl";


export async function GET(req : Request, { params } : { params: { entityId: string }}) {
    const { searchParams } = new URL(req.url);
    
    const page = Number(searchParams.get('page')) ?? 1;
    const search = searchParams.get('search') ?? '';

    const cinemas = await getCinemas(CinemaRepositoryImpl, {entityId: Number(params.entityId), page, search})

    return Response.json(cinemas);
}