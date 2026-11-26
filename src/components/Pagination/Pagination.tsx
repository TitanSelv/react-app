
import styles from "./Pagination.module.css";
import { Button } from "../Button";
import type { FC } from "react";

type PaginationItem = number | "...";

interface IPaginationProp {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const getPagination = (currentPage: number, totalPages: number): PaginationItem[] => {
    if (totalPages <= 7) {
        return Array.from(
            { length: totalPages },
            (_, i) => i + 1
        );
    }

    if (currentPage <= 4) {
        return [1, 2, 3, 4, 5, "...", totalPages];
    }

    if (currentPage >= totalPages - 3) {
        return [
            1,
            "...",
            totalPages - 4,
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages,
        ];
    }

    return [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
    ];
};

export const Pagination: FC<IPaginationProp> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) {return null;}

    const pages = getPagination(currentPage, totalPages);

    return (
        <nav
            className={styles.pagination}
            aria-label="Навигация по страницам"
        >
            <Button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ‹
            </Button>

            {pages.map((page, index) => {
                if (page === "...") {
                    return (
                        <span
                            key={`ellipsis-${index}`}
                            className={styles.ellipsis}
                            aria-hidden="true"
                        >
                            …
                        </span>
                    );
                }

                return (
                    <Button
                        key={page}
                        isActive={page === currentPage}
                        onClick={() => onPageChange(page)}
                        disabled={page === currentPage}
                        aria-current={
                            page === currentPage ? "page" : undefined
                        }
                    >
                        {page}
                    </Button>
                );
            })}

            <Button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                ›
            </Button>
        </nav>
    );
};
