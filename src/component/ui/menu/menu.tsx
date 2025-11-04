import { User } from "@/src/domain/User"
import { PropsWithChildren } from "react"
import { MenuProps } from "./showMenu"
import { LeftMenu } from "./left/LeftMenu"
import { Breadcrumb } from "./Breadcrumb"

interface Props extends MenuProps, PropsWithChildren {
}

export const Menu = ({user, entity, cinema, page, children} : Props) => {

    return (
        <div className="flex justify-between h-full">
            <LeftMenu user={user} entity={entity} cinema={cinema} page={page} />
            <div className="w-full flex flex-col">
                <div className="border-b">

                </div>
                <div>
                    <Breadcrumb entity={entity} cinema={cinema} page={page} />
                    <div className="xl:w-7xl mx-auto">
                        {children}
                    </div>
                </div>

            </div>
            <div></div>
        </div>
    )
}