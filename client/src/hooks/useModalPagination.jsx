import { useState } from "react";

const useModalPagination = (maxPages = 1, initialPage = 1) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    return {
        currentPage,
        setCurrentPage,
        nextPage: () => currentPage < maxPages && setCurrentPage(currentPage + 1),
        prevPage: () => currentPage > 1 && setCurrentPage(currentPage - 1),
    };
};

export default useModalPagination;
