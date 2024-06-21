import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Spinner, Placeholder, ErrorPlaceholder } from "../../index";


const BaseWidget = ({
    className,
    title,
    redirectTo,
    isLoading,
    isError,
    isEmpty,
    renderData,
    renderErrorPlaceholder = () => <ErrorPlaceholder />,
    loadingIndicator = () => <Spinner />,
}) => {
    const { pathname } = useNavigate();

    return (
        <div className="widget-container">
            <h2 className="widget-header">{title}</h2>

            <div className={`widget-list-container ${className}`}>
                {isError && renderErrorPlaceholder()}
                {(isLoading && !isError) && loadingIndicator()}

                {(isEmpty && !isLoading && !isError) && (
                    <Placeholder
                        icon={IoIosInformationCircleOutline}
                        subtitle="Empty response! Try again later."
                    />
                )}

                {(!isEmpty && !isLoading && !isError) && (
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
                )}

            </div>
        </div>
    );
};

export default BaseWidget;
