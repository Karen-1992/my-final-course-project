import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import OrdersPanel from "../components/page/ordersPanel/ordersPanel";
import { getIsAdmin } from "../store/users";

const Orders = () => {
    const isAdmin = useSelector(getIsAdmin());
    return (
        <>
            {isAdmin ? (
                <OrdersPanel />
            ) : (
                <Redirect to="/" />
            )}
        </>
    );
};

export default Orders;
