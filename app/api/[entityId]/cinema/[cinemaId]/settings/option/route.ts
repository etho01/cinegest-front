import { getOptions } from "@/src/application/useCases/Cinema/Settings/Option/getOptions";
import { Unauthorized } from "@/src/domain/User";
import { OptionsRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionsRepositoryImpl";


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

        const optionTypes = await getOptions(OptionsRepositoryImpl, entityId, cinemaId, { search, page });

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