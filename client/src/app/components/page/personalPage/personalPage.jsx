import React from "react";
import history from "../../../utils/history";

const PersonalPage = () => {
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    return (
        <div className="">
            <h1>User info is here</h1>
            <button className="btn btn-light btn-sm" onClick={handleClick}>
                <i className="bi bi-gear"> Изменить</i>
            </button>
        </div>
    );
};

export default PersonalPage;
