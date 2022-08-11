import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import AdminPage from "../components/page/adminPage/adminPage";
import ProductsLoader from "../components/ui/hoc/productsLoader";
import { getIsAdmin } from "../store/users";

const Dashboard = () => {
    const isAdmin = useSelector(getIsAdmin());
    return (
        <ProductsLoader>
            {isAdmin ? (
                <AdminPage />
            ) : (
                <Redirect to="/" />
            )}
        </ProductsLoader>
    );
};

export default Dashboard;
