import logo from "../../assets/logo.svg";
import classNames from "classnames";
import { useTheme } from "../../contexts/ThemeProvider";

const Loading = () => {
    const { theme } = useTheme();

    console.log(theme);

    return (
        <div className="loading-route">
            <img
                src={logo}
                className={classNames("logo", {
                    dark: theme === "dim" || theme === "dark",
                    light: theme === "light"
                })}
                style={{ width: "100px" }}
                alt="Twitter Icon"
            />
        </div>
    );
};

export default Loading;
