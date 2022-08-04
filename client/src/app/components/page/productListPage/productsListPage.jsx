import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart, getCartLoadingStatus } from "../../../store/cart";
import { getCategories } from "../../../store/categories";
import { toggleFavorite } from "../../../store/favorites";
import { getProductsList } from "../../../store/products";
import history from "../../../utils/history";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/form/groupList";
import SelectField from "../../common/form/selectField";
import Pagination from "../../common/pagination";
import ProductItem from "../../ui/productItem";

const ProductsListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [pageCount, setPageCount] = useState({
        value: 10
    });
    const categoriesList = useSelector(getCategories());
    const categoriesLoading = useSelector(getCartLoadingStatus());
    const handleChangePageCount = (target) => {
        setPageCount((prevState) => ({
            ...prevState,
            [target.name]: +target.value
        }));
        setCurrentPage(1);
    };
    const dispatch = useDispatch();
    const products = useSelector(getProductsList());
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleCategorySelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        setSelectedCategory(item);
    };
    const handleSearchQuery = ({ target }) => {
        setSelectedCategory(undefined);
        setSearchQuery(target.value);
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);
    const handleAddToCart = (data) => {
        dispatch(addProductToCart(data));
    };
    const handleAddToFavorites = (id) => {
        dispatch(toggleFavorite(id));
    };
    const handleOpenProductPage = (productId) => {
        history.push(`products/${productId}`);
    };
    const handleClearFilter = () => {
        setSelectedCategory();
    };
    if (products) {
        function filterProducts(data) {
            const filteredProducts = searchQuery
                ? data.filter(
                    (product) =>
                        product.title
                            .toLowerCase()
                            .indexOf(searchQuery.toLowerCase()) !== -1
                )
                : selectedCategory
                    ? data.filter(
                        (product) => product.category === selectedCategory._id
                    )
                    : data;
            return filteredProducts;
        }
        const filteredProducts = filterProducts(products);
        const totalCount = products.length;
        const filteredCount = filteredProducts.length;
        const productsCrop = paginate(filteredProducts, currentPage, pageCount.value);
        function getPageSizeOptions() {
            const optionsArr = [];
            const optionsQuantity = Math.ceil(totalCount / 10);
            for (let i = 1; i <= optionsQuantity; i++) {
                optionsArr.push({
                    label: 10 * i,
                    value: 10 * i
                });
            }
            return optionsArr;
        }
        const pageSizeOptions = getPageSizeOptions();
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        {categoriesList && !categoriesLoading && (
                            <div className="d-flex flex-column flex-shrink-0 p-3">
                                filter
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
                    <div className="col-9">
                        <div>
                            <div className="d-flex flex-wrap justify-content-between p-2">
                                <SelectField
                                    label="Показывать по"
                                    options={pageSizeOptions}
                                    name="value"
                                    onChange={handleChangePageCount}
                                    value={String(pageCount.value)}
                                />
                                <p>{`Показано ${productsCrop.length} из ${products.length}`}</p>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="searchQuery"
                                    placeholder="Search..."
                                    onChange={handleSearchQuery}
                                    value={searchQuery}
                                    className="w-100 position-relative"
                                />
                                {searchQuery && (
                                    <p className="position-absolute">{`По запросу "${searchQuery}" найдено ${filteredCount} товара`}</p>
                                )}
                            </div>
                        </div>
                        <div className="d-flex flex-wrap justify-content-evenly p-2 mt-5">
                            {productsCrop.map((product) => (
                                <ProductItem
                                    {...product}
                                    onAddToCart={() => handleAddToCart(product)}
                                    onAddToFavorites={() =>
                                        handleAddToFavorites(product._id)
                                    }
                                    key={product._id}
                                    onOpenProductPage={() =>
                                        handleOpenProductPage(product._id)
                                    }
                                />
                            ))}
                        </div>
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={filteredCount}
                                pageSize={pageCount.value}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return "Loading";
};

export default ProductsListPage;
