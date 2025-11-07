"use client";

import { User } from "@/src/domain/User";
import { Select } from "../form/Select";
import { Cinema } from "@/src/domain/Cinema";
import { Entity } from "@/src/domain/Entity";

interface BreadcrumbSelectorProps {
    user : User,
    cinema : Cinema | null,
    entity : Entity | null
}

export const BreadcrumbSelector = ({ user, cinema, entity } : BreadcrumbSelectorProps) => {
    const entitiesList = user.entities;
    let baseEntity = entity;

    if (!baseEntity && entitiesList && entitiesList.length > 0) {
        baseEntity = entitiesList[0];
    }

    return (
        <div className="flex gap-3">
            { (entitiesList && entitiesList.length === 1) ? (
                <span>{entitiesList[0].name}</span>
            ) : (
                <Select 
                    onChange={(value) => {console.log(value)}} 
                    options={entitiesList ? entitiesList.map((entity) => ({ value: entity.id, label: entity.name })) : []} 
                />
            )}
        </div>
    )
}