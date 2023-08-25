import "../../styles/Spinner.css";

const Spinner = ({ width = "30px", height = "30px" }) => {
    return (
        <div
            className="spinner"
            style={{
                width,
                height,
            }}
        ></div>
    );
};

export default Spinner;
