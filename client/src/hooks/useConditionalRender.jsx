import { Placeholder, ErrorPlaceholder, Spinner } from "../components";


const useConditionalRender = ({
    isError,
    isFetching,
    data = [],
    renderFunc,
    loadingIndicator = () => <Spinner />,
    renderError = () => <ErrorPlaceholder />,
    renderPlaceholder = () => <Placeholder />,
}) => {
    if (isError)
        return renderError();

    if (isFetching) {
        return loadingIndicator();
    }

    if (data.length === 0) {
        return renderPlaceholder();
    }

    return data.map(renderFunc);
};

export default useConditionalRender;