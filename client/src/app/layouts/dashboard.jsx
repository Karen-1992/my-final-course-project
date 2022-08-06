import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import AdminPage from "../components/page/adminPage/adminPage";
import { getIsAdmin } from "../store/users";

const Dashboard = () => {
    const isAdmin = useSelector(getIsAdmin());
    return (
        <>
            {isAdmin ? (
                <AdminPage />
            ) : (
                <Redirect to="/" />
            )}
        </>
    );
};

export default Dashboard;
