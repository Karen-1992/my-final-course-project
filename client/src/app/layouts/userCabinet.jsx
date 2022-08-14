import React, { useEffect, useState } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import ProfileContentProxy from "../routes/ProfileContentProxy";

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
    const [selectedRoute, setSelectedRoute] = useState("personal");
    const handleChangeRoute = (route) => {
        setSelectedRoute(route);
        // history.push(`/cabinet/${route}`);
    };
    const isExistingRoute = routes.some((route) => route.path === type);
    useEffect(() => {
        if (isExistingRoute) {
            setSelectedRoute(type);
        }
    }, [type]);
    return (
        <div className="row">
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        {routes.map((route) => (
                            <Link
                                key={route.path}
                                onClick={() => handleChangeRoute(route.path)}
                                className={
                                    "nav-link " +
                                    (selectedRoute === route.path ? "active" : "")
                                }
                                role="button"
                                to={`/cabinet/${route.path}`}
                            >
                                {route.name}
                            </Link>
                        ))}
                    </ul>
                </div>
                <div className="card-body">
                    {!isExistingRoute ? (
                        <Redirect to={"/cabinet"} />
                    ) : (
                        <ProfileContentProxy route={selectedRoute} isEdit={isEdit} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserCabinet;
