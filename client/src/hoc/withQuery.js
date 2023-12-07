import { useOutletContext } from "react-router-dom";
import usePagination from "../hooks/usePagination";

const withQuery = (queryHook, PreviewComponent, placeholder = {}) => {
    return (WrappedComponent) => {
        return (props) => {
            const { args = {}, options = {}, handleChange = null } = useOutletContext();
            const queryResult = usePagination(queryHook, args, options);

            return (
                <WrappedComponent
                    queryResult={queryResult}
                    PreviewComponent={PreviewComponent}
                    placeholder={placeholder}
                    handleChange={handleChange}
                    {...props}
                />
            );
        };
    };
};

export default withQuery;
