import { Outlet } from "react-router-dom";
import { MiddleColumn, LeftColumn, ColumnHeader, TabList, Links } from "../components";

const TabRoute = ({ tabs, children, context = {} }) => {
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

                {/* <PreviewList {...queryResult} /> */}
                <Outlet context={context} />
            </MiddleColumn>

            <LeftColumn>
                <Links />
            </LeftColumn>
        </main>
    );
};

export default TabRoute;
