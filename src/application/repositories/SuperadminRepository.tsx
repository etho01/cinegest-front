import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { fetchSuperadminProps, Superadmin } from "@/src/domain/superadmin";

export interface SuperadminRepository {
    fetchAdmins: (props : fetchSuperadminProps) => Promise<Paginator<Superadmin>>;
}