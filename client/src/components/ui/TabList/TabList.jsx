import "./styles.css";

import { useState, useEffect, Children, cloneElement } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { getPreviousPathname, removeTrailingSlash } from "../../../helpers/pathname";
import { capitalize } from "../../../utils/capitalize";


const TabList = ({
    options = {
        tabs: [],
        index: null
    },
    setOuterTab = () => { },
    children
}) => {
    const { tabs, index } = options;

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [searchParams] = useSearchParams();
    const { state, pathname: initialPathname } = useLocation();

    const query = searchParams.get("q");
    const queryTab = searchParams.get("t");

    const pathname = removeTrailingSlash(initialPathname);
    const previousPathname = getPreviousPathname(pathname);
    const arrayChildren = Children.toArray(children);

    useEffect(() => {
        setOuterTab(activeTab);
    }, [activeTab])

    useEffect(() => {
        if (index === pathname)
            setActiveTab(tabs[0]);

        const newTab = pathname.split("/").pop();

        if (tabs.includes(newTab)) {
            setActiveTab(newTab);
        }
    }, [pathname, tabs]);

    return (
        <div className="tab-list">
            <div className="tab-list_items">
                {tabs.map((tab, idx) => {
                    const linkOptions = {
                        to: !query
                            ? `${previousPathname}/${tab}`
                            : `${previousPathname}/${tab}?q=${query}`,
                        state: state,
                        replace: true,
                    };

                    const isTabIndex = index && tab === tabs[0];

                    if (index) {
                        linkOptions.to = isTabIndex
                            ? !query ? `${index}` : `${index}?q=${query}`
                            : !query ? `${index}/${tab}` : `${index}/${tab}?q=${query}`;
                    }

                    const isActive = isTabIndex
                        ? pathname === index
                        : pathname.endsWith(tab);


                    return (
                        <Link
                            key={idx}
                            className={`tab-item ${isActive && "active"}`}
                            state={{ preventRestore: true }}
                            {...linkOptions}
                        >
                            {capitalize(tab)}
                        </Link>
                    );
                })}
            </div>

            {Children.map(arrayChildren, (child, index) =>
                cloneElement(child, {
                    isActive: child.props.name === activeTab
                })
            )}
        </div>
    );
};


export default TabList;
