import "./styles.css";

import { ColumnHeader, Placeholder } from "../../components";

const ProfileNotFound = ({ username }) => {
    return (
        <>
            <ColumnHeader routerBack={true}>
                <div className="profile-summary">
                    <h1>Profile</h1>
                </div>
            </ColumnHeader>

            <section className="profile">
                <div className="banner-container">
                    <div className="pfp-container"></div>
                </div>
            </section>

            <div className="info-container">
                <h1
                    className="displayName"
                    style={{
                        marginTop: "5rem",
                        marginLeft: "1.5rem",
                        fontSize: "1.25rem",
                    }}
                >
                    @{username}
                </h1>
            </div>

            <section className="tweets">
                <Placeholder
                    header="This account doesn't exist"
                    subheader="Try searching for another."
                />
            </section>
        </>
    );
};

export default ProfileNotFound;
