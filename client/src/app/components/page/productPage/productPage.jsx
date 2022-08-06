import React, { useState } from "react";
import PropTypes from "prop-types";
import ImageComponent from "../../common/imageComponent";
import ProductButtons from "../../common/productButtons";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, getCartProductById } from "../../../store/cart";
import { getIsFavorite, toggleFavorite } from "../../../store/favorites";

const ProductPage = ({ title, _id, description, stock, images, rating }) => {
    const dispatch = useDispatch();
    const [selectedImg, setSelectedImg] = useState(0);
    const handleSelectImg = (i) => {
        setSelectedImg(i);
    };
    const raitArr = [1, 2, 3, 4, 5];
    const isInCart = !!useSelector(getCartProductById(_id));
    const isFavorite = useSelector(getIsFavorite(_id));
    const handleAddToCart = () => {
        dispatch(addProductToCart({
            stock,
            _id
        }));
    };
    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(_id));
    };
    return (
        <div>
            <h2>{title}</h2>
            <div className="py-2">
                <>
                    {raitArr.map(r => (
                        <i key={r} className={"bi bi-star" + (rating >= r ? "-fill" : "")}></i>
                    ))}
                    <span> N отзывов (добавить отзывы)</span>
                </>
            </div>
            <div className="row">
                <div
                    className="col-2"
                >
                    {images.map((img, index) => (
                        <div
                            className={
                                (selectedImg === index ? "border border-warning border-2 rounded" : "")
                            }
                            key={index}
                            onClick={() => handleSelectImg(index)}
                            role="button"
                        >
                            <ImageComponent
                                src={img}
                                height="100px"
                                width="100%"
                            />
                        </div>
                    ))}
                </div>
                <div className="col-5">
                    <ImageComponent
                        src={images[selectedImg]}
                        height="400px"
                        width="100%"
                    />
                </div>
                <div className="col">
                    <h3>Основные характеристики:</h3>
                    <p>
                        Наименование:
                        <span className="px-1 fw-bold">{title}</span>
                    </p>
                    <p>
                        Описание:
                        <span className="px-1 fw-bold">{description}</span>
                    </p>
                    <p>
                        Остаток:
                        <span className="px-1 fw-bold">{stock}</span>
                    </p>
                    <div className="d-flex justify-content-between py-2">
                        <ProductButtons
                            isInCart={isInCart}
                            isFavorite={isFavorite}
                            onAddToCart={handleAddToCart}
                            onToggleFavorite={handleToggleFavorite}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

ProductPage.propTypes = {
    title: PropTypes.string,
    _id: PropTypes.string,
    description: PropTypes.string,
    stock: PropTypes.number,
    rating: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string)
};

export default ProductPage;
