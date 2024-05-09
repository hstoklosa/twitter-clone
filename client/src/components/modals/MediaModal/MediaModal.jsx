import "./styles.css";

import { useRef, useEffect } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { IoMdClose } from "react-icons/io";
import { BaseModal } from "../../index";

import { useAppSelector, useAppDispatch } from "../../../app/store";
import { modalActions } from "../../../features/slices/modalSlice";

const MediaModal = ({ url }) => {
    const { isOpen } = useAppSelector((state) => state.modal);
    const dispatch = useAppDispatch();

    const ref = useRef(null);

    const isMediumDevice = useMediaQuery("only screen and (max-width : 620px)");

    useEffect(() => {
        const element = ref.current;

        if (element) {
            const parent = element.parentNode;

            if (element.offsetWidth > element.offsetHeight) {
                parent.style.width = "100%";
            } else {
                if (!isMediumDevice) {
                    // parent.style.width = "500px";
                    parent.style.width = "auto";
                    parent.style.height = "100%"
                } else {
                    parent.style.width = "100%";
                    parent.style.height = "auto"
                }
            }
        }

    }, [ref, isMediumDevice])

    return (
        <BaseModal
            isOpen={isOpen}
            onClose={() => dispatch(modalActions.closeModal())}
            className="media-modal"
        >
            <img
                src={url}
                className="media-modal_media"
                alt="Media"
                ref={ref}
            />

            <button
                className="media-modal_close dark_round-btn"
                onClick={() => dispatch(modalActions.closeModal())}
            >
                <div className="icon-container">
                    <IoMdClose
                        size="20"
                        className="icon"
                    />
                </div>
            </button>
        </BaseModal>
    )
}

export default MediaModal;