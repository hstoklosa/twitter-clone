import { useState, useMemo, useCallback, useRef } from "react";

function useInfiniteScroll(queryHook, queryArgs, queryOptions, limit = 10) {
    const [currentPage, setCurrentPage] = useState(1);

    const lastQueryResponse = queryHook({
        ...queryArgs, page: currentPage - 1, limit
    }, { skip: currentPage === 1 || queryOptions?.skip });

    const currentQueryResponse = queryHook({
        ...queryArgs, page: currentPage, limit
    }, queryOptions);

    const nextQueryResponse = queryHook({
        ...queryArgs, page: currentPage + 1, limit
    }, queryOptions);


    const combinedData = useMemo(() => {
        const arr = new Array(limit * (currentPage + 1));

        for (const data of [
            lastQueryResponse.data,
            currentQueryResponse.data,
            nextQueryResponse.data,
        ]) {
            if (data) {
                const offset = (data.page - 1) * limit;
                arr.splice(offset, data.data.length, ...data.data);
            }

        }

        const isNotFullyEmpty = arr.some((value) =>
            value !== undefined
        );

        return isNotFullyEmpty ? arr : [];
    }, [
        currentQueryResponse.data,
        lastQueryResponse.data,
        nextQueryResponse.data,
        currentPage,
        limit,
    ]);

    const { page: remotePage = 1, hasNextPage = false } = currentQueryResponse?.data || {};

    const isFetching = useMemo(
        () =>
            lastQueryResponse?.isFetching ||
            currentQueryResponse?.isFetching ||
            nextQueryResponse?.isFetching,
        [
            currentQueryResponse?.isFetching,
            lastQueryResponse?.isFetching,
            nextQueryResponse?.isFetching,
        ]
    );

    const isLoading = useMemo(
        () =>
            lastQueryResponse?.isLoading ||
            currentQueryResponse?.isLoading ||
            nextQueryResponse?.isLoading,
        [
            currentQueryResponse?.isLoading,
            lastQueryResponse?.isLoading,
            nextQueryResponse?.isLoading,
        ]
    );

    const isError = useMemo(
        () =>
            lastQueryResponse?.isError ||
            currentQueryResponse?.isError ||
            nextQueryResponse?.isError,
        [
            currentQueryResponse?.isError,
            lastQueryResponse?.isError,
            nextQueryResponse?.isError,
        ]
    );


    const lastIntObserver = useRef(null);
    const lastRowRef = useCallback(
        (node) => {
            if (isFetching) return;
            if (lastIntObserver.current) lastIntObserver.current.disconnect();

            lastIntObserver.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage && currentPage === remotePage && !isFetching) {
                    setCurrentPage(currentPage + 1);
                }
            });

            if (node) lastIntObserver.current.observe(node);
        },
        [setCurrentPage, hasNextPage, isFetching, currentPage, remotePage]
    );

    const firstIntObserver = useRef(null);
    const firstRowRef = useCallback(
        (node) => {
            if (isFetching) return;
            if (firstIntObserver.current) firstIntObserver.current.disconnect();

            firstIntObserver.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                }
            });

            if (node) firstIntObserver.current.observe(node);
        },
        [setCurrentPage, isFetching, currentPage]
    );

    return {
        combinedData,
        isFetching,
        isLoading,
        isError,
        hasNextPage,
        lastRowRef,
        firstRowRef
    };
}

export default useInfiniteScroll;