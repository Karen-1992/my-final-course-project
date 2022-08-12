import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getCategoryById } from "../../../store/categories";
import { getCurrentCategory, getCurrentPage, getCurrentSort, getProductsList, getProductsListLength, loadProductsList } from "../../../store/products";
import GroupList from "../../common/groupList";
import Pagination from "../../common/pagination";
// import SortingMenu from "../../ui/sortingMenu";
import ProductsList from "../../ui/productsList";

const ProductsListPage = () => {
    const categoryId = useSelector(getCurrentCategory());
    const currentCategory = useSelector(getCategoryById(categoryId));
    const currentPage = useSelector(getCurrentPage());
    const [selectedCategory, setSelectedCategory] = useState(currentCategory || null);
    const pageLimit = 20;
    const order = useSelector(getCurrentSort()) || "asc";
    const categoriesList = useSelector(getCategories());
    const dispatch = useDispatch();
    const totalCount = useSelector(getProductsListLength());
    const products = useSelector(getProductsList());
    function loadProducts(page, limit, category, order) {
        dispatch(loadProductsList({ page, limit, category, order }));
    }
    const handlePageChange = (pageIndex) => {
        loadProducts(pageIndex, pageLimit, null, order);
    };
    const handleCategorySelect = (item) => {
        setSelectedCategory(item);
        loadProducts(1, pageLimit, item._id, order);
    };
    const handleClearFilter = () => {
        setSelectedCategory();
        loadProducts(currentPage, pageLimit, null, order);
    };
    const handleSort = () => {
        loadProducts(1, pageLimit, null, order);
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
                    <div className="col-lg-10 col-md-9 col-sm-8">
                        <div>
                            <div className="d-flex flex-wrap justify-content-between">
                                <button onClick={handleSort} className="btn btn-secondary px-2">
                                    Сортировать по цене
                                    <i className={"px-2 bi bi-caret-" + (order === "asc" ? "up" : "down")}></i>
                                </button>
                                <p>{`Показано ${products.length} из ${selectedCategory ? filteredCount : totalCount}`}</p>
                            </div>
                        </div>
                        <div className="pt-3">
                            <ProductsList items={products} />
                        </div>
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

export default ProductsListPage;
