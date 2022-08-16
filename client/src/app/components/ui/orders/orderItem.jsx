import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import productService from "../../../services/product.service";
import Loader from "../../common/loader";
import ImageComponent from "../../common/imageComponent";
import { useSelector } from "react-redux";
import { getIsAdmin } from "../../../store/users";

const OrderItem = ({ quantity, productId, onClick }) => {
    const [product, setProduct] = useState();
    const isAdmin = useSelector(getIsAdmin());
    useEffect(() => {
        productService.getOneProduct(productId).then(res => setProduct(res?.content || {}));
    }, [productId]);
    return (
        <div className="d-flex gap-2 border p-1">
            {product ? (
                <>
                    <div>
                        <p className="fw-semibold">{product.title}</p>
                        <div className="d-flex gap-3">
                            <p>{`Количество: ${quantity} шт.`}</p>
                            {isAdmin && (
                                <p>{`В наличии: ${product.stock} шт.`}</p>
                            )}
                        </div>
                    </div>
                    <div className="mx-auto">
                        <ImageComponent src={product.thumbnail} width="100px" onClick={() => onClick(product._id)} />
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

OrderItem.propTypes = {
    quantity: PropTypes.number,
    productId: PropTypes.string,
    onClick: PropTypes.func
};

export default OrderItem;
