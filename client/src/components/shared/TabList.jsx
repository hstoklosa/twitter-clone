import "../../styles/TabList.css";

const TabList = ({ tabs = [], currentTab, setCurrentTab, children }) => {
    return (
        <div className="tab-list">
            {tabs.map((tab, idx) => (
                <button
                    key={idx}
                    className={`tab-item ${currentTab === tab && "active"}`}
                    onClick={() => setCurrentTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default TabList;
