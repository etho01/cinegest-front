import { fetchSuperadmins } from "@/src/application/useCases/superadmin/fetchSuperadmins";
import { SuperadminRepositoryImpl } from "@/src/infrastructure/repositories/SuperadminRepositoryImpl";

export async function GET(req : Request) {
    const { searchParams } = new URL(req.url);
    
    const page = Number(searchParams.get('page')) ?? 1;
    const search = searchParams.get('search') ?? '';

    const entities = await fetchSuperadmins(SuperadminRepositoryImpl, {page, search})

    return Response.json(entities);

}