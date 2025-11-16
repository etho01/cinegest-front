import { OptionTypesRepository } from "@/src/application/repositories/Cinema/Settings/OptionTypesRepository";


export const getAllOptionsTypes = async (repo : OptionTypesRepository, entityId: number, cinemaId: number) => {
    return repo.getAllOptionsTypes(entityId, cinemaId);
}