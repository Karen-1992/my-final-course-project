import React from "react";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import AdministrationPage from "../components/page/administrationPage";
import EditProductPage from "../components/page/editProductPage";
import { getProductById } from "../store/products";

const Dashboard = () => {
    const { productId } = useParams();
    const isProductId = !!useSelector(getProductById(productId));
    return (
        <div>
            {isProductId ? (
                <EditProductPage productId={productId} />
            ) : (
                <>
                    <AdministrationPage />
                    <Redirect to={`/dashboard`} />
                </>
            )}
        </div>
    );
};

export default Dashboard;
