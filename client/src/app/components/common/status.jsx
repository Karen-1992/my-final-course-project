import React from "react";
import { getOrderStatus } from "../../utils/getOrderStatus";
import PropTypes from "prop-types";

const Status = ({ status }) => {
    function getClasees(status) {
        let classes = "p-1 rounded text-light bg-";
        if (status === "pending") classes += "secondary";
        if (status === "completed") classes += "success";
        if (status === "canceled") classes += "danger";
        return classes;
    }
    return (
        <div>
            <span className={getClasees(status)}>{getOrderStatus(status)}</span>
        </div>
    );
};

Status.propTypes = {
    status: PropTypes.string.isRequired
};

export default Status;
