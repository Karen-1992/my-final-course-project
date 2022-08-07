import React from "react";
import PropTypes from "prop-types";

const Loader = ({ clientY, clientX }) => {
    return (
        <div
            className="spinner-border m-5 position-absolute" role="status"
            style={{
                top: `${clientY - 250}px`,
                left: `${clientX - 250}px`
            }}
        >
            <span
                className="visually-hidden">
            </span>
            <p>Loading</p>
        </div>
    );
};

Loader.propTypes = {
    clientY: PropTypes.number,
    clientX: PropTypes.number
};

export default Loader;
