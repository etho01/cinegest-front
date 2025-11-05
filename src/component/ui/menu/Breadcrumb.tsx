
interface Props {
    entity : number | null;
    cinema : number | null;
    page : string;
}

export interface BreadcrumbLevel {
    name: string;
    link: string;
    subLevel?: BreadcrumbLevel;
}

export const Breadcrumb = ({ entity, cinema, page } : Props) => {
    return (
        <div>Breadcrumb</div>
    )
}