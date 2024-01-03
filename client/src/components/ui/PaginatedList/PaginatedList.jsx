import "./styles.css";

import React from "react";
import { Spinner, Placeholder, ErrorPlaceholder } from "../../index";


const PaginatedList = ({
    queryResult = {},
    component: Component,
    renderItem = () => null,
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


    if (isError) return (
        <section id="preview-list">
            {renderError()}
        </section>
    );

    if (isLoading) return (
        <section id="preview-list">
            {loadingIndicator()}
        </section>
    );

    if (data.length === 0) return (
        <section id="preview-list">
            {renderPlaceholder()}
        </section>
    );

    const firstIndex = data.findIndex((item, index) => {
        return item !== undefined
    });


    return (
        <section
            className="preview-list"
            id="preview-list"
        >
            {(data.map((item, index) => {

                const caseRef = !isFetching
                    ? firstIndex === index
                        ? firstRowRef
                        : index === data.length - 1 ? lastRowRef : null
                    : null;


                // console.log(firstIndex);
                // console.log(index, caseRef)

                return (
                    <div
                        key={index}
                        ref={caseRef}
                    >
                        <Component tweet={item} />
                        {/* {renderItem(item)} */}
                    </div>
                )
            }))}

            <div className="preview-list_loading">
                {isFetching && loadingIndicator()}
            </div>
        </section>
    );
};


export default PaginatedList;
