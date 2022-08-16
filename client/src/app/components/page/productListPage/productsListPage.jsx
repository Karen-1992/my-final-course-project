import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../store/categories";
import { getCurrentPage, getCurrentSort, getProductsList, getProductsListLength, loadProductsList } from "../../../store/products";
import GroupList from "../../common/groupList";
import Pagination from "../../common/pagination";
import ProductsList from "../../ui/productsList";
import PropTypes from "prop-types";
import history from "../../../utils/history";

const ProductsListPage = ({ category }) => {
    const currentPage = useSelector(getCurrentPage());
    const [selectedCategory, setSelectedCategory] = useState(category || null);
    const pageLimit = 20;
    const order = useSelector(getCurrentSort()) || "asc";
    const categoriesList = useSelector(getCategories());
    const dispatch = useDispatch();
    const totalCount = useSelector(getProductsListLength());
    const products = useSelector(getProductsList());
    const handlePageChange = (pageIndex) => {
        dispatch(loadProductsList({ page: pageIndex, limit: pageLimit, order }));
    };
    const handleCategorySelect = (item) => {
        setSelectedCategory(item);
        history.push(`/products/catalog/${item.name}`);
        dispatch(loadProductsList({ limit: pageLimit, category: item._id, order }));
    };
    const handleClearFilter = () => {
        setSelectedCategory();
        history.push(`/products`);
        dispatch(loadProductsList({ page: currentPage, limit: pageLimit, order }));
    };
    const handleSort = () => {
        dispatch(loadProductsList({ limit: pageLimit, order, path: "price" }));
    };
    if (products) {
        const filteredCount = selectedCategory ? products.length : totalCount;
        return (
            <div className="container">
                <div className="row g-0">
                    <div className="col-lg-2 col-md-3 col-sm-4">
                        {categoriesList && (
                            <div className="d-flex flex-column flex-shrink">
                                <GroupList
                                    selectedItem={selectedCategory}
                                    items={categoriesList}
                                    onItemSelect={handleCategorySelect}
                                />
                                <button
                                    className="btn btn-secondary mt-2"
                                    onClick={handleClearFilter}
                                >
                                    {" "}
                                    Очистить
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="col-lg-10 col-md-9 col-sm-8 p-3">
                        <div>
                            <div className="d-flex flex-wrap justify-content-between">
                                <button onClick={handleSort} className="btn btn-secondary px-2">
                                    Сортировать по цене
                                    <i className={"px-2 bi bi-caret-" + (order === "asc" ? "up" : "down")}></i>
                                </button>
                                <p>{`Показано ${products.length} из ${selectedCategory ? filteredCount : totalCount}`}</p>
                            </div>
                        </div>
                        <ProductsList items={products}/>
                        <div className="d-flex justify-content-center mt-3">
                            <Pagination
                                itemsCount={filteredCount}
                                pageSize={pageLimit}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

ProductsListPage.propTypes = {
    category: PropTypes.object
};

export default ProductsListPage;
