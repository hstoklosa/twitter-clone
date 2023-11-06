import "../../styles/TabList.css";

import { Link, useLocation } from "react-router-dom";
import { capitalize } from "../../helpers/capitalize";

// const getPreviousPathname = (pathname) => pathname.split("/").slice(0, -1).join("/");

const TabList = ({ tabs = [], setTab, options = {} }) => {
    const { state, pathname } = useLocation();

    return (
        <div className="tab-list">
            {tabs.map((tab, idx) => {
                const isTabIndex = tab === options.indexTab;
                const link = isTabIndex ? options.index : `${options.index}/${tab}`;
                const isActive = pathname.endsWith(`${isTabIndex ? options.index : tab}`);

                const linkOptions = {
                    to: link,
                    state: state,
                    onClick: () => setTab(tab),
                };

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
