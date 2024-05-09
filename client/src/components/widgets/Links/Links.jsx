const linkLabels = [
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Accessability",
    "Ads Info",
    "More...",
    "© 2023 X Corp.",
];

const Links = () => {
    return (
        <div className="links-container">
            {linkLabels.map((label, idx) => (
                <a
                    key={idx}
                    href="https://x.com/"
                    target="__blank"
                    className="link-grey"
                >
                    {label}
                </a>
            ))}
        </div>
    );
};

export default Links;
