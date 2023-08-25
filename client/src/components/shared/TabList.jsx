import "../../styles/TabList.css";

const TabList = ({ activeTab, setActiveTab, tabs }) => {
    return (
        <div className="tab-list">
            {tabs.map((tab, idx) => (
                <button
                    key={idx}
                    className={`tab-item ${activeTab === tab && "active"}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default TabList;
