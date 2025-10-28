import { getUser } from "@/src/application/useCases/User/getUser";
import { logout } from "@/src/application/useCases/User/logout";
import { Unauthenticated, User } from "@/src/domain/User";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";
import { GestLayout } from "../ui/gest-layout";
import { UnauthenticatedComponent } from "../auth/unauthenticated-component";
import { Menu } from "./menu";
import React from "react";

interface ShowMenuProps {
    body : (user : User) => Promise<React.ReactNode>
}

export const ShowMenu = async ({ body }: ShowMenuProps) => {
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
    
    return (
        <Menu user={user}>
            { await body(user) }
        </Menu>
    )
}