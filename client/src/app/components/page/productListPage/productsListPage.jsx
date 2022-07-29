import React from "react";
import { useSelector } from "react-redux";
import { getProductsList } from "../../../store/products";

const ProductsListPage = () => {
    const products = useSelector(getProductsList());
    const cropProducts = products.slice(0, 16);
    return (
        <div className="container">
            <h1>ProductsListPage</h1>
            <div className="d-flex flex-wrap justify-content-evenly p-2">
                {cropProducts.map(p => (
                    <div
                        key={p._id}
                        className="d-flex flex-column justify-content-between mb-3 shadow"
                        style={{
                            // height: "200px"
                            width: "200px"
                        }}
                    >
                        <div className="p-1">
                            <span className="bg bg-danger text-white p-1 rounded">-{p.discountPercentage}%</span>
                        </div>
                        <div>
                            <img
                                src={p.thumbnail}
                                className="img-fluid"
                                alt={p.thumbnail}
                                // style={{
                                //     // height: "200px"
                                //     width: "200px"
                                // }}
                            ></img>
                        </div>
                        <div className="text-center p-2">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <i className="bi bi-star"></i>
                                    <span> {p.rating}</span>
                                </div>
                                <span>Артикул: {p._id}</span>
                            </div>
                            <p className="fw-bold">{p.title}</p>
                            <h3>{p.price}</h3>
                            <div className="d-flex justify-content-between">
                                <button type="button" className="w-75 btn btn-danger">В корзину</button>
                                <h3>
                                    <i className="bi bi-heart" role="button"></i>
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsListPage;
