import { Cinema } from "@/src/domain/Cinema";
import { CinemaRepository } from "../../repositories/CinemaRepository";

export async function updateCinema(repository: CinemaRepository, entityId: number, cinema: Cinema): Promise<Cinema> {
    return repository.updateCinema(entityId, cinema);
}