const TabPanel = ({ isActive, children }) => {
    return isActive ? children : null
}

TabPanel.defaultProps = {
    __TYPE: 'TabPanel',
};

export default TabPanel;
