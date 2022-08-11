import React, { useState } from "react";
import PropTypes from "prop-types";

const SortingMenu = ({ onSort, selectedSort, sortingParams }) => {
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    const handleSort = ({ name, path }) => {
        if (selectedSort.path === path) {
            console.log(selectedSort);
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc",
                name
            });
        } else {
            onSort({ path, order: "asc", name });
        }
    };
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <button className="btn dropdown-toggle">
                {selectedSort.name}
            </button>
            <ul className={"dropdown-menu" + (isOpen ? " show" : "")}>
                {sortingParams.map(item => (
                    <li className="dropdown-item" key={item.path} onClick={() => handleSort(item)}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

SortingMenu.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object,
    sortingParams: PropTypes.array.isRequired
};

export default SortingMenu;
