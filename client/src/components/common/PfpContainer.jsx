import { useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';

const PfpContainer = ({ src, ...rest }) => {
    const [isLoaded, setIsLodaded] = useState(false);

    return (
        <div className={`pfp-container ${isLoaded && "loaded"}`}>
            <LazyLoadImage
                className="pfp"
                src={src}
                // effect="blur"
                width="100%"
                alt="User's Profile Picture"
                onLoad={() => setIsLodaded(true)}
                {...rest}
            />
        </div>
    )
}

export default PfpContainer;