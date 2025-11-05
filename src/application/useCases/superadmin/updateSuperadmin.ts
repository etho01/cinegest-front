import { Superadmin } from "@/src/domain/superadmin";
import { SuperadminRepository } from "../../repositories/SuperadminRepository";


export const updateSuperadmin = async (repository: SuperadminRepository, superadmin: Superadmin) => {
    const updatedSuperadmin = await repository.updateSuperadmin(superadmin);
    return updatedSuperadmin;
}
