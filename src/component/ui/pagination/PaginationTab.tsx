import { forwardRef, useImperativeHandle } from "react";
import { usePaginatedResource } from "../../hook/usePaginatedResource";
import { Paginator } from "./PaginationType";
import Pagination from "./Pagination";

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
        <table className="w-full mt-4">
            <thead className="text-gray-400 border-gray-300 border-b-2 text-left">
                <tr>
                    {colList.map((colName) => (
                        <th className="pb-3" key={colName}>{colName}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                { isPending ?
                    <tr>
                        <td colSpan={colList.length} className="text-center my-5">Chargement...</td>
                    </tr>
                : 
                    <>
                        { data?.data.map((item, index) => (
                            <tr className={(index % 2 === 0 ? "hover:bg-gray-300 bg-gray-200" : "hover:bg-gray-100")} key={item.id}>{lineRenderer(item, index)}</tr>
                        ))}

                        { data?.data.length === 0 ? <tr><td colSpan={colList.length} className="text-center my-5">Aucun élément</td></tr> : null}
                    </>
                }

                { error ?
                    <tr>
                        <td colSpan={colList.length} className="text-center my-5 text-red-500">Erreur lors du chargement des données : {error.message}</td>
                    </tr>
                : null}
            </tbody>
        </table>
        { !isPending ? <Pagination currentPage={page} lastPage={data?.last_page} onPageChange={setPage} disabled={isPending} /> : null }
        </>
    )
});