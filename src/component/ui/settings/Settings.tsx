import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { PropsWithChildren } from "react";

interface SettingsCategoryProps extends PropsWithChildren {
    title?: string;
}

export const SettingsCategory = ({ title, children }: SettingsCategoryProps) => {
    return (
        <div className="mb-8">
            {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                {children}
            </div>
        </div>
    );
};

interface SettingsItemProps {
    icon : IconProp;
    title : string;
    link : string;
}

export const SettingsItem = ({ icon, title, link }: SettingsItemProps) => {
    return (
        <Link href={link} className="p-4 flex border rounded hover:bg-gray-100 items-center flex-col">
            <div className="mx-auto">
                <FontAwesomeIcon size="2x" icon={icon} />
            </div>
            <div className="text-lg hover:underline text-center">{title}</div>
        </Link>
    );
}