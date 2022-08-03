import React from "react";
import PropTypes from "prop-types";
import PersonalPage from "../components/page/personalPage";
import Favorites from "../components/page/favoritesPage";
import Reviews from "../components/page/reviewsPage";
import Orders from "../components/page/ordersPage";
import LogOut from "../layouts/logOut";
import EditPage from "../components/page/editPage";

const ProfileContentProxy = ({ route, isEdit }) => {
    const contentByType = {
        personal: !isEdit ? <PersonalPage /> : <EditPage />,
        favorites: <Favorites />,
        reviews: <Reviews />,
        orders: <Orders />,
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
