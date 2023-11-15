import "../../../styles/PreviewList.css";

import React, { useEffect } from "react";
import {
    List,
    WindowScroller,
    AutoSizer,
    CellMeasurer,
    CellMeasurerCache,
} from "react-virtualized";

import { Spinner, Placeholder } from "../../index";

const cache = new CellMeasurerCache({
    fixedWidth: true,
    defaultHeight: 100,
});

// const defaultQueryResult = { data: [], isLoading: true };

const PreviewList = ({
    queryResult,
    handleChange,
    PreviewComponent = null,
    emptyPreviewText = {},
}) => {
    const { data, isLoading, handleScroll } = queryResult;

    useEffect(() => {
        handleChange && handleChange(data);
    }, [data]);

    const renderPreview = ({ index, key, style, parent }) => {
        return (
            <CellMeasurer
                key={key}
                parent={parent}
                cache={cache}
                rowIndex={index}
                columnIndex={0}
            >
                {({ registerChild }) => (
                    <div>
                        {data[index] && (
                            <PreviewComponent
                                key={index}
                                tweet={data[index]}
                                ref={registerChild}
                                style={style}
                            />
                        )}
                    </div>
                )}
            </CellMeasurer>
        );
    };

    const renderEmptyPreview = () => (
        <Placeholder
            header={emptyPreviewText?.header || "Nothing to see here"}
            subheader={emptyPreviewText?.subheader || "Try again soon!"}
        />
    );

    return (
        <section
            className="preview-list"
            id="preview-list"
        >
            <AutoSizer style={{ width: "100%", height: "unset" }}>
                {({ width }) => (
                    <WindowScroller>
                        {({ height, isScrolling, onChildScroll, scrollTop }) =>
                            isLoading ? (
                                <Spinner />
                            ) : (
                                <List
                                    autoHeight
                                    width={width}
                                    height={height}
                                    isScrolling={isScrolling}
                                    scrollTop={scrollTop}
                                    deferredMeasurementCache={cache}
                                    rowRenderer={renderPreview}
                                    noRowsRenderer={renderEmptyPreview}
                                    rowCount={data.length}
                                    rowHeight={cache.rowHeight}
                                    onScroll={handleScroll}
                                    onChildScroll={onChildScroll}
                                />
                            )
                        }
                    </WindowScroller>
                )}
            </AutoSizer>
        </section>
    );
};

export default PreviewList;
