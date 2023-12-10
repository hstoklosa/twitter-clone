import "./styles.css";

import { Link, useLocation } from "react-router-dom";
import { getPreviousPathname, removeTrailingSlash } from "../../../helpers/pathname";
import { capitalize } from "../../../utils/capitalize";

const TabList = ({ tabs = [], options = {} }) => {
    const { state, pathname: initialPathname } = useLocation();

    const pathname = removeTrailingSlash(initialPathname);
    const previousPathname = getPreviousPathname(pathname);

    return (
        <div className="tab-list">
            {tabs.map((tab, idx) => {
                const linkOptions = {
                    to: `${previousPathname}/${tab}`,
                    state: state,
                    replace: true,
                };

                const hasIndexTab =
                    options.hasOwnProperty("index") &&
                    options.hasOwnProperty("indexTab");
                const isTabIndex = hasIndexTab && tab === options.indexTab;

                if (hasIndexTab) {
                    linkOptions.to = isTabIndex
                        ? `${options.index}`
                        : `${options.index}/${tab}`;
                }

                const isActive = isTabIndex
                    ? pathname === options.index
                    : pathname.endsWith(tab);

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
