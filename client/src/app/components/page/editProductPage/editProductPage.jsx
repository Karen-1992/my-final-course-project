import React, { useEffect, useState } from "react";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProduct } from "../../../store/products";
import PropTypes from "prop-types";

const EditProductPage = ({ productId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();
    const currentProduct = useSelector(getProductById(productId));
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { price, discountPercentage, stock } = data;
        dispatch(updateProduct({
            ...data,
            price,
            discountPercentage,
            stock
        }));
    };
    useEffect(() => {
        if (currentProduct && !data) {
            setData({
                ...currentProduct
            });
        }
    }, [currentProduct, data]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="w-75">
            <h1>Edit Product Page</h1>
            {!isLoading && currentProduct ? (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                        error={errors.title}
                    />
                    <TextField
                        label="Brand"
                        name="brand"
                        value={data.brand}
                        onChange={handleChange}
                        error={errors.brand}
                    />
                    <TextField
                        label="Category"
                        name="category"
                        value={data.category}
                        onChange={handleChange}
                        error={errors.category}
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        error={errors.description}
                    />
                    <TextField
                        label="DiscountPercentage
                        "
                        type="number"
                        name="discountPercentage"
                        value={data.discountPercentage}
                        onChange={handleChange}
                        error={errors.discountPercentage}
                    />
                    <TextField
                        label="Price
                        "
                        type="number"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        error={errors.price}
                    />
                    <TextField
                        label="Stock
                        "
                        type="number"
                        name="stock"
                        value={data.stock}
                        onChange={handleChange}
                        error={errors.stock}
                    />
                    <TextField
                        label="Thumbnail"
                        name="thumbnail"
                        value={data.thumbnail}
                        onChange={handleChange}
                        error={errors.thumbnail}
                    />
                    <button
                        type="submit"
                        disabled={!isValid}
                        className="btn btn-primary w-100 mx-auto"
                    >
                        Обновить
                    </button>
                </form>
            ) : (
                "Loading..."
            )}
        </div>
    );
};

EditProductPage.propTypes = {
    productId: PropTypes.string
};

export default EditProductPage;
