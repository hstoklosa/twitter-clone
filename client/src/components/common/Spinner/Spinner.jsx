import "./styles.css";

const Spinner = ({ width = "30px", height = "30px" }) => {
    return (
        <div
            className="spinner-wrapper"
            style={{
                width: "100%",
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                className="spinner"
                style={{
                    width,
                    height,
                }}
            ></div>
        </div>
    );
};

export default Spinner;
