import React, { useState } from "react";
import history from "../utils/history";
import PersonalPage from "../components/page/personalPage";
import Favorites from "../components/page/favoritesPage";
import Orders from "../components/page/ordersPage";
import Reviews from "../components/page/reviewsPage";
import LogOut from "./logOut";

const UserCabinet = () => {
    const pages = [
        {
            name: "Personal",
            path: "personal",
            component: <PersonalPage />
        },
        {
            name: "Favorites",
            path: "favorites",
            component: <Favorites />
        },
        {
            name: "Reviews",
            path: "reviews",
            component: <Reviews />
        },
        {
            name: "Orders",
            path: "orders",
            component: <Orders />
        },
        {
            name: "LogOut",
            path: "logout",
            component: <LogOut />
        }
    ];
    const [selectedPage, setSelectedPage] = useState(0);
    const handleChangePage = (index) => {
        setSelectedPage(index);
        history.push(`/cabinet/${pages[index].path}`);
    };
    return (
        <div className="d-flex flex-wrap justify-content-between">
            <div>
                <ul className="list-group">
                    {pages.map((page, index) => (
                        <li
                            key={page.path}
                            onClick={() => handleChangePage(index)}
                            className={"list-group-item " + (selectedPage === index ? "active" : "")}
                            role="button"
                        >
                            {page.name}
                        </li>
                    ))}
                </ul>
            </div>
            {pages[selectedPage].component}
        </div>
    );
};

export default UserCabinet;
