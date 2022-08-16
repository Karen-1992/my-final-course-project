import { orderBy } from "lodash";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import productService from "../../../services/product.service";
import userService from "../../../services/user.service";
import { getOrders, removeOrder, updateOrder } from "../../../store/order";
import { updateProduct } from "../../../store/products";
import GroupList from "../../common/groupList";
import Loader from "../../common/loader";
import OrdersTable from "../../ui/orders/ordersTable";

const OrdersPanel = () => {
    const dispatch = useDispatch();
    const orders = useSelector(getOrders());
    const [selectedStatus, setSelectedStatus] = useState();
    const [sortBy, setSortBy] = useState({ path: "created_at", order: "asc" });
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSelect = (id) => {
        setSelectedOrderId(id);
    };
    const handleRemove = async (id) => {
        dispatch(removeOrder(id));
    };
    const handleCancel = async (order) => {
        const { userId, totalPrice } = order;
        dispatch(updateOrder({
            ...order,
            status: "canceled"
        }));
        const { content } = await userService.getOneUser(userId);
        const currentCash = content.cash;
        const cash = currentCash + totalPrice;
        userService.update({
            cash,
            userId
        });
    };
    async function getProducts(ids) {
        const result = [];
        if (ids) {
            for (const item of ids) {
                const { productId } = item;
                const { content } = await productService.getOneProduct(productId);
                result.push({ ...content, quantity: item.quantity });
            }
        }
        return result;
    }
    const handleAccept = async (order) => {
        const products = await getProducts(order.products);
        const isEnoughStock = products.every(i => i.stock > 0);
        if (isEnoughStock) {
            products.map(product => {
                return dispatch(updateProduct({
                    ...product,
                    stock: product.stock - product.quantity
                }));
            });
            dispatch(updateOrder({
                ...order,
                status: "completed"
            }));
        } else {
            toast.info("Недостаточно на складе");
        }
    };
    const handleStatusSelect = (item) => {
        setSelectedStatus(item);
    };
    const statusList = [
        {
            name: "completed",
            _id: "1"
        },
        {
            name: "pending",
            _id: "2"
        },
        {
            name: "canceled",
            _id: "3"
        }
    ];
    if (orders) {
        function filterOrders(data) {
            const filteredOrders = selectedStatus
                ? data.filter(
                    (order) =>
                        JSON.stringify(order.status) ===
                    JSON.stringify(selectedStatus.name)
                )
                : data;
            return filteredOrders;
        }
        const filteredOrders = filterOrders(orders);
        const sortedOrders = orderBy(
            filteredOrders,
            [sortBy.path],
            [sortBy.order]
        );
        const clearFilter = () => {
            setSelectedStatus();
        };
        return (
            <>
                {orders ? (
                    <>
                        <GroupList
                            selectedItem={selectedStatus}
                            items={statusList}
                            onItemSelect={handleStatusSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {" "}
                            Очистить
                        </button>
                        <OrdersTable
                            orders={sortedOrders}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onRemove={handleRemove}
                            onCancel={handleCancel}
                            onAccept={handleAccept}
                            onSelect={handleSelect}
                            selectedRow={selectedOrderId}
                        />
                    </>
                ) : (
                    <Loader />
                )}
            </>
        );
    }
};

export default OrdersPanel;
