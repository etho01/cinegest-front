"use client";
import { Button } from "@/src/component/ui/btn/button";
import { Select } from "@/src/component/ui/form/Select";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/src/component/ui/table/Table";
import { ROLES } from "@/src/const/RolesConst";
import { Cinema } from "@/src/domain/Cinema";
import { User } from "@/src/domain/User";
import { useState } from "react";

interface UserManageRoleProps {
    user : User;
    entityId: number;
    allCinemaList: Cinema[];
}

interface rolesCinemaListType {
    roles: 
    { 
        error?: string;
        list : String[];
     };
    cinemaIds: 
    { 
        error?: string;
        list : String[];
    };
}

export default function UserManageRole({ user, entityId, allCinemaList }: UserManageRoleProps) {
    let roles = user.roles || [];    
    const [globalRoles, setGlobalRoles] = useState<string[]>([]);
    const [rolesCinemaList, setRolesCinemaList] = useState<rolesCinemaListType[]>([]);


    return (
        <>
            <Select
                label="Roles globaux"
                options={ROLES.global ? Object.keys(ROLES.global).map(key => ({ value: key, label: ROLES.global[key].name })) : []}
                isMulti
                value={globalRoles}
                onChange={(newValue) => {
                    setGlobalRoles(newValue);
                }}
            />
            <Table>
                <Thead>
                    <Tr>
                        <Th>Rôle</Th>
                        <Th>Cinema</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    { rolesCinemaList.map((roleCinema, index) => (
                        <Tr index={index} key={index}>
                            <Td>
                                <Select
                                    options={ROLES.cinema ? Object.keys(ROLES.cinema).map(key => ({ value: key, label: ROLES.cinema[key].name })) : []}
                                    value={roleCinema.roles.list}
                                    isMulti={true}
                                    onChange={(newValue) => {
                                        let updatedList = [...rolesCinemaList];
                                        updatedList[index].roles.list = newValue;
                                        setRolesCinemaList(updatedList);
                                    }}
                                />
                            </Td>
                            <Td>
                                <Select
                                    options={allCinemaList.map(cinema => ({ value: cinema.id, label: cinema.name }))}
                                    value={roleCinema.cinemaIds.list}
                                    isMulti={true}
                                    onChange={(newValue) => {
                                        let updatedList = [...rolesCinemaList];
                                        updatedList[index].cinemaIds.list = newValue;
                                        setRolesCinemaList(updatedList);
                                    }}
                                />
                            </Td>
                            <Td>
                                <Button 
                                    variant="remove"
                                    onClick={() => {
                                        setRolesCinemaList(rolesCinemaList.filter((e, index2) => {
                                            return index2 !== index;
                                        }))
                                    }}
                                >
                                    Retirer
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                    <Tr>
                        <Td colSpan={3} className="flex justify-center">
                            <Button onClick={() => {
                                setRolesCinemaList([...rolesCinemaList, { roles: { error: undefined, list: [] }, cinemaIds: { error: undefined, list: [] } }]);
                            }}>
                                Ajouter un rôle
                            </Button>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </>
    );
}