import { useParams } from "react-router-dom";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const withQuery = (queryHook) => {
    return (Component) => {
        return ({ args, options, ...props }) => {
            const queryResult = useInfiniteScroll(queryHook, args, options);

            const newProps = {
                queryResult,
                ...props
            };

            return <Component {...newProps} />;
        };
    };
};

export default withQuery;
