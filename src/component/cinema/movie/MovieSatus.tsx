import { StatusItem } from "../../ui/review/StatusItem";


interface MovieStatusProps {
    status: string;
}

interface StatusInfo {
    label : string;
    variant : 'success' | 'danger' | 'warning' | 'primary' | 'secondary' | 'other';
}

export const MovieStatus = ({ status }: MovieStatusProps) => {
    const statusList: Record<string, StatusInfo> = {
        "0" : {
            label : 'Inactif',
            variant : 'danger',
        },
        "1" : {
            label : 'Actif',
            variant : 'success',
        },
    };

    if (statusList[status]) {
        return (
            <StatusItem status={statusList[status].label} variant={statusList[status].variant} />
        );
    }

    return (
        <div className="font-semibold">
            Unknown
        </div>
    );

}