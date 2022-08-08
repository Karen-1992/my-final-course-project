import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../../store/cart";
import { getCategories } from "../../../store/categories";
import { toggleFavorite } from "../../../store/favorites";
import { getProductsList } from "../../../store/products";
import history from "../../../utils/history";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SelectField from "../../common/form/selectField";
import Pagination from "../../common/pagination";
import ProductItem from "../../ui/productItem";
import _ from "lodash";
import SortingMenu from "../../ui/sortingMenu";

const ProductsListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [pageCount, setPageCount] = useState({
        value: 10
    });
    const sortingParams = [
        { path: "title", name: "По наименованию" },
        { path: "price", name: "По цене" },
        { path: "rating", name: "По рейтингу" }
    ];
    const [sortBy, setSortBy] = useState({ ...sortingParams[0], order: "asc" });
    const categoriesList = useSelector(getCategories());
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
    const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
    };
    const handleOpenProductPage = (productId) => {
        history.push(`products/${productId}`);
    };
    const handleClearFilter = () => {
        setSelectedCategory();
    };
    const handleSort = (item) => {
        setSortBy(item);
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
        const sortedProducts = _.orderBy(
            filteredProducts,
            [sortBy.path],
            [sortBy.order]
        );
        const totalCount = products.length;
        const filteredCount = filteredProducts.length;
        const productsCrop = paginate(sortedProducts, currentPage, pageCount.value);
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
                    <div className="col-lg-10 col-md-9 col-sm-8 px-2">
                        <div>
                            <div className="d-flex flex-wrap justify-content-between">
                                <SelectField
                                    label="Показывать по"
                                    options={pageSizeOptions}
                                    name="value"
                                    onChange={handleChangePageCount}
                                    value={String(pageCount.value)}
                                />
                                <SortingMenu
                                    onSort={handleSort}
                                    selectedSort={sortBy}
                                    sortingParams={sortingParams}
                                />
                                <p>{`Показано ${productsCrop.length} из ${products.length}`}</p>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="searchQuery"
                                    placeholder="Введите название..."
                                    onChange={handleSearchQuery}
                                    value={searchQuery}
                                    className="w-100 position-relative"
                                />
                                {searchQuery && (
                                    <p className="position-absolute">{`По запросу "${searchQuery}" найдено ${filteredCount} товара`}</p>
                                )}
                            </div>
                        </div>
                        <div className="pt-3">
                            <div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-lg-4">
                                {productsCrop.map((product) => (
                                    <div className="col" key={product._id}>
                                        <ProductItem
                                            {...product}
                                            onAddToCart={() => handleAddToCart(product)}
                                            onToggleFavorite={() =>
                                                handleToggleFavorite(product._id)
                                            }
                                            onOpenProductPage={() =>
                                                handleOpenProductPage(product._id)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
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
};

export default ProductsListPage;
