import { getCinemas } from "@/src/application/useCases/Cinema/getCinemas";
import { CinemaRepositoryImpl } from "@/src/infrastructure/repositories/CinemaRepositoryImpl";

interface GetCinemasApiProps {
    params: Promise<{ entityId: number }>;
}

export async function GET(req : Request, { params } : GetCinemasApiProps) {
    const { searchParams } = new URL(req.url);
    const paramsObj = await params;
    
    const page = Number(searchParams.get('page')) ?? 1;
    const search = searchParams.get('search') ?? '';

    const cinemas = await getCinemas(CinemaRepositoryImpl, {entityId: paramsObj.entityId, page, search})

    return Response.json(cinemas);
}