import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
import Loader from "../common/loader";

function NavProfile() {
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    if (!currentUser) {
        return (
            <Loader/>
        );
    }
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">
                    <h5>
                        <i className="bi bi-person px-1"></i>
                        {currentUser.name}
                    </h5>
                    {currentUser.cash}$
                </div>
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link to={"/cabinet"} className="dropdown-item">
                    Личный кабинет
                </Link>
                <Link to="/logout" className="dropdown-item">
                    Выйти
                </Link>
            </div>
        </div>
    );
}

export default NavProfile;
