"use client";
import { Entity } from "@/src/domain/Entity";
import { Paginator } from "../../ui/pagination/PaginationType";
import { PaginationTab, PaginationTabRef } from "../../ui/pagination/PaginationTab";
import { useRef } from "react";
import Input from "../../ui/form/Input";

interface PropsFetchEntities {
    initialData : Paginator<Entity>;
    initialParams?: Record<string, any>;
}

export default function EntityManager({ initialData, initialParams }: PropsFetchEntities) {
    const paginationRef = useRef<PaginationTabRef>(null);
    const test = () => {paginationRef.current?.updateParam("search", 123); console.log(paginationRef.current)}

    return (
        <div className="bg-white shadow px-0 sm:px-6 py-3 rounded-lg mb-5 mx-auto">
            <div className="flex justify-between">
                <Input label="Rechercher une entité" placeholder="Rechercher une entité" onChange={(e) => {
                    paginationRef.current?.updateParam("search", e.target.value);
                }} />
            </div>
            <PaginationTab 
                initialData={initialData} initialParams={initialParams} endpoint="api/entity" ref={paginationRef} lineRenderer={(item : Entity, index) => (
                <><td className="py-2 px-1">{item.name}</td></>
            )} colList={["Name", ""]} />
        </div>
    )
}