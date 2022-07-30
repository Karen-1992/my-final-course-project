import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../components/page/productPage";
import ProductsListPage from "../components/page/productListPage";
// import { useSelector } from "react-redux";
// import { getProductsList } from "../store/products";
// import ProductsLoader from "../components/ui/hoc/productsLoader";

const Products = () => {
    const params = useParams();
    const { productId } = params;
    return (
        <>
            {/* <ProductsLoader> */}
            {productId ? (
                <ProductPage productId={productId} />
            ) : (
                <ProductsListPage />
            )}
            {/* </ProductsLoader> */}
        </>
    );
};

export default Products;
