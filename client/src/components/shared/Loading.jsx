import logo from "../../assets/logo-blue.png";

const Loading = () => {
    return (
        <div
            className="loading"
            style={{
                backgroundColor: "#000",
                position: "fixed",
                top: "0",
                left: "0",
                width: "100vw",
                minHeight: "100vh",
                zIndex: "999999",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <img src={logo} alt="Twitter Icon" style={{ width: "80px" }} />
        </div>
    );
};

export default Loading;
