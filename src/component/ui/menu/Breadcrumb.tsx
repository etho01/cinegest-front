import { BreadcrumbPageList } from "@/BreadcrumbPage";
import { User } from "@/src/domain/User";
import Link from "next/link";
import { BreadcrumbSelector } from "./BreadcrumbSelector";
import { Entity } from "@/src/domain/Entity";
import { Cinema } from "@/src/domain/Cinema";

interface Props {
    entity : Entity | null;
    cinema : Cinema | null;
    page : string;
    user : User;
    customParam? : unknown;
}

export interface BreadcrumbLevel {
    name: string | ((entity: Entity | null, cinema: Cinema | null, user: User, customParam?: unknown) => string);
    link: string | ((entity: Entity | null, cinema: Cinema | null, user: User, customParam?: unknown) => string);
    subLevel?: BreadcrumbLevel;
    showCondition?: (entity: Entity | null, cinema: Cinema | null, user: User, customParam?: unknown) => boolean;
    customParam? : unknown;
}

export const Breadcrumb = ({ entity, cinema, page, user, customParam } : Props) => {
    const breadcrumbLevel : BreadcrumbLevel | null = BreadcrumbPageList[page] || null;

    return (
        <div className="bg-white mb-5 p-5 flex justify-between shadow-sm rounded-md">
            <div className="my-auto">
                {breadcrumbLevel && <BreadcrumbLevelComponent level={breadcrumbLevel} entity={entity} cinema={cinema} user={user} customParam={customParam} />}
            </div>
            <div>
                <BreadcrumbSelector user={user} cinema={cinema} entity={entity} />
            </div>
        </div>
    )
}

interface BreadcrumbLevelProps {
    level : BreadcrumbLevel,
    cinema : Cinema | null,
    entity : Entity | null,
    user : User
    customParam? : unknown;
}

const BreadcrumbLevelComponent = ({ level, entity, cinema, user, customParam } : BreadcrumbLevelProps) => {
    let showLevel = true;
    if (level.showCondition) {
        showLevel = level.showCondition(entity, cinema, user, customParam);
    }

    return (
        <>
            { showLevel ? 
                <div className="inline-block">
                    {level.subLevel ? (
                        <>
                            <Link 
                                href={typeof level.link === "function" ? level.link(entity, cinema, user, customParam) : level.link}
                            >
                                {typeof level.name === "function" ? level.name(entity, cinema, user, customParam) : level.name}
                            </Link>
                            <span className="mx-2">/</span>
                            <BreadcrumbLevelComponent level={level.subLevel} entity={entity} cinema={cinema} user={user} customParam={customParam} />
                        </>
                    ) : (
                        <span>
                            {typeof level.name === "function" ? level.name(entity, cinema, user, customParam) : level.name}
                        </span>
                    )}
                </div>
            : 
                <>
                    { level.subLevel ? <BreadcrumbLevelComponent level={level.subLevel} entity={entity} cinema={cinema} user={user} customParam={customParam} /> : null }
                </>
            }

        </>
    )
}