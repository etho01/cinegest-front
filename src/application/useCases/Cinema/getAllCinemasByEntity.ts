import { Cinema } from "@/src/domain/Cinema";
import { CinemaRepository } from "../../repositories/CinemaRepository";


export async function getAllCinemasByEntity(repo: CinemaRepository, entityId: number): Promise<Cinema[]> {
    return await repo.getAllCinemasByEntity(entityId);
}