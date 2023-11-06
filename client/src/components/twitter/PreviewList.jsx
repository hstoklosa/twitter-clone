import "../../styles/PreviewList.css";

import React from "react";
import { useOutletContext } from "react-router-dom";
import {
    List,
    WindowScroller,
    AutoSizer,
    CellMeasurer,
    CellMeasurerCache,
} from "react-virtualized";

import { Spinner } from "../index";

const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
});

const SpinnerWrapper = ({ children }) => {
    return (
        <div
            className="spinner-wrapper"
            style={{
                width: "100%",
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {children}
        </div>
    );
};

const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

const PreviewList = (props) => {
    const outletParams = useOutletContext() || {};

    if (!isObjectEmpty(outletParams) && isObjectEmpty(props)) {
        props = outletParams;
    }

    const { list = [], isLoading, handleScroll, ItemComponent, EmptyListPlaceholder } = props;

    const renderPreview = ({ index, key, style, parent }) => {
        return (
            <CellMeasurer
                key={key}
                cache={cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}
            >
                {({ registerChild }) => (
                    <>
                        {list[index] && (
                            <div style={style}>
                                <ItemComponent
                                    key={index}
                                    tweet={list[index]}
                                    ref={registerChild}
                                />
                            </div>
                        )}
                    </>
                )}
            </CellMeasurer>
        );
    };

    return (
        <section
            className="preview-list"
            id="preview-list"
        >
            <AutoSizer style={{ height: "unset", width: "100%" }}>
                {({ width }) => (
                    <WindowScroller>
                        {({ height, isScrolling, onChildScroll, scrollTop }) => (
                            <>
                                {isLoading ? (
                                    <SpinnerWrapper>
                                        <Spinner />
                                    </SpinnerWrapper>
                                ) : (
                                    <List
                                        autoHeight
                                        width={width}
                                        height={height}
                                        isScrolling={isScrolling}
                                        scrollTop={scrollTop}
                                        deferredMeasurementCache={cache}
                                        rowCount={list.length}
                                        noRowsRenderer={EmptyListPlaceholder}
                                        rowRenderer={renderPreview}
                                        rowHeight={cache.rowHeight}
                                        onScroll={handleScroll}
                                        onChildScroll={onChildScroll}
                                    />
                                )}
                            </>
                        )}
                    </WindowScroller>
                )}
            </AutoSizer>
        </section>
    );
};

export default PreviewList;
