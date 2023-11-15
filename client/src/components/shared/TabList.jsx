import "../../styles/TabList.css";

import { Link, useLocation } from "react-router-dom";
import { capitalize } from "../../helpers/capitalize";
import { getPreviousPathname } from "../../helpers/pathname";

const TabList = ({ tabs = [], setTab, options = {} }) => {
    const { state, pathname } = useLocation();
    const previousPathname = getPreviousPathname(pathname);

    return (
        <div className="tab-list">
            {tabs.map((tab, idx) => {
                const linkOptions = {
                    to: `${previousPathname}/${tab}`,
                    state: state,
                    replace: true,
                    // onClick: () => setTab(tab),
                };

                const hasIndexTab =
                    options.hasOwnProperty("index") && options.hasOwnProperty("indexTab");
                const isTabIndex = hasIndexTab && tab === options.indexTab;

                if (hasIndexTab) {
                    linkOptions.to = isTabIndex ? `${options.index}` : `${options.index}/${tab}`;
                }

                const isActive = isTabIndex ? pathname === options.index : pathname.endsWith(tab);

                return (
                    <Link
                        {...linkOptions}
                        className={`tab-item ${isActive && "active"}`}
                        key={idx}
                    >
                        {capitalize(tab)}
                    </Link>
                );
            })}
        </div>
    );
};

export default TabList;
