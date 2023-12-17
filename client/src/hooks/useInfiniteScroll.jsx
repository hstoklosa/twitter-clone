import { useState, useMemo, useCallback, useRef } from "react";

function useInfiniteScroll(queryHook, queryArgs, queryOptions, limit = 10) {
    const [currentPage, setCurrentPage] = useState(1);

    const lastQueryResponse = queryHook({ ...queryArgs, page: currentPage - 1, limit }, {
        skip: currentPage === 1 || queryOptions?.skip
    });
    const currentQueryResponse = queryHook({ ...queryArgs, page: currentPage, limit }, queryOptions);
    const nextQueryResponse = queryHook({ ...queryArgs, page: currentPage + 1, limit }, queryOptions);

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

    // console.log(combinedData);

    const { page: remotePage = 1, hasNextPage = false } =
        currentQueryResponse?.data || {};

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

    // console.log(remotePage, hasNextPage);


    const lastIntObserver = useRef(null);
    const lastRowRef = useCallback(
        (node) => {
            if (isFetching) return;
            if (lastIntObserver.current) lastIntObserver.current.disconnect();
            lastIntObserver.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasNextPage && currentPage === remotePage) {
                    setCurrentPage(currentPage + 1);
                    console.log("next");
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
                console.log("touchy");
                if (entries[0].isIntersecting && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                    console.log("prev");
                }
            });
            if (node) firstIntObserver.current.observe(node);
        },
        [setCurrentPage, isFetching, currentPage]
    );

    return {
        combinedData,
        isFetching,
        isError,
        lastRowRef,
        firstRowRef,
        hasNextPage,
    };
}

export default useInfiniteScroll;