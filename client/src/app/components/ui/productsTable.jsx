import React from "react";
import PropTypes from "prop-types";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Category from "./category";

const ProductsTable = ({
    products,
    onSort,
    selectedSort,
    onEdit,
    onRemove,
    ...rest
}) => {
    const columns = {
        name: {
            path: "title",
            name: "Title",
            component: (product) => (
                <Link to={`/products/${product._id}`}>{product.title}</Link>
            )
        },
        category: {
            name: "category",
            component: (product) => <Category id={product.category} />
        },
        stock: {
            path: "stock",
            name: "stock"
        },
        price: {
            path: "price",
            name: "price"
        },
        rating: { path: "rating", name: "rating" },
        edit: {
            component: (product) => (
                <button
                    onClick={() => onEdit(product._id)}
                    className="btn btn-secondary"
                >
                    Edit
                </button>
            )
        },
        remove: {
            component: (product) => (
                <button
                    onClick={() => onRemove(product._id)}
                    className="btn btn-danger"
                >
                    Remove
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={products}
        />
    );
};

ProductsTable.propTypes = {
    products: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default ProductsTable;
