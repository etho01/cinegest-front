import { User } from "@/src/domain/User"
import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    user : User
}

export const Menu = ({user, children} : Props) => {

    return (
        <div className="flex justify-between h-full">
            <div className="p-5 h-full bg-gray-900 text-white">
            </div>
            <div className="w-full flex flex-col">
                <div className="border-b">

                </div>
                <div className="xl:w-7xl mx-auto">
                    {children}
                </div>
            </div>
            <div></div>
        </div>
    )
}