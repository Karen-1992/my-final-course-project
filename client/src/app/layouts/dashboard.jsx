import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdministrationPage from "../components/ui/administrationPage";
import EditProductPage from "../components/ui/editProductPage";
import { getProductsList, removeProduct } from "../store/products";

const Dashboard = () => {
    const [selectedProductId, setSelectedProductId] = useState(null);
    const dispatch = useDispatch();
    const productsList = useSelector(getProductsList());
    const handleEdit = (id) => {
        setSelectedProductId(id);
    };
    const handleRemove = (id) => {
        dispatch(removeProduct(id));
    };
    const handleClearForm = () => {
        setSelectedProductId(null);
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <EditProductPage
                        productId={selectedProductId}
                        onClearForm={handleClearForm}
                    />
                </div>
                <div className="col-9">
                    <AdministrationPage
                        items={productsList}
                        onRemove={handleRemove}
                        onEdit={handleEdit}
                        selectedItem={selectedProductId}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
