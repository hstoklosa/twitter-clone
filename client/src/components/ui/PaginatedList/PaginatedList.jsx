import "./styles.css";
import 'react-virtualized/styles.css';

import React, { useRef, useEffect } from "react";
import useInfiniteScroll from "../../../hooks/useInfiniteScroll";
import { WindowScroller, List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { Spinner, Placeholder, ErrorPlaceholder } from "../../index";
import mergeRefs from "../../../helpers/mergeRefs";


const cache = new CellMeasurerCache({
    defaultHeight: 10,
    fixedWidth: true
});

const PaginatedList = ({
    queryHook,
    args,
    options,
    renderItem = () => null,
    renderPlaceholder = () => <Placeholder />,
    renderError = () => <ErrorPlaceholder />,
    loadingIndicator = () => <Spinner />,
}) => {
    const listRef = useRef(null);

    const {
        combinedData: data,
        lastRowRef,
        firstRowRef,
        isFetching,
        isLoading,
        isError
    } = useInfiniteScroll(queryHook, args, options);

    // useEffect(() => {
    //     if (typeof isFetching === "boolean" && !isFetching) {
    //         cache.clearAll();
    //     }
    // }, [isFetching]);

    useEffect(() => {
        cache.clearAll();

        const onResize = () => {
            if (listRef.current) {
                cache.clearAll();
            }
        };

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [])

    const rowRenderer = ({
        key,
        index,
        isScrolling,
        isVisible,
        style,
        parent
    }) => {
        if (!data[index]) return;
        const Component = renderItem(data[index]);

        const caseRef = !isFetching
            ? firstIndex === index
                ? firstRowRef
                : lastIndex === index ? lastRowRef : null
            : null;

        return (
            <CellMeasurer
                cache={cache}
                columnIndex={0}
                key={key}
                parent={parent}
                rowIndex={index}
            >
                {({ measure, registerChild }) => (
                    <div key={key} style={style} ref={mergeRefs(caseRef, registerChild)}>
                        {React.cloneElement(Component, { measure: measure })}
                    </div>
                )}
            </CellMeasurer>
        )
    }

    // Find first index after undefined
    const firstIndex = data.findIndex((item, index) => {
        return item !== undefined
    });

    // Find last index before undefined
    const lastIndex = (() => {
        for (let i = data.length - 1; i >= 0; i--)
            if (data[i] !== undefined) return i;

        // all items are undefined
        return -1;
    })();

    if (isError)
        return (
            <section id="preview-list">
                {renderError()}
            </section>
        );

    if (isLoading)
        return (
            <section id="preview-list">
                {loadingIndicator()}
            </section>
        );

    if (data.length === 0)
        return (
            <section id="preview-list">
                {renderPlaceholder()}
            </section>
        );

    return (
        <section
            id="preview-list"
            className="preview-list"
        >
            <WindowScroller>
                {({ height, isScrolling, onChildScroll, scrollTop }) => (
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <List
                                autoHeight
                                height={height}
                                isScrolling={isScrolling}
                                onScroll={onChildScroll}
                                rowCount={data.length}
                                rowHeight={cache.rowHeight}
                                rowRenderer={rowRenderer}
                                scrollTop={scrollTop}
                                width={width}
                                ref={listRef}
                            />
                        )}
                    </AutoSizer>
                )}
            </WindowScroller>

            {isFetching && (
                <div div className="preview-list_loading">
                    {loadingIndicator()}
                </div>
            )}
        </section >
    );
};


export default PaginatedList;
