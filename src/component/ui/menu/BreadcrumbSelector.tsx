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
    let baseCinema = cinema;

    if (!baseEntity && entitiesList && entitiesList.length === 1) {
        baseEntity = entitiesList[0];
    }

    if (!baseCinema && baseEntity && baseEntity.cinemas && baseEntity.cinemas.length === 1) {
        baseCinema = baseEntity.cinemas[0];
    }

    return (
        <div className="flex gap-3">
            { (entitiesList && entitiesList.length === 1) ? (
                <span className="my-auto">{entitiesList[0].name}</span>
            ) : (
                <Select 
                    className="mt-auto"
                    onChange={(value) => {console.log(value)}} 
                    options={entitiesList ? entitiesList.map((entity) => ({ value: entity.id, label: entity.name })) : []} 
                />
            )}

            { (baseEntity && baseEntity.cinemas && baseEntity.cinemas.length > 0) && (
                (baseEntity.cinemas.length === 1) ? (
                    <span className="my-auto">{baseEntity.cinemas[0].name}</span>
                ) : (
                    <Select 
                        className="mt-auto"
                        onChange={(value) => {console.log(value)}} 
                        options={baseEntity.cinemas.map((cinema) => ({ value: cinema.id, label: cinema.name }))} 
                    />
                )
            )}

        </div>
    )
}