import { OptionTypesRepository } from "@/src/application/repositories/Cinema/Settings/OptionTypesRepository";

export type getOptionsTypesProps = {
    search?: string;
    page : number;
}

export const getOptionsTypes = async (repo : OptionTypesRepository, entityId: number, cinemaId: number, props: getOptionsTypesProps) => {
    return repo.getOptionsTypes(entityId, cinemaId, props);
}