import "./styles.css";

import { useState } from "react";
import { toast } from "react-hot-toast";

import { useAppSelector } from "../../../app/store";
import { useUpdateUserMutation } from "../../../features/api/userApi";

import { BaseModal, TextInput, Logo } from "../../index";
import { updateFormState } from "../../../helpers/updateState";

const EditUsernameModal = ({ isOpen, closeModal }) => {
    const [formState, setFormState] = useState({ username: "" });

    const { user } = useAppSelector((state) => state.auth);
    const [updateUser, { isFetching: isUpdateFetching }] = useUpdateUserMutation();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("username", formState.username);

        const result = await updateUser({
            id: user._id,
            data: formData
        });

        if (!result.error) {
            toast.success(() => (
                <span>Your username has been updated!</span>
            ), { duration: 6000 });

            closeModal();
        }
    }

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={closeModal}
            className="edit-username-modal"
        >
            <div className="logo-container">
                <Logo />
            </div>

            <h1>Change your username?</h1>
            <p>Your @username is unique. You can always change it here again.</p>

            <form
                className="username-form"
                onSubmit={handleFormSubmit}
            >
                <TextInput
                    type="text"
                    id="username"
                    name="username"
                    label="Username"
                    value={formState.username}
                    onChange={({ target }) => updateFormState(setFormState, "username", target.value)}
                    maxLength={15}
                    highlight={false}
                />

                <div className="form-buttons">
                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={formState.username.length < 3}
                    >
                        Set username
                    </button>

                    <button
                        type="button"
                        className="btn-cancel"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </BaseModal>
    )

}

export default EditUsernameModal;