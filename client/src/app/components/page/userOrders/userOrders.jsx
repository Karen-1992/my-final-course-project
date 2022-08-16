import React, { useState } from "react";
import { orderBy } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, updateOrder } from "../../../store/order";
import { getCurrentUserData, updateUser } from "../../../store/users";
import OrdersTable from "../../ui/orders/ordersTable";
import Loader from "../../common/loader";

const UserOrders = () => {
    const dispatch = useDispatch();
    const userData = useSelector(getCurrentUserData());
    const orders = useSelector(getOrders());
    const [sortBy, setSortBy] = useState({ path: "created_at", order: "asc" });
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const sortedOrders = orderBy(
        orders,
        [sortBy.path],
        [sortBy.order]
    );
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSelect = (id) => {
        setSelectedOrderId(id);
    };
    const handleCancel = async (order) => {
        dispatch(updateOrder({
            ...order,
            status: "canceled"
        }));
        const currentCash = userData.cash;
        const cash = currentCash + order.totalPrice;
        dispatch(updateUser({
            cash,
            userId: userData._id
        }));
    };
    return (
        <>
            {orders ? (
                <OrdersTable
                    orders={sortedOrders}
                    onSort={handleSort}
                    selectedSort={sortBy}
                    onCancel={handleCancel}
                    onSelect={handleSelect}
                    selectedRow={selectedOrderId}
                />
            ) : (
                <Loader />
            )}
        </>
    );
};

export default UserOrders;
