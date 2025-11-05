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
}

export interface BreadcrumbLevel {
    name: string | ((entity: Entity | null, cinema: Cinema | null, user: User) => string);
    link: string | ((entity: Entity | null, cinema: Cinema | null, user: User) => string);
    subLevel?: BreadcrumbLevel;
    showCondition?: (entity: Entity | null, cinema: Cinema | null, user: User) => boolean;
}

export const Breadcrumb = ({ entity, cinema, page, user } : Props) => {
    let breadcrumbLevel : BreadcrumbLevel | null = BreadcrumbPageList[page] || null;

    return (
        <div className="bg-white mb-5 p-5 flex justify-between shadow-sm rounded-md">
            <div className="my-auto">
                {breadcrumbLevel && <BreadcrumbLevelComponent level={breadcrumbLevel} entity={entity} cinema={cinema} user={user} />}
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
}

const BreadcrumbLevelComponent = ({ level, entity, cinema, user } : BreadcrumbLevelProps) => {
    let showLevel = true;
    if (level.showCondition) {
        showLevel = level.showCondition(entity, cinema, user);
    }

    return (
        <>
            { showLevel ? 
                <div className="inline-block">
                    {level.subLevel ? (
                        <>
                            <Link 
                                href={typeof level.link === "function" ? level.link(entity, cinema, user) : level.link}
                            >
                                {typeof level.name === "function" ? level.name(entity, cinema, user) : level.name}
                            </Link>
                            <span className="mx-2">/</span>
                            <BreadcrumbLevelComponent level={level.subLevel} entity={entity} cinema={cinema} user={user} />
                        </>
                    ) : (
                        <span>
                            {typeof level.name === "function" ? level.name(entity, cinema, user) : level.name}
                        </span>
                    )}
                </div>
            : 
                <>
                    { level.subLevel ? <BreadcrumbLevelComponent level={level.subLevel} entity={entity} cinema={cinema} user={user} /> : null }
                </>
            }

        </>
    )
}