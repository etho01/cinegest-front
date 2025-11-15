import { getCinemas } from "@/src/application/useCases/Cinema/getCinemas";
import { getOptionsTypes } from "@/src/application/useCases/Cinema/Settings/OptionTypes/getOptionsTypes";
import { Unauthorized } from "@/src/domain/User";
import { OptionTypesRepositoryImpl } from "@/src/infrastructure/repositories/Cinema/Settings/OptionTypesControllerImpl";
import { CinemaRepositoryImpl } from "@/src/infrastructure/repositories/CinemaRepositoryImpl";

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

        const optionTypes = await getOptionsTypes(OptionTypesRepositoryImpl, entityId, cinemaId, { search, page });

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