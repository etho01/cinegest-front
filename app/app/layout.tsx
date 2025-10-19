import { getUser } from "@/src/application/useCases/User/getUser";
import { logout } from "@/src/application/useCases/User/logout";
import { UnauthenticatedComponent } from "@/src/component/auth/unauthenticated-component";
import { GestLayout } from "@/src/component/ui/gest-layout";
import { Unauthenticated } from "@/src/domain/entities/User";
import { UserRepositoryImpl } from "@/src/infrastructure/repositories/UserRepositoryImpl";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {

}

export default async function Layout({ children } : Props) {

    try {
        await getUser(UserRepositoryImpl)
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

    console.log('d')
    
    return (
        <div>
            {children}
        </div>
    )
}