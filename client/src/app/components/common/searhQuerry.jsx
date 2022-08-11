import React from "react";
import PropTypes from "prop-types";

const SearchQuerry = ({ onSearchQuery, value, placeholder, classes, name }) => {
    return (
        <input
            type="text"
            name={name}
            placeholder={placeholder}
            onChange={onSearchQuery}
            value={value}
            className={classes}
        />
    );
};

SearchQuerry.propTypes = {
    onSearchQuery: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    classes: PropTypes.string
};

export default SearchQuerry;
