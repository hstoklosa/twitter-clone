import "./styles.css";

import { Link, useNavigate } from "react-router-dom";
import { Spinner, Placeholder, ErrorPlaceholder } from "../../index";

const BaseWidget = ({
    className,
    title,
    redirectTo,
    isEmpty,
    isLoading,
    isError,
    renderData,
    renderPlaceholder = () => <Placeholder />,
    renderErrorPlaceholder = () => <ErrorPlaceholder />,
    loadingIndicator = () => <Spinner />,
}) => {
    const { pathname } = useNavigate();

    if (isEmpty) return <></>;

    return (
        <div className="widget-container">
            <h2 className="widget-header">
                {title}
            </h2>

            <div className={`widget-list-container ${className}`}>
                {!isError ? (
                    !isLoading
                        ? ((!isEmpty && renderData)
                            ? (
                                <>
                                    <div className={`widget-list-container ${className}`}>
                                        {renderData && renderData()}
                                    </div>

                                    <Link
                                        className="widget-button"
                                        to={redirectTo}
                                        state={pathname}
                                    >
                                        Show more
                                    </Link>
                                </>
                            )
                            : renderPlaceholder())
                        : (loadingIndicator && loadingIndicator())
                ) : (renderErrorPlaceholder())}

            </div>
        </div>
    );
};

export default BaseWidget;
