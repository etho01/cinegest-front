import { searchMovie } from "@/src/application/useCases/Cinema/Movie/search";
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
        
        const search = searchParams.get('search') ?? '';

        const optionTypes = await searchMovie(MovieRepositoryImpl, entityId, cinemaId, search);

        return Response.json(optionTypes);
    }
    catch (error) 
    {
        if (error instanceof Unauthorized) {
            return new Response('Unauthorized', { status: 403 });
        }
        return Response.error();
    }
}