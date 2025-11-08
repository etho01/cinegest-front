import { fetchSuperadminProps } from "@/src/domain/superadmin";
import { SuperadminRepository } from "../../repositories/SuperadminRepository";

export const fetchSuperadmins = async (repo: SuperadminRepository, props: fetchSuperadminProps) => {
    return await repo.fetchAdmins(props);
}