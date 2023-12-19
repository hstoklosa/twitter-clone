const ErrorPlaceholder = ({ error }) => (
    <div
        style={{
            width: "100%",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <span style={{ fontSize: "1.5rem" }}>
            Something went wrong. Try reloading.
        </span>

        <button
            className="blue-btn"
            style={{
                padding: "0.5rem 1rem",
                marginTop: "0.75rem"
            }}
        >
            Retry
        </button>
    </div>
);

export default ErrorPlaceholder;
