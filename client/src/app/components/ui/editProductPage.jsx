import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getProductById, updateProduct } from "../../store/products";
import PropTypes from "prop-types";
import ProductChangeForm from "./productChangeForm";

const EditProductPage = ({ productId, onClearForm }) => {
    const initialData = {
        title: "",
        brand: "",
        category: "",
        description: "",
        price: "",
        discountPercentage: "",
        stock: "",
        thumbnail: ""
    };
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(initialData);
    const currentProduct = useSelector(getProductById(productId));
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        if (productId) {
            const { price, discountPercentage, stock } = data;
            dispatch(
                updateProduct({
                    ...data,
                    price,
                    discountPercentage,
                    stock
                })
            );
        } else {
            dispatch(createProduct(data));
        }
        onClearForm();
    };
    useEffect(() => {
        if (!isLoading && currentProduct) {
            setData({
                ...currentProduct
            });
        }
    }, [currentProduct, data]);
    useEffect(() => {
        if (productId) {
            setData(currentProduct);
        } else {
            setData(initialData);
        }
    }, [productId]);
    useEffect(() => {
        if (currentProduct) {
            setIsLoading(true);
        }
    }, [currentProduct]);
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
    const handleCancel = () => {
        if (productId) onClearForm();
        setData(initialData);
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="">
            <ProductChangeForm
                data={data}
                productId={productId}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                errors={errors}
                isValid={isValid}
            />
        </div>
    );
};

EditProductPage.propTypes = {
    productId: PropTypes.string,
    onClearForm: PropTypes.func
};

export default EditProductPage;
