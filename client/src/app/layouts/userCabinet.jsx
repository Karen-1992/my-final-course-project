import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import ProfileContentProxy from "../routes/ProfileContentProxy";
import history from "../utils/history";

const UserCabinet = () => {
    const { type, edit } = useParams();
    const isEdit = edit === "edit";
    const routes = [
        { name: "Личные данные", path: "personal" },
        { name: "Избранные", path: "favorites" },
        { name: "Мои отзывы", path: "reviews" },
        { name: "Мои заказы", path: "orders" },
        { name: "Выйти из системы", path: "logout" }
    ];
    const [selectedRoute, setSelectedRoute] = useState("");
    const handleChangeRoute = (route) => {
        setSelectedRoute(route);
        history.push(`/cabinet/${route}`);
    };
    const isExistingRoute = routes.some((route) => route.path === type);
    useEffect(() => {
        if (isExistingRoute) {
            setSelectedRoute(type);
        }
    }, [type]);
    return (
        <div className="row">
            <div className="col-lg-2 col-sm-3">
                <ul className="list-group">
                    {routes.map((route) => (
                        <li
                            key={route.path}
                            onClick={() => handleChangeRoute(route.path)}
                            className={
                                "list-group-item " +
                                (selectedRoute === route.path ? "active" : "")
                            }
                            role="button"
                        >
                            {route.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="col-lg-10">
                {!isExistingRoute ? (
                    <Redirect to={"/cabinet"} />
                ) : (
                    <ProfileContentProxy route={selectedRoute} isEdit={isEdit} />
                )}
            </div>
        </div>
    );
};

export default UserCabinet;
