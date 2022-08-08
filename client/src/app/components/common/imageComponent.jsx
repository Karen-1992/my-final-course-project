import React from "react";
import PropTypes from "prop-types";

const ImageComponent = ({ src, onClick, height, width }) => {
    return (
        <div
            style={{
                height,
                width
            }}
        >
            <img
                className="d-block h-100 w-100"
                style={{
                    objectFit: "contain"
                }}
                onClick={onClick}
                role="button"
                src={src}
                alt={src}
            />
        </div>
    );
};

ImageComponent.propTypes = {
    src: PropTypes.string,
    onClick: PropTypes.func,
    height: PropTypes.string,
    width: PropTypes.string

};

export default ImageComponent;
