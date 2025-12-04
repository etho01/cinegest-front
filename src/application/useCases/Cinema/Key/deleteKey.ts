import { KeyRepository } from "@/src/application/repositories/Cinema/KeyRepository";


export const deleteKey = async (repo : KeyRepository, entityId: number, cinemaId: number, keyId : number) : Promise<void> => {
    await repo.deleteKey(entityId, cinemaId, keyId);
}