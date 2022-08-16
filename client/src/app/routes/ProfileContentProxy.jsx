import React from "react";
import PropTypes from "prop-types";
import PersonalPage from "../components/page/personalPage/personalPage";
import FavoritesPage from "../components/page/favoritesPage/favoritesPage";
import Reviews from "../components/page/reviewsPage/reviews";
import UserOrders from "../components/page/userOrders/userOrders";
import LogOut from "../layouts/logOut";
import EditUserPage from "../components/page/editUserPage/editUserPage";

const ProfileContentProxy = ({ route, isEdit }) => {
    const contentByType = {
        personal: !isEdit ? <PersonalPage /> : <EditUserPage />,
        favorites: <FavoritesPage />,
        reviews: <Reviews />,
        orders: <UserOrders />,
        logout: <LogOut />
    };
    const CurrentProfileContent = () => contentByType[route];
    return <CurrentProfileContent />;
};

ProfileContentProxy.propTypes = {
    route: PropTypes.string,
    isEdit: PropTypes.bool
};

export default ProfileContentProxy;
