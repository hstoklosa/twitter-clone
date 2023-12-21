import "./styles.css";

import { TweetText, LinkButton } from "../../index";

const TweetContent = ({ content = "", media = null, openMediaModal }) => {

    return (
        <div className="tweet-content">
            <TweetText text={content} />

            {media && (
                <LinkButton
                    className="media-container"
                    onClick={openMediaModal}
                >

                    <img
                        className="tweet_media"
                        src={media?.url}
                        alt="Tweet Media"
                    />
                </LinkButton>
            )}
        </div>
    );
}

export default TweetContent;