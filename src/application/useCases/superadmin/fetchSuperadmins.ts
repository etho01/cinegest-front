import { fetchSuperadminProps } from "@/src/domain/superadmin";
import { SuperadminRepository } from "../../repositories/superadminRepository";

export const fetchSuperadmins = async (repo: SuperadminRepository, props: fetchSuperadminProps) => {
    return await repo.fetchAdmins(props);
}