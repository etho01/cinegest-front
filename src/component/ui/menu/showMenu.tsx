import { me } from "@/src/application/useCases/User/me";
import { logout } from "@/src/application/useCases/User/logout";
import { Unauthenticated, Unauthorized, User, UserHaveAccessToCinema, UserHaveAccessToEntity } from "@/src/domain/User";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";
import { GestLayout } from "../gest-layout";
import { UnauthenticatedComponent } from "../../auth/unauthenticated-component";
import { Menu } from "./menu";
import React from "react";
import { Entity } from "@/src/domain/Entity";
import { Cinema } from "@/src/domain/Cinema";

interface ShowMenuProps {
    body : (user : User, entity : Entity | null, cinema : Cinema | null) => Promise<React.ReactNode>;
    entityId : number | null;
    cinemaId : number | null;
    page : string;
}

export interface MenuProps {
    user : User;
    entity : Entity | null;
    cinema : Cinema | null;
    page : string;
}

export const ShowMenu = async ({ body, entityId, cinemaId, page }: ShowMenuProps) => {
    let user = null;
    let entity = null;
    let cinema = null;
    try {
        user = await me(UserRepositoryImpl)

        if (entityId !== null)
        {
            if (!UserHaveAccessToEntity(user, entityId)) 
            {
                throw new Unauthorized('Vous n\'avez pas accès à cette entité.');
            }

            entity = user.entities?.find((e) => e.id == entityId) || null;

            if (cinemaId !== null && entity)
            {
                if (!UserHaveAccessToCinema(user, entityId, cinemaId)) {
                    throw new Unauthorized('Vous n\'avez pas accès à ce cinéma.');
                }
                
                cinema = entity.cinemas?.find((c) => c.id == cinemaId) || null;
            }
            else if (entity && entity.cinemas && entity.cinemas.length === 1) 
            {
                cinema = entity.cinemas[0];
            }
        }
        else if (user.entities && user.entities.length === 1) 
        {
            entity = user.entities[0];
        }

    } catch (e)
    {
        if (e instanceof Unauthenticated)
        {
            logout(UserRepositoryImpl);
            return (
                <GestLayout>
                    <UnauthenticatedComponent/>
                </GestLayout>
            )
        }
        else
        {
            throw e
        }
    }
    
    return (
        <Menu user={user} entity={entity} cinema={cinema} page={page}>
            { await body(user, entity, cinema) }
        </Menu>
    )
}