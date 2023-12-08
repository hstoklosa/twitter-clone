import "../../styles/EditProfile.css";

import { useState } from "react";

import { IconContext } from "react-icons";
import { IoMdClose, IoIosArrowForward } from "react-icons/io";
import { MdOutlineAddAPhoto } from "react-icons/md";

import { BaseModal, TextInput } from "../index";
import { useUpdateUserMutation } from "../../store/api/userApi";
import { updateFormState } from "../../helpers/updateState";
import { formatDate } from "../../helpers/date";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif"];

const EditProfile = ({ isOpen, closeModal, user }) => {
    const [formState, setFormState] = useState({
        displayName: user.displayName,
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
        profileImage: null,
        bannerImage: null,
    });

    const [previewState, setPreviewState] = useState({
        profileImage: null,
        bannerImage: null,
    });

    const [updateUser, updateResult] = useUpdateUserMutation();

    const dob = formatDate(user.dob, { year: "numeric", month: "long", day: "numeric" });

    const handleFileChange = ({ target }) => {
        const files = target.files;
        const img = files[0];

        if (files && img && ALLOWED_TYPES.includes(img.type)) {
            const blob_url = URL.createObjectURL(img);

            updateFormState(setFormState, target.id, img);
            updateFormState(setPreviewState, target.id, blob_url);
        }
    };

    const handleProfileUpdate = async ({ target }) => {
        if (
            formState.displayName === user.displayName &&
            formState.bio === user.bio &&
            formState.location === user.location &&
            formState.website === user.website &&
            formState.profileImage === null &&
            formState.bannerImage === null
        ) {
            return;
        }

        const formData = new FormData();

        formData.append("displayName", formState.displayName);
        formData.append("bio", formState.bio);
        formData.append("location", formState.location);
        formData.append("website", formState.website);
        formData.append("profileImage", formState.profileImage);
        formData.append("bannerImage", formState.bannerImage);

        const result = await updateUser({
            id: user._id,
            data: formData,
        });

        if (!result.error) {
            closeModal();
        }
    };

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={closeModal}
            className="edit-modal"
        >
            <header className="edit-modal_header">
                <button
                    className="btn-close-modal"
                    onClick={closeModal}
                >
                    <IconContext.Provider value={{ className: "btn-close_icon" }}>
                        <IoMdClose size="25" />
                    </IconContext.Provider>
                </button>
                <h1>Edit Profile</h1>

                <button
                    type="button"
                    className="white-btn save"
                    onClick={handleProfileUpdate}
                >
                    Save
                </button>
            </header>

            <form
                className="edit-profile"
                onSubmit={handleProfileUpdate}
            >
                <div className="banner-container">
                    <label
                        htmlFor="bannerImage"
                        className="upload-btn"
                    >
                        <input
                            type="file"
                            id="bannerImage"
                            accept=".jpg, .jpeg, .png, .gif"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <IconContext.Provider value={{ className: "upload_icon" }}>
                            <MdOutlineAddAPhoto size="20" />
                        </IconContext.Provider>
                    </label>

                    {(previewState.bannerImage || user.bannerURL) && (
                        <img
                            src={previewState.bannerImage || user.bannerURL}
                            className="banner"
                            alt="User Banner"
                        />
                    )}

                    <div className="pfp-container">
                        <label
                            htmlFor="profileImage"
                            className="upload-btn"
                        >
                            <input
                                type="file"
                                id="profileImage"
                                accept=".jpg, .jpeg, .png, .gif"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />

                            <IconContext.Provider value={{ className: "upload_icon" }}>
                                <MdOutlineAddAPhoto size="20" />
                            </IconContext.Provider>
                        </label>

                        <img
                            src={previewState.profileImage || user.profileImageURL}
                            className="pfp"
                            alt="User Pfp"
                        />
                    </div>
                </div>

                <div className="inputs-container">
                    <TextInput
                        type="text"
                        id="name"
                        name="name"
                        value={formState.displayName}
                        onChange={({ target }) =>
                            updateFormState(setFormState, "displayName", target.value)
                        }
                        label="Name"
                        highlight={false}
                        maxLength={50}
                    />

                    <TextInput
                        type="text"
                        id="bio"
                        name="bio"
                        value={formState.bio}
                        onChange={({ target }) =>
                            updateFormState(setFormState, "bio", target.value)
                        }
                        label="Bio"
                        highlight={false}
                        multiline={true}
                        maxLength={160}
                    />

                    <TextInput
                        type="text"
                        id="location"
                        name="location"
                        value={formState.location}
                        onChange={({ target }) =>
                            updateFormState(setFormState, "location", target.value)
                        }
                        label="Location"
                        highlight={false}
                        maxLength={30}
                    />

                    <TextInput
                        type="text"
                        id="website"
                        name="website"
                        value={formState.website}
                        onChange={({ target }) =>
                            updateFormState(setFormState, "website", target.value)
                        }
                        label="Website"
                        highlight={false}
                        maxLength={100}
                    />
                </div>

                <div className="dob">
                    <div className="dob-header">
                        <p>
                            Birth date · <span className="link-blue">Edit</span>
                        </p>
                    </div>
                    <h2>{dob}</h2>
                </div>

                <button
                    type="button"
                    className="full-btn"
                    disabled
                >
                    Switch to professional
                    <IoIosArrowForward className="full-btn_icon" />
                </button>
            </form>
        </BaseModal>
    );
};

export default EditProfile;
