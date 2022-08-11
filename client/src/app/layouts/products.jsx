import React from "react";
import { useParams } from "react-router-dom";
import ProductPage from "../components/page/productPage/productPage";
import ProductsListPage from "../components/page/productListPage/productsListPage";
// import { getProductById } from "../store/products";
// import { useSelector } from "react-redux";
import ProductsLoader from "../components/ui/hoc/productsLoader";

const Products = () => {
    const params = useParams();
    const { productId } = params;
    // const product = useSelector(getProductById(productId));
    // console.log(2, product);
    return (
        // <>
        //     <ProductsLoader>
        //         {product ? (
        //             <ProductPage {...product} />
        //         ) : productId ? (
        //             <Redirect to="/products" />
        //         ) : (
        //             <ProductsListPage category={category} />
        //         )}
        //     </ProductsLoader>
        // </>
        <ProductsLoader>
            {productId ? (
                <ProductPage productId={productId} />
            ) : (
                <ProductsListPage />
            )}
        </ProductsLoader>
    );
};

export default Products;
