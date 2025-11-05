import { Superadmin } from "@/src/domain/superadmin";
import { SuperadminRepository } from "../../repositories/SuperadminRepository";


export const addSuperadmin = async (repository: SuperadminRepository, superadmin: Superadmin) => {
    const createdSuperadmin = await repository.addSuperadmin(superadmin);
    return createdSuperadmin;
}