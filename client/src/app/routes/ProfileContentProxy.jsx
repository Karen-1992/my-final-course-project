import React from "react";
import PropTypes from "prop-types";
import PersonalPage from "../components/page/personalPage/personalPage";
import FavoritesPage from "../components/page/favoritesPage/favoritesPage";
import Reviews from "../components/page/reviewsPage/reviews";
import Orders from "../components/page/ordersPage/orders";
import LogOut from "../layouts/logOut";
import EditUserPage from "../components/page/editUserPage/editUserPage";
// import { ReviewsProvider } from "../hooks/useReviews";

const ProfileContentProxy = ({ route, isEdit }) => {
    const contentByType = {
        personal: !isEdit ? <PersonalPage /> : <EditUserPage />,
        favorites: <FavoritesPage />,
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
