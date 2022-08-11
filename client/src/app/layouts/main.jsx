import React from "react";
import { useSelector } from "react-redux";
import ImageComponent from "../components/common/imageComponent";
import Loader from "../components/common/loader";
import { getCategories } from "../store/categories";
import history from "../utils/history";
import mainImage from "../assets/images/main-3.jpg";

const Main = () => {
    const handleRedirect = () => {
        history.push("/products");
    };
    const categoriesList = useSelector(getCategories());
    const handleClick = (category) => {
        history.push(`/products`);
    };
    return (
        <div className="container pb-5">
            <div className="card bg-dark text-white overflow-hidden" style={{
                height: "400px"
            }}>
                <ImageComponent
                    height="700px"
                    classes="card-img"
                    src={mainImage}
                />
                <div className="card-img-overlay">
                    <h5 className="card-title">Интернет-магазин</h5>
                    <p className="card-text">Здесь вы можете найти все что угодно.</p>
                    <button className="btn btn-light mb-3" onClick={handleRedirect}>Перейти к покупкам</button>
                </div>
            </div>
            <h1 className="my-5">Категории</h1>
            <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                {categoriesList ? categoriesList.map(c => (
                    <div className="col" key={c._id} role="button" onClick={() => handleClick(c.name)}>
                        <div className="h-100 shadow rounded-3">
                            <p className="fw-light fs-5 text-center">{c.name}</p>
                            <div className="">
                                <ImageComponent
                                    classes="card-img"
                                    src={c.thumbnail}
                                />
                            </div>
                        </div>
                    </div>
                )) : (
                    <Loader />
                )}

            </div>
        </div>
    );
};

export default Main;
