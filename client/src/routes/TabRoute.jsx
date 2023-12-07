import { Outlet, useParams } from "react-router-dom";
import { MiddleColumn, LeftColumn, ColumnHeader, TabList, Links } from "../components";

const TabRoute = ({ tabs, context = {}, children }) => {
    const params = useParams();

    if (context.hasOwnProperty("selector"))
        context.args = {
            [context.selector.arg]: params[context.selector.param],
        };

    return (
        <main>
            <MiddleColumn>
                <ColumnHeader
                    routerBack={true}
                    className="tab-route-header"
                >
                    {children}
                </ColumnHeader>

                <TabList tabs={tabs} />
                <Outlet context={context} />
            </MiddleColumn>

            <LeftColumn>
                <Links />
            </LeftColumn>
        </main>
    );
};

export default TabRoute;
