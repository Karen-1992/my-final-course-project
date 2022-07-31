import React from "react";
import { Redirect, useParams } from "react-router-dom";
import ProductPage from "../components/page/productPage";
import ProductsListPage from "../components/page/productListPage";
import { getProductById } from "../store/products";
import { useSelector } from "react-redux";
import GalleryLoader from "../components/ui/hoc/galleryLoader";

const Products = () => {
    const params = useParams();
    const { productId } = params;
    const product = useSelector(getProductById(productId));
    return (
        <div className="container">
            {product
                ? (
                    <GalleryLoader>
                        <ProductPage {...product} />
                    </GalleryLoader>
                )
                : productId ? (
                    <Redirect to="/products" />
                ) : (
                    <ProductsListPage />
                )}
        </div>
    );
};

export default Products;
