import { useState, useEffect, useCallback, useRef } from "react";

const usePagination = (queryHook, queryArgs, limit = 10) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [fetchedData, setFetchedData] = useState([]);

    const { data, error, isLoading } = queryHook({
        ...queryArgs,
        page: currentPage,
        limit,
    });

    useEffect(() => {
        if (data) {
            setFetchedData((prevData) => [...prevData, ...data]);
        }
    }, [data]);

    const observer = useRef();
    const lastElementRef = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setCurrentPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [isLoading]
    );

    return {
        data: fetchedData,
        error,
        isLoading,
        lastElementRef,
        currentPage,
        setCurrentPage,
    };
};

export default usePagination;
