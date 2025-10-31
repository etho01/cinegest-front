import { getUser } from "@/src/application/useCases/User/getUser";
import { logout } from "@/src/application/useCases/User/logout";
import { Unauthenticated, User } from "@/src/domain/User";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";
import { GestLayout } from "../ui/gest-layout";
import { UnauthenticatedComponent } from "../auth/unauthenticated-component";
import { Menu } from "./menu";
import React from "react";

interface ShowMenuProps {
    body : (user : User) => Promise<React.ReactNode>;
    entityId : number | null;
    cinemaId : number | null;
    page : string;
}

export interface MenuProps {
    user : User;
    entity : number | null;
    cinema : number | null;
    page : string;
}

export const ShowMenu = async ({ body, entityId, cinemaId, page }: ShowMenuProps) => {
    let user = null;
    try {
        user = await getUser(UserRepositoryImpl)
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
    console.log(user);
    
    return (
        <Menu user={user} entity={entityId} cinema={cinemaId} page={page}>
            { await body(user) }
        </Menu>
    )
}