import { getMovies } from "@/src/application/useCases/Cinema/Movie/getMovies";
import { Unauthorized } from "@/src/domain/User";
import { MovieRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/MovieRepositoryImpl";

interface getOptionTypesApiProps {
    params: Promise<{ entityId: number; cinemaId: number }>;
}

export async function GET(req : Request, { params } : getOptionTypesApiProps) {
    try 
    {
        const { searchParams } = new URL(req.url);
        const { entityId, cinemaId } = await params;
        
        const page = Number(searchParams.get('page')) ?? 1;
        const search = searchParams.get('search') ?? '';
        const statusParams = searchParams.getAll('status[]').map((id) => Number(id));

        const movies = await getMovies(MovieRepositoryImpl, entityId, cinemaId, { search, page, status: statusParams });

        return Response.json(movies);
    }
    catch (error) 
    {
        if (error instanceof Unauthorized) {
            return new Response('Unauthorized', { status: 403 });
        }
        return Response.error();
    }
}