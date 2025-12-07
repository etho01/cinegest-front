"use client";
import { rolesCinemaListType } from "@/src/application/useCases/User/updateUserRole";
import { Button } from "@/src/component/ui/btn/button";
import { FormButton } from "@/src/component/ui/btn/form-button";
import { Select } from "@/src/component/ui/form/Select";
import { Table, Tbody, Td, Th, Thead, Tr } from "@/src/component/ui/table/Table";
import { ROLES } from "@/src/const/RolesConst";
import { updateUserRoleController } from "@/src/controller/app/UserController";
import { Cinema } from "@/src/domain/Cinema";
import { Role, User } from "@/src/domain/User";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

interface UserManageRoleProps {
    user: User;
    entityId: number;
    allCinemaList: Cinema[];
    allRoleList: Role[];
}

function arraysEqual(a : number[], b: number[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function getRolesCinemaListTypeIdsFromRoles(roles: Role[]): rolesCinemaListType[] {
    const cinemaListTemp: { [key: number]: number[] } = {};
    const rolesCinemaListType: rolesCinemaListType[] = [];

    roles.forEach(role => {
        if (role.cinemaId !== null) {
            if (!cinemaListTemp[role.cinemaId]) {
                cinemaListTemp[role.cinemaId] = [];
            }
            cinemaListTemp[role.cinemaId].push(role.id);
        }
    });

    let cinemaInsert: number[] = [];
    for (const cinemaId in cinemaListTemp) {
        if (cinemaInsert.includes(parseInt(cinemaId))) {
            continue;
        }

        const cinemaIdList: number[] = [];
        cinemaIdList.push(parseInt(cinemaId));

        for (const cinemaId2 in cinemaListTemp) {
            if (cinemaId !== cinemaId2 && arraysEqual(cinemaListTemp[cinemaId], cinemaListTemp[cinemaId2])) {
                cinemaIdList.push(parseInt(cinemaId2));
            }
        }

        cinemaInsert = cinemaInsert.concat(cinemaIdList);

        rolesCinemaListType.push({
            cinemas: cinemaIdList,
            roles: cinemaListTemp[cinemaId]
        });
    }

    return rolesCinemaListType;
}

export default function UserManageRole({ user, entityId, allCinemaList, allRoleList }: UserManageRoleProps) {
    const roles = user.roles || [];
    const [globalRight, setGlobalRight] = useState<string[]>(user.rights || []);
    const [rolesUser, setRolesUser] = useState<rolesCinemaListType[]>(getRolesCinemaListTypeIdsFromRoles(roles));

    const { executeAsync, result } = useAction(updateUserRoleController);

    return (
        <form onSubmit={async (e) => {
            e.preventDefault();
            await executeAsync({ entityId: parseInt(entityId + ''), userId: user.id, rolesUser, globalRight });
        }}>
            <Select
                label="Roles glôbaux"
                options={ROLES.global ? Object.keys(ROLES.global).map(key => ({ value: key, label: ROLES.global[key].name })) : []}
                isMulti
                value={globalRight}
                onChange={(newValue) => {
                    setGlobalRight(newValue);
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
                    {rolesUser.map((roleCinema, index) => (
                        <Tr index={index} key={index}>
                            <Td>
                                <Select
                                    options={allRoleList.map(role => ({ value: role.id, label: role.name }))}
                                    value={roleCinema.roles}
                                    isMulti={true}
                                    errors={result.validationErrors?.rolesUser ? result.validationErrors?.rolesUser[index]?.roles : undefined}
                                    onChange={(newValue) => {
                                        const updatedList = [...rolesUser];
                                        updatedList[index].roles = newValue;
                                        setRolesUser(updatedList);
                                    }}
                                />
                            </Td>
                            <Td>
                                <Select
                                    options={allCinemaList.map(cinema => ({ value: cinema.id, label: cinema.name }))}
                                    value={roleCinema.cinemas}
                                    isMulti={true}
                                    errors={result.validationErrors?.rolesUser ? result.validationErrors?.rolesUser[index]?.cinemas : undefined}
                                    onChange={(newValue) => {
                                        const updatedList = [...rolesUser];
                                        updatedList[index].cinemas = newValue;
                                        setRolesUser(updatedList);
                                    }}
                                />
                            </Td>
                            <Td>
                                <Button
                                    variant="remove"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setRolesUser(rolesUser.filter((e, index2) => {
                                            return index2 !== index;
                                        }))
                                    }}
                                >
                                    Retirer
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                    {
                        rolesUser.length === 0 && (
                            <Tr>
                                <Td colSpan={3} className="text-center">
                                    Aucun rôle assigné
                                </Td>
                            </Tr>
                        )
                    }
                    <Tr>
                        <Td colSpan={3} className="">
                            <div className="flex justify-center">
                                <Button onClick={(e) => {
                                    e.preventDefault();
                                    setRolesUser([...rolesUser, { roles: [], cinemas: [] }]);
                                }}>
                                    Ajouter un rôle
                                </Button>
                            </div>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
            <div className="flex justify-end mt-5">
                <FormButton>
                    Sauvegarder
                </FormButton>
            </div>
        </form>
    );
}