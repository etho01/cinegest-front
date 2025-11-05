import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { fetchSuperadminProps, Superadmin } from "@/src/domain/superadmin";

export interface SuperadminRepository {
    fetchAdmins: (props : fetchSuperadminProps) => Promise<Paginator<Superadmin>>;
    addSuperadmin: (superadmin : Superadmin) => Promise<Superadmin>;
    updateSuperadmin: (superadmin : Superadmin) => Promise<Superadmin>;
    deleteSuperadmin: (superadminId : number) => Promise<void>;
}