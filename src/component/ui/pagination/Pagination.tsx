"use client";
type Props = {
    currentPage: number;
    lastPage: number;
    onPageChange: (p: number) => void;
    disabled?: boolean;
    windowSize?: number;
};

export default function Pagination({ currentPage, lastPage, onPageChange, disabled, windowSize = 2 }: Props) {
    const start = Math.max(1, currentPage - windowSize);
    const end = Math.min(lastPage, currentPage + windowSize);
    const pages = [];
    for (let p = start; p <= end; p++) pages.push(p);

    return (
        <nav className="mt-6 flex flex-wrap items-center gap-2" aria-label="Pagination">
            <button onClick={() => onPageChange(1)} disabled={currentPage === 1 || disabled} className="px-3 py-2 border rounded disabled:opacity-50">Première</button>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1 || disabled} className="px-3 py-2 border rounded disabled:opacity-50">Précédente</button>
            {start > 1 && <span className="px-2">…</span>}
            {pages.map((p) => (
                <button key={p} onClick={() => onPageChange(p)} aria-current={p === currentPage ? "page" : undefined}
                    className={`px-3 py-2 border rounded ${p === currentPage ? "bg-gray-100 font-semibold" : ""}`}
                    disabled={disabled}>
                    {p}
                </button>
            ))}
            {end < lastPage && <span className="px-2">…</span>}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === lastPage || disabled} className="px-3 py-2 border rounded disabled:opacity-50">Suivante</button>
            <button onClick={() => onPageChange(lastPage)} disabled={currentPage === lastPage || disabled} className="px-3 py-2 border rounded disabled:opacity-50">Dernière</button>
        </nav>
    );
}
