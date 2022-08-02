import React from "react";
import PropTypes from "prop-types";

const NavItemWithCount = ({ quantity, title, iconClasses }) => {
    return (
        <>
            <div className="text-center">
                <h4>
                    <i className={iconClasses}></i>
                </h4>
                <p>{title}</p>
            </div>
            {quantity > 0 && (
                <span
                    className="position-absolute top-0 start-100 translate-middle
                        badge rounded-pill bg-dark"
                >
                    {quantity}
                </span>
            )}
        </>
    );
};

NavItemWithCount.propTypes = {
    quantity: PropTypes.number,
    title: PropTypes.string,
    iconClasses: PropTypes.string
};

export default NavItemWithCount;
