import { Cinema } from "@/src/domain/Cinema";
import { CinemaRepository } from "../../repositories/CinemaRepository";


export async function addCinema(repository: CinemaRepository, entityId: number, cinema: Cinema): Promise<Cinema> {
    return repository.addCinema(entityId, cinema);
}