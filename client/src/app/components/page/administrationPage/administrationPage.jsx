import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsList, removeProduct } from "../../../store/products";
import history from "../../../utils/history";

const administrationPage = () => {
    const dispatch = useDispatch();
    const productsList = useSelector(getProductsList());
    const handleEdit = (id) => {
        console.log("edit");
        history.push(`/dashboard/${id}`);
    };
    const handleRemove = (id) => {
        console.log("remove");
        dispatch(removeProduct(id));
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <h3>Add Product</h3>
                </div>
                <div className="col-9">
                    <h3>AdministrationPage</h3>
                    {productsList.map(p => (
                        <div
                            key={p._id}
                            className="d-flex justify-content-between border-bottom mb-2"
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
    );
};

export default administrationPage;
