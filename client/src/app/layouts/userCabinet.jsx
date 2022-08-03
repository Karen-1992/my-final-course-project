import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import ProfileContentProxy from "../routes/ProfileContentProxy";
import history from "../utils/history";

const UserCabinet = () => {
    const { type, edit } = useParams();
    const isEdit = edit === "edit";
    const routes = ["personal", "favorites", "reviews", "orders", "logout"];
    const [selectedRoute, setSelectedRoute] = useState("");
    const handleChangeRoute = (route) => {
        setSelectedRoute(route);
        history.push(`/cabinet/${route}`);
    };
    const isExistingRoute = routes.some((route) => route === type);
    useEffect(() => {
        if (isExistingRoute) {
            setSelectedRoute(type);
        }
    }, [type]);
    return (
        <div className="d-flex justify-content-between">
            <div>
                <ul className="list-group">
                    {routes.map((route) => (
                        <li
                            key={route}
                            onClick={() => handleChangeRoute(route)}
                            className={
                                "list-group-item " +
                                (selectedRoute === route ? "active" : "")
                            }
                            role="button"
                        >
                            {route}
                        </li>
                    ))}
                </ul>
            </div>
            {!isExistingRoute ? (
                <Redirect to={"/cabinet"} />
            ) : (
                <ProfileContentProxy route={selectedRoute} isEdit={isEdit} />
            )}
        </div>
    );
};

export default UserCabinet;
