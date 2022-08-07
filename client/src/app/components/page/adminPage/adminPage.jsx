import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validator } from "../../../utils/validator";
import ProductChangeForm from "../../ui/productChangeForm";
import { getProductsList, removeProduct, getProductById, updateProduct, createProduct } from "../../../store/products";
import { getCategories, getCategoriesLoadingStatus } from "../../../store/categories";
import ProductsTable from "../../ui/productsTable";
import _ from "lodash";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import Loader from "../../common/loader";
import { useLoading } from "../../../hooks/useLoading";

const AdminPage = () => {
    const { clientX, clientY } = useLoading();
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
    const pageSize = 20;
    const [editedProductId, setEditedProductId] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const dispatch = useDispatch();
    const productsList = useSelector(getProductsList());
    const categories = useSelector(getCategories());
    const categoriesLoading = useSelector(getCategoriesLoadingStatus());
    const currentProduct = useSelector(getProductById(editedProductId));
    useEffect(() => {
        setCurrentPage(1);
    }, []);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleEdit = (id) => {
        setEditedProductId(id);
    };
    const handleRemove = (id) => {
        if (editedProductId === id) {
            clearForm();
        }
        dispatch(removeProduct(id));
    };
    const clearForm = () => {
        setEditedProductId(null);
        setData(initialData);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        if (editedProductId) {
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
        if (editedProductId) {
            setData(currentProduct);
        }
    }, [editedProductId]);
    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);
    const validatorConfig = {
        title: {
            isRequired: {
                message: "isRequired"
            }
        },
        brand: {
            isRequired: {
                message: "isRequired"
            }
        },
        category: {
            isRequired: {
                message: "isRequired"
            }
        },
        description: {
            isRequired: {
                message: "isRequired"
            }
        },
        price: {
            isRequired: {
                message: "isRequired"
            },
            minValue: {
                message: "Цена не может быть меньше 0",
                value: 0
            }
        },
        discountPercentage: {
            isRequired: {
                message: "isRequired"
            },
            minValue: {
                message: "Скидка не может быть меньше 0",
                value: 0
            }
        },
        stock: {
            isRequired: {
                message: "isRequired"
            },
            minValue: {
                message: "Количество товаров не может быть меньше 0",
                value: 0
            }
        },
        thumbnail: {
            isRequired: {
                message: "isRequired"
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
        if (editedProductId) clearForm();
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
    const sortedProducts = _.orderBy(
        productsList,
        [sortBy.path],
        [sortBy.order]
    );
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSelect = (id) => {
        setSelectedProductId(id);
    };
    const productsCrop = paginate(sortedProducts, currentPage, pageSize);
    const count = sortedProducts.length;
    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    {!isLoading && !categoriesLoading ? (
                        <ProductChangeForm
                            data={data}
                            productId={editedProductId}
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                            errors={errors}
                            isValid={isValid}
                            categoriesList={categoriesList}
                        />
                    ) : (
                        <Loader
                            clientX={clientX}
                            clientY={clientY}
                        />
                    )}
                </div>
                <div className="col-9">
                    <ProductsTable
                        products={productsCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onEdit={handleEdit}
                        onRemove={handleRemove}
                        onSelect={handleSelect}
                        selectedRow={selectedProductId}
                    />
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
