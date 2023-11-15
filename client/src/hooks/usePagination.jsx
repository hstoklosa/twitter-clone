import { useEffect, useState, useMemo, useCallback } from "react";

const usePagination = (queryHook, queryArgs, queryOptions, limit = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    const lastResult = queryHook(
        { ...queryArgs, page: currentPage - 1, limit },
        { skip: currentPage === 1 } // don't fetch pages before 0
    );
    const currentResult = queryHook({ ...queryArgs, page: currentPage, limit }, queryOptions);
    const nextResult = queryHook({ ...queryArgs, page: currentPage + 1, limit }, queryOptions);

    const isLoading = lastResult.isLoading || currentResult.isLoading || nextResult.isLoading;
    const isFetching = lastResult.isFetching || currentResult.isFetching || nextResult.isFetching;
    const isError = lastResult.isError || currentResult.isError || nextResult.isError;

    const combined = useMemo(() => {
        const dataList =
            currentPage === 1
                ? [currentResult.data, nextResult.data]
                : [lastResult.data, currentResult.data, nextResult.data];
        const combinedData = new Array(limit * (currentPage - 1));
        let offset = 0;

        for (const data of dataList) {
            const items = data?.data;

            if (items) {
                combinedData.splice(offset, items.length, ...items);
                offset += items.length;
            }
        }

        return combinedData;
    }, [limit, currentPage, lastResult.data, currentResult.data, nextResult.data]);

    const handleScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
        const nearBottom = scrollTop + clientHeight >= scrollHeight - 300;
        const nearTop = scrollTop <= 0;

        if (currentResult.isUninitialized) return;

        console.log(currentResult);

        if (nearBottom && currentPage < currentResult.data.totalPages && !isLoading) {
            setCurrentPage((prev) => prev + 1);
            console.log("next page");
        }

        if (nearTop && currentPage > 1 && !isLoading) {
            setCurrentPage((prev) => prev - 1);
            console.log("previous page");
        }
    };

    return {
        data: combined,
        isLoading,
        isFetching,
        isError,
        handleScroll,
    };
};

export default usePagination;
