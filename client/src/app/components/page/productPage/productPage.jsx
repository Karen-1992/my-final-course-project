import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
// import productService from "../../../services/product.service";
import ImageComponent from "../../common/imageComponent";
import ProductButtons from "../../common/productButtons";
import { addProductToCart, getCartProductById } from "../../../store/cart";
import { getIsFavorite, toggleFavorite } from "../../../store/favorites";
import Loader from "../../common/loader";
import Comments from "../../ui/comments";
import { useProduct } from "../../../hooks/useProduct";

const ProductPage = ({ productId }) => {
    const dispatch = useDispatch();
    const { product, isLoading } = useProduct();
    const [selectedImg, setSelectedImg] = useState(0);
    const handleSelectImg = (i) => {
        setSelectedImg(i);
    };
    const raitArr = [1, 2, 3, 4, 5];
    const isInCart = !!useSelector(getCartProductById(productId));
    const isFavorite = useSelector(getIsFavorite(productId));
    const handleAddToCart = () => {
        dispatch(addProductToCart({
            stock: product.stock,
            _id: productId
        }));
    };
    const handleToggleFavorite = () => {
        dispatch(toggleFavorite(productId));
    };
    return (
        <div>
            {!isLoading ? (
                <>
                    <h2>{product.title}</h2>
                    <div className="py-2">
                        <>
                            {raitArr.map(r => (
                                <i key={r} className={"bi bi-star" + (product.rating >= r ? "-fill" : "")}></i>
                            ))}
                            <span> N отзывов (добавить отзывы)</span>
                        </>
                    </div>
                    <div className="row">
                        <div
                            className="col-2"
                        >
                            {product.images.map((img, index) => (
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
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="col-5">
                            <ImageComponent
                                src={product.images[selectedImg]}
                                height="400px"
                                width="100%"
                            />
                        </div>
                        <div className="col">
                            <h3>Основные характеристики:</h3>
                            <p>
                                Наименование:
                                <span className="px-1 fw-bold">{product.title}</span>
                            </p>
                            <p>
                                Описание:
                                <span className="px-1 fw-bold">{product.description}</span>
                            </p>
                            <p>
                                Остаток:
                                <span className="px-1 fw-bold">{product.stock}</span>
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
                    <Comments pageId={productId} />
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

ProductPage.propTypes = {
    productId: PropTypes.string.isRequired
};

export default ProductPage;
