import React from "react";
import PropTypes from "prop-types";

const SearchQuerry = ({ onSearchQuery }) => {
    return (
        <div className="input-group-lg w-100 align-self-center px-5 d-flex">
            <input onChange={(e) => onSearchQuery(e)} className="form-control" type="search" placeholder="Search" />
        </div>
    );
};

SearchQuerry.propTypes = {
    onSearchQuery: PropTypes.func
};

export default SearchQuerry;
