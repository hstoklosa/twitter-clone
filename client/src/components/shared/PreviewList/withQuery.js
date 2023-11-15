import { useParams, useOutletContext } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";

const withQuery = (queryHook, PreviewComponent, placeholder = {}, paramSelector = null) => {
    return (WrappedComponent) => {
        return (props) => {
            const { args = {}, options = {}, handleChange } = useOutletContext() || {};

            // console.log(options, paramSelector);
            const params = useParams();
            const queryArgs = !paramSelector ? args : paramSelector(params);

            const queryResult = usePagination(queryHook, queryArgs, options);

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
