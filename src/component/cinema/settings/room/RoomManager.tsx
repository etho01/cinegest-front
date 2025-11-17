"use client";
import { LoadObjectAndShowModalRef } from "@/src/component/hook/loadObjectAndShowModal";
import { Button } from "@/src/component/ui/btn/button";
import Card from "@/src/component/ui/card";
import Input from "@/src/component/ui/form/Input";
import { Select } from "@/src/component/ui/form/Select";
import { ConfirmationModal, ConfirmationModalRef } from "@/src/component/ui/modal/ConfirmationModal";
import { PaginationTab, PaginationTabRef } from "@/src/component/ui/pagination/PaginationTab";
import { Paginator } from "@/src/component/ui/pagination/PaginationType";
import { Td } from "@/src/component/ui/table/Table";
import { deleteRoomController } from "@/src/controller/app/Cinema/Settings/RoomController";
import { Option } from "@/src/domain/Cinema/Settings/Option";
import { Room } from "@/src/domain/Cinema/Settings/Room";
import { Storage } from "@/src/domain/Cinema/Settings/Storage";
import { useRef } from "react";
import { RoomModal } from "./RoomModal";


interface PropsFetchRooms {
    initialData : Paginator<Room>;
    initialParams?: {
        search?: string;
        page?: number;
        options?: number[];
        storages?: number[];
    };
    entityId: number;
    cinemaId: number;
    allOptions: Option[];
    allStorages: Storage[];
} 

export const RoomManager = ({ initialData, initialParams, entityId, cinemaId, allOptions, allStorages }: PropsFetchRooms) => {
    const paginationRef = useRef<PaginationTabRef>(null);
    const modalRef = useRef<LoadObjectAndShowModalRef<Room>>(null);
    const confirmationModalRef = useRef<ConfirmationModalRef>(null);

    return (
        <Card>
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <Input 
                        label="Rechercher une salle" 
                        placeholder="Rechercher une salle" 
                        onChange={(value) => {
                            paginationRef.current?.updateParam("search", value);
                        }} 
                        initialValue={initialParams?.search || ""}
                    />
                    <Select 
                        label="Filtrer par option"
                        placeholder="Filtrer par option"
                        onChange={(value) => {
                            const options = value ? value.map((id: string) => Number(id)) : undefined;
                            paginationRef.current?.updateParam("options", options);
                        }}
                        isMulti={true}
                        options={allOptions.map((option) => ({
                            label: option.name,
                            value: option.id.toString(),
                        }))}
                        initialValue={initialParams?.options ? initialParams.options.map((id) => id.toString()) : []}
                    />
                    <Select 
                        label="Filtrer par stockage"
                        placeholder="Filtrer par stockage"
                        onChange={(value) => {
                            const storages = value ? value.map((id: string) => Number(id)) : undefined;
                            paginationRef.current?.updateParam("storages", storages);
                        }}
                        isMulti={true}
                        options={allStorages.map((storage) => ({
                            label: storage.name,
                            value: storage.id.toString(),
                        }))}
                        initialValue={initialParams?.storages ? initialParams.storages.map((id) => id.toString()) : []}
                    />
                </div>
                <Button
                    className="mt-auto" 
                    variant="default" 
                    onClick={() => modalRef.current?.createNew()}
                >
                    Créer une salle
                </Button>
            </div>
            <PaginationTab
                initialData={initialData} 
                initialParams={initialParams} 
                endpoint={`api/${entityId}/cinema/${cinemaId}/settings/room`} 
                ref={paginationRef} 
                lineRenderer={(item : Room, index) => (
                    <>
                        <Td >{item.name}</Td>
                        <Td className="text-right">
                            <Button onClick={() => modalRef.current?.loadFromObject(item)}
                                variant="outline"
                            >
                                Modifier
                            </Button>
                            <Button className="ml-2"
                                variant="remove"
                                onClick={() => {
                                    confirmationModalRef.current?.open(
                                        "Confirmer la suppression",
                                        `Êtes-vous sûr de vouloir supprimer l'option "${item.name}" ? Cette action est irréversible.`,
                                        async () => {
                                            // Call delete endpoint
                                            await deleteRoomController({ entityId : parseInt(entityId + ''), cinemaId : parseInt(cinemaId + ''), roomId: item.id });
                                            paginationRef.current?.refresh();
                                        }
                                    );
                                }}
                            >
                                Supprimer
                            </Button>
                        </Td>
                    </>
                )} 
                colList={["Nom", ""]} 
            />
            <ConfirmationModal ref={confirmationModalRef} />
            <RoomModal
                entityId={entityId} 
                cinemaId={cinemaId}
                isOpen={false} 
                ref={modalRef} 
                onSaved={(option) => {
                    paginationRef.current?.refresh();
                }} 
                onClose={function (): void {} } 
                initialObject={null} 
                allOptions={allOptions}
                allStorages={allStorages}
            />
        </Card>
    );
}