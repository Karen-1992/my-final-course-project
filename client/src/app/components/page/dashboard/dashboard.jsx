import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validator } from "../../../utils/validator";
import ProductChangeForm from "../../ui/productChangeForm";
import { getProductsList, removeProduct, getProductById, updateProduct, createProduct } from "../../../store/products";
import { getCategories, getCategoriesLoadingStatus } from "../../../store/categories";

const Dashboard = () => {
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
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const productsList = useSelector(getProductsList());
    const categories = useSelector(getCategories());
    const categoriesLoading = useSelector(getCategoriesLoadingStatus());
    const currentProduct = useSelector(getProductById(selectedProductId));
    const handleEdit = (id) => {
        setSelectedProductId(id);
    };
    const handleRemove = (id) => {
        dispatch(removeProduct(id));
    };
    const clearForm = () => {
        setSelectedProductId(null);
        setData(initialData);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        if (selectedProductId) {
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
        clearForm();
    };
    useEffect(() => {
        if (!categoriesLoading && currentProduct && !data) {
            setData({
                ...currentProduct
            });
        }
    }, [currentProduct, data, categoriesLoading]);
    useEffect(() => {
        if (selectedProductId) {
            setData(currentProduct);
        }
    }, [selectedProductId]);
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
    const handleCancel = () => {
        if (selectedProductId) clearForm();
        setData(initialData);
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    const categoriesList = categories.map((c) => ({
        label: c.name,
        value: c._id
    }));
    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    {!isLoading && Object.keys(categories).length > 0 ? (
                        <ProductChangeForm
                            data={data}
                            productId={selectedProductId}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                            errors={errors}
                            isValid={isValid}
                            categoriesList={categoriesList}
                        />
                    ) : (
                        "Loading..."
                    )}
                </div>
                <div className="col-9">
                    <div className="container">
                        {productsList.map((p) => (
                            <div
                                key={p._id}
                                className={"d-flex justify-content-between mb-2 px-1 " + (selectedProductId === p._id ? "border-start border-5 border-success" : "")}
                            >
                                <p>{p.title}</p>
                                <div className="d-flex gap-2">
                                    <button
                                        onClick={() => handleEdit(p._id)}
                                        className="btn btn-secondary"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleRemove(p._id)}
                                        className="btn btn-danger"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
