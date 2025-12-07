"use client";
import { useState } from "react";
import { cn } from "../../utils";

interface TabElementProps {
    header : {
        title : string;
        className? : string;
    };
    body : {
        content : React.ReactNode;
        className? : string;
    };
}

interface TabProps {
    tabList : TabElementProps[];
    className? : string;
    selectTab? : number;
}

export const Tab = ({ tabList, className, selectTab }: TabProps) => {
    const [selectedTab, setSelectedTab] = useState<number>(selectTab || 0);

    return (
        <div className={cn(className ? className : "")}>
            <div className="">
                {tabList.map((tab, index) => (
                    <div key={index} className={cn(
                        'inline-block px-4 py-2',
                        tab.header.className ? tab.header.className : '',
                        index === selectedTab ? 'font-bold border-b-2 border-primary' : 'text-gray-500 cursor-pointer'
                    )}
                    onClick={() => setSelectedTab(index)}
                    >
                        <h2>{tab.header.title}</h2>
                    </div>
                ))}
            </div>
            <div className="px-4 py-2 mt-2">
                {tabList.map((tab, index) => (
                    <div key={index} className={cn(
                        index === selectedTab ? 'block' : 'hidden',
                        tab.body.className ? tab.body.className : ''
                    )}>
                        {tab.body.content}
                    </div>
                ))}
            </div>
        </div>
    );
}