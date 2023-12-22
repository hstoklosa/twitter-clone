import "./styles.css";
import { BaseModal, InputAccentRadio, InputThemeRadio, TweetText } from "../../index";

const themes = [
    ['light', 'Default'],
    ['dim', 'Dim'],
    ['dark', 'Lights out']
];

const accentsColor = [
    'blue',
    'yellow',
    'pink',
    'purple',
    'orange',
    'green'
];

const previewText = "At the heart of X are short messages called posts — just like this one — which can include photos, videos, links, text, hashtags, and mentions like @X."

const DisplayModal = ({ isOpen, onClose }) => {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            className="display-modal"
        >
            <div className="display-modal_header">
                <h1>Customize your view</h1>
                <p>These settings affect all the X accounts on this browser.</p>
            </div>


            <div className="display-modal_preview">
                <div className="pfp-container">
                    <div className="icon-container">

                        <img
                            src="http://localhost:8080/api/uploads/default_pfp.png"
                            alt="User Pfp"
                            className="pfp"
                        />
                    </div>
                </div>

                <div className="preview-container">
                    <div className="preview-author">
                        <p className="display_name">X</p>
                        <p className="username">@X · 33m</p>
                    </div>
                    <div className="preview-content">
                        <TweetText
                            text={previewText}
                        />
                    </div>
                </div>
            </div>


            <div className="display-modal_section">
                <p className="display-modal_section-title">Color</p>

                <div className="display-modal_section-container">
                    {accentsColor.map((accentColor) => (
                        <InputAccentRadio
                            type={accentColor}
                            key={accentColor}
                        />
                    ))}
                </div>
            </div>

            <div className="display-modal_section">
                <p className="display-modal_section-title">Background</p>

                <div className="display-modal_section-container themes">
                    {themes.map(([themeType, label]) => (
                        <InputThemeRadio
                            type={themeType}
                            label={label}
                            key={themeType}
                        />
                    ))}
                </div>
            </div>

            <button
                className="blue-btn"
                onClick={onClose}
            >
                Done
            </button>


        </BaseModal>
    )
}

export default DisplayModal