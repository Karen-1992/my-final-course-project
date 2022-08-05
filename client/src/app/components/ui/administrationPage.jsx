import React from "react";
import PropTypes from "prop-types";

const AdministrationPage = ({ items, onRemove, onEdit, selectedItem }) => {
    return (
        <div className="container">
            {items.map((p) => (
                <div
                    key={p._id}
                    className={"d-flex justify-content-between mb-2 px-1 " + (selectedItem === p._id ? "border-start border-5 border-success" : "")}
                >
                    <p>{p.title}</p>
                    <div className="d-flex gap-2">
                        <button
                            onClick={() => onEdit(p._id)}
                            className="btn btn-secondary"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onRemove(p._id)}
                            className="btn btn-danger"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

AdministrationPage.propTypes = {
    items: PropTypes.array,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func,
    selectedItem: PropTypes.string
};

export default AdministrationPage;
