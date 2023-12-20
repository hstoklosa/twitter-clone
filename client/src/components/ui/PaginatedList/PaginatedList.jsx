import "./styles.css";

import React from "react";
import { Spinner, Placeholder, ErrorPlaceholder } from "../../index";


const PaginatedList = ({
    queryResult = {},
    component: Component,
    renderPlaceholder = () => <Placeholder />,
    renderError = () => <ErrorPlaceholder />,
    loadingIndicator = () => <Spinner />,
}) => {
    const {
        combinedData: data,
        lastRowRef,
        firstRowRef,
        isFetching,
        isLoading,
        isError,
    } = queryResult;


    if (isError) return renderError();
    if (isLoading) return loadingIndicator();
    if (data.length === 0) return renderPlaceholder();

    return (
        <section
            className="preview-list"
            id="preview-list"
        >
            {(data.map((item, index) => {
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
            }))}

            {isFetching && loadingIndicator()}
        </section>
    );
};


export default PaginatedList;
