import { logout } from "@/src/application/useCases/User/logout";
import { Unauthenticated, Unauthorized, User, UserHaveAccessToCinema, UserHaveAccessToEntity } from "@/src/domain/User";
import { GestLayout } from "../gest-layout";
import { UnauthenticatedComponent } from "../../auth/unauthenticated-component";
import { Menu } from "./menu";
import React from "react";
import { Entity, EntityNotFound } from "@/src/domain/Entity";
import { Cinema, CinemaNotFound } from "@/src/domain/Cinema";
import { PageError } from "../error/PageError";
import { CustomError } from "@/src/domain/global";
import { me } from "@/src/application/useCases/User/me";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";

interface ShowMenuProps {
    body : (user : User, entity : Entity | null, cinema : Cinema | null) => Promise<React.ReactNode>;
    entityId : number | null;
    cinemaId : number | null;
    page : string;
    customParam? : any;
}

export interface MenuProps {
    user : User;
    entity : Entity | null;
    cinema : Cinema | null;
    page : string;
    customParam? : any;
}

export const ShowMenu = async ({ body, entityId, cinemaId, page, customParam }: ShowMenuProps) => {
    let user = null;
    let entity = null;
    let cinema = null;
    user = await me(UserRepositoryImpl);
    try {
        

        if (entityId !== null)
        {
            if (!UserHaveAccessToEntity(user, entityId)) 
            {
                throw new Unauthorized('Vous n\'avez pas accès à cette entité.');
            }

            entity = user.entities?.find((e) => e.id == entityId) || null;
            if (!entity) 
            {
                throw new EntityNotFound();
            }
        }
        else if (user.entities && user.entities.length === 1) 
        {
            entity = user.entities[0];
        }

        if (cinemaId !== null && entity)
        {
            if (!UserHaveAccessToCinema(user, entity.id, cinemaId)) {
                throw new Unauthorized('Vous n\'avez pas accès à ce cinéma.');
            }
            
            cinema = entity.cinemas?.find((c) => c.id == cinemaId) || null;
            if (!cinema) {
                throw new CinemaNotFound();
            }
        }
        else if (entity && entity.cinemas && entity.cinemas.length === 1) 
        {
            cinema = entity.cinemas[0];
        }
    } 
    catch (e : any)
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
        else if (e instanceof CustomError)
        {
            return (
                <Menu user={user} entity={entity} cinema={cinema} page={page} customParam={customParam}>
                    <PageError error={e} />
                </Menu>
            )
        }
        else
        {
            throw e
        }
    }
    
    return (
        <Menu user={user} entity={entity} cinema={cinema} page={page} customParam={customParam}>
            { await body(user, entity, cinema) }
        </Menu>
    )
}