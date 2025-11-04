"use client";

import { User, UserIsSuperAdmin } from "@/src/domain/User";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SuperAdminMenu } from "./SuperAdminMenu";
import { useState } from "react";

export interface MenuProps {
    user : User;
    entity : number | null;
    cinema : number | null;
    page : string;
}

export const LeftMenu = ({ user, entity, cinema, page }: MenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`py-5 overflow-y-scroll px-3 h-full bg-gray-900 text-white hover:w-80 w-16 transition-all duration-300 group leftMenu ${isOpen ? "open w-80" : "w-16"}`}>
            <div className="flex justify-end">
                <button className="flex items-center cursor-pointer p-2 hover:bg-gray-700 rounded" onClick={() => setIsOpen(!isOpen)}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
            { UserIsSuperAdmin(user) && (
                <>
                    <SuperAdminMenu page={page} />
                </>
            ) }
        </div>
    )
}