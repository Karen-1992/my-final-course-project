import React from "react";
import { Redirect, useParams } from "react-router-dom";
import ProductPage from "../components/page/productPage/productPage";
import ProductsListPage from "../components/page/productListPage/productsListPage";
import { getProductById } from "../store/products";
import { useSelector } from "react-redux";
import ProductsLoader from "../components/ui/hoc/productsLoader";

const Products = () => {
    const params = useParams();
    const { productId } = params;
    const product = useSelector(getProductById(productId));
    return (
        <ProductsLoader>
            {product ? (
                <ProductPage {...product} />
            ) : productId ? (
                <Redirect to="/products" />
            ) : (
                <ProductsListPage />
            )}
        </ProductsLoader>
    );
};

export default Products;
