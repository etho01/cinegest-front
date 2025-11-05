import { SuperadminRepository } from "../../repositories/SuperadminRepository";



export const deleteSuperadmin = async (repository: SuperadminRepository, superadminId: number) => {
    await repository.deleteSuperadmin(superadminId);
}