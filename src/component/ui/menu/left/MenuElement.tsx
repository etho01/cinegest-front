import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface Props {
    link : string;
    title : string;
    icon : IconProp;
    active : boolean;
}

export const MenuElement = ({ link, title, icon, active } : Props) => {
    return (
        <Link href={link} className={`flex items-center p-2 my-2 hover:bg-gray-700 rounded gap-3 ${active ? "bg-gray-700" : ""}`}>
            <FontAwesomeIcon icon={icon} />
            <div className="hidden group-hover:block menuTitle">{title}</div>
        </Link>
    )
}