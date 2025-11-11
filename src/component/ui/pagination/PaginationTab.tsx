import { forwardRef, useImperativeHandle } from "react";
import { usePaginatedResource } from "../../hook/usePaginatedResource";
import { Paginator } from "./PaginationType";
import Pagination from "./Pagination";
import { Table, Tbody, Td, Th, Thead, Tr } from "../table/Table";

export interface PaginationTabProps {
    initialData?: Paginator<any>;
    endpoint: string;
    initialParams?: Record<string, any>;
    lineRenderer: (item: any, index: number) => React.ReactNode;
    colList : string[];

}

export type PaginationTabRef = {
    updateParam: (key: string, value: unknown) => void;
    refresh: () => void;
}

export const PaginationTab = forwardRef(({ initialData, endpoint, initialParams, lineRenderer, colList }: PaginationTabProps, ref) => {
    const { data, error, isPending, page, setPage, setParams, updateParam, refresh } = usePaginatedResource<any>({
        endpoint,
        initialData,
        initialParams,
    });

    // Expose the updateParam function to the ref
    useImperativeHandle(ref, () => ({
        updateParam,
        refresh
    }));

    return (
        <>
        <Table>
            <Thead>
                <Tr>
                    {colList.map((colName) => (
                        <Th className="pb-3" key={colName}>{colName}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                { isPending ?
                    <Tr>
                        <Td colSpan={colList.length} className="text-center my-5">Chargement...</Td>
                    </Tr>
                : 
                    <>
                        { data?.data.map((item, index) => (
                            <Tr index={index} key={item.id}>{lineRenderer(item, index)}</Tr>
                        ))}

                        { data?.data.length === 0 ? <Tr><Td colSpan={colList.length} className="text-center my-5">Aucun élément</Td></Tr> : null}
                    </>
                }

                { error ?
                    <Tr>
                        <Td colSpan={colList.length} className="text-center my-5 text-red-500">Erreur lors du chargement des données : {error.message}</Td>
                    </Tr>
                : null}
            </Tbody>
        </Table>
        { !isPending ? <Pagination currentPage={page} lastPage={data?.last_page} onPageChange={setPage} disabled={isPending} /> : null }
        </>
    )
});