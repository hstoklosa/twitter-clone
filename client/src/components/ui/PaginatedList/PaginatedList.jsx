import "./styles.css";

import React, { useEffect } from "react";
// import InfiniteLoader from 'react-window-infinite-loader';
// import { FixedSizeList as List } from "react-window";
import { Spinner, ErrorPlaceholder } from "../../index";
// import useInfiniteScroll from "../../../hooks/useInfiniteScrolll";


const PaginatedList = ({
    queryResult = {},
    component: Component,
    children
}) => {
    const {
        combinedData: data,
        lastRowRef,
        firstRowRef,
        isFetching,
        isError,
    } = queryResult;

    console.log(isFetching, isError);


    if (isError) return <ErrorPlaceholder />;
    if (data.length === 0) return children;

    return (
        <section
            className="preview-list"
            id="preview-list"
        >
            {data.map((item, index) => {
                const caseRef = item !== undefined
                    ? index === 0
                        ? firstRowRef
                        : index === data.length - 1 ? lastRowRef : null
                    : null;

                return (
                    <div
                        key={index}
                        ref={caseRef}
                    >
                        <Component tweet={item} />
                    </div>
                )
            })}
            {/* {isFetching && <Spinner />} */}
        </section>
    );
};


export default PaginatedList;
